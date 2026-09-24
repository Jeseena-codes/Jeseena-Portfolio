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
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'About Me Profile'
        verbose_name_plural = 'About Me Profile'

    def __str__(self):
        return f"{self.name} - {self.professional_title}"


class Resume(models.Model):
    title = models.CharField(max_length=150, default="Jeseena - Full Stack Developer CV")
    file = models.FileField(upload_to='resumes/', help_text="Upload or replace your CV PDF here")
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True, help_text="If checked, this CV will be provided to all Download CV buttons")

    class Meta:
        ordering = ['-updated_at']
        verbose_name = 'Resume / CV'
        verbose_name_plural = 'Resume / CV'

    def __str__(self):
        return f"{self.title} ({self.updated_at.strftime('%Y-%m-%d') if self.updated_at else 'New'})"


class Project(models.Model):
    project_number = models.CharField(max_length=10, default="01", help_text="e.g. 01, 02")
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    subtitle = models.CharField(max_length=255, blank=True, help_text="Short subtitle or category")
    description = models.TextField(help_text="Detailed project summary")
    technologies = models.CharField(max_length=300, help_text="Comma-separated: Python, Django, MySQL, etc.")
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
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

    def __str__(self):
        return f"[{self.project_number}] {self.title}"

    def get_tech_list(self):
        return [t.strip() for t in self.technologies.split(',') if t.strip()]

    def get_feature_list(self):
        return [f.strip() for f in self.features.split('\n') if f.strip()]


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
    proficiency = models.PositiveIntegerField(default=0, help_text="Optional proficiency percentage")
    is_learning = models.BooleanField(default=False, help_text="Check if currently learning this technology")
    learning_progress = models.PositiveIntegerField(default=0, help_text="Learning progress percentage (e.g. 35 for React)")
    learning_note = models.CharField(max_length=255, blank=True, help_text="e.g. Currently learning React or Currently learning Node.js")
    order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'category', 'name']
        verbose_name = 'Skill'
        verbose_name_plural = 'Skills'

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
        verbose_name = 'What I Do (Capability)'
        verbose_name_plural = 'What I Do (Capabilities)'

    def __str__(self):
        return f"{self.service_number} - {self.title}"

    def get_skills(self):
        return [s.strip() for s in self.skills_list.split(',') if s.strip()]


class Journey(models.Model):
    year = models.CharField(max_length=50, help_text="e.g. 2022, 2025, 2025 – 2026, 2026")
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Journey Milestone'
        verbose_name_plural = 'Journey Milestones'

    def __str__(self):
        return f"{self.year} - {self.title}"


class WorkProcess(models.Model):
    step_number = models.CharField(max_length=10, default="01", help_text="e.g. 01, 02")
    title = models.CharField(max_length=100)
    description = models.TextField()
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Work Process Step'
        verbose_name_plural = 'Work Process Steps'

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
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        return f"From {self.name} <{self.email}> - {self.subject[:30]}"
