import React, { useState, useEffect } from 'react';
import { getProjects, FALLBACK_PROJECTS } from '../services/api';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    getProjects().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Header Row with Red Bar and View All Link */}
        <div className="projects-header-row">
          <div className="projects-title-box">
            <h2 className="projects-section-title">SELECTED PROJECTS</h2>
            <div className="title-red-bar"></div>
          </div>

          <a
            href="https://github.com/Jeseena-codes"
            target="_blank"
            rel="noopener noreferrer"
            className="projects-view-all-link"
            title="View all repositories on GitHub"
          >
            View All Projects →
          </a>
        </div>

        {/* 4-Project Horizontal Grid matching Reference */}
        <div className="projects-horizontal-grid">
          {projects.slice(0, 4).map((proj) => {
            const num = proj.project_number || '01';
            const techStr = proj.technologies || (Array.isArray(proj.tech_list) ? proj.tech_list.join(' | ') : '');
            const imgSrc = proj.display_image || proj.image_url || '/images/carenova.png';

            return (
              <div
                key={proj.id || proj.slug || proj.title}
                className="project-item-card"
                onClick={() => setSelectedProject(proj)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="project-thumb-frame"
                  title="Click to view details"
                >
                  <img src={imgSrc} alt={proj.title} loading="lazy" />
                </div>

                <div className="project-item-meta">
                  <div className="project-item-text">
                    <h3
                      className="project-item-title"
                    >
                      {proj.title}
                    </h3>
                    <span className="project-item-sub">{proj.subtitle}</span>
                    <span className="project-item-tech">{techStr}</span>
                  </div>

                  <div
                    className="project-num-arrow"
                    title="Click to view details"
                  >
                    {num} →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Modal Details */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}
