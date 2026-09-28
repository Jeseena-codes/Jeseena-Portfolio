from django.db import models

class About(models.Model):
    name = models.CharField(max_length=100, default="Jeseena")
    professional_title = models.CharField(max_length=150, default="Full Stack Developer")
    short_introduction = models.TextField(
        default="I'm a passionate Full Stack Developer with a background in Python full stack development, turned coder. I love building web applications that are clean, useful and user-friendly. I'm always eager to learn, grow and take on new challenges.",
        help_text="Introduction summary shown in the Hero section"
    )
    about_text = models.TextField(
        default="I completed intensive Python Full Stack Development training with an internship at Safe Technologies. I have practical experience building dynamic web applications using Python, Django, and MySQL. I enjoy creating practical, responsive, and user-friendly web applications, and I am currently expanding my skills into React, Node.js, and modern APIs to continuously grow as a Full Stack Developer.",
        help_text="Detailed story shown in the About section"
    )
    quote = models.TextField(
        default="Build. Learn. Improve. Repeat.",
        help_text="Quote shown in About and CTA sections"
    )
    location = models.CharField(max_length=100, default="Palakkad, Kerala")
    email = models.EmailField(default="jeseena2005@gmail.com")
    phone = models.CharField(max_length=50, default="+91 7736998984", blank=True)
    github_url = models.URLField(max_length=500, blank=True, default="https://github.com/Jeseena-codes")
    linkedin_url = models.URLField(max_length=500, blank=True, default="https://linkedin.com/in/jeseena-j-48a126336")
    profile_photo = models.ImageField(upload_to='profile/', blank=True, null=True, help_text="Upload your personal portrait")
    years_old = models.CharField(max_length=20, default="21+", blank=True)
    featured_projects_count = models.CharField(max_length=20, default="3", blank=True)

    # Hero Section Customization
    hero_watermark = models.CharField(max_length=50, default="PORTFOLIO", help_text="Large background watermark in Hero section")
    availability_status = models.CharField(max_length=100, default="AVAILABLE FOR HIRING", help_text="Pulsing status badge in Hero section")
    greeting_text = models.CharField(max_length=50, default="Hi, I’m", help_text="Script greeting text above name in Hero")
    hero_lead_text = models.CharField(max_length=255, default="Turning ideas into functional web experiences.", help_text="Right lead text in Hero")
    hero_highlights = models.TextField(
        default="Responsive Development\nClean Code\nUser-Centered Design",
        help_text="Newline-separated bullet items on the right side of Hero"
    )

    # About Section Customization
    about_headline = models.CharField(
        max_length=255,
        default="FROM WORDS TO CODE — CRAFTING REAL-WORLD WEB EXPERIENCES.",
        help_text="Editorial headline in About Me section"
    )
    about_highlights = models.TextField(
        default="Full Stack Focus: Python, Django & React Integration\nDatabase Engineering: MySQL Schema Design & CRUD Logic\nLinguistic Precision: Analytical Thinking & Clear Documentation\nProfessional Mindset: Responsive UI & Maintainable Code",
        help_text="Newline-separated 'Title: Description' items for highlight cards in About section"
    )
    side_card_badge = models.CharField(max_length=100, default="✦ AVAILABLE FOR HIRE", help_text="Badge tag on the side card in About section")
    side_card_title = models.CharField(max_length=150, default="Ready to build something?", help_text="Title on the side card in About section")
    side_card_subtext = models.TextField(
        default="\"I'm open to new opportunities, freelance projects and collaborations.\"",
        help_text="Subtext on the side card in About section"
    )

    # Contact & Footer Customization
    contact_heading = models.CharField(max_length=150, default="LET'S WORK TOGETHER", help_text="Main heading in Contact section")
    contact_subtext = models.TextField(
        default="I'm actively seeking full-time Full Stack Developer roles, collaborations, and project opportunities. Let's create something reliable, performant, and elegant.",
        help_text="Subtext description in Contact section"
    )
    device_mockup = models.ImageField(upload_to='devices/', blank=True, null=True, help_text="Custom device mockup image in Contact section (optional)")
    footer_copyright_text = models.CharField(
        max_length=255,
        default="All rights reserved. • Built with React & Django REST Framework.",
        help_text="Copyright line in Footer"
    )

    # Section Headers Customization (matching exact portfolio headings)
    about_section_title = models.CharField(
        max_length=150,
        default="THE DEVELOPER BEHIND THE CODE",
        help_text="Section title for 01 / ABOUT ME"
    )
    about_section_subtitle = models.TextField(
        default="A fresher Full Stack Developer driven by curiosity, analytical precision, and practical problem-solving.",
        help_text="Section subtitle for 01 / ABOUT ME"
    )
    services_section_title = models.CharField(
        max_length=150,
        default="TECHNICAL CAPABILITIES & SERVICES",
        help_text="Section title for 02 / WHAT I DO"
    )
    services_section_subtitle = models.TextField(
        default="Practical, end-to-end full stack development capabilities honed through structured projects and dedicated problem-solving.",
        help_text="Section subtitle for 02 / WHAT I DO"
    )
    skills_section_title = models.CharField(
        max_length=150,
        default="SKILLS & PROFICIENCY",
        help_text="Section title for 03 / TECHNICAL PROFICIENCY"
    )
    skills_section_subtitle = models.TextField(
        default="Core technologies, database engineering, and practical development proficiencies.",
        help_text="Section subtitle for 03 / TECHNICAL PROFICIENCY"
    )
    journey_section_title = models.CharField(
        max_length=150,
        default="EDUCATION & PROCESS",
        help_text="Section title for 04 / EXPERIENCE & EDUCATION"
    )
    journey_section_subtitle = models.TextField(
        default="A structured timeline of my learning milestones, methodology, and core technical competencies.",
        help_text="Section subtitle for 04 / EXPERIENCE & EDUCATION"
    )
    projects_section_title = models.CharField(
        max_length=150,
        default="SELECTED PROJECTS",
        help_text="Section title for 05 / SELECTED PROJECTS"
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Section 01: Hero & About Me'
        verbose_name_plural = 'Section 01: Hero & About Me'

    def __str__(self):
        return f"{self.name} - {self.professional_title}"

    def get_hero_highlights(self):
        return [h.strip() for h in self.hero_highlights.split('\n') if h.strip()]

    def get_about_highlights(self):
        items = []
        for line in self.about_highlights.split('\n'):
            line = line.strip()
            if not line:
                continue
            if ':' in line:
                title, val = line.split(':', 1)
                items.append({'title': title.strip(), 'val': val.strip()})
            else:
                items.append({'title': line, 'val': ''})
        return items


class Hero(About):
    class Meta:
        proxy = True
        verbose_name = 'Hero'
        verbose_name_plural = 'Hero'

    def __str__(self):
        return f"Hero: {self.name} - {self.professional_title}"


class AboutMe(About):
    class Meta:
        proxy = True
        verbose_name = 'About Me'
        verbose_name_plural = 'About Me'

    def __str__(self):
        return f"About Me: {self.name}"


class Resume(models.Model):
    title = models.CharField(max_length=150, default="Jeseena - Full Stack Developer CV")
    file = models.FileField(upload_to='resumes/', help_text="Upload or replace your CV PDF here")
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True, help_text="If checked, this CV will be provided to all Download CV buttons")

    class Meta:
        ordering = ['-updated_at']
        verbose_name = 'RESUME / CV'
        verbose_name_plural = 'RESUME / CV'

    def __str__(self):
        return f"{self.title} ({self.updated_at.strftime('%Y-%m-%d') if self.updated_at else 'New'})"


class Project(models.Model):
    project_number = models.CharField(max_length=10, default="01", help_text="e.g. 01, 02")
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    subtitle = models.CharField(max_length=255, blank=True, help_text="Short subtitle or category")
    description = models.TextField(help_text="Detailed project summary (also used as default overview)")
    overview = models.TextField(blank=True, default="", help_text="Case Study: Project Overview")
    problem = models.TextField(blank=True, default="", help_text="Case Study: Problem / Goal statement")
    solution = models.TextField(blank=True, default="", help_text="Case Study: Solution description")
    my_role = models.TextField(blank=True, default="", help_text="Case Study: My Role")
    technologies = models.CharField(max_length=500, help_text="Comma-separated or newline-separated technologies")
    features = models.TextField(blank=True, help_text="Newline-separated list of key project features")
    image = models.ImageField(upload_to='projects/', blank=True, null=True, help_text="Uploaded screenshot")
    image_url = models.CharField(max_length=500, blank=True, default="/images/carenova.png", help_text="Fallback static image path")
    github_url = models.URLField(max_length=500, blank=True)
    live_url = models.URLField(max_length=500, blank=True)
    featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Section 05: Selected Project'
        verbose_name_plural = 'Section 05: Selected Projects'

    def __str__(self):
        return f"[{self.project_number}] {self.title}"

    def get_overview(self):
        return self.overview.strip() if self.overview else self.description.strip()

    def get_tech_list(self):
        raw = self.technologies or ''
        if '\n' in raw:
            return [t.strip().lstrip('-•* ').strip() for t in raw.split('\n') if t.strip()]
        if ',' in raw:
            return [t.strip().lstrip('-•* ').strip() for t in raw.split(',') if t.strip()]
        if '|' in raw:
            return [t.strip().lstrip('-•* ').strip() for t in raw.split('|') if t.strip()]
        return [raw.strip()] if raw.strip() else []

    def get_feature_list(self):
        return [f.strip().lstrip('-•* ').strip() for f in (self.features or '').split('\n') if f.strip()]


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('FRONTEND', 'Frontend Development'),
        ('BACKEND', 'Backend Development'),
        ('DATABASE', 'Database Systems'),
        ('TOOLS', 'Tools & Platforms'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='BACKEND')
    description = models.CharField(max_length=255, blank=True, default="", help_text="Short skill summary from CV")
    proficiency = models.PositiveIntegerField(default=0, help_text="Proficiency percentage (0-100)")
    icon = models.CharField(max_length=100, blank=True, default="", help_text="Boxicons class (e.g. 'bx bxl-python', 'bx bxl-react')")
    icon_color = models.CharField(max_length=50, blank=True, default="#D32F2F", help_text="Icon color (e.g. '#3776ab', '#e34f26')")
    is_learning = models.BooleanField(default=False, help_text="Check if currently learning this technology")
    learning_progress = models.PositiveIntegerField(default=0, help_text="Learning progress percentage (e.g. 35 for React)")
    learning_note = models.CharField(max_length=255, blank=True, help_text="e.g. Currently learning React or Currently learning Node.js")
    show_in_marquee = models.BooleanField(default=True, help_text="Display in skill badges")
    order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'category', 'name']
        verbose_name = 'Section 03: Skill & Technical Proficiency'
        verbose_name_plural = 'Section 03: Skills & Technical Proficiency'

    def __str__(self):
        if self.is_learning:
            return f"[Learning] {self.name} - {self.learning_note or 'In progress'}"
        return f"{self.name} - {self.get_category_display()}"


class Service(models.Model):
    service_number = models.CharField(max_length=10, default="01", help_text="e.g. 01, 02")
    title = models.CharField(max_length=150)
    description = models.TextField()
    skills_list = models.CharField(max_length=300, blank=True, help_text="Technologies e.g. HTML, CSS, JavaScript, React")
    order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Section 02: What I Do (Capability)'
        verbose_name_plural = 'Section 02: What I Do (Capabilities & Services)'

    def __str__(self):
        return f"{self.service_number} - {self.title}"

    def get_skills(self):
        return [s.strip() for s in self.skills_list.split(',') if s.strip()]


class Journey(models.Model):
    year = models.CharField(max_length=50, help_text="e.g. 2022, 2025, 2025 – 2026, 2026")
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Section 04: Education Milestone'
        verbose_name_plural = 'Section 04: Education Milestones'

    def __str__(self):
        return f"{self.year} - {self.title}"


class WorkProcess(models.Model):
    step_number = models.CharField(max_length=10, default="01", help_text="e.g. 01, 02")
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=100, default="bx bx-check", help_text="Boxicons class (e.g. 'bx bx-search-alt')")
    order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Section 04: Work Process Step'
        verbose_name_plural = 'Section 04: Work Process Steps'

    def __str__(self):
        return f"Step {self.step_number}: {self.title}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=254)
    subject = models.CharField(max_length=255, blank=True, default="Portfolio Contact Message")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Form Message'
        verbose_name_plural = 'Contact Form Messages (Inbox)'

    def __str__(self):
        return f"From {self.name} <{self.email}> - {self.subject[:30]}"

class CVSummary(models.Model):
    summary = models.TextField()

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'CV Summary'
        verbose_name_plural = 'CV Summary'

    def __str__(self):
        return "CV Summary"


class CVCourse(models.Model):
    course_name = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    start_date = models.CharField(max_length=50, blank=True)
    end_date = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'CV Course & Learning'
        verbose_name_plural = 'CV Courses & Learning'

    def __str__(self):
        return self.course_name


class CVEducation(models.Model):
    qualification = models.CharField(max_length=250)
    institution = models.CharField(max_length=250)
    location = models.CharField(max_length=150, blank=True)
    start_year = models.CharField(max_length=20, blank=True)
    end_year = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'CV Education'
        verbose_name_plural = 'CV Education'

    def __str__(self):
        return self.qualification


class CVCertification(models.Model):
    name = models.CharField(max_length=250)
    organization = models.CharField(max_length=250)
    date_or_duration = models.CharField(max_length=100, blank=True)
    certificate_number = models.CharField(max_length=100, blank=True)
    certificate_url = models.URLField(max_length=500, blank=True)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'CV Certification'
        verbose_name_plural = 'CV Certifications'

    def __str__(self):
        return self.name


class CVLanguage(models.Model):
    language = models.CharField(max_length=100)
    proficiency = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'CV Language'
        verbose_name_plural = 'CV Languages'

    def __str__(self):
        return f"{self.language} - {self.proficiency}"


class SocialLink(models.Model):
    platform_name = models.CharField(
        max_length=50,
        default='WhatsApp',
        help_text="Name of the social platform (e.g. WhatsApp, GitHub, LinkedIn, Twitter, Instagram, YouTube, Telegram)"
    )
    url = models.CharField(
        max_length=500,
        help_text="Full URL or contact link (e.g. https://wa.me/917736998984 or https://github.com/username or mailto:...)"
    )
    icon = models.CharField(
        max_length=100,
        blank=True,
        help_text="Boxicons CSS class (e.g. 'bx bxl-whatsapp', 'bx bxl-github'). Leave empty to auto-detect."
    )
    order = models.PositiveIntegerField(
        default=1,
        help_text="Display order (1 = first, 2 = second, etc.)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Display this link on your portfolio"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Social Link (Connect Channel)'
        verbose_name_plural = 'Social Links (Connect Channels)'

    def __str__(self):
        return f"{self.platform_name} ({self.url})"

    def save(self, *args, **kwargs):
        if not self.icon or not self.icon.strip():
            name_lower = self.platform_name.strip().lower()
            if 'whatsapp' in name_lower:
                self.icon = 'bx bxl-whatsapp'
            elif 'github' in name_lower:
                self.icon = 'bx bxl-github'
            elif 'linkedin' in name_lower:
                self.icon = 'bx bxl-linkedin'
            elif 'email' in name_lower or 'mail' in name_lower:
                self.icon = 'bx bx-envelope'
            elif 'twitter' in name_lower or name_lower == 'x':
                self.icon = 'bx bxl-twitter'
            elif 'instagram' in name_lower or 'insta' in name_lower:
                self.icon = 'bx bxl-instagram'
            elif 'youtube' in name_lower:
                self.icon = 'bx bxl-youtube'
            elif 'telegram' in name_lower:
                self.icon = 'bx bxl-telegram'
            elif 'facebook' in name_lower:
                self.icon = 'bx bxl-facebook'
            elif 'discord' in name_lower:
                self.icon = 'bx bxl-discord'
            elif 'phone' in name_lower or 'call' in name_lower:
                self.icon = 'bx bx-phone'
            else:
                self.icon = 'bx bx-link'
        super().save(*args, **kwargs)