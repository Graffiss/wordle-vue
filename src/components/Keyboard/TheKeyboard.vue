<script setup lang="ts">
import DeleteIcon from "@/components/icons/IconDelete.vue";
import { KEYBOARD_LETTERS } from "@/constants/constants";
</script>

<template>
  <div class="keyboard-wrapper">
    <button
      v-for="(key, index) in KEYBOARD_LETTERS"
      :key="index"
      :class="{ large: key === 'Enter', invisible: key === '' }"
    >
      {{ key }}
    </button>
    <button class="large">
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
