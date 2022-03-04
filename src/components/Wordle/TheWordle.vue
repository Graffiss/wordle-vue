<template>
  <h2>Wordle - Vue</h2>
  <div class="tiles-wrapper" v-for="(word, index) in rows" :key="index">
    <!-- <WordsGrid :word="word.guess" /> -->
    <h2>{{ word.guess }}</h2>
    {{ console.log(rows) }}
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
// import WordsGrid from "../wordsGrid/WordsGrid.vue";

export default {
  name: "TheWordle",
  // components: { WordsGrid },
  setup() {
    const rows = reactive([
      {
        guess: "world",
      },
      {
        guess: "great",
      },
    ]);
    return rows;
  },
};
</script>
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
