const plotDiv = document.getElementById('simulatePlot');
let trace = {
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]
};
const layout = {
    margin: {
        t: 0
    },
    xaxis: {
        title: 'size/M',
        zeroline: false
    },
    yaxis: {
        title: 'cost/get latency',
        zeroline: false
    },
};
const option = {
    displayModeBar: false
};

Plotly.plot(plotDiv, [trace],layout,option);

$('#simulatePlot .close-btn').click(function(event) {
    $(this).parent().hide('slow');
});
