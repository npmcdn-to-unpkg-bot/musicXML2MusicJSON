var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var lodash = require('lodash');
var async = require('async');
var parseMusicXMLUtilities = require('./utilities/utilities');
var constants = require('./utilities/constants');
var musicXML2JSONConfig = require('./musicXML2JSONConfig');
var extractAndCleanMusicXML = require('./parsingFunctions/extractAndCleanMusicXML');
var getListsOfVoicesAndInstruments = require('./parsingFunctions/getListsOfVoicesAndInstruments');
var groupByInstrument = require('./parsingFunctions/groupByInstrument');
var breakUpVoicesAndChords = require('./parsingFunctions/breakUpVoicesAndChords');
var caculateCurrentTempo = require('./parsingFunctions/calculateCurrentTempo');
var addAttributes = require('./parsingFunctions/addAttributes');
var addNotations = require('./parsingFunctions/addNotations');
var finalClean = require('./parsingFunctions/finalClean');


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


        
        , function (callback) {
            musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately = caculateCurrentTempo.calculateCurrentTempo(musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately);
            callback(null, 6)
        }


        
        , function (callback) {
            musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately = addNotations.addNotations(musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately);

            callback(null, 7);
        }

         
        , function (callback) {
            musicXML2JSONConfig.musicJSON = finalClean.finalClean(musicXML2JSONConfig.arrayToHoldEachInstrumentSeperately);
            
            
            fs.writeFile('../visualization/visualization/data/output.json', JSON.stringify(musicXML2JSONConfig.musicJSON, null, 2), function (err) {
                if (err) return console.log(err);
            });
            
            
            fs.writeFile('outputData/output.json', JSON.stringify(musicXML2JSONConfig.musicJSON, null, 2), function (err) {
                if (err) return console.log(err);
                console.log('Finished. \nMusicJSON file in "outputData/rawData.json" and "../data-visualisation/visualisation/data/rawData.json"');
            });
           
            callback(null, 8)
        }

], function (err, results) {});
}