<template>
    <div class="birthday">
    <img src="../../assets/birthday.png" style="width: 80px;"/>
    <span class="name">{{ birthday }}</span>
    </div>
</template>
<script setup lang="ts">
import moment from 'moment';
import { getBirthday } from '../../utils/seasonHelper';
const birthday = getBirthday(moment())?.name;
</script>
<style scoped lang="scss">
.birthday {
    display: flex;
    flex-direction: column;
    align-items: center;

    .name {
        cursor: pointer;
        color: yellow;
        font-weight: bold;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        transition: transform 0.3s;

        &:hover {
            transform: scale(2);
        }
    }
}
</style>