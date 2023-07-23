from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status
from rest_framework.response import Response
from django.http import HttpResponse
import os, time, json, random
from django.http import JsonResponse, HttpResponseBadRequest
from ..models import *
from ..serializers import *


class VoteUpdate(generics.UpdateAPIView):
    queryset = Vote.objects.all()
    serializer = VoteSerializer
    permission_classes = [IsAuthenticated]
    
    def put(self, request):
        try:
            vote_context = VoteContext.objects.filter(id=request.data['vote_context']).last()
            vote_sequence = request.data['vote_sequence']
            vote = Vote.objects.filter(user=request.user, vote_context=vote_context).last()
            vote.vote_sequence = vote_sequence
            vote.save()
        except Exception as e:
            return HttpResponseBadRequest(str(e))
        return Response(status=200)