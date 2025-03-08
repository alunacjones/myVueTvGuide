<template>
    <div style="position: static">
        <DayTitle/>
        <div class="channel-column-container">
            <div>
                <div style="">
                    <ChannelColumn v-for="channel in filteredData" :value="channel" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import moment from 'moment';
import ChannelColumn from './ChannelColumn.vue';
import { useQueryStore } from '../stores/queryStore';
import { storeToRefs } from 'pinia';
import { useListingsStore } from '../stores/listingsStore';
import { refDebounced } from '@vueuse/core';
import type { IListing, ISchedule } from '../types';
import { useMyNow } from '../composables/appNow';
import DayTitle from './DayTitle.vue';

const queryOptions = useQueryStore();
const { listings } = storeToRefs(useListingsStore());

const debouncedSearch = refDebounced(computed(() => queryOptions.searchString), 500)
const now = useMyNow();
const filteredData = computed(() => {
    const query = debouncedSearch.value?.toLowerCase();

    return listings.value.map((l: IListing) => {        
        return {
            ...l,
            schedules: l.schedules.filter((s: ISchedule) =>
                (!query || (query && s.details.title.toLowerCase().indexOf(query) > -1))
                &&
                (!queryOptions.type || (queryOptions.type && s.type === queryOptions.type))
                &&
                (!queryOptions.genre || (queryOptions.genre && s.details.genre === queryOptions.genre))
                &&
                (!queryOptions.category || (queryOptions.category && (s.details.meta?.categories?.includes(queryOptions.category) ?? false)))
                &&
                (!queryOptions.liveOnly || (queryOptions.liveOnly && moment(now.value).isBetween(moment(s.start_at), moment(s.end_at))))
            )
        }
    })
})
</script>
<style lang="scss" scoped>
.channel-column-container {
    display: flex; 
    flex-direction: column; 
    width: 100%;

    &>div {
        display: flex;

        &>div {
            display: flex; 
            flex-direction: row; 
            flex-wrap: wrap; 
            gap: 0.5em; 
            width: 100%            
        }
    }
}
</style>