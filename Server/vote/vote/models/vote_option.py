from django.db import models
from .vote_context import VoteContext


class VoteOption(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=1024, default="")
    vote_context = models.ForeignKey(VoteContext, on_delete=models.CASCADE, to_field='id', default=999999)