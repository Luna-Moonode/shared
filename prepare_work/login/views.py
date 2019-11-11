from django.shortcuts import render, redirect
from django.http import HttpResponse
from login.models import models


# Create your views here.
# HomePage, waiting God Mi to improve.
def home(request):
    return render(request, "homepage.html")

# Login page defined.
def Logincheck(request):
    if request.method == "POST":
        Login()
    if request.method == "GET":
        return render(request, "login.html")

# Unjusted.
def Login():
    return 0


# Password check
def pwd_check(pwd, i = 0):
    import re
    num = re.findall(r'[0-9]', pwd)
    if num:
        i += 1
    alphabet = re.findall(r'[a-z]', pwd)
    if alphabet:
        i += 1
    return i


# Register Page, iframe used to show whether successfully operated.
def register_check(request):
    import json
    if request.method == "POST":
        username = request.POST.get("username", None)
        userpwd_origin = request.POST.get("password", None)
        userpwd_confirm = request.POST.get("passwordConfirm", None)
        username_long = len(username)
        # sex = request.POST.get("sex", "男")
        # username_strength
        a =  pwd_check(username)
        b =  pwd_check(userpwd_origin)
        if userpwd_confirm == userpwd_origin:
            password_confirm = '1'
        else:
            password_confirm = '0'
        if 6<=username_long<=12:
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
        responnse = {
            "username_length": username_length,
            "password_confirm": password_confirm,
            "username-format": username_strength,
            "password-format": password_strength,
                # "sex": sex
        }
        return HttpResponse(json.dumps(responnse))


def register_failed(request):
    return redirect("../../login")




def register_succeed(request):
    if request.method =="POST":
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

        if password_confirm ==1 and username_length ==1 and username_strength ==1 and password_strength ==1:
            return 0
            # register into sqlite3
        else:
            register_failed
    register_successfully
def register_successfully(request):
    return render(request,"success.html")


