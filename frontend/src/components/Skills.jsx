import React, { useState, useEffect, useRef } from 'react';
import TextRepel from './TextRepel';

const FALLBACK_ROUND_ICONS = [
  { name: 'Python', icon: 'bx bxl-python', icon_color: '#3776ab' },
  { name: 'Django', icon: 'bx bx-code-alt', icon_color: '#092e20' },
  { name: 'MySQL', icon: 'bx bxs-data', icon_color: '#00758f' },
  { name: 'SQL', icon: 'bx bx-data', icon_color: '#f29111' },
  { name: 'HTML5', icon: 'bx bxl-html5', icon_color: '#e34f26' },
  { name: 'CSS3', icon: 'bx bxl-css3', icon_color: '#1572b6' },
  { name: 'JavaScript', icon: 'bx bxl-javascript', icon_color: '#e5a00d' },
  { name: 'Git', icon: 'bx bxl-git', icon_color: '#f05032' },
  { name: 'GitHub', icon: 'bx bxl-github', icon_color: '#181717' },
  { name: 'VS Code', icon: 'bx bxl-visual-studio', icon_color: '#007acc' }
];

const FALLBACK_PROGRESS_SKILLS = [
  { name: 'Python', category: 'Backend', proficiency: 80, is_learning: false },
  { name: 'Django', category: 'Backend', proficiency: 80, is_learning: false },
  { name: 'MySQL', category: 'Database', proficiency: 75, is_learning: false },
  { name: 'HTML & CSS', category: 'Frontend', proficiency: 90, is_learning: false },
  { name: 'JavaScript', category: 'Frontend', proficiency: 70, is_learning: false },
  { name: 'Git & GitHub', category: 'Tools', proficiency: 70, is_learning: false },
  { name: 'React.js', category: 'Frontend', proficiency: 60, is_learning: true },
  { name: 'Node.js', category: 'Backend', proficiency: 50, is_learning: true },
  { name: 'RESTful APIs', category: 'Backend / Architecture', proficiency: 65, is_learning: true }
];

const getSkillIcon = (skill) => {
  if (skill.icon && skill.icon.trim()) return skill.icon;
  const lower = (skill.name || '').toLowerCase();
  if (lower.includes('python')) return 'bx bxl-python';
  if (lower.includes('django rest')) return 'bx bx-transfer-alt';
  if (lower.includes('django')) return 'bx bx-code-alt';
  if (lower.includes('mysql')) return 'bx bxs-data';
  if (lower.includes('sql') || lower.includes('postgres')) return 'bx bx-data';
  if (lower.includes('html')) return 'bx bxl-html5';
  if (lower.includes('css')) return 'bx bxl-css3';
  if (lower.includes('javascript') || lower.includes('js')) return 'bx bxl-javascript';
  if (lower.includes('react')) return 'bx bxl-react';
  if (lower.includes('node')) return 'bx bxl-nodejs';
  if (lower.includes('github')) return 'bx bxl-github';
  if (lower.includes('git')) return 'bx bxl-git';
  if (lower.includes('api')) return 'bx bx-transfer-alt';
  if (lower.includes('vs code') || lower.includes('vscode')) return 'bx bxl-visual-studio';
  return 'bx bx-code-block';
};

const getSkillColor = (skill) => {
  if (skill.icon_color && skill.icon_color.trim()) return skill.icon_color;
  const lower = (skill.name || '').toLowerCase();
  if (lower.includes('python')) return '#3776ab';
  if (lower.includes('django rest')) return '#d32f2f';
  if (lower.includes('django')) return '#092e20';
  if (lower.includes('mysql')) return '#00758f';
  if (lower.includes('sql')) return '#f29111';
  if (lower.includes('html')) return '#e34f26';
  if (lower.includes('css')) return '#1572b6';
  if (lower.includes('javascript')) return '#e5a00d';
  if (lower.includes('react')) return '#61dafb';
  if (lower.includes('node')) return '#5fa04e';
  if (lower.includes('github')) return '#181717';
  if (lower.includes('git')) return '#f05032';
  if (lower.includes('vs code') || lower.includes('vscode')) return '#007acc';
  return '#d32f2f';
};

export default function Skills({ skills = [], learningSkills = [], about }) {
  const [isRevealed, setIsRevealed] = useState(true);
  const sectionRef = useRef(null);
  const sectionTitle = about?.skills_section_title || 'SKILLS & PROFICIENCY';
  const sectionSubtitle = about?.skills_section_subtitle || (
    'Core technologies, database engineering, and practical development proficiencies.'
  );

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

  // Determine round icon list: use active non-learning skills or fallback
  const roundBadges = skills.length > 0
    ? skills.filter(s => s.show_in_marquee !== false)
    : FALLBACK_ROUND_ICONS;

  // Determine progress skills: combine main skills + learning skills from props or fallback
  let progressList = [];
  if (skills.length > 0 || learningSkills.length > 0) {
    progressList = [...skills, ...learningSkills.filter(ls => !skills.some(s => s.id === ls.id))];
  } else {
    progressList = FALLBACK_PROGRESS_SKILLS;
  }

  return (
    <section id="skills" ref={sectionRef} className="portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">03 / TECHNICAL PROFICIENCY</div>
          <TextRepel as="h2" className="section-title" text={sectionTitle} />
          <p className="section-subtitle">
            {sectionSubtitle}
          </p>
        </div>

        {/* 1. Round Technology Icons First (Reference Style) */}
        <div className="skills-round-icons-grid">
          {roundBadges.map((item, idx) => (
            <div key={item.id || idx} className="skill-round-badge" title={`${item.name} Proficiency`}>
              <div className="skill-round-circle">
                <i className={getSkillIcon(item)} style={{ color: getSkillColor(item) }}></i>
              </div>
              <span className="skill-round-name">{item.name}</span>
            </div>
          ))}
        </div>

        {/* 2. Loading Skills / Proficiency Bars Second */}
        <div className="skills-divider-header">
          <TextRepel as="h3" className="skills-divider-title" text="PRACTICAL COMPETENCE & PROFICIENCY BARS" />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Active &amp; In-Progress Learning
          </span>
        </div>

        <div className="skills-progress-grid">
          {progressList.map((skill, index) => {
            const isLearning = skill.is_learning || skill.isLearning;
            const targetPct = isLearning
              ? (skill.learning_progress || skill.proficiency || 60)
              : (skill.proficiency || 75);
            const currentWidth = `${targetPct}%`;
            const iconCls = getSkillIcon(skill);
            const categoryText = skill.category_display || skill.category || (isLearning ? 'Learning' : 'Core');

            return (
              <div key={skill.id || skill.name || index} className="skill-bar-card">
                <div className="skill-meta-row">
                  <div className="skill-title-text">
                    <i className={iconCls} style={{ color: 'var(--crimson-bright)', fontSize: '1.25rem' }}></i>
                    <span>{skill.name}</span>
                    {isLearning && (
                      <span className="learning-badge">
                        {skill.learning_note || 'Currently Learning'}
                      </span>
                    )}
                    <span className="skill-cat-label">{categoryText}</span>
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
