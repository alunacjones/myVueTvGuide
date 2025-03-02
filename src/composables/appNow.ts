import { useNow } from "@vueuse/core";

export const useMyNow = () => useNow({ interval: 30000 });