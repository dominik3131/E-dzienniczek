from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        extra_fields.setdefault('is_active', True)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('type', "ADMINISTRATOR")

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    objects = UserManager()

    class Types(models.TextChoices):
        ADMINISTRATOR = "ADMINISTRATOR", "Administrator"
        TEACHER = "TEACHER", "Teacher"
        STUDENT = "STUDENT", "Student"
        PARENT = "PARENT", "Parent"

    base_type = Types.STUDENT

    type = models.CharField(
        _("Type"), max_length=50, choices=Types.choices, default=base_type
    )

    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


# ---------------------------------------------------------------------------------------------
# ----------------------------------------ADMINISTRATOR----------------------------------------
# ---------------------------------------------------------------------------------------------


class AdministratorManager(UserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.ADMINISTRATOR)


class AdministratorDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Administrator(User):
    base_type = User.Types.ADMINISTRATOR
    objects = AdministratorManager()

    @property
    def details(self):
        return self.administratordetails

    class Meta:
        proxy = True


# ---------------------------------------------------------------------------------------------
# ----------------------------------------TEACHER----------------------------------------------
# ---------------------------------------------------------------------------------------------


class TeacherManager(UserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.TEACHER)

    def create_superuser(self, email, password, **extra_fields):
        pass


class TeacherDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Teacher(User):
    base_type = User.Types.TEACHER
    objects = TeacherManager()

    @property
    def details(self):
        return self.teacherdetails

    class Meta:
        proxy = True

# ---------------------------------------------------------------------------------------------
# ----------------------------------------CLASS------------------------------------------------
# ---------------------------------------------------------------------------------------------


class SchoolClass(models.Model):
    title = models.CharField(max_length=100)


# ---------------------------------------------------------------------------------------------
# ----------------------------------------STUDENT----------------------------------------------
# ---------------------------------------------------------------------------------------------


class StudentManager(UserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.STUDENT)

    def create_superuser(self, email, password, **extra_fields):
        pass


class StudentDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    schoolClass = models.ForeignKey(
        SchoolClass, related_name="student_class", null=True, blank=True, on_delete=models.SET_NULL)

    @property
    def parents(self):
        return Parent.objects.all().filter(parentdetails__children__id__in=[self.user_id])

    @property
    def grades(self):
        return Grade.objects.all().filter(student__id=self.user_id)


class Student(User):
    base_type = User.Types.STUDENT
    objects = StudentManager()

    @property
    def details(self):
        return self.studentdetails

    class Meta:
        proxy = True


# ---------------------------------------------------------------------------------------------
# ----------------------------------------PARENT-----------------------------------------------
# ---------------------------------------------------------------------------------------------


class ParentManager(UserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.PARENT)

    def create_superuser(self, email, password, **extra_fields):
        pass


class ParentDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    children = models.ManyToManyField(Student, related_name='parent_children')


class Parent(User):
    base_type = User.Types.PARENT
    objects = ParentManager()

    @property
    def details(self):
        return self.parentdetails

    class Meta:
        proxy = True


# ---------------------------------------------------------------------------------------------
# ----------------------------------------SUBJECT----------------------------------------------
# ---------------------------------------------------------------------------------------------


class Subject(models.Model):
    teacher = models.ForeignKey(
        Teacher, related_name='Teacher', null=True, blank=True, on_delete=models.SET_NULL)
    schoolClass = models.ForeignKey(
        SchoolClass, related_name='schoolClass', null=True, blank=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=100)

# ---------------------------------------------------------------------------------------------
# ----------------------------------------GRADE------------------------------------------------
# ---------------------------------------------------------------------------------------------


class Grade(models.Model):
    student = models.ForeignKey(
        Student, related_name='Student', on_delete=models.CASCADE)
    subject = models.ForeignKey(
        Subject, related_name='Subject', on_delete=models.CASCADE)
    value = models.PositiveSmallIntegerField(
        default=5, validators=[MaxValueValidator(6), MinValueValidator(1)])
    description = models.CharField(max_length=100, default='grade')

# ---------------------------------------------------------------------------------------------
# ----------------------------------------Announcement----------------------------------------
# ---------------------------------------------------------------------------------------------


class Announcement(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=2000)
    date = models.DateTimeField(editable=False)
    attachment = models.FileField(blank=True, default='')
