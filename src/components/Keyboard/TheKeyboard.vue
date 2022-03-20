<script setup lang="ts">
import DeleteIcon from "@/components/icons/IconDelete.vue";
import { KEYBOARD_LETTERS } from "@/constants/constants";
import { LetterState } from "@/utils/calculate-guess";
import { storeToRefs } from "pinia";
import { useGuessStore } from "../../store/guess";

const keyStateStyles = {
  [LetterState.Miss]: "#3a3a3c",
  [LetterState.Present]: "#b59f3b",
  [LetterState.Match]: "#538e4e",
};

const main = useGuessStore();
const { keyboardLetterState } = storeToRefs(main);

const props = defineProps<{
  onClickProps: (key: string) => void;
}>();

const onClick = (e: Event) => {
  const { textContent, innerHTML } = e.currentTarget as HTMLButtonElement;

  let returnProps = textContent!;
  if (textContent !== innerHTML) {
    returnProps = "Backspace";
  }

  props.onClickProps(returnProps);
};
</script>

<template>
  <div class="keyboard-wrapper">
    <button
      v-for="(key, index) in KEYBOARD_LETTERS"
      :key="index"
      :class="{
        large: key === 'Enter',
        invisible: key === '',
      }"
      :style="{
        backgroundColor: keyStateStyles[keyboardLetterState[key]],
      }"
      @click="onClick"
    >
      {{ key }}
    </button>
    <button class="large" @click="onClick">
      <DeleteIcon />
    </button>
  </div>
</template>

<style scoped>
.keyboard-wrapper {
  display: grid;
  grid-template-columns: repeat(20, minmax(auto, 1.25em));
  grid-auto-rows: 3em;
  gap: 0.25em;
  justify-content: center;
  margin-top: 5em;
}

button {
  font-size: inherit;
  grid-column: span 2;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #818384;
  color: white;
  fill: white;
  text-transform: uppercase;
  border-radius: 0.25em;
  cursor: pointer;
  user-select: none;
}
.large {
  grid-column: span 3;
}

.invisible {
  grid-column: span 1;
  background-color: transparent;
}
</style>
