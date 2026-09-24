import React from 'react';

export default function Services({ services = [] }) {
  return (
    <section id="services" className="portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">02 / WHAT I DO</div>
          <h2 className="section-title">TECHNICAL CAPABILITIES & SERVICES</h2>
          <p className="section-subtitle">
            Practical, end-to-end full stack development capabilities honed through structured projects and dedicated problem-solving.
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="services-grid">
          {services.map((item) => (
            <div key={item.id || item.service_number} className="service-card">
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
          ))}
        </div>
      </div>
    </section>
  );
}
