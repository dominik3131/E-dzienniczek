from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from .models import User as BackendUser
from django.utils import timezone

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = UserModel.objects.create(
            email=validated_data['email'],
            type=validated_data['type'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()

        userDetails = None
        if user.type == BackendUser.Types.ADMINISTRATOR:
            userDetailsModel = AdministratorDetails

        elif user.type == BackendUser.Types.TEACHER:
            userDetailsModel = TeacherDetails

        elif user.type == BackendUser.Types.STUDENT:
            userDetailsModel = StudentDetails

        elif user.type == BackendUser.Types.PARENT:
            userDetailsModel = ParentDetails

        userDetails = userDetailsModel.objects.create(user=user)
        userDetails.save()

        return user

    class Meta:
        model = UserModel
        fields = ("id", "password", "email", "first_name", "last_name", "type")


class UserSimpleSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        pass

    class Meta:
        model = UserModel
        fields = ("id", "email", "first_name", "last_name", "type")


class CustomSerializer(serializers.ModelSerializer):

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(CustomSerializer, self).get_field_names(
            declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            print(self.Meta)
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields


class GradeSimpleSerializer(CustomSerializer):

    class Meta:
        model = Grade
        fields = '__all__'


class SubjectSimpleSerializer(CustomSerializer):

    class Meta:
        model = Subject
        fields = '__all__'


class SchoolClassSimpleSerializer(CustomSerializer):
    class Meta:
        model = SchoolClass
        fields = '__all__'
        extra_kwargs = {'title': {'required': False}}


class AdministratorSimpleSerializer(CustomSerializer):
    class Meta:
        model = Administrator
        fields = ("id", "email", "first_name", "last_name", "type")


class TeacherSimpleSerializer(CustomSerializer):
    class Meta:
        model = Teacher
        fields = ("id", "email", "first_name", "last_name", "type")


class StudentSimpleSerializer(CustomSerializer):
    class Meta:
        model = Student
        fields = ("id", "email", "first_name", "last_name", "type")
        extra_kwargs = {'email': {'required': False}}


class ParentSimpleSerializer(CustomSerializer):
    class Meta:
        model = Parent
        fields = ("id", "email", "first_name", "last_name", "type")
        extra_kwargs = {'email': {'required': False}}


class TeacherDetailsSerializer(CustomSerializer):
    subjects = SubjectSimpleSerializer(
        many=True, read_only=True, source='get_subjects')

    class Meta:
        model = TeacherDetails
        fields = ("subjects", )


class TeacherSerializer(CustomSerializer):
    details = TeacherDetailsSerializer(many=False, read_only=True)

    class Meta:
        model = Teacher
        fields = ("id", "email", "first_name", "last_name", "type","details")
        extra_kwargs = {'email': {'required': False},'details': {'required': False}}


class StudentDetailsSerializer(CustomSerializer):
    schoolClass = SchoolClassSimpleSerializer(many=False)
    parents = ParentSimpleSerializer(many=True, read_only=True)
    grades = GradeSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = StudentDetails
        fields = ["schoolClass", "parents", "grades"]


class StudentSerializer(CustomSerializer):
    details = StudentDetailsSerializer(many=False)

    class Meta:
        model = Student
        fields = ["id", "email", "first_name", "last_name", "type", "details"]
        extra_kwargs = {'email': {'required': False}}

    def update(self, instance, validated_data):
        validated_data.pop('details', {})
        details = instance.details
        details_data = self.context['request'].data['details']
        instance = super().update(instance, validated_data)
        if details_data:
            schoolClass = details_data['schoolClass']
            if schoolClass:
                schoolClassID = schoolClass['id']
                details.schoolClass_id = schoolClassID
                details.save()
        return instance


class ParentDetailsSerializer(CustomSerializer):
    children = StudentSimpleSerializer(many=True)

    class Meta:
        model = ParentDetails
        fields = ['children']


class ParentSerializer(CustomSerializer):
    details = ParentDetailsSerializer(many=False)

    class Meta:
        model = Parent
        fields = ["id", "email", "first_name", "last_name", "type", "details"]
        extra_kwargs = {'email': {'required': False}}

    def update(self, instance, validated_data):
        validated_data.pop('details', {})
        details = instance.details
        details_data = self.context['request'].data['details']
        instance = super().update(instance, validated_data)
        if details_data:
            children = details_data['children']
            if children:
                children_ids = map(lambda x: x['id'], children)
                details.children.set(children_ids)
                details.save()
        return instance


class GradeSerializer(CustomSerializer):
    student = StudentSimpleSerializer(many=False, read_only=True)
    subject = SubjectSimpleSerializer(many=False, read_only=True)

    class Meta:
        model = Grade
        fields = '__all__'
        extra_kwargs = {'id': {'required': False}, 'firstRetakeValue': {
            'required': False}, 'secondRetakeValue': {'required': False}}


class SchoolClassSerializer(CustomSerializer):
    students = StudentSimpleSerializer(
        many=True, read_only=True, source='get_students')
    subjects = SubjectSimpleSerializer(
        many=True, read_only=True, source='get_subjects')

    class Meta:
        model = SchoolClass
        fields = ["id", "title", "subjects", "students"]
        extra_kwargs = {'id': {'required': False}}


class AnnouncementSerializer(CustomSerializer):
    user = UserSimpleSerializer(many=False, read_only=True)

    class Meta:
        model = Announcement
        fields = '__all__'
        extra_kwargs = {'attachment': {'required': False}}

    def create(self, validated_data):
        request = self.context.get('request', None)
        user = None
        attachment = None
        if request:
            user = request.user
            attachment = request.FILES.get('file')

        announcement = Announcement.objects.create(
            title=validated_data['title'],
            content=validated_data['content'],
            user=user,
            date=timezone.now(),
            attachment=attachment
        )

        announcement.save()

        return announcement


class MessageSerializer(CustomSerializer):
    sender = UserSimpleSerializer(many=False, read_only=True)
    receiver = UserSimpleSerializer(many=False, read_only=True)

    class Meta:
        model = Message
        fields = '__all__'
        extra_kwargs = {'sender': {'required': False}}

    def create(self, validated_data):
        request = self.context.get('request', None)
        sender = None
        receiver = None
        if request:
            sender = request.user
            receiver = User.objects.get(email=request.data['receiver'])

        message = Message.objects.create(
            title=request.data['title'],
            content=request.data['content'],
            receiver=receiver,
            sender=sender,
            date=timezone.now(),
        )

        message.save()

        return message


class MessageMarkAsReadSerializer(CustomSerializer):

    class Meta:
        model = Message
        fields = []

    def update(self, instance, validated_data):
        instance.read = True
        instance.save()
        return instance
