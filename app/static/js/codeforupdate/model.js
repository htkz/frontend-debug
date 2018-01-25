showModels = function() {
    $('.model-pannel').show(700);
}

hideModels = function() {
    $('.model-pannel').hide(700);
}

updateModel = function(event) {
    var name = event.textContent;
    $.ajax({
        type: "POST",
        url: '/app/get_model/',
        data: JSON.stringify({'name': name}),
        success: function (data) {
            var name = data.name;
            var spec = data.spec;
            var model = data.model;
            document.querySelector('.model-pannel .specs p').textContent = spec;
            document.querySelector('.model-pannel .models p').textContent = model;
            // clearModel();
            // drawModel(model);
        }
    });
}

updateBrand = function(name) {
    document.querySelector('#navbar-brand').textContent = name;
}

clearModel = function() {
    var parent = document.querySelector(".models");
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

getPlotFunction = function(model) {
    var funcName = model[1];
    var funcExpress;
    switch (funcName) {
        case 'SimpleLinearModel':
            var para1 = parseFloat(model[2]);
            var para2 = parseFloat(model[3]);
            funcExpress = `${para1} * x + ${para2}`;
            break;
        default:
            var para1 = parseFloat(model[2]);
            var para2 = parseFloat(model[3]);
            funcExpress = `${para1} * x + ${para2}`;
    }
    return funcExpress;
}

drawModel = function(model) {
    var modelArr = model.split('\n');
    for (var i = 0; i < modelArr.length; i++) {
        // fetch model info
        var modelStr = modelArr[i];
        var model = modelStr.split(' ');
        var name = model[0];
        // var name = `${i}`
        // create cards for model
        var models = document.querySelector(".models");
        if(i % 5 === 0) {
            var cards = document.createElement('div');
            cards.setAttribute('class', 'cards');
            models.appendChild(cards);
        }
        var cards = document.querySelector('.cards:last-child');
        // create card
        var card = document.createElement('div');
        card.setAttribute('class', 'card');
        var span = document.createElement('span');
        span.textContent = name;
        var plot = document.createElement('div');
        var plotId = `plot${i}`;
        plot.setAttribute('id', plotId);
        plot.classList.add('plot')
        card.appendChild(span);
        card.appendChild(plot);
        cards.appendChild(card);
        // get plot image
        var fn = getPlotFunction(model);
        draw(`#${plotId}`, fn);
    }
}


// initial click function to model
var listItems = document.querySelectorAll('.model-pannel li');
for (var i = 0; i < listItems.length; i++) {
    var item = listItems[i];
    item.addEventListener('click', function() {
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].classList.remove('selected');
        }
        this.classList.add('selected');
        updateModel(this);
        updateBrand(this.textContent);
    })
}

// initial ok button
$('.model-pannel .ok').on('click', hideModels);
