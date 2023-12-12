<template>
  <div class="grid gap-5">
    <NormalTabs :tabs="tabsData" @update:active-tab="updateActiveTab" />
    <BodyText :text="$t('message.my_applications')" />
    <div
      v-for="submittedListOfInfant in submittedData"
      :key="submittedListOfInfant.infantId"
    >
    <div :class="$style.tableTitle">
      {{ $t('title.infant_applications', { infantName: submittedListOfInfant[0].infantName[0], infantUniqueID: submittedListOfInfant[0].infantId[0] }) }}
    </div>
      <EasyDataTable
        ref="dataTable"
        hide-footer
        table-class-name="customize-table"
        :headers="headers"
        :items="submittedListOfInfant"
        :rows-per-page="rowsPerPage"
        @click-row="showRow"
      />
      <TablePagination
        v-if="submittedListOfInfant.length > rowsPerPage"
        :table-ref="dataTable"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BodyText from '../../components/BodyText.vue';
import NormalTabs from '../../components/NormalTabs.vue';
import TablePagination from '../../components/TablePagination.vue';
import { useI18n } from 'vue-i18n';
import { useMyApplicationsStore } from '../../stores/myApplications.js';
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const rowsPerPage = ref(10);
const store = useMyApplicationsStore();
const {
  tabsData,
  submittedData,
} = storeToRefs(store);
const { updateActiveTab } = store;

const headers = computed(() => [
  { text: t('title.daycare_selection'), value: 'daycareName' }, // 公托選擇
  { text: t('input.status'), value: 'applicationStatus', sortable: true }, // 狀態
  { text: t('input.identities'), value: 'identities', sortable: true }, // 身分資格
  { text: t('input.submission_time'), value: 'submissionDate', sortable: true }, // 報名時間
]);

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
  updateActiveTab(1);
});
</script>

<style module>
.tableTitle {
  margin: 24px 8px;
  color: #111827;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
</style>
