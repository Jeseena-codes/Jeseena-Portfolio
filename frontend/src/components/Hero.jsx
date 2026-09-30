import React from 'react';
import Profile3D from './Profile3D';
import TextRepel from './TextRepel';
import profilePhoto from '../assets/profile.png';

export default function Hero({ about }) {
  const name = about?.name || 'JESEENA J';
  const title = about?.professional_title || 'FULL STACK DEVELOPER';
  const bio = about?.short_introduction || (
    "Aspiring Full Stack Developer with hands-on training in Python, Django, and front-end technologies, backed by a strong foundation in written communication and analytical thinking from a background in English Language and Communication. Built a complete medical store management web application during an internship, covering both front-end and back-end development. Eager to apply strong problem-solving skills and attention to detail to a full-time development role."
  );
  const location = about?.location || 'PALAKKAD, KERALA';
  const photoUrl = profilePhoto || '/images/profile.png';
  const email = about?.email || 'jeseena2005@gmail.com';
  const github = about?.github_url || 'https://github.com/Jeseena-codes';
  const linkedin = about?.linkedin_url || 'https://linkedin.com/in/jeseena-j-48a126336';
  const watermark = about?.hero_watermark || 'PORTFOLIO';
  const availability = about?.availability_status || 'AVAILABLE FOR HIRING';
  const greeting = about?.greeting_text || 'Hi, I’m';
  const leadText = about?.hero_lead_text || 'Turning ideas into functional web experiences.';
  const highlights = (about?.hero_highlights_list && about.hero_highlights_list.length > 0)
    ? about.hero_highlights_list
    : ['Responsive Development', 'Clean Code', 'User-Centered Design'];

  const socialLinks = (about?.social_links && about.social_links.length > 0)
    ? about.social_links
    : [
        { id: 1, platform_name: 'GitHub', url: github, icon: 'bx bxl-github' },
        { id: 2, platform_name: 'LinkedIn', url: linkedin, icon: 'bx bxl-linkedin' },
        { id: 3, platform_name: 'Email', url: `mailto:${email}`, icon: 'bx bx-envelope' },
      ];

  return (
    <section id="home" className="hero-section">
      {/* Giant Red Background Word "PORTFOLIO" */}
      <div className="hero-giant-bg">{watermark}</div>

      <div className="container">
        <div className="hero-content-grid">
          {/* Left Hero Column */}
          <div className="hero-left-box">
            {/* Status Badge: Available for Hiring */}
            <div className="hero-status-pill">
              <span className="pulsing-live-dot"></span>
              <span>{availability}</span>
            </div>

            <TextRepel as="span" className="hero-script-greeting" text={greeting} />
            <TextRepel as="h1" className="hero-big-name" text={name} />
            <TextRepel as="h2" className="hero-big-title" text={title} />

            <p className="hero-bio-paragraph">{bio}</p>

            {/* Social icons directly below paragraph */}
            <div className="hero-social-icons-row">
              <span className="hero-social-label">Connect:</span>
              {socialLinks.map((link, idx) => {
                const isMail = (link.url || '').startsWith('mailto:');
                return (
                  <a
                    key={link.id || idx}
                    href={link.url}
                    target={isMail ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="hero-social-icon-circle"
                    title={`${link.platform_name || 'Social'} Profile`}
                  >
                    <i className={link.icon || 'bx bx-link'}></i>
                  </a>
                );
              })}
            </div>

            <div className="hero-location-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {location}
            </div>
          </div>

          {/* Center Portrait Container with 3D Depth & Parallax */}
          <div className="hero-portrait-col">
            <div className="hero-portrait-container">
              <Profile3D
                src={photoUrl}
                alt={`${name} - ${title}`}
              />
            </div>
          </div>

          {/* Right Hero Highlights Box */}
          <div className="hero-right-box">
            <div className="hero-right-lead-row">
              <div className="hero-circle-plus">+</div>
              <div className="hero-lead-text">
                {leadText}
              </div>
            </div>

            <ul className="hero-side-bullet-list">
              {highlights.map((item, idx) => (
                <li key={idx} className="hero-side-bullet-item">
                  <span className="red-cross">+</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
