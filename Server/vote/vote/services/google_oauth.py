import requests
from google.auth.transport.requests import Request as GoogleAuthRequest
from google.oauth2.id_token import verify_oauth2_token


class GoogleOauthService:
    google_auth_request = GoogleAuthRequest()

    @classmethod
    def get_google_user(cls, id_token):
        idinfo = verify_oauth2_token(
            id_token,
            cls.google_auth_request,
        )
        return idinfo