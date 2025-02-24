<template>
    <div class="to-top" @click="moveToTop">
        TOP
    </div>
</template>
<script setup lang="ts">
const moveToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
</script>
<style lang="css" scoped>
    .to-top {
        opacity: 0.3;
        background-color: blue;
        position: fixed;
        bottom: 0.5em;
        right: 0.5em;
        color: white;
        border-radius: 100%;
        padding: 0.5em 1em;
        z-index: 300;
        cursor: pointer;
        user-select: none;
    }

    .to-top:hover {
        opacity: 1;
    }
</style>