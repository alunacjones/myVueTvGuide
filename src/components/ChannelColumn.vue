<template>
    <div class="channel-column">
        <div style="">
            <Channel :value="value" />
        </div>
    </div>
</template>
<script setup lang="ts">
import Channel from './Channel.vue';
defineProps({
    "value": {
        type: Object
    }
})
</script>
<style lang="css" scoped>
.channel-column {
    gap: 0.5em;
    flex: 1;
    min-width: 25%;
}
@media screen and (min-width: 100px) and (max-width: 600px) {
    .channel-column {
        min-width: 100%;
    }
}
</style>