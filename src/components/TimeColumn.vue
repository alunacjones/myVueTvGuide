<template>
    <div class="item-time">
        <div>{{ formatDate(value?.start_at, 'H.mm') }}</div>
        <div v-if="isAMovie" class="film-image" title="Click to search IMDB" @click="searchImdb">
            &nbsp;
        </div>
        <div v-if="isNew" class="badge new">NEW</div>
        <div v-if="isCurrentlyOn" class="badge live" @click="gotoChannel">LIVE</div>
    </div>
</template>
<script lang="ts" setup>
import moment from 'moment';
import type { ISchedule } from '../types';
import type { IValue } from '../types/IValue';
import { getImdbUrl } from '../utils/api';
import Toastify from 'toastify-js';
import { useScheduleDetails } from '../composables/scheduleItem';
import { toRef } from 'vue';

const props = defineProps<IValue<ISchedule>>()

const formatDate = (date: any, format: string) => moment(date).format(format);
const { isAMovie, channelUrl, isCurrentlyOn, isNew } = useScheduleDetails(toRef(props.value))

const gotoChannel = (e: Event) => {
    e.stopPropagation();

    if (channelUrl) {
        window.open(channelUrl, "_blank", "noreferrer")
        return;
    }

    Toastify({
        text: "Sorry, we don't know how to find that channel",
        position: "center"
    }).showToast();
};

const searchImdb = async (e: Event) => {
    e.stopPropagation();

    window.open(
        await getImdbUrl(props.value?.details.title ?? "", props.value?.details.meta.year ?? 0),
        "_blank",
        "noreferrer");
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
    font-weight: 700;
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    padding-left: 1px;
}

.badge {
    background-color: grey;
    color: white;
    font-weight: 700;
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