from rest_framework import serializers
from .models import About, Project, Skill, Service, Journey, WorkProcess, ContactMessage, Resume

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
            'is_learning',
            'learning_progress',
            'learning_note',
            'order',
            'is_active'
        ]

class AboutSerializer(serializers.ModelSerializer):
    display_photo = serializers.SerializerMethodField()

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
            'updated_at',
        ]

    def get_display_photo(self, obj):
        request = self.context.get('request')
        if obj.profile_photo:
            if request:
                return request.build_absolute_uri(obj.profile_photo.url)
            return obj.profile_photo.url
        return '/images/profile.jpg'


class ProjectSerializer(serializers.ModelSerializer):
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
        ]

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
        fields = ['id', 'year', 'title', 'description', 'order']


class WorkProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkProcess
        fields = ['id', 'step_number', 'title', 'description', 'order']


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
