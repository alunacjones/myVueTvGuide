<script setup lang="ts">
import Header from './components/Header.vue';
import Guide from './components/Guide.vue';
import Loading from 'vue-loading-overlay';
import { useLoading } from './stores/loadingStore';
import { storeToRefs } from 'pinia';

const { isLoading } = storeToRefs(useLoading());
</script>

<template>
  <div>        
    <Header></Header>
    <Guide></Guide>
    <Loading v-model:active="isLoading" :is-full-page="true" loader="dots"></Loading>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
