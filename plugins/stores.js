import { useUserStore } from "#imports";
import { useProfileStore } from "#imports";
import { useGeneralStore } from "#imports";

export default defineNuxtPlugin((NuxtApp) => {
    return {
        provide: {
            userStore : useUserStore(),
            profileStore: useProfileStore(),
            generalStore: useGeneralStore()
        }
    }
})