import { defineStore } from "pinia";
import { getListings } from "../utils/api";

export const useListingsStore = defineStore("listings", {
    state() {
        return {
            listings: [] as any[]
        }
    },
    actions: {
        async fetchListings(date: Date) {
            this.listings = await getListings(date)
        }
    }
});