from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.shortcuts import redirect
from .models import About, Project, Skill, Service, Journey, WorkProcess, ContactMessage, Resume, SocialLink
from .serializers import (
    AboutSerializer,
    ProjectSerializer,
    SkillSerializer,
    ServiceSerializer,
    JourneySerializer,
    WorkProcessSerializer,
    ContactMessageSerializer,
    ResumeSerializer,
    SocialLinkSerializer,
)

class AboutView(APIView):
    """
    Returns the primary About & Profile information.
    Ensures a default profile exists so React always receives valid data.
    """
    def get(self, request):
        about_profile = About.objects.first()
        if not about_profile:
            about_profile = About.objects.create()
        serializer = AboutSerializer(about_profile, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ResumeView(APIView):
    """
    Returns the active CV/Resume metadata and absolute download URL.
    Used dynamically by all Download CV buttons across the React frontend.
    """
    def get(self, request):
        resume = Resume.objects.filter(is_active=True).first()
        if resume:
            serializer = ResumeSerializer(resume, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Fallback default CV URL
        fallback_url = request.build_absolute_uri('/media/resumes/Jeseena_CV.pdf')
        return Response({
            'title': 'Jeseena - Full Stack Developer CV',
            'download_url': fallback_url,
            'updated_at': None,
            'is_active': True
        }, status=status.HTTP_200_OK)


class ResumeDownloadView(APIView):
    """
    Direct download redirect endpoint for the latest active CV.
    Allows opening /api/resume/download/ directly in browser to fetch the newest PDF.
    """
    def get(self, request):
        resume = Resume.objects.filter(is_active=True).first()
        if resume and resume.file:
            return redirect(resume.file.url)
        return redirect('/media/resumes/Jeseena_CV.pdf')


class SocialLinksView(APIView):
    """
    Returns official social links for Jeseena.
    """
    def get(self, request):
        links = SocialLink.objects.filter(is_active=True).order_by('order', 'id')
        if not links.exists():
            about = About.objects.first()
            defaults = [
                {'id': 1, 'platform_name': 'GitHub', 'url': about.github_url if about else 'https://github.com/Jeseena-codes', 'icon': 'bx bxl-github', 'order': 1},
                {'id': 2, 'platform_name': 'LinkedIn', 'url': about.linkedin_url if about else 'https://linkedin.com/in/jeseena-j-48a126336', 'icon': 'bx bxl-linkedin', 'order': 2},
                {'id': 3, 'platform_name': 'Email', 'url': f"mailto:{about.email}" if about else 'mailto:jeseena2005@gmail.com', 'icon': 'bx bx-envelope', 'order': 3},
            ]
            return Response(defaults, status=status.HTTP_200_OK)
        serializer = SocialLinkSerializer(links, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProjectListView(APIView):
    """
    Returns list of portfolio projects.
    Supports ?featured=true query parameter.
    """
    def get(self, request):
        queryset = Project.objects.all().order_by('order', '-created_at')
        featured_only = request.query_params.get('featured')
        if featured_only and featured_only.lower() in ['true', '1']:
            queryset = queryset.filter(featured=True)
            
        serializer = ProjectSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class SkillListView(APIView):
    """
    Returns main skills (cards/icons with NO fake percentages)
    and currently learning skills (React with progress bar, Node.js, APIs).
    """
    def get(self, request):
        skills = Skill.objects.filter(is_active=True).order_by('order')
        serializer = SkillSerializer(skills, many=True)
        
        main_skills = [s for s in serializer.data if not s.get('is_learning')]
        currently_learning = [s for s in serializer.data if s.get('is_learning')]

        # Group skills by category
        grouped = {
            'FRONTEND': [],
            'BACKEND': [],
            'DATABASE': [],
            'TOOLS': [],
        }
        for item in serializer.data:
            cat = item['category']
            if cat in grouped:
                grouped[cat].append(item)
            else:
                grouped[cat] = [item]

        return Response({
            'raw': serializer.data,
            'main_skills': main_skills,
            'currently_learning': currently_learning,
            'grouped': grouped
        }, status=status.HTTP_200_OK)


class ServiceListView(APIView):
    """
    Returns list of active services / capabilities (What I Do section).
    """
    def get(self, request):
        services = Service.objects.filter(is_active=True).order_by('order', 'id')
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class JourneyListView(APIView):
    """
    Returns education and learning milestones in display order.
    """
    def get(self, request):
        milestones = Journey.objects.filter(is_active=True).order_by('order', 'id')
        serializer = JourneySerializer(milestones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WorkProcessListView(APIView):
    """
    Returns work process methodology steps in sequential order.
    """
    def get(self, request):
        steps = WorkProcess.objects.filter(is_active=True).order_by('order', 'id')
        serializer = WorkProcessSerializer(steps, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ContactMessageCreateView(APIView):
    """
    Receives contact form submissions from the React frontend
    and saves them into the MySQL database.
    """
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            message = serializer.save()
            return Response({
                'success': True,
                'message': f"Thank you {message.name}! Your message has been saved to the MySQL database. Jeseena will get back to you soon.",
                'data': {
                    'id': message.id,
                    'name': message.name,
                    'created_at': message.created_at
                }
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class HealthCheckView(APIView):
    """
    Verifies backend status and active MySQL connection.
    Used by the 'Why This Portfolio Is Full Stack' live badge.
    """
    def get(self, request):
        db_vendor = connection.vendor
        db_status = "Connected"
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
        except Exception as e:
            db_status = f"Disconnected: {str(e)}"

        return Response({
            'status': 'Online',
            'developer': 'Jeseena J',
            'title': 'Full Stack Developer',
            'framework': 'Django REST Framework 3.16',
            'database_engine': db_vendor,
            'database_status': db_status,
            'stats': {
                'projects': Project.objects.count(),
                'skills': Skill.objects.count(),
                'journey_items': Journey.objects.count(),
                'process_steps': WorkProcess.objects.count(),
                'messages': ContactMessage.objects.count()
            }
        }, status=status.HTTP_200_OK)
