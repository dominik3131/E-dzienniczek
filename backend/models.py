from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractUser):
    class Types(models.TextChoices):
        ADMINISTRATOR = "ADMINISTRATOR", "Administrator"
        TEACHER = "TEACHER", "Teacher"
        STUDENT = "STUDENT", "Student"
        PARENT = "PARENT", "Parent"

    base_type = Types.STUDENT

    type = models.CharField(
        _("Type"), max_length=50, choices=Types.choices, default=base_type
    )

    # First Name and Last Name Do Not Cover Name Patterns
    # Around the Globe.
    name = models.CharField(_("Name of User"), blank=True, max_length=255)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def save(self, *args, **kwargs):
        if not self.id:
            self.type = self.base_type
        return super().save(*args, **kwargs)


# ---------------------------------------------------------------------------------------------
# ----------------------------------------ADMINISTRATOR----------------------------------------
# ---------------------------------------------------------------------------------------------


class AdministratorManager(models.Manager):
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


class TeacherManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.TEACHER)


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


class StudentManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.STUDENT)


class StudentDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    schoolClass = models.ForeignKey(
        SchoolClass, related_name="student_class", null=True, blank=True, on_delete=models.SET_NULL)


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


class ParentManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.PARENT)


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
    teacher_id = models.ForeignKey(
        Teacher, related_name='Teacher', null=True, blank=True, on_delete=models.SET_NULL)
    school_class_id = models.ForeignKey(
        SchoolClass, related_name='school_class', null=True, blank=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=100)

# ---------------------------------------------------------------------------------------------
# ----------------------------------------GRADE------------------------------------------------
# ---------------------------------------------------------------------------------------------


class Grade(models.Model):
    student_id = models.ForeignKey(
        Student, related_name='Student', on_delete=models.CASCADE)
    subject_id = models.ForeignKey(
        Subject, related_name='Subject', on_delete=models.CASCADE)
    value = models.PositiveSmallIntegerField(
        default=5, validators=[MaxValueValidator(6), MinValueValidator(1)])
