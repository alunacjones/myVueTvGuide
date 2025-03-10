<template>
    <div>
        <label :for="id">{{ model.title }}</label>
        <component :is="model.queryComponent" v-model="queryOptions[model.key]" :search-descriptor="model" :id="id"></component>
    </div>
</template>
<script lang="ts" setup>
import { useQueryStore, type ISearchDescriptor } from '../stores/queryStore';
import { useId } from "vue"

const id = useId();
const model = defineModel<ISearchDescriptor>({ required: true })
const queryOptions = useQueryStore();
</script>
<style lang="scss" scoped>
.label {

}
</style>