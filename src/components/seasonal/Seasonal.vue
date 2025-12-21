<template>
    <component :is="component" />
</template>
<script setup lang="ts">
import Christmas from './Christmas.vue';
import { computedAsync } from '@vueuse/core';
import { getSeason, Season } from '../../utils/seasonHelper';
import NewYear from './NewYear.vue';

const component = computedAsync(async () =>
{
    switch (await getSeason())
    {
        case Season.Christmas: return Christmas;
        case Season.NewYear: return NewYear;
        default: return null;
    }
},
null)
</script>