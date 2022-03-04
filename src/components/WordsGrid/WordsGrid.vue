<script lang="ts">
import LetterTile from "../letterTile/LetterTile.vue";
import { reactive } from "vue";

export default {
  props: ["word"],
  setup() {
    const letters = reactive(this.props);
    return letters;
  },
  components: { LetterTile },
  //   methods: {
  //     lettersCreator(): [] {
  //       const lettersRemaining = 5 - this.word.split;
  //       return this.word.split("").concat(Array(lettersRemaining).fill(""));
  //     },
  //   },
  //   mounted() {
  //     this.lettersCreator();
  //   },
};

defineProps<{
  word: string;
}>();
</script>

<template>
  <div v-for="(letter, index) in letters" :key="index">
    <LetterTile :value="letter" />
  </div>
</template>
