import { defineStore } from "pinia";
import { moveToTop } from "../composables/moveToTop";

export const useHeaderStore = defineStore("header", {
    state() {
        return {
            isVisible: true,
            dayTitleHeight: 46,
            searchElement: undefined as HTMLInputElement | undefined
        }
    },
    actions: {
        focusSearch() {
            moveToTop();
            if (this.searchElement) {
                this.searchElement.select();
                this.searchElement.focus();
            }            
        },
        loseSearchFocus() {
            if (this.searchElement) {
                this.searchElement.blur();
            }
        }
    }
})