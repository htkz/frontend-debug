// when click an instance, the propertoes will show on the right menu
// but it couldn't be edit
function showProperties(node, nodeId){
    //fetch information
    if(!nodeId) {
        nodeId = $(node).find('g[nodeid]').attr('nodeid');
    }

    // show information
    // openNav_right();
    $('#bottomBar').animate({height: '35vh'}, 300);
    $('.reminder span').text('scroll down')


    $.each($('#form-node').find('[name]'),function(ind,val){
        $(val).val(nodeInformation[nodeId][$(val).attr('name')]);
    })
    // make it not editable
    $('#form-node option').prop('disabled', true);
    $('#form-node input').prop('readonly', true);
    $('#buttonsave').hide();

    // hide workload & show node
    // $('#form-node')[0].style.display = "flex";
    // $('#form-workload')[0].style.display = "none";


    // show radar-chart
    clearRadarChart();
    var node = nodeInformation[nodeId];
    var data = getElementFromNode(node.name);
    drawRadarChart(data);
    $('.radar-chart').parent().parent().show();

    $('#form-node').find('[name=nodeId]').val(nodeId);
}

function showWorkLoadProperties(node) {
    var nodeId = $(node).find('g[nodeid]').attr('nodeid');
    // show information
    openNav_right();
    $.each($('#workload').find('[name]'),function(ind,val){
        $(val).val(workLoadInformation[$(val).attr('name')]);
    })

    //hide node & show workload
    $('#form-node')[0].style.display = "none";
    $('#form-workload')[0].style.display = "block";

    $('.radar-chart').parent().parent().hide();

}

reformAllNodesColor = function() {
    for (var i in nodeInformation) {
        var id = nameToId[i]
        var node = graph.getCell(id);
        var color = node.attr('.info').color;
        node.attr('circle.body/stroke', color);
        node.attr('.port-body/stroke', color);
        node.attr('.port-body/fill', color);
    }
}

changeNodeColor = function(nodeId, color) {
    var node = graph.getCell(nameToId[nodeId]);
    node.attr('circle.body/stroke', color);
    node.attr('.port-body/stroke', color);
    node.attr('.port-body/fill', color);
}


// right click to remove item
dealMouseEvent = function(event, node) {
    if (event.button === 0) {
        var color = $(node).find('.info').attr('color');
        var nodeId = $(node).find('circle.body').attr('id');
        reformAllNodesColor();
        changeNodeColor(nodeId, '#ccc');
        showProperties(node);
    } else if (event.button == 2) {
        // var nodeId = $(node).find('g[nodeid]').attr('nodeid');
        // var id = nameToId[nodeId];
        // graph.getCell(id).remove();
        // delete nodeInformation[nodeId];
    }
}

dealEnter = function(event, node) {
    $(node).find('.label').show();
}

dealLeave = function(event, node) {
    // console.log(node);
    $(node).find('.label').hide();
    // $('.label').hide();
}


joint.shapes.devs.workloadView = joint.shapes.devs.ModelView;
joint.shapes.devs.workload = joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {
  markup: '<a><g class="rotatable"><g class="scalable"><circle class="body"/><line/><line class="topline" /><text class="left-text"/><text class="right-text"/><text class="bottom-text"/></g><g class="info"/><g class="inPorts"/><g class="outPorts"/></g></a>',
  portMarkup: '<g class="port port<%= id %>"><path class="port-body"/><text class="port-label"/></g>',
  defaults: joint.util.deepSupplement({
    type: 'devs.workload',
    size: {
      width: 150,
      height: 150
    },
    inPorts: [],
    outPorts: [],
    attrs: {
      '.': {
        magnet: false
      },
      '.body': {
        stroke: '#f00',
        'stroke-width': 3,
        fill: '#222',
        r: '100',
        cx : '60',
        cy : '60'
      },
      'a' : {
        onmousedown: 'showWorkLoadProperties(this)',
      },
      '.rotatable' : {
        nodetype: 'Workload'
      },
      '.info' : {
          nodename: 'Workload',
          nodeid: ''
      },
      '.port-body': {
        width: 80,
        height: 34,
        stroke: '#f00',
        fill: '#f00',
        rx: '5',
        ry: '5'
      },
      '.inPorts .port-body': {
        type: 'input',
        magnet: "passive",
      },
      '.outPorts .port-body': {
        type: 'output',
        magnet: true,
        d:'M 40 0 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0',
      },
      text: {
        fill: '#3E4B79',
        'pointer-events': 'none'
      },
      line : {
          'y2' : 60,
          'x2' : -40,
          'y1' : 60,
          'x1' : 160,
          'stroke-width' : 2,
          'stroke' : '#f00',
      },
      '.topline': {
        'y2' : 60,
        'x2' : 60,
        'y1' : -40,
        'x1' : 60,
        'stroke-width' : 2,
        'stroke' : '#f00',
      },
      '.left-text': {
        'ref-x': 7,
        'ref-y': 35,
        'font-size': 25,
        'fill': '#777',
        'ref': '.body' ,
        'text': '500'
      },
      '.right-text': {
        'ref-x': 70,
        'ref-y': 35,
        'font-size': 25,
        'fill': '#777',
        'ref': '.body' ,
        'text': '500'
      },
      '.bottom-text': {
        'ref-x': 35,
        'ref-y': 85,
        'font-size': 35,
        'fill': '#777',
        'ref': '.body' ,
        'text': '500'
    },
      '.inPorts .port-label': {
        'ref-x': .128,
        'ref-y': .158,
        ref: 'circle',
        'y-alignment': 'middle',
        'x-alignment': 'middle'
      },
      '.outPorts .port-label': {
        'ref-x': .128,
        'ref-y': .158,
        ref: 'circle',
        'y-alignment': 'middle',
        'x-alignment': 'middle'
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults),

  getPortAttrs: function(portName, index, total, selector, type) {

    var attrs = {};

    var portClass = 'port' + index;
    var portSelector = selector + '>.' + portClass;
    var portLabelSelector = portSelector + '>.port-label';
    var portBodySelector = portSelector + '>.port-body';

    attrs[portLabelSelector] = {
      text: portName
    };
    attrs[portBodySelector] = {
      port: {
        id: _.uniqueId(portName),//portName || _.uniqueId(type),
    name: portName,
        type: type
      }
    };

    var portDistance = 4;
    var portWidth = this.attributes.attrs[".port-body"].width;
    var offset = (this.attributes.size.width-(portWidth*total + portDistance*(total-1) ))/2;
      // CHANGED: swap x and y ports coordinates ('ref-y' => 'ref-x')
    attrs[portSelector] = {
        ref: '.body',
        'ref-x': offset + (portDistance + portWidth) * index
      };
      // ('ref-dx' => 'ref-dy')
      if (selector === '.outPorts') {
        attrs[portSelector]['ref-dy'] = 1;
      }
      if (selector === '.inPorts') {
        attrs[portSelector]['ref-y'] = -35;
      }
      //

      return attrs;
    }
  }));

nodeModel_workload = joint.shapes.devs.workload;

nodeData = function(color, typename, name, nodename, nodeid){
  //I dont know why, but without this fu***** sentence, the port does not work
  eval("joint.shapes."+typename+"View = joint.shapes.devs.ModelView;")
  return joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {
  markup: `<a>
            <g class="rotatable">
                <g class="scalable">
                    <circle class="body" id="${nodeid}"/>
                </g>
                <text class="label"/>
                <g class="info"/>
                <g class="inPorts"/>
                <g class="outPorts"/>
            </g>
        </a>`,
  portMarkup: '<g class="port port<%= id %>"><path class="port-body"/><text class="port-label"/></g>',
  defaults: joint.util.deepSupplement({
    type: typename,
    size: {
      width: 150,
      height: 150
    },
    inPorts: [],
    outPorts: [],
    attrs: {
      '.': {
        magnet: false
      },
      '.body': {
        // width: 150,
        // height: 150,
        stroke: color,
        'stroke-width': 3,
        fill: '#222',
        r: '100',
        cx: '15',
        cy: '15'
      },
      'a' : {
        onmousedown: 'dealMouseEvent(event, this)',
        onmouseenter: 'dealEnter(event, this)',
        onmouseleave: 'dealLeave(event, this)'
      },
      '.rotatable' : {
        nodetype: 'plain node',
        tmpid: ''
      },
      '.info' : {
          nodename: nodename,
          nodeid: nodeid,
          color: color,
      },
      '.port-body': {
        width: 80,
        height: 34,
        stroke: color,
        fill: color,
        rx: '5',
        ry: '5',
        // visibility: 'hidden'
      },
      '.inPorts .port-body': {
        type: 'input',
        magnet: "passive",
        d:'M 40 35 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0',
        stroke: 'transparent',
        fill: 'transparent',
        // d:'M0,9.11c0-6.627,2.33-9.111,8.957-9.111h62C77.585-0.001,80,2.483,80,9.11V34H0V9.11z'
      },
      '.outPorts .port-body': {
        type: 'output',
        magnet: true,
        d:'M 40 0 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0',
        // stroke: 'transparent',
        // fill: 'transparent',
      },
      text: {
        fill: '#1E4B79',
        'pointer-events': 'none',
      },
      '.label': {
        'ref-x': .128,
        'ref-y': .158,
        'font-size': 20,
        'fill': '#ccc',
        'ref': 'circle',
        'text': name,
        'text-anchor': 'middle',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        'display': 'none'
      },
      '.inPorts .port-label': {
        'ref-x': .128,
        'ref-y': .158,
        ref: 'circle',
        'y-alignment': 'middle',
        'x-alignment': 'middle'
      },
      '.outPorts .port-label': {
        'ref-x': .128,
        'ref-y': .158,
        ref: 'circle',
        'y-alignment': 'middle',
        'x-alignment': 'middle'
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults),

  getPortAttrs: function(portName, index, total, selector, type) {

    var attrs = {};

    var portClass = 'port' + index;
    var portSelector = selector + '>.' + portClass;
    var portLabelSelector = portSelector + '>.port-label';
    var portBodySelector = portSelector + '>.port-body';

    attrs[portLabelSelector] = {
      text: portName
    };
    attrs[portBodySelector] = {
      port: {
        id: _.uniqueId(portName),//portName || _.uniqueId(type),
    name: portName,
        type: type
      }
    };

    var portDistance = 4;
    var portWidth = this.attributes.attrs[".port-body"].width;
    var offset = (this.attributes.size.width-(portWidth*total + portDistance*(total-1) ))/2;
      // CHANGED: swap x and y ports coordinates ('ref-y' => 'ref-x')
    attrs[portSelector] = {
        ref: '.body',
        'ref-x': offset + (portDistance + portWidth) * index
      };
      // ('ref-dx' => 'ref-dy')
      if (selector === '.outPorts') {
        attrs[portSelector]['ref-dy'] = 1;
      }
      if (selector === '.inPorts') {
        attrs[portSelector]['ref-y'] = -35;
      }
      //

      return attrs;
    }
  }));
}


createLink = function (source, target) {
    return new joint.dia.Link({
        vertexMarkup: [
            '<a onclick="alert()">',
            '<g class="marker-vertex-group" transform="translate(<%= x %>, <%= y %>)">',
            // '<circle class="marker-vertex" idx="<%= idx %>" r="10" />',
            '<g class="marker-vertex-remove-group">',
            '<path class="marker-vertex-remove-area" idx="<%= idx %>" d="M16,5.333c-7.732,0-14,4.701-14,10.5c0,1.982,0.741,3.833,2.016,5.414L2,25.667l5.613-1.441c2.339,1.317,5.237,2.107,8.387,2.107c7.732,0,14-4.701,14-10.5C30,10.034,23.732,5.333,16,5.333z" transform="translate(5, -33)"/>',
            '<path class="marker-vertex-remove" idx="<%= idx %>" transform="scale(.8) translate(9.5, -37)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z">',
            '<title>Remove vertex.</title>',
            '</path>',
            '</g>',
            '</g>',
            '</a>',
        ].join(''),
        // source: { id: tmp[0], port: 15, },
        // target: { id: tmp[1], port: 20, },
        source: source,
        target: target,
        // router: { name: 'manhattan' },
      	connector: { name: 'rounded' },
        attrs: {
          '.connection': {
            stroke: '#1E4B79',
          },
          '.marker-target': {
            fill: '#1E4B79',
            stroke: '#1E4B79',
            d: 'M9.206,12.765c0.939,0.574,1.707,0.143,1.707-0.957V1.324c0-1.1-0.768-1.531-1.707-0.958L0.765,5.524c-0.938,0.573-0.938,1.512,0,2.085L9.206,12.765z'
          }
        },
        labels: [
            { position: 0.5,
              attrs: { text: { text: 'label-invisible', fill: '#f6f6f6', 'font-family': 'sans-serif', 'font-size': 20 },
              rect: { stroke: '#222222', 'stroke-width': 30, rx: 5, ry: 5 } }}
        ]
      })
}


// all parameters just show what it looks like and where it should be
// other properties are saved in js global value
createNewWorkload = function() {
    var info = workLoadInformation;
    var workload = new joint.shapes.devs.workload({
      position: info.position,
      attrs:{
        '.left-text': {
          'text': info.left,
        },
        '.right-text': {
          'text': info.right,
        },
        '.bottom-text': {
          'text': info.bottom,
        }
      },
      inPorts: [''],
      outPorts: ['']
    });
    workloadId = 'workload';
    nameToId[workloadId] = workload.id;
    idToName[workload.id] = workloadId;
    graph.addCell(workload);
    return workloadId;
}

createNewNode = function(position, type="NODE DATA") {
    var node = new data_selector[type]({
	  position: position,
	  attrs:{},
	  inPorts: [''],
	  outPorts: ['']
	});
    nodeId = 'node-' + idGenerator();
    node.attr('.info/nodeid', nodeId);
    graph.addCell(node);
    nameToId[nodeId] = node.id;
    idToName[node.id] = nodeId;
    return nodeId;
}

createNewLink = function(source, target) {
    linkId = 'link-' + idGenerator()
    var link = createLink(source, target)
    graph.addCell(link)
    nameToId[linkId] = link.id
    idToName[link.id] = linkId
    return linkId
}

createInstance = function(position, color, name, id) {
    position = position || {x:1200, y:800};
    color = color || '#271587';
    // shortName = shortName || 'TT';
    id = id || '';
    if(id === "") {
        var nodeId = 'node-' + idGenerator();
    } else {
        var nodeId = id;
    }
    var instance = nodeData(color,'devs.it', name, 'Instance', nodeId);
    var node = new instance({
	  position: position,
	  attrs:{},
	  inPorts: [''],
	  outPorts: ['']
	});

    // console.log('nodeId: '+nodeId);
    node.attr('.info/nodeid', nodeId);
    graph.addCell(node);
    nameToId[nodeId] = node.id;
    idToName[node.id] = nodeId;
    return nodeId;
}
