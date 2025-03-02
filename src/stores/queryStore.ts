import { useStorage, useUrlSearchParams } from "@vueuse/core";
import moment from "moment";
import { defineStore } from "pinia";
import { type Ref } from "vue";
import { type Region, type Platform } from "../utils/api";

interface ISearchParams
{
    searchString: string
    genre: string
    type: string
    day: string,
    hideEmpty: Ref<boolean>
    platform: Ref<Platform>
    region: Ref<Region>,
    category: string,
    liveOnly: boolean
}

export const useQueryStore = defineStore("query", {
    state() {
        return useUrlSearchParams<ISearchParams>("history", {
            initialValue: {
                platform: useStorage<Platform>("platform", "popular"),
                region: useStorage<Region>("region", "yorkshire"),
                searchString: "",
                genre: "",
                type: "",
                hideEmpty: useStorage<boolean>("hideEmpty", false),
                day: moment(new Date()).format("yyyy-MM-DD"),
                category: "",
                liveOnly: false
            }            
        });
    },

})