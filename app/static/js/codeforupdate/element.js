getElementColor = function(elementid) {
    var color = elementInformation[elementid].color;
    return color;
}

addElementChild = function(name, elementId) {
    //add instance
    let parent = document.getElementById("panel-element-100001");
    let p = document.createElement('p');
    let elementText = document.createElement('a');
    let iconEdit = document.createElement('i');
    let iconColor = document.createElement('i');
    let iconDelete = document.createElement('i');
    let text = document.createTextNode(name);
    // element text
    elementText.setAttribute('id', elementId);
    elementText.setAttribute('href', '#');
    elementText.appendChild(text);
    elementText.classList.add('element-left', 'not-selectable');
    elementText.addEventListener('click', function(){
        if(function_disable) return;
        addInstance(elementId);
    });
    // icon-edit
    iconEdit.setAttribute('id', elementId+'add');
    iconEdit.classList.add('element-right');
    iconEdit.classList.add('icon-button');
    iconEdit.classList.add('fa','fa-edit');
    iconEdit.addEventListener('click', function() {
        sideNavShowElementProperty(elementId);
    });
    // icon-color
    iconColor.setAttribute('id', elementId+'color');
    iconColor.classList.add('element-icon-color');
    iconColor.classList.add('fa', 'fa-circle');
    iconColor.style.color = getElementColor(elementId)

    // icon-delete
    iconDelete.setAttribute('id', elementId+'delete');
    iconDelete.classList.add('element-right');
    iconDelete.classList.add('icon-button');
    iconDelete.classList.add('fa', 'fa-times-circle-o');
    iconDelete.addEventListener('click', function() {
        if(function_disable) return;
        deleteElement(elementId);
    });

    p.appendChild(iconColor);
    p.appendChild(elementText);
    p.appendChild(iconDelete);
    p.appendChild(iconEdit)

    parent.appendChild(p);
}

deleteElementChild = function(elementId) {
    var p = $('#'+elementId).parent();
    p.remove();
}

addElement = function() {
    swal({
        title: "Element name!",
        text: "Please input new element name:",
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
        if(elementPool.indexOf(inputValue) !== -1) {
            swal.showInputError("Element type already exists, please change it.");
            return false;
        }
        swal({
          title: "Nice!",
          text: "New element: " + inputValue,
          type: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        var elementId = 'element-' + idGenerator();
        elementPool.push(elementId);
        elementInformation[elementId] = Object.assign({}, elementDefault);
        elementInformation[elementId].name = inputValue;
        addElementChild(inputValue, elementId);
        addElementToDB(elementId)
    });
}

deleteElement = function(elementId) {
    var index = elementPool.indexOf(elementId);
    elementPool.splice(index, 1);
    delete elementInformation[elementId];
    deleteElementChild(elementId);
    deleteElementFromDB(elementId);
}

deleteElementFromDB = function(elementId) {
    $.ajax({
        url: '/app/delete_element_from_db/',
        type: 'GET',
        data: {elementId: elementId}
    })
}

addElementToDB = function(elementId) {
    var elementInfo = elementInformation[elementId];
    var data = {
        elementId: elementId,
        elementInfo: elementInfo
    }
    $.ajax({
        url: '/app/add_element_to_db/',
        type: 'GET',
        dataType: 'json',
        data: {element: JSON.stringify(data)}
    })
}

updateElementToDB = function(elementId) {
    var elementInfo = elementInformation[elementId];
    var data = {
        elementId: elementId,
        elementInfo: elementInfo
    }
    $.ajax({
        url: '/app/update_element_to_db/',
        type: 'GET',
        dataType: 'json',
        data: {element: JSON.stringify(data)}
    })
}
