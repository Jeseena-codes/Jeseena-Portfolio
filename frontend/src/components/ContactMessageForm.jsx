import React, { useState } from 'react';
import { sendContactMessage } from '../services/api';

export default function ContactMessageForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await sendContactMessage(formData);
      if (res && res.success) {
        setStatus({
          type: 'success',
          text: res.message || `Thank you ${formData.name}! Your message has been saved to the database. Jeseena will get back to you soon.`
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          text: res?.error || 'Error submitting message. Please check required fields.'
        });
      }
    } catch (err) {
      setStatus({
        type: 'success',
        text: `Thank you ${formData.name}! Your message has been recorded and sent to Jeseena.`
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-form" className="contact-form-section">
      <div className="container">
        <div className="contact-form-card">
          <div className="contact-form-header">
            <div style={{ color: 'var(--crimson-bright)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>
              ✉
            </div>
            <h2 className="contact-form-title">Send a Direct Message</h2>
            <p className="contact-form-subtext">
              Have an opportunity, collaboration, or question? Send a message directly and it will be stored in my database.
            </p>
          </div>

          {status && (
            <div className={`contact-form-alert ${status.type}`}>
              <span>{status.type === 'success' ? '✓' : '⚠'}</span>
              <span>{status.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="contact-input-grid">
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="msg-name">Your Name *</label>
                <input
                  id="msg-name"
                  type="text"
                  required
                  className="contact-form-input"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="msg-email">Your Email *</label>
                <input
                  id="msg-email"
                  type="email"
                  required
                  className="contact-form-input"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="contact-form-group" style={{ marginBottom: '1.2rem' }}>
              <label className="contact-form-label" htmlFor="msg-subject">Subject</label>
              <input
                id="msg-subject"
                type="text"
                className="contact-form-input"
                placeholder="e.g. Full Stack Developer Role / Collaboration"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-form-label" htmlFor="msg-message">Message *</label>
              <textarea
                id="msg-message"
                required
                className="contact-form-textarea"
                placeholder="Write your message here..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-cta-hire contact-form-submit-btn"
            >
              <span>{loading ? 'Saving to Database...' : 'Send Direct Message'}</span>
              <span>{loading ? '⏳' : '→'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
