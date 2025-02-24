import { defineStore } from "pinia";
import { getListings } from "../utils/api";

export const useListingsStore = defineStore("listings", {
    state() {
        return {
            listings: [] as any[],
            genres: [] as string[]
        }
    },
    actions: {
        async fetchListings(date: Date) {
            this.listings = await getListings(date);
            (<any>window).listings = this.listings;
            var genres = this.listings.flatMap(s => s.schedules)
                .reduce((agg, i) =>
                {
    
                    if (agg.indexOf(i.details.genre) === -1)
                    {
                        agg.push(i.details.genre);                        
                    }

                    return agg;
                },
                []);

            genres.sort();
            this.genres = genres;
            // console.log(this.listings
        }
    }
});