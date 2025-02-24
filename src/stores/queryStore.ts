import { useStorage, useUrlSearchParams } from "@vueuse/core";
import moment from "moment";
import { defineStore } from "pinia";

interface ISearchParams
{
    searchString: string
    genre: string
    type: string
    day: string,
    hideEmpty: boolean
}

export const useQueryStore = defineStore("query", {
    state() {
        return useUrlSearchParams<ISearchParams>("history", {
            initialValue: {
                searchString: "",
                genre: "",
                type: "",
                hideEmpty: useStorage<boolean>("hideEmpty", false).value,
                day: moment(new Date()).format("yyyy-MM-DD")
            }
        });
    }
})