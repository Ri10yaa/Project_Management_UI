<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
    <!-- <vue3-snackbar top right :duration="4000" style="z-index: 100000;"></vue3-snackbar> -->
    <notifications position="top right" duration="3000"/>
  <RouterView />
</template>

<style>

.vue-notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 12px;
  color: #ffffff;

  background: #44a4fc;

  &.success {
    background: #68cd86;
  }

  &.warn {
    background: #ffb648;
  }

  &.error {
    background: #e54d42;
  }
}

</style>

<!-- <vue3-snackbar top right :duration="5000" :limit="80" shadow></vue3-snackbar> -->