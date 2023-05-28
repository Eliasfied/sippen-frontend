<template>
  <ion-page>
    <ion-content>
      <div class="end-game">
        <h1>SPIELRUNDE BEENDET</h1>
        <p>Ihr habt zusammen {{ spielerStore.sips }} Schlucke getrunken. Das entspricht ca. {{  (spielerStore.sips * 0.04).toFixed(1) }} Liter!  </p>
        <ion-button class="menu-button" @click="goToMainMenu"
          >Zum Hauptmenü</ion-button
        >
        <ion-button class="menu-button" @click="restartGame"
          >Nochmal spielen</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useSpielerStore } from "../store/SpielerStore";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

const router = useRouter();
const spielerStore = useSpielerStore();


const goToMainMenu = () => {
  spielerStore.resetPlayers();
  router.push("/Startseite");
};
const restartGame = () => {
    spielerStore.sips = 0;
    spielerStore.counter = 0;
    router.push("/Spielfenster");
}
</script>

<style scoped>
.end-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #6db33f;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
  margin-left: 5%;
  margin-right: 5%;
  color: white;
  text-align: center;
}

.menu-button {
  --background: white;
  --color: #6db33f;
  margin-bottom: 10px;
}
</style>
