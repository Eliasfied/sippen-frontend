import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Startseite from "../components/Startseite.vue";
import SpielFenster from '../components/SpielFenster.vue';
import Spielende from "../components/Spielende.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Startseite'
  },
  {
    path: '/Startseite',
    name: 'Startseite',
    component: Startseite
  },
  {
    path: '/SpielFenster',
    name: 'SpielFenster',
    component: SpielFenster
  },
  {
    path: '/Spielende',
    name: 'Spielende',
    component: Spielende
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
