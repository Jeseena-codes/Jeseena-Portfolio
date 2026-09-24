from django.contrib import admin
from .models import About, Project, Skill, Service, Journey, WorkProcess, ContactMessage, Resume

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('name', 'professional_title', 'location', 'email', 'updated_at')
    fieldsets = (
        ('Personal Identity', {
            'fields': ('name', 'professional_title', 'location')
        }),
        ('Narrative & Story', {
            'fields': ('short_introduction', 'about_text', 'quote')
        }),
        ('Profile Photo Upload', {
            'description': 'Upload your professional photo here. It will automatically replace the website placeholder.',
            'fields': ('profile_photo',)
        }),
        ('Contact & Social Profiles', {
            'fields': ('email', 'github_url', 'linkedin_url')
        }),
        ('Statistics & Badges', {
            'fields': ('years_old', 'featured_projects_count')
        }),
    )

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('project_number', 'title', 'subtitle', 'technologies', 'featured', 'order', 'created_at')
    list_filter = ('featured', 'created_at')
    search_fields = ('title', 'description', 'technologies', 'features')
    list_editable = ('featured', 'order')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order', '-created_at')
    fieldsets = (
        ('Overview', {
            'fields': ('project_number', 'title', 'slug', 'subtitle', 'featured', 'order')
        }),
        ('Content & Technologies', {
            'fields': ('description', 'technologies', 'features')
        }),
        ('Media & External Links', {
            'fields': ('image', 'image_url', 'github_url', 'live_url')
        }),
    )


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('title', 'file', 'is_active', 'updated_at')
    list_editable = ('is_active',)
    list_filter = ('is_active', 'updated_at')
    search_fields = ('title',)
    fieldsets = (
        ('CV / Resume Document', {
            'description': 'Upload your new CV in PDF format. When saved/replaced, all Download CV buttons across the portfolio will dynamically provide this file.',
            'fields': ('title', 'file', 'is_active')
        }),
    )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'is_learning', 'learning_progress', 'order', 'is_active')
    list_filter = ('category', 'is_learning', 'is_active')
    search_fields = ('name', 'learning_note')
    list_editable = ('is_learning', 'learning_progress', 'order', 'is_active')
    ordering = ('order', 'category', 'name')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('service_number', 'title', 'skills_list', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('service_number', 'title', 'description', 'skills_list')
    ordering = ('order', 'id')


@admin.register(Journey)
class JourneyAdmin(admin.ModelAdmin):
    list_display = ('year', 'title', 'order')
    list_editable = ('order',)
    search_fields = ('year', 'title', 'description')
    ordering = ('order', 'id')


@admin.register(WorkProcess)
class WorkProcessAdmin(admin.ModelAdmin):
    list_display = ('step_number', 'title', 'order')
    list_editable = ('order',)
    search_fields = ('step_number', 'title', 'description')
    ordering = ('order', 'id')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')
    list_editable = ('is_read',)
    ordering = ('-created_at',)
    actions = ['mark_as_read', 'mark_as_unread']

    def mark_as_read(self, request, queryset):
        rows = queryset.update(is_read=True)
        self.message_user(request, f"{rows} message(s) marked as read.")
    mark_as_read.short_description = "Mark selected messages as Read"

    def mark_as_unread(self, request, queryset):
        rows = queryset.update(is_read=False)
        self.message_user(request, f"{rows} message(s) marked as Unread.")
    mark_as_unread.short_description = "Mark selected messages as Unread"
