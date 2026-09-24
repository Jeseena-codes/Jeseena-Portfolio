import React, { useState } from 'react';

export default function Hero({ about }) {
  const [imgError, setImgError] = useState(false);

  const name = about?.name || 'JESEENA J';
  const title = about?.professional_title || 'FULL STACK DEVELOPER';
  const bio = about?.short_introduction || (
    "Aspiring Full Stack Developer with hands-on training in Python, Django, and front-end technologies, backed by a strong foundation in written communication and analytical thinking from a background in English Language and Communication. Built a complete medical store management web application during an internship, covering both front-end and back-end development. Eager to apply strong problem-solving skills and attention to detail to a full-time development role."
  );
  const location = about?.location || 'PALAKKAD, KERALA';
  const photoUrl = about?.display_photo || '/images/profile.jpg';
  const email = about?.email || 'jeseena2005@gmail.com';
  const github = about?.github_url || 'https://github.com/Jeseena-codes';
  const linkedin = about?.linkedin_url || 'https://linkedin.com/in/jeseena-j-48a126336';

  return (
    <section id="home" className="hero-section">
      {/* Giant Red Background Word "PORTFOLIO" */}
      <div className="hero-giant-bg">PORTFOLIO</div>

      <div className="container">
        <div className="hero-content-grid">
          {/* Left Hero Column */}
          <div className="hero-left-box">
            {/* Status Badge: Available for Hiring */}
            <div className="hero-status-pill">
              <span className="pulsing-live-dot"></span>
              <span>AVAILABLE FOR HIRING</span>
            </div>

            <span className="hero-script-greeting">Hi, I’m</span>
            <h1 className="hero-big-name">{name}</h1>
            <h2 className="hero-big-title">{title}</h2>

            <p className="hero-bio-paragraph">{bio}</p>

            {/* Social icons directly below paragraph */}
            <div className="hero-social-icons-row">
              <span className="hero-social-label">Connect:</span>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon-circle"
                title="GitHub Profile"
              >
                <i className="bx bxl-github"></i>
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon-circle"
                title="LinkedIn Profile"
              >
                <i className="bx bxl-linkedin"></i>
              </a>

              <a
                href={`mailto:${email}`}
                className="hero-social-icon-circle"
                title="Email Jeseena"
              >
                <i className="bx bx-envelope"></i>
              </a>
            </div>

            <div className="hero-location-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {location}
            </div>
          </div>

          {/* Center Portrait Container */}
          <div className="hero-portrait-col">
            <div className="hero-portrait-container">
              {!imgError ? (
                <img
                  src={photoUrl}
                  alt={`${name} - ${title}`}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(180deg, #18181c 0%, #060606 100%)',
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <p style={{ marginTop: '0.8rem', fontSize: '0.75rem', color: '#A0A0A0' }}>
                    Profile Photo Slot:<br />
                    <code>public/images/profile.jpg</code>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Hero Highlights Box */}
          <div className="hero-right-box">
            <div className="hero-right-lead-row">
              <div className="hero-circle-plus">+</div>
              <div className="hero-lead-text">
                Turning ideas into functional web experiences.
              </div>
            </div>

            <ul className="hero-side-bullet-list">
              <li className="hero-side-bullet-item">
                <span className="red-cross">+</span> Responsive Development
              </li>
              <li className="hero-side-bullet-item">
                <span className="red-cross">+</span> Clean Code
              </li>
              <li className="hero-side-bullet-item">
                <span className="red-cross">+</span> User-Centered Design
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
