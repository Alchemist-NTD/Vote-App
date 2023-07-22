from rest_framework import serializers
from ..models import *


class VoteContextSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteContext
        fields = '__all__'
        extra_kwargs = {
            'date_expired': {'required': False},
        }