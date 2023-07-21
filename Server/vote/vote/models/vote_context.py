from django.db import models


class VoteContext(models.Model):
    title = models.CharField(max_length=1024, default="")
    id = models.AutoField(primary_key=True)