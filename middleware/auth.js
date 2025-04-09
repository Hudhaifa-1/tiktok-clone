import { useUserStore } from "#imports"

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()

    if(to !== '/' && !userStore.id){
        return navigateTo('/')
    }
})