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
    
    
    
    if (instrument.toString().length <= 3) {
        return 'Part ' + instrument.toString();
    }
    else {
        return instrument[0]["$"]["id"]
    }
  
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

module.exports.convertLetterAndAlterationToInt = function(letter, alterModeration) {
    
    var basePitch = convertLetterToBasePitch(letter)
    
    var alteredBassPitch = basePitch + alterModeration;
    
    if (isNaN(alteredBassPitch)) {
        return 0
    }
    else {
        return alteredBassPitch;
    }
    
    //return basePitch + alterModeration;
}


module.exports.convertLetterAndAlterationToName = function(letter, alterModeration) {
    var basePitch = convertLetterToBasePitch(letter)
    
    basePitch = basePitch + alterModeration;
    
    
    if (basePitch === 0) {
        return 'C'
    } else if (basePitch === 1) {
        return 'C#/Db'    
    }else if (basePitch === 2) {
        return 'D'    
    }else if (basePitch === 3) {
        return 'D#/Eb'    
    }else if (basePitch === 4) {
        return 'E'    
    }else if (basePitch === 5) {
        return 'F'    
    }else if (basePitch === 6) {
        return 'F#/Gb'    
    }else if (basePitch === 7) {
        return 'G'    
    }else if (basePitch === 8) {
        return 'G#/Ab'    
    }else if (basePitch === 9) {
        return 'A'    
    }else if (basePitch === 10) {
        return 'A#/Bb'    
    }else if (basePitch === 11) {
        return 'B'    
    }
    else {
        return '0'
    }
    
    
}


