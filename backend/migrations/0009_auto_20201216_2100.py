# Generated by Django 3.1.2 on 2020-12-16 20:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_auto_20201216_2029'),
    ]

    operations = [
        migrations.AlterField(
            model_name='announcement',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]