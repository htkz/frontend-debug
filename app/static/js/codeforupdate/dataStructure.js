addDataStructure = function() {
    swal({
        title: "Data Structure name!",
        text: "Please input new data structure name:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Node1"
    },
    function(inputValue){
        if (!inputValue) {
            swal.showInputError("You need to write something!");
            return false;
        }
        if(dataStructureNames.indexOf(inputValue) !== -1) {
            swal.showInputError("Data Structure already exists, please change it.");
            return false;
        }
        swal({
          title: "Nice!",
          text: "New element: " + inputValue,
          type: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        let name = inputValue;
        saveInstances(name);
        addDataStructureChild(name);
        addDataStructureToDB(name);
    });
}

addDataStructureChild = function(name) {
  let parent = document.getElementById("panel-element-777776");
  let a = document.createElement('a');
  let p = document.createElement('p');
  p.setAttribute('id', name);
  let text = document.createTextNode(name);
  let iconTriangle = document.createElement('i');
  let iconDelete = document.createElement('i');
  // left icon triangle
  iconTriangle.classList.add('fa', 'fa-caret-up', 'fa-lg');
  iconTriangle.classList.add('element-icon-color');
  iconTriangle.style.color = '#999';
  // icon-delete
  iconDelete.setAttribute('id', name + 'delete');
  iconDelete.classList.add('element-right');
  iconDelete.classList.add('icon-button');
  iconDelete.classList.add('fa', 'fa-times-circle-o');
  iconDelete.addEventListener('click', function() {
      if(function_disable) return;
      deleteDataStructure(name);
  });

  a.setAttribute('href', '#');
  a.classList.add('element-left');
  a.appendChild(text);

  a.addEventListener('click', function(){
      if(function_disable) return;
      emptyBrowser();
      drawDataStructure(name);
      showRightMenuOfFirstNode(name);
      curDataStructure = $(this).text();
      $(this).parent().siblings().each(function(index, el) {
          $(el).find('a').removeClass('selected');
      });
      $(this).addClass('selected');
  });
  p.appendChild(iconTriangle);
  p.appendChild(iconDelete);
  p.appendChild(a);
  parent.appendChild(p);
}

saveInstances = function(name) {
    // save position
    var elements = graph.getElements()
    for(var i in elements) {
        var id = idToName[elements[i].id]
        var pos = elements[i].attributes.position
        if (nodeInformation[id]) {
            nodeInformation[id].pos_x = pos.x
            nodeInformation[id].pos_y = pos.y
        } else if (id === "workload") {
            workLoadInformation.position = {
                x: pos.x,
                y: pos.y
            };
        }
    }

    let nodes = Object.assign({}, nodeInformation);
    let links = Object.assign({}, nodeStructure);
    let workload = Object.assign({}, workLoadInformation);
    dataStructures[name] = {
        'nodes': nodes,
        'links': links,
        'workload': workload
    }
}


deleteDataStructure = function(dataStructureId) {
    for (var i = 0; i < dataStructureNames.length; i++) {
        if(dataStructureId === dataStructureNames[i]) {
            dataStructureNames.splice(i, 1);
        }
    }
    deleteDataStructureChild(dataStructureId);
    deleteDataStructureFromDB(dataStructureId);
}

deleteDataStructureChild = function(dataStructureId) {
    $('#'+dataStructureId).remove();
}

deleteDataStructureFromDB = function(dataStructureId) {
    $.ajax({
        url: '/app/delete_datastructure_from_db/',
        type: 'GET',
        dataType: 'json',
        data: {dataStructureId: dataStructureId}
    })
}

addDataStructureToDB = function(dataStructureId) {
    var dataStructureInfo = dataStructures[dataStructureId];
    var data = {
        dataStructureId: dataStructureId,
        dataStructureInfo: dataStructureInfo
    }
    $.ajax({
        url: '/app/add_datastructure_to_db/',
        type: 'GET',
        dataType: 'json',
        data: {dataStructure: JSON.stringify(data)}
    })
}

showRightMenuOfFirstNode = function(dataStructureid) {
    var dataStructure = dataStructures[dataStructureid];
    var nodes = dataStructure['nodes'];
    var links = dataStructure['links'];
    // get first node id
    var firstNodeId;
    for (var i in links) {
        var link = links[i];
        if (link.sourceId === 'workload') {
            firstNodeId = link.targetId;
        }
    }
    changeNodeColor(firstNodeId, '#ccc');
    showProperties(undefined, firstNodeId);
}



drawDataStructure = function(dataStructureid) {
    var dataStructure = dataStructures[dataStructureid];
    var nodes = dataStructure['nodes'];
    var links = dataStructure['links'];
    var workload = dataStructure['workload'];

    // create workload
    // graph.getCell(nameToId['workload']).remove();
    // workLoadInformation = Object.assign({}, workload);
    // createNewWorkload();
    // changeSettingFormat();

    // create nodes
    for (let i in nodes) {
        let node = nodes[i];
        let pos = {x: node.pos_x, y: node.pos_y};
        let color = node.color;
        let name = node.name;
        createInstance(pos, color, name, i);
        nodeInformation[i] = node;

        // draw radar-chart for node
        var data = getElementFromNode(node.name);
        drawSmallRadarChart(data);
        var g = $($('.radar-temp').find('svg')[0].firstChild).clone()
                .attr('transform', 'translate(12, 10)');
        var circle = $(`#${i}`);
        var $a = circle.parent().parent().parent();
        g.appendTo($a);
    }

    // create links
    for (var i in links) {
        var link = links[i];
        if(link.sourceId === 'workload') continue;
        var sId = nameToId[link.sourceId];
        var tId = nameToId[link.targetId];
        var text = link.text
        var sPort = get_port(sId, 'out');
        var tPort = get_port(tId, 'in');


        var linkId = createNewLink({id:sId, port:sPort}, {id:tId, port:tPort});
        nodeStructure.push({
            "linkId":linkId,
            "sourceId": idToName[sId],
            "targetId": idToName[tId],
            "text": text,
        })
        var cell = graph.getCell(nameToId[linkId]);

        // set link label
        if(text !== "label-invisible") {
          cell.label(0, { attrs: { text: { text: text } } });
        } else {
          cell.attr('.labels/display', 'none');
        }

        // make self-connected line
        if(sId === tId) {
          var pos = graph.getCell(sId).attributes.position;
          graph.getCell(sId).embed(cell);
          cell.set('vertices', [{x: pos.x + 170, y: pos.y + 83}, {x: pos.x + 170, y: pos.y - 65}])
        }
    }



}
