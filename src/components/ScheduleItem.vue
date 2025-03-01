<template>
    <div style="display: flex;" :class="['schedule-item-details', isAMovie ? 'movie' : '']">
        <div class="item-time" style="">
            <div>{{ formatDate(value.start_at, 'H.mm') }}</div>
            <div v-if="isAMovie" class="film-image" title="Click to search IMDB" @click="searchImdb">
                &nbsp;
            </div>
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
import { getImdbUrl } from '../utils/api';

const props = defineProps(["value"])
const formatDate = (date: any, format: string) => moment(date).format(format);
const isAMovie = computed(() => props.value.type === "movie");
const rating = computed(() => {
    const rating = Math.round((props.value?.details?.meta?.rating ?? 0) / 2);

    return rating
        ? "★".repeat(rating) + "☆".repeat(5 - rating)
        : ""
});

const searchImdb = async () => {
    window.open(
        await getImdbUrl(props.value.details.title, props.value.details.meta.year),
        "_blank",
        "noreferrer");
}
const summary = computed(() => props.value.isMorning
    ? props.value.details.summary_short
    : props.value.details.summary_long)

</script>
<style scoped lang="scss">
.item-details {
    width: 100%;

    &>p {
        margin: 0;
        font-size: 8pt;
        display: flex;
        gap: 1em;
    }
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
    background-color: var(--time-background-colour);
    border-right: 3px white solid;
    text-align: right;
    font-weight: 700;
    font-size: 8pt;
}

.schedule-item-details {
    font-size: 10pt;
    border: 0px;
    border-left: var(--film-left-border-width) solid var(--time-background-colour);

    &:last-child {
        border-bottom-left-radius: 10px;

        .item-time {
            border-radius: 0 0 0 0.5em;
        }
    }
}

.movie {
    border-style: solid;
    border-width: 1px;
    border-left-width: var(--film-left-border-width);
    border-left-color: black;
    
    & > * {
        padding-top: 2px;
        padding-bottom: 2px;
    }

    &+.movie {
        margin-top: 1px;
    }
}

.certification {
    width: 2rem;
    height: 1.5rem;
    background-size: 1.5rem 1.5rem;
    background-repeat: no-repeat;
    filter: drop-shadow(1px 1px);

    &.certification-15 {
        background-image: url(../assets/certifications/15.svg);
    }

    &.certification-12 {
        background-image: url(../assets/certifications/12.svg);
    }

    &.certification-12A {
        background-image: url(../assets/certifications/12A.svg);
    }

    &.certification-PG {
        background-image: url(../assets/certifications/PG.svg);
    }

    &.certification-U {
        background-image: url(../assets/certifications/U.svg);
    }

    &.certification-18 {
        background-image: url(../assets/certifications/18.svg);
    }
}
</style>