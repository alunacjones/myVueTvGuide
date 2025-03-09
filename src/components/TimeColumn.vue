<template>
    <div class="item-time">
        <div>{{ time }}</div>
        <div v-if="isAMovie" class="film-image" title="Click to search IMDB" @click="searchImdb">
            &nbsp;
        </div>
        <div v-if="isNew" class="badge new">NEW</div>
        <div v-if="isCurrentlyOn" class="badge live" @click="goToChannel">LIVE</div>
    </div>
</template>
<script lang="ts" setup>
import type { ISchedule } from '../types';
import { getImdbUrl } from '../utils/api';
import { useScheduleDetails } from '../composables/scheduleItem';
import { openWindow } from '../utils/windowOpener';

const value = defineModel<ISchedule>({ required: true });
const { time, isAMovie, goToChannel, isCurrentlyOn, isNew } = useScheduleDetails(value)

const searchImdb = async (e: Event) => {
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

.badge {
    background-color: grey;
    color: white;
    font-weight: bold;
    padding: 0.2em 0.3em;
    height: fit-content;
    border-radius: 0.5em;
}

.new {
    background-color: red;
}

@keyframes liveAnimation {
    0% {
        color: transparent;
    }

    50% {
        color: #ffdd00d0;
    }

    100% {
        color: transparent;
    }
}

.live {
    background-color: green;
}

.live::before {
    content: '●';
    font-size: 1.5em;
    line-height: 0.5em;
    animation: liveAnimation 1s infinite ease-in-out;
}
</style>