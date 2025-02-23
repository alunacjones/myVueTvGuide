import { defineStore } from "pinia";

export const useLoading = defineStore("loading", {
    state() {
        return {
            isLoading: false
        }
    },
})