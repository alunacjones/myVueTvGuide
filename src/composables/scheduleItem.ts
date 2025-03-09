import { computed, inject, type Ref } from "vue";
import { type ISchedule } from "../types";
import moment from "moment";
import { useMyNow } from "./appNow";
import { openWindow } from "../utils/windowOpener";

export function useScheduleDetails(item: Ref<ISchedule>)
{
    const isAMovie = computed(() => item.value?.type === "movie");
    const meta = computed(() => item.value?.details?.meta);
    const isMorning = computed(() => {
        const hour = moment(item.value?.start_at).hour();
        return hour >= 0 && hour < 12;
    });

    const summary = computed(() => !isMorning.value || item.value?.expanded
        ? item.value?.details.summary_long
        : item.value?.details.summary_short);

    const rating = computed(() => {
        const rating = Math.round((meta.value?.rating ?? 0) / 2);
    
        return rating
            ? "★".repeat(rating) + "☆".repeat(5 - rating)
            : ""
    });

    const genreInfo = computed(() => {
        const duration = item.value?.duration ? ` (${item.value?.duration} mins)` : "";
        return `${item.value?.details?.genre}${duration}`;
    });
    
    const episode = computed(() => {
        const meta = item.value?.details.meta;
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
    const start = computed(() => moment(item.value?.start_at));
    const end = computed(() => moment(item.value?.end_at));
    const categories = computed(() => meta.value?.categories);
    const certification = computed(() => meta.value?.certification);
    const goToChannel = (e?: Event) => {
        e?.stopPropagation();

        if (channelUrl) {
            openWindow(channelUrl)
            return;
        }    
    }

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
        channelUrl,
        categories,
        certification,
        goToChannel
    }
}