from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


from rest_framework.response import Response 
from rest_framework.decorators import api_view

from rest_framework import status
from rest_framework.response import Response

import json
from hashlib import pbkdf2_hmac
import os
import requests


#Deprecated Right Now
def encrypt_password(password):
    our_app_iters = 1_000_000  # Application specific, read above.
    dk = pbkdf2_hmac('sha256', password.encode('utf-8'), b'bad354hdf;// saltae'*2, our_app_iters)
    return dk.hex()


def get_authtoken(username, password):
    response = requests.post('http://127.0.0.1:8000/api/token/', data={"username": username,"password": password})
    response = response.json()
    return response["access"], response['refresh']


#TODO: Clean up post_user 
# -> add form cleaners
# -> add responses and error points throughout the code

@api_view(["GET","POST"])
def post_user(request):

    #Collect request from user from axios post request on frontend
    b_form = request.body
    str_json = b_form.decode('utf8').replace("'", '"')

    form_data = json.loads(str_json)
    form_data = form_data['formData']

    print(form_data)
    first_name = form_data['first_name']
    last_name = form_data['last_name']
    email = form_data['email']
    raw_password = form_data['password']


    #create_user already hashes password
    #encrypted_password = make_password(raw_password)

    #Take form data (only the necessary auth info ) and save it to the auth_user table (pre made table and inserts by django)
    user = User.objects.create_user(username=email, email=email, password=raw_password, first_name=first_name, last_name=last_name)
    user.save()

    access, refresh = get_authtoken(email, raw_password)


    response_package = {"authToken": access, "refreshToken": refresh}


    return JsonResponse(response_package)