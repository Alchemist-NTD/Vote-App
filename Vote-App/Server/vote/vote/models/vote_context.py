from django.db import models
from django.contrib.postgres.fields import ArrayField
from .user import User


class VoteContext(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', default=0)
    title = models.CharField(max_length=1024, default="")
    options = ArrayField(models.CharField(max_length=1024, default=""))
    is_multiple_vote_context = models.BooleanField(default=False)
    allow_create_extra_ops = models.BooleanField(default=False)
    date_expired = models.DateTimeField(null=True)