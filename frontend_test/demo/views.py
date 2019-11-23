from rest_framework.views import APIView
from rest_framework.response import Response
import os
import base64
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT = BASE_DIR + '/static/img/'

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
        ]
        return Response(ls)


class OutcomeView(APIView):
    def get(self, request):
        dict = {
            'username': 'nowhere',
            'score': 90,
            'rank': 1,
            'previous': 'dyht',
            'bgsrc': []
        }
        with open(ROOT + 'dyht/bg1.png', 'rb') as f:
            base64_data = base64.b64encode(f.read())
            s = base64_data.decode()
            str1 = 'data:image/jpeg;base64,%s' % s
        with open(ROOT + 'dyht/bg2.png', 'rb') as f:
            base64_data = base64.b64encode(f.read())
            s = base64_data.decode()
            str2 = 'data:image/jpeg;base64,%s' % s
        with open(ROOT + 'dyht/bg3.png', 'rb') as f:
            base64_data = base64.b64encode(f.read())
            s = base64_data.decode()
            str3 = 'data:image/jpeg;base64,%s' % s
        dict['bgsrc'] = [str1, str2, str3]
        return Response(dict)


class ImgView(APIView):
    def get(self, request):
        ret = {
            'bgsrc': '',
            'textsrc': ''
        }
        with open(ROOT + 'dyht-bg.png', 'rb') as f:
            base64_data = base64.b64encode(f.read())
            s = base64_data.decode()
            str = 'data:image/jpeg;base64,%s' % s
        ret['bgsrc'] = str
        with open(ROOT + 'dyht-text.png', 'rb') as f:
            base64_data = base64.b64encode(f.read())
            s = base64_data.decode()
            str = 'data:image/jpeg;base64,%s' % s
        ret['textsrc'] = str
        return Response(ret)
