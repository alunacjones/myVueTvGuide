<template>
    <div class="channel">
        <ChannelHeader :model-value="value" />
        <div class="channel-schedules">
            <ScheduleItem v-for="item in value.schedules" :model-value="item" />
        </div>
    </div>

</template>
<script setup lang="ts">
import { type IListing } from '../types';
import ScheduleItem from './ScheduleItem.vue';
import { provide } from 'vue';
import ChannelHeader from './ChannelHeader.vue';

const value = defineModel<IListing>({ required: true });

provide("channelUrl", value.value.channelUrl)
</script>
<style lang="scss" scoped>
.channel {
    page-break-after: always;
    align-self: stretch;
}

.channel-schedules {
    background: var(--channel-background);
    border-radius: 0px 0px var(--border-radius) var(--border-radius);
    padding-right: 3px;
}
</style>