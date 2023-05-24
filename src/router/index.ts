import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SpielFenster from "../components/SpielFenster.vue";
import Startseite from "../components/Startseite.vue";

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
    path: '/Spielfenster',
    name: 'Spielfenster',
    component: SpielFenster
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
