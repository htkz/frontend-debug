joint.shapes.chart.Plot=joint.shapes.basic.Generic.extend(
    {
        markup:[
            '<a>',
            '<clipPath class="clip"><rect/></clipPath>',
            '<g class="rotatable">',
            '<g class="scalable"></g>',
            '<g class="background"><rect/><text/></g>',
            '<g class="axis">',
            '<g class="y-axis"><path/><g class="ticks"></g></g>',
            '<g class="x-axis"><path/><g class="ticks"></g></g>',
            '<g class="markings"></g>',
            "</g>",
            '<g class="data"><g class="series"></g></g>',
            '<g class="foreground">',
            '<rect/><text class="caption"/><text class="subcaption"/>',
            '<g class="legend"><g class="legend-items"></g></g>',
            '<a class="close">',
            '<g class="btn del"><circle class="del"/><text class="del">-</text></g>',
            '</a>',
            '<line class="guideline x-guideline" /><line class="guideline y-guideline" />',
            "</g>",
            "</g>",
            '</a>',
        ].join(""),
        tickMarkup: '<g class="tick"><line/><text/></g>',
        pointMarkup:'<g class="point"><circle/><text/></g>',
        barMarkup:'<path class="bar"/>',
        markingMarkup:'<g class="marking"><rect/><text/></g>',
        serieMarkup:'<g><clipPath class="serie-clip"><rect/></clipPath><path/><g class="bars"></g><g class="points"></g></g>',
        legendItemMarkup:'<g class="legend-item"><circle/><text/></g>',
        defaults:joint.util.deepSupplement({
            type:"chart.Plot",
            attrs:{
                ".data path":{fill:"none",stroke:"black"},
                ".data .bars rect":{fill:"none",stroke:"black"},
                ".background rect":{fill:"white",stroke:"#e5e5e5",opacity:1},
                ".background text":{fill:"black",text:"No data available.",ref:".","ref-x":.5,"ref-y":.5,"text-anchor":"middle","y-alignment":"middle",display:"none"},
                ".foreground > rect":{fill:"white",stroke:"#e5e5e5",opacity:0,"pointer-events":"none"},
                ".foreground .caption":{fill:"black",text:"",ref:".foreground > rect","ref-x":.5,"ref-y":10,"text-anchor":"middle","y-alignment":"middle","font-size":14},
                ".foreground .subcaption":{fill:"black",text:"",ref:".foreground > rect","ref-x":.5,"ref-y":23,"text-anchor":"middle","y-alignment":"middle","font-size":10},
                ".point":{display:"inline-block"},
                ".point circle":{r:2,stroke:"black",fill:"black",opacity:.3},
                ".point text":{fill:"black","font-size":8,"text-anchor":"middle",display:"none"},
                ".axis path":{fill:"none",stroke:"black"},
                ".axis .tick":{fill:"none",stroke:"black"},
                ".y-axis .tick line":{fill:"none",stroke:"black",x2:2,y2:0,opacity:1},
                ".x-axis .tick line":{fill:"none",stroke:"black",x2:0,y2:-3,opacity:1},
                ".y-axis .tick text":{fill:"white",stroke:"none","font-size":20,"text-anchor":"end"},
                ".x-axis .tick text":{fill:"white",stroke:"none","font-size":20,"text-anchor":"middle"},
                ".y-axis .tick text > tspan":{dy:"-.5em",x:-5},".x-axis .tick text > tspan":{dy:".5em",x:0},
                ".axis .markings":{fill:"black",stroke:"none","fill-opacity":1},".axis.markings text":{fill:"black","text-anchor":"end","font-size":10,dy:-5,dx:-5},
                ".guideline":{"pointer-events":"none",display:"none"},
                ".x-guideline":{stroke:"black",visibility:"hidden"},
                ".y-guideline":{stroke:"black",visibility:"hidden"},
                ".legend":{ref:".background","ref-x":10,"ref-y":10},
                ".legend-item text":{fill:"black",transform:"translate(14, 0)","font-size":11},
                ".legend-item circle":{r:5,transform:"translate(5,5)"},".legend-item":{cursor:"pointer"},
                ".legend-item.disabled circle":{fill:"gray"},
                ".legend-item.disabled text":{opacity:.5}}},joint.shapes.basic.Generic.prototype.defaults),
                legendPosition:function(a,b)
                {b=b||{},this.trigger("batch:start"),this.removeAttr([".legend/ref-x",".legend/ref-y",".legend/ref-dx",".legend/ref-dy",".legend/x-alignment",".legend/y-alignment"],{silent:!0});var c=b.padding||10,d=
                {n:{".legend":{"ref-x":.5,"x-alignment":-.5,"ref-y":c}},ne:{".legend":{"ref-dx":-c,"x-alignment":-.999,"ref-y":c}},e:{".legend":{"ref-dx":-c,"x-alignment":-.999,"ref-y":.5,"y-alignment":-.5}},
                se:{".legend":{"ref-dx":-c,"ref-dy":-c,"x-alignment":-.999,"y-alignment":-.999}},s:{".legend":{"ref-x":.5,"ref-dy":-c,"x-alignment":-.5,"y-alignment":-.999}},sw:{".legend":{"ref-x":c,"ref-dy":-c,"y-alignment":-.999}},
                w:{".legend":{"ref-x":c,"ref-y":.5,"y-alignment":-.5}},
                nw:{".legend":{"ref-x":c,"ref-y":c}},
                nnw:{".legend":{"ref-x":c,"ref-y":-c,"y-alignment":-.999}},
                nn:{".legend":{"ref-x":.5,"ref-y":-c,"x-alignment":-.5,"y-alignment":-.999}},
                nne:{".legend":{"ref-dx":-c,"ref-y":-c,"x-alignment":-.999,"y-alignment":-.999}},nnee:{".legend":{"ref-dx":c,"ref-y":-c,"y-alignment":-.999}},nee:{".legend":{"ref-y":c,"ref-dx":c}},
                ee:{".legend":{"ref-dx":c,"ref-y":.5,"y-alignment":-.5}},see:{".legend":{"ref-dx":c,"ref-dy":-c,"y-alignment":-.999}},ssee:{".legend":{"ref-dx":c,"ref-dy":c}},
                sse:{".legend":{"ref-dx":-c,"ref-dy":c,"x-alignment":-.999}},ss:{".legend":{"ref-x":.5,"ref-dy":c,"x-alignment":-.5}},ssw:{".legend":{"ref-x":c,"ref-dy":c}},
                ssww:{".legend":{"ref-x":-c,"ref-dy":c,"x-alignment":-.999}},sww:{".legend":{"ref-x":-c,"ref-dy":-c,"x-alignment":-.999,"y-alignment":-.999}},
                ww:{".legend":{"ref-x":-c,"ref-y":.5,"x-alignment":-.999,"y-alignment":-.5}},nww:{".legend":{"ref-x":-c,"ref-y":c,"x-alignment":-.999}},nnww:{".legend":{"ref-x":-c,"ref-y":-c,"x-alignment":-.999,"y-alignment":-.999}}};
                d[a]&&this.attr(d[a]),this.trigger("batch:stop")},
                addPoint:function(a,b,c){c=c||{};var d=this.get("series"),
                e=_.findIndex(d,{name:b});if(e===-1)throw new Error("Serie "+b+" was not found.");
                var f=_.cloneDeep(d[e]);f.data.push(a),_.isFinite(c.maxLen)&&f.data.length>c.maxLen&&f.data.shift(),d=d.slice(),d[e]=f,this.set("series",d,c)},
                lastPoint:function(a){return _.last(_.findWhere(this.get("series"),{name:a}).data)},
                firstPoint:function(a){return _.first(_.findWhere(this.get("series"),{name:a}).data
            )
        }
    }
)

detailedChart = function(data, xAxis) {
    var chart = new joint.shapes.chart.Plot({
        position: { x: 80, y: 80 },
        size: { width: 1000, height: 400 },
        series: [
            { name: 'precipitation', label: 'Precipitation (mm)', bars: { barWidth: 0.95, align: 'left' }, data: data,}
        ],
        axis: {
            'x-axis': {
                tickFormat: function(tick) {
                    return (xAxis)[tick];
                }
            },
            'y-axis': { ticks: 5, tickFormat: '.0f' }
        },
        padding: { top: 30, bottom: 30, left: 0, right: 0 },
        attrs: {
            '.caption': { text: 'Status', fill: '#111111', 'font-weight': 'bold', 'font-size': '40', 'ref-y': 30, ref: '.background', 'ref-x': .5, },
            '.data .precipitation path': { fill: '#4572A7', stroke: '#4572A7' },
            '.x-axis text': { transform: 'translate(0, 15) ' },
            '.precipitation .point': { display: 'none' },
            '.legend-item': { display: 'none'},
            '.btn>circle': { r: 12, fill: 'transparent', stroke: '#333', 'stroke-width': 2, },
            '.btn.del': { 'ref-dx': 380,'ref-y': 5, 'ref': '.legend-item',},
            'a.close': {onclick: 'deleteChart(this.id)'},
            '.btn.del>text': { fill: 'black','font-size': 28, 'font-weight': 500, stroke: "#000", x: -4.5, y: 6, 'font-family': 'Times New Roman' },
            '.': { fill: 'white'},
        }
    });
    chart.legendPosition('n');
    return chart
}
smallChart = function(data, xAxis){
    var chart = new joint.shapes.chart.Plot({
        position: { x: 480, y: 480 },
        size: { width: 200, height: 100 },
        series: [
            { name: 'precipitation', label: 'Status', bars: { barWidth: 0.95, align: 'left' }, data: data,}
        ],
        axis: {
            'x-axis': {
                tickFormat: function(tick) {
                    return (xAxis)[tick];
                }
            },
            'y-axis': { ticks: 5, tickFormat: '.0f' }
        },

        padding: { top: 30, bottom: 30, left: 0, right: 0 },
        attrs: {
            '.caption': { text: 'Status', fill: '#111111', 'font-weight': 'bold', 'ref-y': 10, ref: '.background', 'ref-x': .5,},
            '.data .precipitation path': { fill: '#4572A7', stroke: '#4572A7' },
            '.x-axis text': { display: 'none' },
            '.y-axis text': { display: 'none' },
            '.precipitation .point': { display: 'none' },
            '.legend-item': { display: 'none'},
            // 'a': { onclick: 'showDetail(id)' }
        }
    });
    chart.legendPosition('n');
    // chart.attr('a/id', chart.id)
    // chart.attr('a/data', data)
    // chart.attr('a/xAxis', xAxis)
    // chartInfomation.push([chart., data, xAxis])
    chart.attr('a/onclick', 'showDetail(this)')
    return chart
}

showDetail = function(data) {
    // if there are a detailed chart, will not create a new one
    // for (var i = 0; i < chartInfomation.length; i++) {
    //     if(chartInfomation[i][0] == id){
    //         return false
    //     }
    // }

    // var detail = detailedChart(data)
    // graph.addCell(detail)
}
deleteChart = function(id) {
    // console.log(id);
    // var a = document.getElementById(id)
    // console.log(a);
    // for (var i = 0; i < chartInfomation.length; i++) {
    //     if(chartInfomation[i][1] == id) {
    //         chartInfomation.splice(pos, i)
    //     }
    // }
    graph.removeCells(graph.getLastCell())
}

parseData = function(dataset) {
    var data = []
    if(dataset['counts'].length == 0) {
        return data
    }
    var counts = dataset['counts']
    for (var i = 0; i < counts.length; i++) {
        data.push({x: i, y: counts[i]})
    }
    data.push({x: i, y: 0})
    return data
}
parseOffset = function(dataset) {
    var offset = (dataset['max'] - dataset['min']) / dataset['buckets'] //10
    var axis = {}
    var counts = dataset['counts']
    for (var i = 0; i < counts.length + 1; i++) {
        axis[i.toString()] = (i * offset).toString()
    }
    return axis
}


// var dataset = {'min': 0, 'max': 40, 'buckets': 4, 'counts': [7, 4,6,7,8,9,],};
// var data = parseData(dataset);
// var xAxis = parseOffset(dataset);
// chartInfomation.push([data, xAxis, id])
