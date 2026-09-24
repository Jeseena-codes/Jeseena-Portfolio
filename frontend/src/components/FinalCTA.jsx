import React from 'react';

export default function FinalCTA({ cvUrl }) {
  return (
    <section className="final-cta-block scroll-fade-item reveal-on-scroll">
      <div className="container">
        <h2 className="final-cta-title">Available for Hire & Freelance</h2>
        <p className="final-cta-subtext">
          "I'm open to new opportunities, freelance projects and collaborations."
        </p>

        <div className="final-cta-buttons">
          <a href="#contact" className="btn-cta-hire">
            <span>Hire Me</span>
            <span>→</span>
          </a>
          <a
            href={cvUrl || '/images/Jeseena_CV.pdf'}
            download="Jeseena_FullStackDeveloper_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-cv"
          >
            <span>Download CV</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
