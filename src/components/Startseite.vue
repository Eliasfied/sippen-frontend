<template>
  <ion-page>
    <ion-content>
      <div class="page">
        <div class="header"></div>
        <div class="footer">
          <ion-list class="card-list">
            <ion-card
              class="card-item"
              v-for="(spieler, index) in spielerStore.players"
              :key="index"
            >
              <ion-item class="item-player">
                <ion-label class="spieler-color">{{ spieler.name }}</ion-label>
                <ion-icon
                  class="player-icon"
                  :icon="closeOutline"
                  @click="removePlayer(index)"
                />
              </ion-item>
            </ion-card>
          </ion-list>

          <ion-item class="input-item" lines="none">
            <ion-input v-model="newPlayer" placeholder="Spieler hinzufügen" />

            <ion-button
              class="input-button"
              slot="end"
              fill="clear"
              @click="addPlayer"
              :disabled="!newPlayer || spielerStore.players.length >= 10"
            >
              <ion-icon :icon="addOutline" color="white" />
            </ion-button>

            <ion-button
              class="input-button"
              slot="end"
              fill="clear"
              @click="startGame"
              :disabled="spielerStore.players.length === 0"
            >
              <ion-icon :icon="playForward" color="white" />
            </ion-button>
          </ion-item>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
import { closeOutline, addOutline, playForward } from "ionicons/icons";
import { useSpielerStore } from "../store/SpielerStore";
import { useRouter } from "vue-router";

const spielerStore = useSpielerStore();
const newPlayer = ref("");
const router = useRouter();

function addPlayer() {
  spielerStore.addPlayer({ name: newPlayer.value });
  newPlayer.value = "";
}

function removePlayer(index: number) {
  spielerStore.removePlayer(index);
}

function startGame() {
  router.push("/Spielfenster");
}
</script>

<style scoped>

@font-face {
  font-family: "Comic Story";
  src: url("../font/comic_story.ttf");
}
.page {
  display: grid;
  grid-template-rows: 65% 35%;
  height: 100%;
}

.page .header {
  background: url("../assets/images/Startseite.png") no-repeat center center /
    cover;
}

.page .footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: linear-gradient(#01131f 0%, #044344 100%);
  margin: 0;
  padding: 3rem 0;
}

.player-icon {
  font-size: 1.5rem;
}

.item-player {
  --inner-padding-bottom: 5px;
  --inner-padding-end: 0px;
  --inner-padding-start: 5px;
  --inner-padding-top: 5px;
  --background: white;

}

ion-list {
  width: 80%;
  height: 80%;
  background-color: transparent;

}

.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
  height: 75%; /* make sure the container takes up all available space */
  padding: 0;
  margin: 0;
  overflow: auto;
}

.card-item {
  display: inline-flex;
  align-items: center;
}

ion-card {
  --background: transparent;
  --color: white;
  height: 20%; /* Einstellung der Höhe der ion-card */
  padding: 0;
}


ion-label {
  font-family: "Comic Story", sans-serif;

}

.spieler-label {
  height: 100%;
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 0;
  margin: 0;
  font-family: "Comic Story", sans-serif;

}

.spieler-button-div {
  height: 100%;
  width: 100%;
}

.list-item {
  width: 100%;
}

.input-item {
  width: 100%;
}

.spieler-color {
  color: #e87b05;
  font-size: 16px;
  margin: 0;
  padding: 0;
  font-family: "Comic Story", sans-serif;

}

ion-item::part(native) {
  padding: 5px;
  margin: 0;
  font-family: "Comic Story", sans-serif;

}

ion-icon {
  color: grey;
  margin: 0;
  padding: 0;
}

.input-button {
  --background: #e87b05;
  --color: white;
}

ion-input {
  --color: #e87b05;
  --placeholder-color: grey;
  text-align: center;
  font-family: "Comic Story", sans-serif;

}
</style>
