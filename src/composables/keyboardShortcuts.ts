import { useActiveElement, useMagicKeys } from "@vueuse/core";
import { watchEffect } from "vue";
import { useQueryStore } from "../stores/queryStore";
import { storeToRefs } from "pinia";
import { useHeaderStore } from "../stores/headerStore";

export function useKeyboardShortcuts() {
    const keys = useMagicKeys();
    const activeElement = useActiveElement();
    const queryStore = useQueryStore();
    const headerStore = useHeaderStore();

    const { type, liveOnly, newOnly } = storeToRefs(queryStore);
    
    const ignoredTags = ["INPUT", "TEXTAREA", "SELECT"];
    const ctrlAndSlash = keys["Ctrl+/"]
    const { f, e, l, s, c, n } = keys;

    watchEffect(() =>
    {
        if (ctrlAndSlash.value) {
            headerStore.focusSearch();
        }

        if (ignoredTags.includes(activeElement.value?.tagName ?? "")) return;
        
        if (f.value) {
            type.value = type.value === "movie" ? "" : "movie"
        }

        if (e.value || s.value) {
            type.value = type.value === "episode" ? "" : "episode"
        }

        if (l.value) {
            liveOnly.value = !liveOnly.value;
        }

        if (c.value) {
            queryStore.clear();
        }

        if (n.value) {
            newOnly.value = !newOnly.value;
        }
    })
}