<!-- Enrollment Management - Graduated Tab -->
<template>
  <div class="grid gap-5">
    <NormalTabs :tabs="tabsData" @update:active-tab="updateActiveTab" />
    <BodyText :text="$t('message.application_graduated_explain')" />
    <EasyDataTable
      ref="dataTable"
      hide-footer
      table-class-name="customize-table"
      :headers="headers"
      :items="graduatedData"
      :rows-per-page="rowsPerPage"
      @click-row="showRow"
    />
    <TablePagination
      v-if="graduatedData.length > rowsPerPage"
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
  graduatedData,
} = storeToRefs(store);
const { updateActiveTab } = store;

const headers = computed(() => [
  { text: t('input.infant_number'), value: 'infantId' }, // 幼兒編號
  { text: t('input.infant_name'), value: 'infantName', sortable: true }, // 幼兒姓名
  { text: t('input.graduate_date'), value: 'graduatedDate', sortable: true }, // 退托日期
  { text: t('input.graduate_reason'), value: 'graduatedReason', sortable: true }, // 退托原因
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
  updateActiveTab(3);
});
</script>
