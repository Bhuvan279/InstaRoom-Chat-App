from django.db import models
from django.contrib.auth.models import User
import string
import random


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    
    return code

# Create your models here.

class Chat(models.Model):
    user = models.CharField(max_length=200)
    chat_text = models.TextField()
    

    def __str__(self):
        return self.user

class Room(models.Model):
    room_name = models.CharField( max_length=20, default="", unique=False)
    code = models.CharField( max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField( max_length=50, default="" )

    def __str__(self):
        return self.room_name
        

class Member(models.Model):
    room = models.ForeignKey(Room, blank=True, null=True, on_delete=models.CASCADE)
    room_name = models.CharField(max_length=50, null=True)
    member = models.CharField(max_length=50)
    status = models.CharField(max_length=15)

    def __str__(self):
        return self.member


class RoomChats(models.Model):
    room = models.ForeignKey(Room, blank=True, null=True, on_delete=models.CASCADE)
    user = models.CharField( max_length=50, default="" )
    message =  models.TextField(null=True)
    
    def __str__(self):
        return self.user
    
    
    
    
     

