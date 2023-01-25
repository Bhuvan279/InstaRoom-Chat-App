from django.shortcuts import render
from accounts.serializer import RoomChatSerializer
from accounts.models import RoomChats, Room

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

@api_view(['GET'])
def getChat(request):
    chats = RoomChats.objects.all()
    serializer = RoomChatSerializer(chats, many=True)
    
    return Response(serializer.data)

@api_view(['POST'])
def postChat(request):
   
    serializer = RoomChatSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    

    return Response(serializer.data)
    




