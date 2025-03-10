<template>
    <div class="day-title" ref="dayTitle">
        <FilterBadges />
        <div class="top">
            <span class="top-date">{{ date }}</span>
            <span class="top-day">{{ day }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import moment from 'moment';
import { useQueryStore } from '../stores/queryStore';
import { computed, useTemplateRef, watchEffect } from 'vue';
import { useElementSize } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useHeaderStore } from '../stores/headerStore';
import FilterBadges from './FilterBadges.vue';

const { dayTitleHeight } = storeToRefs(useHeaderStore());
const dayTitle = useTemplateRef<HTMLDivElement>("dayTitle");
const size = useElementSize(dayTitle);
watchEffect(() => dayTitleHeight.value = size.height.value)

const queryOptions = useQueryStore();
const day = computed(() => moment(queryOptions.day).format("dddd"))
const date = computed(() => moment(queryOptions.day).format("Do MMMM"))
</script>
<style lang="scss" scoped>
.top {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0em 2em;
    text-align: right;
    padding: 0.3em 0.3em 0.3em 0.3em;
    color: white;
    font-weight: bold;
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
    outline: 2px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 200;
    background-color: purple;
}
</style>