var width = 1280,
    height = 1500;

var nodes = []

var force = d3.layout.force()
    .nodes(nodes)
    .charge(-500)
    .size([width, height])
    .on("tick", tick);

var svg = d3.select("#svgwraper").append("svg")
    .attr("width", width)
    .attr("height", height);

console.log(svg)

var node = svg.selectAll(".node")

setInterval(function(){
    if (nodes.length > 60) {
        nodes.splice(0, 15);
        force.charge(-40)
    } else if (nodes.length > 50) {
        nodes.splice(0, 10);
        force.charge(-50)
    } else if (nodes.length > 40) {
        nodes.splice(0, 8);
        force.charge(-70)
    } else if (nodes.length > 30) {
        nodes.splice(0, 6);
        force.charge(-80)
    } else if (nodes.length > 20) {
        nodes.splice(0, 4);
        force.charge(-100)
    } else if (nodes.length > 10) {
        nodes.splice(0, 2);
        force.charge(-300)
    } else if (nodes.length > 1) {
        nodes.splice(0, 1);
        force.charge(-500)
    }
}, 2000);

function start() {
    node = node.data(force.nodes(), function(d) { return d.id;});
    node.enter().append("circle").attr("class", function(d) {
            return "node"
        }
    ).attr("fill-opacity", function(d) {
            return (1 - (d.volume * 15))
        }
    ).attr("r", function(d) {
            console.log(d.volume)
            return d.volume * 800
        });
    node.exit().remove();
    force.start();
}

function tick() {
    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function draw (sound) {
    var b = {id: makeid(), 'volume': sound.volume}
    nodes.push(b);
    //links.push({source: a, target: b}, {source: b, target: c});
    start();
}


startListen(draw)