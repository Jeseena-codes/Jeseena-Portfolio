import React, { useState, useEffect } from 'react';
import TextRepel from './TextRepel';

export default function Services({ services = [], about }) {
  const [activeServiceId, setActiveServiceId] = useState(null);

  useEffect(() => {
    const handlePointerOutside = (e) => {
      if (!e.target.closest('.service-card')) {
        setActiveServiceId(null);
      }
    };
    document.addEventListener('pointerdown', handlePointerOutside);
    return () => document.removeEventListener('pointerdown', handlePointerOutside);
  }, []);

  const title = about?.services_section_title || 'TECHNICAL CAPABILITIES & SERVICES';
  const subtitle = about?.services_section_subtitle || (
    'Practical, end-to-end full stack development capabilities honed through structured projects and dedicated problem-solving.'
  );

  return (
    <section id="services" className="portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">02 / WHAT I DO</div>
          <TextRepel as="h2" className="section-title" text={title} />
          <p className="section-subtitle">
            {subtitle}
          </p>
        </div>

        {/* Capabilities Grid */}
        {services.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-gray)', padding: '3rem 1rem' }}>
            Capabilities will appear here once added in the Admin Panel.
          </div>
        ) : (
          <div className="services-grid">
            {services.map((item) => {
              const cardKey = item.id || item.service_number;
              const isTouched = activeServiceId === cardKey;
              return (
                <div
                  key={cardKey}
                  className={`service-card ${isTouched ? 'is-touched' : ''}`}
                  tabIndex="0"
                  onClick={() => setActiveServiceId(prev => prev === cardKey ? null : cardKey)}
                >
                  <div className="service-card-num">{item.service_number}</div>
                  <h3 className="service-card-title">{item.title}</h3>
                  <p className="service-card-desc">{item.description}</p>
                  
                  <div className="service-tags-wrap">
                    {(item.skills || (item.skills_list ? item.skills_list.split(',').map(s => s.trim()) : [])).map((tag, idx) => (
                      <span key={idx} className="service-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
