<template>
    <div ref="header" class="header">
        <div class="header-items">
            <img src="../assets/guide.svg" style="width: 60px; height: 60px" />
            <div class="search-items">
                <div>
                    <label>Day</label>
                    <select v-model="day">
                        <option v-for="item in days" :value="item.value">{{ item.label }}</option>
                    </select>
                </div>
                <div>
                    <label>Platform</label>
                    <select v-model="platform">
                        <option value="popular">Popular</option>
                        <option value="freeview">Freeview</option>
                        <option value="virgin">Virgin</option>
                    </select>
                </div>
                <div v-if="platform !== 'popular'">
                    <label>Region</label>
                    <select v-model="region">
                        <option value="yorkshire">Yorkshire</option>
                        <option value="north-west">North West</option>
                    </select>
                </div>
                <div>
                    <label>Search</label>
                    <input ref="searchInput" type="search" v-model="searchString" />
                </div>
                <div>
                    <label>Programme Type</label>
                    <select v-model="type">
                        <option value="">All</option>
                        <option value="movie">Films</option>
                        <option value="episode">Series</option>
                    </select>
                </div>
                <div>
                    <label>Genre</label>
                    <select v-model="genre">
                        <option value="">All</option>
                        <option v-for="item in genres" :value="item">{{ item }}</option>
                    </select>
                </div>
                <div>
                    <label>Categories</label>
                    <select v-model="category" style="max-width: 15em;">
                        <option value="">All</option>
                        <option v-for="item in allCategories" :value="item">{{ item }}</option>
                    </select>
                </div>
                <div>
                    <div>
                        <label for="hideEmpty">Hide empty channels?</label>
                        <input type="checkbox" id="hideEmpty" v-model="hideEmpty" />
                    </div>
                </div>
                <div>
                    <div>
                        <label for="onNow">On Now?</label>
                        <input type="checkbox" id="onNow" v-model="liveOnly" />
                    </div>
                </div>                
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQueryStore } from '../stores/queryStore';
import moment from 'moment';
import { ref, useTemplateRef, watch, watchEffect } from 'vue';
import { useListingsStore } from "../stores/listingsStore"
import { useIntersectionObserver } from '@vueuse/core';
import { useLoading } from '../stores/loadingStore';
import { useHeaderStore } from '../stores/headerStore';
import { useMagicKeys } from '@vueuse/core';
import { useMyNow } from '../composables/appNow';

const { isVisible } = storeToRefs(useHeaderStore());
const { isLoading } = storeToRefs(useLoading())

const header = useTemplateRef<HTMLDivElement>("header")
const keys = useMagicKeys({ target: document });
const ctrlSlash = keys['Ctrl+/']
const searchInput = useTemplateRef<HTMLInputElement>("searchInput");

watch(ctrlSlash, v => {
    if (v) {
        header.value?.scrollIntoView({ behavior: "smooth" });
        searchInput.value?.select();
        searchInput.value?.focus();
    }
})
const { searchString, type, day, genre, hideEmpty, platform, region, category, liveOnly } = storeToRefs(useQueryStore());
const listingsStore = useListingsStore();
const { genres, categories: allCategories } = storeToRefs(useListingsStore());

const today = useMyNow();

useIntersectionObserver(header, ([entry], _) => isVisible.value = entry.isIntersecting);

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

const days = ref([...Array(10).keys()].map(i => createOption(i - 1)));

watchEffect(async () => {
    isLoading.value = true;
    await listingsStore.fetchListings(new Date(day?.value), platform.value, region.value).finally(() => isLoading.value = false);
    if (genres.value.indexOf(genre.value) === -1) {
        genre.value = "";
    }
})
</script>
<style scoped lang="scss">
.header {
    width: 100%;
    background-color: red;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    flex-wrap: wrap;

    .header-items {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0;
        color: white;

        &>span {
            color: white;
            font-size: 2rem;
            font-weight: 700;
            vertical-align: middle;
            align-content: center;

        }

        &>img {
            margin: 0.5em 1em;
            background-color: white;
            border-radius: var(--border-radius);
        }

        &>div {
            display: flex;
            gap: 0rem;
        }

        & label {
            font-weight: 700;
            user-select: none;
        }
    }
}

@media print {
    .header {
        display: none;
    }
}

@media screen and (min-width: 100px) and (max-width: 1650px) {
    .header {
        padding-bottom: 0.5em;

        .header-items {
            flex-direction: column;

            &>div {
                border-left: 0px;
                padding-left: 0em;
            }

            .search-items {
                display: flex;
                flex-direction: row;
                align-items: center;
                align-content: center;
                flex-grow: 1;
                width: 100%;
                gap: 0.5em;

                &>* {
                    flex-basis: 100%;
                    display: flex;
                    justify-content: space-between;
                    margin-right: 0.5em;
                    flex-grow: 1;
                }
            }
        }
    }
}

label {
    text-wrap-mode: nowrap;
    padding-right: 1em;
    padding-left: 1em;
}

.search-items {
    display: flex;
    flex-wrap: wrap;
    padding-top: 0.5em;
}
</style>