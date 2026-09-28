import React, { useState, useEffect } from 'react';
import { getAbout, FALLBACK_ABOUT } from '../services/api';

export default function Footer({ about: propAbout, cvUrl }) {
  const [about, setAbout] = useState(propAbout || FALLBACK_ABOUT);

  useEffect(() => {
    if (propAbout && propAbout.name) {
      setAbout(propAbout);
      return;
    }
    getAbout().then((data) => {
      if (data && data.name) setAbout(data);
    });
  }, [propAbout]);

  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', padding: '2.5rem 0 1.5rem' }}>
          {/* Footer Navigation Bar */}
          <nav className="footer-nav-list" aria-label="Footer Navigation">
            <a href="#home" className="footer-nav-link">Home</a>
            <a href="#about" className="footer-nav-link">About</a>
            <a href="#services" className="footer-nav-link">What I Do</a>
            <a href="#skills" className="footer-nav-link">Skills</a>
            <a href="#journey" className="footer-nav-link">Journey</a>
            <a href="#projects" className="footer-nav-link">Projects</a>
            <a href="#contact" className="footer-nav-link">Contact</a>
            <a
              href={cvUrl || '/images/Jeseena_CV.pdf'}
              target="_blank"
              rel="noreferrer"
              className="footer-nav-link"
              download="Jeseena_FullStackDeveloper_CV.pdf"
            >
              Resume
            </a>
          </nav>

          {/* Social / Logo Icons */}
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
            {(about?.social_links && about.social_links.length > 0
              ? about.social_links
              : [
                  { id: 1, platform_name: 'GitHub', url: about?.github_url || 'https://github.com/Jeseena-codes', icon: 'bx bxl-github' },
                  { id: 2, platform_name: 'LinkedIn', url: about?.linkedin_url || 'https://linkedin.com/in/jeseena-j-48a126336', icon: 'bx bxl-linkedin' },
                  { id: 3, platform_name: 'Email', url: `mailto:${about?.email || 'jeseena2005@gmail.com'}`, icon: 'bx bx-envelope' },
                ]
            ).map((link, idx) => {
              const isMail = (link.url || '').startsWith('mailto:');
              return (
                <a
                  key={link.id || idx}
                  href={link.url}
                  target={isMail ? '_self' : '_blank'}
                  rel="noreferrer"
                  className="hero-social-icon-circle"
                  title={link.platform_name || 'Social'}
                >
                  <i className={link.icon || 'bx bx-link'}></i>
                </a>
              );
            })}
          </div>
        </div>

        <div className="footer-bottom" style={{ textAlign: 'center', borderTop: '1px solid var(--border-ultra-light)', padding: '1.2rem 0', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
          <span>© {new Date().getFullYear()} {about?.name || 'Jeseena'}. {about?.footer_copyright_text || 'All rights reserved. • Built with React & Django REST Framework.'}</span>
        </div>
      </div>
    </footer>
  );
}
