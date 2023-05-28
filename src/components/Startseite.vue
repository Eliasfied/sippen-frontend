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
              <ion-item>
                <ion-label class="spieler-color">{{ spieler.name }}</ion-label>
                <ion-button
                  class="button-player"
                  fill="clear"
                  slot="end"
                  @click="removePlayer(index)"
                >
                  <ion-icon :icon="trashOutline" />
                </ion-button>
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
import { trashOutline, addOutline, playForward } from "ionicons/icons";
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
.page {
  display: grid;
  grid-template-rows: 65% 35%;
  height: 100%;
}

.page .header {
  background: url("../assets/images/sippen2.png") no-repeat center center /
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

.button-player {
  color: white;
  font-size: 6px;
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
}

.card-item {
  flex: 0 0 auto; /* prevents the items from stretching */
  margin-right: 10px; /* space between items */
  margin-top: 10px; /* space between rows */
}

.spieler-label {
  height: 100%;
  width: 100%;
  text-align: center;
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
}

ion-icon {
  color: red;
}

.input-button {
  --background: #e87b05;
  --color: white;
}

ion-input {
  --color: #e87b05;
  --placeholder-color: grey;
  text-align: center;
}
</style>
