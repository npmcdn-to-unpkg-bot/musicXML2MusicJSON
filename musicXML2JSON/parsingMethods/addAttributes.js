module.exports.addAttributes = function (musicData) {
    var arrayToHoldEachInstrumentSeperately = musicData;
    var measureStartingLocationInQuarterNotes = 0;
    
    for (var i = 0; i < arrayToHoldEachInstrumentSeperately.length; i++) {
        var measureStartingLocationInQuarterNotes = 0;
        for (var j = 0; j < arrayToHoldEachInstrumentSeperately[i].length; j++) {
            if (arrayToHoldEachInstrumentSeperately[i][j].attributes) {
                if (arrayToHoldEachInstrumentSeperately[i][j].attributes[0].time) {
                    beats = parseInt(arrayToHoldEachInstrumentSeperately[i][j].attributes[0].time[0].beats[0])
                    beatType = parseInt(arrayToHoldEachInstrumentSeperately[i][j].attributes[0].time[0]["beat-type"][0])
                }
            }
            arrayToHoldEachInstrumentSeperately[i][j].beats = beats;
            arrayToHoldEachInstrumentSeperately[i][j].beatType = beatType;
            arrayToHoldEachInstrumentSeperately[i][j].absLocation = measureStartingLocationInQuarterNotes + arrayToHoldEachInstrumentSeperately[i][j].location;
            if (arrayToHoldEachInstrumentSeperately[i][j - 1]) {
                if (arrayToHoldEachInstrumentSeperately[i][j - 1].measure !== arrayToHoldEachInstrumentSeperately[i][j].measure) {
                    measureStartingLocationInQuarterNotes = measureStartingLocationInQuarterNotes + (beats * 256);
                }
            }
            arrayToHoldEachInstrumentSeperately[i][j].measureLocationInQuarterNotes = measureStartingLocationInQuarterNotes;
        }
    }
    return arrayToHoldEachInstrumentSeperately;
}