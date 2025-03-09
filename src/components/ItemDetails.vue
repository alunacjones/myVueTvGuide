<template>
    <div class="item-details">
        <p>
            <a :id="value?.pa_id" class="anchor"><span :class="['item-title']">{{ value?.title }}</span></a>
            <span v-if="isAMovie">{{ rating }}</span>
            <FilmCertification :model-value="meta?.certification"/>
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
import { toRef } from 'vue';
import { useScheduleDetails } from '../composables/scheduleItem';
import { type ISchedule } from '../types';
import { type IValue } from '../types/IValue';
import Categories from './Categories.vue';
import FilmCertification from './FilmCertification.vue';

const props = defineProps<IValue<ISchedule>>();
const { episode, genreInfo, isAMovie, meta, rating, summary } = useScheduleDetails(toRef(props.value));
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