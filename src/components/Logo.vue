<template>
    <img src="../assets/guide2.svg" v-if="!logoComponent"/>
    <component v-else :is="logoComponent" />
</template>
<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import ChristmasLogo from './seasonal/ChristmasLogo.vue';
import { getSeason, Season } from '../utils/seasonHelper'
import EasterLogo from './seasonal/EasterLogo.vue';
import NewYearLogo from './seasonal/NewYearLogo.vue';
import { useQueryStore } from '../stores/queryStore';
import { storeToRefs } from 'pinia';
const { seasonal } = storeToRefs(useQueryStore());

const logoComponent = computedAsync(
    async () => {
        if (!seasonal.value) return null;
        switch (await getSeason())
        {
            case Season.Christmas: return ChristmasLogo;
            case Season.Easter: return EasterLogo;
            case Season.NewYear: return NewYearLogo;
            default: return null;
        }
    },
    null
);
</script>