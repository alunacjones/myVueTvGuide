import { defineStore } from "pinia";
import { getListings, type Platform, type Region } from "../utils/api";
import { type IListing } from "../types";
import type { IdAndText } from "./queryStore";

export const useListingsStore = defineStore("listings", {
    state() {
        return {
            listings: [] as IListing[],
            genres: [] as IdAndText[],
            categories: [] as IdAndText[]
        }
    },
    actions: {
        async fetchListings(date: Date, platform: Platform, region: Region) {
            this.listings = await getListings(date, platform, region);
            
            const make = (text: string, value?: string): IdAndText => ({ id: value ?? text, text });
            const prependAll = (array: IdAndText[]) => array.unshift(make("All", ""));

            var { genres, categories } = this.listings.flatMap(s => s.schedules)
                .reduce((agg, i) =>
                {
                    if (!agg.genres.find(g => g.id === i.details.genre))
                    {
                        agg.genres.push(make(i.details.genre));
                    }
                    
                    i.details.meta?.categories?.forEach((category: string) =>
                    {
                        if (!agg.categories.find(c => c.id === category)) {
                            agg.categories.push(make(category));
                        }
                    });

                    return agg;
                },
                { genres: [] as IdAndText[], categories: [] as IdAndText[] });

            prependAll(genres.sort());
            prependAll(categories.sort());
            
            this.listings.forEach(l =>
            {
                l.channelUrl = mapChannelSlugToUrl(l.slug) ?? `https://www.google.com/search?client=firefox-b-d&q=watch+%22${encodeURIComponent(l.title)}%22+online`;;
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
    { "match": "u-and-drama", "url": "https://u.co.uk/tv-guide/drama" },
    { "match": "quest", "url": "https://www.discoveryplus.com/gb/channel/quest?pc=268" },    
]
.map(i => {
    var regex = new RegExp(`^${i.match}`);

    return { 
        matcher: (slug: string) => !!regex.exec(slug),
        url: i.url
    };
});

const mapChannelSlugToUrl = (slug: string) => mappings.find(m => m.matcher(slug))?.url;