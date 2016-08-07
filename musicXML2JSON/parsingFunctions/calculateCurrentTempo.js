
var beginningOfTime = new Date("March 21, 1685 00:00:00");

function createTempoInt(tempo) {
    var timeNumerator = 1;
    var timeDenominator = 1;
    var absLocation = tempo.absLocation;
    var tempoInBPM;
    try {
        var beatUnit = tempo.currentTempo.metronome[0]["beat-unit"][0];
        var qbpm = tempo.currentTempo.metronome[0]["per-minute"][0];
        if (beatUnit === 'quarter') {
            tempoInBPM = qbpm;
        }
        else if (beatUnit === 'half') {
            tempoInBPM = qbpm * 2;
        }
        else if (beatUnit === 'eighth') {
            tempoInBPM == Math.floor(qbpm * 0.5)
        }
        else if (beatUnit === 'whole') {
            tempoInBPM = qbpm * 4;
        }
    }
    catch (err) {
        tempoInBPM = 60;
    }
    
    var unitsPerMinute = tempoInBPM * 256;
    

    var millisecondsSinceBeginningOfTimeOfCurrentNote = ((absLocation / unitsPerMinute)) * 60000;
    
    
    var currentTime = new Date(beginningOfTime.getTime() + millisecondsSinceBeginningOfTimeOfCurrentNote);
    //console.log(currentTime);
    return [currentTime, parseInt(tempoInBPM)];
}


module.exports.calculateCurrentTempo = function (musicData) {
    var arrayToHoldEachInstrumentSeperately = musicData;
    var measureStartingLocationInQuarterNotes = 0;
    for (var i = 0; i < arrayToHoldEachInstrumentSeperately.length; i++) {
        for (var j = 0; j < arrayToHoldEachInstrumentSeperately[i].length; j++) {
            var tempo = createTempoInt(arrayToHoldEachInstrumentSeperately[i][j])
            arrayToHoldEachInstrumentSeperately[i][j].timeStamp = tempo[0];
            arrayToHoldEachInstrumentSeperately[i][j].qbpm = tempo[1];
        }
    }
    return arrayToHoldEachInstrumentSeperately;
}