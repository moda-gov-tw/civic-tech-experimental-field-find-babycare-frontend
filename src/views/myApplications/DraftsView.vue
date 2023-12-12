<template>
  <div class="grid gap-5">
    <NormalTabs :tabs="tabsData" @update:active-tab="updateActiveTab" />
    <BodyText :text="$t('message.my_applications')" />
    <EasyDataTable
      ref="dataTable"
      hide-footer
      table-class-name="customize-table"
      :headers="headers"
      :items="drafts"
      :rows-per-page="rowsPerPage"
      @click-row="showRow"
    />
    <TablePagination
      v-if="drafts.length > rowsPerPage"
      :table-ref="dataTable"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BodyText from '../../components/BodyText.vue';
import NormalTabs from '../../components/NormalTabs.vue';
import TablePagination from '../../components/TablePagination.vue';

import { useMyApplicationsStore } from '../../stores/myApplications.js';
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const rowsPerPage = ref(10);

const store = useMyApplicationsStore();
const {
  tabsData,
  drafts,
} = storeToRefs(store);
const { updateActiveTab } = store;

const headers = computed(() => [
  { text: t('input.draft_created_date'), value: 'draftCreatedDate', sortable: true }, // 草稿建立日期
  { text: t('input.infant_name'), value: 'infantName', sortable: true }, // 幼兒姓名
  { text: t('input.draft_daycare_selection'), value: 'selectedDaycareName' }, // 草稿內已選擇的公托
]);

const dataTable = ref(); // $ref EasyDataTable template

import router from '../../router/index.js'
const showRow = (item) => {
  router.push({
    name: 'apply.step1',
    params: {
      applicationID: item.id,
    },
  })
};

onMounted(() => {
  updateActiveTab(0);
});
</script>
