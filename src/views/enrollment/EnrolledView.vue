<!-- Enrollment Management - Enrolled Tab -->
<template>
  <div class="grid gap-5">
    <NormalTabs :tabs="tabsData" @update:active-tab="updateActiveTab" />
    <BodyText :text="$t('message.application_enrolled_explain')" />
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
import BodyText from '../../components/BodyText.vue';
import NormalTabs from '../../components/NormalTabs.vue';
import TablePagination from '../../components/TablePagination.vue';

// store
import { useEnrollmentStore } from '../../stores/enrollment.js';
import { storeToRefs } from 'pinia';

defineProps({
  enrollmentID: {
    type: String,
  },
});

const rowsPerPage = ref(10);

const store = useEnrollmentStore();
const {
  tabsData,
  applicants,
} = storeToRefs(store);
const { updateActiveTab } = store;

const headers = [
  { text: '幼兒編號', value: 'id' },
  { text: '幼兒姓名', value: 'infantName', sortable: true },
  { text: '出生年月日', value: 'birthdate', sortable: true },
  { text: '年齡', value: 'age', sortable: true },
  { text: '入托日期', value: 'checkInDate', sortable: true },
];

const dataTable = ref(); // $ref EasyDataTable template

import router from '../../router/index.js'
const showRow = (item) => {
  router.push({
    name: 'enrollmentDetail',
    params: {
      enrollmentID: item.id,
    },
  })
  console.log(item);
};

onMounted(() => {
  updateActiveTab(1);
});
</script>
