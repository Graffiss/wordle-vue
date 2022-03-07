<script setup lang="ts">
defineProps<{
  value?: string;
}>();
</script>

<template>
  <div class="tile">
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
  width: 60px;
  height: 60px;
}
</style>
