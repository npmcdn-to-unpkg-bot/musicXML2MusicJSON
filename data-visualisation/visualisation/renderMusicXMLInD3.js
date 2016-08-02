function createCanvas() {
    var canvas = d3.select("body").append("svg");
    canvas.attr("width", 8000).attr("height", 550).append("rect").attr("x", 0).attr("y", 0).attr("height", 800).attr("width", 8000).style("fill", "lightgray");
    return canvas;
}

function createRuler(canvas) {
    return canvas;
}

function drawPianoRoll() {}

var canvas = createCanvas();
var ruledCanvas = createRuler(canvas);

d3.json("data/rawData.json", function (error, data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i])
        canvas.selectAll("rect")
            .data(data[i])
            .enter()
            .append("rect")
                .attr("height", 10)
                .attr("width", function (d, i) {
                    //console.log(d.duration);
                    return d.duration / 25.6
                })
                .attr("x", function (d, i) {
                    //console.log(d.absLocation);
                    return d.absLocation / 25.6;
                })
                .attr("y", function(d,i) {
                    console.log(d.midiNumber)
                    return 880 - (d.midiNumber * 10);
                })
    }
})