# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.views.decorators.csrf import csrf_exempt

from django.shortcuts import render, render_to_response
from django.http import HttpResponse, JsonResponse
from app.models import *
from django.core import serializers
import pydesignengine as de
import threading


import json
import json as js
import pickle
import yaml

# used for db
db_manage = False
# db_manage = True

# def index(request):
#     return render(request, 'index.html')
#
#
# def test(request):
#     count = request.session['counter']
#     count += 1
#     request.session['counter'] = count
#     with open("app/files/test_ns_"+str(count)+".pickle") as f:
#         nodeStructure = pickle.load(f)
#     with open("app/files/test_ni_"+str(count)+".pickle") as f:
#         nodeInformation = pickle.load(f)
#     request.session['nodeStructure'] = nodeStructure
#     request.session['nodeInformation'] = nodeInformation
#     return HttpResponse(json.dumps((nodeStructure, nodeInformation)))

# def showStructure(request):
#     print json.dumps((request.session['nodeStructure'], request.session['nodeInformation']))
#     return HttpResponse(json.dumps((request.session['nodeStructure'], request.session['nodeInformation'])))
#
# def start(request):
#     request.session['nodeStructure'] = json.loads(request.GET['nodeStructure'])
#     request.session['nodeInformation'] = json.loads(request.GET['nodeInformation'])
#     request.session['counter'] = 0
#     # f_ns =  open('app/files/test_ns_4.pickle','wb')
#     # f_ni =  open('app/files/test_ni_4.pickle','wb')
#     # pickle.dump(json.loads(request.GET['nodeStructure']),f_ns)
#     # pickle.dump(json.loads(request.GET['nodeInformation']),f_ni)
#     # f_ns.close()
#     # f_ni.close()
#     #TODO handle the nodeStructure and nodeInformation
#     return HttpResponse("start")
#
# def html(request, filename):
#     return render(request, filename)

def tomainpage(request):
    all_nodes = serializers.serialize("json", Node.objects.all())
    all_workloads = serializers.serialize("json", WorkLoad.objects.all())
    all_links = serializers.serialize("json", Link.objects.all())
    all_elements = serializers.serialize("json", Element.objects.all())
    all_datastructrues = serializers.serialize("json", DataStructure.objects.all())

    context = {
        'workLoad': all_workloads,
        'nodes': all_nodes,
        'links': all_links,
        'elements': all_elements,
        'dataStructures': all_datastructrues,
        'dbManage': db_manage
    }


    return render(request, 'main.html',context)

def commandLine(request):
    command = request.GET['command']
    response = HttpResponse()
    if(command == "start"):
        response.writelines("run")
        return response
    else:
        return HttpResponse("unkown command: " + request.GET['command'])


# def save_to_db(request):
#     node_properties = request.POST['node_properties']
#     # workload_properties = request.POST['workload_properties']
#     link_properties = request.POST['link_properties']
#     element_properties = request.POST['element_properties']
#     datastructure_properties = request.POST['datastructure_properties']
#
#
#     if(node_properties != ''):
#         node_properties = json.loads(node_properties)
#         if(isinstance(node_properties, dict)):
#             for i in node_properties:
#                 node = node_properties[i]
#                 n = Node.objects.get_or_create(nodeId=str(i))[0]
#                 for attr in node:
#                      setattr(n, str(attr), str(node[attr]))
#                 n.save()
#
#     if(element_properties != ''):
#         element_properties = json.loads(element_properties)
#         if(isinstance(element_properties, dict)):
#             for i in element_properties:
#                 element = element_properties[i]
#                 e = Element.objects.get_or_create(nodeId=str(i))[0]
#                 for attr in element:
#                     setattr(e, str(attr), str(element[attr]))
#                 e.save()
#
#     if(datastructure_properties != ''):
#         # get rid of unicode u''
#         data_structures = yaml.safe_load(datastructure_properties)
#         if(isinstance(data_structures, dict)):
#             for i in data_structures:
#                 data_structure = data_structures[i]
#                 d = DataStructure.objects.get_or_create(name=str(i))[0]
#                 setattr(d, 'value', data_structure)
#                 d.save()
#
#     # if(workload_properties != ''):
#     #     workload_properties = json.loads(workload_properties)
#     #     if(isinstance(workload_properties, dict)):
#     #         for i in workload_properties:
#     #             workload = workload_properties[i]
#     #             w = WorkLoad.objects.get_or_create(nodeId=str(i))[0]
#     #             for attr in workload:
#     #                 setattr(w, str(attr), str(workload[attr]))
#     #             w.save()
#
#     if(link_properties != ''):
#         link_properties = json.loads(link_properties)
#         print(link_properties)
#         for link in link_properties:
#             l = Link.objects.get_or_create(linkId=link['linkId'])[0]
#             for attr in link:
#                 setattr(l, str(attr), str(link[attr]))
#             l.save()
#
#     return HttpResponse("")

# manage element

def landing_page(request):
    return render(request, 'index.html')

def delete_element_from_db(request):
    if(db_manage):
        element_id = request.GET['elementId']
        element = Element.objects.get(nodeId=element_id)
        element.delete()
    return HttpResponse("")

def add_element_to_db(request):
    if(db_manage):
        element = json.loads(request.GET['element'])
        elementId = element['elementId']
        elementInfo = element['elementInfo']

        e = Element.objects.create(nodeId=elementId)
        for attr in elementInfo:
            setattr(e, str(attr), elementInfo[attr])
        e.save()
    return HttpResponse("")

def update_element_to_db(request):
    if(db_manage):
        element = json.loads(request.GET['element'])
        elementId = element['elementId']
        elementInfo = element['elementInfo']
        e = Element.objects.get(nodeId=elementId)
        for attr in elementInfo:
            setattr(e, str(attr), elementInfo[attr])
        e.save()
    return HttpResponse("")

# manage dataStructure
def delete_datastructure_from_db(request):
    if(db_manage):
        ds_id = request.GET['dataStructureId']
        ds = DataStructure.objects.get(name=ds_id)
        ds.delete()
    return HttpResponse("")

def add_datastructure_to_db(request):
    if(db_manage):
        ds = yaml.safe_load(request.GET['dataStructure'])
        ds_id = ds['dataStructureId']
        ds_info = ds['dataStructureInfo']
        d = DataStructure.objects.create(name=ds_id)
        setattr(d, 'value', ds_info)
        d.save()
    return HttpResponse("")

@csrf_exempt
def refresh_data(request):

    if(request.method != 'POST'):
        return False

    setting = json.loads(request.body)
    print(str(setting)+'\n')
    context = {}
    def _callback(progress, solution):
        context["data"] = solution.toJson(False)

    def refresh():
        print ">>> Generating data..."


        #1. width
        widthValue = int(setting["width"])
        readWriteRatio1 = 0
        readWriteRatio2 = 1

        #2. num of puts
        numPuts = int(setting["puts"])
        dist1 = de.UniformDistribution(913812, 1, widthValue)
        generator1 = de.QueryWorkloadGenerator(0, numPuts, dist1)
        workload1 = generator1.generate()
        dist2 = de.UniformDistribution(913812, 1, widthValue)

        #3. num of gets
        numGets = int(setting["gets"])
        generator2 = de.QueryWorkloadGenerator(1, numGets, dist2);
        workload2 = generator2.generate()

        result = [h, workload1, workload2]
        print ">>> Done."

        options = de.SystemDesignOptionSet()

        allOpts = {}

        for line in open("library.json"):
            jsonfile = js.loads(line)
            definition =  de.ArchetypeDefinition();
            definition.fromJson(line)
            allOpts[str(jsonfile["metadata.general.name"])] = definition

        options += de.SystemDesignOption(allOpts['UNORDERED DATAPAGE'], True)
        options += de.SystemDesignOption(allOpts['QUANTILES NODE'], False)
        options += de.SystemDesignOption(allOpts['LINKED LIST'], False)

        print options
        e = de.EngineRunner(options, 3, _callback)

        e.solve(workload)

    refresh()

    return JsonResponse(context)


def str2num(s):
    try:
        return int(s)
    except ValueError:
        return s

@csrf_exempt
def simulate(request):
    if(request.method != 'POST'):
        return False

    setting = json.loads(request.body)
    print(request.body)
    nodes = setting["nodes"]
    workload = setting["workload"]

    context = {}

    def refresh():
        print ">>> Generating data..."

        #1. width
        widthValue = int(workload["width"])
        readWriteRatio1 = 0
        readWriteRatio2 = 1

        #2. num of puts
        numPuts = int(workload["puts"])
        dist1 = de.UniformDistribution(913812, 1, widthValue)
        generator1 = de.QueryWorkloadGenerator(0, numPuts, dist1)
        workload1 = generator1.generate()
        queryblock_puts = workload1.getBlock()


        #3. num of gets
        numGets = int(workload["gets"])
        numGets = 20
        dist2 = de.UniformDistribution(913812, 1, widthValue)
        generator2 = de.QueryWorkloadGenerator(1, numGets, dist2);
        workload2 = generator2.generate()
        queryblock_gets = workload2.getBlock()
        workload2.print_all()


        length = 0
        x = de.SystemDesignOptionHierarchy()
        for name in nodes:
            node = nodes[name]
            for prop in node:
                length += 1
                value = node[prop]
                node[prop] = str2num(value)
                if(value == "False"):
                    node[prop] = False
                elif(value == "True"):
                    node[prop] = True
            node_proper = js.dumps(node)
            arch = de.ArchetypeDefinition()
            arch.fromJson(node_proper)
            opt = de.SystemDesignOption(arch, True)
            x += opt
        ef = de.ElementFactory(x)
        element = ef.generate()
        path = "models.txt".encode('utf-8')
        models = de.MicroBenchmark()
        models.load(path)
        res = element.estimateGets(queryblock_puts, queryblock_gets, models, None).getValue()
        print ">>> Done."
        # return res
        return 123

    res = refresh()
    context['res'] = res;

    return JsonResponse(context)

@csrf_exempt
def get_model(request):
    res = {}
    content = json.loads(request.body)
    name = content['name']
    model = Model.objects.get(name=name)
    res["name"] = model.name
    res["spec"] = model.spec
    res["model"] = model.model
    return JsonResponse(res)
    # return HttpResponse('123')

def get_image(request):
    ds_id = request.GET['data_stucture_id']
    ds = DataStructure.objects.get(name=ds_id)
    img_url = str(ds.picture)
    # img_url = str(ds.picture).split('app/')[1]
    return HttpResponse(img_url)
