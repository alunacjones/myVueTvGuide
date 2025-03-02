<template>
    <div class="channel" style="align-self: stretch">
        <div class="channel-heading-container">
            <div class="channel-heading">
                <p>{{ channelName }}</p>
                <a target="_blank" :href="value.channelUrl"><img :src="value.logo_url.replace('https:', 'https:')" style="height: 30px" /></a>
            </div>
        </div>
        <div class="channel-schedules">
            <ScheduleItem v-for="item in value.schedules" :value="item" />
        </div>
    </div>

</template>
<script setup lang="ts">
import type { IListing } from '../types';
import type { IValue } from '../types/IValue';
import ScheduleItem from './ScheduleItem.vue';
import { computed, provide } from 'vue';

const props = defineProps<IValue<IListing>>()
provide("channelUrl", props.value.channelUrl)
const maps: any = {
    "BBC One London": "BBC1",
    "BBC Two HD": "BBC2",
    "ITV1 London": "ITV1",
    "Channel 4 HD": "Channel 4",
    "Channel 5 HD": "Channel 5",
    "BBC Three HD": "BBC3",
    "BBC Four HD": "BBC4"
}
const channelName = computed(() => {
    return maps[(props.value.title as string)] ?? props.value.title
})
</script>
<style lang="scss" scoped>
.channel-heading-container {
    position: sticky;
    top: 46px;
    z-index: 100;

    .channel-heading {
        font-weight: 700;
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