function DataLayer() {
 
  this.persistanceObject = new PersistanceLayer();
  this.matchHistory = {};

  this.populateMatchHistory = async () => {
    await this.persistanceObject.accountInfo();
    var info = await this.persistanceObject.getEncriptedAccountId();
    this.matchHistory =  await this.persistanceObject.getMatchHistory(info);
  }
  
  this.getMatches = () => {
    return this.matchHistory;
  }

  this.matchTimeline = async (matchID) => {
    var singleMatch = await this.persistanceObject.getMatchDetails(matchID);
    return singleMatch;
  }

  this.champList = async () =>{
    var allChamps = await this.persistanceObject.getChampionList();
    return allChamps;
    
  }

  this.getAccountName = async () =>{
    var name = await this.persistanceObject.getName();
    return name;
    
  }

  this.accountLevel = async () =>{
    var level = await this.persistanceObject.getAccountLevel();
    return level;
    
  }
}
