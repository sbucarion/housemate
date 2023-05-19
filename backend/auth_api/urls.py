from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    path("getAuthToken/", views.MyTokenObtainPairView.as_view(), name="user_tokens"), #Allows us to return custom info in the access token
    path("getRefreshToken/", TokenRefreshView.as_view(), name="user_refresh_tokens"),

    path("postUser/", views.postUser, name="signup_user")
]