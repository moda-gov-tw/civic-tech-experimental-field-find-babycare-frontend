<!-- Application Management - Approval Tab -->
<template>
  <div class="grid gap-5">
    <NormalTabs :tabs="tabsData" @update:active-tab="updateActiveTab" />
    <BodyText :text="$t('message.application_approval_explain')" />
    <EasyDataTable
      ref="dataTable"
      hide-footer
      table-class-name="customize-table"
      :headers="headers"
      :items="applicants"
      :rows-per-page="rowsPerPage"
      @click-row="showRow"
    />
    <TablePagination
      v-if="applicants.length > rowsPerPage"
      :table-ref="dataTable"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import BodyText from '../../components/BodyText.vue';
import NormalTabs from '../../components/NormalTabs.vue';
import TablePagination from '../../components/TablePagination.vue';

// store
import { useApplicationStore } from '../../stores/application';
import { storeToRefs } from 'pinia';

defineProps({
  applicationID: {
    type: String,
  },
});

const rowsPerPage = ref(10);

const store = useApplicationStore();
const {
  tabsData,
  applicants,
} = storeToRefs(store);
const { updateActiveTab } = store;

const { t } = useI18n();

const headers = [
  { text: t('input.infant_name'), value: 'infantName' },
  { text: t('input.applicant_name'), value: 'applicantName', sortable: true },
  { text: t('input.identities'), value: 'identity', sortable: true },
  { text: t('input.submission_time'), value: 'submissionTime', sortable: true },
];

const dataTable = ref(); // $ref EasyDataTable template

import router from '../../router/index.js'
const showRow = (item) => {
  router.push({
    name: 'applications.detail',
    params: {
      applicationID: item.id,
    },
  })
  console.log(item);
};

onMounted(() => {
  updateActiveTab(0);
});
</script>
