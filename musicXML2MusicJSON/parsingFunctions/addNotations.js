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
                            var valueChangeDueToTie = arrayToHoldEachInstrumentSeperately[i][j].absLocation + arrayToHoldEachInstrumentSeperately[i][j].duration - (arrayToHoldEachInstrumentSeperately[i][index].absLocation)
                         
                            arrayToHoldEachInstrumentSeperately[i][index].durationWithNotations = valueChangeDueToTie;
                            arrayToHoldEachInstrumentSeperately[i][j].durationWithNotations = 0;
//                            console.log('START', JSON.stringify(arrayToHoldEachInstrumentSeperately[i][index], null, 2))
//                            console.log('STOP', JSON.stringify(arrayToHoldEachInstrumentSeperately[i][j], null, 2))
                            arrayToHoldTieEnds.push(arrayToHoldEachInstrumentSeperately[i][j])
                        }
                    }
                    var tieNotation = arrayToHoldEachInstrumentSeperately[i][j].notations[0].tied[0].$;
                }
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].fermata) {}
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].arpeggiate) {}
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].dynamics) {}
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].glissando) {}
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].ornaments) {}
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].slide) {}
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].slur) {}
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].technical) {}
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].tied) {}
                else if (arrayToHoldEachInstrumentSeperately[i][j].notations[0].tuplet) {}
            }
        }
    }
    return arrayToHoldEachInstrumentSeperately;
}