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
    platform: Ref<string>
    region: Ref<string>
}

export const useQueryStore = defineStore("query", {
    state() {
        return useUrlSearchParams<ISearchParams>("history", {
            initialValue: {
                platform: useStorage("platform", "popular"),
                region: useStorage("region", "yorkshire"),
                searchString: "",
                genre: "",
                type: "",
                hideEmpty: useStorage<boolean>("hideEmpty", false),
                day: moment(new Date()).format("yyyy-MM-DD")
            }            
        });
    },

})