<template>
    <div class="filters" v-if="!isHeaderVisible">
        <Badge title="Platform" :value="queryOptions.platformText" />
        <Badge title="Region" :value="queryOptions.regionText" />
        <Badge title="Search" :value="queryOptions.searchString" v-if="queryOptions.searchString" />
        <Badge title="Type" :value="queryOptions.typeText" v-if="queryOptions.type" />
        <Badge title="Genre" :value="queryOptions.genre" v-if="queryOptions.genre" />
        <Badge title="Category" :value="queryOptions.category" v-if="queryOptions.category" />
        <Badge title="Live?" value="Yes" v-if="queryOptions.liveOnly" />
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQueryStore } from '../stores/queryStore';
import { useHeaderStore } from '../stores/headerStore';
import Badge from './Badge.vue';

const { isVisible: isHeaderVisible } = storeToRefs(useHeaderStore());
const queryOptions = useQueryStore();
</script>
<style lang="scss" scoped>
.filters {
    display: flex;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    gap: 0.5em;
    flex-wrap: wrap;
    justify-content: center;

    &>* {
        max-width: 90%;
    }
}
</style>