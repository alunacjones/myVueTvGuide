<template>
    <Chip class="red" :text="text" />
</template>
<script lang="ts" setup>
import Chip from './Chip.vue';

interface IRedChipOptions {
    text: string
}
defineProps<IRedChipOptions>();
</script>
<style lang="scss" scoped>

.red {    
    color: white;
    background-color: var(--heading-background-color);
    text-align: right;
}
</style>