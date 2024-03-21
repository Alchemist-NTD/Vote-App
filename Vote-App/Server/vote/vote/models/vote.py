from django.db import models
from .user import User
from .vote_context import VoteContext
from django.contrib.postgres.fields import ArrayField


class Vote(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', default=0)
    vote_context = models.ForeignKey(VoteContext, on_delete=models.CASCADE, to_field='id', default=0)
    vote_sequence = ArrayField(models.IntegerField(default=0))