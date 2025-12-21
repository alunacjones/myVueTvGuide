<template>
    <component :is="component" />
</template>
<script setup lang="ts">
import Christmas from './Christmas.vue';
import { computedAsync } from '@vueuse/core';
import { getSeason, Season } from '../../utils/seasonHelper';

const component = computedAsync(async () =>
{
    switch (await getSeason())
    {
        case Season.Christmas: return Christmas;
        case Season.Easter: return null;
        case Season.None: return null;
    }
},
null)
</script>