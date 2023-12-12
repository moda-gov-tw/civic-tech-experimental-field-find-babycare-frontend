<!-- Enrollment Management - Approval Tab -->
<template>
  <div class="grid gap-5">
    <NormalTabs :tabs="tabsData" @update:active-tab="updateActiveTab" />
    <BodyText :text="$t('message.application_accepted_explain')" />
    <EasyDataTable
      ref="dataTable"
      hide-footer
      table-class-name="customize-table"
      :headers="headers"
      :items="approvalData"
      :rows-per-page="rowsPerPage"
      @click-row="showRow"
    />
    <TablePagination
      v-if="approvalData.length > rowsPerPage"
      :table-ref="dataTable"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import BodyText from '../../components/BodyText.vue';
import NormalTabs from '../../components/NormalTabs.vue';
import TablePagination from '../../components/TablePagination.vue';
import { useI18n } from 'vue-i18n';
// store
import { useEnrollmentStore } from '../../stores/enrollment.js';
import { storeToRefs } from 'pinia';

const { t } = useI18n();

defineProps({
  enrollmentID: {
    type: String,
  },
});

const rowsPerPage = ref(10);

const store = useEnrollmentStore();
const {
  tabsData,
  approvalData,
} = storeToRefs(store);
const { updateActiveTab } = store;

const headers = computed(() => [
  { text: t('input.infant_number'), value: 'infantId' }, // 幼兒編號
  { text: t('input.infant_name'), value: 'infantName', sortable: true }, // 幼兒姓名
  { text: t('input.applicant_name'), value: 'applicantName', sortable: true }, // 申請人姓名
  { text: t('input.identities'), value: 'identities', sortable: true }, // 身分資格
  { text: t('input.accepted_date'), value: 'acceptedDate', sortable: true }, // 通知錄取日
  { text: t('input.accept_deadline_date'), value: 'registerDeadline', sortable: true }, // 回覆報到意願期限
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
  updateActiveTab(0);
});
</script>
