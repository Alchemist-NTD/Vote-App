from rest_framework import serializers

_all_ = ("GoogleOAuthCallbackRequestData", "GoogleOAuthResponseData")


class LoginRequestData(serializers.Serializer):
    id_token = serializers.CharField(required=True)


class LoginResponseData(serializers.Serializer):
    access_token = serializers.CharField(required=True)
    refresh_token = serializers.CharField(required=True)