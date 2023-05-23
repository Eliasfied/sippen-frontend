<template>
  <ion-page>
    <ion-content>
      <div class="content">
      <div v-if="currentQuestion && currentAnswer">
        <div class="question">
          <p class="text" :class="{'answer-text': showAnswer}">
          {{ showAnswer ? currentAnswer.antwortText : currentQuestion.frageText }}
          </p>
        </div>
        <div class="button-container">
          <ion-button class="next-button" @click="next">
            Weiter
          </ion-button>
        </div>
      </div>
    </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Frage {
  frageText: string;
}

interface Antwort {
  antwortText: string;
}

const fragen = ref<Frage[]>([]);
const antworten = ref<Antwort[]>([]);
const currentQuestion = ref<Frage | null>(null);
const currentAnswer = ref<Antwort | null>(null);
const showAnswer = ref(false);
let index = ref(0);

onMounted(async () => {
  try {
    const responseFragen = await axios.get<Frage[]>("http://localhost:8080/api/fragen");
    const responseAntworten = await axios.get<Antwort[]>("http://localhost:8080/api/antworten");
    fragen.value = responseFragen.data;
    antworten.value = responseAntworten.data;
    selectRandomQuestionAndAnswer();
  } catch (error) {
    console.error(error);
  }
});

const next = () => {
  if (showAnswer.value) {
    selectRandomQuestionAndAnswer();
  }
  showAnswer.value = !showAnswer.value;
};

const selectRandomQuestionAndAnswer = () => {
  const index = Math.floor(Math.random() * fragen.value.length);
  currentQuestion.value = fragen.value[index];
  currentAnswer.value = antworten.value[index];
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background-color: #4CAF50;
  color: white;
}

.question, .answer {
  margin-bottom: 20px;
  
}

.text {
  font-weight: bold;
  font-size: x-large;
  margin-left: 5%;
  margin-right: 5%;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.next-button {
  --background: white;
  --color: #4CAF50;
  margin-top: 50px; /* adjust this value as needed */
}

.answer-text {
    color: orange;
  }


</style>
