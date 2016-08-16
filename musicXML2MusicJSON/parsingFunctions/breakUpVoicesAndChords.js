module.exports.breakUpVoicesAndChords = function (voiceNames, instrumentParts) {
    var arrayToHoldVoiceNames = voiceNames;
    var arrayToHoldEachInstrumentSeperately = instrumentParts;
    var timeLineCounter = 0;
    var currentMeasureCounter = 0;
    for (var i = 0; i < arrayToHoldVoiceNames.length; i++) {
        for (var j = 0; j < arrayToHoldEachInstrumentSeperately.length; j++) {
            timeLineCounter = 0;
         
            for (var k = 0; k < arrayToHoldEachInstrumentSeperately[j].length; k++) {
                if (arrayToHoldEachInstrumentSeperately[j][k].currentVoice == arrayToHoldVoiceNames[i]) {
                    if (arrayToHoldEachInstrumentSeperately[j][k].isHarmony === false) {
                        if (arrayToHoldEachInstrumentSeperately[j][k].measure != currentMeasureCounter) {
                            currentMeasureCounter = arrayToHoldEachInstrumentSeperately[j][k].measure
                            timeLineCounter = 0;
                        }
                        arrayToHoldEachInstrumentSeperately[j][k].location = timeLineCounter;
                        currentDuration = arrayToHoldEachInstrumentSeperately[j][k].duration;
                        timeLineCounter = timeLineCounter + arrayToHoldEachInstrumentSeperately[j][k].duration
                    }
                    else {
                        arrayToHoldEachInstrumentSeperately[j][k].location = timeLineCounter - currentDuration;
                    }
                    arrayToHoldEachInstrumentSeperately[j][k].durationWithNotations = arrayToHoldEachInstrumentSeperately[j][k].duration;
                }
            }
        }
    }
    
    //console.log(arrayToHoldEachInstrumentSeperately);
    return arrayToHoldEachInstrumentSeperately;
}