var appname = '/app/';
graph = new joint.dia.Graph;

// forbid rightmouse click to show context menu
// document.oncontextmenu = function(){return false};

menuVisibility = false;

var nodeStructure = [];

var nodeInformation = {};


var elementInformation = {};

var modules = {};
var moduleStructure = {};

var dataStructures = {};
var dataStructureNames = [];
var curDataStructure;
var curScalesAndAxes;


var idPool = [];
var elementPool = [];
var nameToId = {};
var idToName = {};
var id_to_pyid = {};
var pyid_to_id = {};



var workLoadInformation = {
	id: 'workload',
	puts: '500',
	gets: '500',
	width: '500',
	position: {
		x: 800,
		y: 600
	}
}

var elementDefault = {
	"name":"TRIE NODE",
	"location":"ssd",
	"prev":"false",
	"next":"true",
	"fanout":"fixed",
	"fanoutFixedValue":256,
	"fanoutFunction":"",
	"partitioning":"yes(function)",
	"partitioningFunction":"Trie(8)",
	"filtersPerLevel":"false",
	"filtersPerRun":"false",
	"initialRunSize":0,
	"maxRunsPerLevel":0,
	"mergeFactor":0,
	"sorted":"partitioning",
	"directAddressing":"true",
	"head":"false",
	"tail":"false",
	"prevLinks":"false",
	"nextLinks":"false",
	"skiplinks":"none",
	"skiplinksProbability":0,
	"zoneMapMax":"false",
	"zoneMapMin":"false",
	"bloomFilters":"false",
	"HashFunctionsNum":0,
	"NumOfBits":0,
	"keyRetention":"function",
	"keyRetentionCompression":"uncompressed",
	"keyRetentionFunction":"Trie(8)",
	"valueRetention":"none",
	"valueRetentionCompression":"uncompressed",
	"valueRetentionFunction":"",
	"capacity":"variable",
	"capacityValue":0,
	"capacityFunction":"",
	"Utilization":"none",
	"UtilizationFunction":"",
	"linksLayout":"scatter",
	"filtersLayout":"scatter",
	"keyValueLayout":"columnar",
	"accessPartitions":"pointed",
	"position_x":1300,
	"position_y":1000,
	"color": "#767676",
	'shortName': "IT"
}



var DEBUG = false;


// for display
var function_disable = false;

var debuglog = function(obj){
	if (DEBUG){
		console.log(obj);
	}
}

function deepcopy(obj) {return JSON.parse(JSON.stringify(obj));}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// generate 4 bit random digits
function idGenerator() {
	var id = (((1+Math.random())*0x100000)|0).toString(10).substring(1,5)
	while(idPool.indexOf(id) != -1) {
		id = (((1+Math.random())*0x100000)|0).toString(10).substring(1,5)
	}
	idPool.push(id)
	return id
}
