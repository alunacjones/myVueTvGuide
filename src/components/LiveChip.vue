<template>
    <Chip class="live" text="LIVE" @click="emit('click')"/>
</template>
<script lang="ts" setup>
import Chip from './Chip.vue';

const emit = defineEmits(["click"])
</script>
<style lang="scss" scoped>

@keyframes liveAnimation {
    0% {
        color: transparent;
    }

    50% {
        color: #ffdd00d0;
    }

    100% {
        color: transparent;
    }
}

.live {
    background-color: green;
    color: white;
}

.live::before {
    content: '●';
    font-size: 1.5em;
    line-height: 0.5em;
    animation: liveAnimation 1s infinite ease-in-out;
}
</style>