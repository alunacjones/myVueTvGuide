<template>
    <div v-if="value?.expanded" class="categories">        
        <Chip class="category" v-for="item in itemCategories" @click="filterCategory($event, item)" :text="item"/>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { type ISchedule } from '../types';
import { useQueryStore } from '../stores/queryStore';
import { useScheduleDetails } from '../composables/scheduleItem';
import Chip from './Chip.vue';

const { category } = storeToRefs(useQueryStore());
const value = defineModel<ISchedule>({ required: true });
const { categories: itemCategories } = useScheduleDetails(value);

const filterCategory = (event: Event, item: string) => {
    event.stopPropagation();
    category.value = item;
}

</script>
<style lang="scss" scoped>
div.categories {
    flex-wrap: wrap;
    display: flex;
}

.category {
    background-color: grey;
    color: white;
    font-weight: bold;
    padding: 0.2em 0.3em;
    margin: 0.2em;
    height: fit-content;
    border-radius: 0.5em;
}
</style>