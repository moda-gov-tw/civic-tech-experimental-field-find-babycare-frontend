<template>
  <div class="grid gap-5">
    <NormalTabs :tabs="tabsData" @update:active-tab="updateActiveTab" />
    <BodyText :text="$t('message.application_removed_explain')" />
    <EasyDataTable
      ref="dataTable"
      hide-footer
      table-class-name="customize-table"
      :headers="headers"
      :items="applications"
      :rows-per-page="rowsPerPage"
      @click-row="showRow"
    />
    <TablePagination
      v-if="applications.length > rowsPerPage"
      :table-ref="dataTable"
    />
  </div>
</template>

<script setup>
import { ref, unref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import BodyText from '../../components/BodyText.vue';
import NormalTabs from '../../components/NormalTabs.vue';
import TablePagination from '../../components/TablePagination.vue';
// store
import { useApplicationStore } from '../../stores/application';
import { storeToRefs } from 'pinia';

const { t } = useI18n();

defineProps({
  daycareID: {
    type: String,
    default: '',
  },
});

const rowsPerPage = ref(10);

const store = useApplicationStore();
const {
  tabsData,
  removedData,
} = storeToRefs(store);
const { updateActiveTab } = store;

const applications = unref(removedData);

const headers = computed(() => [
  { text: t('input.infant_number'), value: 'infantId' },
  { text: t('input.infant_name'), value: 'infantName' },
  { text: t('input.age'), value: 'infantAge' },
  { text: t('input.identities'), value: 'identities', sortable: true },
  { text: t('input.submission_time'), value: 'submissionDate', sortable: true },
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
  updateActiveTab(2);
});
</script>
