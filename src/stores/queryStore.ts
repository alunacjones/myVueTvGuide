import { useStorage } from "@vueuse/core";
import moment from "moment";
import { defineStore } from "pinia";
import { type Ref } from "vue";
import { type Region, type Platform } from "../utils/api";

export interface ISearchParams
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
    state(): ISearchParams {
        return {
            platform: useStorage<Platform>("platform", "popular"),
            region: useStorage<Region>("region", "yorkshire"),
            searchString: "",
            genre: "",
            type: "",
            hideEmpty: useStorage<boolean>("hideEmpty", false),
            day: moment(new Date()).format("yyyy-MM-DD"),
            category: "",
            liveOnly: false         
        };
    },
    getters: {
        platforms() {
            return [
                { "id": "popular", "text": "Popular" },
                { "id": "freeview", "text": "Freeview" },
                { "id": "virgin", "text": "Virgin" }
            ]
        },
        regions() {
            return [
                { "id": "yorkshire", "text": "Yorkshire" },
                { "id": "north-west", "text": "North West" },
                { "id": "wales", "text": "Wales" }
            ]            
        },
        types() {
            return [
                { "id": "movie", "text": "Films" },
                { "id": "episode", "text": "Series" }
            ]            
        },
        platformText(): string {
            const platform = this.platform;
            return this.platforms.find(p => p.id === platform)?.text ?? "";
        },
        regionText(): string {
            const region = this.region;
            return this.regions.find(p => p.id === region)?.text ?? "";
        },
        typeText(): string {
            const type = this.type;
            return this.types.find(p => p.id === type)?.text ?? "";
        }        
    }
})