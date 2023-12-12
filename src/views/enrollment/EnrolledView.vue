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
      :items="enrolledData"
      :rows-per-page="rowsPerPage"
      @click-row="showRow"
    />
    <TablePagination
      v-if="enrolledData.length > rowsPerPage"
      :table-ref="dataTable"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BodyText from '../../components/BodyText.vue';
import NormalTabs from '../../components/NormalTabs.vue';
import TablePagination from '../../components/TablePagination.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

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
  enrolledData,
} = storeToRefs(store);
const { updateActiveTab } = store;

const headers = computed(() => [
  { text: t('input.infant_number'), value: 'infantId' }, // 幼兒編號
  { text: t('input.infant_name'), value: 'infantName', sortable: true }, // 幼兒姓名
  { text: t('input.birthdate'), value: 'birthdate', sortable: true }, // 出生年月日
  { text: t('input.age'), value: 'age', sortable: true }, // 年齡
  { text: t('input.enroll_date'), value: 'enrollDate', sortable: true }, // 入托日期
]);

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
