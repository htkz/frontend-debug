clearObject = function(obj) {
    for (var prop in obj) { if (obj.hasOwnProperty(prop)) { delete obj[prop]; } }
}

emptyBrowser = function() {
    graph.clear();
    clearObject(nameToId);
    clearObject(idToName);
    clearObject(id_to_pyid);
    clearObject(pyid_to_id);
    clearObject(nodeInformation);
    // clearObject(workLoadInformation);
    clearObject(modules);
    clearObject(moduleStructure);
    nodeStructure.length = 0;
    idPool.length = 0;
    // createNewWorkload();
    // changeSettingFormat();
}

fillBrowser = function(elements) {
    // create node
    console.log('elements: '+elements);
    var nodes = elements.nodes;
    var y_value = 200;
    var x_value = 400;
    var num = 0;
    for(var pyid in nodes) {
        num += 1;
        // if(num === 6) {
        //     break;
        // }
        if(x_value > 2500) {
            x_value = 400;
            y_value += 140;
        } else {
            x_value += 140;
        }
        var node = dataTransToJs(nodes[pyid]);
        var pos = {x: x_value, y: y_value};
        var nodeId = createNewNode(pos, node.name);
        id_to_pyid[nodeId] = pyid;
        pyid_to_id[pyid] = nodeId;
        nodeInformation[nodeId] = node;
    }

    // create link
    var links = elements.edges;
    for (var i = 0; i < links.length; i++) {
        var link = links[i]
        var data = link.split(" -> ");
        var sourceId = nameToId[pyid_to_id[data[0]]];
        var targetId = nameToId[pyid_to_id[data[1]]];
        var sourcePort = get_port(sourceId, "out");
        var targetPort = get_port(targetId, "in");
        var linkId = createNewLink({id:sourceId, port:sourcePort}, {id:targetId, port:targetPort})
        // module.elements.push(linkId);
        nodeStructure.push({
            "linkId":linkId,
            "sourceId": idToName[sourceId],
            "targetId": idToName[targetId],
            "text": "label-fill"
            // "sourcePort": sourcePort,
            // "targetPort": targetPort
        });
    }
}


refreshBrowser = function() {
    var setting = {}
    setting.gets = $("#gets").val();
    setting.puts = $("#puts").val();
    setting.width = $("#width").val();
    if($.isNumeric(setting.gets) && $.isNumeric(setting.puts) && $.isNumeric(setting.width)) {
        $.ajax({
            type: "POST",
            url: '/app/refresh/',
            data: JSON.stringify(setting),
            success: function (data) {
                if(Object.keys(data).length !== 0){
                    var res = JSON.parse(data.data);
                    emptyBrowser();
                    fillBrowser(res);
                    joint.layout.DirectedGraph.layout(graph, {
                        nodeSep: 80,
                        edgeSep: 80,
                        rankSep: 200,
                        rankDir: "TB",
                        marginX: 500,
                        marginY: 200,
                    });

                }
                else {
                    swal({
                      title: "Bad request!",
                      text: "No data to refresh!",
                      type: "error",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                    return false;
                }
            }
        });
    } else {
        clearInterval(intervalId);
        swal({
          title: "Bad request!",
          text: "Data input is not number!",
          type: "error",
          timer: 1500,
          showConfirmButton: false,
        });
    }
}

refreshResult = function() {
    // intervalId = setInterval(refreshBrowser, 1500);
    refreshBrowser();
}

stopRefresh = function() {
    clearInterval(intervalId);
}
