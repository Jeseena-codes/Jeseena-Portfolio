from django.urls import path
from .views import (
    AboutView,
    ProjectListView,
    SkillListView,
    ServiceListView,
    JourneyListView,
    WorkProcessListView,
    ContactMessageCreateView,
    HealthCheckView,
    ResumeView,
    ResumeDownloadView,
    SocialLinksView
)

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('about/', AboutView.as_view(), name='about-view'),
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('skills/', SkillListView.as_view(), name='skill-list'),
    path('journey/', JourneyListView.as_view(), name='journey-list'),
    path('education/', JourneyListView.as_view(), name='education-list'),
    path('work-process/', WorkProcessListView.as_view(), name='workprocess-list'),
    path('resume/', ResumeView.as_view(), name='resume-info'),
    path('resume/download/', ResumeDownloadView.as_view(), name='resume-download'),
    path('social-links/', SocialLinksView.as_view(), name='social-links'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact-create'),
]
