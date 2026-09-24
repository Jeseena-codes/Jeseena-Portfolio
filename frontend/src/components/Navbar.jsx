import React from 'react';

export default function Navbar({ about, cvUrl, theme, toggleTheme }) {
  const name = about?.name || 'JESEENA';
  const title = about?.professional_title || 'FULL STACK DEVELOPER';

  return (
    <header className="header-bar">
      <div className="container header-container">
        {/* Left: Brand name + title */}
        <a href="#home" className="header-brand">
          <span className="brand-name">{name}</span>
          <span className="brand-role">{title}</span>
        </a>

        {/* Center: Navigation Links */}
        <nav className="header-nav-list">
          <a href="#home" className="header-nav-link">Home</a>
          <a href="#about" className="header-nav-link">About</a>
          <a href="#services" className="header-nav-link">What I Do</a>
          <a href="#skills" className="header-nav-link">Skills</a>
          <a href="#journey" className="header-nav-link">Journey</a>
          <a href="#projects" className="header-nav-link">Projects</a>
          <a href="#contact" className="header-nav-link">Contact</a>
          <a
            href="#resume"
            className="header-nav-link"
          >
            Resume
          </a>
        </nav>

        {/* Right: Download CV + Light/Dark Mode Toggle with small sun icon */}
        <div className="header-right-actions">
          <a
            href={cvUrl || '/images/Jeseena_CV.pdf'}
            download="Jeseena_FullStackDeveloper_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="header-status-link"
          >
            DOWNLOAD CV <span className="plus">↓</span>
          </a>

          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle Light and Dark Mode"
          >
            {theme === 'light' ? (
              <i className="bx bx-moon theme-toggle-icon" title="Dark Mode"></i>
            ) : (
              <i className="bx bx-sun theme-toggle-icon" title="Light Mode"></i>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
