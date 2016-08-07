var color = 0;

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

var canvas = createCanvas();
var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "steelblue")
    .style("color", "white")
    .style("border-radius", "5px")
    .style("padding", "3px")
    .style("font-size", "10px")
    .style("width", "200px");


function covertMidiNumberToNamedNote(midiNumber) {
    var noteInOctave = midiNumber % 12;
    var octave = Math.floor(midiNumber / 12);

    
    if (noteInOctave === 0) {
        return 'C' + octave;
    } else if (noteInOctave === 1) {
        return 'C#/Db' + octave;
    } else if (noteInOctave === 2) {
        return 'D' + octave;
    } else if (noteInOctave === 3) {
        return 'D#/Eb' + octave;
    } else if (noteInOctave === 4) {
        return 'E' + octave;
    } else if (noteInOctave === 5) {
        return 'F' + octave;
    } else if (noteInOctave === 6) {
        return 'F#/Gb' + octave;
    } else if (noteInOctave === 7) {
        return 'G' + octave;
    } else if (noteInOctave === 8) {
        return 'G#/Ab' + octave;
    } else if (noteInOctave === 9) {
        return 'A' + octave;
    } else if (noteInOctave === 10) {
        return 'A#/Bb' + octave;
    } else if (noteInOctave === 11) {
        return 'B' + octave;
    }
    

}
 

function createTextForToolTip(absLocation,
                               beatType,
                               beats,
                               currentVoice,
                               duration,
                               durationWithNotations,
                               instrument,
                               isHarmony,
                               location,
                               measure,
                               measureLocationInQuarterNotes,
                               midiNumber,
                               qbpm,
                               timeStamp) {
    
    
   var noteFromMidi = covertMidiNumberToNamedNote(midiNumber);
    
    return "<strong>Location:</strong> " 
        + absLocation
        + "<br><strong>Current time signature:</strong> " 
        + beats + '/' + beatType
        + "<br><strong>Current voice:</strong> " 
        + currentVoice
        + "<br><strong>Duration:</strong> " 
        + duration 
        + "<br><strong>Duration with notations:</strong> " 
        + durationWithNotations
        + "<br><strong>Instrument:</strong> " 
        + instrument
        + "<br><strong>Is harmony:</strong> " 
        + isHarmony
        + "<br><strong>Location in measure:</strong> " 
        + location
        + "<br><strong>Measure:</strong> " 
        + measure
        + "<br><strong>Measure location in quarter notes:</strong> " 
        + measureLocationInQuarterNotes
        + "<br><strong>Midi number</strong> " 
        + midiNumber
        + "<br><strong>Quarter beats per minute</strong> " 
        + qbpm
        + "<br><strong>Timestamp</strong> " 
        + timeStamp
        + "<br><strong>Note name</strong> " 
        + noteFromMidi
        
      


}




d3.json("data/output.json", function (error, data) {

    var arr = [];
    for (var j = 0; j < data.length; j++) {
        color = color + 1
        
       var x = canvas.append("g")
       x.selectAll("rect")
            .data(data[j])
            .enter()
            .append("rect")
                .attr("height", 10)
                .attr("width", function (d, i) {
                    
                    return d["Duration"] / 256 * 25
                })
                .attr("x", function (d, i) {

                    return (d["Location"] / 256 * 25) + 50;
                })
                .attr("y", function(d,i) {
                    
                    return 880 - (d["Midi number"] * 10);
                })
                .attr("fill", function() {
                    return d3.interpolateCubehelixDefault(color)
                })
                
                .on("mouseover", function(d, i){
                    
                    var dataForNode = d3.select(this).datum();
                   
                    var duration = d3.select(this).attr("width")
                    var pitch = d3.select(this).attr("y")
                    var location = d3.select(this).attr("x")
                    var textForDisplay = createTextForToolTip(
                          dataForNode["Location"], 
                          dataForNode["Time signature denominator"], 
                          dataForNode["Time signature numerator"], 
                          dataForNode["Voice"], 
                          dataForNode["Duration"],
                          dataForNode["Duration due to tied notes"], 
                          dataForNode["Instrument"], 
                          dataForNode["Harmony note flag"],
                          dataForNode["Location in measure"], 
                          dataForNode["Current measure"], 
                          dataForNode["Measure location"], 
                          dataForNode["Midi number"],
                          dataForNode["Quarter beats per minute"],
                          dataForNode["Time stamp"])
                    
                    tooltip.html(textForDisplay); 
                    
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