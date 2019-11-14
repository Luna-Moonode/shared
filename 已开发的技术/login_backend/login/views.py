from django.http import HttpResponse
from django.shortcuts import render

from login.models import models, Register_parts


# Create your views here.
# HomePage, waiting God Mi to improve.
def home(request):
    return render(request, "homepage.html")


# Login page defined.
def Logincheck(request):
    if request.method == "GET":
        return render(request, "login.html")


# Password check
def pwd_check(pwd):
    import re
    num = re.findall(r'[0-9]', pwd)
    alphabet = re.findall(r'[a-z]', pwd)
    if alphabet and num:
        return 2


# Register Page, iframe used to show whether successfully operated.
def register_check(request):
    import json
    if request.method == "POST":
        username = request.POST.get("username", None)
        userpwd_origin = request.POST.get("password", None)
        userpwd_confirm = request.POST.get("passwordConfirm", None)
        username_occupation =''
        password_confirm = ''
        username_strength = ''
        password_strength = ''
        try:
            user = Register_parts.objects.get(username=username)
        except:
            user = None
        if username is not None:
            username_long = len(username)
            # sex = request.POST.get("sex", "男")
            # username_strength
            a = pwd_check(username)
            if 6 <= username_long <= 12:
                username_length = '1'
            else:
                username_length = '0'
            if a == 2 and username_length == "1":
                username_strength = '1'
            else:
                username_strength = '0'
            if user:
                username_occupation = '0'
            else:
                username_occupation = '1'
        if userpwd_origin is not None:
            b = pwd_check(userpwd_origin)
            c = len(userpwd_origin)
            if 6<c<12:
                password_length = "1"
            else:
                password_length = "0"
            if b == 2 and password_length == "1":
                password_strength = '1'
            else:
                password_strength = '0'
        if userpwd_confirm is not None:

            if userpwd_confirm == userpwd_origin:
                password_confirm = '1'
            else:
                password_confirm = '0'
        print(userpwd_origin)
        print(userpwd_confirm)


        response = {
                "username_occupation": username_occupation,
                "password_confirm": password_confirm,
                "username_format": username_strength,
                "password_format": password_strength,

                # "sex": sex
            }
        return HttpResponse(json.dumps(response))


def register_failed(request):
    return HttpResponse("fail to register")


def register_try(request):
    if request.method == "POST":
        username = request.POST.get("username", None)
        userpwd_origin = request.POST.get("password", None)
        userpwd_confirm = request.POST.get("passwordConfirm", None)
        username_long = len(username)
        a = pwd_check(username)
        b = pwd_check(userpwd_origin)
        if userpwd_confirm == userpwd_origin:
            password_confirm = '1'
        else:
            password_confirm = '0'
        if 6 <= username_long <= 12:
            username_length = '1'
        else:
            username_length = '0'
        if a == 2:
            username_strength = '1'
        else:
            username_strength = '0'
        if b == 2:
            password_strength = '1'
        else:
            password_strength = '0'

        if password_confirm == '1' and username_length == '1' and username_strength == '1' and password_strength == '1':

            db = Register_parts()
            db.username = username
            db.userpwd = userpwd_origin

            db.save()

            # register into sqlite3

            # register into sqlite3
        else:
            return HttpResponse("valueerror")
    return HttpResponse("succeed")


def register_successfully(request):
    return render(request, "success.html")


def login_check(request):
    if request.method == "POST":
        username = request.POST.get("username", None)
        userpwd = request.POST.get("userpwd", None)
        if username and userpwd:
            try:

                a = Register_parts.objects.get(username=username)

            except:
                return HttpResponse("Not registered")
            if userpwd == a.userpwd:
                return HttpResponse("Damn! We finally got you!")
