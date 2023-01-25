from django.shortcuts import render
from django.http import HttpResponse

from django.contrib.auth.models import User
from .models import Chat,Room, RoomChats

from .serializer import *

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        
        token['username'] = user.username
        

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def createUsers(request):
    print(request.data)
    
    user = User.objects.filter(username = request.data['username'])

    if user:
        send_Response = "Username is already taken"
        print("User exists")

    else: 
        send_Response = "User registered"
        user1 = User.objects.create_user(request.data['username'], request.data['email'], request.data['password'])
        print("user created")

    return Response(send_Response)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def readChatRoom(request):
    chats = Chat.objects.all()
    serializer = ChatSerializer(chats, many=True)
    
    return Response(serializer.data)

@api_view(['POST'])
def postChat(request):
    
    serializer = ChatSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()

    print(serializer.data)
        
    return Response(serializer.data)

@api_view(['PUT'])
def updateChat(request,pk):

    chat = Chat.objects.get(id=pk)
    serializer = ChatSerializer(instance=chat, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteChat(request,pk):

    chat = Chat.objects.get(id=pk)
    chat.delete()

    return Response("Item was successfully deleted")




# ROOMS CODE
@api_view(['GET'])
def readRooms(request):

    rooms = Room.objects.all()
    serializer = RoomReadSerializer(rooms, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def createRooms(request):

    serializer = RoomSerializer(data=request.data)
    if serializer.is_valid():
        print(serializer.data)
 
        host = serializer.data.get('host')
        room_name = serializer.data.get('room_name')
        
        room = Room(host=host, room_name=room_name)
        room.save()

    
    serializer_room = RoomReadSerializer(room, many=False)
        

    return Response(serializer_room.data)
    


@api_view(['DELETE'])
def deleteRooms(request,pk):

    room = Room.objects.get(id=pk)
    room.delete()

    return Response("Item was successfully deleted")



@api_view(['GET'])
def getRoomCode(request,pk):

    room = Room.objects.get(id=pk)
    serializer = RoomReadSerializer(room, many=False)
    
    print(serializer.data)
    return Response(serializer.data)


#MEMBERS CODE
@api_view(['GET'])
def getMembers(request):

    members = Member.objects.all()
    serializer = MemberReadSerializer(members, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def addMember(request):

    serializer = MemberSerializer(data=request.data)

    if serializer.is_valid():
        member_name = serializer.data.get('member')
        status = serializer.data.get('status')
        room = serializer.data.get('room')

        room_object = Room.objects.get(id=room)

        
        member = Member(room=room_object, room_name=room_object.room_name, member=member_name, status=status)
        member.save()

    return Response(serializer.data)

@api_view(['GET'])
def membersRoom(request, pk):
    
    member_rooms = Member.objects.filter(member=pk)
    serializer = MemberReadSerializer(member_rooms,many=True)

    return Response(serializer.data)






@api_view(['GET'])
def joinRoom(request, code):

    room = Room.objects.filter(code=code)
    serializer = RoomReadSerializer(room, many=True)

    return Response(serializer.data)
    

# CHAT ROOMS CODE


@api_view(['GET'])
def getChats(request,pk):
    
    room = Room.objects.get(id=pk)
    chats = room.roomchats_set.all()

    serializer = RoomChatSerializer(chats, many=True)
     
    return Response(serializer.data)

@api_view(['POST'])
def postChats(request,pk):
    
    serializer = ChatSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.data.get('user')
        chat_text = serializer.data.get('chat_text')

        room_object = Room.objects.get(id=pk)

        chat = room_object.roomchats_set.create(room=room_object, user=user, chat_text=chat_text)
    
    return Response(serializer.data)