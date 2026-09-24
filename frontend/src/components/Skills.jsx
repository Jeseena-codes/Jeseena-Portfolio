import React, { useState, useEffect, useRef } from 'react';

const ROUND_SKILL_ICONS = [
  { name: 'Python', icon: 'bx bxl-python', color: '#3776ab' },
  { name: 'Django', icon: 'bx bx-code-alt', color: '#092e20' },
  { name: 'MySQL', icon: 'bx bxs-data', color: '#00758f' },
  { name: 'SQL', icon: 'bx bx-data', color: '#f29111' },
  { name: 'HTML5', icon: 'bx bxl-html5', color: '#e34f26' },
  { name: 'CSS3', icon: 'bx bxl-css3', color: '#1572b6' },
  { name: 'JavaScript', icon: 'bx bxl-javascript', color: '#e5a00d' },
  { name: 'Git', icon: 'bx bxl-git', color: '#f05032' },
  { name: 'GitHub', icon: 'bx bxl-github', color: '#181717' },
  { name: 'VS Code', icon: 'bx bxl-visual-studio', color: '#007acc' }
];

const ALL_LOADING_SKILLS = [
  { name: 'Python', category: 'Backend', proficiency: 80, isLearning: false },
  { name: 'Django', category: 'Backend', proficiency: 80, isLearning: false },
  { name: 'MySQL', category: 'Database', proficiency: 75, isLearning: false },
  { name: 'HTML & CSS', category: 'Frontend', proficiency: 90, isLearning: false },
  { name: 'JavaScript', category: 'Frontend', proficiency: 70, isLearning: false },
  { name: 'Git & GitHub', category: 'Tools', proficiency: 70, isLearning: false },
  { name: 'React.js', category: 'Frontend', proficiency: 60, isLearning: true },
  { name: 'Node.js', category: 'Backend', proficiency: 50, isLearning: true },
  { name: 'RESTful APIs', category: 'Backend / Architecture', proficiency: 65, isLearning: true }
];

const SKILL_ICONS = {
  'Python': 'bx bxl-python',
  'Django': 'bx bx-code-alt',
  'MySQL': 'bx bxs-data',
  'HTML & CSS': 'bx bxl-html5',
  'JavaScript': 'bx bxl-javascript',
  'Git & GitHub': 'bx bxl-git',
  'React.js': 'bx bxl-react',
  'Node.js': 'bx bxl-nodejs',
  'RESTful APIs': 'bx bx-transfer-alt',
};

export default function Skills() {
  const [isRevealed, setIsRevealed] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">03 / TECHNICAL PROFICIENCY</div>
          <h2 className="section-title">SKILLS &amp; PROFICIENCY</h2>
          <p className="section-subtitle">
            Core technologies, database engineering, and practical development proficiencies.
          </p>
        </div>

        {/* 1. Round Technology Icons First (Reference Style) */}
        <div className="skills-round-icons-grid">
          {ROUND_SKILL_ICONS.map((item, idx) => (
            <div key={idx} className="skill-round-badge" title={`${item.name} Proficiency`}>
              <div className="skill-round-circle">
                <i className={item.icon} style={{ color: item.color }}></i>
              </div>
              <span className="skill-round-name">{item.name}</span>
            </div>
          ))}
        </div>

        {/* 2. Loading Skills / Proficiency Bars Second */}
        <div className="skills-divider-header">
          <h3 className="skills-divider-title">
            PRACTICAL COMPETENCE &amp; PROFICIENCY BARS
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Active &amp; In-Progress Learning
          </span>
        </div>

        <div className="skills-progress-grid">
          {ALL_LOADING_SKILLS.map((skill, index) => {
            const targetPct = skill.proficiency;
            const currentWidth = `${targetPct}%`;
            const iconCls = SKILL_ICONS[skill.name] || 'bx bx-code-block';

            return (
              <div key={skill.name} className="skill-bar-card">
                <div className="skill-meta-row">
                  <div className="skill-title-text">
                    <i className={iconCls} style={{ color: 'var(--crimson-bright)', fontSize: '1.25rem' }}></i>
                    <span>{skill.name}</span>
                    {skill.isLearning && (
                      <span className="learning-badge">Currently Learning</span>
                    )}
                    <span className="skill-cat-label">{skill.category}</span>
                  </div>
                  <span className="skill-pct-number">{targetPct}%</span>
                </div>

                <div className="skill-track-frame">
                  <div
                    className="skill-animated-fill"
                    style={{
                      width: currentWidth,
                      transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: '2.5rem', fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center' }}>
          * Proficiencies reflect practical competence, structured projects, and continuous learning progression.
        </p>
      </div>
    </section>
  );
}
