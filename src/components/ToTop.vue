<template>
    <div v-if="!isVisible" class="to-top" @click="moveToTop">
        ↑
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHeaderStore } from '../stores/headerStore';
import { moveToTop } from '../composables/moveToTop';

const { isVisible } = storeToRefs(useHeaderStore());
</script>
<style lang="css" scoped>
.to-top {
    opacity: 0.3;
    background-color: blue;
    position: fixed;
    bottom: 0.5em;
    right: 1em;
    color: white;
    border-radius: 100%;
    padding: 0.5em 1em;
    z-index: 300;
    cursor: pointer;
    user-select: none;
}
</style>