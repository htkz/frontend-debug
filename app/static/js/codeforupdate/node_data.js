node_data = nodeData('#785396','devs.da', 'DA', 'NODE DATA', '123');

trie_node = nodeData('#c567hd','devs.da', 'TN', 'TRIE NODE', '123');
ordered_datapage = nodeData('#d2c64f','devs.da', 'OD', 'ORDERED DATAPAGE', '123');
unordered_datapage = nodeData('#d27f49','devs.da', 'UD', 'UNORDERED DATAPAGE', '123');
linked_list = nodeData('#327196','devs.da', 'LL', 'LINKED LIST', '123');
range_partitioning = nodeData('#726497','devs.da', 'RP', 'RANGE PARTITIONING', '123');
hash_partitioning = nodeData('#027419','devs.da', 'HP', 'HASH PARTITIONING', '123');
quantiles_node = nodeData('#8265f9','devs.da', 'QN', 'QUANTILES NODE', '123');
skip_list = nodeData('#271587','devs.da', 'SL', 'SKIP LIST', '123');


data_selector = {
    "NODE DATA": node_data,
    'TRIE NODE': trie_node,
    'ORDERED DATAPAGE': ordered_datapage,
    'UNORDERED DATAPAGE': unordered_datapage,
    'LINKED LIST': linked_list,
    'RANGE PARTITIONING': range_partitioning,
    'HASH PARTITIONING': hash_partitioning,
    'QUANTILES NODE': quantiles_node,
    'SKIP LIST': skip_list
}



saveToDatabase = function() {
    // save position
    var elements = graph.getElements()
    for(var i in elements) {
        var id = idToName[elements[i].id]
        var pos = elements[i].attributes.position
        if (nodeInformation[id]) {
            nodeInformation[id].position_x = pos.x
            nodeInformation[id].position_y = pos.y
        }
    }
    // save link、node、workload information
    document.getElementById("link-properties").value = JSON.stringify(nodeStructure);
    document.getElementById('node-properties').value = JSON.stringify(nodeInformation);
    document.getElementById('workload-properties').value = JSON.stringify(workLoadInformation);
    document.getElementById('element-properties').value = JSON.stringify(elementInformation);
    document.getElementById('datastructure-properties').value = JSON.stringify(dataStructures);
    // present success to user
    swal({
        title: "Nice!",
        text: "Saved to database! ",
        type: "success",
        timer: 1000,
        showConfirmButton: false,
    });
}
