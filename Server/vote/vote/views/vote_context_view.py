from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status
from rest_framework.response import Response
from django.http import HttpResponse
import os, time, json, random
from django.http import JsonResponse, HttpResponseBadRequest
from ..models import *
from ..serializers import *
import matplotlib.pyplot as plt
import matplotlib
import numpy as np
import io, json
from PIL import Image
from textwrap import wrap


class VoteContextCreate(generics.CreateAPIView):
    queryset = VoteContext.objects.all()
    serializer_class = VoteContextSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            serializers = self.serializer_class(data=self.request.data)
            serializers.is_valid(raise_exception=True)
            serializers.validated_data['user'] = request.user
            vote_context = VoteContext.objects.create(**serializers.validated_data)
            vote_context.save()
            
            all_users = User.objects.all()
            votes_init = Vote.objects.bulk_create(
                [
                    Vote(user=user, vote_context=vote_context, vote_sequence=[0 for i in range(len(vote_context.options))])
                    for user in all_users
                ]
            )
            serializers.validated_data['user'] = serializers.validated_data['user'].id
            return Response(status=200, data=serializers.validated_data)
        except Exception as e:
            return HttpResponseBadRequest(str(e))


class VoteContextRetrieve(generics.RetrieveAPIView):
    queryset = VoteContext.objects.all()
    serializer_class = VoteContextSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        vote_context = VoteContext.objects.filter(id=pk).last()
        vote = Vote.objects.filter(user=request.user, vote_context=vote_context).last()
        
        
        return Response(status=200, data={
            'vote_context': self.serializer_class(vote_context).data,
            'vote_sequence': vote.vote_sequence
        })
        
        
class VoteContextUpdate(generics.UpdateAPIView):
    queryset = VoteContext.objects.all()
    serializer_class = VoteContextSerializer
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        try:
            vote_context = VoteContext.objects.filter(id=pk).last()
            vote_context.options.append(request.data['new_option'])
            vote_context.save()
            
            votes = Vote.objects.filter(vote_context=vote_context)
            for vote in votes:
                vote.vote_sequence.append(0)
                vote.save()
            
        except Exception as e:
            return HttpResponseBadRequest(str(e))
        
        return Response(status=200)
        
        
class VoteContextDelete(generics.DestroyAPIView):
    queryset = VoteContext.objects.all()
    serializer_class = VoteContextSerializer
    permission_classes = [IsAuthenticated]


class VoteContextList(generics.ListAPIView):
    queryset = VoteContext.objects.all()
    serializer_class = VoteContextSerializer
    permission_classes = [IsAuthenticated]
    
    
class VoteContextListPersonal(generics.ListAPIView):
    queryset = VoteContext.objects.all()
    serializer_class = VoteContextSerializer
    permission_classes = [IsAuthenticated]
        
    def get_queryset(self):
        try:
            personal_queryset = self.queryset.filter(user=self.request.user)
        except Exception as e:
            return self.queryset
        return personal_queryset
    
    
class RetrieveVoteContextStatistic1(generics.RetrieveAPIView):
    queryset = VoteContext.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = VoteContextSerializer
    
    def get(self, request, pk):
        vote_context = VoteContext.objects.filter(id=pk).last()
        votes = Vote.objects.filter(vote_context=pk)
        vote_results = np.array([vote.vote_sequence for vote in votes])
        vote_sequences = vote_results.sum(axis=0)
        
        options = vote_context.options
        options = ['\n'.join(wrap(option, 12)) for option in options]
        y_pos = np.arange(len(options))
        x_axis = vote_sequences
        
        plt.figure(figsize = (20, 15))
        plt.rcParams.update({'font.size': 22})
        
        plt.bar(y_pos, x_axis, align='center', alpha=0.5)
        plt.xticks(y_pos, options)
        plt.yticks(vote_sequences)
        plt.ylabel('Vote Count')
        plt.title(vote_context.title)
        buf = io.BytesIO()

        plt.savefig(buf, format='png')
        im = Image.open(buf)

        
        response = HttpResponse(content_type='image/png')
        im.save(response, "PNG")
        
        plt.figure().clear()
        plt.close()
        plt.cla()
        plt.clf()
        buf.flush()
        buf.close()
        
        return response