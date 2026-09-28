// API Service connecting React frontend to Django REST API backend

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Built-in fallback data matching official CV specifications
export const FALLBACK_ABOUT = {
  name: 'JESEENA',
  professional_title: 'FULL STACK DEVELOPER',
  short_introduction: "I'm a passionate Full Stack Developer with a background in Python full stack development, turned coder. I love building web applications that are clean, useful and user-friendly. I'm always eager to learn, grow and take on new challenges.",
  about_text: "I completed intensive Python Full Stack Development training with an internship at Safe Technologies. I have practical experience building dynamic web applications using Python, Django, and MySQL. I enjoy creating practical, responsive, and user-friendly web applications, and I am currently expanding my knowledge of React, Node.js, and modern APIs to continuously grow as a Full Stack Developer.",
  quote: "Build. Learn. Improve. Repeat.",
  location: 'KERALA, INDIA',
  email: 'jeseena2005@gmail.com',
  phone: '+91 7736998984',
  github_url: 'https://github.com/Jeseena-codes',
  linkedin_url: 'https://linkedin.com/in/jeseena-j-48a126336',
  display_photo: 'images/profile.jpg',
  years_old: '21+',
  featured_projects_count: '3',
  hero_watermark: 'PORTFOLIO',
  availability_status: 'AVAILABLE FOR HIRING',
  greeting_text: 'Hi, I’m',
  hero_lead_text: 'Turning ideas into functional web experiences.',
  hero_highlights: 'Responsive Development\nClean Code\nUser-Centered Design',
  hero_highlights_list: [
    'Responsive Development',
    'Clean Code',
    'User-Centered Design'
  ],
  about_headline: 'FROM WORDS TO CODE — CRAFTING REAL-WORLD WEB EXPERIENCES.',
  about_highlights: 'Full Stack Focus: Python, Django & React Integration\nDatabase Engineering: MySQL Schema Design & CRUD Logic\nLinguistic Precision: Analytical Thinking & Clear Documentation\nProfessional Mindset: Responsive UI & Maintainable Code',
  about_highlights_list: [
    { title: 'Full Stack Focus', val: 'Python, Django & React Integration' },
    { title: 'Database Engineering', val: 'MySQL Schema Design & CRUD Logic' },
    { title: 'Linguistic Precision', val: 'Analytical Thinking & Clear Documentation' },
    { title: 'Professional Mindset', val: 'Responsive UI & Maintainable Code' }
  ],
  side_card_badge: '✦ AVAILABLE FOR HIRE',
  side_card_title: 'Ready to build something?',
  side_card_subtext: "\"I'm open to new opportunities, freelance projects and collaborations.\"",
  about_section_title: 'THE DEVELOPER BEHIND THE CODE',
  about_section_subtitle: 'A fresher Full Stack Developer driven by curiosity, analytical precision, and practical problem-solving.',
  services_section_title: 'TECHNICAL CAPABILITIES & SERVICES',
  services_section_subtitle: 'Practical, end-to-end full stack development capabilities honed through structured projects and dedicated problem-solving.',
  skills_section_title: 'SKILLS & PROFICIENCY',
  skills_section_subtitle: 'Core technologies, database engineering, and practical development proficiencies.',
  journey_section_title: 'EDUCATION & PROCESS',
  journey_section_subtitle: 'A structured timeline of my learning milestones, methodology, and core technical competencies.',
  projects_section_title: 'SELECTED PROJECTS',
  contact_heading: "LET'S WORK TOGETHER",
  contact_subtext: "I'm actively seeking full-time Full Stack Developer roles, collaborations, and project opportunities. Let's create something reliable, performant, and elegant.",
  display_device_mockup: '/images/laptop_mockup.png',
  footer_copyright_text: 'All rights reserved. • Built with React & Django REST Framework.',
  social_links: [
    { id: 1, platform_name: 'GitHub', url: 'https://github.com/Jeseena-codes', icon: 'bx bxl-github', order: 1 },
    { id: 2, platform_name: 'LinkedIn', url: 'https://linkedin.com/in/jeseena-j-48a126336', icon: 'bx bxl-linkedin', order: 2 },
    { id: 3, platform_name: 'Email', url: 'mailto:jeseena2005@gmail.com', icon: 'bx bx-envelope', order: 3 },
  ]
};

export const FALLBACK_WORK_PROCESS = [
  { id: 1, step_number: '01', title: 'Discover', description: 'Research & Requirements Analysis', icon: 'bx bx-search-alt' },
  { id: 2, step_number: '02', title: 'Plan', description: 'Architecture & System Flow', icon: 'bx bx-notepad' },
  { id: 3, step_number: '03', title: 'Design', description: 'Responsive UI & Data Modeling', icon: 'bx bx-palette' },
  { id: 4, step_number: '04', title: 'Develop', description: 'Frontend & Backend Integration', icon: 'bx bx-code-alt' },
  { id: 5, step_number: '05', title: 'Test', description: 'Functionality & Quality Checks', icon: 'bx bx-check-shield' },
  { id: 6, step_number: '06', title: 'Deliver', description: 'Deployment & Ongoing Maintenance', icon: 'bx bx-cloud-upload' },
];

export const FALLBACK_MAIN_SKILLS = [
  { id: 1, name: 'Python', category: 'BACKEND', proficiency: 80, description: 'Backend programming, logic, and data handling.', icon: 'bx bxl-python' },
  { id: 2, name: 'Django', category: 'BACKEND', proficiency: 80, description: 'Web application framework, ORM, and MVT architecture.', icon: 'bx bx-code-alt' },
  { id: 3, name: 'Django REST Framework', category: 'BACKEND', proficiency: 65, description: 'RESTful endpoints, serializers, API views, and JSON data contracts.', icon: 'bx bx-transfer-alt' },
  { id: 4, name: 'HTML', category: 'FRONTEND', proficiency: 90, description: 'Semantic HTML5 markup, accessibility, and clean structure.', icon: 'bx bxl-html5' },
  { id: 5, name: 'CSS', category: 'FRONTEND', proficiency: 80, description: 'Modern CSS3 layouts, Flexbox, Grid, animations, and responsive design.', icon: 'bx bxl-css3' },
  { id: 6, name: 'JavaScript', category: 'FRONTEND', proficiency: 70, description: 'DOM manipulation, asynchronous operations, event handling, and ES6+.', icon: 'bx bxl-javascript' },
  { id: 7, name: 'React', category: 'FRONTEND', proficiency: 60, description: 'Component architecture, functional components, state hooks, and UI integration.', icon: 'bx bxl-react' },
  { id: 8, name: 'MySQL', category: 'DATABASE', proficiency: 75, description: 'Relational database schema design, queries, and management.', icon: 'bx bxs-data' },
  { id: 9, name: 'SQL', category: 'DATABASE', proficiency: 70, description: 'Writing and optimizing relational queries and CRUD operations.', icon: 'bx bx-data' },
  { id: 10, name: 'Git', category: 'TOOLS', proficiency: 70, description: 'Version control, branching workflows, and commit history tracking.', icon: 'bx bxl-git' },
  { id: 11, name: 'GitHub', category: 'TOOLS', proficiency: 70, description: 'Repository management, collaboration, and code hosting.', icon: 'bx bxl-github' },
];

export const FALLBACK_LEARNING_SKILLS = [
  { id: 12, name: 'React', subtitle: 'Modern Component-Driven UI', description: 'Component hierarchy, functional components, state hooks, and reactive interfaces.', badge: 'Active Practice', progress: '60%' },
  { id: 13, name: 'Node.js', subtitle: 'Server-Side Runtime', description: 'Server-side JavaScript runtime, event-driven architecture, and backend services.', badge: 'In Progress', progress: 'Foundations' },
  { id: 14, name: 'APIs / REST APIs', subtitle: 'Endpoint Design & Integration', description: 'RESTful endpoints, HTTP request methods, JSON data contracts, and API integration.', badge: 'In Progress', progress: 'Integrating' },
];

export const FALLBACK_SERVICES = [
  {
    id: 1,
    service_number: '01',
    title: 'FRONTEND DEVELOPMENT',
    description: 'Crafting responsive, clean, and user-friendly web interfaces using semantic HTML5, modern CSS3 layouts, JavaScript, and React component architectures.',
    skills_list: 'HTML, CSS, JavaScript, React',
    skills: ['HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    id: 2,
    service_number: '02',
    title: 'BACKEND DEVELOPMENT',
    description: 'Developing robust server-side web applications and RESTful APIs with Python and Django, implementing secure authentication, models, and business logic.',
    skills_list: 'Python, Django, Django REST Framework',
    skills: ['Python', 'Django', 'Django REST Framework']
  },
  {
    id: 3,
    service_number: '03',
    title: 'DATABASE',
    description: 'Designing relational databases, schema structuring, relational queries, data integrity, and performing efficient CRUD operations using MySQL.',
    skills_list: 'MySQL, Database management, SQL',
    skills: ['MySQL', 'Database management', 'SQL']
  },
  {
    id: 4,
    service_number: '04',
    title: 'FULL STACK WEB DEVELOPMENT',
    description: 'Connecting dynamic React/HTML frontends to Python Django backends, handling end-to-end data flow, authentication, and state management.',
    skills_list: 'Frontend + Backend integration, REST APIs, Authentication, CRUD applications',
    skills: ['Frontend + Backend integration', 'REST APIs', 'Authentication', 'CRUD applications']
  },
  {
    id: 5,
    service_number: '05',
    title: 'VERSION CONTROL',
    description: 'Tracking code evolution, branching workflows, commits, pull requests, and publishing open-source projects to GitHub.',
    skills_list: 'Git, GitHub',
    skills: ['Git', 'GitHub']
  },
  {
    id: 6,
    service_number: '06',
    title: 'AI / DEVELOPMENT TOOLS',
    description: 'Accelerating full-stack engineering with modern development environments, extensions, debugging utilities, and AI-assisted workflows.',
    skills_list: 'AI-assisted development, VS Code',
    skills: ['AI-assisted development', 'VS Code']
  }
];

export const FALLBACK_PROJECTS = [
  {
    id: 1,
    project_number: '01',
    title: 'CareNova',
    subtitle: 'Medical Store Management System',
    technologies: 'Python, Django, MySQL, HTML, CSS, JavaScript',
    tech_list: ['Python', 'Django', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    image_url: '/images/carenova.png',
    display_image: '/images/carenova.png',
    overview: 'CareNova is a full-stack medical store management website developed to manage medicines, users, shopping cart activity, and orders through a centralized web application.',
    problem: 'A medical store application needs an organized way to manage medicine information, inventory, users, carts, and orders while keeping the overall experience simple for users.',
    solution: 'I developed CareNova using Django and MySQL, implementing authentication, medicine inventory management, shopping cart functionality, and order management.',
    my_role: 'Full-stack development, including frontend implementation, backend development, database integration, authentication, inventory functionality, cart functionality, and order workflows.',
    description: 'CareNova is a full-stack medical store management website developed to manage medicines, users, shopping cart activity, and orders through a centralized web application.',
    github_url: 'https://github.com/Jeseena-codes/Carenova-Medical-Store-Website-',
    live_url: '',
    features: [
      'User authentication',
      'Medicine inventory management',
      'Medicine/product information',
      'Shopping cart',
      'Order management',
      'Django backend',
      'MySQL database',
      'Admin management'
    ],
    feature_list: [
      'User authentication',
      'Medicine inventory management',
      'Medicine/product information',
      'Shopping cart',
      'Order management',
      'Django backend',
      'MySQL database',
      'Admin management'
    ]
  },
  {
    id: 2,
    project_number: '02',
    title: 'JobBizz',
    subtitle: 'Job Consultancy Platform',
    technologies: 'Python, Django, MySQL, HTML, CSS, JavaScript',
    tech_list: ['Python', 'Django', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    image_url: '/images/jobbizz.png',
    display_image: '/images/jobbizz.png',
    overview: 'JobBizz is a job consultancy platform designed to manage interactions between candidates, companies, and consultancy operations through dedicated portals.',
    problem: 'Candidates, companies, and consultancy administrators have different requirements and workflows. The platform needed separate functionality for managing these different user roles and their related information.',
    solution: 'I developed JobBizz using Django and MySQL with dedicated Candidate, Company, and Consultancy/Admin workflows for managing job-related operations.',
    my_role: 'Full-stack development with focus on backend logic, database integration, user workflows, portals, and application-related functionality.',
    description: 'JobBizz is a job consultancy platform designed to manage interactions between candidates, companies, and consultancy operations through dedicated portals.',
    github_url: 'https://github.com/Jeseena-codes/JOBBIZZ-Job-solution',
    live_url: '',
    features: [
      'Candidate portal',
      'Company portal',
      'Consultancy/Admin portal',
      'Job management',
      'Candidate management',
      'Application-related workflows',
      'MySQL database',
      'Administrative management'
    ],
    feature_list: [
      'Candidate portal',
      'Company portal',
      'Consultancy/Admin portal',
      'Job management',
      'Candidate management',
      'Application-related workflows',
      'MySQL database',
      'Administrative management'
    ]
  },
  {
    id: 3,
    project_number: '03',
    title: 'Personal Portfolio',
    subtitle: 'Jeseena J — Full Stack Developer Portfolio',
    technologies: 'React, JavaScript, HTML, CSS, Python, Django, Django REST Framework, MySQL, Git, GitHub',
    tech_list: ['React', 'JavaScript', 'HTML', 'CSS', 'Python', 'Django', 'Django REST Framework', 'MySQL', 'Git', 'GitHub'],
    image_url: '/images/portfolio_project.png',
    display_image: '/images/portfolio_project.png',
    overview: 'This portfolio website is a personal developer portfolio created to present my projects, technical skills, education, development journey, and professional profile in an interactive web experience.',
    problem: 'Create a professional online presence where recruiters and potential clients can quickly understand my background, technical capabilities, projects, and development experience.',
    solution: 'I developed the portfolio using a React frontend connected with a Django REST Framework backend. The website uses dynamic content, API integration, Django Admin, responsive layouts, and interactive animations.',
    my_role: 'Full-stack development, including React frontend development, Django REST backend development, database/API integration, Django Admin functionality, responsive UI implementation, project integration, and interactive portfolio animations.',
    description: 'This portfolio website is a personal developer portfolio created to present my projects, technical skills, education, development journey, and professional profile in an interactive web experience.',
    github_url: 'https://github.com/Jeseena-codes',
    live_url: '',
    features: [
      'Responsive portfolio website',
      'Hero and About sections',
      'Technical skills and proficiency',
      'Education & milestones',
      'Work process',
      'Featured projects',
      'Contact form',
      'Resume/CV download',
      'Django Admin',
      'REST API integration',
      'Dynamic portfolio content',
      'Project showcase',
      'Interactive scroll animations'
    ],
    feature_list: [
      'Responsive portfolio website',
      'Hero and About sections',
      'Technical skills and proficiency',
      'Education & milestones',
      'Work process',
      'Featured projects',
      'Contact form',
      'Resume/CV download',
      'Django Admin',
      'REST API integration',
      'Dynamic portfolio content',
      'Project showcase',
      'Interactive scroll animations'
    ]
  }
];

export const FALLBACK_EDUCATION = [
  {
    id: 1,
    year: '2026',
    title: 'Full Stack Development',
    institution: 'Independent Projects & Continuous Learning',
    description: 'Building projects, improving React/Django skills and developing my portfolio.'
  },
  {
    id: 2,
    year: '2025–2026',
    title: 'Python Full Stack Development with Internship',
    institution: 'Safe Technologies',
    description: 'Comprehensive Python Full Stack Development training with internship, developing complete web platforms with Python, Django, and MySQL.'
  },
  {
    id: 3,
    year: '2025',
    title: 'Bachelor of Arts in Functional English',
    institution: 'Govt. Arts & Science College, Nattukal, Kozhinjampara',
    description: 'Cultivated strong analytical reasoning, structural understanding of grammar, and clear technical documentation skills.'
  },
  {
    id: 4,
    year: '2022',
    title: 'Higher Secondary — Commerce',
    institution: 'Govt. Victoria Girls Higher Secondary School, Anicode',
    description: 'Foundational secondary education in commerce, business studies, and analytical mathematics.'
  }
];

export async function getAbout() {
  try {
    const res = await fetch(`${API_BASE_URL}/about/`);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    return FALLBACK_ABOUT;
  }
}

export async function getServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/services/`);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    return FALLBACK_SERVICES;
  }
}

export async function getResume() {
  try {
    const res = await fetch(`${API_BASE_URL}/resume/`);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    return { download_url: '/images/Jeseena_CV.pdf' };
  }
}

export async function getSkills() {
  try {
    const res = await fetch(`${API_BASE_URL}/skills/`);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    return { main_skills: FALLBACK_MAIN_SKILLS, currently_learning: FALLBACK_LEARNING_SKILLS };
  }
}

export async function getProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/projects/`);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    return FALLBACK_PROJECTS;
  }
}

export async function getEducation() {
  try {
    const res = await fetch(`${API_BASE_URL}/education/`);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    return FALLBACK_EDUCATION;
  }
}

export async function getWorkProcess() {
  try {
    const res = await fetch(`${API_BASE_URL}/work-process/`);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    return FALLBACK_WORK_PROCESS;
  }
}

export async function sendContactMessage(data) {
  const res = await fetch(`${API_BASE_URL}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function getSocialLinks() {
  try {
    const res = await fetch(`${API_BASE_URL}/social-links/`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : FALLBACK_ABOUT.social_links;
  } catch (err) {
    return FALLBACK_ABOUT.social_links;
  }
}
