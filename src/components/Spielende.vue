<template>
  <ion-page>
    <ion-content>
      <div class="end-game">
        <h1>SPIELRUNDE BEENDET</h1>
        <p>
          Ihr habt zusammen {{ spielerStore.sips }} Schlucke getrunken. Das
          entspricht ca. {{ (spielerStore.sips * 0.02).toFixed(1) }} Liter!
        </p>
        <ion-button class="menu-button" @click="goToMainMenu"
          >Zum Hauptmenü</ion-button
        >
        <ion-button class="restart-button" @click="restartGame"
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
};
</script>

<style scoped>
@font-face {
  font-family: "Comic Story";
  src: url("../font/comic_story.ttf");
}

.end-game {
  display: grid;
  grid-template-rows: 10% 10% 60% 5% 5%; /* 70% für das Bild und 30% für den Text und die Buttons */
  align-items: center;
  justify-items: center;
  height: 100%;
  background-color: #6db33f;
  background: url("../assets/images/Spielende.png") no-repeat center center /
    cover;
  gap: 1em; /* Ein bisschen Abstand zwischen den Bereichen, optional */
  font-family: "Comic Story", sans-serif;
}

.end-game h1 {
  grid-row: 1; /* Setzen Sie Text und Buttons in die zweite Zeile */
  grid-column: 1;
  align-self: center;
  justify-self: center;
}

.end-game p {
  grid-row: 2; /* Setzen Sie Text und Buttons in die zweite Zeile */
  grid-column: 1;
  align-self: start;
  justify-self: center;
}

.end-game h1 {
  font-size: 24px;
  color: white;
}

.end-game p {
  font-size: 18px;
  color: white;
  text-align: center;
}

.menu-button {
  grid-row: 5;
  align-self: center;
  --background: white;
  --color: #6db33f;
  margin-bottom: 10px;
  font-family: "Comic Story", sans-serif;
}
.restart-button {
  align-self: center;
  grid-row: 4;
  --background: white;
  --color: #6db33f;
  margin-bottom: 10px;
  font-family: "Comic Story", sans-serif;
}
</style>
