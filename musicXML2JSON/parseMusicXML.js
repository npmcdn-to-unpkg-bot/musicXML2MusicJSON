var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var lodash = require('lodash');
var async = require('async');
var parseMusicXMLUtilities = require('./parseMusicXMLUtilities');
var constants = require('./constants');
var musicXML2JSONConfig = require('./musicXML2JSONConfig');
var extractAndCleanMusicXML = require('./parsingMethods/extractAndCleanMusicXML');
var getListsOfVoicesAndInstruments = require('./parsingMethods/getListsOfVoicesAndInstruments');
var groupByInstrument = require('./parsingMethods/groupByInstrument');
var breakUpVoicesAndChords = require('./parsingMethods/breakUpVoicesAndChords');
var caculateCurrentTempo = require('./parsingMethods/calculateCurrentTempo');
var addAttributes = require('./parsingMethods/addAttributes');
var addNotations = require('./parsingMethods/addNotations');
/**
 * Asyn function
 * http://usermanuals.musicxml.com/MusicXML/Content/CT-MusicXML-notations.htm
 * Takes a string to an MusicXML to parse to JSON
 * @param {string} pathToFile - path of MusicXML file
 * @return { object } - object containing parsed MusicXML data
 */
module.exports.parseRawMusicXML = function (pathToFile) {
    var pathToFile = pathToFile
    async.series([
    function (callback) {
            fs.readFile(__dirname + pathToFile, function (err, data) {
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
            musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately = groupByInstrument.groupByInstrument(musicXML2JSONConfig.arrayToHoldInstrumentNames, musicXML2JSONConfig.arrayToHoldCleanedNotes);
            callback(null, 4)
    }
        
        , function (callback) {
            musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately = breakUpVoicesAndChords.breakUpVoicesAndChords(musicXML2JSONConfig.arrayToHoldVoiceNames, musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately);
           
            callback(null, 5)
        }
        
        , function (callback) {
            musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately = addAttributes.addAttributes(musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately);
            callback(null, 6)
        } 
        
        ,  function (callback) {
            
            musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately = caculateCurrentTempo.calculateCurrentTempo(musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately);
            
            
            console.log(JSON.stringify(musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately, null, 2))
            callback(null, 6)
        }
        
        , function (callback) {
            musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately = addNotations.addNotations(musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately);
            
            
            
            fs.writeFile('../data-visualisation/visualisation/data/rawData.json', JSON.stringify(musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately, null, 2), function (err) {
                if (err) return console.log(err);
                console.log('Raw data logged');
            });
            callback(null, 7);
        },

], function (err, results) {});
}