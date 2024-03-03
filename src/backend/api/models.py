from django.db import models

# Create your models here.

class EventModel(models.Model):
    event_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    event_category = models.CharField( max_length=50)
    description=models.TextField()
    venue=models.TextField()
    date=models.DateField()

from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.


class User(AbstractUser):
    phone_number = models.CharField(max_length=15)

    def _str_(self):
        return f"{self.pk}, {self.phone_number}"



class UserModel(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    confirm_password = models.CharField(max_length=255)
    terms_and_conditions = models.BooleanField(default=False)
