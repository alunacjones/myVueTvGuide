<template>
    <div class="chip" @click="emit('click', $event)">
        {{ text }}
    </div>    
</template>
<script lang="ts" setup>
interface IChipProps
{
    text: string
}

defineProps<IChipProps>();
const emit = defineEmits(["click"])
</script>
<style lang="scss">
.chip {
    display: inline;
    font-size: 1em;
    padding: 0.2em;
    cursor: pointer;
    font-weight: bold;
    background-color: yellow;
    border-radius: var(--border-radius);
}
</style>