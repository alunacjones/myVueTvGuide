<script setup lang="ts">
import Header from './components/Header.vue';
import Guide from './components/Guide.vue';
import Loading from 'vue-loading-overlay';
import { useLoading } from './stores/loadingStore';
import { storeToRefs } from 'pinia';
import ToTop from './components/ToTop.vue';
import { useKeyboardShortcuts } from './composables/keyboardShortcuts';

const { isLoading } = storeToRefs(useLoading());
useKeyboardShortcuts();
</script>

<template>
  <div>        
    <Header></Header>
    <Guide></Guide>
    <Loading v-model:active="isLoading" :is-full-page="true" loader="dots"></Loading>
    <ToTop></ToTop>
  </div>
</template>