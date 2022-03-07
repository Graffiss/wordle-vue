<script setup lang="ts">
import { reactive } from "vue";
import TheKeyboard from "../Keyboard/TheKeyboard.vue";
import WordsGrid from "../wordsGrid/WordsGrid.vue";

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
  <TheKeyboard />
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
