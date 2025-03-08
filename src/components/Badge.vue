<template>
    <div class="badge" @click="moveToTop">
        <div class="key">{{ title }}</div>
        <div class="value">{{ value }}</div>
    </div>
</template>
<script setup lang="ts">
import { moveToTop } from '../composables/moveToTop';

interface IBadgeProps {
    title: string
    value: string
}

defineProps<IBadgeProps>()
</script>
<style lang="scss" scoped>
.badge {
    display: flex;
    font-size: 0.7em;
    padding-top: 0.2em;
    cursor: pointer;

    & > * {
        font-weight: 700;
        padding: 0em 0.5em;
        min-width: 0;        
    }

    & > .key {
        background-color: black;
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
        color: white;
    }

    & > .value {
        background-color: yellow;
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
        text-overflow: ellipsis;
        overflow: hidden;
    }

    & > .chip {
        background-color: yellow;
        border-radius: var(--border-radius);
    }
}
</style>