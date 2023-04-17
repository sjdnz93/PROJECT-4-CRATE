from django.db import models
from django.core.validators import URLValidator

# Create your models here.

class Record(models.Model):
    album = models.CharField(max_length=100, unique=True)
    artist = models.CharField(max_length=100)
    genre = models.CharField(max_length=50)
    release_year = models.CharField()
    album_art = models.URLField(validators=[URLValidator()])

    def __str__(self):
        return f'{self.artist} - {self.album}'