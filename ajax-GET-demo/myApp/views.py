from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'index.html')


def ajax(request):
    res = request.GET.get("req")
    return HttpResponse(res)
