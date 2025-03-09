<template>
    <div class="channel" style="align-self: stretch">
        <div class="channel-heading-container">
            <div class="channel-heading">
                <p>{{ channelName }}</p>
                <a target="_blank" :href="value.channelUrl"><img :src="value.logo_url.replace('https:', 'https:')" style="height: 30px" /></a>
            </div>
        </div>
        <div class="channel-schedules">
            <ScheduleItem v-for="item in value.schedules" :model-value="item" />
        </div>
    </div>

</template>
<script setup lang="ts">
import { type IListing } from '../types';
import ScheduleItem from './ScheduleItem.vue';
import { computed, provide } from 'vue';
import { useHeaderStore } from '../stores/headerStore';
import { storeToRefs } from 'pinia';

const { dayTitleHeight } = storeToRefs(useHeaderStore())
const value = defineModel<IListing>({ required: true });

const dayTitleHeightPx = computed(() => `${dayTitleHeight.value}px`)
provide("channelUrl", value.value.channelUrl)

const channelName = computed(() => value.value?.title)
</script>
<style lang="scss" scoped>
.channel-heading-container {
    position: sticky;
    top: v-bind(dayTitleHeightPx);
    z-index: 100;

    .channel-heading {
        font-weight: bold;
        background-color: red;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: white;
        border-radius: var(--border-radius) var(--border-radius) 0px 0px;
        text-transform: uppercase;
        font-size: 1em;
        border-bottom: white 1px solid;

        &>* {
            padding: 0px 0em;
            margin: 4pt;
        }

        &>p {
            align-self: flex-start;
        }

        &>img {
            border: 1px solid white;
        }
    }
}

.channel {
    page-break-after: always;
}

.channel-schedules {
    background: var(--channel-background);
    border-radius: 0px 0px var(--border-radius) var(--border-radius);
    padding-right: 3px;
}
</style>