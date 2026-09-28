from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import About, Project, Skill, Service, Journey, WorkProcess, ContactMessage, Resume, SocialLink

class Command(BaseCommand):
    help = 'Seeds database with original portfolio writings while keeping authentic CV file and Currently Learning area'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE('Starting portfolio database seeding with original writings...'))

        # 1. Seed About Profile (Original Writings)
        about_profile, _ = About.objects.update_or_create(
            id=1,
            defaults={
                'name': 'JESEENA',
                'professional_title': 'FULL STACK DEVELOPER',
                'short_introduction': (
                    "I'm a passionate Full Stack Developer with a background in Python full stack development, turned coder. "
                    "I love building web applications that are clean, useful and user-friendly. "
                    "I'm always eager to learn, grow and take on new challenges."
                ),
                'about_text': (
                    "I completed intensive Python Full Stack Development training with an internship at Safe Technologies. "
                    "I have practical experience building dynamic web applications using Python, Django, and MySQL. "
                    "I enjoy creating practical, responsive, and user-friendly web applications, and I am currently expanding "
                    "my knowledge of React, Node.js, and modern APIs to continuously grow as a Full Stack Developer."
                ),
                'quote': 'Build. Learn. Improve. Repeat.',
                'location': 'KERALA, INDIA',
                'email': 'jeseena2005@gmail.com',
                'phone': '+91 7736998984',
                'github_url': 'https://github.com/Jeseena-codes',
                'linkedin_url': 'https://linkedin.com/in/jeseena-j-48a126336',
                'years_old': '21+',
                'featured_projects_count': '3',
            }
        )
        self.stdout.write(f"  + Seeded About Profile: {about_profile.name} ({about_profile.email})")

        # 2. Seed Resume / CV linking to authentic PDF
        resume, _ = Resume.objects.update_or_create(
            id=1,
            defaults={
                'title': 'Jeseena J - Full Stack Developer CV',
                'file': 'resumes/Jeseena_CV.pdf',
                'is_active': True,
            }
        )
        self.stdout.write(f"  + Seeded Resume/CV: {resume.title}")

        # 3. Seed Projects (Original Writings)
        Project.objects.all().delete()
        projects_data = [
            {
                'slug': 'carenova-medical-store',
                'project_number': '01',
                'title': 'CareNova – Medical Store Management System',
                'subtitle': 'Full Stack Web Application',
                'technologies': 'Python | Django | MySQL',
                'description': (
                    "A full-stack medical store management web application built using Python, Django and MySQL. "
                    "Provides end-to-end management of pharmaceutical supplies, digital prescriptions, role-based buyer/seller "
                    "authorization, dynamic cart management, and order fulfillment workflows."
                ),
                'features': (
                    "Secure authentication\n"
                    "Buyer registration/login\n"
                    "Medical store registration\n"
                    "Medicine/product management\n"
                    "Product browsing\n"
                    "Cart functionality\n"
                    "Buy/order requests\n"
                    "Order processing\n"
                    "Seller approval and packing workflow\n"
                    "Buyer feedback/rating\n"
                    "Admin management"
                ),
                'image_url': 'images/carenova.png',
                'github_url': 'https://github.com/Jeseena-codes/Carenova-Medical-Store-Website-',
                'order': 1,
            },
            {
                'slug': 'jobbizz-job-consultancy',
                'project_number': '02',
                'title': 'JobBizz – Job Consultancy Platform',
                'subtitle': 'Job Consultancy Web Application',
                'technologies': 'Python | Django | MySQL',
                'description': (
                    "A job consultancy and recruitment web application developed using Python, Django and MySQL. "
                    "Facilitates multi-tier communication between job seekers, hiring companies, and consultancy administrators "
                    "with application tracking and raw SQL query workflows."
                ),
                'features': (
                    "Candidate registration/login\n"
                    "Job search\n"
                    "Job applications\n"
                    "Application tracking\n"
                    "Company portal\n"
                    "Job posting\n"
                    "Job management\n"
                    "Consultancy admin portal\n"
                    "Candidate/company management\n"
                    "Feedback management\n"
                    "MySQL database\n"
                    "Raw SQL queries"
                ),
                'image_url': 'images/jobbizz.png',
                'github_url': 'https://github.com/Jeseena-codes/JOBBIZZ-Job-solution',
                'order': 2,
            },
            {
                'slug': 'personal-portfolio-website',
                'project_number': '03',
                'title': 'Personal Portfolio Website',
                'subtitle': 'Full-Stack Developer Portfolio',
                'technologies': 'React | Django REST Framework | MySQL',
                'description': (
                    "A full-stack developer portfolio built using React, JavaScript, Django REST Framework and MySQL. "
                    "Features dynamic content retrieval via RESTful endpoints, dedicated Django Admin management, "
                    "responsive cyan cyber styling, contact persistence, and dynamic CV management."
                ),
                'features': (
                    "Dynamic portfolio content\n"
                    "Django Admin content management\n"
                    "Skills management\n"
                    "Project management\n"
                    "Education management\n"
                    "Social links management\n"
                    "Resume/CV management\n"
                    "Contact form\n"
                    "REST API\n"
                    "Responsive design"
                ),
                'image_url': 'images/portfolio_project.png',
                'github_url': 'https://github.com/Jeseena-codes',
                'order': 3,
            },
        ]

        for p in projects_data:
            Project.objects.create(
                slug=p['slug'],
                project_number=p['project_number'],
                title=p['title'],
                subtitle=p['subtitle'],
                technologies=p['technologies'],
                description=p['description'],
                features=p['features'],
                image_url=p['image_url'],
                github_url=p['github_url'],
                featured=True,
                order=p['order'],
            )
        self.stdout.write("  + Seeded projects (Original Writings)")

        # 4. Seed Main Skills with realistic proficiency percentages
        Skill.objects.all().delete()
        
        main_skills_data = [
            ('Python', 'BACKEND', "Backend programming, logic, and data handling.", 80, 1),
            ('Django', 'BACKEND', "Web application framework, ORM, and MVT architecture.", 80, 2),
            ('Django REST Framework', 'BACKEND', "RESTful endpoints, serializers, API views, and JSON data contracts.", 65, 3),
            ('HTML', 'FRONTEND', "Semantic HTML5 markup, accessibility, and clean structure.", 90, 4),
            ('CSS', 'FRONTEND', "Modern CSS3 layouts, Flexbox, Grid, animations, and responsive design.", 80, 5),
            ('JavaScript', 'FRONTEND', "DOM manipulation, asynchronous operations, event handling, and ES6+.", 70, 6),
            ('React', 'FRONTEND', "Component architecture, functional components, state hooks, and UI integration.", 60, 7),
            ('MySQL', 'DATABASE', "Relational database schema design, queries, and management.", 75, 8),
            ('SQL', 'DATABASE', "Writing and optimizing relational queries and CRUD operations.", 70, 9),
            ('Git', 'TOOLS', "Version control, branching workflows, and commit history tracking.", 70, 10),
            ('GitHub', 'TOOLS', "Repository management, collaboration, and code hosting.", 70, 11),
        ]
        for name, category, desc, prof, order in main_skills_data:
            Skill.objects.create(
                name=name,
                category=category,
                description=desc,
                proficiency=prof,
                is_learning=False,
                order=order,
                is_active=True
            )
        self.stdout.write("  + Seeded Main Skills with realistic proficiencies")

        # 5. Seed Experience & Education Timeline
        Journey.objects.all().delete()
        journey_data = [
            (
                '2026',
                'Full Stack Development',
                'Building projects, improving React/Django skills and developing my full-stack portfolio.',
                1
            ),
            (
                '2025–2026',
                'Python Full Stack Development with Internship',
                'Safe Technologies — Comprehensive Python Full Stack Development training with internship, developing complete web platforms with Python, Django, and MySQL.',
                2
            ),
            (
                '2025',
                'Bachelor of Arts in Functional English',
                'Govt. Arts & Science College, Nattukal, Kozhinjampara — Cultivated strong analytical reasoning, communication, and clear technical documentation skills.',
                3
            ),
            (
                '2022',
                'Higher Secondary — Commerce',
                'Govt. Victoria Girls Higher Secondary School, Anicode — Foundational academic studies in commerce, mathematics, and business communication.',
                4
            ),
        ]
        for year, title, desc, order in journey_data:
            Journey.objects.create(year=year, title=title, description=desc, order=order)
        self.stdout.write("  + Seeded Experience & Education Timeline")

        # 6. Seed Services (Original 6 Services)
        Service.objects.all().delete()
        services_data = [
            ('01', 'Frontend Development', 'Crafting responsive, clean and user-friendly web interfaces using semantic HTML5, modern CSS3 layouts, JavaScript, and React component architectures.', 'HTML5, CSS3, JavaScript, React', 1),
            ('02', 'Backend Development', 'Developing robust server-side web applications and RESTful APIs with Python and Django, implementing secure authentication, models, and business logic.', 'Python, Django, Django REST Framework', 2),
            ('03', 'Database Management', 'Designing relational databases, schema structuring, relational queries, data integrity, and performing efficient CRUD operations using MySQL.', 'MySQL, Database Management, SQL', 3),
            ('04', 'Full Stack Web Development', 'Connecting dynamic React/HTML frontends to Python Django backends, handling end-to-end data flow, authentication, and state management.', 'Frontend + Backend Integration, REST APIs, Authentication, CRUD Applications', 4),
            ('05', 'Version Control', 'Tracking code evolution, branching workflows, commits, pull requests, and publishing open-source projects to GitHub.', 'Git, GitHub', 5),
            ('06', 'AI & Development Tools', 'Accelerating full-stack engineering with modern development environments, extensions, debugging utilities, and AI productivity tools.', 'VS Code, AI-Assisted Development', 6),
        ]
        for s_num, s_title, s_desc, s_skills, s_order in services_data:
            Service.objects.create(service_number=s_num, title=s_title, description=s_desc, skills_list=s_skills, order=s_order)
        self.stdout.write("  + Seeded 6 Core Services (Original Writings)")

        # 7. Seed Social & Connect Links (Dynamic Admin Manageable)
        SocialLink.objects.all().delete()
        social_links_data = [
            ('WhatsApp', 'https://wa.me/917736998984', 'bx bxl-whatsapp', 1),
            ('GitHub', 'https://github.com/Jeseena-codes', 'bx bxl-github', 2),
            ('LinkedIn', 'https://linkedin.com/in/jeseena-j-48a126336', 'bx bxl-linkedin', 3),
            ('Email', 'mailto:jeseena2005@gmail.com', 'bx bx-envelope', 4),
        ]
        for name, url, icon, order in social_links_data:
            SocialLink.objects.create(platform_name=name, url=url, icon=icon, order=order, is_active=True)
        self.stdout.write("  + Seeded Social Links (WhatsApp, GitHub, LinkedIn, Email)")

        self.stdout.write(self.style.SUCCESS('Successfully updated database with original writings and authentic CV!'))
