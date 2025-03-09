<template>
    <div style="display: flex;"
        :class="['schedule-item-details', isAMovie ? 'movie' : '']"
        @click="value ? value.expanded = !value?.expanded : void (0)">

        <TimeColumn :value="value"/>
        <ItemDetails :value="value" />
    </div>
</template>
<script setup lang="ts">
import type { ISchedule } from '../types';
import type { IValue } from '../types/IValue';
import TimeColumn from './TimeColumn.vue';
import ItemDetails from './ItemDetails.vue';
import { useScheduleDetails } from '../composables/scheduletem';

const props = defineProps<IValue<ISchedule>>()
const { isAMovie } = useScheduleDetails(props.value)
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