import React from 'react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const features = Array.isArray(project.feature_list) 
    ? project.feature_list 
    : (typeof project.features === 'string' ? project.features.split('\n').filter(Boolean) : []);

  const technologies = Array.isArray(project.tech_list)
    ? project.tech_list
    : (typeof project.technologies === 'string' ? project.technologies.split(',').map(t => t.trim()).filter(Boolean) : []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="project-category-tag" style={{ marginBottom: '0.4rem' }}>
          PROJECT {project.project_number} — {project.subtitle}
        </div>

        <h3 className="project-card-title" style={{ fontSize: '2.2rem' }}>
          {project.title}
        </h3>

        <div className="project-image-box" style={{ margin: '1.5rem 0', maxHeight: '380px' }}>
          <img src={project.display_image || project.image_url} alt={project.title} />
        </div>

        <p className="project-card-desc" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
          {project.description}
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--crimson-accent)', marginBottom: '0.8rem' }}>
            KEY ARCHITECTURAL FEATURES
          </h4>
          <ul className="project-feature-list">
            {features.map((feat, idx) => (
              <li key={idx} className="project-feature-item" style={{ fontSize: '0.9rem' }}>
                {feat}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--crimson-accent)', marginBottom: '0.8rem' }}>
            TECHNOLOGIES EMPLOYED
          </h4>
          <div className="project-tech-tags">
            {technologies.map((t, idx) => (
              <span key={idx} className="tech-tag" style={{ borderColor: 'var(--border-crimson)', color: '#ffffff' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Project Action Links */}
        {(() => {
          const githubTarget = project.github_url || (
            project.project_number === '01' || (project.title && project.title.includes('CareNova'))
              ? 'https://github.com/Jeseena-codes/Carenova-Medical-Store-Website-'
              : (project.project_number === '02' || (project.title && project.title.includes('JobBizz'))
                  ? 'https://github.com/Jeseena-codes/JOBBIZZ-Job-solution'
                  : 'https://github.com/Jeseena-codes')
          );

          return (
            <div className="project-actions">
              {githubTarget && (
                <a href={githubTarget} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  VIEW GITHUB CODE
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  LIVE DEMO
                </a>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
