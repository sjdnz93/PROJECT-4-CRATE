from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Review(models.Model):
    record = models.ForeignKey(
        'records.Record',
        on_delete=models.CASCADE,
        related_name='reviews',
        default=1
    )
    owner = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='reviews',
        default=1
    )
    review_text = models.CharField(default=0, max_length=25)
    rating = models.IntegerField(default=0, validators=[MaxValueValidator(5), MinValueValidator(1)])
