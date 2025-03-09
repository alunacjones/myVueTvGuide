<template>
    <input type="search" v-model="value" ref="search"/>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useHeaderStore } from '../../stores/headerStore';
import { storeToRefs } from 'pinia';
import { useMagicKeys } from '@vueuse/core';
import { useQueryStore } from '../../stores/queryStore';

const value = defineModel<string>();
const search = ref<HTMLInputElement>(); 
const { Escape } = useMagicKeys();
const { searchString } = storeToRefs(useQueryStore());
watch(Escape, (selected: boolean) => {
    if (selected && search.value) {
        searchString.value = "";
    }
});

const { searchElement } = storeToRefs(useHeaderStore());

onMounted(() => searchElement.value = search.value);
</script>
<style lang="scss" scoped>
</style>