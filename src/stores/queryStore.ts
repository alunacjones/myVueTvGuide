import { useStorage, useUrlSearchParams } from "@vueuse/core";
import moment from "moment";
import { defineStore } from "pinia";
import type { Ref } from "vue";

interface ISearchParams
{
    searchString: string
    genre: string
    type: string
    day: string,
    hideEmpty: Ref<boolean>
}

export const useQueryStore = defineStore("query", {
    state() {
        return useUrlSearchParams<ISearchParams>("history", {
            initialValue: {
                searchString: "",
                genre: "",
                type: "",
                hideEmpty: useStorage<boolean>("hideEmpty", false),
                day: moment(new Date()).format("yyyy-MM-DD")
            }            
        });
    },

})