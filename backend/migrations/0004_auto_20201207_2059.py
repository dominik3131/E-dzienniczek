# Generated by Django 3.1.2 on 2020-12-07 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_auto_20201202_1829'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subject',
            old_name='school_class_id',
            new_name='school_class',
        ),
        migrations.RenameField(
            model_name='subject',
            old_name='teacher_id',
            new_name='teacher',
        ),
        migrations.AddField(
            model_name='grade',
            name='description',
            field=models.CharField(default='grade', max_length=100),
        ),
    ]