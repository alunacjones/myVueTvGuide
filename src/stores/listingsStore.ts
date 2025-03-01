import { defineStore } from "pinia";
import { getListings } from "../utils/api";

export const useListingsStore = defineStore("listings", {
    state() {
        return {
            listings: [] as any[],
            genres: [] as string[],
            categories: [] as string[]
        }
    },
    actions: {
        async fetchListings(date: Date, platform: string, region: string) {
            this.listings = await getListings(date, platform, region);
            
            var { genres, categories } = this.listings.flatMap(s => s.schedules)
                .reduce((agg, i) =>
                {
    
                    if (agg.genres.indexOf(i.details.genre) === -1)
                    {
                        agg.genres.push(i.details.genre);                        
                    }
                    
                    i.details.meta?.categories?.forEach((c: string) =>
                    {
                        if (!agg.categories.includes(c)) {
                            agg.categories.push(c);
                        }
                    });

                    return agg;
                },
                { genres: [], categories: [] });

            genres.sort();
            categories.sort();

            this.genres = genres;
            this.categories = categories;
        }
    }
});