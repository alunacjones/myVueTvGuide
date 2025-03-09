<template>
    <div class="item-details">
        <p>
            <a :id="value?.pa_id" class="anchor"><span :class="['item-title']">{{ value?.title }}</span></a>
            <span v-if="isAMovie">{{ rating }}</span>
            <span v-if="isAMovie" :class="['certification', 'certification-' + meta?.certification]">&nbsp;</span>
            <span v-if="!isAMovie">{{ episode }}</span>
        </p>
        <p v-if="isAMovie">
            {{ value?.details.meta.year }}
        </p>
        <p>{{ summary }}</p>
        <p class="genre">
            {{ genreInfo }}
        </p>
        <Categories :value="value" />
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { type ISchedule } from '../types';
import { type IValue } from '../types/IValue';
import moment from 'moment';
import Categories from './Categories.vue';


const props = defineProps<IValue<ISchedule>>();
const meta = computed(() => props.value?.details?.meta);
const isAMovie = computed(() => props.value?.type === "movie");
const isMorning = computed(() => {
    const hour = moment(props.value?.start_at).hour();
    return hour >= 0 && hour < 12;
});

const summary = computed(() => !isMorning.value || props.value?.expanded
    ? props.value?.details.summary_long
    : props.value?.details.summary_short);

const rating = computed(() => {
    const rating = Math.round((meta.value?.rating ?? 0) / 2);

    return rating
        ? "★".repeat(rating) + "☆".repeat(5 - rating)
        : ""
});

const genreInfo = computed(() => {
    const duration = props.value?.duration ? ` (${props.value?.duration} mins)` : "";
    return `${props.value?.details?.genre}${duration}`;
});

const episode = computed(() => {
    const meta = props.value?.details.meta;
    const title = meta?.episode_title ? ` (${meta.episode_title})` : "";
    const season = meta?.season ? `S${meta.season}` : "";
    const episode = meta?.episode ? ` E${meta.episode}` : "";

    return season && episode
        ? `${season}${episode}${title}`
        : ""
});

</script>
<style lang="scss" scoped>
.item-details {
    width: 100%;

    &>p {
        margin: 0;
        display: flex;
        gap: 1em;
    }
}

.item-title {
    font-weight: 700;
}

.anchor {
    color: black;
}

.genre {
    font-style: italic;
    font-weight: 600;
    color: gray;
}
</style>