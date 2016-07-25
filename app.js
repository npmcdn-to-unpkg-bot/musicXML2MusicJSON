var db_connection = require('./db_connection')
var parseMusicXML = require('./parseMusicXML')

db_connection.createMongoConnection();
parseMusicXML.parseRawMusicXML();

