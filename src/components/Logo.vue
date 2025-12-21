<template>
    <img src="../assets/guide2.svg" v-if="!logoComponent"/>
    <component v-else :is="logoComponent" />
</template>
<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import ChristmasLogo from './seasonal/ChristmasLogo.vue';
import { getSeason, Season } from '../utils/seasonHelper'
import EasterLogo from './seasonal/EasterLogo.vue';

const logoComponent = computedAsync(
    async () => {
        switch (await getSeason())
        {
            case Season.None: return null;
            case Season.Christmas: return ChristmasLogo;
            case Season.Easter: return EasterLogo;
        }
    },
    null
);
</script>