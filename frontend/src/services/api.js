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
};

export const FALLBACK_MAIN_SKILLS = [
  { id: 1, name: 'Python', category: 'BACKEND', proficiency: 80, description: 'Backend programming, logic, and data handling.', icon: '🐍' },
  { id: 2, name: 'Django', category: 'BACKEND', proficiency: 80, description: "Web application framework, ORM, and MVT architecture.", icon: '🎸' },
  { id: 3, name: 'Django REST Framework', category: 'BACKEND', proficiency: 65, description: 'RESTful endpoints, serializers, API views, and JSON data contracts.', icon: '⚡' },
  { id: 4, name: 'HTML', category: 'FRONTEND', proficiency: 90, description: 'Semantic HTML5 markup, accessibility, and clean structure.', icon: '🌐' },
  { id: 5, name: 'CSS', category: 'FRONTEND', proficiency: 80, description: 'Modern CSS3 layouts, Flexbox, Grid, animations, and responsive design.', icon: '🎨' },
  { id: 6, name: 'JavaScript', category: 'FRONTEND', proficiency: 70, description: 'DOM manipulation, asynchronous operations, event handling, and ES6+.', icon: '⚡' },
  { id: 7, name: 'React', category: 'FRONTEND', proficiency: 60, description: 'Component architecture, functional components, state hooks, and UI integration.', icon: '⚛️' },
  { id: 8, name: 'MySQL', category: 'DATABASE', proficiency: 75, description: 'Relational database schema design, queries, and management.', icon: '🐬' },
  { id: 9, name: 'SQL', category: 'DATABASE', proficiency: 70, description: 'Writing and optimizing relational queries and CRUD operations.', icon: '🗄️' },
  { id: 10, name: 'Git', category: 'TOOLS', proficiency: 70, description: 'Version control, branching workflows, and commit history tracking.', icon: '🌿' },
  { id: 11, name: 'GitHub', category: 'TOOLS', proficiency: 70, description: 'Repository management, collaboration, and code hosting.', icon: '🐙' },
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
    title: 'CareNova – Medical Store Management System',
    subtitle: 'Full-Stack Medical Store Management',
    technologies: 'Python, Django, MySQL, HTML, CSS, JavaScript',
    image_url: '/images/carenova.png',
    display_image: '/images/carenova.png',
    description: 'A full-stack medical store management web application built using Python, Django and MySQL.',
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
    subtitle: 'Job Consultancy and Recruitment Web Application',
    technologies: 'Python, Django, MySQL, HTML, CSS, JavaScript',
    image_url: '/images/jobbizz.png',
    display_image: '/images/jobbizz.png',
    description: 'A job consultancy and recruitment web application developed using Python, Django and MySQL.',
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
    technologies: 'React, JavaScript, Django, Django REST Framework, MySQL',
    image_url: '/images/portfolio_project.png',
    display_image: '/images/portfolio_project.png',
    description: 'A full-stack developer portfolio built using React, JavaScript, Django REST Framework and MySQL.',
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

export async function sendContactMessage(data) {
  const res = await fetch(`${API_BASE_URL}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}
