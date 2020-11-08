from django.contrib import admin
from .models import *
from django.contrib.admin.views.main import ChangeList

admin.site.register(Student)
admin.site.register(Admin)
admin.site.register(Teacher)
admin.site.register(Parent)
admin.site.register(SchoolClass)
admin.site.register(Grade)
admin.site.register(Subject)