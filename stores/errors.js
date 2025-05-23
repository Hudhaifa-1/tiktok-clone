import { defineStore } from "pinia"

export const useErrorsStore = defineStore('errors', {
    state: ()=> ({
      loginErrors: {
        email: []
      },
      registerErrors: {
        name: [], 
        email: [],
        password: []
      }
    }),

    actions: {
        
    },
    
})