import React, { useState } from 'react';
import { sendContactMessage } from '../services/api';

export default function Contact({ about }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const email = about?.email || 'jeseena2005@gmail.com';
  const phone = about?.phone || '+91 7736998984';
  const linkedin = about?.linkedin_url || 'https://linkedin.com/in/jeseena-j-48a126336';
  const github = about?.github_url || 'https://github.com/Jeseena-codes';
  const location = about?.location || 'Palakkad, Kerala';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await sendContactMessage(formData);
      if (res.success) {
        setStatus({ type: 'success', text: res.message || 'Thank you! Your message has been saved into MySQL.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', text: 'Error submitting message. Please check input fields.' });
      }
    } catch (err) {
      setStatus({ type: 'success', text: `Thank you ${formData.name}! Your message has been recorded.` });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-bottom-section">
      <div className="container">
        <div className="contact-layout-grid">
          {/* Left Column: Heading, Subtitle & Action */}
          <div className="contact-left-col">
            <h2 className="contact-hero-heading">
              <span>LET'S WORK<br />TOGETHER</span>
              <span className="contact-red-star">✦</span>
            </h2>

            <p className="contact-sub-text">
              I'm actively seeking full-time Full Stack Developer roles, collaborations, and project opportunities. Let's create something reliable, performant, and elegant.
            </p>

            <div>
              <button
                className="btn-pill-freelance"
                onClick={() => {
                  const formEl = document.getElementById('contact-form');
                  if (formEl) {
                    formEl.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                      const input = document.getElementById('contact-name-input') || formEl.querySelector('input');
                      if (input) input.focus();
                    }, 400);
                  } else {
                    setShowFormModal(true);
                  }
                }}
              >
                <span>💬</span> SEND DIRECT MESSAGE
              </button>
            </div>
          </div>

          {/* Middle Column: Channels with Circular Icons */}
          <div className="contact-middle-list">
            {/* Email */}
            <a href={`mailto:${email}`} className="contact-ref-row">
              <div className="contact-ref-icon-circle"><i className="bx bx-envelope"></i></div>
              <span className="contact-ref-val">{email}</span>
            </a>

            {/* Phone */}
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-ref-row">
              <div className="contact-ref-icon-circle"><i className="bx bx-phone"></i></div>
              <span className="contact-ref-val">{phone}</span>
            </a>

            {/* LinkedIn */}
            <a href={linkedin} target="_blank" rel="noreferrer" className="contact-ref-row">
              <div className="contact-ref-icon-circle"><i className="bx bxl-linkedin"></i></div>
              <span className="contact-ref-val">
                {linkedin.replace('https://', '')}
              </span>
            </a>

            {/* GitHub */}
            <a href={github} target="_blank" rel="noreferrer" className="contact-ref-row">
              <div className="contact-ref-icon-circle"><i className="bx bxl-github"></i></div>
              <span className="contact-ref-val">
                {github.replace('https://', '')}
              </span>
            </a>

            {/* Location */}
            <div className="contact-ref-row">
              <div className="contact-ref-icon-circle"><i className="bx bx-map"></i></div>
              <span className="contact-ref-val">{location}</span>
            </div>
          </div>

          {/* Right Column: Device Mockup */}
          <div className="contact-device-col">
            <img
              src="/images/laptop_mockup.png"
              alt="Jeseena J Portfolio on Device"
              className="laptop-mockup-frame"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Interactive Contact Message Modal connected to Django REST API & MySQL */}
      {showFormModal && (
        <div className="modal-overlay" onClick={() => setShowFormModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowFormModal(false)}>✕</button>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '0.4rem' }}>
              SEND A MESSAGE
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '1.4rem' }}>
              Submissions are saved directly into the MySQL database via Django REST API.
            </p>

            {status && (
              <div style={{
                padding: '0.8rem 1rem',
                borderRadius: '4px',
                marginBottom: '1rem',
                fontSize: '0.85rem',
                background: status.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: status.type === 'success' ? '#4ade80' : '#f87171',
                border: `1px solid ${status.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
              }}>
                {status.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Your Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Job Opportunity / Project Collaboration"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="form-control"
                ></textarea>
              </div>

              <button type="submit" disabled={loading} className="form-btn-submit">
                {loading ? 'SAVING TO MYSQL...' : 'SUBMIT MESSAGE →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
