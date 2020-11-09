from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *


UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        print(validated_data)
        user = UserModel.objects.create(
            email=validated_data['email'],
            type=validated_data['type']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = UserModel
        fields = ("id", "password", "email", "first_name", "last_name", "type" )


class CustomSerializer(serializers.ModelSerializer):

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(CustomSerializer, self).get_field_names(
            declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
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


class AdministratorSimpleSerializer(CustomSerializer):
    class Meta:
        model = Administrator
        fields = '__all__'


class TeacherSimpleSerializer(CustomSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'


class StudentSimpleSerializer(CustomSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class ParentSimpleSerializer(CustomSerializer):
    class Meta:
        model = Parent
        fields = '__all__'

class TeacherDetailsSerializer(CustomSerializer):
    subjects = SubjectSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = '__all__'
        extra_fields = ['subjects']

class StudentDetailsSerializer(CustomSerializer):
    parents = ParentSimpleSerializer(many=True, read_only=True)
    schoolClass = SchoolClassSimpleSerializer(many=False, read_only=True)
    grades = GradeSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = '__all__'
        extra_fields = ['parents', 'schoolClass', 'grades']


class ParentDetailsSerializer(CustomSerializer):
    children = StudentSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = Parent
        fields = '__all__'
        extra_fields = ['children']


class GradeDetailsSerializer(CustomSerializer):
    student = StudentSimpleSerializer(many=False, read_only=True)
    subject = SubjectSimpleSerializer(many=False, read_only=True)

    class Meta:
        model = Grade
        fields = '__all__'
        extra_fields = ['student', 'subject']


class SchoolClassDetailsSerializer(CustomSerializer):
    students = StudentSimpleSerializer(many=True, read_only=True)
    subjects = SubjectSimpleSerializer(many=True, read_only=True)
    class Meta:
        model = SchoolClass
        fields = '__all__'
        extra_fields = ['students', 'subjects']