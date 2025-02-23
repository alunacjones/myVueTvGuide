<template>
    <div class="header">
        <div class="header-items">
            <img src="../assets/guide.svg" style="width: 60px; height: 60px" />
            <span class="title">My TV Guide</span>
            <div>
                <label>Day</label>
                <select v-model="day">
                    <option v-for="item in days" :value="item.value">{{ item.label }}</option>
                </select>
            </div>
            <div>
                <label>Search</label>
                <input type="text" v-model="searchString" />
            </div>
            <div>
                <label>Programme Type</label>
                <select v-model="type">
                    <option value="">All</option>
                    <option value="movie">Films</option>
                    <option value="episode">Series</option>
                </select>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQueryStore } from '../stores/queryStore';
import moment from 'moment';
import { ref, watchEffect } from 'vue';
import { useListingsStore } from "../stores/listingsStore"
import { useNow } from '@vueuse/core';
import { useLoading } from '../stores/loadingStore';

const { isLoading } = storeToRefs(useLoading());

const { searchString, type, day } = storeToRefs(useQueryStore());
const listingsStore = useListingsStore();

const today = useNow({ interval: 30000 });
const createOption = (days: number) => {
    var date = moment(today.value).add(days, "days");
    var dayOfWeek = date.format("dddd");
    var mapping: any = {
        "-1": " (Yesterday)",
        "0": " (Today)",
        "1": " (Tomorrow)" 
    }

    const getExtraInfo = () => {
        return mapping[days.toString()] ?? ` (${date.format("Do MMM")})`
    }
    return {
        label: `${dayOfWeek}${getExtraInfo()}`,
        value: date.format("yyyy-MM-DD")
    }
}

const days = ref([...Array(10).keys()].map(i => createOption(i - 1)))
watchEffect(async () => { 
    isLoading.value = true;
    await listingsStore.fetchListings(new Date(day.value)).finally(() => isLoading.value = false)
})
</script>
<style scoped>
.header {
    /*position: fixed;*/
    position: sticky;
    width: 100%;
    background-color: red;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;    
    flex-wrap: wrap;
}

.header-items>span {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    vertical-align: middle;
    align-content: center;
}

.header-items>img {
    margin: 0.5em 1em;
    background-color: white;
    border-radius: 10%;
}

.header-items {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    color: white;
}

.header-items > div {
    display: flex;
    gap: 0.5rem;
    border-left: 1px solid white;
    padding-left: 1em;
}

.header-items label {
    font-weight: 700;
}

@media print {
    .header {
        display: none;
    }
}

@media screen and (min-width: 100px) and (max-width: 1024px) {
    .header {
        padding-bottom: 0.5em;
    }
    .header-items {
        flex-direction: column;
        align-items: center;
        align-content: center;
    }

    .header-items > div {
        border-left: 0px;
        padding-left: 0em;
    }   
    .title {
        display: none;
    } 
}
label {
    text-wrap-mode: nowrap;
}
</style>