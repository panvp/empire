import { reactive } from 'vue'

export const store = reactive({
  matchList: [],
  teamMap: {},
  leaderBoardList: [],
  getInitialData(matchData){
   const modifiedData = matchData.map((data)=>{
    const {matchDate, ...reaminingData} = data;
    const gmtDate = new Date(matchDate);
    // console.log(matchDate,"date",matchDate.getDate())
    const date = gmtDate.getUTCDate() + "." + (gmtDate.getUTCMonth() + 1) + "." + gmtDate.getUTCFullYear();
    const time = gmtDate.getUTCHours() + ":" + gmtDate.getUTCMinutes();
    return {
      date,
      time,
      ...reaminingData
    }
  })
  this.matchList = modifiedData;
  this.calculateLeaderBoard(matchData);
  },
  calculateLeaderBoard(matchData){
    const dataMap = {}
    matchData.forEach((data)=>{
      const {homeTeam, awayTeam, matchPlayed, homeTeamScore, awayTeamScore} = data;
      if(matchPlayed){
        // Home Team Score
        if(dataMap.hasOwnProperty(homeTeam)){
          const {matchPlayed, goalsFor, goalsAgainst, goalsDifference, points} = dataMap[homeTeam];
          matchPlayed++;
          goalsFor+= homeTeamScore;
          goalsAgainst+= awayTeamScore;
          goalsDifference+= homeTeamScore - awayTeamScore;
          points+= homeTeamScore > awayTeamScore ? 3 : homeTeamScore === awayTeamScore ? 1 : 0;
          dataMap[homeTeam] = {matchPlayed , goalsFor, goalsAgainst, goalsDifference, points};
        }
        else{
          dataMap[homeTeam] = {
            matchPlayed : 1,
            goalsFor: homeTeamScore,
            goalsAgainst: awayTeamScore,
            goalsDifference: homeTeamScore - awayTeamScore,
            points: homeTeamScore > awayTeamScore ? 3 : homeTeamScore === awayTeamScore ? 1 : 0
          }
        }
        // For Away team
        if(dataMap.hasOwnProperty(awayTeam)){
          const {matchPlayed, goalsFor, goalsAgainst, goalsDifference, points} = dataMap[awayTeam];
          matchPlayed++;
          goalsFor+= awayTeamScore;
          goalsAgainst+= homeTeamScore;
          goalsDifference+= awayTeamScore - homeTeamScore;
          points+= awayTeamScore > homeTeamScore ? 3 : homeTeamScore === awayTeamScore ? 1 : 0;
          dataMap[awayTeam] = {matchPlayed , goalsFor, goalsAgainst, goalsDifference, points};
        }
        else{
          dataMap[awayTeam] = {
            matchPlayed : 1,
            goalsFor: awayTeamScore,
            goalsAgainst: homeTeamScore,
            goalsDifference: awayTeamScore - homeTeamScore,
            points: awayTeamScore > homeTeamScore ? 3 : homeTeamScore === awayTeamScore ? 1 : 0
          }
        }
      }

    })
    console.log(dataMap,"map");
    this.teamMap = dataMap;
    this.calculateLeaderBoardList(dataMap);
  },
  calculateLeaderBoardList(dataMap){
    const leaderList = [];
    Object.keys(dataMap).map((key)=>{
      leaderList.push({country: key, ...dataMap[key]})
    })
    leaderList.sort(customSort);
    function customSort(team1, team2) {
      if(team1.points > team2.points) return -1;
      else{
        return 1;
      }
    }
    this.leaderBoardList = leaderList;
    console.log("leaderList",leaderList)
  }
})