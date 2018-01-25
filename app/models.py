# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib import admin

class AuthorAdmin(admin.ModelAdmin):
    empty_value_display = '-empty-'



class Node(models.Model):
    nodeId = models.CharField(max_length=64, primary_key=True)
    name = models.CharField(max_length=64, null=True,)
    location = models.CharField(max_length=64, null=True,)
    prev = models.CharField(max_length=64, null=True,)
    next = models.CharField(max_length=64, null=True,)
    fanout = models.CharField(max_length=64, null=True,)
    fanout_value = models.CharField(max_length=64, null=True,)
    partitioning = models.CharField(max_length=64, null=True,)
    partitioning_value = models.CharField(max_length=64, null=True,)
    filtersPerLevel = models.CharField(max_length=64, null=True)
    filtersPerRun = models.CharField(max_length=64, null=True)
    initialRunSize = models.CharField(max_length=64, null=True,)
    maxRunsPerLevel = models.CharField(max_length=64, null=True,)
    mergeFactor = models.CharField(max_length=64, null=True,)
    sorted = models.CharField(max_length=64, null=True,)
    direct_addressing = models.CharField(max_length=64, null=True)
    head  = models.CharField(max_length=64, null=True)
    tail = models.CharField(max_length=64, null=True)
    prevLinks = models.CharField(max_length=64, null=True,)
    nextLinks = models.CharField(max_length=64, null=True,)
    skiplinks = models.CharField(max_length=64, null=True,)
    skiplinks_value = models.CharField(max_length=64, null=True,)
    zonemapmax = models.CharField(max_length=64, null=True,)
    zonemapmin = models.CharField(max_length=64, null=True,)
    bloomFilters = models.CharField(max_length=64, null=True,)
    bloomFilters_value  = models.CharField(max_length=64, null=True,)
    hasFunctionsNumber = models.IntegerField(null=True)
    numberOfBits = models.IntegerField(null=True)
    keyRetention = models.CharField(max_length=64, null=True,)
    keyRetention_value = models.CharField(max_length=64, null=True,)
    keyRetentionFunction = models.CharField(max_length=64, null=True,)
    keyRetentionFunction_value = models.CharField(max_length=64, null=True,)
    valueRetention = models.CharField(max_length=64, null=True,)
    valueRetention_value = models.CharField(max_length=64, null=True,)
    valueRetentionFunction = models.CharField(max_length=64, null=True,)
    valueRetentionFunction_value = models.CharField(max_length=64, null=True,)
    capacity = models.CharField(max_length=64, null=True,)
    capacity_value = models.IntegerField(null=True)
    Utilization = models.CharField(max_length=64, null=True,)
    Utilization_value = models.CharField(max_length=64, null=True,)
    linksLayout = models.CharField(max_length=64, null=True,)
    filtersLayout = models.CharField(max_length=64, null=True,)
    keyValueLayout = models.CharField(max_length=64, null=True,)
    accessPartitions = models.CharField(max_length=64, null=True,)
    validSubs = models.CharField(max_length=64, null=True,)
    position_x = models.IntegerField(null=True)
    position_y = models.IntegerField(null=True)
    def __str__(self):
        return self.name


class Link(models.Model):
    linkId = models.CharField(max_length=64, primary_key=True)
    sourceId = models.CharField(max_length=64, null=True)
    # sourcePort = models.CharField(max_length=64, null=True)
    targetId = models.CharField(max_length=64, null=True)
    # targetPort = models.CharField(max_length=64, null=True)
    text = models.CharField(max_length=64, null=True)



class WorkLoad(models.Model):
    nodeId = models.CharField(max_length=64, primary_key=True)
    put = models.IntegerField(null=True, blank=True)
    get = models.IntegerField(null=True, blank=True)
    range = models.IntegerField(null=True, blank=True)
    position_x = models.IntegerField(null=True)
    position_y = models.IntegerField(null=True)
    def __str__(self):
        return self.nodeId



class Element(models.Model):
    nodeId = models.CharField(max_length=64, primary_key=True)
    name = models.CharField(max_length=64, null=True, blank=True)
    prev = models.CharField(max_length=64, null=True, blank=True)
    next = models.CharField(max_length=64, null=True, blank=True)
    fanout = models.CharField(max_length=64, null=True, blank=True)
    fanoutFixedValue = models.IntegerField(null=True, blank=True)
    fanoutFunction = models.CharField(max_length=64, null=True, blank=True)
    partitioning = models.CharField(max_length=64, null=True, blank=True)
    partitioningFunction = models.CharField(max_length=64, null=True, blank=True)
    filtersPerLevel = models.CharField(max_length=64, null=True, blank=True)
    filtersPerRun = models.CharField(max_length=64, null=True, blank=True)
    initialRunSize = models.IntegerField(null=True, blank=True)
    maxRunsPerLevel = models.IntegerField(null=True, blank=True)
    mergeFactor = models.IntegerField(null=True, blank=True)
    sorted = models.CharField(max_length=64, null=True, blank=True)
    directAddressing = models.CharField(max_length=64, null=True, blank=True)
    head = models.CharField(max_length=64, null=True, blank=True)
    tail = models.CharField(max_length=64, null=True, blank=True)
    prevLinks = models.CharField(max_length=64, null=True, blank=True)
    nextLinks = models.CharField(max_length=64, null=True, blank=True)
    skiplinks = models.CharField(max_length=64, null=True, blank=True)
    skiplinksProbability = models.IntegerField(null=True, blank=True)
    zoneMapMax = models.CharField(max_length=64, null=True, blank=True)
    zoneMapMin = models.CharField(max_length=64, null=True, blank=True)
    bloomFilters = models.CharField(max_length=64, null=True, blank=True)
    HashFunctionsNum = models.IntegerField(null=True, blank=True)
    NumOfBits = models.IntegerField(null=True, blank=True)
    keyRetention = models.CharField(max_length=64, null=True, blank=True)
    keyRetentionCompression = models.CharField(max_length=64, null=True, blank=True)
    keyRetentionFunction = models.CharField(max_length=64, null=True, blank=True)
    valueRetention = models.CharField(max_length=64, null=True, blank=True)
    valueRetentionCompression = models.CharField(max_length=64, null=True, blank=True)
    valueRetentionFunction = models.CharField(max_length=64, null=True, blank=True)
    capacity = models.CharField(max_length=64, null=True, blank=True)
    capacityValue = models.IntegerField(null=True, blank=True)
    capacityFunction = models.CharField(max_length=64, null=True, blank=True)
    Utilization = models.CharField(max_length=64, null=True, blank=True)
    UtilizationFunction = models.CharField(max_length=64, null=True, blank=True)
    linksLayout = models.CharField(max_length=64, null=True, blank=True)
    filtersLayout = models.CharField(max_length=64, null=True, blank=True)
    keyValueLayout = models.CharField(max_length=64, null=True, blank=True)
    accessPartitions = models.CharField(max_length=64, null=True, blank=True)
    # position_x:300,
    # position_y:000,
    color= models.CharField(max_length=64, null=True)
    shortName = models.CharField(max_length=2, null=True)
    def __str__(self):
        return self.name

class DataStructure(models.Model):
    name = models.CharField(max_length=64, primary_key=True)
    value = models.TextField(null=True, blank=True)
    picture = models.ImageField(upload_to = 'app/static/img/data_structure_img/',
        default = 'app/static/img/data-structure-img/no-img.jpg')
    def __str__(self):
        return self.name


class Model(models.Model):
    name = models.CharField(max_length=64, primary_key=True)
    spec = models.TextField(null=True, blank=True)
    model = models.TextField(null=True, blank=True)
    def __str__(self):
        return self.name
