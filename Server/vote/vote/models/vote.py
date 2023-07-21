from django.db import models
from .user import User
from .vote_option import VoteOption


class Vote(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', default=999999)
    vote_option = models.ForeignKey(VoteOption, on_delete=models.CASCADE, to_field='id', default=1)
    
    class Meta:
        unique_together = ('user', 'vote_option')