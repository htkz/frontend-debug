sideNavShowNodeProperty = function(nodeId) {
    openNav_right();
    $.each($('#form-node').find('[name]'),function(ind,val){
        $(val).val(nodeInformation[nodeId][$(val).attr('name')]);
    })
    $('#form-node').find('[name=nodeId]').val(nodeId);

    document.getElementById('form-node').style.display = 'block'
    document.getElementById('form-workload').style.display = 'none'
}

sideNavShowWorkloadProperty = function(worklaodId) {
    openNav_right();
    $.each($('#form-workload').find('[name]'),function(ind,val){
        $(val).val(workLoadInformation[worklaodId][$(val).attr('name')]);
    })
    $('#form-workload').find('[name=worklaodId]').val(worklaodId);

    document.getElementById('form-node').style.display = 'none'
    document.getElementById('form-workload').style.display = 'block'
}

sideNavShowElementProperty = function(elementId) {
    openNav_right();
    $.each($('#form-node').find('[name]'),function(ind,val){
        $(val).val(elementInformation[elementId][$(val).attr('name')]);
    })
    $('#form-node').find('[name=nodeId]').val(elementId);

    // make it editable
    $('#form-node option:not(:selected)').prop('disabled', false);
    $('#form-node input').prop('readonly', false);
    $('#nodeId').prop('readonly', true);
    $('#buttonsave').show();

    // make radar chart
    clearRadarChart();
    var data = elementInformation[elementId];
    drawRadarChart(data);
    $('.radar-chart').parent().parent().show();

    // display form-node
    document.getElementById('form-node').style.display = 'block'
    document.getElementById('form-workload').style.display = 'none'


}

changeNodeDisplay = function(id) {
    var cell = graph.getCell(nameToId[id])
    if(cell.attr('./display') == "none"){
        cell.attr('./display', 'inline')
    } else {
        cell.attr('./display', 'none')
    }
}




// function addChart() {
//     // var dataset = {'min': 0, 'max': 40, 'buckets': 4, 'counts': [7, 4, 3, 2, 1,3,3,3,3,3,4,5,6,7,8,9,],};
//     // var data = parseData(dataset);
//     // var xAxis = parseOffset(dataset);
//     // tmp = new smallChart(data, xAxis)
//     // // console.log(tmp.attributes.series[0].data);
//     // graph.addCell(tmp);
//
//     function circlePath(cx, cy, r){
//         return 'M '+cx+' '+cy+' m -'+r+', 0 a '+r+','+r+' 0 1,0 '+(r*2)+',0 a '+r+','+r+' 0 1,0 -'+(r*2)+',0';
//     }
//     var result = circlePath(40,5,10)
//     console.log(result);
// }
