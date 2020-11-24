from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_auth.views import LogoutView
from rest_framework.urlpatterns import format_suffix_patterns

from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('api/admin/', admin.site.urls)
]
urlpatterns = [
    path('', index, name='index'),
    path('login', index, name='index'),
    path('logout', index, name='index'),
    
    path('students', index, name='index'),
    path('student/<int:pk>', index, name='index'),
    path('parents', index, name='index'),
    path('parents/<int:pk>', index, name='index'),
    path('teachers', index, name='index'),
    path('teachers/<int:pk>', index, name='index'),
    path('admin', admin.site.urls),

    path('api/students', StudentsList.as_view()),
    path('api/students/<int:pk>', StudentDetail.as_view()),
    path('api/parents', ParentsList.as_view()),
    path('api/parents/<int:pk>', ParentDetail.as_view()),
    path('api/teachers', TeachersList.as_view()),
    path('api/teachers/<int:pk>', TeacherDetail.as_view()),

    path('api/subjects', SubjectsList.as_view()),
    path('api/subjects/<int:pk>', SubjectDetail.as_view()),

    path('api/classes', SchoolClassDetail.as_view()),
    path('api/classes/<int:pk>', SchoolClassDetail.as_view()),

    path('api/o', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('api/users/create', CreateUserView.as_view()),
    path('api/login',CustomLoginView.as_view(),name = 'login'),
    path('api/logout',LogoutView.as_view(),name='logout'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)