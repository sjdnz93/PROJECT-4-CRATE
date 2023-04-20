from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import URLValidator

# Create your models here.

class User(AbstractUser):
    email = models.CharField(max_length=50)
    profile_image = models.URLField(validators=[URLValidator()], blank=True)
    favourite_album = models.CharField(max_length=100, blank=True)
    favourite_genre = models.CharField(max_length=100, blank=True)
    collection = models.ManyToManyField('records.Record', related_name='record_collection', blank=True)
    wishlist = models.ManyToManyField('records.Record', related_name='record_wishlist', blank=True)
    following = models.ManyToManyField('users.User', related_name='follow_id', blank=True)