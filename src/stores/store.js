import { reactive } from 'vue'

export const store = reactive({
  matchList: [],
  cumlativeTeamScoreMap: {},
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
  this.cumlativeTeamScoreMap = this.calculateCountryScoreMap(matchData);
  this.calculateLeaderBoardList(this.cumlativeTeamScoreMap);
  },
  // Returns an object with country as key and points calculated on the basis of matchData
  calculateCountryScoreMap(matchData){
    const dataMap = {}
    matchData.forEach((data)=>{
      let {homeTeam, awayTeam, matchPlayed, homeTeamScore, awayTeamScore} = data;
      if(matchPlayed){
        // Home Team Score
        if(dataMap.hasOwnProperty(homeTeam)){
          let {matchPlayed, goalsFor, goalsAgainst, goalsDifference, points} = dataMap[homeTeam];
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
          let {matchPlayed, goalsFor, goalsAgainst, goalsDifference, points} = dataMap[awayTeam];
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
    return dataMap;
  },
  // calculates the final leaderBoard List to be displayed
  calculateLeaderBoardList(dataMap){
    const leaderList = [];
    // Create a List on points [{country: "serbia", mp, gf, ga, gd, points]
    Object.keys(dataMap).map((countryName)=>{
      leaderList.push({country: countryName, ...dataMap[countryName]})
    })

    // Creating a score map to sort the teams having same points {1 : [..teams], 2: [...teams]}
    const scoreMap = {};
    leaderList.map((team)=>{
      if(scoreMap.hasOwnProperty(team.points)){
        scoreMap[team.points].push(team);
      }
      else{
        scoreMap[team.points] = [team];
      }
    })
  
    // Sorting the inner lists created in above map
    Object.keys(scoreMap).map((points)=>{
      if(scoreMap[points].length > 1){

          const teamNameList = scoreMap[points].map(team => team.country);
          const headToHeadMatches = this.matchList.filter((match) => 
              match.matchPlayed && teamNameList.includes(match.homeTeam) && teamNameList.includes(match.awayTeam));
            
        // To calculate points for head to head matches
          const miniScoreMap = this.calculateCountryScoreMap(headToHeadMatches);

          // This list calculates for head to head matches only
          const miniLeaderList = [];
          Object.keys(miniScoreMap).map((countryName)=>{
            miniLeaderList.push({country: countryName, ...miniScoreMap[countryName]})
          })
          miniLeaderList.sort(customSort);
          function customSort(team1, team2){
            if(team1.points != team2.points)
                return team2.points - team1.points;
            else if(dataMap[team1.country].goalsDifference != dataMap[team2.country].goalsDifference)
                return dataMap[team2.country].goalsDifference - dataMap[team1.country].goalsDifference;
            else if(dataMap[team1.country].homeTeamScore != dataMap[team2.country].homeTeamScore)
              return dataMap[team2.country].homeTeamScore - dataMap[team1.country].homeTeamScore;
            else
            return team2.homeTeam - team1.homeTeam;
          }

          const sortedOriginalList = [];
          miniLeaderList.map((team) =>{
            sortedOriginalList.push({country: team.country, ...dataMap[team.country]})
          })
          scoreMap[points] = sortedOriginalList;
    }
    })
    const scoreMappedSortedList = [];
    Object.keys(scoreMap).map((points)=>{
      scoreMappedSortedList.push({points: points, teams: scoreMap[points] })
    })

    scoreMappedSortedList.sort((team1, team2) => team2.points - team1.points);
    const sortedFinalLeaderList = [];
    scoreMappedSortedList.map((item) => {
      sortedFinalLeaderList.push(...item.teams)
    });
    // console.log("finaList", sortedFinalLeaderList)
    this.leaderBoardList = sortedFinalLeaderList;
  }
})