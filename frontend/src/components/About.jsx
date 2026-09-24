import React from 'react';

export default function About({ about, cvUrl }) {
  const name = about?.name || 'JESEENA J';
  const title = about?.professional_title || 'FULL STACK DEVELOPER';
  const quote = about?.quote || 'Build. Learn. Improve. Repeat.';

  return (
    <section id="about" className="portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">01 / ABOUT ME</div>
          <h2 className="section-title">THE DEVELOPER BEHIND THE CODE</h2>
          <p className="section-subtitle">
            A fresher Full Stack Developer driven by curiosity, analytical precision, and practical problem-solving.
          </p>
        </div>

        <div className="about-grid-layout">
          {/* Left Column: Narrative Story & Highlights */}
          <div className="about-left-col">
            <h3 className="about-editorial-headline">
              FROM WORDS TO CODE — <span className="crimson-text">CRAFTING REAL-WORLD</span> WEB EXPERIENCES.
            </h3>

            <p className="about-narrative-text">
              I completed intensive <strong>Python Full Stack Development training with an internship</strong> at Safe Technologies. Through structured practical projects, I have developed solid experience creating complete web applications, designing relational MySQL schemas, and building backend business logic using Django.
            </p>

            <p className="about-narrative-text">
              I love building practical, responsive, and user-friendly web applications that solve tangible problems. I am currently expanding my knowledge of <strong>React</strong>, <strong>Node.js</strong>, and <strong>RESTful APIs</strong> to continuously grow as a versatile Full Stack Developer.
            </p>

            <p className="about-narrative-text">
              My background in <strong>Functional English</strong> from Govt. Arts & Science College, Nattukal gives me strong linguistic precision, analytical problem-solving skills, and a clear approach to documentation and code maintainability.
            </p>

            {/* Key Highlight Cards */}
            <div className="about-key-highlights-grid">
              <div className="about-highlight-card">
                <div className="about-highlight-title">Full Stack Focus</div>
                <div className="about-highlight-val">Python, Django & React Integration</div>
              </div>
              <div className="about-highlight-card">
                <div className="about-highlight-title">Database Engineering</div>
                <div className="about-highlight-val">MySQL Schema Design & CRUD Logic</div>
              </div>
              <div className="about-highlight-card">
                <div className="about-highlight-title">Linguistic Precision</div>
                <div className="about-highlight-val">Analytical Thinking & Clear Documentation</div>
              </div>
              <div className="about-highlight-card">
                <div className="about-highlight-title">Professional Mindset</div>
                <div className="about-highlight-val">Responsive UI & Maintainable Code</div>
              </div>
            </div>
          </div>

          {/* Right Column: Side Profile CTA Card */}
          <div className="about-side-profile-card" id="resume">
            <div className="about-badge-tag">✦ AVAILABLE FOR HIRE</div>

            <h4 className="about-identity-name">{name}</h4>
            <div className="about-identity-role">{title}</div>

            <div className="about-quote-box">
              “{quote}”
            </div>

            <div style={{ marginTop: '1.2rem', textAlign: 'left' }}>
              <div style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', color: 'var(--text-white)', marginBottom: '0.3rem' }}>
                Ready to build something?
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.5 }}>
                "I'm open to new opportunities, freelance projects and collaborations."
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
