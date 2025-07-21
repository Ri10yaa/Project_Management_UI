<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
    <vue3-snackbar top right :duration="4000" style="z-index: 100000;"></vue3-snackbar>
  <RouterView />
</template>

<style>

</style>

<!-- <vue3-snackbar top right :duration="5000" :limit="80" shadow></vue3-snackbar> -->