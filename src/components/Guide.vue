<template>
    <div style="position: static">
        <div class="day-title">
            <div class="top">
                <span class="top-date">{{ date }}</span>
                <span class="top-day">{{ day }}</span>
            </div>
        </div>
        <div style="display: flex; flex-direction: column; width: 100%">
            <div style="display:flex">
                <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 0.5em; width: 100%">
                    <ChannelColumn v-for="channel in filteredData" :value="channel" />
                </div>
            </div>
        </div>        
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { getListings } from '../utils/api';
import moment from 'moment';
import ChannelColumn from './ChannelColumn.vue';
import { useQueryStore } from '../stores/queryStore';
import { storeToRefs } from 'pinia';
import { useListingsStore } from '../stores/listingsStore';
import { refDebounced } from '@vueuse/core';

const queryOptions = useQueryStore();
const { listings } = storeToRefs(useListingsStore());

const day = computed(() => moment(queryOptions.day).format("dddd"))
const date = computed(() => moment(queryOptions.day).format("Do MMMM"))
const debouncedSearch = refDebounced(computed(() => queryOptions.searchString), 500)
const filteredData = computed(() =>
{
    const query = debouncedSearch.value?.toLowerCase();

    return listings.value.map((l: any) =>
        {
            return {
                ...l,
                schedules: l.schedules.filter((s: any) => 
                    (!query || (query && s.details.title.toLowerCase().indexOf(query) > -1))
                    &&
                    (!queryOptions.type || (queryOptions.type && s.type === queryOptions.type))
                    &&
                    (!queryOptions.genre || (queryOptions.genre && s.details.genre === queryOptions.genre))
                )
            }
        }
    )
})

onMounted(async () => listings.value = await getListings(new Date()));
</script>
<style lang="css" scoped>
.top {
    display: flex;
    align-items: center;
    justify-content: center;
	background-color: purple;
    padding: 0em 2em;
    border-top: 2px solid white;
    border-bottom: 2px solid white;
    text-align: right;
    padding: 0.3em 0.3em 0.3em 0.3em;
    color: white;	
    font-weight: 700;	
    width: 100%;
    text-shadow: black 2px 2px;
}
.top-day {		
	text-transform: uppercase;	
    font-size: 1.5em;  
}

.top-date {
    padding-right: 1em;
    color: yellow;
    font-size: 1.2em;
    text-wrap-mode: nowrap;
}

.day-title {
    display: flex; 
    flex-direction: row;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 200;
}
</style>