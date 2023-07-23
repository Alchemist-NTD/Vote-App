from rest_framework_simplejwt.tokens import RefreshToken


class JWTService:
    @staticmethod
    def generate_token(user) -> RefreshToken:
        return RefreshToken.for_user(user)