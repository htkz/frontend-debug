# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from app import models

# Register your models here.
admin.site.register(models.Node)
admin.site.register(models.WorkLoad)
admin.site.register(models.Link)
admin.site.register(models.Element)
admin.site.register(models.DataStructure)
admin.site.register(models.Model)
