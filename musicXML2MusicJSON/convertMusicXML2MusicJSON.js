//node convertMusicXML2MusicJSON.js  '/corpus/bach.xml'
var parseMusicXML = require('./parser')
var argv = require('minimist')(process.argv.slice(2));
//
//if (argv["f"]) {
//    console.log('Converting' + argv["f"] + ' to musicJSON...')
//    parseMusicXML.parseRawMusicXML(argv["f"]);
//}
//else {
//    console.log('You need to pass a musicXML file using "-f pathToYourFile.xml". \nIf you don\'t have a musicXML file handy there are some samples in the ./corpus folder');
//}
//
//parseMusicXML.parseRawMusicXML("/corpus/musicXML/KeithJarrett/keithJarrettAllTheThingsYouAre.xml", "./additionalCorpusMetadata/keithJarrettAllTheThingsYouAre.json")

//parseMusicXML.parseRawMusicXML("/corpus/musicXML/KeithJarrett/keithJarrettautumnLeaves.xml", "./additionalCorpusMetadata/keithJarrettAutumnLeaves.json")

//parseMusicXML.parseRawMusicXML("/corpus/musicXML/KeithJarrett/keithJarrettDaysOfWineAndRoses.xml", "./additionalCorpusMetadata/keithJarrettDaysOfWineAndRoses.json")
//
//parseMusicXML.parseRawMusicXML("/corpus/musicXML/KeithJarrett/keithJarrettGroovinHigh.xml", "./additionalCorpusMetadata/keithJarrettGroovinHigh.json")
//
//parseMusicXML.parseRawMusicXML("/corpus/musicXML/KeithJarrett/keithJarrettIfIWereABell.xml", "./additionalCorpusMetadata/keithJarrettIfIWereABell.json")

//parseMusicXML.parseRawMusicXML("/corpus/musicXML/KeithJarrett/keithJarrettSomedayMyPrinceWillCome.xml", "./additionalCorpusMetadata/keithJarrettSomedayMyPrinceWillCome.json")
//
parseMusicXML.parseRawMusicXML("/corpus/musicXML/KeithJarrett/keithJarrettStellaByStarlight.xml", "./additionalCorpusMetadata/keithJarrettStellaByStarlight.json")