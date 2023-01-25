from django.contrib import admin
from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (

    TokenRefreshView,
)

urlpatterns = [
    path('create/', views.createUsers, name="create_users"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('chatroom/1/read/', views.readChatRoom, name='chat_room_read'),
    path('chatroom/1/add/', views.postChat, name='chat_room_add'),
    path('chatroom/1/update/<str:pk>/', views.updateChat, name='chat_update'),
    path('chatroom/1/delete/<str:pk>/', views.deleteChat, name='chat_delete'),

    path('rooms/view/',  views.readRooms, name='read-rooms'),
    path('rooms/create/',  views.createRooms, name='create-room'),
    path('rooms/delete/<str:pk>/',  views.deleteRooms, name='delete-room'),

    path('members/view/', views.getMembers, name='get-members'),
    path('members/add/', views.addMember, name='add-member'),
    path('members_rooms/view/<str:pk>/', views.membersRoom, name='members-rooms'),

    path('member/join_room/<str:code>/', views.joinRoom, name='join-room'),

    path('rooms/view_code/<str:pk>/',  views.getRoomCode, name='get-room-code'),

    path('room/getChats/<str:pk>/', views.getChats, name='get-chats'),
    path('room/postChats/<str:pk>/', views.postChats, name='post-chats'),
    
]
