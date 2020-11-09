from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from rest_framework.decorators import  permission_classes,api_view
from rest_auth.views import LoginView
# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))

from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt, csrf_protect

class MethodSerializerView(object):
    '''
    Utility class for get different serializer class by method.
    For example:
    method_serializer_classes = {
        ('GET', ): MyModelListViewSerializer,
        ('PUT', 'PATCH'): MyModelCreateUpdateSerializer
    }
    '''
    method_serializer_classes = None

    def get_serializer_class(self):
        assert self.method_serializer_classes is not None, (
            'Expected view %s should contain method_serializer_classes '
            'to get right serializer class.' %
            (self.__class__.__name__, )
        )
        for methods, serializer_cls in self.method_serializer_classes.items():
            if self.request.method in methods:
                return serializer_cls

        raise exceptions.MethodNotAllowed(self.request.method)

class StudentsList(generics.ListCreateAPIView):
    '''
    API: /api/students/
    Method: GET/POST
    '''
    serializer_class = StudentSimpleSerializer
    def get_queryset(self):
        return Student.objects.all()

    def perform_create(self, serializer):
        serializer.save()

class StudentDetail(MethodSerializerView,generics.RetrieveUpdateDestroyAPIView):
    '''
    API: /api/students/:student_id
    Method: GET/PUT/PATCH/DELETE
    '''
    
    queryset = Student.objects.all()
    method_serializer_classes = {
        ('GET', ): StudentDetailsSerializer,
        ('PUT', 'PATCH'): StudentSimpleSerializer
    }
    

class ParentsList(generics.ListCreateAPIView):
    '''
    API: /api/parents/
    Method: GET/POST
    '''
    serializer_class = ParentSimpleSerializer
    def get_queryset(self):
        return Parent.objects.all()

    def perform_create(self, serializer):
        serializer.save()


class ParentDetail(MethodSerializerView,generics.RetrieveUpdateDestroyAPIView):
    '''
    API: /api/parents/:parent_id
    Method: GET/PUT/PATCH/DELETE
    '''
    queryset = Parent.objects.all()
    method_serializer_classes = {
        ('GET', ): ParentDetailsSerializer,
        ('PUT', 'PATCH'): ParentSimpleSerializer
    }

class TeachersList(generics.ListCreateAPIView):
    '''
    API: /api/teachers/
    Method: GET/POST
    '''
    serializer_class = TeacherSimpleSerializer
    def get_queryset(self):
        return Teacher.objects.all()

    def perform_create(self, serializer):
        serializer.save()


class TeacherDetail(MethodSerializerView,generics.RetrieveUpdateDestroyAPIView):
    '''
    API: /api/teachers/:teacher_id
    Method: GET/PUT/PATCH/DELETE
    '''
    queryset = Teacher.objects.all()
    method_serializer_classes = {
        ('GET', ): TeacherDetailsSerializer,
        ('PUT', 'PATCH'): TeacherSimpleSerializer
    }

class SubjectsList(generics.ListCreateAPIView):
    '''
    API: /api/subjects/
    Method: GET/POST
    '''
    serializer_class = SubjectSimpleSerializer
    def get_queryset(self):
        return Subject.objects.all()

    def perform_create(self, serializer):
        serializer.save()


class SubjectDetail(generics.RetrieveUpdateDestroyAPIView):
    '''
    API: /api/subjects/:subject_id
    Method: GET/PUT/PATCH/DELETE
    '''
    queryset = Subject.objects.all()
    serializer_class = SubjectSimpleSerializer


class SchoolClassList(generics.ListCreateAPIView):
    '''
    API: /api/classes/
    Method: GET/POST
    '''
    serializer_class = SchoolClassSimpleSerializer
    def get_queryset(self):
        return SchoolClass.objects.all()

    def perform_create(self, serializer):
        serializer.save()


class SchoolClassDetail(MethodSerializerView,generics.RetrieveUpdateDestroyAPIView):
    '''
    API: /api/classes/:class_id
    Method: GET/PUT/PATCH/DELETE
    '''
    queryset = SchoolClass.objects.all()
    method_serializer_classes = {
        ('GET', ): SchoolClassDetailsSerializer,
        ('PUT', 'PATCH'): SchoolClassSimpleSerializer
    }

class CreateUserView(CreateAPIView):

    model = get_user_model()
    permission_classes = [
        permissions.AllowAny # Or anon users can't register
    ]
    serializer_class = UserSerializer

class CustomLoginView(LoginView):
    @csrf_exempt
    def get_response(self):
        orginal_response = super().get_response()
        mydata = {"message": "some message", "status": "success"}
        orginal_response.data.update(mydata)
        return orginal_response

