<template>
    <div class="badge" @click="emit('click')">
        <div class="key">{{ title }}</div>
        <div class="value">{{ value }}</div>
    </div>
</template>
<script setup lang="ts">
interface IBadgeProps {
    title: string
    value: string
    valueBackground?: string
}

const emit = defineEmits(["click"])
const props = defineProps<IBadgeProps>()
</script>
<style lang="scss" scoped>
.badge {
    display: flex;
    font-size: 0.8em;
    padding-top: 0.2em;
    cursor: pointer;

    & > * {
        font-weight: bold;
        padding: 0em 0.5em;
        min-width: 0;        
    }

    & > *:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
    }

    & > *:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);        
    }

    & > .key {
        background-color: black;
        color: white;
    }

    & > .value {
        background-color: v-bind("props.valueBackground ?? 'yellow'");
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>