from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return render(request, 'index.html')


def ajax(request):
    if request.method == 'POST':
        res = request.POST.get("req")
        return HttpResponse(res)
    elif request.method == 'GET':
        return HttpResponse('method: get')


def ajax1(request):
    if request.method == 'POST':
        res = request.POST.get("req", 'fuck')

        return HttpResponse(res)
    elif request.method == 'GET':
        return HttpResponse('fuck you, mother fucker!')
