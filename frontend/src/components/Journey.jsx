import React from 'react';

const DEFAULT_EDUCATION = [
  {
    year: '2026',
    title: 'Full Stack Development',
    description: 'Building projects, improving React/Django skills and developing my portfolio.'
  },
  {
    year: '2025–2026',
    title: 'Python Full Stack Development with Internship',
    description: 'Safe Technologies — Comprehensive Python Full Stack Development training with internship, developing complete web platforms with Python, Django, and MySQL.'
  },
  {
    year: '2025',
    title: 'Bachelor of Arts in Functional English',
    description: 'Govt. Arts & Science College, Nattukal, Kozhinjampara — Cultivated strong analytical reasoning, communication, and clear technical documentation skills.'
  },
  {
    year: '2022',
    title: 'Higher Secondary — Commerce',
    description: 'Govt. Victoria Girls Higher Secondary School, Anicode — Foundational academic studies in commerce, mathematics, and business communication.'
  },
];

const WORK_PROCESS = [
  { num: '01', title: 'Discover', desc: 'Research & Requirements Analysis', icon: 'bx bx-search-alt' },
  { num: '02', title: 'Plan', desc: 'Architecture & System Flow', icon: 'bx bx-notepad' },
  { num: '03', title: 'Design', desc: 'Responsive UI & Data Modeling', icon: 'bx bx-palette' },
  { num: '04', title: 'Develop', desc: 'Frontend & Backend Integration', icon: 'bx bx-code-alt' },
  { num: '05', title: 'Test', desc: 'Functionality & Quality Checks', icon: 'bx bx-check-shield' },
  { num: '06', title: 'Deliver', desc: 'Deployment & Ongoing Maintenance', icon: 'bx bx-cloud-upload' }
];

export default function Journey({ journey = [], about }) {
  const displayJourney = journey.length > 0 ? journey : DEFAULT_EDUCATION;
  const quote = about?.quote || 'Small steps every day lead to big dreams.';
  const author = about?.name || 'Jeseena J';

  return (
    <section id="journey" className="middle-3col-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">04 / EXPERIENCE &amp; EDUCATION</div>
          <h2 className="section-title">EDUCATION &amp; PROCESS</h2>
          <p className="section-subtitle">
            A structured timeline of my learning milestones, methodology, and core technical competencies.
          </p>
        </div>

        <div className="middle-2col-grid">
          {/* Column 1: EDUCATION (Glowing Vertical Timeline) */}
          <div className="middle-col-box">
            <h3 className="col-header-title">EDUCATION</h3>

            <div className="glowing-timeline-container">
              <div className="glowing-timeline-line"></div>
              {displayJourney.map((item, idx) => (
                <div key={item.id || idx} className="glowing-timeline-item">
                  <div className="glowing-timeline-node"></div>
                  <span className="timeline-node-year">{item.year}</span>
                  <h4 className="timeline-node-title">{item.title}</h4>
                  <p className="timeline-node-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: WORK PROCESS */}
          <div className="middle-col-box">
            <h3 className="col-header-title">WORK PROCESS</h3>

            <div className="work-process-list">
              {WORK_PROCESS.map((step, idx) => (
                <div key={idx} className="process-step-row">
                  <div className="process-circle-icon">
                    <i className={step.icon} style={{ fontSize: '1rem' }}></i>
                  </div>
                  <div className="process-step-content">
                    <span className="process-step-title">{step.title}</span>
                    <span className="process-step-desc">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
