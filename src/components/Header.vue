<template>
    <div ref="header" class="header">
        <div class="header-items">
            <img src="../assets/guide.svg" style="width: 60px; height: 60px" />
            <div class="search-items">
                <QueryControl v-for="item in queryDescriptors" :key="item.key" :model-value="item"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQueryStore } from '../stores/queryStore';
import { useTemplateRef, watchEffect } from 'vue';
import { useListingsStore } from "../stores/listingsStore"
import { useIntersectionObserver } from '@vueuse/core';
import { useLoading } from '../stores/loadingStore';
import { useHeaderStore } from '../stores/headerStore';
import QueryControl from './QueryControl.vue';

const { isVisible } = storeToRefs(useHeaderStore());
const { isLoading } = storeToRefs(useLoading())

const header = useTemplateRef<HTMLDivElement>("header")
const queryOptions = useQueryStore();
const queryDescriptors = queryOptions.getSearchParamDescriptors();

const {
    day,
    genre,
    platform,
    region,
} = storeToRefs(useQueryStore());

const listingsStore = useListingsStore();
const { genres } = storeToRefs(useListingsStore());

useIntersectionObserver(header, ([entry], _) => isVisible.value = entry.isIntersecting);

watchEffect(async () => {
    isLoading.value = true;
    await listingsStore.fetchListings(new Date(day?.value), platform.value, region.value).finally(() => isLoading.value = false);
    if (!genres.value.find(g => g.id === genre.value)) {
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
            font-weight: bold;
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
            font-weight: bold;
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

.checkbox-container {
    box-shadow: 0 3px 3px -2px white;
    margin: 0em 1em;
}
</style>