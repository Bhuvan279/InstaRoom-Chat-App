from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('getChat/', views.getChat, name='get-chats'),
    path('postChat/', views.postChat, name='post-chats')
]