<template>
    <div style="display: flex;"
        ref="item"
        tabindex="0"
        :class="['schedule-item-details', isAMovie ? 'movie' : '']"
        @click="value ? value.expanded = !value?.expanded : void (0)">

        <TimeColumn :model-value="value"/>
        <ItemDetails :model-value="value" />
    </div>
</template>
<script setup lang="ts">
import type { ISchedule } from '../types';
import TimeColumn from './TimeColumn.vue';
import ItemDetails from './ItemDetails.vue';
import { useScheduleDetails } from '../composables/scheduleItem';
import { onKeyStroke } from '@vueuse/core';
import { ref } from 'vue';

const item = ref();
const value = defineModel<ISchedule>({ required: true });
const { goToChannel, isCurrentlyOn } = useScheduleDetails(value);
const { isAMovie } = useScheduleDetails(value);
onKeyStroke([" ", "Enter"], (e) => {
    e.stopPropagation();
    e.preventDefault();
    value.value.expanded = !value.value.expanded;
}, { target: item });

onKeyStroke(["w"], e =>
{
    if (isCurrentlyOn.value) {
        goToChannel(e);
    }
}, { target: item });

</script>
<style scoped lang="scss">
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
</style>