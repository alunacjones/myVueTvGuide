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
import type { IValue } from '../types/IValue';
import { useQueryStore } from '../stores/queryStore';
import { computed } from 'vue';

const { category } = storeToRefs(useQueryStore());
const props = defineProps<IValue<ISchedule>>()

    const filterCategory = (event: Event, item: string) => {
    event.stopPropagation();
    category.value = item;
}

const itemCategories = computed(() => props.value?.details?.meta?.categories);

</script>
<style lang="scss" scoped>
.categories {
    flex-wrap: wrap;
    gap: 0.3em;
    display: flex;
}

.badge {
    background-color: grey;
    color: white;
    font-weight: 700;
    padding: 0.2em 0.3em;
    height: fit-content;
    border-radius: 0.5em;
}
</style>