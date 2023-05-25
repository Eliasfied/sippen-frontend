<template>
  <ion-page>
    <ion-content>
      <div class="page">
        <ion-list>
          <ion-card
            v-for="(spieler, index) in spielerStore.players"
            :key="index"
          >
            <ion-item>
              <ion-label class="spieler-color">{{ spieler.name }}</ion-label>
              <ion-button fill="clear" slot="end" @click="removePlayer(index)">
                <ion-icon :icon="trashOutline" />
              </ion-button>
            </ion-item>
          </ion-card>
        </ion-list>
        <div class="footer">
          <ion-input v-model="newPlayer" placeholder="Spieler hinzufügen" />

          <ion-button
            @click="addPlayer"
            :disabled="!newPlayer || spielerStore.players.length >= 10"
          >
            Spieler hinzufügen
          </ion-button>

          <ion-button
            @click="startGame"
            :disabled="spielerStore.players.length === 0"
          >
            Spiel starten
          </ion-button>
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
import { trashOutline } from "ionicons/icons";
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #6db33f; /* grüner Hintergrund */
  height: 100%;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

ion-list {
  max-width: 500px; /* oder einen anderen gewünschten Wert */
  width: 100%;
  background-color: #6db33f;
}

ion-card {
  --background: white;
  --color: #6db33f;
}

ion-item {
  color: white; /* weiße Textfarbe */
}

.spieler-color {
  color:#6db33f;
}

ion-icon {
  color: red;
}

ion-button {
  --background: white; /* weiße Hintergrundfarbe */
  --color: #6db33f; /* grüne Textfarbe */
  margin-bottom: 10px;
}

ion-input {
  --background: white;
  --color: #6db33f; /* grüner Text */
  --placeholder-color: #6db33f; /* grüner Platzhalter */
  margin-bottom: 10px;
}
</style>
