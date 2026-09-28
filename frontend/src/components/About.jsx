import React, { useState, useEffect } from 'react';
import TextRepel from './TextRepel';

export default function About({ about, cvUrl }) {
  const [activeHighlightIdx, setActiveHighlightIdx] = useState(null);
  const [isSideActive, setIsSideActive] = useState(false);

  useEffect(() => {
    const handlePointerOutside = (e) => {
      if (!e.target.closest('.about-highlight-card')) {
        setActiveHighlightIdx(null);
      }
      if (!e.target.closest('.about-side-profile-card')) {
        setIsSideActive(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerOutside);
    return () => document.removeEventListener('pointerdown', handlePointerOutside);
  }, []);

  const name = 'Jeseena J';
  const title = 'Full Stack Developer';
  const quote = 'Build. Learn. Improve. Repeat.';
  const headline = about?.about_headline || 'FROM WORDS TO CODE — CRAFTING REAL-WORLD WEB EXPERIENCES.';
  const sideBadge = '✦ AVAILABLE FOR HIRE';
  const sideTitle = 'Ready to build something?';
  const sideSubtext = "\"I'm open to new opportunities, freelance projects and collaborations.\"";

  // Parse paragraphs from about_text or fall back
  const paragraphs = about?.about_text
    ? about.about_text.split(/\n\s*\n/).filter(p => p.trim().length > 0)
    : [
        'I completed intensive Python Full Stack Development training with an internship at Safe Technologies. Through structured practical projects, I have developed solid experience creating complete web applications, designing relational MySQL schemas, and building backend business logic using Django.',
        'I love building practical, responsive, and user-friendly web applications that solve tangible problems. I am currently expanding my knowledge of React, Node.js, and RESTful APIs to continuously grow as a versatile Full Stack Developer.',
        'My background in Functional English from Govt. Arts & Science College, Nattukal gives me strong linguistic precision, analytical problem-solving skills, and a clear approach to documentation and code maintainability.'
      ];

  // Exact 4 Full Stack Focus items specified
  const highlights = [
    { title: 'Full Stack Focus', val: 'Python, Django & React Integration' },
    { title: 'Database Engineering', val: 'MySQL Schema Design & CRUD Logic' },
    { title: 'Linguistic Precision', val: 'Analytical Thinking & Clear Documentation' },
    { title: 'Professional Mindset', val: 'Responsive UI & Maintainable Code' }
  ];

  // Render headline with crimson accent after dash if present
  const renderHeadline = () => {
    if (headline.includes('—')) {
      const [before, after] = headline.split('—');
      return (
        <TextRepel
          as="h3"
          className="about-editorial-headline"
          segments={[
            { text: `${before.trim()} — ` },
            { text: after.trim(), className: 'crimson-text' }
          ]}
        />
      );
    }
    return <TextRepel as="h3" className="about-editorial-headline" text={headline} />;
  };

  return (
    <section id="about" className="portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">01 / ABOUT ME</div>
          <TextRepel as="h2" className="section-title" text={about?.about_section_title || 'THE DEVELOPER BEHIND THE CODE'} />
          <p className="section-subtitle">
            {about?.about_section_subtitle || 'A fresher Full Stack Developer driven by curiosity, analytical precision, and practical problem-solving.'}
          </p>
        </div>

        <div className="about-grid-layout">
          {/* Left Column: Narrative Story & Highlights */}
          <div className="about-left-col">
            {renderHeadline()}

            {paragraphs.map((para, idx) => (
              <p key={idx} className="about-narrative-text">
                {para}
              </p>
            ))}

            {/* Key Highlight Cards with Individual Popup Animation */}
            <div className="about-key-highlights-grid">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className={`about-highlight-card ${activeHighlightIdx === idx ? 'is-touched' : ''}`}
                  tabIndex="0"
                  onClick={() => setActiveHighlightIdx(prev => prev === idx ? null : idx)}
                >
                  <div className="about-highlight-title">{item.title}</div>
                  {item.val && <div className="about-highlight-val">{item.val}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Side Profile CTA Card with Individual Popup Animation */}
          <div
            className={`about-side-profile-card ${isSideActive ? 'is-touched' : ''}`}
            id="resume"
            tabIndex="0"
            onClick={(e) => {
              if (e.target.closest('a') || e.target.closest('button')) return;
              setIsSideActive(prev => !prev);
            }}
          >
            <div className="about-badge-tag">{sideBadge}</div>

            <h4 className="about-identity-name">{name}</h4>
            <div className="about-identity-role">{title}</div>

            <div className="about-quote-box">
              “{quote}”
            </div>

            <div style={{ marginTop: '1.2rem', textAlign: 'left' }}>
              <div style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', color: 'var(--text-white)', marginBottom: '0.3rem' }}>
                {sideTitle}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.5 }}>
                {sideSubtext}
              </p>
            </div>

            <div className="about-cta-buttons-wrap">
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
        </div>
      </div>
    </section>
  );
}
