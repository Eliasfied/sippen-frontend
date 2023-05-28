<template>
  <ion-page>
    <ion-content>
      <div @click="next" class="content">
        <div v-if="currentQuestion && currentAnswer">
          <div class="question">
            <p
              :key="currentQuestion.frageText"
              class="text"
              :class="{ 'answer-text': showAnswer }"
            >
              <span
                v-html="
                  showAnswer
                    ? currentAnswer.antwortText
                    : currentQuestion.frageText
                "
              ></span>
            </p>
          </div>
        </div>
        <div class="close-button" @click.stop="endGame">
          <ion-icon :icon="closeOutline"></ion-icon>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useSpielerStore } from "../store/SpielerStore";
import { useRouter } from "vue-router";
import { closeOutline } from "ionicons/icons";
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

//fragen und antworten
interface Frage {
  frageText: string;
  kategorieId: number;
  strafe: number;
}

interface Antwort {
  antwortText: string;
}

const fragen = ref<Frage[]>([]);
const antworten = ref<Antwort[]>([]);
const currentQuestion = ref<Frage | null>(null);
const currentAnswer = ref<Antwort | null>(null);
const showAnswer = ref(false);

//store
const spielerStore = useSpielerStore();

//router

const router = useRouter();

onMounted(async () => {
  try {
    const responseFragen = await axios.get<Frage[]>(
      "http://localhost:8080/api/fragen"
    );
    const responseAntworten = await axios.get<Antwort[]>(
      "http://localhost:8080/api/antworten"
    );
    fragen.value = responseFragen.data;
    antworten.value = responseAntworten.data;
    selectRandomQuestionAndAnswer();
  } catch (error) {
    console.error(error);
  }
});

const next = () => {
  if (spielerStore.counter == 30) {
    router.push("/Spielende");
  }
  if (showAnswer.value) {
    selectRandomQuestionAndAnswer();
    spielerStore.counter++;
    if (currentQuestion.value?.strafe)
      spielerStore.sips = spielerStore.sips + currentQuestion.value?.strafe;
  }
  showAnswer.value = !showAnswer.value;
};

const selectRandomQuestionAndAnswer = () => {
  const index = Math.floor(Math.random() * fragen.value.length);
  currentQuestion.value = fragen.value[index];
  currentAnswer.value = antworten.value[index];

  if (
    currentQuestion.value.kategorieId === 7 ||
    currentQuestion.value.kategorieId === 8 ||
    currentQuestion.value.kategorieId == 10
  ) {
    let randomSpielerIndex = Math.floor(
      Math.random() * spielerStore.players.length
    );
    // html markup, spielernamen schwarz machen
    currentQuestion.value.frageText = currentQuestion.value.frageText.replace(
      "[Spieler]",
      `<span style="color: red">${spielerStore.players[randomSpielerIndex].name}</span>`
    );
    currentQuestion.value.frageText = currentQuestion.value.frageText.replace(
      "[Spieler1]",
      `<span style="color: red">${spielerStore.players[randomSpielerIndex].name}</span>`
    );

    // schauen dass spieler1 und spieler2 nicht gleich sind
    if (currentQuestion.value.kategorieId === 8) {
      let randomSpielerIndex2 = randomSpielerIndex;
      while (randomSpielerIndex2 === randomSpielerIndex) {
        randomSpielerIndex2 = Math.floor(
          Math.random() * spielerStore.players.length
        );
      }
      currentQuestion.value.frageText = currentQuestion.value.frageText.replace(
        "[Spieler2]",
        `<span style="color: red">${spielerStore.players[randomSpielerIndex2].name}</span>`
      );
    }
  }
};

function endGame() {
  console.log("WAS");
  router.push("/Spielende");
}
</script>

<style scoped>

@font-face {
  font-family: "Comic Story";
  src: url("../font/comic_story.ttf");
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background-color: #4caf50;
  color: white;
  background: url("../assets/images/Spielfenster.png") no-repeat center center /
    cover;
}

.question,
.answer {
  margin-bottom: 20px;
}

.text {
  font-weight: bold;
  font-size: x-large;
  margin-left: 5%;
  margin-right: 5%;
  text-align: center;
  animation: text-in 0.3s ease-out forwards;
  font-family: "Comic Story", sans-serif;

}

@keyframes text-in {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.next-button {
  --background: white;
  --color: #4caf50;
  margin-top: 50px; /* adjust this value as needed */
}

.answer-text {
  color: wheat;
}

.close-button {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  opacity: 0.7;
  cursor: pointer;
}

.close-button ion-icon {
  font-size: 32px;
}
</style>
