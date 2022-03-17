<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useGuess } from "../../composable/useGuess";
import { usePrevious } from "../../composable/usePrevious";
import { NUMBER_OF_GUESSES, WORD_LENGTH } from "../../constants/constants";
import { useGuessStore } from "../../store/guess";
import { isValidWord } from "../../utils/get-words";
import TheKeyboard from "../Keyboard/TheKeyboard.vue";
import WordsGrid from "../wordsGrid/WordsGrid.vue";
import Alert from "../Alert/TheAlert.vue";

const main = useGuessStore();
const { rows, gameState } = storeToRefs(main);
const { guess, addGuessLetter } = useGuess();

const invalidGuess = ref({ showInvalidGuess: false });

const previousGuess = usePrevious(guess);

watch(previousGuess, () => {
  if (guess.value.length === 0 && previousGuess.value.length === WORD_LENGTH) {
    if (isValidWord(previousGuess.value)) {
      invalidGuess.value = { showInvalidGuess: false };
      main.addGuess(previousGuess.value);
    } else {
      invalidGuess.value = { showInvalidGuess: true };
      guess.value = previousGuess.value;
    }
  }
});

const isGameOver = computed(() => gameState.value !== "playing");

const words = computed(() => {
  let newRows = [...rows.value];

  let currentRow = 0;
  if (newRows.length < NUMBER_OF_GUESSES) {
    currentRow = newRows.push({ guess: guess.value }) - 1;
  }

  const guessesRemaining = NUMBER_OF_GUESSES - newRows.length;

  newRows = newRows.concat(Array(guessesRemaining).fill({ guess: "" }));

  return newRows;
});
</script>

<template>
  <Alert v-if="isGameOver" />
  <div class="tiles-wrapper">
    <WordsGrid :word="word.guess" v-for="(word, index) in words" :key="index" />
  </div>
  <TheKeyboard :onClickProps="(key) => addGuessLetter(key)" />
</template>

<style scoped>
.tiles-wrapper {
  display: grid;
  justify-content: center;
  align-content: center;
  flex-grow: 1;
  grid-template-columns: repeat(5, 4em);
  grid-template-rows: repeat(6, 4em);
  gap: 0.25em;
  margin-bottom: 1em;
}
</style>
