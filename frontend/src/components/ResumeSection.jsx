import React from 'react';

export default function ResumeSection({ cvUrl }) {
  const activeCv = cvUrl || '/images/Jeseena_CV.pdf';

  return (
    <section id="resume" className="resume-dedicated-section scroll-fade-item reveal-on-scroll">
      <div className="container">
        <div className="resume-box-card">
          <div style={{ color: 'var(--crimson-bright)', fontSize: '2.5rem', marginBottom: '0.8rem' }}>
            📄
          </div>
          <h2 className="resume-heading">Official Resume &amp; CV</h2>
          <p className="resume-subtext">
            Download my complete official Curriculum Vitae with verified internship experience, projects, skills, and academic background.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <a
              href={activeCv}
              download="Jeseena_FullStackDeveloper_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-hire"
              style={{ padding: '0.9rem 2.4rem', fontSize: '0.95rem' }}
            >
              <span>Download Official CV (PDF)</span>
              <span>↓</span>
            </a>
            <a
              href={activeCv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-cv"
              style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem' }}
            >
              <span>Open PDF Preview</span>
              <span>↗</span>
            </a>
          </div>

          <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            * Verified Official Document • Contact: +91 7736998984 • jeseena2005@gmail.com • Palakkad, Kerala
          </p>
        </div>
      </div>
    </section>
  );
}
