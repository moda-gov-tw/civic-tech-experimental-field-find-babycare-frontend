import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWaitlistStore = defineStore('waitlist', () => {
  const waitlist = ref([
    {
      id: 'AA00001',
      infantName: '樂熱・羅小尼奧',
      applicantName: '樂熱・羅小尼奧',
      birthdate: 'date',
      age: '1歲10個月',
      identity: 'B',
      notifyDate: 'date',
      registrationDeadline: 'date',
      checkInDate: 'date',
      status: 0,
    },
    {
      id: 'AA00002',
      infantName: '江小貴',
      applicantName: '江大美',
      birthdate: 'date',
      age: '1歲10個月',
      identity: 'C',
      notifyDate: 'date',
      registrationDeadline: 'date',
      checkInDate: 'date',
      status: 0,
    },
  ]);

  return { waitlist };
});
