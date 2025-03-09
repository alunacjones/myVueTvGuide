import { useStorage } from "@vueuse/core";
import moment from "moment";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref, type Component, type Ref } from "vue";
import { type Region, type Platform } from "../utils/api";
import Select from "../components/queryComponents/Select.vue";
import Search from "../components/queryComponents/Search.vue";
import CheckBox from "../components/queryComponents/CheckBox.vue";
import { useListingsStore } from "./listingsStore";
import { useMyNow } from "../composables/appNow";
import { createOption, platformValues, regionValues, typeValues } from "../utils/constants";


export interface ISearchParams
{
    searchString: string
    genre: string
    type: "" | "movie" | "episode"
    day: string,
    hideEmpty: Ref<boolean>
    platform: Ref<Platform>
    region: Ref<Region>,
    category: string,
    liveOnly: boolean,
    newOnly: boolean
}

export interface ISearchDescriptor {
    key: keyof ISearchParams
    title: string
    showOnFilterBadges: boolean,
    queryComponent: Component
    values?: Ref<IdAndText[]>
}

export interface IdAndText {
    id: string,
    text: string
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
            liveOnly: false,
            newOnly: false
        };
    },
    getters: {
        platforms: () => ref(platformValues),
        regions: () => ref(regionValues),
        types: () => ref(typeValues),
        platformText(): string {
            const platform = this.platform;
            return this.platforms.value.find(p => p.id === platform)?.text ?? "";
        },
        regionText(): string {
            const region = this.region;
            return this.regions.value.find(p => p.id === region)?.text ?? "";
        },
        typeText(): string {
            const type = this.type;
            return this.types.value.find(p => p.id === type)?.text ?? "";
        }
    },
    actions: {
        clear() {
            this.searchString = "";
            this.genre = "";
            this.type = "";
            this.category = "";
            this.liveOnly = false;
            this.newOnly = false;
        },
        getDisplayText(key: keyof ISearchParams) {
            switch (key) {
                case "platform":
                    return this.platformText;
                case "region":
                    return this.regionText;
                case "type":
                    return this.typeText;
                default:
                    var value = this[key];
                    if (typeof value === "boolean") {
                        return value ? "Yes" : "No"
                    }

                    return value;
            }
        },
        getSearchParamDescriptors(): ISearchDescriptor[] {
            const today = useMyNow();
            const days = computed(() => [...Array(10).keys()].map(i => createOption(i - 1, today)));
            const { categories, genres } = storeToRefs(useListingsStore());
            return [
                { values: days, queryComponent: Select, key: "day", title: "Day", showOnFilterBadges: false },
                { values: this.platforms, queryComponent: Select, key: "platform", title: "Platform", showOnFilterBadges: true },
                { values: this.regions, queryComponent: Select, key: "region", title: "Region", showOnFilterBadges: true },
                { queryComponent: Search, key: "searchString", title: "Search", showOnFilterBadges: true },
                { values: genres, queryComponent: Select, key: "genre", title: "Genre", showOnFilterBadges: true },
                { values: this.types, queryComponent: Select, key: "type", title: "Type", showOnFilterBadges: true },                
                { values: categories, queryComponent: Select, key: "category", title: "Category", showOnFilterBadges: true },
                { queryComponent: CheckBox, key: "hideEmpty", title: "Hide empty channels?", showOnFilterBadges: false },        
                { queryComponent: CheckBox, key: "liveOnly", title: "On Now?", showOnFilterBadges: true },
                { queryComponent: CheckBox, key: "newOnly", title: "Is New?", showOnFilterBadges: true },
            ]
        }        
    }
})
