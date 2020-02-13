function BusinessLayer() {
  this.dataObject = new DataLayer();

  this.seperateMatches = async () => {
    await this.dataObject.populateMatchHistory();
    var allMatches = this.dataObject.getMatches();

    var curatedMatches = [];

    for(var i = 0; i < 10; i++){
      var temp = {
        matchId: allMatches.matches[i].gameId
      }
      curatedMatches.push(temp);
    }
    return curatedMatches;
  }

  this.getMatchDetails = async () => {
    var matchesArray = await this.seperateMatches();
    var matchDetails = []

    for(var i = 0; i < matchesArray.length; i++){
        var singularMatch = matchesArray[i].matchId;
        var match = await this.dataObject.matchTimeline(singularMatch);
        matchDetails.push(match);
    }
    return matchDetails;
    
  }

  this.champListRework = async () => {
    var allChamps = await this.dataObject.champList();
    var curatedChamps = [];
    $.each( allChamps.data, function( k, value) {
      var tempChamp ={
        name: k,
        champId: value.key
      }
      curatedChamps.push(tempChamp)  
    });
    return curatedChamps;
  }

  this.transferName = async () => {
    var sumName = await this.dataObject.getAccountName();
    return sumName;
  }

  this.transferLevel = async () => {
    var sumLevel = await this.dataObject.accountLevel();
    return sumLevel;
  }
  

}
