import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWaitlistStore = defineStore('waitlist', () => {
  const waitlist = ref([
    {
      id: 'AA00001',
      order: 1, // 候補順序
      registrationTime: 'date',
      identity: 'B',
    },
    {
      id: 'AA00002',
      order: 2, // 候補順序
      registrationTime: 'date',
      identity: 'C',
    },
  ]);

  return { waitlist };
})
