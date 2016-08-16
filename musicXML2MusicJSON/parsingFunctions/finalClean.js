var lodash = require("lodash");
module.exports.finalClean = function (musicData, globalMetaData) {
    var cleanedMusicJSON = musicData;
    for (var i = 0; i < cleanedMusicJSON.length; i++) {
        for (var j = 0; j < cleanedMusicJSON[i].length; j++) {
            //console.log(cleanedMusicJSON[i][j])
            cleanedMusicJSON[i][j]["Current chord root"] = cleanedMusicJSON[i][j].currentChordRoot
            delete cleanedMusicJSON[i][j].currentChordRoot
            cleanedMusicJSON[i][j]["Current chord root as int"] = cleanedMusicJSON[i][j].currentChordRootAsInt
            delete cleanedMusicJSON[i][j].currentChordRootAsInt;
            cleanedMusicJSON[i][j]["Current chord type"] = cleanedMusicJSON[i][j].currentChordType
            delete cleanedMusicJSON[i][j].currentChordType;
            cleanedMusicJSON[i][j]["Harmony note flag"] = cleanedMusicJSON[i][j].isHarmony
            delete cleanedMusicJSON[i][j].isHarmony;
            cleanedMusicJSON[i][j]["Current measure"] = cleanedMusicJSON[i][j].measure
            delete cleanedMusicJSON[i][j].measure;
            cleanedMusicJSON[i][j]["Duration"] = cleanedMusicJSON[i][j].duration
            delete cleanedMusicJSON[i][j].duration;
            cleanedMusicJSON[i][j]["Duration due to tied notes"] = cleanedMusicJSON[i][j].durationWithNotations
            delete cleanedMusicJSON[i][j].durationWithNotations;
            cleanedMusicJSON[i][j]["Location"] = cleanedMusicJSON[i][j].absLocation
            delete cleanedMusicJSON[i][j].absLocation;
            cleanedMusicJSON[i][j]["Location in measure"] = cleanedMusicJSON[i][j].location
            delete cleanedMusicJSON[i][j].location;
            cleanedMusicJSON[i][j]["Measure location"] = cleanedMusicJSON[i][j].measureLocationInQuarterNotes
            delete cleanedMusicJSON[i][j].measureLocationInQuarterNotes;
            cleanedMusicJSON[i][j]["Time signature numerator"] = cleanedMusicJSON[i][j].beats
            delete cleanedMusicJSON[i][j].beats;
            cleanedMusicJSON[i][j]["Time signature denominator"] = cleanedMusicJSON[i][j].beatType
            delete cleanedMusicJSON[i][j].beatType;
            cleanedMusicJSON[i][j]["Quarter beats per minute"] = cleanedMusicJSON[i][j].qbpm
            delete cleanedMusicJSON[i][j].qbpm;
            cleanedMusicJSON[i][j]["Time stamp"] = cleanedMusicJSON[i][j].timeStamp
            delete cleanedMusicJSON[i][j].timeStamp;
            cleanedMusicJSON[i][j]["Instrument"] = cleanedMusicJSON[i][j].instrument
            delete cleanedMusicJSON[i][j].instrument;
            cleanedMusicJSON[i][j]["Voice"] = cleanedMusicJSON[i][j].currentVoice
            delete cleanedMusicJSON[i][j].currentVoice;
            // delete attributes and notations for now
            delete cleanedMusicJSON[i][j].attributes;
            delete cleanedMusicJSON[i][j].notations;
            delete cleanedMusicJSON[i][j].currentTempo;
            
            
            lodash.forEach(globalMetaData, function (value, key) {
                
                cleanedMusicJSON[i][j][key] = value
            });
      
             
        }
      
    }
    return cleanedMusicJSON;
}