# Generated by Django 4.0.5 on 2022-07-31 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_member'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='room_name',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
