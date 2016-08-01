var lodash = require('lodash');
/**
 * Represents something there.
 * http://usermanuals.musicxml.com/MusicXML/Content/CT-MusicXML-notations.htm
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
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
/**
 * Represents something there.
 * http://usermanuals.musicxml.com/MusicXML/Content/CT-MusicXML-notations.htm
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
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