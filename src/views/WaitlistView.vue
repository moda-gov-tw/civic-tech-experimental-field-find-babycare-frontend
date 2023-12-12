<template>
  <div class="px-8 py-7 grid gap-7">
    <MainTitle :text="$t('title.waitlist_title', { daycareName })" divider />
    <div class="grid gap-5">
      <div
        v-if="waitlist.length === 0"
        class="grid gap-6 justify-center items-center text-center p-8"
      >
        <IconEmptyWaitlist />
        <span class="$style.emptyTips">
          {{ $t('message.my_applications_blank') }}
        </span>
      </div>
      <EasyDataTable
        v-else
        ref="dataTable"
        hide-footer
        table-class-name="customize-table" :headers="headers"
        :items="waitlist"
        :rows-per-page="rowsPerPage"
        @click-row="showRow"
      />
      <TablePagination v-if="waitlist.length > rowsPerPage" :table-ref="dataTable" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import find from 'lodash.find';
import MainTitle from '../components/MainTitle.vue';
import TablePagination from '../components/TablePagination.vue';
import IconEmptyWaitlist from '../components/icons/IconEmptyWaitlist.vue';
import { waitlist as waitlistData } from '../api/applications.js';
import { daycares as daycaresData } from '../api/daycare.js';

const { t } = useI18n();

const props = defineProps({
  daycareID: {
    type: String,
    default: '',
  },
});

const rowsPerPage = ref(Infinity);

function getDaycareNameById(id = '') {
  return find(daycaresData, (data) => data.id === id)?.fields?.daycare_name || '';
}

const daycareName = computed(() => getDaycareNameById(props.daycareID));
console.log(daycareName.value);

console.log(waitlistData);
const waitlist = waitlistData
  .filter(d => {
    return d.fields.selected_daycare?.includes(props.daycareID);
  })
  .map((d, idx) => {
    const id = d.id;
    const {
      infant_unique_id: infantId,
      submission_date: submissionDate,
      identities,
    } = d.fields;

    return {
      id,
      identities,
      infantId,
      order: idx + 1,
      submissionDate,
    };
  });

const headers = computed(() => [
  { text: t('input.waitlist_order'), value: 'order', sortable: true }, //候補順序
  { text: t('input.infant_number'), value: 'infantId' }, //幼兒編號
  { text: t('input.submission_time'), value: 'submissionDate', sortable: true }, //報名時間
  { text: t('input.identities'), value: 'identities', sortable: true }, //身份資格
]);
</script>

<style module>
.emptyTips {
  color: var(--bb-color-gray-600);

  /* Webpage Text Styles/Title */
  font-family: Noto Sans CJK TC;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 160% */
}
</style>
