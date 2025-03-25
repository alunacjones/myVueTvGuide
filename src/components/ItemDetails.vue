<template>
    <div class="item-details">
        <ItemTitle :model-value="model" />
        <p v-if="isAMovie">
            {{ model.details.meta.year }}
        </p>
        <p>{{ summary }}</p>
        <p class="genre">
            {{ genreInfo }}
        </p>
        <Categories :model-value="model" />
    </div>
</template>
<script setup lang="ts">
import { useScheduleDetails } from '../composables/scheduleItem';
import { type ISchedule } from '../types';
import Categories from './Categories.vue';
import ItemTitle from './ItemTitle.vue';

const model = defineModel<ISchedule>({ required: true });
const { genreInfo, isAMovie, summary } = useScheduleDetails(model);
</script>
<style lang="scss" scoped>
.item-details {
    width: 100%;

    &>p {
        margin: 0;
        display: flex;
        flex-wrap: wrap;
    }
}

.genre {
    font-style: italic;
    font-weight: 600;
    color: #0008;
}
</style>