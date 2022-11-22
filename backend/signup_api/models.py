from django.db import models
from django.conf import settings
from dateutil.relativedelta import relativedelta
from datetime import date
#User pref model here since this is signup api so we have it here since user puts data in for the api


class user_attributes(models.Model):
    class Meta:
        db_table = "user_attributes"

    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)

    city_location = models.CharField(max_length=100)
    state_location = models.CharField(max_length=100)
    more_specific_location = models.CharField(max_length=100)

    max_rent = models.IntegerField()

    date_of_birth = models.DateField()

    user_gender = models.CharField(max_length=20)
    roomate_gender = models.CharField(max_length=20)
