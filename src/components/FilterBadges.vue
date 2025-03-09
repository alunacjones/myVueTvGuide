<template>
    <div class="filters" v-if="!isHeaderVisible">
        <template v-for="item in descriptors" :key="item.key">
            <Badge v-if="canShow(item)" :title="item.title" :value="formatValue(item)" @click="moveToTop"/>
        </template>
    </div>
</template>
<script setup lang="ts">
import { moveToTop } from '../composables/moveToTop';
import { storeToRefs } from 'pinia';
import { useQueryStore, type ISearchDescriptor } from '../stores/queryStore';
import { useHeaderStore } from '../stores/headerStore';
import Badge from './Badge.vue';

const { isVisible: isHeaderVisible } = storeToRefs(useHeaderStore());
const queryOptions = useQueryStore();
const descriptors = queryOptions.getSearchParamDescriptors();

const formatValue = (item: ISearchDescriptor) => queryOptions.getDisplayText(item.key);
const canShow = (item: ISearchDescriptor) => item.showOnFilterBadges && queryOptions[item.key];
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