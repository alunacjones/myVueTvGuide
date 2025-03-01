<template>
    <div style="display: flex;" :class="['schedule-item-details', isAMovie ? 'movie' : '']"
        @click="value.expanded = !value.expanded">
        <div class="item-time">
            <div>{{ formatDate(value.start_at, 'H.mm') }}</div>
            <div v-if="isAMovie" class="film-image" title="Click to search IMDB" @click="searchImdb">
                &nbsp;
            </div>
        </div>
        <div class="item-details">
            <p>
                <a :id="value.pa_id" class="anchor"><span :class="['item-title']">{{ value.title }}</span></a>
                <span v-if="isNew" class="badge new">NEW</span>
                <span v-if="isAMovie">{{ rating }}</span>
                <span v-if="isAMovie"
                    :class="['certification', 'certification-' + value.details.meta.certification]">&nbsp;</span>
                <span v-if="!isAMovie">{{ episode }}</span>
            </p>
            <p v-if="isAMovie">{{ value.details.meta.year }} ({{
                value.duration }} mins)
            </p>
            <p>{{ summary }}</p>
            <p class="genre">
                {{  value.details.genre }}
            </p>
            <p v-if="value.expanded" class="categories">
                <span class="badge" v-for="item in itemCategories" @click="filterCategory($event, item)">{{ item }}</span>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import moment from 'moment';
import { computed } from 'vue';
import { getImdbUrl } from '../utils/api';
import { useQueryStore } from '../stores/queryStore';
import { storeToRefs } from 'pinia';

const { category } = storeToRefs(useQueryStore());
const props = defineProps(["value"])
const formatDate = (date: any, format: string) => moment(date).format(format);
const isAMovie = computed(() => props.value.type === "movie");

const isNew = computed(() => props.value?.details?.meta?.attributes.indexOf("new") > -1);

const rating = computed(() => {
    const rating = Math.round((props.value?.details?.meta?.rating ?? 0) / 2);

    return rating
        ? "★".repeat(rating) + "☆".repeat(5 - rating)
        : ""
});

const filterCategory = (event: Event, item: string) => {
    event.stopPropagation();
    category.value = item;
}

const itemCategories = computed(() => props.value?.details?.meta?.categories);

const episode = computed(() => {
    const meta = props.value?.details.meta;
    const title = meta.episode_title ? ` (${meta.episode_title})` : "";
    const season = meta.season ? `S${meta.season}` : "";
    const episode = meta.episode ? ` E${meta.episode}` : "";

    return season && episode
        ? `${season}${episode}${title}`
        : ""
});

const searchImdb = async (e: Event) => {
    e.stopPropagation();

    window.open(
        await getImdbUrl(props.value.details.title, props.value.details.meta.year),
        "_blank",
        "noreferrer");
}

const isMorning = computed(() => {
    const hour = moment(props.value?.start_at).hour();
    return hour >= 0 && hour < 12;
});

const summary = computed(() => !isMorning.value || props.value?.expanded
    ? props.value.details.summary_long
    : props.value.details.summary_short)

</script>
<style scoped lang="scss">
.item-details {
    width: 100%;

    &>p {
        margin: 0;
        display: flex;
        gap: 1em;
    }

    .categories {
        flex-wrap: wrap;
        gap: 0.3em;
        display: flex;
    }
}

.item-title {
    font-weight: 700;

    &.subtitles::after {
        content: "ST"
    }

    &.new::after {
        content: "NEW"
    }
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
}

@mixin highlight-item {
    background-color: #0002;

    .item-time {
        background-color: var(--darker-time-background-color);
    }

    background: yellow;
}

.schedule-item-details {
    border: 0px;
    border-left: var(--film-left-border-width) solid var(--time-background-colour);
    cursor: pointer;
    user-select: none;
    font-size: 0.8em;
    line-height: 1.2em;

    &:hover,
    &.selected {
        @include highlight-item();
    }

    &:last-child {
        border-bottom-left-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
    }
}

.movie {
    border-style: solid;
    border-width: 1px;
    border-left-width: var(--film-left-border-width);
    border-left-color: black;

    &>* {
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

.anchor {
    color: black;
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

.genre {
    font-style: italic;
    font-weight: 600;
    color: gray;
}
</style>