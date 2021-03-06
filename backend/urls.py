from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_auth.views import LogoutView
from rest_framework.urlpatterns import format_suffix_patterns
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('api/admin/', admin.site.urls),

    path('login', index, name='index'),
    path('logout', index, name='index'),
    
    path('students', index, name='index'),
    path('student/<int:pk>', index, name='index'),
    path('parents', index, name='index'),
    path('parents/<int:pk>', index, name='index'),
    path('teachers', index, name='index'),
    path('teachers/<int:pk>', index, name='index'),
    path('admin', admin.site.urls),
    path('users/*', index, name='index'),
    path('users', index, name='index'),
    
    path('api/students', StudentsList.as_view()),
    path('api/students/<int:pk>', StudentDetail.as_view()),
    path('api/parents', ParentsList.as_view()),
    path('api/parents/<int:pk>', ParentDetail.as_view()),
    path('api/teachers', TeachersList.as_view()),
    path('api/teachers/<int:pk>', TeacherDetail.as_view()),

    path('api/grades', CreateGradeView.as_view()),
    path('api/grades/<int:pk>', UpdateGradeView.as_view()),

    path('api/subjects', SubjectsList.as_view()),
    path('api/subjects/<int:pk>', SubjectDetail.as_view()),

    path('api/classes', SchoolClassList.as_view()),
    path('api/classes/<int:pk>', SchoolClassDetail.as_view()),
    path('api/classes/<int:pk>/subjects', SchoolClassSubjectList.as_view()),
    path('api/classes/<int:pk>/students', SchoolClassStudentList.as_view()),

    path('api/announcements', AnnouncementsList.as_view()),
    path('api/announcements/latest', AnnouncementsLatestList.as_view()),

    path('api/messages', SendMessageView.as_view()),
    path('api/messages/<int:pk>/markAsRead', MarkMessageAsReadView.as_view()),
    path('api/messages/sent', SentMessageList.as_view()),
    path('api/messages/received', ReceivedMessageList.as_view()),

    path('api/o', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('api/users', UsersList.as_view()),
    path('api/users/create', CreateUserView.as_view()),
    path('api/login',CustomLoginView.as_view(),name = 'login'),
    path('api/logout',LogoutView.as_view(),name='logout'),
    
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)