from django.db import models


# Create your models here.
class Register_parts(models.Model):
    username = models.CharField(max_length=12, unique=True)
    userpwd = models.CharField(max_length=16)
    # verify_code = models.CharField(max_length=5)

    time_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

    class Meta:
        ordering = ["-time_posted"]
        verbose_name = "用户"
        verbose_name_plural = "用户"
