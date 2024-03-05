<script setup>
import { ref } from 'vue';
import { store } from '../stores/store'; 


const isTablet = ref(true);
const isMobile = ref(true);
window.onresize = function(){

  if (window.matchMedia('screen and (min-width: 1000px)').matches) {
    console.log("Tablet")
    isTablet.value = true;
  }
  else
  isTablet.value = false;

  if (window.matchMedia('screen and (min-width: 750px)').matches) {
    console.log("mobile")
    isMobile.value = true;
  }
  else
  isMobile.value = false;

}
console.log(store.matchList, "matchlist")
</script>

<template>
  <div class="container">
    <div class="pageHeading">League Schedule</div>
    <div class="tableHeading">
            <div v-if="isMobile" class="headingItem firstItem">Date/Time</div>
            <div v-if="isTablet" class="headingItem">Stadium</div>
            <div class="headingItem homeTeamHeading">Home Team</div>
            <div class="headingItem"></div>
            <div class="headingItem">Away Team</div>
    </div>
    <div :class="(index %2) ? 'tableContent even' : 'tableContent'" v-for="(item, index) in store.matchList">
      <div v-if="isMobile" class="rowItem firstItem time">
        <div> {{ item.date }}</div>
        <div> {{ item.time }}</div>
      </div>
      <div v-if="isTablet" class="rowItem">{{ item.stadium }}</div>
      <div class="rowItem">
          <div class="homeTeam">
            <div class="homeTeamName">{{ item.homeTeam }}</div>
            <img width="53px" height="37px" :src="`https://flagsapi.codeaid.io/${item.homeTeam}.png`"/>
          </div>
      </div>
      <div class="rowItem">
        <div class="score">{{ (item.matchPlayed) ?  `${item.homeTeamScore} : ${item.awayTeamScore}` : '- : -'}}</div>
      </div>
      <div class="rowItem">
        <div class="awayTeam">
            <img width="53px" height="37px" :src="`https://flagsapi.codeaid.io/${item.awayTeam}.png`"/>
            <div class="awayTeamName">{{ item.awayTeam }}</div>
          </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.container{
  width: 90vw;
  padding: 0 5vw;
  color: #4B5C68;
}
.pageHeading{
  margin-top: 60px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: 750;
  color: #182C62;
}
.firstItem{
  padding-left: 2vw;
}
.time{
  /* text-align: right; */
}
.homeTeam{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
}
.homeTeam > img{
  margin-left: 2vw;
}
.score{
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}
.awayTeam{
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
}
.tableHeading{
  display: flex;
  background-color: #E4EDF2;
  height: 40px;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
}
.tableContent{
  display: flex;
  height: 70px;
  align-items: center;
  font-size: 14px;
}
.headingItem{
  flex: 1;
}
.rowItem{
  flex: 1;
}
.homeTeamHeading{
  text-align: right;
}
.awayTeamName{
  padding-left: 2vw;
}
.even{
  background-color: #F6F7F7;
}
</style>
