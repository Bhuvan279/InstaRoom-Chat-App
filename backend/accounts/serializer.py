from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields ='__all__'

class ChatSerializer(serializers.ModelSerializer):
	class Meta:
		model = Chat
		fields ='__all__'

class RoomSerializer(serializers.ModelSerializer):
	class Meta:
		model = Room
		fields = ('room_name', 'host')

class RoomReadSerializer(serializers.ModelSerializer):
	class Meta:
		model = Room
		fields = '__all__'


class RoomCodeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Room
		fields = ('code')


class RoomChatSerializer(serializers.ModelSerializer):
	class Meta:
		model = RoomChats
		fields = '__all__'


class MemberSerializer(serializers.ModelSerializer):
	class Meta:
		model = Member
		fields = ('room','member','status')


class MemberReadSerializer(serializers.ModelSerializer):
	class Meta:
		model = Member
		fields = '__all__'