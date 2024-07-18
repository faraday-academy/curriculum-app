import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('generalStore', {
  state: () => ({
    // Define your state properties here
    // For example:
    count: 0,
    message: 'Hello, world!',
  }),

  getters: {
    // Define your getters here
    // For example:
    doubleCount() {
      return this.count * 2;
    },
  },

  actions: {
    // Define your actions here
    // For example:
    increment() {
      this.count++;
    },
    setMessage(newMessage) {
      this.message = newMessage;
    },
  },
})
