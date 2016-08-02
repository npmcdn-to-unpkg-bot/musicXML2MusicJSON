var constants = require('./constants');

function convertLetterToBasePitch  (letter) {
   
    if (letter === 'C') {
        return 0;
    }
    else if (letter === 'D') {
        return 2
    }
    else if (letter === 'E') {
        return 4
    }
    else if (letter === 'F') {
        return 5
    }
    else if (letter === 'G') {
        return 7
    }
    else if (letter === 'A') {
        return 9
    }
    else if (letter === 'B') {
        return 11
    }
}
module.exports.cleanInstrumentToString = function (instrument) {
    return instrument[0]["$"]["id"]
}


module.exports.convertPitchInformationToMidiNumber = function (pitchInfo) {
    
    var pitchInfo = pitchInfo;
    var step = convertLetterToBasePitch(pitchInfo[0].step[0]);
    var octave = parseInt(pitchInfo[0].octave) + constants.OFFSET_FOR_OCTAVE_ZERO;
    var alter = pitchInfo[0].alter;
    
    
   
    
    if (pitchInfo[0].alter == null) {
        alter = 0
    }
    else {
        alter = parseInt(pitchInfo[0].alter[0]);
    }
    
    var midiNumber = (octave * constants.NOTES_IN_OCTAVE) + step + alter
    
    return midiNumber;
}