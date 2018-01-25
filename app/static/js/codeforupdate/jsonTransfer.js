get_port = function(id, type) {
    var port = graph.getCell(id).ports;
    for (var i in port) {
        if(port[i].type === type) {
            return port[i].id;
        }
    }
    return none;
}

dataTransToJs = function(data) {
    var res = {}
    res.name = data["metadata.general.name"]
    res.prev = data["external.links.prev"]
    res.next = data["external.links.next"]
    res.fanout = data["inter-block.fanout.type"]
    res.fanoutFixedValue = data["inter-block.fanout.fixedValue"]
    res.fanoutFunction = data["inter-block.fanout.function"]
    res.partitioning = data["inter-block.partitioning.type"]
    res.partitioningFunction = data["inter-block.partitioning.function"]
    res.filtersPerLevel = data["inter-block.partitioning.logStructured.filtersPerLevel"]
    res.filtersPerRun = data["inter-block.partitioning.logStructured.filtersPerRun"]
    res.initialRunSize = data["inter-block.partitioning.logStructured.initialRunSize"]
    res.maxRunsPerLevel = data["inter-block.partitioning.logStructured.maxRunsPerLevel"]
    res.mergeFactor = data["inter-block.partitioning.logStructured.mergeFactor"]
    res.sorted = data["inter-block.orderMaintenance.type"]
    res.directAddressing = data["inter-block.blockAccess.direct"]
    res.head  = data["inter-block.blockAccess.headLink"]
    res.tail = data["inter-block.blockAccess.tailLink"]
    res.prevLinks = data["intra-block.links.prev"]
    res.nextLinks = data["intra-block.links.next"]
    res.skiplinks = data["intra-block.links.skipLinks.type"]
    res.skiplinksProbability = data["intra-block.links.skipLinks.probability"]
    res.zoneMapMax = data["intra-block.filters.zoneMaps.max"]
    res.zoneMapMin = data["intra-block.filters.zoneMaps.min"]
    res.bloomFilters = data["intra-block.filters.bloomFilter.active"]
    res.HashFunctionsNum  = data["intra-block.filters.bloomFilter.hashFunctionsNumber"]
    res.NumOfBits = data["intra-block.filters.bloomFilter.numberOfBits"]
    res.keyRetention = data["intra-block.dataRetention.keyRetention.type"]
    res.keyRetentionCompression = data["intra-block.dataRetention.keyRetention.compression"]
    res.keyRetentionFunction = data["intra-block.dataRetention.keyRetention.function"]
    res.valueRetention = data["intra-block.dataRetention.valueRetention.type"]
    res.valueRetentionCompression = data["intra-block.dataRetention.valueRetention.compression"]
    res.valueRetentionFunction = data["intra-block.dataRetention.valueRetention.function"]
    res.capacity = data["intra-block.capacity.type"]
    res.capacityValue = data["intra-block.capacity.value"]
    res.capacityFunction = data["intra-block.capacity.function"]
    res.Utilization = data["intra-block.utilization.constraint"]
    res.UtilizationFunction = data["intra-block.utilization.function"]
    res.linksLayout = data["intra-block.links.linksMemoryLayout"]
    res.filtersLayout = data["intra-block.filters.filtersMemoryLayout"]
    res.keyValueLayout = data["intra-block.dataRetention.retainedDataLayout"]
    res.accessPartitions = data["intra-block.blockProperties.storage"]
    res.position_x = 1300
    res.position_y = 1000
    return res
}

dataTransToPy = function(data) {
    var res = {}
    res["metadata.general.name"] = data.name
    res["external.links.prev"] = data.prev
    res["external.links.next"] = data.next
    res["inter-block.fanout.type"] = data.fanout
    res["inter-block.fanout.fixedValue"]= data.fanoutFixedValue
    res["inter-block.fanout.function"] = data.fanoutFunction
    res["inter-block.partitioning.type"] = data.partitioning
    res["inter-block.partitioning.function"] = data.partitioningFunction
    res["inter-block.partitioning.logStructured.filtersPerLevel"] = data.filtersPerLevel
    res["inter-block.partitioning.logStructured.filtersPerRun"] = data.filtersPerRun
    res["inter-block.partitioning.logStructured.initialRunSize"] = data.initialRunSize
    res["inter-block.partitioning.logStructured.maxRunsPerLevel"] = data.maxRunsPerLevel
    res["inter-block.partitioning.logStructured.mergeFactor"] = data.mergeFactor
    res["inter-block.orderMaintenance.type"] = data.sorted
    res["inter-block.blockAccess.direct"] = data.directAddressing
    res["inter-block.blockAccess.headLink"]  = data.head
    res["inter-block.blockAccess.tailLink"] = data.tail
    res["intra-block.links.prev"] = data.prevLinks
    res["intra-block.links.next"] = data.nextLinks
    res["intra-block.links.skipLinks.type"] = data.skiplinks
    res["intra-block.links.skipLinks.probability"] = data.skiplinksProbability
    res["intra-block.filters.zoneMaps.max"] = data.zoneMapMax
    res["intra-block.filters.zoneMaps.min"] = data.zoneMapMin
    res["intra-block.filters.bloomFilter.active"] = data.bloomFilters
    res["intra-block.filters.bloomFilter.hashFunctionsNumber"]  = data.HashFunctionsNum
    res["intra-block.filters.bloomFilter.numberOfBits"] = data.NumOfBits
    res["intra-block.dataRetention.keyRetention.type"] = data.keyRetention
    res["intra-block.dataRetention.keyRetention.compression"] = data.keyRetentionCompression
    res["intra-block.dataRetention.keyRetention.function"] = data.keyRetentionFunction
    res["intra-block.dataRetention.valueRetention.type"] = data.valueRetention
    res["intra-block.dataRetention.valueRetention.compression"] = data.valueRetentionCompression
    res["intra-block.dataRetention.valueRetention.function"] = data.valueRetentionFunction
    res["intra-block.capacity.type"] = data.capacity
    res["intra-block.capacity.value"] = data.capacityValue
    res["intra-block.capacity.function"] = data.capacityFunction
    res["intra-block.utilization.constraint"] = data.Utilization
    res["intra-block.utilization.function"] = data.UtilizationFunction
    res["intra-block.links.linksMemoryLayout"] = data.linksLayout
    res["intra-block.filters.filtersMemoryLayout"] = data.filtersLayout
    res["intra-block.dataRetention.retainedDataLayout"] = data.keyValueLayout
    res["intra-block.blockProperties.storage"] = data.accessPartitions
    return res
}

postMessage = (trace, res, x, length) => {
    if (x === 4) {
        console.log(res);
    }
    $.ajax({
        type: "POST",
        url: '/app/simulate/',
        data: JSON.stringify(res),
        success: function (data) {
            if(Object.keys(data).length !== 0){
                trace[x] = data.res * 10000
                if (Object.keys(trace).length === length) {
                    tracePlot = {
                        x: [],
                        y: []
                    }
                    for (let k in trace) {
                        tracePlot.x.push(parseInt(k));
                        tracePlot.y.push(parseInt(trace[k]*1000));
                    }
                    Plotly.newPlot(plotDiv, [tracePlot],layout,option);
                    $('#simulatePlot').show('slow');
                }
                return true;
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
        },
        error: function() {
            swal({
              title: "Bad request!",
              text: "No data to refresh!",
              type: "error",
              timer: 1500,
              showConfirmButton: false,
            });
            return false;
        }
    });
}

simulate = function() {
    let res = {};
    res.nodes = {}
    let nodes = Object.assign({}, nodeInformation);
    for (let i in nodes) {
        let node = nodes[i];
        res.nodes[i] = dataTransToPy(node);
    }

    res.edges = Object.assign({}, nodeStructure);
    for (let i in res.edges) {
        delete res.edges[i].linkId;
        delete res.edges[i].sourcePort;
        delete res.edges[i].targetPort;
    }

    res.workload = deepcopy(workLoadInformation)

    let trace = {};
    const length = 5;
    for (let i = 0; i < length; i++) {
        res.workload.puts = i * 100; // range the puts from 0 to 400, step by 100
        postMessage(trace, deepcopy(res), i, length);
    }
}
