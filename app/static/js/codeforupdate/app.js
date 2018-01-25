var paper = new joint.dia.Paper({
  el: $('#modelCanvas'),
  height: "5000%",
  width: "5000%",
  gridSize: 1,
  model: graph,
  linkView: joint.dia.LinkView.extend({
      pointerdblclick: function(linkView, evt, x, y) {
        var model = this.model;
        console.log(model.id);
        swal({
            title: "Link Label!",
            text: "Please input new line label:",
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
          model.attr('.labels/display', 'block');
          model.label(0, { attrs: { text: { text: inputValue } } });
          swal({
            title: "Nice!",
            text: "New label: " + inputValue,
            type: "success",
            timer: 1,
            showConfirmButton: false,
          });
          // save label name to nodeStructure
          nodeStructure.forEach(function(ns, index) {
            if(nameToId[ns.linkId] === model.id) {
              nodeStructure[index]['text'] = inputValue
            }
          })
        }
        )
      },
  }),
  interactive: function(cellView) {
    if (cellView.model instanceof joint.dia.Link) {
        // Disable the default vertex add functionality on pointerdown.
        return { vertexAdd: false };
    }
    return true;
  },
  defaultLink:
  new joint.dia.Link({
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
    // router: { name: 'manhattan' },
  	connector: { name: 'rounded' },
    labels: [
        { position: 0.5,
          attrs: { text: { text: 'label', fill: '#f6f6f6', 'font-family': 'sans-serif', 'font-size': 20 },
          rect: { stroke: '#222222', 'stroke-width': 30, rx: 5, ry: 5 } }}
    ],
    attrs: {
      '.connection': {
        stroke: '#1E4B79',
      },
      '.marker-target': {
        fill: '#1E4B79',
        stroke: '#1E4B79',
        d: 'M9.206,12.765c0.939,0.574,1.707,0.143,1.707-0.957V1.324c0-1.1-0.768-1.531-1.707-0.958L0.765,5.524c-0.938,0.573-0.938,1.512,0,2.085L9.206,12.765z'
      },
      '.labels': {
        display: 'none',
      }
    },

  }),

  validateMagnet: function(cellView, magnet){
	  // Make sure only output can have link
	  if (magnet && magnet.getAttribute('type') === 'input') return false;
    // Note that this is the default behaviour. Just showing it here for reference.
    // Disable linking interaction for magnets marked as passive
    return magnet.getAttribute('magnet') !== 'passive';
  },
  validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
    if(!magnetS || !magnetT) return false;
    // Prevent linking from input ports.
    if (magnetS && magnetS.getAttribute('type') === 'input') return false;
    // Prevent linking from output ports to input ports within one element.
    // if (cellViewS === cellViewT) return false;
	  // Prevent links from input ports that already have a link
    // var portId = magnetT.getAttribute("port");
    // var links = graph.getConnectedLinks(cellViewT.model, { inbound: true });
    // var portLinks = _.filter(links, function(o) {
    //    return o.get('target').port == portId;
    // });
    // if(portLinks.length > 0) return false;
    // if(magnetS.nextSibling.textContent !== magnetT.nextSibling.textContent) return false;
    // Prevent linking to input ports.
    if(magnetT && magnetT.getAttribute('type') === 'input'){
		return !isParentModel(cellViewS.model, cellViewT.model);
	}
  },
  // Enable marking available cells & magnets
  markAvailable: true,
  linkPinning: false,
  multiLinks: false,
  // snapLinks: true,
});

var isParentModel = function(cellViewModelS, cellViewModelT){
	var outboundLinksFromTarget = graph.getConnectedLinks(cellViewModelT, { outbound: true });
	for (i = 0; i < outboundLinksFromTarget.length; i++) {
	   var targetModelId = outboundLinksFromTarget[i].attributes.target.id;
	   if(targetModelId !== cellViewModelS.id)
	   {
		   var targetModel = graph.getCell(targetModelId);
		   if(targetModel)
		   {
         if(targetModel.attributes.embeds) {
           // nodes that are connected by itself
           return false
         }
			   return isParentModel(cellViewModelS, targetModel);
		   }
	   }
	   else
		   return true;
	};
	return false;
};

graph.on('change:position', function(cell) {
	var links = graph.getLinks();
	for (i = 0; i < links.length; i++) {
		paper.findViewByModel(links[i]).update();
	};
});

// when two nodes are connected, save them to nodestructure
graph.on('change:source change:target', function(cell) {
    if(cell.isLink()){
        var source = cell.get('source');
        var target = cell.get('target');
        if (target.port){ //ensure that the line is connected
            sourceId = idToName[cell.getSourceElement().id];
            targetId = idToName[cell.getTargetElement().id];

            // make line to rectangle
            if(sourceId === targetId) {
              var pos = graph.getCell(source.id).attributes.position;
              graph.getCell(source.id).embed(cell);
              cell.set('vertices', [{x: pos.x + 170, y: pos.y + 83}, {x: pos.x + 170, y: pos.y - 65}])
              // cell.set('connector', { name: 'rounded', args: { radius: 60 }});
            }

            var linkId = 'link-' + idGenerator()
            idToName[cell.id] = linkId
            nameToId[linkId] = cell.id
            // debuglog('line from node: ' + sourceId);
            // debuglog('line to node: ' + targetId);
            for (ind in nodeStructure) {
                if (nodeStructure[ind]["linkId"] == linkId) {
                    nodeStructure.splice(ind, 1);break;
                }
            }
            nodeStructure.push({
              "linkId": linkId,
              "sourceId": sourceId,
              // "sourcePort": source.port,
              "targetId": targetId,
              // "targetPort": target.port,
              "text": "label-invisible",
            });
            // debuglog('node structure: ' + JSON.stringify(nodeStructure));
            // module info update
            Object.keys(moduleStructure).forEach(function(key){
                var elements = moduleStructure[key].elements
                if(elements.indexOf(sourceId) != -1) {
                    moduleStructure[key].elements.push(targetId)
                    moduleStructure[key].elements.push(linkId)
                } else if (elements.indexOf(targetId) != -1) {
                    moduleStructure[key].elements.push(sourceId)
                    moduleStructure[key].elements.push(linkId)
                }
            })
        }
    }
});

// when the connection of two nodes is removed, save the change to nodestructure
graph.on('remove',function(cell){
    if(cell.isLink()){
        var source = cell.get('source');
        var target = cell.get('target');
        var link_id = cell.get('id');
        //ensure that it is the connected line to be removed, because this function is also triggered when lines are canceled during connecting.
        if(target.id){
            // debuglog('remove line from node: ' + JSON.stringify(source));
            // debuglog('remove line to node: ' + JSON.stringify(target));
            for (ind in nodeStructure) {if (nodeStructure[ind]["linkId"] == link_id)  {nodeStructure.splice(ind, 1);break;}}
            // debuglog('node structure: ' + JSON.stringify(nodeStructure));
            Object.keys(moduleStructure).forEach(function(key) {
                var ind = moduleStructure[key].elements.indexOf(idToName[link_id])
                if( ind != -1) {
                    moduleStructure[key].elements.splice(ind, 1)
                }
            })
        }else if(target.x) {
            debuglog('cancelled line connecting');
        }
    }
});


paper.scale(0.5, 0.5);
