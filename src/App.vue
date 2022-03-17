<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";

*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: Arial;
}

html {
  font-size: 62.5%;
}
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  min-height: 100vh;
  margin: 0;
  padding: 1em;
}
</style>
