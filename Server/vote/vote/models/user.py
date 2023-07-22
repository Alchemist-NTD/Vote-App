from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.EmailField(unique=True, default="example@zinza.com.vn")
    password= models.CharField(max_length=1024, default="1")
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'{self.id}_{self.username}'