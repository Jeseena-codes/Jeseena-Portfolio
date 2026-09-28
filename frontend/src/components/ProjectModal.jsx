import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import InteractiveImage3D from './InteractiveImage3D';

export default function ProjectModal({ project, onClose }) {
  const modalOverlayRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    // 1. Lock background body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 2. Pause Lenis smooth scrolling so wheel events don't scroll background
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.stop();
    }

    // 3. Attach native DOM wheel event listener to stop propagation to window
    const overlay = modalOverlayRef.current;
    const content = modalContentRef.current;

    const handleNativeWheel = (e) => {
      // Stop wheel events from propagating to window (where Lenis listens)
      e.stopPropagation();

      // If scrolling on the backdrop overlay outside content, scroll modal content smoothly
      if (e.target === overlay && content) {
        e.preventDefault();
        content.scrollTop += e.deltaY;
      }
    };

    if (overlay) {
      overlay.addEventListener('wheel', handleNativeWheel, { passive: false });
    }

    // Auto-focus modal content for keyboard accessibility & immediate wheel capture
    if (content) {
      content.focus();
    }

    return () => {
      if (overlay) {
        overlay.removeEventListener('wheel', handleNativeWheel);
      }

      // Restore previous body overflow value when modal closes or unmounts
      document.body.style.overflow = originalOverflow;

      // Restore Lenis smooth scrolling
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    };
  }, [project]);

  if (!project) return null;

  const overview = project.overview || project.description || '';
  const problem = project.problem || '';
  const solution = project.solution || '';
  const myRole = project.my_role || project.role || '';

  const features = Array.isArray(project.feature_list) && project.feature_list.length > 0
    ? project.feature_list
    : Array.isArray(project.features) && project.features.length > 0
    ? project.features
    : typeof project.features === 'string'
    ? project.features.split('\n').map((f) => f.trim().replace(/^[-•*]\s*/, '')).filter(Boolean)
    : [];

  const technologies = Array.isArray(project.tech_list) && project.tech_list.length > 0
    ? project.tech_list
    : Array.isArray(project.technologies) && project.technologies.length > 0
    ? project.technologies
    : typeof project.technologies === 'string'
    ? project.technologies.split(/[\n,]/).map((t) => t.trim().replace(/^[-•*]\s*/, '')).filter(Boolean)
    : [];

  const githubTarget =
    project.github_url ||
    (project.project_number === '01' || (project.title && project.title.includes('CareNova'))
      ? 'https://github.com/Jeseena-codes/Carenova-Medical-Store-Website-'
      : project.project_number === '02' || (project.title && project.title.includes('JobBizz'))
      ? 'https://github.com/Jeseena-codes/JOBBIZZ-Job-solution'
      : 'https://github.com/Jeseena-codes');

  const sectionHeadingStyle = {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--crimson-accent)',
    marginBottom: '0.65rem',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
  };

  const sectionBodyStyle = {
    fontSize: '0.92rem',
    lineHeight: 1.7,
    color: '#d1d1dc',
    marginBottom: 0,
    whiteSpace: 'pre-line',
    display: 'block',
    WebkitLineClamp: 'unset',
    overflow: 'visible',
  };

  const modalNode = (
    <div
      ref={modalOverlayRef}
      className="modal-overlay project-modal-overlay"
      onClick={onClose}
      data-lenis-prevent
      data-lenis-prevent-wheel
    >
      <div
        ref={modalContentRef}
        className="modal-content project-modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        data-lenis-prevent
        data-lenis-prevent-wheel
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {project.subtitle && (
          <div className="project-category-tag" style={{ marginBottom: '0.5rem' }}>
            {project.project_number ? `PROJECT ${project.project_number} — ` : ''}{project.subtitle}
          </div>
        )}

        <h3 className="project-card-title modal-project-title">
          {project.title}
        </h3>

        <div className="project-image-box modal-project-image">
          <InteractiveImage3D
            src={(() => {
              const raw = project.display_image || project.image_url || '/images/carenova.png';
              return raw.startsWith('/') || raw.startsWith('http') ? raw : `/${raw}`;
            })()}
            alt={project.title}
            imgStyle={{ maxHeight: '380px', objectFit: 'cover' }}
          />
        </div>

        {/* 1. OVERVIEW */}
        {overview && (
          <div style={{ marginBottom: '1.6rem' }}>
            <h4 style={sectionHeadingStyle}>
              OVERVIEW
            </h4>
            <p className="project-card-desc modal-project-desc" style={sectionBodyStyle}>
              {overview}
            </p>
          </div>
        )}

        {/* 2. PROBLEM / GOAL */}
        {problem && (
          <div style={{ marginBottom: '1.6rem' }}>
            <h4 style={sectionHeadingStyle}>
              PROBLEM / GOAL
            </h4>
            <p className="project-card-desc modal-project-desc" style={sectionBodyStyle}>
              {problem}
            </p>
          </div>
        )}

        {/* 3. SOLUTION */}
        {solution && (
          <div style={{ marginBottom: '1.6rem' }}>
            <h4 style={sectionHeadingStyle}>
              SOLUTION
            </h4>
            <p className="project-card-desc modal-project-desc" style={sectionBodyStyle}>
              {solution}
            </p>
          </div>
        )}

        {/* 4. KEY FEATURES */}
        {features.length > 0 && (
          <div style={{ marginBottom: '1.8rem' }}>
            <h4 style={sectionHeadingStyle}>
              KEY FEATURES
            </h4>
            <ul className="project-feature-list">
              {features.map((feat, idx) => (
                <li key={idx} className="project-feature-item" style={{ fontSize: '0.9rem' }}>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 5. TECHNOLOGIES */}
        {technologies.length > 0 && (
          <div style={{ marginBottom: '1.8rem' }}>
            <h4 style={sectionHeadingStyle}>
              TECHNOLOGIES
            </h4>
            <div className="project-tech-tags">
              {technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="tech-tag"
                  style={{ borderColor: 'var(--border-crimson)', color: '#ffffff' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 6. MY ROLE */}
        {myRole && (
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={sectionHeadingStyle}>
              MY ROLE
            </h4>
            <p className="project-card-desc modal-project-desc" style={sectionBodyStyle}>
              {myRole}
            </p>
          </div>
        )}

        {/* Project Action Links */}
        <div className="project-actions">
          {githubTarget && (
            <a
              href={githubTarget}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              VIEW GITHUB CODE
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              LIVE DEMO
            </a>
          )}
        </div>
      </div>
    </div>
  );

  // Mount directly to document.body so the modal is never trapped inside parent transforms or fixed header z-indexes
  return typeof document !== 'undefined' ? createPortal(modalNode, document.body) : modalNode;
}
