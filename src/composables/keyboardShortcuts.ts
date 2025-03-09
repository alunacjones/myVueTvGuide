import { useActiveElement, useMagicKeys } from "@vueuse/core";
import { watchEffect } from "vue";
import { useQueryStore } from "../stores/queryStore";
import { storeToRefs } from "pinia";

export function useKeyboardShortcuts() {
    const { f, e, l } = useMagicKeys();
    const activeElement = useActiveElement();
    const { type, liveOnly } = storeToRefs(useQueryStore());
    const ignoredTags = ["INPUT", "TEXTAREA", "SELECT"];

    watchEffect(() =>
    {
        if (ignoredTags.includes(activeElement.value?.tagName ?? "")) return;

        if (f.value) {
            type.value = type.value == "movie" ? "" : "movie"
        }

        if (e.value) {
            type.value = type.value == "episode" ? "" : "episode"
        }

        if (l.value) {
            liveOnly.value = !liveOnly.value;
        }
    })
}