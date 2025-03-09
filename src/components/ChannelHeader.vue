<template>
    <div class="channel-heading-container">
        <div class="channel-heading">
            <p>{{ value.title }}</p>
            <a target="_blank" :href="value.channelUrl"><img :src="value.logo_url.replace('https:', 'https:')" /></a>
        </div>
    </div>    
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { type IListing } from '../types';
import { useHeaderStore } from '../stores/headerStore';
import { computed } from 'vue';

const value = defineModel<IListing>({ required: true });
const { dayTitleHeight } = storeToRefs(useHeaderStore())
const dayTitleHeightPx = computed(() => `${dayTitleHeight.value}px`)
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

        & img {
            border: 1px solid white;
            border-radius: var(--border-radius);
            height: 1.8em;
        }
    }
}
</style>