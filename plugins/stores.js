import { useUserStore } from "#imports";
import { useProfileStore } from "#imports";
import { useGeneralStore } from "#imports";
import { useErrorsStore } from "#imports";

export default defineNuxtPlugin((NuxtApp) => {
    return {
        provide: {
            userStore : useUserStore(),
            profileStore: useProfileStore(),
            generalStore: useGeneralStore(),
            errorsStore: useErrorsStore()
        }
    }
})