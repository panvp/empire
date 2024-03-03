<script setup>
import { ref } from 'vue';
const props = defineProps({
  name: String
})
console.log(props)

const data = ref("Hello World1");
const clickhandler = () =>{
data.value = "now clicked1";
}
</script>

<template>
  <div class="container">
    <div class="tableHeading">
            <div class="headingItem">Date/Time</div>
            <div class="headingItem">Stadium</div>
            <div class="headingItem">Home Team</div>
            <div class="headingItem">Away Team</div>
    </div>
    <div class="tableContent">
      <div class="rowItem">5.5.2022</div>
      <div class="rowItem">Marcana</div>
      <div class="rowItem">
          <div class="homeTeam">
            <div class="teamName">Brazil</div>
            <img width="53px" height="37px" src="https://flagsapi.codeaid.io/Brazil.png"/>
            <div class="score">1:0</div>
          </div>
      </div>
      <div class="rowItem">
        <div class="awayTeam">
            <img width="53px" height="37px" src="https://flagsapi.codeaid.io/Serbia.png"/>
            <div class="teamName">Serbia</div>
          </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.container{
  width: 90vw;
  padding: 0 5vw;
}
.homeTeam{
  display: flex;
}
.awayTeam{
  display: flex;
}
.homeFlag{
  background-image: url("https://flagsapi.codeaid.io/Brazil.png");
  width: 53px;
  height: 37px;
}
.tableHeading{
  display: flex;
  background-color: #E4EDF2;
  height: 40px;
  align-items: center;
}
.tableContent{
  display: flex;
  height: 70px;
}
.headingItem{
  flex: 1;
}
.rowItem{
  flex: 1;
}
</style>
