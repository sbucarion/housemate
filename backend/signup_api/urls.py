from django.urls import path
from . import views
from .views import post_user

urlpatterns = [
    path('post_user', post_user, name="post_user"),
]