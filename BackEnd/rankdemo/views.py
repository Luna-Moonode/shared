import re
from rest_framework.views import APIView
from .models import Rank
# from django.http import HttpResponse
from rest_framework.response import Response
import datetime
from .serializers import RankSerializers

# Create your views here.
import os
import base64
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT = BASE_DIR + '/static/img/'


class RankView(APIView):

    def get(self, request, *args, **kwargs):
        ret = {
            "code": 404,
            "msg": "failed"
        }
        today = datetime.date.today()
        data = Rank.objects.filter(date=today).order_by('-score')
        ser = RankSerializers(instance=data, many=True)
        if data:
            return Response(ser.data)
        else:
            return Response(ret)

    def post(self, request, *args, **kwargs):

        db = Rank()
        ret={
            'code':500,
            'msg':'Same Name Error'
        }
        username = request._request.GET.get("username", None)
        score = request._request.GET.get("score", None)
        try:
            bad = re.compile("[^\u4e00-\u9fa5^a-z^A-Z^0-9^']")
            username = bad.sub('', username)
        except:
            return Response({'code':500, 'msg':'Bad Value'})
        score = int(score)
        try:
            user = Rank.objects.get(username=username)
            if user:
                return Response(ret)
        except:
            pass
        date = datetime.date.today()
        db.username = username
        db.score = score
        db.date = date

        stuff = {
            'username': username,
            'score': score,
            'date': date,
        }
        db.save()

        c = Rank.objects.filter(date = date).order_by('-score')
        for e,f in enumerate(c):
            rank = str(e+1)
            h = f.username
            if h == username:
                return Response({"code": 200, "msg1": "succeeded",'msg':stuff, 'rank':rank})
        return Response({'code':404,'msg':'failed'})

class QianShiView(APIView):

    def get(self, request, *args, **kwargs):
        import datetime
        username = request._request.GET.get('username', None)
        user_rank = 66
        if username:
            try:
                msg = Rank.objects.filter(username = username, date=datetime.date.today())
                score = list(msg.values('score')[0].values())[0]

            except:
                return Response({'code':404, 'msg':'no username match'})
            c = Rank.objects.filter(date=datetime.date.today()).order_by('-score')
            for e, f in enumerate(c):
                rank = str(e + 1)
                h = f.username
                if h == username:
                    user_rank = rank
            previous = 'dyht'
            base64_str_list = []

            with open(ROOT +'dyht/' + '1.png', 'rb') as f:
                base64str1 = base64.b64encode(f.read()).decode()
                base64str = 'data:image/jpeg;base64,%s' % base64str1
                base64_str_list.append({'background': base64str})
            with open(ROOT +'dyht/'+ 'bg1.png', 'rb') as f:
                base64str1 = base64.b64encode(f.read()).decode()
                base64str = 'data:image/jpeg;base64,%s' % base64str1
                base64_str_list.append({'text': base64str})
            response = {
                'username':username,
                'score':score,
                'rank':user_rank,
                'previous':previous,
                'bgsrc':base64_str_list,
            }
            return Response(response)
