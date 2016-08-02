var lodash = require('lodash');
module.exports.getListOfDifferentInstrumentNames = function (rawMusicXML) {
    var arrayToHoldInstrumentNames = [];
    var arrayToHoldCleanedNotes = rawMusicXML
    for (var i = 0; i < arrayToHoldCleanedNotes.length; i++) {
        if (!lodash.includes(arrayToHoldInstrumentNames, arrayToHoldCleanedNotes[i].instrument)) {
            arrayToHoldInstrumentNames.push(arrayToHoldCleanedNotes[i].instrument);
        }
    }
    return arrayToHoldInstrumentNames;
}
module.exports.getListOfDifferentVoices = function (rawMusicXML) {
    var arrayToHoldCleanedNotes = rawMusicXML;
    var arrayToHoldVoiceNames = [];
    for (var i = 0; i < arrayToHoldCleanedNotes.length; i++) {
        if (!lodash.includes(arrayToHoldVoiceNames, arrayToHoldCleanedNotes[i].currentVoice)) {
            arrayToHoldVoiceNames.push(arrayToHoldCleanedNotes[i].currentVoice);
        }
    }
    return arrayToHoldVoiceNames;
}