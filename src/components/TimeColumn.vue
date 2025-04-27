<template>
    <div class="item-time">
        <div>{{ time }}</div>
        <div v-if="isAMovie" class="film-image" title="Click to search IMDB" @click="searchImdb">
            &nbsp;
        </div>
        <RedChip v-if="isNew" class="new" text="NEW" />
        <LiveChip v-if="isCurrentlyOn" class="live" text="LIVE" @click="goToChannel"/>
    </div>
</template>
<script lang="ts" setup>
import type { ISchedule } from '../types';
import { getImdbUrl } from '../utils/api';
import { useScheduleDetails } from '../composables/scheduleItem';
import { openWindow } from '../utils/windowOpener';
import LiveChip from './LiveChip.vue';
import RedChip from './RedChip.vue';

const value = defineModel<ISchedule>({ required: true });
const { time, isAMovie, goToChannel, isCurrentlyOn, isNew } = useScheduleDetails(value)

const searchImdb = async (e: Event) => {
    e.stopPropagation();
    openWindow(await getImdbUrl(value.value.details.title ?? "", value.value?.details.meta.year ?? 0));
}
</script>
<style lang="scss" scoped>
.film-image {
    background: url(../assets/film.svg) no-repeat right;
    height: 30px;
    cursor: pointer;
}

.item-time {
    min-width: 3.5em;
    background-color: var(--time-background-colour);
    border-right: 3px white solid;
    text-align: right;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    padding-left: 1px;    
}
</style>