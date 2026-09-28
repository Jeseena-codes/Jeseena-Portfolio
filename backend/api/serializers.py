from rest_framework import serializers
from .models import About, Project, Skill, Service, Journey, WorkProcess, ContactMessage, Resume, SocialLink

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['id', 'platform_name', 'url', 'icon', 'order', 'is_active']


class ResumeSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = Resume
        fields = ['id', 'title', 'file', 'download_url', 'updated_at', 'is_active']

    def get_download_url(self, obj):
        request = self.context.get('request')
        if obj.file:
            if request:
                return request.build_absolute_uri(obj.file.url)
            return obj.file.url
        return '/media/resumes/Jeseena_CV.pdf'


class SkillSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Skill
        fields = [
            'id',
            'name',
            'category',
            'category_display',
            'description',
            'proficiency',
            'icon',
            'icon_color',
            'is_learning',
            'learning_progress',
            'learning_note',
            'show_in_marquee',
            'order',
            'is_active'
        ]

class AboutSerializer(serializers.ModelSerializer):
    display_photo = serializers.SerializerMethodField()
    display_device_mockup = serializers.SerializerMethodField()
    hero_highlights_list = serializers.SerializerMethodField()
    about_highlights_list = serializers.SerializerMethodField()
    social_links = serializers.SerializerMethodField()

    class Meta:
        model = About
        fields = [
            'id',
            'name',
            'professional_title',
            'short_introduction',
            'about_text',
            'quote',
            'location',
            'email',
            'phone',
            'github_url',
            'linkedin_url',
            'profile_photo',
            'display_photo',
            'years_old',
            'featured_projects_count',
            # Hero custom fields
            'hero_watermark',
            'availability_status',
            'greeting_text',
            'hero_lead_text',
            'hero_highlights',
            'hero_highlights_list',
            # About custom fields
            'about_headline',
            'about_highlights',
            'about_highlights_list',
            'side_card_badge',
            'side_card_title',
            'side_card_subtext',
            # Section Titles & Subtitles
            'about_section_title',
            'about_section_subtitle',
            'services_section_title',
            'services_section_subtitle',
            'skills_section_title',
            'skills_section_subtitle',
            'journey_section_title',
            'journey_section_subtitle',
            'projects_section_title',
            # Contact & Footer custom fields
            'contact_heading',
            'contact_subtext',
            'device_mockup',
            'display_device_mockup',
            'footer_copyright_text',
            'social_links',
            'updated_at',
        ]

    def get_display_photo(self, obj):
        request = self.context.get('request')
        if obj.profile_photo:
            if request:
                return request.build_absolute_uri(obj.profile_photo.url)
            return obj.profile_photo.url
        return '/images/profile.jpg'

    def get_display_device_mockup(self, obj):
        request = self.context.get('request')
        if obj.device_mockup:
            if request:
                return request.build_absolute_uri(obj.device_mockup.url)
            return obj.device_mockup.url
        return '/images/laptop_mockup.png'

    def get_hero_highlights_list(self, obj):
        return obj.get_hero_highlights()

    def get_about_highlights_list(self, obj):
        return obj.get_about_highlights()

    def get_social_links(self, obj):
        links = SocialLink.objects.filter(is_active=True).order_by('order', 'id')
        return SocialLinkSerializer(links, many=True).data


class ProjectSerializer(serializers.ModelSerializer):
    overview = serializers.SerializerMethodField()
    tech_list = serializers.SerializerMethodField()
    feature_list = serializers.SerializerMethodField()
    display_image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id',
            'project_number',
            'title',
            'slug',
            'subtitle',
            'description',
            'overview',
            'problem',
            'solution',
            'my_role',
            'technologies',
            'tech_list',
            'features',
            'feature_list',
            'image',
            'image_url',
            'display_image',
            'github_url',
            'live_url',
            'featured',
            'order',
            'created_at',
            'updated_at',
        ]

    def get_overview(self, obj):
        return obj.get_overview()

    def get_tech_list(self, obj):
        return obj.get_tech_list()

    def get_feature_list(self, obj):
        return obj.get_feature_list()

    def get_display_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or '/images/carenova.png'


class ServiceSerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ['id', 'service_number', 'title', 'description', 'skills_list', 'skills', 'order', 'is_active']

    def get_skills(self, obj):
        return obj.get_skills()


class JourneySerializer(serializers.ModelSerializer):
    class Meta:
        model = Journey
        fields = ['id', 'year', 'title', 'description', 'order', 'is_active']


class WorkProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkProcess
        fields = ['id', 'step_number', 'title', 'description', 'icon', 'order', 'is_active']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at', 'is_read']
        read_only_fields = ['id', 'created_at', 'is_read']

    def validate_name(self, value):
        if not value or len(value.strip()) < 2:
            raise serializers.ValidationError("Please provide a valid name.")
        return value.strip()

    def validate_email(self, value):
        if not value or '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        return value.strip().lower()

    def validate_message(self, value):
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError("Message must be at least 5 characters long.")
        return value.strip()
