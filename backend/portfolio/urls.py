from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Custom admin header styling
admin.site.site_header = "JESEENA J — Portfolio CMS & Admin Panel"
admin.site.site_title = "Portfolio Management Portal"
admin.site.index_title = "Portfolio Content & Section Management"
