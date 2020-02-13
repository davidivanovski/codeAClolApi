function PersistanceLayer() {

    this.apiKey = () => {
        var key = "RGAPI-8b4f307b-09bb-41c1-b709-aad79b348aed";
        return key;
    }

    this.getPosts = () => {
        return new Promise((resolve, reject) => {
      $.ajax({
        url:"https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/wanted130?api_key="+ this.apiKey(),
        type: "GET",

        success: function(data) {
          resolve(data);
        },
        error: function(error) {
          reject(error);
        }
      });
    });
  };

  this.accountApi = {};

  this.accountInfo = async () => {
    this.accountApi = await this.getPosts();
  }

  this.getEncriptedAccountId = async () => {
    await this.getPosts();
    var accountId = this.accountApi.accountId;
    return accountId;
  }

  this.getName = async () => {
    await this.getPosts();
    var accName = this.accountApi.name;
    return accName;
  }

  // this.getAccountPuuid = async () => {
  //   await this.getPosts();
  //   var accountPuuid = this.accountApi.puuid;
  //   console.log(accountPuuid);
  // }

  this.getAccountLevel = async () => {
    await this.getPosts();
    var accountLevel = this.accountApi.summonerLevel;
    return accountLevel
  }
  
  this.getMatchHistory = (getEncriptedAccountId) => {
      return new Promise((resolve, reject) => {
    $.ajax({
      url:"https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/" + getEncriptedAccountId + "?api_key="+this.apiKey(),
      type: "GET",

      success: function(data) {
        resolve(data);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
};

this.getMatchDetails = (matchID) => {
      return new Promise((resolve, reject) => {
    $.ajax({
      url:"https://euw1.api.riotgames.com/lol/match/v4/matches/"+ matchID + "?api_key=" + this.apiKey(),
      type: "GET",

      success: function(data) {
        resolve(data);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
};

this.getChampionList = () => {
  return new Promise((resolve, reject) => {
$.ajax({
  url:"http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json",
  type: "GET",

  success: function(data) {
    resolve(data);
  },
  error: function(error) {
    reject(error);
  }
});
});
};

}
