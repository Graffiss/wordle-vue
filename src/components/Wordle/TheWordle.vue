<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { mapActions, storeToRefs } from "pinia";
import { useGuess } from "../../composable/useGuess";
import TheKeyboard from "../Keyboard/TheKeyboard.vue";
import WordsGrid from "../wordsGrid/WordsGrid.vue";
import { useGuessStore } from "../../store/guess";
import { isValidWord } from "../../utils/get-words";
import { WORD_LENGTH } from "../../constants/constants";

const main = useGuessStore();
const { rows, gameState } = storeToRefs(main);
const { addGuess } = mapActions(useGuessStore, ["addGuess"]);
const { guess, addGuessLetter } = useGuess();

const invalidGuess = ref({ showInvalidGuess: false });

const previousGuess = usePrevious(guess);
onMounted(() => {
  if (guess.value.length === 0 && previousGuess?.length === WORD_LENGTH) {
    if (isValidWord(previousGuess)) {
      invalidGuess.value = { showInvalidGuess: false };
      addGuess(previousGuess);
    } else {
      invalidGuess.value = { showInvalidGuess: true };
      guess.value = previousGuess;
    }
  }
});

const state = reactive({
  rows: [
    {
      guess: "world",
    },
    {
      guess: "great",
    },
    {
      guess: "cra",
    },
    {
      guess: "",
    },
    {
      guess: "",
    },
    {
      guess: "",
    },
  ],
});
</script>

<template>
  <div class="tiles-wrapper">
    <WordsGrid
      :word="word.guess"
      v-for="(word, index) in state.rows"
      :key="index"
    />
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
