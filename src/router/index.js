import { createRouter, createWebHistory } from 'vue-router'
import ScheduleView from '../views/schedule.component.vue'
import LeaderBoardView from '../views/leaderBoard.component.vue'
import ErrorComponent from '@/views/error.component.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleView,
      alias: ""
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderBoardView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: ErrorComponent
    }
  ]
})

export default router
