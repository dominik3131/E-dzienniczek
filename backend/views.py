from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.db.models import Q
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from .serializers import *
from .models import *
from rest_framework import generics
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from rest_framework.decorators import permission_classes, api_view
from rest_auth.views import LoginView
from .permissions import *
from django.utils.decorators import method_decorator
from django.utils import timezone
from django.core import serializers
from django.utils.decorators import method_decorator



# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))


class MethodSerializerView(object):
    '''
    Utility class for get different serializer class by method.
    For example:
    method_serializer_classes = {
        ('GET', ): MyModelListViewSerializer,
        ('PUT'): MyModelCreateUpdateSerializer
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

@method_decorator(csrf_exempt, name='dispatch')
class StudentsList(generics.ListAPIView):
    '''
    GET: List of all the students in school. Restricted for Teachers and Administrators
    '''

    permission_classes = (TeacherPermission | AdministratorPermission,)
    serializer_class = StudentSimpleSerializer

    def get_queryset(self):
        return Student.objects.all()

@method_decorator(csrf_exempt, name='dispatch')
class StudentDetail(MethodSerializerView, generics.RetrieveUpdateAPIView):
    '''
    GET: Retrieving student detailed data. Restricted for Teachers and Administrators, specific student or his parent
    PUT: Updating student detailed data. Restricted for Teachers and Administrators
    '''

    permission_classes = (
        (
            SafeMethodPermission
            & (
                ParentOfChildPermission
                | ExactUserPermission
            )
        )
        | TeacherPermission
        | AdministratorPermission,
    )
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    method_serializer_classes = {
        ('GET', 'PUT',): StudentSerializer,
    }

@method_decorator(csrf_exempt, name='dispatch')
class ParentsList(generics.ListAPIView):
    '''
    GET: List of all registered parents.  Restricted for Teachers and Administrators
    '''

    permission_classes = (TeacherPermission | AdministratorPermission,)
    serializer_class = ParentSimpleSerializer

    def get_queryset(self):
        return Parent.objects.all()

@method_decorator(csrf_exempt, name='dispatch')
class ParentDetail(MethodSerializerView, generics.RetrieveUpdateAPIView):
    '''
    GET: Retrieving detailed data of parent. Restricted for Teachers and Administrators, specific parent and children of this parent\n
    PUT: Updating detailed data of parent. Restricted for Teachers and Administrators
    '''

    permission_classes = (
        (
            SafeMethodPermission
            & (
                ChildOfParentPermission
                | ExactUserPermission
            )
        )
        | TeacherPermission
        | AdministratorPermission,
    )
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    method_serializer_classes = {
        ('GET', 'PUT',): ParentSerializer,
    }

@method_decorator(csrf_exempt, name='dispatch')
class TeachersList(generics.ListAPIView):
    '''
    GET: List of all teachers in school
    '''

    serializer_class = TeacherSimpleSerializer

    def get_queryset(self):
        return Teacher.objects.all()

@method_decorator(csrf_exempt, name='dispatch')
class TeacherDetail(MethodSerializerView, generics.RetrieveUpdateAPIView):
    '''
    GET: Retrieving detailed data of teacher\n
    PUT: Updating detailed data of teacher, Restricted for exact teacher and Administrators
    '''

    permission_classes = (
        (
            SafeMethodPermission
            & (
                StudentPermission
                | ParentPermission
            )
        )
        | ExactUserPermission
        | AdministratorPermission,
    )
    queryset = Teacher.objects.all()
    method_serializer_classes = {
        ('GET', 'PUT', ): TeacherSerializer,
    }

@method_decorator(csrf_exempt, name='dispatch')
class SubjectsList(generics.ListCreateAPIView):
    '''
    GET: Retrieving list of all subjects\n
    POST: Creating new subject. Restricted for Teachers and Administrators
    '''
    serializer_class = SubjectSimpleSerializer
    permission_classes = (
        SafeMethodPermission
        | TeacherPermission
        | AdministratorPermission,
    )

    def get_queryset(self):
        return Subject.objects.all()

    def perform_create(self, serializer):
        serializer.save()

@method_decorator(csrf_exempt, name='dispatch')
class SubjectDetail(generics.RetrieveUpdateAPIView):
    '''
    GET: Retrieving detailed data of subject\n
    PUT: Updating subject. Restricted for Teachers and Administrators
    '''
    permission_classes = (
        SafeMethodPermission
        | TeacherPermission
        | AdministratorPermission,
    )

    queryset = Subject.objects.all()
    serializer_class = SubjectSimpleSerializer

@method_decorator(csrf_exempt, name='dispatch')
class SchoolClassList(generics.ListCreateAPIView):
    '''
    GET: Retrieving list of all classes\n
    POST: Creating new class. Restricted for Teachers and Administrators
    '''
    serializer_class = SchoolClassSimpleSerializer
    permission_classes = (
        SafeMethodPermission
        | TeacherPermission
        | AdministratorPermission,
    )

    def get_queryset(self):
        return SchoolClass.objects.all()

    def perform_create(self, serializer):
        serializer.save()

@method_decorator(csrf_exempt, name='dispatch')
class SchoolClassDetail(MethodSerializerView, generics.RetrieveUpdateAPIView):
    '''
    GET: Retrieving detailed class data\n
    PUT: Updating class data. Restricted for Teachers and Administrators
    '''

    permission_classes = (
        SafeMethodPermission
        | TeacherPermission
        | AdministratorPermission,
    )

    queryset = SchoolClass.objects.all()
    method_serializer_classes = {
        ('GET', 'PUT', ): SchoolClassSerializer,
    }

@method_decorator(csrf_exempt, name='dispatch')
class SchoolClassStudentList(generics.ListAPIView):
    '''
    GET: Retrieving list of students in class\n
    PUT: Updating class members. Restricted for Teachers and Administrators
    '''
    serializer_class = StudentSimpleSerializer
    permission_classes = (
        SafeMethodPermission
        | TeacherPermission
        | AdministratorPermission,
    )

    def get_queryset(self):
        return Student.objects.filter(studentdetails__schoolClass__id=self.kwargs['pk'])

@method_decorator(csrf_exempt, name='dispatch')
class SchoolClassSubjectList(generics.ListAPIView):
    '''
    GET: Retrieving list of subjects of class\n
    PUT: Updating subjects of class. Restricted for Teachers and Administrators
    '''
    serializer_class = SubjectSimpleSerializer
    permission_classes = (
        SafeMethodPermission
        | TeacherPermission
        | AdministratorPermission,
    )
    def get_queryset(self):
        return Subject.objects.filter(schoolClass__id=self.kwargs['pk'])

@method_decorator(csrf_exempt, name='dispatch')
class CreateGradeView(CreateAPIView):
    '''
    POST: Creating grade. Restricted for Teachers and Administrators
    '''
    model = Grade
    serializer_class = GradeSimpleSerializer
    permission_classes = (AdministratorPermission | TeacherPermission, )

@method_decorator(csrf_exempt, name='dispatch')
class UpdateGradeView(generics.UpdateAPIView):
    '''
    POST: Updating grade. Restricted for Teachers and Administrators
    '''
    model = Grade
    serializer_class = GradeSerializer
    permission_classes = (AdministratorPermission | TeacherPermission, )

    def get_queryset(self):
        return Grade.objects.all()

@method_decorator(csrf_exempt, name='dispatch')
class AnnouncementsList(generics.ListCreateAPIView):
    '''
    GET: Retrieving list of announcements ordered by date, where most recent one is first\n
    POST: Creating new Announcement. Restricted for Teachers and Administrators
    '''
    serializer_class = AnnouncementSerializer
    permission_classes = (SafeMethodPermission |
                          TeacherPermission | AdministratorPermission,)

    def get_queryset(self):
        return Announcement.objects.all().order_by('-date')

    def perform_create(self, serializer):
        self.request.data._mutable = True
        self.request.data['user'] = self.request.user.id
        serializer.save()

@method_decorator(csrf_exempt, name='dispatch')
class AnnouncementsLatestList(generics.ListAPIView):
    '''
    GET: Retrieving list of 3 most recent announcements.
    '''
    serializer_class = AnnouncementSerializer
    permission_classes = (SafeMethodPermission |
                          TeacherPermission | AdministratorPermission,)

    def get_queryset(self):
        return Announcement.objects.all().order_by('-date')[:3]

@method_decorator(csrf_exempt, name='dispatch')
class CreateUserView(CreateAPIView):
    '''
    POST: Creating new user in the school system.\n
    Restricted to teachers and administrators.\n
    Teachers can create accounts for other teachers, students and parents.\n
    Administrators can additionally create other administrators accounts.
    '''
    model = get_user_model()
    permission_classes = (UserCreatePermission,)
    serializer_class = UserSerializer

@method_decorator(csrf_exempt, name='dispatch')
class UsersList(generics.ListAPIView):
    '''
    GET: List of users\n
    Parents and Students will see only teachers data.\n
    Teachers and Administrators will see all users in the system.
    '''
    serializer_class = UserSimpleSerializer
    permission_classes = (SafeMethodPermission,)

    def get_queryset(self):
        userType = self.request.user.type
        if userType == 'STUDENT' or userType == 'PARENT':
            return User.objects.filter(type='TEACHER')
        else:
            return User.objects.all()

@method_decorator(csrf_exempt, name='dispatch')
class CustomLoginView(LoginView):
    '''
    POST: Login to an account. Session key and logged user data will be returned
    '''
    @ csrf_exempt
    def get_response(self):

        # assuming obj is a model instance
        orginal_response = super().get_response()
        extraData = {
            "message": "Login success",
            "status": "success",
            "user": {
                "id": self.user.id,
                "type": self.user.type,
                "first_name": self.user.first_name,
                "last_name": self.user.last_name,
                "email": self.user.email,
            }
        }
        orginal_response.data.update(extraData)
        return orginal_response

@method_decorator(csrf_exempt, name='dispatch')
class SentMessageList(generics.ListAPIView):
    '''
    GET: List of sent messages of currently logged user
    '''
    serializer_class = MessageSerializer
    permission_classes = (SafeMethodPermission,)

    def get_queryset(self):
        return Message.objects.all().filter(sender=self.request.user).order_by('-date')

@method_decorator(csrf_exempt, name='dispatch')
class ReceivedMessageList(generics.ListAPIView):
    '''
    GET: List of received messages of currently logged user
    '''
    serializer_class = MessageSerializer
    permission_classes = (SafeMethodPermission,)

    def get_queryset(self):
        return Message.objects.all().filter(receiver=self.request.user).order_by('-date')

@method_decorator(csrf_exempt, name='dispatch')
class SendMessageView(generics.CreateAPIView):
    '''
    POST: Sends new message
    '''
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        self.request.data['sender'] = self.request.user
        serializer.save()

@method_decorator(csrf_exempt, name='dispatch')
class MarkMessageAsReadView(generics.UpdateAPIView):
    '''
    POST: Marks message as read. Restricted to user that was receiver of the message
    '''
    permission_classes = (MessageReceiverPermission,)

    def get_queryset(self):
        return Message.objects.all()

    serializer_class = MessageMarkAsReadSerializer
