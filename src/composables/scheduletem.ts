import { computed, inject } from "vue";
import { type ISchedule } from "../types";
import moment from "moment";
import { useMyNow } from "./appNow";

export function useScheduleDetails(item: ISchedule)
{
    const isAMovie = computed(() => item?.type === "movie");
    const meta = computed(() => item?.details?.meta);
    const isMorning = computed(() => {
        const hour = moment(item?.start_at).hour();
        return hour >= 0 && hour < 12;
    });

    const summary = computed(() => !isMorning.value || item?.expanded
        ? item?.details.summary_long
        : item?.details.summary_short);

    const rating = computed(() => {
        const rating = Math.round((meta.value?.rating ?? 0) / 2);
    
        return rating
            ? "★".repeat(rating) + "☆".repeat(5 - rating)
            : ""
    });

    const genreInfo = computed(() => {
        const duration = item?.duration ? ` (${item?.duration} mins)` : "";
        return `${item?.details?.genre}${duration}`;
    });
    
    const episode = computed(() => {
        const meta = item?.details.meta;
        const title = meta?.episode_title ? ` (${meta.episode_title})` : "";
        const season = meta?.season ? `S${meta.season}` : "";
        const episode = meta?.episode ? ` E${meta.episode}` : "";
    
        return season && episode
            ? `${season}${episode}${title}`
            : ""
    });

    const now = useMyNow();
    const isNew = computed(() => attributes.value.includes("new"));
    const isCurrentlyOn = computed(() => moment(now.value).isBetween(start.value, end.value));
    const channelUrl = inject<string>("channelUrl")
    const attributes = computed(() => meta.value?.attributes ?? [])
    const start = computed(() => moment(item?.start_at));
    const end = computed(() => moment(item?.end_at));
    
    return {
        isAMovie,
        meta,
        isMorning,
        summary,
        rating,
        genreInfo,
        episode,
        isNew,
        isCurrentlyOn,
        channelUrl
    }
}