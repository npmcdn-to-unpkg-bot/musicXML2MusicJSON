module.exports.musicXML2JSONConfig = {
    parsedXML: {},
    allNotes: {},
    arrayToHoldParts:[],
    arrayToHoldNotes : [],
    arrayToHoldCleanedNotes:[],
    noteStorer:{},
    cleanedNoteStorer:{},
    arrayToHoldInstrumentNames:[],
    arrayToHoldVoiceNames:[],
    arrayToHoldSingleInstrument:[],
    arrayToHoldEachInstrumentSeperately:[],
    timeLineCounter:0,
    currentMeasureCounter:0,
    currentInstrument:-1,
    currentDuration:0,
    beats:0,
    beatType:0,
    measureStartingLocationInQuarterNotes:0,
    arrayToHoldTieStarts:[],
    arrayToHoldTieEnds:[]
}

