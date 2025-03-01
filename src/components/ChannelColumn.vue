<template>
    <div v-if="shouldShow" class="channel-column">
        <div>
            <Channel :value="value" />
        </div>
    </div>
</template>
<script setup lang="ts">
import Channel from './Channel.vue';
import { useQueryStore } from '../stores/queryStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { hideEmpty } = storeToRefs(useQueryStore())

const props = defineProps({
    "value": {
        type: Object
    }
})

const shouldShow = computed(() => !hideEmpty.value || (props.value?.schedules?.length ?? 0) > 0)
</script>
<style lang="css" scoped>
.channel-column {
    gap: 0.5em;
    flex: 1;
    min-width: 20%;
}

@media screen and (min-width: 100px) and (max-width: 800px) {
    .channel-column {
        min-width: 100%;
    }
}

@media screen and (min-width: 801px) and (max-width: 1200px) {
    .channel-column {
        min-width: 30%;
    }
}

@media print {
    .channel-column {
        min-width: 25%;
    }
}
</style>