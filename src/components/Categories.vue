<template>
    <p v-if="value?.expanded" class="categories">
        <span class="badge" v-for="item in itemCategories" @click="filterCategory($event, item)">
            {{ item }}
        </span>
    </p>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { type ISchedule } from '../types';
import { useQueryStore } from '../stores/queryStore';
import { useScheduleDetails } from '../composables/scheduleItem';

const { category } = storeToRefs(useQueryStore());
const value = defineModel<ISchedule>({ required: true });
const { categories: itemCategories } = useScheduleDetails(value);

const filterCategory = (event: Event, item: string) => {
    event.stopPropagation();
    category.value = item;
}

</script>
<style lang="scss" scoped>
p.categories {
    flex-wrap: wrap;
    gap: 0.2em 0.3em;
    display: flex;
}

.badge {
    background-color: grey;
    color: white;
    font-weight: bold;
    padding: 0.2em 0.3em;
    height: fit-content;
    border-radius: 0.5em;
}
</style>