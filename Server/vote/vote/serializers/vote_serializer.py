from rest_framework import serializers
from ..models import *


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteContext
        fields = '__all__'
