# Generated by Django 4.0.6 on 2022-09-08 00:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.ImageField(default='/static/assets/images/hawksbill.png', upload_to='profile/', verbose_name='Profile image'),
        ),
    ]
