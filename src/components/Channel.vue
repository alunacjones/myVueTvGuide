<template>
    <div class="channel" style="align-self: stretch">
        <div class="channel-heading-container">
            <div class="channel-heading">
                <p>{{ channelName }}</p>
                <img :src="value.logo_url" style="height: 30px" />
            </div>
        </div>
        <div class="channel-schedules">
            <ScheduleItem v-for="item in value.schedules" :value="item" />
        </div>
    </div>

</template>
<script setup lang="ts">
import ScheduleItem from './ScheduleItem.vue';
import { computed } from 'vue';

const props = defineProps(["value"])
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
<style lang="css" scoped>
.channel-heading-container {
    position: sticky;
    top: 0;
    z-index: 100;
}

.channel-heading {
    font-weight: 700;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    border-radius: 5px 5px 0px 0px;
    text-transform: uppercase;
    font-size: 12pt;
    border-bottom: white 1px solid;
}

.channel-heading>* {
    padding: 0px 0em;
    margin: 4pt;
}

.channel-heading>p {
    align-self: flex-start;
}

.channel-heading>img {
    border: 1px solid white;
}

.channel {
    page-break-after: always;
}

.channel-schedules {
    background: linear-gradient(#dfdf8e 0%, lightyellow 95%, white 100%);
    border-radius: 0px 0px 0.5rem 0.5rem;
    padding-right: 3px;
}
</style>