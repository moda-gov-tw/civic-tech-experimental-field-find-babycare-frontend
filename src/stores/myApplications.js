import { ref, unref, computed } from 'vue'
import findindex from 'lodash.findindex';
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { drafts as draftsData } from '../api/drafts.js';
import {
  submitted as submittedMockData,
  allData,
} from '../api/applications.js';
import { mockDataFormatter } from '../helpers/mockDataFormatter.js';
import { APPLICATION_STATUS, APPLICATION_STATUS_I18N } from '../enums/applicationStatus.js';

export const useMyApplicationsStore = defineStore('myApplications', () => {
  const { t } = useI18n();
  const tabsData = ref([
    // 草稿
    {
      name: computed(() => t('title.draft')),
      href: '/my-applications/drafts',
      count: computed(() => unref(drafts).length),
      current: false,
    },
    // 已送出
    {
      name: computed(() => t('title.submitted')),
      href: '/my-applications/submitted',
      count: computed(() => unref(submittedData).reduce((acc, d) => acc + d.length, 0)),
      current: false,
    },
  ]);
  function updateActiveTab(idx) {
    tabsData.value.forEach((item, itemIdx) => {
      item.current = (idx === itemIdx);
    });
  }

  const drafts = computed(() => draftsData
    .map(d => ({
      draftCreatedDate: d.fields.draft_created_date,
      infantName: d.fields.infant_name,
      selectedDaycareName: d.fields.selected_daycare_name,
      id: d.id,
    })));

  const submittedData = computed(() => {
    // Initialize an empty object for grouping
    const groupedData = {};

    mockDataFormatter(submittedMockData).forEach(entry => {
      // Use the infantId as the group key
      const groupKey = entry.infantId;

      // If the group does not exist in groupedData, initialize it as an empty array
      if (!groupedData[groupKey]) {
        groupedData[groupKey] = [];
      }

      const selectedDaycareData = mockDataFormatter(allData.records)
        .filter(d => d.selectedDaycare[0] === entry.selectedDaycare[0]);
      const currentOrder = findindex(selectedDaycareData, d => d.infantId === entry.infantId);

      // Update the applicationStatus with the current order
      entry.applicationStatus = t(APPLICATION_STATUS_I18N[APPLICATION_STATUS[entry.applicationStatus]], { count: currentOrder + 1 });

      // Add the entry to the appropriate group
      groupedData[groupKey].push(entry);
    });

    // Convert the grouped object into an array of its values
    const result = Object.values(groupedData);

    return result;
  });

  return {
    tabsData,
    updateActiveTab,
    drafts,
    submittedData,
  };
});
