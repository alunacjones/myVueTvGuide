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
import { computed, inject } from 'vue';
import { useMyNow } from '../composables/appNow';
import type { ISchedule } from '../types';
import type { IValue } from '../types/IValue';
import { getImdbUrl } from '../utils/api';
import Toastify from 'toastify-js';

const props = defineProps<IValue<ISchedule>>()
const now = useMyNow();
const meta = computed(() => props.value?.details?.meta);
const attributes = computed(() => meta.value?.attributes ?? [])

const start = computed(() => moment(props.value?.start_at));
const end = computed(() => moment(props.value?.end_at));
const formatDate = (date: any, format: string) => moment(date).format(format);
const isAMovie = computed(() => props.value?.type === "movie");
const isNew = computed(() => attributes.value.includes("new"));
const isCurrentlyOn = computed(() => moment(now.value).isBetween(start.value, end.value));
const channelUrl = inject<string>("channelUrl")

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
</style>