module.exports.groupByInstrument = function (musicData, notes) {
    var arrayToHoldInstrumentNames = musicData;
    var arrayToHoldCleanedNotes = notes;
    var arrayToHoldSingleInstrument = [];
    var arrayToHoldEachInstrumentSeperately = [];
    for (var i = 0; i < arrayToHoldInstrumentNames.length; i++) {
        for (var j = 0; j < arrayToHoldCleanedNotes.length; j++) {
            if (arrayToHoldCleanedNotes[j].instrument === arrayToHoldInstrumentNames[i]) {
                arrayToHoldSingleInstrument.push(arrayToHoldCleanedNotes[j])
            }
        }
        arrayToHoldEachInstrumentSeperately.push(arrayToHoldSingleInstrument);
        arrayToHoldSingleInstrument = [];
    }
    
    return arrayToHoldEachInstrumentSeperately;
}