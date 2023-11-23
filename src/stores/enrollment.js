import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';

export const useEnrollmentStore = defineStore('enrollment', () => {
  const { t } = useI18n();
  const tabsData = ref([
    // 報到確認
    { name: t('title.enroll_confirmation'), href: '/enrollment/approval', count: '3', current: false },
    // 入托名單
    { name: t('title.enrolled'), href: '/enrollment/enrolled', current: false },
    // 放棄入托名單
    { name: t('title.forfeit'), href: '/enrollment/forfeit', current: false },
    // 退托名單
    { name: t('title.graduated'), href: '/enrollment/graduated', current: false },
  ]);
  function updateActiveTab(idx) {
    tabsData.value.forEach((item, itemIdx) => {
      item.current = (idx === itemIdx);
    });
  }

  const applicants = ref([
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

  return { tabsData, updateActiveTab, applicants }
})
