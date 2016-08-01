var lodash = require('lodash');
module.exports.addNotations = function (musicData) {
    var arrayToHoldTieStarts = [];
    var arrayToHoldTieEnds = [];
    var arrayToHoldEachInstrumentSeperately = musicData;
  
    for (var i = 0; i < arrayToHoldEachInstrumentSeperately.length; i++) {
        for (var j = 0; j < arrayToHoldEachInstrumentSeperately[i].length; j++) {
            if (arrayToHoldEachInstrumentSeperately[i][j].notations) {
                if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].tied) {
                    for (k = 0; k < arrayToHoldEachInstrumentSeperately[i][j].notations[0].tied.length; k++) {
                        var tieType = arrayToHoldEachInstrumentSeperately[i][j].notations[0].tied[k].$.type
                        if (tieType == 'start') {
                            arrayToHoldTieStarts.push(arrayToHoldEachInstrumentSeperately[i][j])
                        }
                        else {
                            var x = arrayToHoldTieStarts.pop();
                            var index = lodash.indexOf(arrayToHoldEachInstrumentSeperately[i], lodash.find(arrayToHoldEachInstrumentSeperately[i], x));
                            //console.log(index);
                            //console.log('Startposition to amend', arrayToHoldEachInstrumentSeperately[i][index])
                            //console.log('END position with data', arrayToHoldEachInstrumentSeperately[i][j] )
                            arrayToHoldTieEnds.push(arrayToHoldEachInstrumentSeperately[i][j])
                        }
                    }
                    var tieNotation = arrayToHoldEachInstrumentSeperately[i][j].notations[0].tied[0].$;
                }
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].fermata) {
                    console.log("HEREERERE")
                }
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].arpeggiate) {
                    console.log("HEREERERE")
                }
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].dynamics) {
                    console.log("HEREERERE")
                }
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].glissando) {
                    console.log("HEREERERE")
                }
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].ornaments) {
                    console.log("HEREERERE")
                }
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].slide) {
                    console.log("HEREERERE")
                }
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].slur) {
                    console.log("HEREERERE")
                }
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].technical) {
                    console.log("HEREERERE")
                }
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].tied) {
                    console.log("HEREERERE")
                }
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].tuplet) {
                    console.log("HEREERERE")
                }
            }
        }
    }
    
    return arrayToHoldEachInstrumentSeperately;
}