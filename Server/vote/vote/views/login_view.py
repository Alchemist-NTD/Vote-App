from django.conf import settings
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN
from rest_framework.views import APIView

from ..models import User
from ..serializers import LoginRequestData
from ..services.google_oauth import GoogleOauthService
from ..services.jwt import JWTService


class Login(APIView):
    authentication_classes = []

    def post(self, request: Request):
        data = request.data

        # validate
        serializer = LoginRequestData(data=data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        id_token = validated_data.get("id_token")

        idinfo = GoogleOauthService.get_google_user(id_token)

        # get google idinfo
        email = idinfo["email"]
        
        users = User.objects.filter(email=email)
        if len(users) == 0:
            return Response(status=HTTP_403_FORBIDDEN)

        refresh_token = JWTService.generate_token(users.first())
        
        response = Response(
            status=HTTP_200_OK, 
            data={
            'refresh': str(refresh_token),
            'access': str(refresh_token.access_token)
            }
        )
        return response