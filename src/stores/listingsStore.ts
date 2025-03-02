import { defineStore } from "pinia";
import { getListings } from "../utils/api";
import { type IListing } from "../types";

export const useListingsStore = defineStore("listings", {
    state() {
        return {
            listings: [] as IListing[],
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
                { genres: [] as string[], categories: [] as string[] });

            genres.sort();
            categories.sort();
            
            this.listings.forEach(l =>
            {
                l.channelUrl = mapChannelSlugToUrl(l.slug);
            })

            this.genres = genres;
            this.categories = categories;
        }
    }
});

const mappings = [
    { "match": "bbc-one", "url": "https://www.bbc.co.uk/iplayer/live/bbcone" },
    { "match": "bbc-two", "url": "https://www.bbc.co.uk/iplayer/live/bbctwo" },
    { "match": "bbc-three", "url": "https://www.bbc.co.uk/iplayer/live/bbcthree" },
    { "match": "bbc-four", "url": "https://www.bbc.co.uk/iplayer/live/bbcfour" },
    { "match": "itv1", "url": "https://www.itv.com/watch?channel=itv" },
    { "match": "itv2", "url": "https://www.itv.com/watch?channel=itv2" },
    { "match": "itv3", "url": "https://www.itv.com/watch?channel=itv3" },
    { "match": "itv4", "url": "https://www.itv.com/watch?channel=itv4" },
    { "match": "itvbe", "url": "https://www.itv.com/watch?channel=itvbe" },
    { "match": "channel-4", "url": "https://www.channel4.com/now/C4" },
    { "match": "channel-5", "url": "https://www.channel5.com/channels/channel-5" },    
    { "match": "5usa", "url": "https://www.channel5.com/channels/5usa" },
    { "match": "film4", "url": "https://www.channel4.com/now/f4" },
    { "match": "more4", "url": "https://www.channel4.com/now/m4" },
    { "match": "e4", "url": "https://www.channel4.com/now/e4" },
    { "match": "u-and-dave", "url": "https://u.co.uk/tv-guide/dave" },
    { "match": "u-and-drama", "url": "https://u.co.uk/tv-guide/drama" }
]
.map(i => {
    var regex = new RegExp(i.match);

    return { 
        matcher: (slug: string) => !!regex.exec(slug),
        url: i.url
    };
});

const mapChannelSlugToUrl = (slug: string) => mappings.find(m => m.matcher(slug))?.url;