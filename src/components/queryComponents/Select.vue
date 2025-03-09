<template>
    <select v-model="value">        
        <option v-for="item in values" :value="item.id">{{ item.text }}</option>        
    </select>    
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { type IdAndText } from '../../stores/queryStore';
import type { IQueryComponent } from '../../types/QueryComponent';

const value = defineModel<string>();
const props = defineProps<IQueryComponent>();
const values = computed<IdAndText[]>(() => props.searchDescriptor.values?.value ?? [])
</script>
<style lang="scss" scoped>
</style>