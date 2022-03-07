<script setup lang="ts">
import { computed } from "vue";
import LetterTile from "../LetterTile/LetterTile.vue";
import { WORD_LENGTH } from "../../constants/constants";

const props = defineProps<{
  word: string;
}>();

const letters = computed(() => {
  const lettersRemaining = WORD_LENGTH - props.word.length;
  return props.word.split("").concat(Array(lettersRemaining).fill(""));
});
</script>

<template>
  <div v-for="(letter, index) in letters" :key="index">
    <LetterTile :value="letter" />
  </div>
</template>
