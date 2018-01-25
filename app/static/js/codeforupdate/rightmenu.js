function openNav_right() {
    document.getElementById("rightSidenav").style.width = "350px";
}

function closeNav_right() {
    document.getElementById("rightSidenav").style.width = "0";
    document.getElementById("main").style.marginRight= "0";
}

function saveNodeProperties() {
  // save node information
  if(Object.keys(nodeInformation).length != 0) {
      var nodeId = $('#form-node').find('[name=nodeId]').val();
      $.each($('#form-node').find('[name]'),function(ind,val){
          nodeInformation[nodeId][$(val).attr('name')] = $(val).val();
          debuglog('nodeId:'+nodeId+' attr:'+ $(val).attr('name') + ' value:' + $(val).val());
      });
      debuglog('saved'+nodeInformation[nodeId]);
  }
  swal({
      title: 'Node alreay saved!',
      type: 'success',
      timer: 1000,
      showConfirmButton: false
  })


}


function saveWorkLoadProperties() {
  if(Object.keys(workLoadInformation).length != 0){
      var nodeId = $('#form-workload').find('[name=workload-id]').val();
      $.each($('#form-workload').find('[name]'),function(ind,val) {
          workLoadInformation[nodeId][$(val).attr('name')] = $(val).val();
          debuglog('nodeId:'+nodeId+' attr:'+ $(val).attr('name') + ' value:' + $(val).val());
      });
  }

  swal({
      title: 'Node alreay saved!',
      type: 'success',
      timer: 1000,
      showConfirmButton: false
  })

}

// update name and color in left menu
updateLeftMenu = function(elementId) {
    // name
    var element = $('#'+elementId)[0]
    // console.log(elementInformation[elementId]);
    element.textContent = elementInformation[elementId].name;
    // color
    var iconColor = $('#'+elementId+'color')[0]
    iconColor.style.color = elementInformation[elementId].color;
}

function saveElementProperties() {
    var elementId = $('#form-node').find('[name=nodeId]').val();
    console.log(elementInformation[elementId]);
    $.each($('#form-node').find('[name]'),function(ind,val){
        // parse num
        if(parseInt($(val).val()) || parseInt($(val).val()) === 0) {
            var value = parseInt($(val).val());
        } else {
            var value = $(val).val();
        }
        elementInformation[elementId][$(val).attr('name')] = value;
    });
    console.log(elementInformation[elementId]);
    swal({
        title: 'Element alreay saved!',
        type: 'success',
        timer: 1000,
        showConfirmButton: false
    })
    updateLeftMenu(elementId);
    updateElementToDB(elementId);
}

changeFanoutInput = function(option) {
    switch (option) {
        case "fixed":
            document.getElementsByName("fanoutFixedValue")[0].style.display = "inline";
            document.getElementsByName("fanoutFunction")[0].style.display = "none";
            break;
        case "function":
            document.getElementsByName("fanoutFixedValue")[0].style.display = "none";
            document.getElementsByName("fanoutFunction")[0].style.display = "inline";
            break;
        default:
            document.getElementsByName("fanoutFixedValue")[0].style.display = "none";
            document.getElementsByName("fanoutFunction")[0].style.display = "none";
    }
}

changeCapacityInput = function(option) {
    switch (option) {
        case "fixed":
            document.getElementsByName("capacityValue")[0].style.display = "inline";
            document.getElementsByName("capacityFunction")[0].style.display = "none";
            break;
        case "function":
            document.getElementsByName("capacityValue")[0].style.display = "none";
            document.getElementsByName("capacityFunction")[0].style.display = "inline";
            break;
        default:
            document.getElementsByName("capacityValue")[0].style.display = "none";
            document.getElementsByName("capacityFunction")[0].style.display = "none";
    }
}

changePartition = function(option) {
    switch (option) {
        case "yes":
            document.getElementsByName("partitioningFunction")[0].style.display = "inline";
            break;
        default:
            document.getElementsByName("partitioningFunction")[0].style.display = "none";
    }
}
