<template>
    <div ref="header" class="header">
        <div class="header-items">
            <div class="logo">
                <Logo />
                <button class="button" @click="clear">Reset</button>
            </div>

            <div class="search-items">
                <QueryControl v-for="item in queryDescriptors" :key="item.key" :model-value="item" />
            </div>
        </div>
        <Seasonal v-if="queryOptions.seasonal"/>        
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Logo from './Logo.vue';
import { useQueryStore } from '../stores/queryStore';
import { onMounted, ref, useTemplateRef, watchEffect } from 'vue';
import { useListingsStore } from "../stores/listingsStore"
import { useIntersectionObserver } from '@vueuse/core';
import { useLoading } from '../stores/loadingStore';
import { useHeaderStore } from '../stores/headerStore';
import QueryControl from './QueryControl.vue';
import Seasonal from './seasonal/Seasonal.vue';

const { isVisible } = storeToRefs(useHeaderStore());
const { isLoading } = storeToRefs(useLoading())

const header = useTemplateRef<HTMLDivElement>("header")
const queryOptions = useQueryStore();
const queryDescriptors = queryOptions.getSearchParamDescriptors();
const { clear } = useQueryStore();

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
    background-color: var(--heading-background-color);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    flex-wrap: wrap;
    padding: 0.5em 0;

    .button {
        height: 1.5em;
        padding: 2px 5px;
        font-size: 1em;
        border: 1px solid black;
    }

    .logo {
        display: flex;
        margin: 0.5em 1em;
        align-items: center;
        gap: 0.5em;

        &>img {
            width: var(--logo-size);
            height: var(--logo-size);
        }
    }

    .header-items {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: var(--heading-text-color);

        & .search-items {
            display: flex;
            flex-wrap: wrap;
            gap: 1em;
            gap: 0.3em 1em;
        }

        &>span {
            color: var(--heading-text-color);
            font-size: 2rem;
            font-weight: bold;
            vertical-align: middle;
            align-content: center;

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
        .header-items {
            flex-direction: column;

            &>div {
                border-left: 0px;
                padding-left: 0em;
                gap: 0.5em;
            }

            .search-items {
                display: flex;
                flex-direction: row;
                align-items: center;
                align-content: center;
                flex-grow: 1;
                padding: 0 0.5em;

                &>* {
                    flex-basis: 100%;
                    display: flex;
                    margin-right: 0.5em;
                    flex-grow: 1;
                }
            }
        }
    }
}
</style>