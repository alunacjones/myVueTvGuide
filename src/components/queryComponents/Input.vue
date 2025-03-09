<template>
    <input type="search" v-model="value" ref="search"/>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useHeaderStore } from '../../stores/headerStore';
import { storeToRefs } from 'pinia';

const value = defineModel<string>();
const search = ref<HTMLInputElement>(); 
const { searchElement } = storeToRefs(useHeaderStore());

onMounted(() => searchElement.value = search.value);
</script>
<style lang="scss" scoped>
</style>