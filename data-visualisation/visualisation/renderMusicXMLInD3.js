function createCanvas() {
    var canvas = d3.select("body").append("svg");
    
    canvas
        .attr("width", 8000)
        .attr("height", 550)
        .attr("class", "canvas")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", 800)
        .attr("width", 8000)
        .style("fill", "lightgray");
        
    
    return canvas;
}

function createRuler(canvas) {
    return canvas;
}

function drawPianoRoll() {}

var canvas = createCanvas();
var ruledCanvas = createRuler(canvas);

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "steelblue")
    .style("color", "white")
    .style("border-radius", "5px")
    .style("padding", "3px");



d3.json("data/rawData.json", function (error, data) {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
        console.log(data[i])
       canvas.selectAll("rect")
            .data(data[i])
            .enter()
            .append("rect")
                .attr("height", 10)
                .attr("width", function (d, i) {
                    
                    return d.duration / 256 * 25
                })
                .attr("x", function (d, i) {

                    return d.absLocation / 256 * 25;
                })
                .attr("y", function(d,i) {
                    
                    return 880 - (d.midiNumber * 10);
                })
                .on("mouseover", function(d){
                    var el = d3.select(this).attr("width")
                    
                    console.log(el);
                    var textForTip = "<strong>Pitch:</strong> " + el + ", Midi number " + d.midiNumber;
                    tooltip.html(textForTip); 
                    return tooltip.style("visibility", "visible");
                })
                .on("mousemove", function(){
                    return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
                })
                .on("mouseout", function(){
                    return tooltip.style("visibility", "hidden");
                });

    }
})