import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('generalStore', () => {
  // Define your state properties here
  // For example:
  const count = ref(0);
  const message = ref('Hello, world!');

  // Define your getters here
  // For example:
  const doubleCount = computed(() => {
    return count.value * 2;
  });

  // Define your actions here
  // For example:
  const increment = () => {
    count.value++;
  };
  const setMessage = (newMessage) => {
    message.value = newMessage;
  };

  return {
    count,
    message,
    doubleCount,
    increment,
    setMessage
  };
})
