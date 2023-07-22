from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status
from rest_framework.response import Response
from django.http import HttpResponse
import os, time, json, random
from django.http import JsonResponse, HttpResponseBadRequest
from ..models import *
from ..serializers import *


class ViewContextCreate(generics.CreateAPIView):
    queryset = VoteContext.objects.all()
    serializer_class = VoteContextSerializer
    permission_classes = [AllowAny | IsAuthenticated]
    
    def post(self, request):
        
        pass