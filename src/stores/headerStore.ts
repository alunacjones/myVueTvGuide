import { defineStore } from "pinia";

export const useHeaderStore = defineStore("header", {
    state() {
        return {
            isVisible: true,
            dayTitleHeight: 46 
        }
    }
})