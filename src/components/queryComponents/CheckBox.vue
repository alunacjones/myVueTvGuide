<template>
    <input type="checkbox" v-model="value"/>
</template>
<script lang="ts" setup>
const value = defineModel<boolean>()
</script>
<style lang="scss" scoped>
</style>