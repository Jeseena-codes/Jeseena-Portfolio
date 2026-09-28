from django.contrib import admin, messages
from django.http import HttpResponseRedirect
from django.shortcuts import redirect
from django.urls import reverse
from django.utils.html import format_html
from django.utils.text import slugify

from .models import (
    About,
    Hero,
    AboutMe,
    Project,
    Skill,
    Service,
    Journey,
    WorkProcess,
    ContactMessage,
    Resume,
    CVSummary,
    CVCourse,
    CVEducation,
    CVCertification,
    CVLanguage,
    SocialLink,
)


class VisibleEditActionMixin:
    """
    Standardizes a prominent, clearly visible '✏ Edit' action button column
    in list_display across all Portfolio CMS sections.
    """
    def edit_action(self, obj):
        url = reverse(f'admin:{obj._meta.app_label}_{obj._meta.model_name}_change', args=[obj.pk])
        return format_html(
            '<a href="{}" class="btn-visible-edit" title="Edit this record">✏ Edit</a>',
            url
        )
    edit_action.short_description = "Action"


class NextRedirectAdminMixin:
    """
    Ensures that when an Add, Edit, or Delete action is completed,
    the admin redirects back to the originating page if 'next' is specified,
    preventing 'Page not found' (404) errors.
    """
    def response_change(self, request, obj):
        if '_continue' not in request.POST and '_addanother' not in request.POST:
            next_url = request.GET.get('next') or request.POST.get('next')
            if next_url and next_url.startswith('/admin/'):
                return HttpResponseRedirect(next_url)
        return super().response_change(request, obj)

    def response_add(self, request, obj, post_url_continue=None):
        if '_continue' not in request.POST and '_addanother' not in request.POST:
            next_url = request.GET.get('next') or request.POST.get('next')
            if next_url and next_url.startswith('/admin/'):
                return HttpResponseRedirect(next_url)
        return super().response_add(request, obj, post_url_continue)

    def response_delete(self, request, obj_display, obj_id):
        next_url = request.GET.get('next') or request.POST.get('next')
        if next_url and next_url.startswith('/admin/'):
            return HttpResponseRedirect(next_url)
        return super().response_delete(request, obj_display, obj_id)


def reorder_model_item(model_cls, item_id, direction):
    """
    Swaps or shifts display order for ordered models.
    """
    try:
        item = model_cls.objects.get(id=item_id)
        if direction == 'up':
            prev_item = model_cls.objects.filter(order__lt=item.order).order_by('-order').first()
            if prev_item:
                item.order, prev_item.order = prev_item.order, item.order
                prev_item.save(update_fields=['order'])
                item.save(update_fields=['order'])
            elif item.order > 1:
                item.order -= 1
                item.save(update_fields=['order'])
        elif direction == 'down':
            next_item = model_cls.objects.filter(order__gt=item.order).order_by('order').first()
            if next_item:
                item.order, next_item.order = next_item.order, item.order
                next_item.save(update_fields=['order'])
                item.save(update_fields=['order'])
            else:
                item.order += 1
                item.save(update_fields=['order'])
    except Exception:
        pass


# ==============================================================================
# 1. RESUME / CV (One Main Complete Management Page)
# ==============================================================================
@admin.register(Resume)
class ResumeAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    change_list_template = 'admin/resume_cv_management.html'
    list_display = ('title', 'file', 'is_active', 'updated_at', 'edit_action')
    list_display_links = ('title',)
    list_editable = ('is_active',)
    search_fields = ('title',)
    fieldsets = (
        ('CV / Resume Document Details', {
            'description': 'Manage your official CV PDF document and active status.',
            'fields': ('title', 'file', 'is_active')
        }),
    )

    def changelist_view(self, request, extra_context=None):
        if request.method == 'POST':
            action = request.POST.get('action')

            # 1. Personal Information
            if action == 'save_personal_info':
                about = About.objects.first()
                if not about:
                    about = About.objects.create()
                about.name = request.POST.get('name', about.name)
                about.professional_title = request.POST.get('professional_title', about.professional_title)
                about.email = request.POST.get('email', about.email)
                about.phone = request.POST.get('phone', about.phone)
                about.location = request.POST.get('location', about.location)
                about.linkedin_url = request.POST.get('linkedin_url', about.linkedin_url)
                about.github_url = request.POST.get('github_url', about.github_url)
                about.save()
                messages.success(request, "Personal Information updated successfully.")
                return redirect('/admin/api/resume/#personal-info')

            # 2. Professional Summary
            elif action == 'save_summary':
                summary_text = request.POST.get('summary', '').strip()
                summary_obj = CVSummary.objects.first()
                if not summary_obj:
                    summary_obj = CVSummary.objects.create(summary=summary_text)
                else:
                    summary_obj.summary = summary_text
                    summary_obj.save()
                messages.success(request, "Professional Summary updated successfully.")
                return redirect('/admin/api/resume/#professional-summary')

            # 3. Skills: Add, Edit, Delete
            elif action == 'add_skill':
                name = request.POST.get('name', '').strip()
                category = request.POST.get('category', 'BACKEND')
                proficiency = int(request.POST.get('proficiency') or 75)
                desc = request.POST.get('description', '').strip()
                is_learning = request.POST.get('is_learning') == 'on'
                order = int(request.POST.get('order') or (Skill.objects.count() + 1))
                if name:
                    Skill.objects.create(
                        name=name,
                        category=category,
                        proficiency=proficiency,
                        description=desc,
                        is_learning=is_learning,
                        order=order,
                        is_active=True
                    )
                    messages.success(request, f"Skill '{name}' added successfully.")
                return redirect('/admin/api/resume/#skills')

            elif action == 'edit_skill':
                skill_id = request.POST.get('skill_id')
                skill = Skill.objects.filter(id=skill_id).first()
                if skill:
                    skill.name = request.POST.get('name', skill.name).strip()
                    skill.category = request.POST.get('category', skill.category)
                    skill.proficiency = int(request.POST.get('proficiency') or skill.proficiency)
                    skill.description = request.POST.get('description', skill.description).strip()
                    skill.is_learning = request.POST.get('is_learning') == 'on'
                    skill.order = int(request.POST.get('order') or skill.order)
                    skill.save()
                    messages.success(request, f"Skill '{skill.name}' updated successfully.")
                return redirect('/admin/api/resume/#skills')

            elif action == 'delete_skill':
                skill_id = request.POST.get('skill_id')
                Skill.objects.filter(id=skill_id).delete()
                messages.success(request, "Skill deleted successfully.")
                return redirect('/admin/api/resume/#skills')

            # 4. Projects: Add, Edit, Delete
            elif action == 'add_project':
                title = request.POST.get('title', '').strip()
                project_number = request.POST.get('project_number', '01').strip()
                subtitle = request.POST.get('subtitle', '').strip()
                technologies = request.POST.get('technologies', '').strip()
                description = request.POST.get('description', '').strip()
                features = request.POST.get('features', '').strip()
                github_url = request.POST.get('github_url', '').strip()
                live_url = request.POST.get('live_url', '').strip()
                order = int(request.POST.get('order') or (Project.objects.count() + 1))
                if title:
                    slug = slugify(title)
                    orig_slug = slug
                    idx = 1
                    while Project.objects.filter(slug=slug).exists():
                        slug = f"{orig_slug}-{idx}"
                        idx += 1
                    Project.objects.create(
                        title=title,
                        slug=slug,
                        project_number=project_number,
                        subtitle=subtitle,
                        technologies=technologies,
                        description=description,
                        features=features,
                        github_url=github_url,
                        live_url=live_url,
                        order=order,
                        featured=True
                    )
                    messages.success(request, f"Project '{title}' added successfully.")
                return redirect('/admin/api/resume/#projects')

            elif action == 'edit_project':
                project_id = request.POST.get('project_id')
                proj = Project.objects.filter(id=project_id).first()
                if proj:
                    proj.project_number = request.POST.get('project_number', proj.project_number).strip()
                    proj.title = request.POST.get('title', proj.title).strip()
                    proj.subtitle = request.POST.get('subtitle', proj.subtitle).strip()
                    proj.technologies = request.POST.get('technologies', proj.technologies).strip()
                    proj.description = request.POST.get('description', proj.description).strip()
                    proj.features = request.POST.get('features', proj.features).strip()
                    proj.github_url = request.POST.get('github_url', proj.github_url).strip()
                    proj.live_url = request.POST.get('live_url', proj.live_url).strip()
                    proj.order = int(request.POST.get('order') or proj.order)
                    proj.save()
                    messages.success(request, f"Project '{proj.title}' updated successfully.")
                return redirect('/admin/api/resume/#projects')

            elif action == 'delete_project':
                project_id = request.POST.get('project_id')
                Project.objects.filter(id=project_id).delete()
                messages.success(request, "Project deleted successfully.")
                return redirect('/admin/api/resume/#projects')

            # 5. Courses & Learning: Add, Edit, Delete
            elif action == 'add_course':
                course_name = request.POST.get('course_name', '').strip()
                organization = request.POST.get('organization', '').strip()
                start_date = request.POST.get('start_date', '').strip()
                end_date = request.POST.get('end_date', '').strip()
                desc = request.POST.get('description', '').strip()
                order = int(request.POST.get('order') or (CVCourse.objects.count() + 1))
                if course_name and organization:
                    CVCourse.objects.create(
                        course_name=course_name,
                        organization=organization,
                        start_date=start_date,
                        end_date=end_date,
                        description=desc,
                        order=order
                    )
                    messages.success(request, f"Course '{course_name}' added successfully.")
                return redirect('/admin/api/resume/#courses')

            elif action == 'edit_course':
                course_id = request.POST.get('course_id')
                course = CVCourse.objects.filter(id=course_id).first()
                if course:
                    course.course_name = request.POST.get('course_name', course.course_name).strip()
                    course.organization = request.POST.get('organization', course.organization).strip()
                    course.start_date = request.POST.get('start_date', course.start_date).strip()
                    course.end_date = request.POST.get('end_date', course.end_date).strip()
                    course.description = request.POST.get('description', course.description).strip()
                    course.order = int(request.POST.get('order') or course.order)
                    course.save()
                    messages.success(request, f"Course '{course.course_name}' updated successfully.")
                return redirect('/admin/api/resume/#courses')

            elif action == 'delete_course':
                course_id = request.POST.get('course_id')
                CVCourse.objects.filter(id=course_id).delete()
                messages.success(request, "Course deleted successfully.")
                return redirect('/admin/api/resume/#courses')

            # 6. Education: Add, Edit, Delete
            elif action == 'add_education':
                qualification = request.POST.get('qualification', '').strip()
                institution = request.POST.get('institution', '').strip()
                location = request.POST.get('location', '').strip()
                start_year = request.POST.get('start_year', '').strip()
                end_year = request.POST.get('end_year', '').strip()
                desc = request.POST.get('description', '').strip()
                order = int(request.POST.get('order') or (CVEducation.objects.count() + 1))
                if qualification and institution:
                    CVEducation.objects.create(
                        qualification=qualification,
                        institution=institution,
                        location=location,
                        start_year=start_year,
                        end_year=end_year,
                        description=desc,
                        order=order
                    )
                    messages.success(request, f"Education '{qualification}' added successfully.")
                return redirect('/admin/api/resume/#education')

            elif action == 'edit_education':
                edu_id = request.POST.get('education_id')
                edu = CVEducation.objects.filter(id=edu_id).first()
                if edu:
                    edu.qualification = request.POST.get('qualification', edu.qualification).strip()
                    edu.institution = request.POST.get('institution', edu.institution).strip()
                    edu.location = request.POST.get('location', edu.location).strip()
                    edu.start_year = request.POST.get('start_year', edu.start_year).strip()
                    edu.end_year = request.POST.get('end_year', edu.end_year).strip()
                    edu.description = request.POST.get('description', edu.description).strip()
                    edu.order = int(request.POST.get('order') or edu.order)
                    edu.save()
                    messages.success(request, f"Education '{edu.qualification}' updated successfully.")
                return redirect('/admin/api/resume/#education')

            elif action == 'delete_education':
                edu_id = request.POST.get('education_id')
                CVEducation.objects.filter(id=edu_id).delete()
                messages.success(request, "Education deleted successfully.")
                return redirect('/admin/api/resume/#education')

            # 7. Certifications: Add, Edit, Delete
            elif action == 'add_certification':
                name = request.POST.get('name', '').strip()
                organization = request.POST.get('organization', '').strip()
                date_or_duration = request.POST.get('date_or_duration', '').strip()
                certificate_number = request.POST.get('certificate_number', '').strip()
                certificate_url = request.POST.get('certificate_url', '').strip()
                order = int(request.POST.get('order') or (CVCertification.objects.count() + 1))
                if name and organization:
                    CVCertification.objects.create(
                        name=name,
                        organization=organization,
                        date_or_duration=date_or_duration,
                        certificate_number=certificate_number,
                        certificate_url=certificate_url,
                        order=order
                    )
                    messages.success(request, f"Certification '{name}' added successfully.")
                return redirect('/admin/api/resume/#certifications')

            elif action == 'edit_certification':
                cert_id = request.POST.get('cert_id')
                cert = CVCertification.objects.filter(id=cert_id).first()
                if cert:
                    cert.name = request.POST.get('name', cert.name).strip()
                    cert.organization = request.POST.get('organization', cert.organization).strip()
                    cert.date_or_duration = request.POST.get('date_or_duration', cert.date_or_duration).strip()
                    cert.certificate_number = request.POST.get('certificate_number', cert.certificate_number).strip()
                    cert.certificate_url = request.POST.get('certificate_url', cert.certificate_url).strip()
                    cert.order = int(request.POST.get('order') or cert.order)
                    cert.save()
                    messages.success(request, f"Certification '{cert.name}' updated successfully.")
                return redirect('/admin/api/resume/#certifications')

            elif action == 'delete_certification':
                cert_id = request.POST.get('cert_id')
                CVCertification.objects.filter(id=cert_id).delete()
                messages.success(request, "Certification deleted successfully.")
                return redirect('/admin/api/resume/#certifications')

            # 8. Languages: Add, Edit, Delete
            elif action == 'add_language':
                language = request.POST.get('language', '').strip()
                proficiency = request.POST.get('proficiency', '').strip()
                order = int(request.POST.get('order') or (CVLanguage.objects.count() + 1))
                if language and proficiency:
                    CVLanguage.objects.create(
                        language=language,
                        proficiency=proficiency,
                        order=order
                    )
                    messages.success(request, f"Language '{language}' added successfully.")
                return redirect('/admin/api/resume/#languages')

            elif action == 'edit_language':
                lang_id = request.POST.get('language_id')
                lang = CVLanguage.objects.filter(id=lang_id).first()
                if lang:
                    lang.language = request.POST.get('language', lang.language).strip()
                    lang.proficiency = request.POST.get('proficiency', lang.proficiency).strip()
                    lang.order = int(request.POST.get('order') or lang.order)
                    lang.save()
                    messages.success(request, f"Language '{lang.language}' updated successfully.")
                return redirect('/admin/api/resume/#languages')

            elif action == 'delete_language':
                lang_id = request.POST.get('language_id')
                CVLanguage.objects.filter(id=lang_id).delete()
                messages.success(request, "Language deleted successfully.")
                return redirect('/admin/api/resume/#languages')

            # 9. Generic Reorder Action for all models
            elif action == 'reorder_item':
                model_name = request.POST.get('model_name')
                item_id = request.POST.get('item_id')
                direction = request.POST.get('direction')
                model_map = {
                    'skill': (Skill, '#skills'),
                    'project': (Project, '#projects'),
                    'course': (CVCourse, '#courses'),
                    'education': (CVEducation, '#education'),
                    'certification': (CVCertification, '#certifications'),
                    'language': (CVLanguage, '#languages'),
                }
                if model_name in model_map:
                    model_cls, anchor = model_map[model_name]
                    reorder_model_item(model_cls, item_id, direction)
                    messages.success(request, "Order updated.")
                    return redirect(f'/admin/api/resume/{anchor}')

            # 10. PDF File Upload
            elif action == 'upload_cv_pdf':
                resume = Resume.objects.first()
                if not resume:
                    resume = Resume.objects.create()
                title = request.POST.get('title', resume.title).strip()
                if title:
                    resume.title = title
                if 'file' in request.FILES:
                    resume.file = request.FILES['file']
                resume.save()
                messages.success(request, "CV Document updated successfully.")
                return redirect('/admin/api/resume/#cv-document')

        # GET request: render the complete unified CV management template
        extra_context = extra_context or {}
        about = About.objects.first()
        if not about:
            about = About.objects.create()

        cv_summary = CVSummary.objects.first()
        resume = Resume.objects.first()
        if not resume:
            resume = Resume.objects.create()

        extra_context.update({
            'about': about,
            'cv_summary': cv_summary,
            'skills': Skill.objects.all().order_by('order', 'category', 'name'),
            'projects': Project.objects.all().order_by('order', '-created_at'),
            'courses': CVCourse.objects.all().order_by('order', 'id'),
            'education': CVEducation.objects.all().order_by('order', 'id'),
            'certifications': CVCertification.objects.all().order_by('order', 'id'),
            'languages': CVLanguage.objects.all().order_by('order', 'id'),
            'resume': resume,
        })
        return super().changelist_view(request, extra_context=extra_context)


# ==============================================================================
# 2. HERO SECTION (Exact Real Website Headings & Content)
# ==============================================================================
@admin.register(Hero)
class HeroAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'professional_title', 'availability_status', 'updated_at', 'edit_action')
    list_display_links = ('name',)
    fieldsets = (
        ('Hero Identity & Portrait', {
            'description': 'Main identification, greeting script, and profile portrait displayed in the center of Hero.',
            'fields': ('greeting_text', 'name', 'professional_title', 'profile_photo', 'location')
        }),
        ('Hero Banner & Status Pill', {
            'description': 'Configure the large background watermark ("PORTFOLIO") and live availability status badge.',
            'fields': ('hero_watermark', 'availability_status')
        }),
        ('Hero Bio & Social Profiles', {
            'description': 'Introduction biography paragraph and direct connect channels on the left side of Hero.',
            'fields': ('short_introduction', 'email', 'phone', 'github_url', 'linkedin_url')
        }),
        ('Hero Right Lead & Highlights', {
            'description': 'Lead sentence and bullet points displayed on the right side of Hero.',
            'fields': ('hero_lead_text', 'hero_highlights')
        }),
    )

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return True

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        if not self.model.objects.exists():
            self.model.objects.create()
        return super().changelist_view(request, extra_context=extra_context)


# ==============================================================================
# SOCIAL LINKS (Connect Channels: WhatsApp, GitHub, LinkedIn, etc.)
# Allows adding, editing, ordering, and deleting custom social links dynamically
# ==============================================================================
@admin.register(SocialLink)
class SocialLinkAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('platform_name', 'url', 'icon', 'order', 'is_active', 'updated_at', 'edit_action')
    list_display_links = ('platform_name',)
    list_editable = ('order', 'is_active')
    search_fields = ('platform_name', 'url')
    ordering = ('order', 'id')
    fieldsets = (
        ('Social Link Details', {
            'description': 'Configure custom social profile or messaging channel (e.g. WhatsApp, GitHub, LinkedIn, Twitter, Instagram). '
                           'Leave Icon blank to automatically detect it based on the platform name.',
            'fields': ('platform_name', 'url', 'icon', 'order', 'is_active')
        }),
    )


# ==============================================================================
# 3. ABOUT ME SECTION (Exact Real Website Headings & Content)
# ==============================================================================
@admin.register(AboutMe)
class AboutMeAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('about_headline_preview', 'about_section_title', 'updated_at', 'edit_action')
    list_display_links = ('about_headline_preview',)
    fieldsets = (
        ('01 / ABOUT ME Section Headings', {
            'description': 'Top section title and subtitle for 01 / ABOUT ME matching the real website.',
            'fields': ('about_section_title', 'about_section_subtitle')
        }),
        ('Editorial Headline & Story Narrative', {
            'description': 'Main editorial headline, full narrative paragraphs, and guiding quote.',
            'fields': ('about_headline', 'about_text', 'quote')
        }),
        ('Key Highlight Cards', {
            'description': "Highlight cards rendered under the narrative (Newline-separated 'Title: Description').",
            'fields': ('about_highlights',)
        }),
        ('About Me Side Profile CTA Card', {
            'description': 'Side card badge, title, and prompt next to the narrative.',
            'fields': ('side_card_badge', 'side_card_title', 'side_card_subtext')
        }),
        ('Website Global Section Headings & Subtitles', {
            'classes': ('collapse',),
            'description': 'Customize the global section headers appearing across the portfolio.',
            'fields': ('services_section_title', 'services_section_subtitle', 'skills_section_title', 'skills_section_subtitle', 'journey_section_title', 'journey_section_subtitle', 'projects_section_title')
        }),
        ('Contact Section & Footer Customization', {
            'classes': ('collapse',),
            'description': 'Customize contact heading, subtext, device mockup, and footer copyright text.',
            'fields': ('contact_heading', 'contact_subtext', 'device_mockup', 'footer_copyright_text', 'years_old', 'featured_projects_count')
        }),
    )

    def about_headline_preview(self, obj):
        return obj.about_headline
    about_headline_preview.short_description = "Editorial Headline"

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return True

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        if not self.model.objects.exists():
            self.model.objects.create()
        return super().changelist_view(request, extra_context=extra_context)


# ==============================================================================
# PRESERVED EXISTING ABOUT (Ensures /admin/api/about/ URLs never 404)
# ==============================================================================
@admin.register(About)
class AboutAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'professional_title', 'location', 'email', 'updated_at', 'edit_action')
    list_display_links = ('name',)
    fieldsets = (
        ('Personal Identity & Portrait', {
            'fields': ('name', 'professional_title', 'location', 'profile_photo')
        }),
        ('Hero Section', {
            'fields': ('hero_watermark', 'availability_status', 'greeting_text', 'short_introduction', 'hero_lead_text', 'hero_highlights')
        }),
        ('About Me Section', {
            'fields': ('about_headline', 'about_text', 'about_highlights', 'quote')
        }),
        ('About Me Side CTA Card', {
            'fields': ('side_card_badge', 'side_card_title', 'side_card_subtext')
        }),
        ('Contact Section & Device Mockup', {
            'fields': ('contact_heading', 'contact_subtext', 'device_mockup', 'email', 'phone', 'github_url', 'linkedin_url')
        }),
        ('Section Headings & Subtitles', {
            'classes': ('collapse',),
            'fields': ('about_section_title', 'about_section_subtitle', 'services_section_title', 'services_section_subtitle', 'skills_section_title', 'skills_section_subtitle', 'journey_section_title', 'journey_section_subtitle', 'projects_section_title')
        }),
        ('Footer & Statistics', {
            'fields': ('footer_copyright_text', 'years_old', 'featured_projects_count')
        }),
    )

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)


# ==============================================================================
# 4. EXISTING SECTIONS 2, 3, 4, 5, 6 (100% PRESERVED & UNCHANGED)
# ==============================================================================
@admin.register(Service)
class ServiceAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('service_number', 'title', 'skills_list', 'order', 'is_active', 'edit_action')
    list_display_links = ('service_number', 'title')
    list_editable = ('order', 'is_active')
    search_fields = ('service_number', 'title', 'description', 'skills_list')
    ordering = ('order', 'id')
    fieldsets = (
        ('Section 02: What I Do (Capability Details)', {
            'description': 'Capability / service number, title, description, technologies list, display order, and active status.',
            'fields': ('service_number', 'title', 'description', 'skills_list', 'order', 'is_active')
        }),
    )


@admin.register(Skill)
class SkillAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'category', 'icon', 'proficiency', 'is_learning', 'learning_progress', 'show_in_marquee', 'order', 'is_active', 'edit_action')
    list_display_links = ('name',)
    list_filter = ('category', 'is_learning', 'show_in_marquee', 'is_active')
    search_fields = ('name', 'learning_note', 'icon')
    list_editable = ('proficiency', 'is_learning', 'learning_progress', 'show_in_marquee', 'order', 'is_active')
    ordering = ('order', 'category', 'name')
    fieldsets = (
        ('Skill Details', {
            'fields': ('name', 'category', 'description', 'order', 'is_active')
        }),
        ('Icon & Badging', {
            'fields': ('icon', 'icon_color', 'show_in_marquee')
        }),
        ('Proficiency & Learning', {
            'fields': ('proficiency', 'is_learning', 'learning_progress', 'learning_note')
        }),
    )


@admin.register(Journey)
class JourneyAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('year', 'title', 'order', 'is_active', 'edit_action')
    list_display_links = ('year', 'title')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('year', 'title', 'description')
    ordering = ('order', 'id')
    fieldsets = (
        ('Section 04: Education Milestone Details', {
            'description': 'Timeline year/period, milestone title/qualification, description, display order, and active status.',
            'fields': ('year', 'title', 'description', 'order', 'is_active')
        }),
    )


@admin.register(WorkProcess)
class WorkProcessAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('step_number', 'title', 'icon', 'order', 'is_active', 'edit_action')
    list_display_links = ('step_number', 'title')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('step_number', 'title', 'description', 'icon')
    ordering = ('order', 'id')
    fieldsets = (
        ('Section 04: Work Process Step Details', {
            'description': 'Process step number, title, description, boxicons class, display order, and active status.',
            'fields': ('step_number', 'title', 'description', 'icon', 'order', 'is_active')
        }),
    )


@admin.register(Project)
class ProjectAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('project_number', 'title', 'subtitle', 'technologies', 'featured', 'order', 'edit_action')
    list_display_links = ('project_number', 'title')
    list_filter = ('featured', 'created_at')
    search_fields = ('title', 'subtitle', 'overview', 'problem', 'solution', 'my_role', 'description', 'technologies', 'features')
    list_editable = ('featured', 'order')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order', '-created_at')
    fieldsets = (
        ('Basic Project Information', {
            'fields': ('project_number', 'title', 'slug', 'subtitle', 'featured', 'order')
        }),
        ('Case Study: Core Story', {
            'fields': ('overview', 'problem', 'solution', 'my_role'),
            'description': 'These fields directly populate the dynamic Case Study content in the Project Modal (Overview, Problem / Goal, Solution, My Role).',
        }),
        ('Case Study: Features & Technologies', {
            'fields': ('features', 'technologies'),
            'description': 'Key Features (newline-separated) and Technologies (comma or newline separated).',
        }),
        ('Media & External Links', {
            'fields': ('image', 'image_url', 'github_url', 'live_url')
        }),
        ('Legacy / Fallback Description', {
            'fields': ('description',),
            'classes': ('collapse',),
            'description': 'Used as default overview if Case Study Overview is not specified.',
        }),
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read', 'edit_action')
    list_display_links = ('name', 'email', 'subject')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')
    list_editable = ('is_read',)
    ordering = ('-created_at',)
    actions = ['mark_as_read', 'mark_as_unread']
    fieldsets = (
        ('Contact Message Information', {
            'fields': ('name', 'email', 'subject', 'message', 'created_at', 'is_read')
        }),
    )

    def mark_as_read(self, request, queryset):
        rows = queryset.update(is_read=True)
        self.message_user(request, f"{rows} message(s) marked as read.")
    mark_as_read.short_description = "Mark selected messages as Read"

    def mark_as_unread(self, request, queryset):
        rows = queryset.update(is_read=False)
        self.message_user(request, f"{rows} message(s) marked as Unread.")
    mark_as_unread.short_description = "Mark selected messages as Unread"


# ==============================================================================
# SUB-MODELS (Registered so direct URLs work with NextRedirectAdminMixin)
# ==============================================================================
@admin.register(CVSummary)
class CVSummaryAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('summary_preview', 'updated_at', 'edit_action')
    list_display_links = ('summary_preview',)
    fieldsets = (('Professional Summary', {'fields': ('summary',)}),)
    def summary_preview(self, obj):
        return obj.summary[:100] + ('...' if len(obj.summary) > 100 else '')
    summary_preview.short_description = 'Summary'


@admin.register(CVCourse)
class CVCourseAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('course_name', 'organization', 'start_date', 'end_date', 'order', 'edit_action')
    list_display_links = ('course_name', 'organization')
    search_fields = ('course_name', 'organization', 'description')
    list_editable = ('order',)
    ordering = ('order', 'id')
    fieldsets = (('Course Information', {'fields': ('course_name', 'organization', 'start_date', 'end_date', 'description', 'order')}),)


@admin.register(CVEducation)
class CVEducationAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('qualification', 'institution', 'location', 'start_year', 'end_year', 'order', 'edit_action')
    list_display_links = ('qualification', 'institution')
    search_fields = ('qualification', 'institution', 'location')
    list_editable = ('order',)
    ordering = ('order', 'id')
    fieldsets = (('Education Details', {'fields': ('qualification', 'institution', 'location', 'start_year', 'end_year', 'description', 'order')}),)


@admin.register(CVCertification)
class CVCertificationAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'organization', 'date_or_duration', 'certificate_number', 'order', 'edit_action')
    list_display_links = ('name', 'organization')
    search_fields = ('name', 'organization', 'certificate_number')
    list_editable = ('order',)
    ordering = ('order', 'id')
    fieldsets = (('Certification Details', {'fields': ('name', 'organization', 'date_or_duration', 'certificate_number', 'certificate_url', 'order')}),)


@admin.register(CVLanguage)
class CVLanguageAdmin(VisibleEditActionMixin, NextRedirectAdminMixin, admin.ModelAdmin):
    list_display = ('language', 'proficiency', 'order', 'edit_action')
    list_display_links = ('language', 'proficiency')
    search_fields = ('language', 'proficiency')
    list_editable = ('order',)
    ordering = ('order', 'id')
    fieldsets = (('Language Details', {'fields': ('language', 'proficiency', 'order')}),)


# ==============================================================================
# SIDEBAR NAVIGATION & ORDERING CUSTOMIZATION
# Ensures:
# 1. Individual CV models DO NOT appear as separate main items
# 2. Only ONE main: RESUME / CV
# 3. HERO is a separate Admin section after RESUME / CV
# 4. ABOUT ME is a separate Admin section after HERO
# 5. Sections 2, 3, 4, 5, 6 remain completely intact
# ==============================================================================
original_get_app_list = admin.site.get_app_list

def custom_get_app_list(request, app_label=None):
    app_list = original_get_app_list(request, app_label=app_label)
    for app in app_list:
        if app['app_label'] == 'api':
            # Hide individual CV models and legacy combined About from sidebar/index
            hidden_models = {'cvsummary', 'cvcourse', 'cveducation', 'cvcertification', 'cvlanguage', 'about'}
            visible_models = [m for m in app['models'] if m['object_name'].lower() not in hidden_models]

            # Priority Order:
            # 1. RESUME / CV
            # 2. Hero
            # 3. About Me
            # 4. Section 02: What I Do (Capabilities & Services)
            # 5. Section 03: Skills & Technical Proficiency
            # 6. Section 04: Education Milestones
            # 7. Section 04: Work Process Steps
            # 8. Section 05: Selected Projects
            # 9. Contact Form Messages (Inbox)
            order_priority = {
                'resume': 1,
                'hero': 2,
                'sociallink': 3,
                'aboutme': 4,
                'service': 5,
                'skill': 6,
                'journey': 7,
                'workprocess': 8,
                'project': 9,
                'contactmessage': 10,
            }
            visible_models.sort(key=lambda m: order_priority.get(m['object_name'].lower(), 99))
            app['models'] = visible_models
    return app_list

admin.site.get_app_list = custom_get_app_list
