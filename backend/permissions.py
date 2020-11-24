from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from .models import User


class AdministratorPermission(BasePermission):

    def has_object_permission(self, request, view, obj):

        # check if user is administrator
        return request.user.type == User.Types.ADMINISTRATOR


class TeacherPermission(BasePermission):

    def has_object_permission(self, request, view, obj):

        # check if user is teacher
        return request.user.type == User.Types.TEACHER


class StudentPermission(BasePermission):

    def has_object_permission(self, request, view, obj):

        # check if user is student
        return request.user.type == User.Types.STUDENT


class ChildOfParentPermission(BasePermission):
     def has_object_permission(self, request, view, obj):

        # check if user is child of parent
        return isinstance(obj,User) and request.user.type == User.Types.STUDENT and obj.type == User.Types.PARENT and request.user in obj.details.children.all()

class ParentPermission(BasePermission):

    def has_object_permission(self, request, view, obj):

        # check if user is owner of parent model or if is parent of student
        return request.user.type == User.Types.PARENT

class ParentOfChildPermission(BasePermission):
     def has_object_permission(self, request, view, obj):

        # check if user is child of parent
        return isinstance(obj,User) and request.user.type == User.Types.PARENT and obj.type == User.Types.STUDENT and obj in request.user.parentdetails.children.all()

# TODO parent of child permission

class ExactUserPermission(BasePermission):
    def has_object_permission(self, request, view, obj):

        # check if user is owner of user model
        return isinstance(obj,User) and request.user.id == obj.id

class SafeMethodPermission(BasePermission):
    def has_object_permission(self, request, view, obj):

        # check if request is safe
        return request.method in SAFE_METHODS

class UserCreatePermission(BasePermission):
    def has_permission(self, request, view):

        # check if user has permission for specific user type creation
        return request.user.type=="ADMINISTRATOR" or (request.user.type=="TEACHER" and request.data.type != "ADMINISTRATOR")