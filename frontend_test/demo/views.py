from rest_framework.views import APIView
from rest_framework.response import Response


class RankView(APIView):
    def get(self, request):
        ls = [
            {"username": "nowhere", "score": 99},
            {"username": "Luna", "score": 100},
            {"username": "Luna", "score": 100},
            {"username": "Luna", "score": 100},
            {"username": "Luna", "score": 100},
            {"username": "Luna", "score": 100},
            {"username": "Luna", "score": 100},
            {"username": "Luna", "score": 100},
            {"username": "Luna", "score": 100},
            {"username": "Luna", "score": 100},
            {"username": "Luna", "score": 100},
            {"username": "Luna", "score": 100},
            {"username": "Luna", "score": 100},
        ]
        return Response(ls)
