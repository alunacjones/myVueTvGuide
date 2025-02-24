import { useStorage } from "@vueuse/core";
import moment from "moment";
import { defineStore } from "pinia";

export const useQueryStore = defineStore("query", {
    state() {
        return { 
            searchString: "",
            type: "",
            day: moment(new Date()).format("yyyy-MM-DD"),
            genre: "",
            hideEmpty: useStorage<boolean>("hideEmpty", false)
        }
    }
})