var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var lodash = require('lodash');
var async = require('async');
var parseMusicXMLUtilities = require('./parseMusicXMLUtilities')
var NOTES_IN_OCTAVE = 12
var MIDI_NUMBER_WHEN_REST = -1
var OFFSET_FOR_OCTAVE_ZERO = 1
var parsedXML;
var allNotes;
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
var arrayToHoldTieStarts = [];
var arrayToHoldTieEnds = [];
/**
 * <p>Processes raw html and will take any MusicXML file</p>
 * <p>Testing completed from MusicXML from Sibelius and Musescore</p>
 */
function extractNoteEventsFromParsedXML() {
    allNotes = parsedXML['score-partwise']['part'];
    lodash.forEach(allNotes, function (value, key) {
        arrayToHoldParts.push(value.measure)
    })
    for (var i = 0; i < arrayToHoldParts.length; i++) {
        for (var j = 0; j < arrayToHoldParts[i].length; j++) {
            for (var k = 0; k < arrayToHoldParts[i][j].note.length; k++) {
                noteStorer = {};
                noteStorer.measure = arrayToHoldParts[i][j]["$"]["number"]
                noteStorer.duration = arrayToHoldParts[i][j].note[k].duration[0]
                noteStorer.pitch = arrayToHoldParts[i][j].note[k].pitch
                noteStorer.rest = arrayToHoldParts[i][j].note[k].rest
                noteStorer.type = arrayToHoldParts[i][j].note[k].type
                noteStorer.voice = arrayToHoldParts[i][j].note[k].voice
                try {
                    noteStorer.notations = arrayToHoldParts[i][j].note[k].notations
                }
                catch (err) {
                    noteStorer.notations = 'false'
                }
                noteStorer.instrument = arrayToHoldParts[i][j].note[k].instrument
                noteStorer.staff = arrayToHoldParts[i][j].note[k].staff
                noteStorer.chord = arrayToHoldParts[i][j].note[k].chord
                noteStorer.partNumber = i;
                arrayToHoldNotes.push(noteStorer);
            }
        }
    }
}
/**
 * Represents something there.
 * http://usermanuals.musicxml.com/MusicXML/Content/CT-MusicXML-notations.htm
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function cleanNoteEvents() {
    for (var i = 0; i < arrayToHoldNotes.length; i++) {
        cleanedNoteStorer = {}
        if (arrayToHoldNotes[i].voice) {
            currentVoice = arrayToHoldNotes[i].voice
        }
        if (arrayToHoldNotes[i].pitch) {
            cleanedNoteStorer.midiNumber = parseMusicXMLUtilities.convertPitchInformationToMidiNumber(arrayToHoldNotes[i].pitch)
        }
        else {
            cleanedNoteStorer.midiNumber = MIDI_NUMBER_WHEN_REST;
        }
        if (arrayToHoldNotes[i].chord) {
            cleanedNoteStorer.isHarmony = true;
        }
        else {
            cleanedNoteStorer.isHarmony = false;
        }
        cleanedNoteStorer.measure = arrayToHoldNotes[i].measure;
        cleanedNoteStorer.duration = parseInt(arrayToHoldNotes[i].duration);
        cleanedNoteStorer.instrument = parseMusicXMLUtilities.cleanInstrumentToString(arrayToHoldNotes[i].instrument);
        cleanedNoteStorer.currentVoice = parseInt(currentVoice[0]);
        cleanedNoteStorer.notations = arrayToHoldNotes[i].notations;
        arrayToHoldCleanedNotes.push(cleanedNoteStorer);
    }
}
/**
 * Represents something there.
 * http://usermanuals.musicxml.com/MusicXML/Content/CT-MusicXML-notations.htm
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function getListOfDifferentVoices() {
    for (var i = 0; i < arrayToHoldCleanedNotes.length; i++) {
        if (!lodash.includes(arrayToHoldVoiceNames, arrayToHoldCleanedNotes[i].currentVoice)) {
            arrayToHoldVoiceNames.push(arrayToHoldCleanedNotes[i].currentVoice);
        }
    }
    //console.log(arrayToHoldVoiceNames)
}
/**
 * Represents something there.
 * http://usermanuals.musicxml.com/MusicXML/Content/CT-MusicXML-notations.htm
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function getListOfDifferentInstrumentNames() {
    for (var i = 0; i < arrayToHoldCleanedNotes.length; i++) {
        if (!lodash.includes(arrayToHoldInstrumentNames, arrayToHoldCleanedNotes[i].instrument)) {
            arrayToHoldInstrumentNames.push(arrayToHoldCleanedNotes[i].instrument);
        }
    }
}
/**
 * Represents something there.
 * http://usermanuals.musicxml.com/MusicXML/Content/CT-MusicXML-notations.htm
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function groupByInstrument() {
    for (var i = 0; i < arrayToHoldInstrumentNames.length; i++) {
        for (var j = 0; j < arrayToHoldCleanedNotes.length; j++) {
            if (arrayToHoldCleanedNotes[j].instrument === arrayToHoldInstrumentNames[i]) {
                arrayToHoldSingleInstrument.push(arrayToHoldCleanedNotes[j])
            }
        }
        arrayToHoldEachInstrumentSeperately.push(arrayToHoldSingleInstrument);
        arrayToHoldSingleInstrument = [];
    }
}
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
        //console.log(JSON.stringify(arrayToHoldEachInstrumentSeperately, null, 5));
    }
}
/**
 * Represents something there.
 * http://usermanuals.musicxml.com/MusicXML/Content/CT-MusicXML-notations.htm
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function addNotations() {
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
                       
                            console.log(index);
                            console.log('Startposition', arrayToHoldEachInstrumentSeperately[i][index])
                            console.log('END posigion', arrayToHoldEachInstrumentSeperately[i][j] )
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
            fs.readFile(__dirname + '/corpus/test3.xml', function (err, data) {
                parser.parseString(data, function (err, result) {
                    parsedXML = result;
                    callback(null);
                });
            });
    }   
        , function (callback) {
            extractNoteEventsFromParsedXML();
            callback(null, 0);
    }
        , function (callback) {
            cleanNoteEvents();
            callback(null, 1)
    }   
        , function (callback) {
            getListOfDifferentInstrumentNames();
            callback(null, 2)
    }
        , function (callback) {
            getListOfDifferentVoices();
            callback(null, 3)
    }
        , function (callback) {
            groupByInstrument();
            callback(null, 4)
    }
        , function (callback) {
            breakUpVoicesAndChords();
            callback(null, 4)
        }

        
        , function (callback) {
            addNotations();
            callback(null, 4);
        },

], function (err, results) {});
}