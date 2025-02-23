<template>
    <div style="display: flex;" :class="['schedule-item-details', isAMovie ? 'movie' : '']">
        <div class="item-time" style="">{{ formatDate(value.start_at, 'H.mm') }}<div v-if="isAMovie" class="film-image"
                title="Click to search IMDB" @click="searchImdb">
                &nbsp;</div>
        </div>
        <div class="item-details">
            <p>
                <span class="item-title">{{ value.title }}</span>
                <span v-if="isAMovie">{{ rating }}</span>
                <span v-if="isAMovie"
                    :class="['certification', 'certification-' + value.details.meta.certification]">&nbsp;</span>
            </p>
            <p v-if="isAMovie" style="">{{ value.details.meta.year }} ({{
                value.duration }} mins)
            </p>
            <p>{{ summary }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import moment from 'moment';
import { computed } from 'vue';

const props = defineProps(["value"])
const formatDate = (date: any, format: string) => moment(date).format(format);
const isAMovie = computed(() => props.value.type === "movie");
const rating = computed(() => {
    const rating = Math.round((props.value?.details?.meta?.rating ?? 0) / 2);

    return rating
        ? "★".repeat(rating) + "☆".repeat(5 - rating)
        : ""
});

const searchImdb = () => window.open(`https://www.imdb.com/find/?q=${encodeURIComponent(props.value.title)}`, "_blank")
const summary = computed(() => props.value.isMorning
    ? props.value.details.summary_short
    : props.value.details.summary_long)

</script>
<style scoped>
.movie {
    box-shadow: 1ps solid black inset;
}

.item-details>p {
    margin: 0;
    font-size: 8pt;
    display: flex;
    gap: 1em;
}

.item-title {
    font-size: 8pt;
    font-weight: 700
}

.film-image {
    background: url(../assets/film.svg) no-repeat right;
    height: 30px;
    cursor: pointer;
}

.item-time {
    min-width: 3.5em;
    background-color: #F0cEcA;
    border-right: 3px white solid;
    text-align: right;
    font-weight: 700;
    font-size: 8pt;
}

.schedule-item-details {
    font-size: 10pt
}

.certification {
    width: 2em;
    height: 2em;
    background-size: 2em 2em;
    background-repeat: no-repeat;
    filter: drop-shadow(1px 1px);
}

.certification-15 {
    background-image: url(../assets/certifications/15.svg);
}

.certification-12 {
    background-image: url(../assets/certifications/12.svg);
}

.certification-12A {
    background-image: url(../assets/certifications/12A.svg);
}

.certification-PG {
    background-image: url(../assets/certifications/PG.svg);
}

.certification-U {
    background-image: url(../assets/certifications/U.svg);
}

.certification-18 {
    background-image: url(../assets/certifications/18.svg);
}
</style>