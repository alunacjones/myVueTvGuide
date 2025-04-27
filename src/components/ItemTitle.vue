<template>
    <div class="item-title">
        <a :id="model?.pa_id" class="anchor"><span>{{ model.title }}</span></a>
        <span v-if="isAMovie" class="rating">{{ rating }}</span>
        <FilmCertification :model-value="certification" />
        <span v-if="!isAMovie">{{ episode }}</span>
    </div>
</template>
<script lang="ts" setup>
import { type ISchedule } from '../types';
import { useScheduleDetails } from '../composables/scheduleItem';
import FilmCertification from './FilmCertification.vue';

const model = defineModel<ISchedule>({ required: true })
const { isAMovie, rating, episode, certification } = useScheduleDetails(model);
</script>
<style lang="scss" scoped>
.item-title {
    display: flex;
    gap: 1em;
    font-weight: normal;
    padding-right: 0.5em;

    .anchor {
        color: black;
        font-weight: bold;
    }

    .rating {
        font-size: 1.6em;
    }
}
</style>