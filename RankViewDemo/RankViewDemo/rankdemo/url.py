from rest_framework.urls import url
from . import views

urlpatterns =[
    url(r'^$', views.RankView.as_view()),
    url(r'^test/$', views.QianShiView.as_view())
]