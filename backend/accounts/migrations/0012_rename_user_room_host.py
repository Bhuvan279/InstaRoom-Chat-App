# Generated by Django 4.0.5 on 2022-07-31 11:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_member_room_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='user',
            new_name='host',
        ),
    ]