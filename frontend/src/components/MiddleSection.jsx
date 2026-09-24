import React, { useState, useEffect } from 'react';
import { getJourney, getWorkProcess, getSkills } from '../services/api';

export default function MiddleSection({ about }) {
  const [journey, setJourney] = useState([
    { year: '2025', title: 'Bachelor of Arts in Functional English', description: 'Govt. Arts & Science College, Nattukal, Kozhinjampara' },
    { year: '2022', title: 'Higher Secondary (Commerce)', description: 'Govt. Victoria Girls Higher Secondary School, Anicode' },
    { year: '2025–2026', title: 'Python Full Stack Development with Internship', description: 'Safe Technologies' },
  ]);

  const [skills, setSkills] = useState([
    'PYTHON', 'DJANGO', 'HTML', 'CSS', 'JAVASCRIPT', 'MYSQL',
    'REACT (Learning)', 'NODE.JS (Learning)', 'API (Learning)',
    'VS CODE', 'GIT & GITHUB', 'NOTEPAD', 'BASIC ENGLISH COMMUNICATION'
  ]);

  const [process, setProcess] = useState([
    { num: '01', title: 'Discover', desc: 'Research & Analysis', icon: '🔍' },
    { num: '02', title: 'Plan', desc: 'UI/UX Flow & Wireframes', icon: '📋' },
    { num: '03', title: 'Design', desc: 'High-Fidelity UI', icon: '📐' },
    { num: '04', title: 'Develop', desc: 'Frontend & Backend', icon: '</>' },
    { num: '05', title: 'Test', desc: 'Feedback & Improvements', icon: '✓' },
    { num: '06', title: 'Deliver', desc: 'Final Design & Handover', icon: '☁' },
  ]);

  useEffect(() => {
    getJourney().then((data) => {
      if (Array.isArray(data) && data.length > 0) setJourney(data);
    });
    getWorkProcess().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const iconMap = ['🔍', '📋', '📐', '</>', '✓', '☁'];
        setProcess(data.map((p, idx) => ({
          num: p.step_number || `0${idx + 1}`,
          title: p.title,
          desc: p.description,
          icon: iconMap[idx % iconMap.length],
        })));
      }
    });
  }, []);

  const quote = about?.quote || 'Small steps every day lead to big dreams.';
  const author = about?.name || 'Jeseena J';

  return (
    <section className="middle-3col-section">
      <div className="container">
        <div className="middle-3col-grid">
          {/* Column 1: EDUCATION & SKILLS */}
          <div className="middle-col-box">
            <h2 className="col-header-title">EDUCATION & SKILLS</h2>

            <span className="sub-red-label">EDUCATION</span>
            <div className="edu-timeline-list">
              {journey.map((item, idx) => (
                <div key={idx} className="edu-item-row">
                  <div className="edu-info">
                    <span className="edu-degree">{item.title}</span>
                    <span className="edu-institution">{item.description}</span>
                  </div>
                  <span className="edu-year">{item.year}</span>
                </div>
              ))}
            </div>

            <span className="sub-red-label">SKILLS</span>
            <div className="skills-pill-cloud">
              {skills.map((s, idx) => (
                <span key={idx} className="ref-skill-pill">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: WORK PROCESS */}
          <div className="middle-col-box">
            <h2 className="col-header-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              WORK PROCESS
            </h2>

            <div className="work-process-list">
              {process.map((step, idx) => (
                <div key={idx} className="process-step-row">
                  <div className="process-circle-icon">
                    <span style={{ fontSize: '0.85rem' }}>{step.icon}</span>
                  </div>
                  <div className="process-step-content">
                    <span className="process-step-title">{step.title}</span>
                    <span className="process-step-desc">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: QUOTE / CTA CARD */}
          <div className="ref-quote-card">
            <div className="quote-giant-marks">““</div>

            <p className="quote-main-statement">
              {quote}
            </p>

            <span className="quote-cursive-signature">
              {author}
            </span>

            <div className="quote-cta-header">
              LET'S CREATE<br />
              SOMETHING GREAT<br />
              TOGETHER.
            </div>

            <div className="quote-card-plus">+</div>
          </div>
        </div>
      </div>
    </section>
  );
}
