<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Neues Spiel</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <ion-list>
          <ion-item v-for="(spieler, index) in spielerStore.players" :key="index">
            {{ spieler.name }}
            <ion-button fill="clear" slot="end" @click="removePlayer(index)">
              <ion-icon :icon="trashOutline" />
            </ion-button>
          </ion-item>
        </ion-list>
  
        <ion-input v-model="newPlayer" placeholder="Spieler hinzufügen" />
  
        <ion-button @click="addPlayer" :disabled="!newPlayer || spielerStore.players.length >= 10">
          Spieler hinzufügen
        </ion-button>
  
        <ion-button @click="startGame" :disabled="spielerStore.players.length === 0">
          Spiel starten
        </ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { IonButton, IonIcon, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
  import { trashOutline } from 'ionicons/icons';
  import { useSpielerStore } from "../store/SpielerStore";
  import { useRouter } from "vue-router";
  
  const spielerStore = useSpielerStore();
  const newPlayer = ref("");
  const router = useRouter();
  
  function addPlayer() {
    spielerStore.addPlayer({ name: newPlayer.value });
    newPlayer.value = "";
  }
  
  function removePlayer(index : number) {
    spielerStore.removePlayer(index);
  }
  
  function startGame() {
    router.push("/Spielfenster");
  }
  </script>
