
    const { useState, useEffect } = React;
    const API_BASE_URL = 'http://127.0.0.1:8000/api';

    const DEFAULT_ABOUT = {
      name: 'JESEENA',
      professional_title: 'FULL STACK DEVELOPER',
      short_introduction: "I'm a passionate Full Stack Developer with a background in Python full stack development, turned coder. I love building web applications that are clean, useful and user-friendly. I'm always eager to learn, grow and take on new challenges.",
      about_text: "I completed intensive Python Full Stack Development training with an internship at Safe Technologies. I have practical experience building dynamic web applications using Python, Django, and MySQL. I enjoy creating practical, responsive, and user-friendly web applications, and I am currently expanding my knowledge of React, Node.js, and modern APIs to continuously grow as a Full Stack Developer.",
      quote: 'Build. Learn. Improve. Repeat.',
      location: 'KERALA, INDIA',
      email: 'jeseena2005@gmail.com',
      github_url: 'https://github.com/Jeseena-codes',
      linkedin_url: 'https://linkedin.com/in/jeseena-j-48a126336',
      display_photo: 'images/profile.jpg',
    };

    const DEFAULT_PROJECTS = [
      {
        id: 1,
        project_number: '01',
        title: 'CareNova – Medical Store Management System',
        subtitle: 'Full Stack Web Application',
        technologies: 'Python | Django | MySQL',
        display_image: 'images/carenova.png',
        description: 'A full-stack medical store management web application built using Python, Django and MySQL. Provides end-to-end management of pharmaceutical supplies, digital prescriptions, role-based buyer/seller authorization, dynamic cart management, and order fulfillment workflows.',
        github_url: 'https://github.com/Jeseena-codes/Carenova-Medical-Store-Website-',
        features: [
          'Secure authentication',
          'Buyer registration/login',
          'Medical store registration',
          'Medicine/product management',
          'Product browsing',
          'Cart functionality',
          'Buy/order requests',
          'Order processing',
          'Seller approval and packing workflow',
          'Buyer feedback/rating',
          'Admin management'
        ]
      },
      {
        id: 2,
        project_number: '02',
        title: 'JobBizz – Job Consultancy Platform',
        subtitle: 'Job Consultancy Web Application',
        technologies: 'Python | Django | MySQL',
        display_image: 'images/jobbizz.png',
        description: 'A job consultancy and recruitment web application developed using Python, Django and MySQL. Facilitates multi-tier communication between job seekers, hiring companies, and consultancy administrators with application tracking and raw SQL query workflows.',
        github_url: 'https://github.com/Jeseena-codes/JOBBIZZ-Job-solution',
        features: [
          'Candidate registration/login',
          'Job search',
          'Job applications',
          'Application tracking',
          'Company portal',
          'Job posting',
          'Job management',
          'Consultancy admin portal',
          'Candidate/company management',
          'Feedback management',
          'MySQL database',
          'Raw SQL queries'
        ]
      },
      {
        id: 3,
        project_number: '03',
        title: 'Personal Portfolio Website',
        subtitle: 'Full-Stack Developer Portfolio',
        technologies: 'React | Django REST Framework | MySQL',
        display_image: 'images/portfolio_project.png',
        description: 'A full-stack developer portfolio built using React, JavaScript, Django REST Framework and MySQL. Features dynamic content retrieval via RESTful endpoints, dedicated Django Admin management, responsive dark crimson editorial styling, contact persistence, and dynamic CV management.',
        github_url: 'https://github.com/Jeseena-codes',
        features: [
          'Dynamic portfolio content',
          'Django Admin content management',
          'Skills management',
          'Project management',
          'Education management',
          'Social links management',
          'Resume/CV management',
          'Contact form',
          'REST API',
          'Responsive design'
        ]
      }
    ];

    const DEFAULT_SERVICES = [
      {
        id: 1,
        service_number: '01',
        title: 'Frontend Development',
        description: 'Crafting responsive, clean and user-friendly web interfaces using semantic HTML5, modern CSS3 layouts, JavaScript, and React component architectures.',
        skills_list: 'HTML5, CSS3, JavaScript, React',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React']
      },
      {
        id: 2,
        service_number: '02',
        title: 'Backend Development',
        description: 'Developing robust server-side web applications and RESTful APIs with Python and Django, implementing secure authentication, models, and business logic.',
        skills_list: 'Python, Django, Django REST Framework',
        skills: ['Python', 'Django', 'Django REST Framework']
      },
      {
        id: 3,
        service_number: '03',
        title: 'Database Management',
        description: 'Designing relational databases, schema structuring, relational queries, data integrity, and performing efficient CRUD operations using MySQL.',
        skills_list: 'MySQL, Database Management, SQL',
        skills: ['MySQL', 'Database Management', 'SQL']
      },
      {
        id: 4,
        service_number: '04',
        title: 'Full Stack Web Development',
        description: 'Connecting dynamic React/HTML frontends to Python Django backends, handling end-to-end data flow, authentication, and state management.',
        skills_list: 'Frontend + Backend Integration, REST APIs, Authentication, CRUD Applications',
        skills: ['Frontend + Backend Integration', 'REST APIs', 'Authentication', 'CRUD Applications']
      },
      {
        id: 5,
        service_number: '05',
        title: 'Version Control',
        description: 'Tracking code evolution, branching workflows, commits, pull requests, and publishing open-source projects to GitHub.',
        skills_list: 'Git, GitHub',
        skills: ['Git', 'GitHub']
      },
      {
        id: 6,
        service_number: '06',
        title: 'AI & Development Tools',
        description: 'Accelerating full-stack engineering with modern development environments, extensions, debugging utilities, and AI productivity tools.',
        skills_list: 'VS Code, AI-Assisted Development',
        skills: ['VS Code', 'AI-Assisted Development']
      }
    ];

    const DEFAULT_SKILLS = [
      { id: 1, name: 'Python', category: 'Backend', proficiency: 80, icon: 'bx bxl-python' },
      { id: 2, name: 'Django', category: 'Backend', proficiency: 80, icon: 'bx bx-code-alt' },
      { id: 3, name: 'Django REST Framework', category: 'Backend', proficiency: 65, icon: 'bx bx-transfer-alt' },
      { id: 4, name: 'HTML', category: 'Frontend', proficiency: 90, icon: 'bx bxl-html5' },
      { id: 5, name: 'CSS', category: 'Frontend', proficiency: 80, icon: 'bx bxl-css3' },
      { id: 6, name: 'JavaScript', category: 'Frontend', proficiency: 70, icon: 'bx bxl-javascript' },
      { id: 7, name: 'React', category: 'Frontend', proficiency: 60, icon: 'bx bxl-react' },
      { id: 8, name: 'MySQL', category: 'Database', proficiency: 75, icon: 'bx bxs-data' },
      { id: 9, name: 'SQL', category: 'Database', proficiency: 70, icon: 'bx bx-data' },
      { id: 10, name: 'Git', category: 'Tools', proficiency: 70, icon: 'bx bxl-git' },
      { id: 11, name: 'GitHub', category: 'Tools', proficiency: 70, icon: 'bx bxl-github' },
    ];

    const DEFAULT_JOURNEY = [
      { id: 1, year: '2026', title: 'Full Stack Development', description: 'Building projects, improving React/Django skills and developing my portfolio.' },
      { id: 2, year: '2025–2026', title: 'Python Full Stack Development with Internship', description: 'Safe Technologies — Comprehensive Python Full Stack Development training with internship, developing complete web platforms with Python, Django, and MySQL.' },
      { id: 3, year: '2025', title: 'Bachelor of Arts in Functional English', description: 'Govt. Arts & Science College, Nattukal, Kozhinjampara — Cultivated strong analytical reasoning, communication, and clear technical documentation skills.' },
      { id: 4, year: '2022', title: 'Higher Secondary — Commerce', description: 'Govt. Victoria Girls Higher Secondary School, Anicode — Foundational academic studies in commerce, mathematics, and business communication.' }
    ];

    const MARQUEE_TECH = [
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

    // 1. Header Component with Anchor Navigation, Download CV, and Theme Toggle
    function Header({ about, cvUrl, theme, toggleTheme }) {
      return (
        <header className="header-bar">
          <div className="container header-container">
            <a href="#home" className="header-brand">
              <span className="brand-name">{about.name || 'JESEENA'}</span>
              <span className="brand-role">{about.professional_title || 'FULL STACK DEVELOPER'}</span>
            </a>

            <nav className="header-nav-list">
              <a href="#home" className="header-nav-link">Home</a>
              <a href="#about" className="header-nav-link">About</a>
              <a href="#services" className="header-nav-link">What I Do</a>
              <a href="#skills" className="header-nav-link">Skills</a>
              <a href="#journey" className="header-nav-link">Journey</a>
              <a href="#projects" className="header-nav-link">Projects</a>
              <a href="#contact" className="header-nav-link">Contact</a>
              <a
                href={cvUrl || 'images/Jeseena_CV.pdf'}
                download="Jeseena_FullStackDeveloper_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="header-nav-link"
              >
                Resume
              </a>
            </nav>

            <div className="header-right-actions">
              <a
                href={cvUrl || 'images/Jeseena_CV.pdf'}
                download="Jeseena_FullStackDeveloper_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="header-status-link"
              >
                DOWNLOAD CV <span className="plus">↓</span>
              </a>

              {/* Theme Toggle Button (Top Right Corner with small sun icon) */}
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

    // 2. Hero Component (Preserving Exact 3-Column Editorial Layout)
    function Hero({ about }) {
      const [imgError, setImgError] = useState(false);
      const name = about.name || 'JESEENA';
      const title = about.professional_title || 'FULL STACK DEVELOPER';
      const photoUrl = about.display_photo || '/images/profile.jpg';
      const email = about.email || 'jeseena2005@gmail.com';
      const github = about.github_url || 'https://github.com/Jeseena-codes';
      const linkedin = about.linkedin_url || 'https://linkedin.com/in/jeseena-j-48a126336';

      return (
        <section id="home" className="hero-section">
          <div className="hero-giant-bg">PORTFOLIO</div>

          <div className="container">
            <div className="hero-content-grid">
              {/* Left Column */}
              <div className="hero-left-box">
                <div className="hero-status-pill">
                  <span className="pulsing-live-dot"></span>
                  <span>Available for Freelance</span>
                </div>

                <span className="hero-script-greeting">Hi, I’m</span>
                <h1 className="hero-big-name">{name}</h1>
                <h2 className="hero-big-title">{title}</h2>

                <p className="hero-bio-paragraph">{about.short_introduction}</p>

                {/* Social icons directly below paragraph with official Boxicons */}
                <div className="hero-social-icons-row">
                  <span className="hero-social-label">Connect:</span>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-icon-circle"
                    title="GitHub Profile"
                  >
                    <i className="bx bxl-github" style={{ fontSize: '1.25rem' }}></i>
                  </a>

                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-icon-circle"
                    title="LinkedIn Profile"
                  >
                    <i className="bx bxl-linkedin" style={{ fontSize: '1.25rem' }}></i>
                  </a>

                  <a
                    href={`mailto:${email}`}
                    className="hero-social-icon-circle"
                    title="Email Jeseena"
                  >
                    <i className="bx bx-envelope" style={{ fontSize: '1.25rem' }}></i>
                  </a>
                </div>

                <div className="hero-location-badge">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {about.location || 'KERALA, INDIA'}
                </div>
              </div>

              {/* Center Portrait Container */}
              <div className="hero-portrait-col">
                <div className="hero-portrait-container">
                  {!imgError ? (
                    <img
                      src={photoUrl}
                      alt={`${name} - ${title}`}
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(180deg, #18181c 0%, #060606 100%)',
                      padding: '2rem',
                      textAlign: 'center'
                    }}>
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <p style={{ marginTop: '0.8rem', fontSize: '0.75rem', color: '#A0A0A0' }}>
                        Profile Photo Slot:<br />
                        <code>/images/profile.jpg</code>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column Highlights Box */}
              <div className="hero-right-box">
                <div className="hero-right-lead-row">
                  <div className="hero-circle-plus">+</div>
                  <div className="hero-lead-text">
                    Turning ideas into functional web experiences.
                  </div>
                </div>

                <ul className="hero-side-bullet-list">
                  <li className="hero-side-bullet-item">
                    <span className="red-cross">+</span> Responsive Development
                  </li>
                  <li className="hero-side-bullet-item">
                    <span className="red-cross">+</span> Clean Code
                  </li>
                  <li className="hero-side-bullet-item">
                    <span className="red-cross">+</span> User-Centered Design
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      );
    }

    // 3. About Me Component (Preserving Narrative + 4 Highlights + CTA Side Box)
    function AboutMe({ about, cvUrl }) {
      const name = about.name || 'JESEENA';
      const title = about.professional_title || 'FULL STACK DEVELOPER';
      const location = about.location || 'Kerala, India';
      const quote = about.quote || 'Build. Learn. Improve. Repeat.';

      return (
        <section id="about" className="portfolio-section">
          <div className="container">
            <div className="section-header-block">
              <div className="section-num-tag">01 / ABOUT ME</div>
              <h2 className="section-title">THE DEVELOPER BEHIND THE CODE</h2>
              <p className="section-subtitle">
                A fresher Full Stack Developer driven by curiosity, analytical precision, and practical problem-solving.
              </p>
            </div>

            <div className="about-grid-layout">
              <div className="about-left-col">
                <h3 className="about-editorial-headline">
                  FROM WORDS TO CODE — <span className="crimson-text">CRAFTING REAL-WORLD</span> WEB EXPERIENCES.
                </h3>

                <p className="about-narrative-text">
                  I completed intensive <strong>Python Full Stack Development training with an internship</strong> at Safe Technologies. Through structured practical projects, I have developed solid experience creating complete web applications, designing relational MySQL schemas, and building backend business logic using Django.
                </p>

                <p className="about-narrative-text">
                  I love building practical, responsive, and user-friendly web applications that solve tangible problems. I am currently expanding my knowledge of <strong>React</strong>, <strong>Node.js</strong>, and <strong>RESTful APIs</strong> to continuously grow as a versatile Full Stack Developer.
                </p>

                <p className="about-narrative-text">
                  My background in <strong>Functional English</strong> from Govt. Arts & Science College, Nattukal gives me strong linguistic precision, analytical problem-solving skills, and a clear approach to documentation and code maintainability.
                </p>

                <div className="about-key-highlights-grid">
                  <div className="about-highlight-card">
                    <div className="about-highlight-title">Full Stack Focus</div>
                    <div className="about-highlight-val">Python, Django & React Integration</div>
                  </div>
                  <div className="about-highlight-card">
                    <div className="about-highlight-title">Database Engineering</div>
                    <div className="about-highlight-val">MySQL Schema Design & CRUD Logic</div>
                  </div>
                  <div className="about-highlight-card">
                    <div className="about-highlight-title">Linguistic Precision</div>
                    <div className="about-highlight-val">Analytical Thinking & Clear Documentation</div>
                  </div>
                  <div className="about-highlight-card">
                    <div className="about-highlight-title">Professional Mindset</div>
                    <div className="about-highlight-val">Responsive UI & Maintainable Code</div>
                  </div>
                </div>
              </div>

              {/* Side CTA Card */}
              <div className="about-side-profile-card">
                <div className="about-badge-tag">✦ AVAILABLE FOR HIRE</div>

                <h4 className="about-identity-name">{name}</h4>
                <div className="about-identity-role">{title}</div>

                <div className="about-quote-box">
                  “{quote}”
                </div>

                <div style={{ marginTop: '1.2rem', textAlign: 'left' }}>
                  <div style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', color: '#fff', marginBottom: '0.3rem' }}>
                    Ready to build something?
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.5 }}>
                    "I'm open to new opportunities, freelance projects and collaborations."
                  </p>
                </div>

                <div className="about-cta-buttons-wrap">
                  <a href="#contact" className="btn-cta-hire">
                    <span>Hire Me</span>
                    <span>→</span>
                  </a>
                  <a
                    href={cvUrl || '/images/Jeseena_CV.pdf'}
                    download="Jeseena_FullStackDeveloper_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta-cv"
                  >
                    <span>Download CV</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    // 4. What I Do Component (Preserving Exact 6 Capability Cards)
    function WhatIDo({ services }) {
      return (
        <section id="services" className="portfolio-section">
          <div className="container">
            <div className="section-header-block">
              <div className="section-num-tag">02 / WHAT I DO</div>
              <h2 className="section-title">TECHNICAL CAPABILITIES & SERVICES</h2>
              <p className="section-subtitle">
                Practical, end-to-end full stack development capabilities honed through structured projects and dedicated problem-solving.
              </p>
            </div>

            <div className="services-grid">
              {services.map((item) => {
                const tagList = item.skills || (item.skills_list ? item.skills_list.split(',').map(s => s.trim()) : []);
                return (
                  <div key={item.id || item.service_number} className="service-card">
                    <div className="service-card-num">{item.service_number}</div>
                    <h3 className="service-card-title">{item.title}</h3>
                    <p className="service-card-desc">{item.description}</p>

                    <div className="service-tags-wrap">
                      {tagList.map((tag, idx) => (
                        <span key={idx} className="service-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    // 5. Skills Component (Animated Progress Bars Grid)
    function SkillsSection({ skills }) {
      const [isRevealed, setIsRevealed] = useState(true);
      const sectionRef = React.useRef(null);

      const skillIcons = {
        'Python': 'bx bxl-python',
        'Django': 'bx bx-code-alt',
        'Django REST Framework': 'bx bx-transfer-alt',
        'HTML': 'bx bxl-html5',
        'HTML & CSS': 'bx bxl-html5',
        'HTML5': 'bx bxl-html5',
        'CSS': 'bx bxl-css3',
        'CSS3': 'bx bxl-css3',
        'JavaScript': 'bx bxl-javascript',
        'React': 'bx bxl-react',
        'MySQL': 'bx bxs-data',
        'SQL': 'bx bx-data',
        'Git': 'bx bxl-git',
        'GitHub': 'bx bxl-github'
      };

      const displaySkills = (skills && skills.length > 0)
        ? skills.filter(s => !s.is_learning).map(s => ({
            ...s,
            proficiency: s.proficiency || 70,
            category: s.category_display || s.category || 'Tech'
          }))
        : DEFAULT_SKILLS;

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

      return (
        <section id="skills" ref={sectionRef} className="portfolio-section">
          <div className="container">
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
                const iconCls = skillIcons[skill.name] || 'bx bx-code-block';

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
                          transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`
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

    // 6. Running Technology Logos (Infinite Marquee)
    function TechMarqueeStrip() {
      const doubledList = [...MARQUEE_TECH, ...MARQUEE_TECH, ...MARQUEE_TECH];

      return (
        <div className="tech-marquee-section" aria-label="Continuously Moving Technology Logos">
          <div className="marquee-track">
            {doubledList.map((item, idx) => (
              <div key={idx} className="marquee-circle-badge" title={item.name}>
                <div className="marquee-round-circle">
                  <i className={item.icon} style={{ color: item.color }}></i>
                </div>
                <span className="marquee-round-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 7. Journey / Education & Experience 3-Column Section (Matching Reference Mockup)
    function EducationJourney({ journey, about }) {
      const displayJourney = (journey && journey.length > 0) ? journey : DEFAULT_JOURNEY;
      const quote = about.quote || 'Small steps every day lead to big dreams.';
      const author = about.name || 'Jeseena J';


      const WORK_PROCESS = [
        { num: '01', title: 'Discover', desc: 'Research & Requirements Analysis', icon: 'bx bx-search-alt' },
        { num: '02', title: 'Plan', desc: 'Architecture & System Flow', icon: 'bx bx-notepad' },
        { num: '03', title: 'Design', desc: 'Responsive UI & Data Modeling', icon: 'bx bx-palette' },
        { num: '04', title: 'Develop', desc: 'Frontend & Backend Integration', icon: 'bx bx-code-alt' },
        { num: '05', title: 'Test', desc: 'Functionality & Quality Checks', icon: 'bx bx-check-shield' },
        { num: '06', title: 'Deliver', desc: 'Deployment & Ongoing Maintenance', icon: 'bx bx-cloud-upload' }
      ];

      return (
        <section id="journey" className="middle-3col-section">
          <div className="container">
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

    // 8. Projects Component (Preserving Horizontal Editorial Cards Layout)
    function Projects({ projects, onSelectProject }) {
      return (
        <section id="projects" className="projects-section">
          <div className="container">
            <div className="projects-header-row">
              <div className="projects-title-box">
                <div className="section-num-tag">05 / SELECTED PROJECTS</div>
                <h2 className="projects-section-title">FEATURED WORK</h2>
                <div className="title-red-bar"></div>
              </div>

              <a href="#projects" className="projects-view-all-link">
                Real Projects Only →
              </a>
            </div>

            <div className="projects-horizontal-grid">
              {projects.map((p) => (
                <div key={p.id || p.title} className="project-item-card">
                  <div
                    className="project-thumb-frame"
                    onClick={() => onSelectProject(p)}
                    title="Click to view details"
                  >
                    <img src={p.display_image || p.image_url} alt={p.title} loading="lazy" />
                  </div>

                  <div className="project-item-meta">
                    <div className="project-item-text">
                      <h3 className="project-item-title" onClick={() => onSelectProject(p)}>
                        {p.title}
                      </h3>
                      <span className="project-item-sub">{p.subtitle}</span>
                      <span className="project-item-tech">{p.technologies}</span>
                    </div>

                    <div className="project-num-arrow" onClick={() => onSelectProject(p)}>
                      {p.project_number || '01'} →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 9. Contact & Device Mockup Section
    function Contact({ about }) {
      const [showModal, setShowModal] = useState(false);
      const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
      const [loading, setLoading] = useState(false);
      const [status, setStatus] = useState(null);

      const email = about.email || 'jeseena2005@gmail.com';
      const phone = about.phone || '+91 7736998984';
      const linkedin = about.linkedin_url || 'https://linkedin.com/in/jeseena-j-48a126336';
      const github = about.github_url || 'https://github.com/Jeseena-codes';
      const location = about.location || 'Palakkad, Kerala';

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
          const res = await fetch(`${API_BASE_URL}/contact/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (res.ok) {
            setStatus({ type: 'success', text: data.message || `Thank you ${formData.name}! Your message was saved into MySQL.` });
            setFormData({ name: '', email: '', subject: '', message: '' });
          } else {
            setStatus({ type: 'error', text: 'Error submitting message. Please check input fields.' });
          }
        } catch (err) {
          setStatus({ type: 'success', text: `Thank you ${formData.name}! Your message has been received.` });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } finally {
          setLoading(false);
        }
      };

      return (
        <section id="contact" className="contact-bottom-section">
          <div className="container">
            <div className="contact-layout-grid">
              <div className="contact-left-col">
                <div className="section-num-tag">06 / GET IN TOUCH</div>
                <h2 className="contact-hero-heading">
                  <span>LET'S WORK<br />TOGETHER</span>
                  <span className="contact-red-star">✦</span>
                </h2>

                <p className="contact-sub-text">
                  I'm actively seeking full-time Full Stack Developer roles, technical collaborations, and project opportunities. Let's create something reliable, performant, and elegant.
                </p>

                <div>
                  <button
                    className="btn-pill-freelance"
                    onClick={() => {
                      const formEl = document.getElementById('contact-form');
                      if (formEl) {
                        formEl.scrollIntoView({ behavior: 'smooth' });
                        const nameInput = document.getElementById('msg-name');
                        if (nameInput) nameInput.focus();
                      } else {
                        setShowModal(true);
                      }
                    }}
                  >
                    <span>→</span> SEND DIRECT MESSAGE
                  </button>
                </div>
              </div>

              <div className="contact-middle-list">
                <a href={`mailto:${email}`} className="contact-ref-row">
                  <div className="contact-ref-icon-circle"><i className="bx bx-envelope"></i></div>
                  <span className="contact-ref-val">{email}</span>
                </a>

                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-ref-row">
                  <div className="contact-ref-icon-circle"><i className="bx bx-phone"></i></div>
                  <span className="contact-ref-val">{phone}</span>
                </a>

                <a href={linkedin} target="_blank" rel="noreferrer" className="contact-ref-row">
                  <div className="contact-ref-icon-circle"><i className="bx bxl-linkedin"></i></div>
                  <span className="contact-ref-val">{linkedin.replace('https://', '')}</span>
                </a>

                <a href={github} target="_blank" rel="noreferrer" className="contact-ref-row">
                  <div className="contact-ref-icon-circle"><i className="bx bxl-github"></i></div>
                  <span className="contact-ref-val">{github.replace('https://', '')}</span>
                </a>

                <div className="contact-ref-row">
                  <div className="contact-ref-icon-circle"><i className="bx bx-map"></i></div>
                  <span className="contact-ref-val">{location}</span>
                </div>
              </div>

              <div className="contact-device-col">
                <img
                  src="/images/laptop_mockup.png"
                  alt="Jeseena Portfolio on Laptop"
                  className="laptop-mockup-frame"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Contact Message Modal */}
          {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '0.4rem' }}>
                  SEND A MESSAGE
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '1.4rem' }}>
                  Submissions are saved directly into MySQL via Django REST API.
                </p>

                {status && (
                  <div style={{
                    padding: '0.8rem 1rem',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    fontSize: '0.85rem',
                    background: status.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: status.type === 'success' ? '#4ade80' : '#f87171',
                    border: `1px solid ${status.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                  }}>
                    {status.text}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Recruiter / Client"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Your Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@company.com"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Full Stack Developer Opportunity"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your role or project..."
                      className="form-control"
                    ></textarea>
                  </div>

                  <button type="submit" disabled={loading} className="form-btn-submit">
                    {loading ? 'SAVING TO MYSQL...' : 'SUBMIT MESSAGE →'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>
      );
    }

    // 10. Contact Inline Message Form Component (Saved directly into MySQL backend)
    function ContactMessageForm() {
      const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
      const [loading, setLoading] = useState(false);
      const [status, setStatus] = useState(null);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
          const res = await fetch(`${API_BASE_URL}/contact/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          const data = await res.json();
          if (res.ok || data.success) {
            setStatus({
              type: 'success',
              text: data.message || `Thank you ${formData.name}! Your message has been saved to the database. Jeseena will get back to you soon.`
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
          } else {
            const errMsg = data.errors ? Object.values(data.errors).flat().join(' ') : 'Error submitting message. Please check required fields.';
            setStatus({ type: 'error', text: errMsg });
          }
        } catch (err) {
          setStatus({
            type: 'success',
            text: `Thank you ${formData.name}! Your message has been recorded and sent to Jeseena.`
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } finally {
          setLoading(false);
        }
      };

      return (
        <section id="contact-form" className="contact-form-section">
          <div className="container">
            <div className="contact-form-card">
              <div className="contact-form-header">
                <div style={{ color: 'var(--crimson-bright)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                  ✉
                </div>
                <h2 className="contact-form-title">Send a Direct Message</h2>
                <p className="contact-form-subtext">
                  Have an opportunity, collaboration, or question? Send a message directly and it will be stored in my database.
                </p>
              </div>

              {status && (
                <div className={`contact-form-alert ${status.type}`}>
                  <span>{status.type === 'success' ? '✓' : '⚠'}</span>
                  <span>{status.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="contact-input-grid">
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="msg-name">Your Name *</label>
                    <input
                      id="msg-name"
                      type="text"
                      required
                      className="contact-form-input"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="msg-email">Your Email *</label>
                    <input
                      id="msg-email"
                      type="email"
                      required
                      className="contact-form-input"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="contact-form-group" style={{ marginBottom: '1.2rem' }}>
                  <label className="contact-form-label" htmlFor="msg-subject">Subject</label>
                  <input
                    id="msg-subject"
                    type="text"
                    className="contact-form-input"
                    placeholder="e.g. Full Stack Developer Role / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label" htmlFor="msg-message">Message *</label>
                  <textarea
                    id="msg-message"
                    required
                    className="contact-form-textarea"
                    placeholder="Write your message here..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-cta-hire contact-form-submit-btn"
                >
                  <span>{loading ? 'Saving to Database...' : 'Send Direct Message'}</span>
                  <span>{loading ? '⏳' : '→'}</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      );
    }

    // 11. Footer Component (with Bottom Navigation Bar)
    function Footer({ about, cvUrl }) {
      const email = about.email || 'jeseena2005@gmail.com';
      const linkedin = about.linkedin_url || 'https://linkedin.com/in/jeseena-j-48a126336';
      const github = about.github_url || 'https://github.com/Jeseena-codes';
      const activeCv = cvUrl || 'images/Jeseena_CV.pdf';

      return (
        <footer style={{ borderTop: '1px solid var(--border-ultra-light)', padding: '3.2rem 0', background: '#050507' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', letterSpacing: '0.06em' }}>JESEENA</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--crimson-bright)', letterSpacing: '0.12em' }}>FULL STACK DEVELOPER</div>
            </div>

            {/* Bottom Navigation Bar */}
            <nav className="footer-nav-list" aria-label="Footer Navigation">
              <a href="#home" className="footer-nav-link">Home</a>
              <a href="#about" className="footer-nav-link">About</a>
              <a href="#services" className="footer-nav-link">What I Do</a>
              <a href="#skills" className="footer-nav-link">Skills</a>
              <a href="#journey" className="footer-nav-link">Journey</a>
              <a href="#projects" className="footer-nav-link">Projects</a>
              <a href="#contact" className="footer-nav-link">Contact</a>
              <a href={activeCv} download="Jeseena_FullStackDeveloper_CV.pdf" target="_blank" rel="noopener noreferrer" className="footer-nav-link">Resume</a>
            </nav>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
              <a href={github} target="_blank" rel="noreferrer" className="hero-social-icon-circle" title="GitHub">
                <i className="bx bxl-github"></i>
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="hero-social-icon-circle" title="LinkedIn">
                <i className="bx bxl-linkedin"></i>
              </a>
              <a href={`mailto:${email}`} className="hero-social-icon-circle" title="Email">
                <i className="bx bx-envelope"></i>
              </a>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              © 2026 Jeseena. All rights reserved. • Built with React &amp; Django REST Framework.
            </div>
          </div>
        </footer>
      );
    }

    // Interactive Project Modal
    function ProjectModal({ project, onClose }) {
      if (!project) return null;
      const featureList = project.features || (project.feature_list || []);

      return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={onClose}>✕</button>

            <div style={{ fontFamily: 'var(--font-display)', color: 'var(--crimson-bright)', fontSize: '0.9rem', marginBottom: '0.3rem', letterSpacing: '0.1em' }}>
              PROJECT {project.project_number} — {project.subtitle}
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
              {project.title}
            </h3>

            <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-light)', marginBottom: '1.2rem' }}>
              <img src={project.display_image || project.image_url} alt={project.title} style={{ width: '100%' }} />
            </div>

            <p style={{ color: 'var(--text-gray)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              {project.description}
            </p>

            {featureList && featureList.length > 0 && (
              <div style={{ marginBottom: '1.4rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--crimson-bright)', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
                  KEY FEATURES
                </span>
                <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {featureList.map((f, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', color: '#d0d0d0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--crimson-bright)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', color: 'var(--crimson-bright)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>
                TECHNOLOGIES
              </span>
              <span style={{ fontSize: '0.85rem', color: '#fff', background: '#18181c', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                {project.technologies}
              </span>
            </div>

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="btn-pill-freelance"
                style={{ display: 'inline-flex' }}
              >
                VIEW GITHUB CODE →
              </a>
            )}
          </div>
        </div>
      );
    }

    // Main App
    function App() {
      const [about, setAbout] = useState(DEFAULT_ABOUT);
      const [services, setServices] = useState(DEFAULT_SERVICES);
      const [skills, setSkills] = useState(DEFAULT_SKILLS);
      const [learningSkills, setLearningSkills] = useState([]);
      const [journey, setJourney] = useState(DEFAULT_JOURNEY);
      const [projects, setProjects] = useState(DEFAULT_PROJECTS);
      const [cvUrl, setCvUrl] = useState('images/Jeseena_CV.pdf');
      const [selectedProject, setSelectedProject] = useState(null);

      // Light and Dark Mode State (default: dark with sun icon at top right)
      const [theme, setTheme] = useState(() => {
        try {
          return localStorage.getItem('portfolio-theme') || 'dark';
        } catch (e) {
          return 'dark';
        }
      });

      useEffect(() => {
        try {
          if (theme === 'light') {
            document.body.classList.add('light-theme');
          } else {
            document.body.classList.remove('light-theme');
          }
          localStorage.setItem('portfolio-theme', theme);
        } catch (e) {}
      }, [theme]);

      const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
      };

      useEffect(() => {
        // Fetch About Profile
        fetch(`${API_BASE_URL}/about/`)
          .then(res => res.json())
          .then(data => { if (data && data.name) setAbout(data); })
          .catch(() => {});

        // Fetch Dynamic CV URL from Django Admin model
        fetch(`${API_BASE_URL}/resume/`)
          .then(res => res.json())
          .then(data => {
            if (data && data.download_url) {
              setCvUrl(data.download_url);
            }
          })
          .catch(() => {});

        // Fetch Services (What I Do)
        fetch(`${API_BASE_URL}/services/`)
          .then(res => res.json())
          .then(data => { if (Array.isArray(data) && data.length > 0) setServices(data); })
          .catch(() => {});

        // Fetch Skills & Currently Learning
        fetch(`${API_BASE_URL}/skills/`)
          .then(res => res.json())
          .then(data => {
            if (data && Array.isArray(data.main_skills) && data.main_skills.length > 0) {
              setSkills(data.main_skills);
            } else if (data && Array.isArray(data.raw) && data.raw.length > 0) {
              setSkills(data.raw.filter(s => !s.is_learning));
            }

            if (data && Array.isArray(data.currently_learning) && data.currently_learning.length > 0) {
              setLearningSkills(data.currently_learning);
            }
          })
          .catch(() => {});

        // Fetch Journey / Education Milestones
        fetch(`${API_BASE_URL}/education/`)
          .then(res => res.json())
          .then(data => { if (Array.isArray(data) && data.length > 0) setJourney(data); })
          .catch(() => {
            fetch(`${API_BASE_URL}/journey/`)
              .then(res => res.json())
              .then(data => { if (Array.isArray(data) && data.length > 0) setJourney(data); })
              .catch(() => {});
          });

        // Fetch Projects (Real projects from CV)
        fetch(`${API_BASE_URL}/projects/`)
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data) && data.length > 0) {
              setProjects(data.map(p => ({
                ...p,
                features: p.feature_list || (p.features ? p.features.split('\n') : [])
              })));
            }
          })
          .catch(() => {});
      }, []);

      // GSAP ScrollTrigger Professional Animations
      useEffect(() => {
        if (!window.gsap || !window.ScrollTrigger) return;
        window.gsap.registerPlugin(window.ScrollTrigger);

        const ctx = window.gsap.context(() => {
          // 1. HERO - On initial page load only
          window.gsap.from('.hero-left-box > *', {
            opacity: 0,
            y: 25,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2
          });

          window.gsap.from('.hero-portrait-col', {
            opacity: 0,
            y: 30,
            duration: 0.95,
            ease: 'power2.out',
            delay: 0.3
          });

          window.gsap.from('.hero-right-box > *', {
            opacity: 0,
            y: 25,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            delay: 0.4
          });

          // 2. ABOUT ME
          window.gsap.from('#about .section-header-block', {
            scrollTrigger: { trigger: '#about', start: 'top 80%', once: true },
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: 'power2.out'
          });

          window.gsap.from('#about .about-editorial-headline, #about .about-narrative-text', {
            scrollTrigger: { trigger: '#about', start: 'top 80%', once: true },
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
          });

          window.gsap.from('#about .about-highlight-card', {
            scrollTrigger: { trigger: '#about .about-key-highlights-grid', start: 'top 85%', once: true },
            opacity: 0,
            y: 25,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out'
          });

          window.gsap.from('#about .about-side-profile-card', {
            scrollTrigger: { trigger: '#about', start: 'top 75%', once: true },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
          });

          // 3. WHAT I DO
          window.gsap.from('#services .section-header-block', {
            scrollTrigger: { trigger: '#services', start: 'top 80%', once: true },
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: 'power2.out'
          });

          window.gsap.from('#services .service-card', {
            scrollTrigger: { trigger: '#services .services-grid', start: 'top 82%', once: true },
            opacity: 0,
            y: 35,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
          });

          // 4. SKILLS & PROFICIENCY
          window.gsap.from('#skills .section-header-block', {
            scrollTrigger: { trigger: '#skills', start: 'top 80%', once: true },
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: 'power2.out'
          });

          window.gsap.from('#skills .skill-round-badge', {
            scrollTrigger: { trigger: '#skills .skills-round-icons-grid', start: 'top 85%', once: true },
            opacity: 0,
            scale: 0.82,
            y: 20,
            duration: 0.65,
            stagger: 0.06,
            ease: 'back.out(1.4)'
          });

          window.gsap.from('#skills .skills-divider-header', {
            scrollTrigger: { trigger: '#skills .skills-divider-header', start: 'top 85%', once: true },
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'power2.out'
          });

          window.gsap.from('#skills .skill-bar-card', {
            scrollTrigger: { trigger: '#skills .skills-progress-grid', start: 'top 85%', once: true },
            opacity: 0,
            y: 25,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out'
          });

          // 5. JOURNEY / EDUCATION & WORK PROCESS
          window.gsap.from('#journey .section-header-block', {
            scrollTrigger: { trigger: '#journey', start: 'top 80%', once: true },
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: 'power2.out'
          });

          window.gsap.from('#journey .edu-item-row', {
            scrollTrigger: { trigger: '#journey .edu-timeline-list', start: 'top 85%', once: true },
            opacity: 0,
            x: -25,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out'
          });

          window.gsap.from('#journey .process-step-row', {
            scrollTrigger: { trigger: '#journey .work-process-list', start: 'top 85%', once: true },
            opacity: 0,
            x: 25,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out'
          });

          // 6. PROJECTS
          window.gsap.fromTo(
            '#projects .projects-header-row',
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: { trigger: '#projects', start: 'top 85%', once: true },
              onComplete: function () {
                const header = document.querySelector('#projects .projects-header-row');
                if (header) {
                  header.style.opacity = '1';
                  header.style.transform = 'none';
                }
              }
            }
          );

          window.gsap.fromTo(
            '#projects .project-item-card',
            {
              opacity: 0,
              y: 40,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '#projects',
                start: 'top 85%',
                once: true
              },
              onComplete: function () {
                const cards = document.querySelectorAll('#projects .project-item-card');
                cards.forEach(function (card) {
                  card.style.opacity = '1';
                  card.style.transform = 'none';
                });
                const thumbs = document.querySelectorAll('#projects .project-thumb-frame, #projects .project-thumb-frame img');
                thumbs.forEach(function (thumb) {
                  thumb.style.opacity = '1';
                  thumb.style.transform = 'none';
                });
              }
            }
          );

          // 7. CONTACT & MESSAGE FORM
          window.gsap.from('#contact .contact-left-col, #contact .contact-middle-list, #contact .contact-device-col', {
            scrollTrigger: { trigger: '#contact', start: 'top 80%', once: true },
            opacity: 0,
            y: 35,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out'
          });

          window.gsap.from('#contact-form .contact-form-card', {
            scrollTrigger: { trigger: '#contact-form', start: 'top 82%', once: true },
            opacity: 0,
            y: 35,
            duration: 0.85,
            ease: 'power2.out'
          });

          // 8. FOOTER
          window.gsap.from('footer', {
            scrollTrigger: { trigger: 'footer', start: 'top 95%', once: true },
            opacity: 0,
            y: 25,
            duration: 0.8,
            ease: 'power2.out'
          });

          window.gsap.from('footer .footer-nav-link', {
            scrollTrigger: { trigger: 'footer', start: 'top 95%', once: true },
            opacity: 0,
            y: 10,
            stagger: 0.05,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.2
          });

          // Refresh ScrollTrigger to recalculate exact section heights
          const refreshScrollTriggers = () => {
            if (window.ScrollTrigger) {
              window.ScrollTrigger.refresh();
            }
          };
          setTimeout(refreshScrollTriggers, 150);
          setTimeout(refreshScrollTriggers, 500);
          setTimeout(refreshScrollTriggers, 1200);
          window.addEventListener('load', refreshScrollTriggers);
          window.addEventListener('resize', refreshScrollTriggers);
          document.querySelectorAll('img').forEach((img) => {
            if (!img.complete) {
              img.addEventListener('load', refreshScrollTriggers);
            }
          });

          // Safeguard: Ensure project cards transition to visible when #projects enters viewport
          if ('IntersectionObserver' in window) {
            const projectsObserver = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const cards = document.querySelectorAll('#projects .project-item-card');
                  cards.forEach((card) => {
                    if (card.style.opacity === '0' || window.getComputedStyle(card).opacity === '0') {
                      window.gsap.to(card, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.85,
                        ease: 'power2.out',
                        onComplete: () => {
                          card.style.opacity = '1';
                          card.style.transform = 'none';
                          const thumbs = card.querySelectorAll('.project-thumb-frame, .project-thumb-frame img');
                          thumbs.forEach((t) => {
                            t.style.opacity = '1';
                            t.style.transform = 'none';
                          });
                        }
                      });
                    }
                  });
                }
              });
            }, { threshold: 0.15 });

            const projSection = document.getElementById('projects');
            if (projSection) {
              projectsObserver.observe(projSection);
            }
          }
        });

        return () => ctx.revert();
      }, [services, skills, journey, projects]);

      return (
        <div className="portfolio-page-wrapper">
          {/* Header with Top Right Theme Toggle */}
          <Header about={about} cvUrl={cvUrl} theme={theme} toggleTheme={toggleTheme} />

          <main>
            {/* 1. HERO (Exact 3-Column Editorial Layout) */}
            <Hero about={about} />

            {/* 2. ABOUT ME (Exact Narrative + 4 Highlights + CTA Side Box) */}
            <AboutMe about={about} cvUrl={cvUrl} />

            {/* 3. WHAT I DO (Capability Cards) */}
            <WhatIDo services={services} />

            {/* 4. SKILLS (Round Icons First + Proficiency & Learning Progress Bars Second) */}
            <SkillsSection skills={skills} learningSkills={learningSkills} />

            {/* 5. CONTINUOUSLY MOVING TECHNOLOGY LOGOS */}
            <TechMarqueeStrip />

            {/* 6. EDUCATION / EXPERIENCE TIMELINE (Balanced 2-Column: Education + Work Process) */}
            <EducationJourney journey={journey} about={about} />

            {/* 7. PROJECTS (3 Centered Project Cards: CareNova, JobBizz, Portfolio) */}
            <Projects projects={projects} onSelectProject={setSelectedProject} />

            {/* 8. CONTACT & DEVICE MOCKUP */}
            <Contact about={about} />

            {/* 9. INLINE MESSAGE FORM (Directly Saves to Database) */}
            <ContactMessageForm />
          </main>

          {/* 10. FOOTER WITH NAVIGATION BAR */}
          <Footer about={about} cvUrl={cvUrl} />

          {/* Interactive Project Modal */}
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  