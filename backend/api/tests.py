import smtplib
from unittest.mock import patch
from django.core import mail
from django.test import TestCase, override_settings
from rest_framework import status
from rest_framework.test import APIClient
from .models import ContactMessage


class ContactFormEmailNotificationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.contact_url = '/api/contact/'
        self.valid_payload = {
            'name': 'Sarah Connor',
            'email': 'sarah@example.com',
            'subject': 'Project Inquiry',
            'message': 'Hello Jeseena, I would like to discuss a web development project with you.',
        }

    @override_settings(
        EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
        CONTACT_NOTIFICATION_EMAIL='admin@example.com',
        DEFAULT_FROM_EMAIL='portfolio-no-reply@example.com',
    )
    def test_contact_message_saves_and_sends_email_successfully(self):
        """
        When valid contact data is posted, it should:
        1. Save the ContactMessage into the database.
        2. Dispatch an email notification to CONTACT_NOTIFICATION_EMAIL.
        3. Include sender details and message safely in email body and subject.
        4. Return 201 Created with success=True and data.email_sent=True.
        """
        response = self.client.post(self.contact_url, self.valid_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data.get('success'))
        self.assertTrue(response.data.get('data', {}).get('email_sent'))

        # Check DB persistence
        msg = ContactMessage.objects.filter(email='sarah@example.com').first()
        self.assertIsNotNone(msg)
        self.assertEqual(msg.name, 'Sarah Connor')
        self.assertEqual(msg.subject, 'Project Inquiry')
        self.assertEqual(msg.message, self.valid_payload['message'])

        # Check Email outbox
        self.assertEqual(len(mail.outbox), 1)
        sent_email = mail.outbox[0]
        self.assertEqual(sent_email.to, ['admin@example.com'])
        self.assertEqual(sent_email.from_email, 'portfolio-no-reply@example.com')
        self.assertIn('Sarah Connor', sent_email.subject)
        self.assertIn('Project Inquiry', sent_email.subject)
        self.assertIn('sarah@example.com', sent_email.body)
        self.assertIn('Sarah Connor', sent_email.body)
        self.assertIn(self.valid_payload['message'], sent_email.body)
        self.assertIn(f"/admin/api/contactmessage/{msg.id}/change/", sent_email.body)

    @override_settings(
        EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
        CONTACT_NOTIFICATION_EMAIL='admin@example.com',
        DEFAULT_FROM_EMAIL='portfolio-no-reply@example.com',
    )
    @patch('api.views.send_mail')
    def test_contact_message_retained_when_email_sending_fails(self, mock_send_mail):
        """
        When email sending raises an exception (e.g. SMTP failure):
        1. The ContactMessage in the database must NOT be deleted or rolled back.
        2. The API response returns HTTP 201 Created.
        3. The response explicitly reports email_sent=False.
        4. The error is logged on the server.
        """
        mock_send_mail.side_effect = smtplib.SMTPException("SMTP connection timed out")

        with self.assertLogs('api.views', level='ERROR') as cm:
            response = self.client.post(self.contact_url, self.valid_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data.get('success'))
        self.assertFalse(response.data.get('data', {}).get('email_sent'))

        # DB record must still exist
        msg = ContactMessage.objects.filter(email='sarah@example.com').first()
        self.assertIsNotNone(msg)
        self.assertEqual(msg.name, 'Sarah Connor')

        # Verify error log
        self.assertTrue(any("Failed to dispatch notification email" in line for line in cm.output))
        self.assertTrue(any(str(msg.id) in line for line in cm.output))

    @override_settings(
        EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
        CONTACT_NOTIFICATION_EMAIL='',
        EMAIL_HOST_USER='',
        DEFAULT_FROM_EMAIL='',
    )
    def test_contact_message_saved_when_email_settings_not_configured(self):
        """
        When CONTACT_NOTIFICATION_EMAIL and EMAIL_HOST_USER are not configured:
        1. The ContactMessage is safely saved in DB.
        2. Email sending is skipped with a warning log.
        3. API response indicates email_sent=False without raising an error.
        4. No email is sent.
        """
        with self.assertLogs('api.views', level='WARNING') as cm:
            response = self.client.post(self.contact_url, self.valid_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data.get('success'))
        self.assertFalse(response.data.get('data', {}).get('email_sent'))
        self.assertEqual(ContactMessage.objects.filter(email='sarah@example.com').count(), 1)
        self.assertEqual(len(mail.outbox), 0)
        self.assertTrue(any("CONTACT_NOTIFICATION_EMAIL is not configured" in line for line in cm.output))

    @override_settings(
        EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend',
        EMAIL_HOST='',
        CONTACT_NOTIFICATION_EMAIL='admin@example.com',
        DEFAULT_FROM_EMAIL='sender@example.com',
    )
    def test_contact_message_skips_when_smtp_host_empty(self):
        """
        When using SMTP backend but EMAIL_HOST is empty, email sending
        should be skipped cleanly with a warning to avoid hanging connection timeouts.
        """
        with self.assertLogs('api.views', level='WARNING') as cm:
            response = self.client.post(self.contact_url, self.valid_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data.get('success'))
        self.assertFalse(response.data.get('data', {}).get('email_sent'))
        self.assertEqual(ContactMessage.objects.filter(email='sarah@example.com').count(), 1)
        self.assertTrue(any("EMAIL_HOST is not configured" in line for line in cm.output))

    @override_settings(
        EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
        CONTACT_NOTIFICATION_EMAIL='',
        EMAIL_HOST_USER='fallback-host-user@example.com',
        DEFAULT_FROM_EMAIL='',
    )
    def test_contact_message_recipient_falls_back_to_email_host_user(self):
        """
        If CONTACT_NOTIFICATION_EMAIL is blank, the recipient and from_email
        should fall back to EMAIL_HOST_USER if present.
        """
        response = self.client.post(self.contact_url, self.valid_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data.get('data', {}).get('email_sent'))
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, ['fallback-host-user@example.com'])
        self.assertEqual(mail.outbox[0].from_email, 'fallback-host-user@example.com')

    @override_settings(
        EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
        CONTACT_NOTIFICATION_EMAIL='admin@example.com',
        DEFAULT_FROM_EMAIL='portfolio-no-reply@example.com',
    )
    def test_contact_message_header_injection_sanitization(self):
        """
        Newlines in the sender name or subject must be sanitized so that
        email header injection cannot occur.
        """
        injection_payload = {
            'name': 'Attacker\nBcc: evil@example.com\r\nSubject: Injected',
            'email': 'attacker@example.com',
            'subject': 'Clean Subject\r\nTo: hacked@example.com',
            'message': 'Testing header injection protection.',
        }
        response = self.client.post(self.contact_url, injection_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(mail.outbox), 1)
        sent_email = mail.outbox[0]
        # Subject must not contain CR or LF characters
        self.assertNotIn('\r', sent_email.subject)
        self.assertNotIn('\n', sent_email.subject)
        # Recipient must remain only the configured admin
        self.assertEqual(sent_email.to, ['admin@example.com'])

    @override_settings(
        EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
        CONTACT_NOTIFICATION_EMAIL='admin@example.com',
        DEFAULT_FROM_EMAIL='portfolio-no-reply@example.com',
    )
    def test_validation_failure_does_not_save_or_send_email(self):
        """
        Invalid form data (e.g. invalid email, short name, short message)
        must return 400 Bad Request, not save to DB, and not dispatch any email.
        """
        invalid_payload = {
            'name': '',
            'email': 'not-a-valid-email',
            'subject': '',
            'message': 'hi',  # serializer requires >= 5 chars
        }
        response = self.client.post(self.contact_url, invalid_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data.get('success'))
        self.assertIn('errors', response.data)
        self.assertEqual(ContactMessage.objects.count(), 0)
        self.assertEqual(len(mail.outbox), 0)

    @override_settings(
        EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
        CONTACT_NOTIFICATION_EMAIL='admin@example.com',
        DEFAULT_FROM_EMAIL='portfolio-no-reply@example.com',
    )
    @patch('api.views.send_mail')
    @patch('api.serializers.ContactMessageSerializer.save')
    def test_database_save_failure_does_not_send_email(self, mock_save, mock_send_mail):
        """
        If the database save operation fails, send_mail must NOT be invoked,
        ensuring requirement 7 (no notification before DB save succeeds).
        """
        from django.db import DatabaseError
        mock_save.side_effect = DatabaseError("Simulated DB connection error during save")

        with self.assertRaises(DatabaseError):
            self.client.post(self.contact_url, self.valid_payload, format='json')

        mock_send_mail.assert_not_called()
        self.assertEqual(len(mail.outbox), 0)

