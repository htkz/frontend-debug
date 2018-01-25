/* Convert from Kostas's 'a -> b' edge format to a normal d3 map */
function dotToD3(data){
  lst = [];
  data.forEach(function(x){
    elem = x.split("->");
    source = elem[0].trim();
    target = elem[1].trim();
    lst.push({source: source, target: target});
  });
  return lst;
}

function preProcess(apiData){
  var nodes = [];
  Object.keys(apiData.nodes).forEach(function(d){
    var temp = apiData.nodes[d];
    temp.id = d;
    nodes.push(temp);
  });
  var edges = dotToD3(apiData.edges);
  return {nodes: nodes, edges: edges};
}

function fetchAndDraw(error, apiData){
  if (error) throw error;

  // Preprocessing
  var clean = preProcess(apiData);
  var nodes = clean.nodes;
  var edges = clean.edges;

  // Set settings
  var allData = getRadarChartDataAll();
  // var scalesAndAxes = generateScalesAndAxes(nodes);
  var scalesAndAxes = generateScalesAndAxes(allData);
  curScalesAndAxes = scalesAndAxes;
  var radarChartOptions = {
    w: 80,
    h: 80,
    dotRadius: 0.4,
    tickSize: 0,
    axisLabels: false,
    tickLabels: false,
    gridCircle: true,
    hover: true,
    fields: ['external.links.next', 'inter-block.blockAccess.direct', 'inter-block.blockAccess.headLink', 'inter-block.fanout.fixedValue', 'intra-block.capacity.value', 'intra-block.filters.zoneMaps.min', 'intra-block.links.next', 'inter-block.partitioning.function', 'intra-block.dataRetention.valueRetention.compression', 'inter-block.orderMaintenance.type', 'inter-block.partitioning.type'],
    standaloneMode: false,
    scalesAndAxes: scalesAndAxes,
    roundStrokes: false,
  };

  // Draw
  root = RadarTree(nodes, edges, {radarChartOptions: radarChartOptions});
  var selection = d3.select(".tree svg");
  if (!selection.selectAll("g").empty()){
    selection.selectAll("g").remove();
  }
  root(selection);
}


// radar chart

clearRadarChart = function() {
    var parent = document.querySelector(".radar-chart");
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

getRadarChartData = function(data) {
    return [dataTransToPy(data)];
}

getRadarChartDataAll = function() {
    var res = [];
    for (var i in elementInformation) {
        var element = elementInformation[i];
        res.push(dataTransToPy(element))
    }
    return res;
}

drawRadarChart = function(data) {
    // var scalesAndAxes = curScalesAndAxes;
    var data = getRadarChartData(data);
    var allData = getRadarChartDataAll();
    var scalesAndAxes = generateScalesAndAxes(allData);
    var radarChartOptions = {
        w: 140,
        h: 140,
        dotRadius: 1.4,
        tickSize: 0,
        axisLabels: false,
        tickLabels: false,
        // gridCircle: true,
        hover: true,
        // standaloneMode: false,
        fields: ['external.links.next', 'inter-block.blockAccess.direct', 'inter-block.blockAccess.headLink', 'inter-block.fanout.fixedValue', 'intra-block.capacity.value', 'intra-block.filters.zoneMaps.min', 'intra-block.links.next', 'inter-block.partitioning.function', 'intra-block.dataRetention.valueRetention.compression', 'inter-block.orderMaintenance.type', 'inter-block.partitioning.type'],
        scalesAndAxes: scalesAndAxes,
        // roundStrokes: false,
    };
    d3.select(".radar-chart").call(RadarChart(data, radarChartOptions));
}

drawSmallRadarChart = function(data) {
    var data = getRadarChartData(data);
    var allData = getRadarChartDataAll();
    var scalesAndAxes = generateScalesAndAxes(allData);
    var radarChartOptions = {
        w: 100,
        h: 100,
        dotRadius: 1.4,
        tickSize: 0,
        axisLabels: false,
        tickLabels: false,
        // gridCircle: true,
        hover: true,
        // standaloneMode: false,
        fields: ['external.links.next', 'inter-block.blockAccess.direct', 'inter-block.blockAccess.headLink', 'inter-block.fanout.fixedValue', 'intra-block.capacity.value', 'intra-block.filters.zoneMaps.min', 'intra-block.links.next', 'inter-block.partitioning.function', 'intra-block.dataRetention.valueRetention.compression', 'inter-block.orderMaintenance.type', 'inter-block.partitioning.type'],
        scalesAndAxes: scalesAndAxes,
        // roundStrokes: false,
    };
    d3.select(".radar-temp").call(RadarChart(data, radarChartOptions));
}



// radar tree
showRadarTree = function() {
    // $('.radar-tree').show(700);
    $('.radar-tree').show();
    drawRadarTree();
}

hideRadarTree = function() {
    // $('.radar-tree').hide(700);
    $('.radar-tree').hide();
}

getRadarTreeData = function() {
    var data = {};
    data.nodes = {};
    data.edges = [];
    var nodes = Object.assign({}, nodeInformation);
    for (var i in nodes) {
        var node = nodes[i];
        var element = getElementFromNode(node.name);
        data.nodes[i] = dataTransToPy(element);
    }

    var edges = Object.assign({}, nodeStructure);
    for (var i in edges) {
        var edge = edges[i];
        if(edge.sourceId === 'workload') continue;
        data.edges.push(edge.sourceId + ' -> '+edge.targetId)
    }
    return data;
}

drawRadarTree = function() {
    var data = getRadarTreeData();
    fetchAndDraw(false, data);
}

getElementFromNode = function(nodeName) {
    for (var i in elementInformation) {
        if (elementInformation[i].name === nodeName) {
            return elementInformation[i];
        }
    }
    return false;
}
