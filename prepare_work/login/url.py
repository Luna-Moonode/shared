from django.urls import path
from . import views

urlpatterns = [
    path('', views.Logincheck),
    path('register/', views.register_check),
    path('register-fail/', views.register_failed),
    path('register-succeed/', views.register_succeed),
    path('registersuccessfully', views.register_successfully)
]
