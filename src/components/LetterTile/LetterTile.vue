<script setup lang="ts">
import { LetterState } from "@/utils/calculate-guess";
import { computed, watch } from "vue";

const props = defineProps<{
  value: string;
  state: LetterState | null;
}>();

const characterStateStyles = {
  [LetterState.Miss]: "#3a3a3c",
  [LetterState.Present]: "#b59f3b",
  [LetterState.Match]: "#538e4e",
};

const stateStyles = computed(() =>
  props.state == null ? "#121213" : `${characterStateStyles[props.state]}`
);

watch(
  () => props.state,
  () => stateStyles.value
);
</script>

<template>
  <div
    class="tile"
    :style="{
      backgroundColor: stateStyles,
    }"
  >
    {{ value }}
  </div>
</template>

<style scoped>
.tile {
  font-size: 2em;
  color: white;
  border: 0.05em solid hsl(240, 2%, 23%);
  background-color: #121213;
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: transform 250ms linear;
  width: 64px;
  height: 64px;
}
</style>
