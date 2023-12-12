import { ref, unref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { applications as applicationsMockData } from '../api/applications.js';
import { mockDataFormatter } from '../helpers/mockDataFormatter.js';

export const useApplicationStore = defineStore('application', () => {
  const { t } = useI18n();
  const tabsData = ref([
    // 報名審查
    {
      name: computed(() => t('title.application_approval')),
      href: '/applications/approval',
      count: computed(() => unref(approvalData).length),
      current: false,
    },
    // 候補名單
    {
      name: computed(() => t('title.waitlist')),
      href: '/applications/waitlist',
      count: computed(() => unref(waitlistData).length),
      current: false,
    },
    // 移除名單
    {
      name: computed(() => t('title.removed_list')),
      href: '/applications/removed',
      count: computed(() => unref(removedData).length),
      current: false,
    },
  ]);
  function updateActiveTab(idx) {
    tabsData.value.forEach((item, itemIdx) => {
      item.current = (idx === itemIdx);
    });
  }

  const applicationsData = computed(() => {
    return mockDataFormatter(applicationsMockData)
  });

  const approvalData = computed(() => unref(applicationsData).filter(d => d.applicationStatus === '0')); // 報名審查
  const waitlistData = computed(() => unref(applicationsData).filter(d => d.applicationStatus === '3')); // 候補名單
  const removedData = computed(() => unref(applicationsData).filter(d => ['4', '9'].includes(d.applicationStatus))); // 候補名單
  const allData = computed(() => unref(applicationsData));

  return {
    tabsData,
    updateActiveTab,
    applicationsData,
    approvalData,
    waitlistData,
    removedData,
    allData,
  };
})
