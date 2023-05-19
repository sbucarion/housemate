import requests
import os
import json

def getAuthTokenTest(username, password):
    os.system('cls' if os.name == 'nt' else 'clear') #Clear cmd line to make test results more readable

    data = {
        "username": username,
        "password": password
    }

    response = requests.post("http://127.0.0.1:8000/api/getAuthToken/", data=data)
    response = response.json()

    print("ACCESS TOKEN TEST: ", response)
    print("\n")

    return response["refresh"]

def getRefreshTokenTest(refresh):
    data = {
        "refresh": refresh
    }

    response = requests.post("http://127.0.0.1:8000/api/getRefreshToken/", data=data)
    response = response.json()

    print("REFRESH TEST: ", response)


def postUserTest(first_name, last_name, email, password):
    data = {
        "formData": {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "raw_password": password
        }
    }

    #IDK why we need to convert this to json and not the other tests
    json_object = json.dumps(data, indent = 4) 

    response = requests.post("http://127.0.0.1:8000/api/postUser/", data=json_object, headers={"Content-Type": "application/json"})
    response = response.json()

    print("SIGNUP TEST: ", response)


refresh_token = getAuthTokenTest("admin", "123")
# getRefreshTokenTest(refresh_token)

#postUserTest("DUMMY", "TEST", "DUMMY6@TEST.COM", "123")