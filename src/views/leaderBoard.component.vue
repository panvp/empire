<script setup>
import { ref } from 'vue';
const isMobile = ref(false);
import { store } from '../stores/store'; 
console.log(store.leaderBoardList,"inside")

window.onresize = function(){

if (window.matchMedia('screen and (max-width: 750px)').matches) {
  console.log("mobile")
  isMobile.value = true;
}
else
isMobile.value = false;

}
</script>

<template>
    <div class="container">
        <div class="pageHeading">League Standings</div>
        <div class="tableHeading">
            <div class="headingItem firstItem">Team Name</div>
            <div class="headingItem">MP</div>
            <div v-if="!isMobile" class="headingItem homeTeamHeading">GF</div>
            <div v-if="!isMobile" class="headingItem">GA</div>
            <div v-if="isMobile" class="headingItem homeTeamHeading">GD</div>
            <div class="headingItem">Points</div>
        </div>
      <div :class="(index %2) ? 'tableContent even' : 'tableContent'" v-for="(item, index) in store.leaderBoardList">
        <div class="rowItem firstItem flex">
            <img width="53px" height="37px" :src="`https://flagsapi.codeaid.io/${item.country}.png`"/>
            <div class="homeTeamName">{{ item.country }}</div>
        </div>
        <div class="rowItem">{{item.matchPlayed }}</div>
        <div v-if="!isMobile" class="rowItem"> {{ item.goalsFor}}</div>
        <div v-if="!isMobile" class="rowItem"> {{ item.goalsAgainst}}</div>
        <div v-if="isMobile"class="rowItem">{{ item.goalsDifference}}</div>
        <div class="rowItem points">{{ item.points}}</div>
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
.tableHeading{
  display: flex;
  background-color: #E4EDF2;
  height: 40px;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
}
.headingItem{
  flex: 1;
  text-align: center;
}
.tableContent{
  display: flex;
  height: 70px;
  align-items: center;
  font-size: 14px;
}   
.rowItem{
  flex: 1;
  text-align: center;
}
.firstItem{
  padding-left: 2vw;
  flex: 4;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
}
.flex{
  display: flex;
  align-items: center;
}
.homeTeamName{
  margin-left: 2vw;
}
.even{
  background-color: #F6F7F7;
}
.points{
  /* font-size: 1.5rem; */
  font-size: 16px;
  font-weight: 700;
  color: rgb(67, 67, 248);
}
</style>