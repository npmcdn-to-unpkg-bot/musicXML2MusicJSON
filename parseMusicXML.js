var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var lodash = require('lodash');
var async = require('async');
var parseMusicXMLUtilities = require('./parseMusicXMLUtilities');
var constants = require('./constants');
var musicXML2JSONConfig = require('./musicXML2JSONConfig');
var extractAndCleanMusicXML = require('./extractAndCleanMusicXML');
var getListsOfVoicesAndInstruments = require('./getListsOfVoicesAndInstruments');
var groupByInstrument = require('./groupByInstrument');

var parsedXML;
var arrayToHoldParts = []
var arrayToHoldNotes = [];
var arrayToHoldCleanedNotes = [];
var noteStorer = {};
var cleanedNoteStorer = {};
var arrayToHoldInstrumentNames = [];
var arrayToHoldVoiceNames = [];
var arrayToHoldSingleInstrument = [];
var arrayToHoldEachInstrumentSeperately = [];
var timeLineCounter = 0;
var currentMeasureCounter = 0;
var currentInstrument = -1;
var currentDuration = 0;
var beats = 0;
var beatType = 0;
var measureStartingLocationInQuarterNotes = 0;
var arrayToHoldTieStarts = [];
var arrayToHoldTieEnds = [];
/**
 * Represents something there.
 * http://usermanuals.musicxml.com/MusicXML/Content/CT-MusicXML-notations.htm
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */

function breakUpVoicesAndChords() {
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
                        //console.log(JSON.stringify(arrayToHoldEachInstrumentSeperately[j][k]))
                    }
                    arrayToHoldEachInstrumentSeperately[j][k].durationWithNotations = arrayToHoldEachInstrumentSeperately[j][k].duration;
                }
            }
        }
        //console.log(JSON.stringify(arrayToHoldEachInstrumentSeperately));
    }
}
/**
 * Represents something there.
 * http://usermanuals.musicxml.com/MusicXML/Content/CT-MusicXML-notations.htm
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */

function addAttributes() {
    //console.log(JSON.stringify(arrayToHoldEachInstrumentSeperately, null, 2));
    for (var i = 0; i < arrayToHoldEachInstrumentSeperately.length; i++) {
        for (var j = 0; j < arrayToHoldEachInstrumentSeperately[i].length; j++) {
            if (arrayToHoldEachInstrumentSeperately[i][j].attributes) {
                if (arrayToHoldEachInstrumentSeperately[i][j].attributes[0].time) {
                    //console.log(arrayToHoldEachInstrumentSeperately[i][j].attributes[0].time[0])
                    beats = parseInt(arrayToHoldEachInstrumentSeperately[i][j].attributes[0].time[0].beats[0])
                    beatType = parseInt(arrayToHoldEachInstrumentSeperately[i][j].attributes[0].time[0]["beat-type"][0])
                        //console.log(beats, beatType);
                }
                //                console.log(arrayToHoldEachInstrumentSeperately[i][j].attributes[0].time)  
                //                var timeObject = arrayToHoldEachInstrumentSeperately[i][j].attributes[0].time;
            }
            arrayToHoldEachInstrumentSeperately[i][j].beats = beats;
            arrayToHoldEachInstrumentSeperately[i][j].beatType = beatType;
            arrayToHoldEachInstrumentSeperately[i][j].absLocation = measureStartingLocationInQuarterNotes + arrayToHoldEachInstrumentSeperately[i][j].location;
            if (arrayToHoldEachInstrumentSeperately[i][j - 1]) {
                if (arrayToHoldEachInstrumentSeperately[i][j - 1].measure !== arrayToHoldEachInstrumentSeperately[i][j].measure) {
                    measureStartingLocationInQuarterNotes = measureStartingLocationInQuarterNotes + (beats * 256);
                }
            }
            arrayToHoldEachInstrumentSeperately[i][j].measureLocationInQuarterNotes = measureStartingLocationInQuarterNotes;
        }
    }
    //console.log(arrayToHoldEachInstrumentSeperately);
}

function addNotations() {
    //console.log(JSON.stringify(arrayToHoldEachInstrumentSeperately, null, 2));
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
}
module.exports.parseRawMusicXML = function (pathToFile) {
    async.series([
    function (callback) {
            fs.readFile(__dirname + '/corpus/test.xml', function (err, data) {
                parser.parseString(data, function (err, result) {
                    musicXML2JSONConfig.parsedXML = result;
                    callback(null);
                });
            });
    }

        
        , function (callback) {
            musicXML2JSONConfig.arrayToHoldNotes = extractAndCleanMusicXML.extractNoteEventsFromParsedXML(musicXML2JSONConfig.parsedXML);
            callback(null, 0);
    }


        
        , function (callback) {
            musicXML2JSONConfig.arrayToHoldCleanedNotes = extractAndCleanMusicXML.cleanMusicXML(musicXML2JSONConfig.arrayToHoldNotes)
                //cleanNoteEvents();
            callback(null, 1)
    }

        
        , function (callback) {
            musicXML2JSONConfig.arrayToHoldInstrumentNames = getListsOfVoicesAndInstruments.getListOfDifferentInstrumentNames(musicXML2JSONConfig.arrayToHoldCleanedNotes);
            callback(null, 2)
    }

        
        , function (callback) {
            musicXML2JSONConfig.arrayToHoldVoiceNames = getListsOfVoicesAndInstruments.getListOfDifferentVoices(musicXML2JSONConfig.arrayToHoldCleanedNotes);
            callback(null, 3)
    }

        , function (callback) {
            musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately = groupByInstrument
                .groupByInstrument(musicXML2JSONConfig.arrayToHoldInstrumentNames,
                                  musicXML2JSONConfig.arrayToHoldCleanedNotes);
           
            callback(null, 4)
    }

        
        , function (callback) {
            breakUpVoicesAndChords();
            callback(null, 4)
        }

        
        , function (callback) {
            addAttributes();
            callback(null, 4)
        }

        
        , function (callback) {
            //addNotations();
            callback(null, 4);
        },

], function (err, results) {});
}