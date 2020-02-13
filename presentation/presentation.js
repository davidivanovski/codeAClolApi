function Presentation() {
  this.business = new BusinessLayer();

  var allGames = await this.business.getMatchDetails();
  var accName = await this.business.transferName();
  var acclevel = await this.business.transferLevel();

  this.displayGames = async (allGames,accName,acclevel) => {
    var body = $("body");
    var gamesWrapper = $("<div>").attr("id","wrapper");
    body.append(gamesWrapper);
    var nameDiv = $("<div>");  
    nameDiv.html("Summoner name " + accName);
    gamesWrapper.append(nameDiv);
    var levelDiv = $("<div>");
    levelDiv.html("Summoner level " + acclevel);
    gamesWrapper.append(levelDiv);

    for(var i = 0; i <allGames.length; i++){
      this.generateMatchHistory(i,allGames); 
    }
  }

  this.generateMatchHistory= async (n,allGames) => {
  var gameOneIds = allGames[n].participantIdentities;
  var gameOneStats = allGames[n].participants;
  var participantStats = [];
  
  for(var i = 0; i < gameOneStats.length ; i++){
    
    var tempObj = {
      id: gameOneStats[i].stats.participantId,
      name: gameOneIds[i].player.summonerName,
      champId: gameOneStats[i].championId,
      assists: gameOneStats[i].stats.assists,
      deaths: gameOneStats[i].stats.deaths,
      kills: gameOneStats[i].stats.kills,
    }
    participantStats.push(tempObj);
  }

  var game = $("<div>").attr("id","game");
  gamesWrapper.append(game);
  var champList = await this.business.champListRework();

  var playerStats = $("<div>").attr("id","player");
  game.append(playerStats);

  for(var i = 0; i <participantStats.length; i++){
    var playerName = $("<div>");
    playerName.html(participantStats[i].name);
    playerStats.append(playerName);
    var playerKills = $("<div>");
    playerKills.html(participantStats[i].kills);
    playerStats.append(playerKills);
    var playerDeaths = $("<div>");
    playerDeaths.html(participantStats[i].deaths);
    playerStats.append(playerDeaths);
    var playerAssists = $("<div>");
    playerAssists.html(participantStats[i].assists);
    playerStats.append(playerAssists);

    var getChampId = participantStats[i].champId;

    for(var f = 0; f < champList.length; f++){
      if(getChampId == champList[f].champId){
        var champName = $("<div>");
        var currentName = champList[f].name;
        champName.html(currentName);
        playerStats.append(champName);
      }
    }
  }
  }
}
