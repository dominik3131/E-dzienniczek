# Generated by Django 3.1.2 on 2020-12-07 20:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20201207_2059'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subject',
            name='school_class',
        ),
        migrations.AddField(
            model_name='subject',
            name='schoolClass',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='schoolClass', to='backend.schoolclass'),
        ),
    ]
