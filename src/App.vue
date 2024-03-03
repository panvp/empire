<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue';
</script>

<template>
<div class="header">
    <div class="headerTitle">
      League Web UI
    </div>
    <div class="navLinks">
        <div class="scheduleLink"> Schedule</div>
        <div> Leaderboard</div>
    </div>
  </div>
  <HomeView/>

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
}
.footerItem{
  padding-right : 40px;
}

</style>

