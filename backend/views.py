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

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))


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


class StudentsList(generics.ListAPIView):
    '''
    API: /api/students/
    Method: GET
    '''

    permission_classes = (TeacherPermission | AdministratorPermission,)
    serializer_class = StudentSimpleSerializer

    def get_queryset(self):
        return Student.objects.all()


class StudentDetail(MethodSerializerView, generics.RetrieveUpdateDestroyAPIView):
    '''
    API: /api/students/:student_id
    Method: GET/PUT/PATCH/DELETE
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
        ('GET', 'PUT', 'PATCH',): StudentSerializer,
    }


class ParentsList(generics.ListAPIView):
    '''
    API: /api/parents/
    Method: GET
    '''

    permission_classes = (TeacherPermission | AdministratorPermission,)
    serializer_class = ParentSimpleSerializer

    def get_queryset(self):
        return Parent.objects.all()


class ParentDetail(MethodSerializerView, generics.RetrieveUpdateDestroyAPIView):
    '''
    API: /api/parents/:parent_id
    Method: GET/PUT/PATCH/DELETE
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
        ('GET', 'PUT', 'PATCH',): ParentSerializer,
    }


class ParentDetailsView(MethodSerializerView, generics.RetrieveUpdateDestroyAPIView):
    '''
    API: /api/parents/:parent_id/details
    Method: PUT
    '''
    queryset = Parent.objects.all()
    method_serializer_classes = {
        ('GET', 'PUT', 'PATCH', ): ParentDetailsSerializer,
    }


class TeachersList(generics.ListAPIView):
    '''
    API: /api/teachers/
    Method: GET
    '''

    serializer_class = TeacherSimpleSerializer

    def get_queryset(self):
        return Teacher.objects.all()


class TeacherDetail(MethodSerializerView, generics.RetrieveUpdateDestroyAPIView):
    '''
    API: /api/teachers/:teacher_id
    Method: GET/PUT/PATCH/DELETE
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
        ('GET', 'PUT', 'PATCH', ): TeacherSerializer,
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


class SchoolClassDetail(MethodSerializerView, generics.RetrieveUpdateDestroyAPIView):
    '''
    API: /api/classes/:class_id
    Method: GET/PUT/PATCH/DELETE
    '''
    queryset = SchoolClass.objects.all()
    method_serializer_classes = {
        ('GET', 'PUT', 'PATCH', ): SchoolClassSerializer,
    }


class CreateGradeView(CreateAPIView, generics.UpdateAPIView):

    model = Grade
    serializer_class = GradeSimpleSerializer
    permission_classes = (AdministratorPermission | TeacherPermission, )


class AnnouncementsList(generics.ListCreateAPIView):

    serializer_class = AnnouncementSerializer
    permission_classes = (SafeMethodPermission |
                          TeacherPermission | AdministratorPermission,)

    def get_queryset(self):
        return Announcement.objects.all().order_by('-date')

    def perform_create(self, serializer):
        self.request.data._mutable = True
        self.request.data['user'] = self.request.user.id
        serializer.save()


class AnnouncementsLatestList(generics.ListAPIView):

    serializer_class = AnnouncementSerializer
    permission_classes = (SafeMethodPermission |
                          TeacherPermission | AdministratorPermission,)

    def get_queryset(self):
        return Announcement.objects.all().order_by('-date')[:3]


class CreateUserView(CreateAPIView):

    model = get_user_model()
    permission_classes = (UserCreatePermission,)
    serializer_class = UserSerializer

class UsersList(generics.ListAPIView):

    serializer_class = UserSimpleSerializer
    permission_classes = (SafeMethodPermission)

    def get_queryset(self):
        return User.objects.all()

class CustomLoginView(LoginView):
    @ csrf_exempt
    def get_response(self):
        orginal_response = super().get_response()
        mydata = {"message": "Login success", "status": "success"}
        orginal_response.data.update(mydata)
        return orginal_response


class SentMessageList(generics.ListAPIView):

    serializer_class = MessageSerializer
    permission_classes = (SafeMethodPermission,)

    def get_queryset(self):
        return Message.objects.all().filter(sender=self.request.user).order_by('-date')


class ReceivedMessageList(generics.ListAPIView):

    serializer_class = MessageSerializer
    permission_classes = (SafeMethodPermission,)

    def get_queryset(self):
        return Message.objects.all().filter(receiver=self.request.user).order_by('-date')

class SendMessageView(generics.CreateAPIView):

    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        self.request.data['sender'] = self.request.user
        serializer.save()

class MarkMessageAsReadView(generics.UpdateAPIView):

    permission_classes = (MessageReceiverPermission,)

    def get_queryset(self):
        return Message.objects.all()

    serializer_class = MessageMarkAsReadSerializer
