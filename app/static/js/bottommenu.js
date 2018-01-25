function openNav_bottom(){
	document.getElementById("bottomSidenav").style.height = "250px";
    document.getElementById("main").style.marginBottom= "250px";
}

function closeNav_bottom() {
    document.getElementById("bottomSidenav").style.height = "0";
    document.getElementById("main").style.marginBottom= "0";
}



(function(){
    var ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        vKey = 86,
        cKey = 67,
        entKey = 13;

    function _pre() {
        $("#ulCLI").append("<li> User(admin) >> "+$("#inputCLI").val()+"</li>");
    }

    function _answ(msg){
        $("#ulCLI").append("<li>"+msg+"</li>");
    }

    function _aft() {
        $("#inputCLI").val("");
        $("#textCLI").scrollTop($("#textCLI").scrollTop()+32);
    }

    function answerCLI(response) {
        _pre();
        _answ(response);
        _aft();
    }
    function _createNodewithInformation(){
        base_x = 800;
        base_y = 600;
        inc = 0;
        nodeInformation_tmp = {}
        for(nodeId in nodeInformation){
            inc += 10;
            nodename = nodeInformation[nodeId]["name"];
            methodname = "nodeModel_" + nodename.replace(" ","");
            debuglog(methodname)
            eval("tmp = new "+methodname+"({position: {x: "+(base_x+inc)+",y: "+(base_y+inc)+"},attrs:{'.rotatable':{tmpid: '"+nodeId+"'}},inPorts: [''],outPorts: ['']})")
            graph.addCell(tmp);
            //change to the new id
            newId = $("[model-id="+tmp.id+"]").find(".rotatable").attr("id");
            nodeInformation_tmp[newId] = nodeInformation[nodeId];
        }
        nodeInformation = nodeInformation_tmp;
    }
    function _createLinkwithStructure(){
        nodeStructure_tmp = []
        for(ind in nodeStructure){
            link = nodeStructure[ind]
            sourceId_old = link["sourceId"]
            targetId_old = link["targetId"]
            sourceId = $($.find(".rotatable[tmpid="+sourceId_old+"]")).attr("id")
            targetId = $($.find(".rotatable[tmpid="+targetId_old+"]")).attr("id")
            link_new = new createLink({
                source: { id: $($.find(".rotatable[tmpid="+sourceId_old+"]")).parent().parent().attr("model-id") },
                target: { id: $($.find(".rotatable[tmpid="+targetId_old+"]")).parent().parent().attr("model-id") }
            });
            graph.addCell(link_new);
            nodeStructure_tmp.push({
                sourceId: sourceId,
                targetId: targetId,
                linkId: link_new.id,
            });
        }
        nodeStructure = nodeStructure_tmp;
    }
    function _cmd_autolayout(){
        joint.layout.DirectedGraph.layout(graph, {marginX:600, marginY: 60,rankSep: 100, nodeSep: 50, edgeSep: 80,rankDir: "TB"});//setLinkVertices: false
        _answ("done");
    }

    function _cmd_start(){
        $.ajax({
            type: "GET",
            url: appname+"start/",
            async: false,
            data: "nodeStructure=" + JSON.stringify(nodeStructure) + "&nodeInformation=" + JSON.stringify(nodeInformation),
            success: _answ,
        });
    }

    function _cmd_show(){
        $.ajax({
            type: "GET",
            url: appname+"showStructure/",
            async: false,
            data: "",
            success: function(msg){
                //get information
                tmp = JSON.parse(msg);
                nodeStructure = tmp[0];
                nodeInformation = tmp[1];

                //clear canvas
                graph.fromJSON({"cells":[]});

                //add nodes
                _createNodewithInformation();

                //add links
                _createLinkwithStructure()

                //auto-layout
                joint.layout.DirectedGraph.layout(graph, {marginX:600, marginY: 60,rankSep: 100, nodeSep: 50, edgeSep: 80,rankDir: "TB"});//setLinkVertices: false

                //log sth
                _answ("show");
            },
        });
    }

    function _cmd_testload(){
        $.ajax({
            type: "GET",
            url: appname+"test/",
            async: false,
            data: "",
            success: function(msg){
                tmp = JSON.parse(msg);
                nodeStructure = tmp[0];
                nodeInformation = tmp[1];
                _answ("testload");
            },
        });
    }

    var SERVER_ON = false;
    async function _cmd_serve(){
        //clear canvas
        graph.fromJSON({"cells":[]});

        //loop
        SERVER_ON = true;
        INTERVALS = 1000;
        _cmd_start();
        while(SERVER_ON) {
            _cmd_testload();   // load data
            _cmd_show();       // show sth
            //_answ(JSON.stringify(nodeInformation));
            await sleep(INTERVALS);
        }
    }

    function _cmd_unknown(){
        $.ajax({
            type: "GET",
            url: appname+"commandLine/",
            data: "command=" + $("#inputCLI").val(),
            success: _answ,
        });
    }

    function _cmd_del(){
        nodeId = $("#"+cmd.replace("del","").trim()).parent().parent().attr("model-id");
        graph.getCell(nodeId).remove();
        delete nodeInformation[cmd.replace("del","").trim()];
        _answ("removed: "+nodeId);
    }

	$(document).keydown(function(event) {
        if (event.keyCode == ctrlKey)
            ctrlDown = true;
        }).keyup(function(event){
        if (event.keyCode == ctrlKey) {
            ctrlDown = false;
        }else if(ctrlDown &&  event.keyCode == cKey){
            SERVER_ON = false;
            _aft();
        }else if(event.keyCode == entKey){
            cmd = $("#inputCLI").val();
            switch (true){
                case /^serveron$/.test(cmd):
                    _pre();
                    _cmd_serve();
                    break;
                case /^del/.test(cmd): //cancel the links manually before delete node
                    _pre();
                    _cmd_del();
                    _aft();
                    break;
                case /^testload$/.test(cmd):
                    _pre();
                    _cmd_testload();
                    _aft();
                    break;
                case /^autolayout$/.test(cmd):
                    _pre();
                    _cmd_autolayout();
                    _aft();
                    break;
                case /^start$/.test(cmd):
                    _pre();
                    _cmd_start();
                    _aft();
                    break;
                case /^show$/.test(cmd):
                    _pre();
                    _cmd_show();
                    _aft();
                    break;
                default:
                    _pre();
                    _cmd_unknown();
                    _aft();
            }
	    }
	});
	$("#inputCLI")[0].focus();
})();
