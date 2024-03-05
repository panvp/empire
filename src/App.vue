<script setup>
import { RouterView } from 'vue-router'
import router from './router'
import { store } from './stores/store'; 

const matchList1 =  [ 
      { 
         matchDate: 1651744128685, 
         stadium: "Maracanã", 
         homeTeam: "Brazil", 
         awayTeam: "Argentina", 
         matchPlayed: true, 
         homeTeamScore: 0, 
         awayTeamScore: 0 
      }, 
      {
	      matchDate: 1651844228685, 
         stadium: "Maracanã", 
         homeTeam: "Switzerland", 
         awayTeam: "France", 
         matchPlayed: true, 
         homeTeamScore: 0, 
         awayTeamScore: 0 
	},
  {
	      matchDate: 1661744228685, 
         stadium: "Maracanã", 
         homeTeam: "Democratic Republic Of Congo", 
         awayTeam: "Guinea-bissau", 
         matchPlayed: true, 
         homeTeamScore: 12345, 
         awayTeamScore: 0 
	}  
   ];
   
store.getInitialData(matchList1);

function scheduleLinkClickHandler() {
  router.push('/schedule')
}
function leaderBoardLinkClickHandler() {
  router.push('/leaderboard')
}
</script>

<template>
<div class="header">
    <div class="headerTitle">
      League Web UI
    </div>
    <div class="navLinks">
        <div @click="scheduleLinkClickHandler" class="scheduleLink"> Schedule</div>
        <div @click="leaderBoardLinkClickHandler" class="leaderBoardLink"> Leaderboard</div>
    </div>
  </div>

    <router-view/>

  <div class="footer">
    <div class="footerItem">
      API Version: 1.0
    </div>
  </div>
</template>
<style scoped>
.header{
  background-color: #025FEB;
  height: 60px;
  font-size: 1.5rem;
  color: #FFFFFF;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer{
  background-color: #F6F7F7;
  position: absolute;
  bottom: 0;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #4B5C68
}
.navLinks{
  display: flex;
  align-items: center;
  justify-content: center;
}
.scheduleLink{
  margin-right: 40px;
  cursor: pointer;
}
.leaderBoardLink{
  cursor: pointer;
}
.footerItem{
  padding-right : 40px;
}

</style>
./views/S.vue
