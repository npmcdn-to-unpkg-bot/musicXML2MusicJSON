
module.exports.obtainDivisions = function (musicData) {

     var divisions = parseInt(musicData["score-partwise"]["part"][0]["measure"][0]["attributes"][0]["divisions"][0]);
     
     return divisions;
    

}