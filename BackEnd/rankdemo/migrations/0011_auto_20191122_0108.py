# Generated by Django 2.2.7 on 2019-11-22 01:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rankdemo', '0010_rank_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rank',
            name='date',
            field=models.CharField(max_length=16),
        ),
    ]
