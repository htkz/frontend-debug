# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-31 18:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_datastructure_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datastructure',
            name='picture',
            field=models.ImageField(default='img/data_structure_img/no-img.jpg', upload_to='img/data_structure_img/'),
        ),
    ]
