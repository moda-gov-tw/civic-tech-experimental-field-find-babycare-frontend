import { ref, unref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { enrollments as enrollmentsMockData } from '../api/enrollments.js';
import { applications as applicationsMockData } from '../api/applications.js';
import { mockDataFormatter } from '../helpers/mockDataFormatter.js';

export const useEnrollmentStore = defineStore('enrollment', () => {
  const { t } = useI18n();
  const tabsData = ref([
    // 報到確認
    {
      name: computed(() => t('title.enroll_confirmation')),
      href: '/enrollment/approval',
      count: computed(() => unref(approvalData).length),
      current: false,
    },
    // 入托名單
    {
      name: computed(() => t('title.enrolled')),
      href: '/enrollment/enrolled',
      count: computed(() => unref(enrolledData).length),
      current: false,
    },
    // 放棄入托名單
    {
      name: computed(() => t('title.forfeit')),
      href: '/enrollment/forfeit',
      current: false,
    },
    // 退托名單
    {
      name: computed(() => t('title.graduated')),
      href: '/enrollment/graduated',
      current: false,
    },
  ]);
  function updateActiveTab(idx) {
    tabsData.value.forEach((item, itemIdx) => {
      item.current = (idx === itemIdx);
    });
  }

  const applicationsData = computed(() => {
    return mockDataFormatter(applicationsMockData);
  });

  const enrollmentsData = computed(() => {
    return mockDataFormatter(enrollmentsMockData);
  });

  const approvalData = computed(() => unref(applicationsData).filter(d => d.applicationStatus === '5' )); // 報到確認
  const enrolledData = computed(() => unref(enrollmentsData).filter(d => d.enrollmentStatus === '0' )); // 入托名單
  const forfeitData = computed(() => unref(applicationsData).filter(d => d.applicationStatus === '8' )); // 放棄入托名單
  const graduatedData = computed(() => unref(enrollmentsData).filter(d => d.enrollmentStatus === '1' )); // 退托名單
  const allData = computed(() => unref(enrollmentsData).concat(unref(applicationsData)));

  return {
    tabsData,
    updateActiveTab,
    approvalData,
    enrolledData,
    forfeitData,
    graduatedData,
    allData,
  }
})
