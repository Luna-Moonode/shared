from django.urls import path

from . import views

urlpatterns = [
    path('', views.Logincheck),
    path('try/',views.login_check),
    path('register/', views.register_check),
    path('register-fail/', views.register_failed),
    path('register-try/', views.register_try),
    path('registersuccessfully', views.register_successfully)
]
