import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { formatIdentity } from '../enums/identity';

export const useApplicationStore = defineStore('application', () => {
  const { t } = useI18n();
  const tabsData = ref([
    // 報名審查
    { name: t('title.application_approval'), href: '/applications/approval', count: '3', current: false },
    // 候補名單
    { name: t('title.waitlist'), href: '/applications/waitlist', current: false },
    // 移除名單
    { name: t('title.removed_list'), href: '/applications/removed', current: false },
  ]);
  function updateActiveTab(idx) {
    tabsData.value.forEach((item, itemIdx) => {
      item.current = (idx === itemIdx);
    });
  }

  const applicants = computed(() => {
    const data = [
      {
        id: 'AA0001',
        infantName: '樂熱・羅小尼奧',
        applicantName: '樂熱・羅小尼奧',
        identity: 'B',
        submissionTime: 'datetime',
        age: '1歲4個月',
        status: 0,
      },
      {
        id: 'AA0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        age: '1歲4個月',
        status: 1,
      },
      {
        id: 'AA0003',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: 'AA0004',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: 'AA0005',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: 'AA0006',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: 'AA0007',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: 'AA0008',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: 'AA0009',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: 'AA0010',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
      {
        id: '0002',
        infantName: '江小貴',
        applicantName: '江大美',
        identity: 'J',
        submissionTime: 'datetime',
        status: 1,
      },
    ];
    const formattedData = data.map(item => {
      item.identity = formatIdentity(item.identity);
      return item;
    });
    return formattedData;
  });

  return { tabsData, updateActiveTab, applicants }
})
