from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User

from django.http import JsonResponse

import json
from hashlib import pbkdf2_hmac
import requests
import os


def getAuthToken(username, password):
    data = {
        "username": username,
        "password": password
    }

    response = requests.post("http://127.0.0.1:8000/api/getAuthToken/", data=data)
    response = response.json()

    return response["access"], response["refresh"]



#View to create custom tokens with user information
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Gives users first name in the access token
        token['name'] = user.first_name


        return token

#For converting Django data types into javascript readable data
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


#View allows user to signup for website and data goes to database
@api_view(["POST"])
def postUser(request):
    #Collect json data from frontend and add user to database
    b_form = request.body
    str_json = b_form.decode("utf8").replace("'",'"')

    print(str_json)

    form_data = json.loads(str_json)
    form_data = form_data["formData"]

    print(form_data)

    first_name = form_data["first_name"]
    last_name = form_data["last_name"]
    email = form_data["email"]
    raw_password = form_data["raw_password"]

    #Send form data to database to signup user and also encrypts password
    user = User.objects.create_user(username=email, email=email, password=raw_password, first_name=first_name, last_name=last_name)
    user.save()

    #Save user attributes here



    #Get Authentication Tokens to login and verify new user
    access, refresh = getAuthToken(email, raw_password)

    response = {"authToken": access, "refreshToken": refresh}
    print(response)

    return JsonResponse(response)


#NOTE -> in DB email/username is meant to be unique so duplicate emails will trigger a 1062 Duplicate entry