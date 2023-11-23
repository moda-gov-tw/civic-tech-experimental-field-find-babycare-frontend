<template>
  <div class="px-8 py-7 grid gap-7">
    <MainTitle :text="pageTitle" divider />
    <div class="grid gap-5">
      <div
        v-if="waitlist.length === 0"
        class="grid gap-6 justify-center items-center text-center p-8"
      >
        <IconEmptyWaitlist />
        <span class="$style.emptyTips">
          目前無人候補
        </span>
      </div>
      <EasyDataTable
        v-else
        ref="dataTable"
        hide-footer
        table-class-name="customize-table"
        :headers="headers"
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
import MainTitle from '../components/MainTitle.vue';
import TablePagination from '../components/TablePagination.vue';
// store
import { useWaitlistStore } from '../stores/waitlist.js';
import { storeToRefs } from 'pinia';
import IconEmptyWaitlist from '../components/icons/IconEmptyWaitlist.vue';

const props = defineProps({
  daycareID: {
    type: String,
    default: '',
  },
});

const rowsPerPage = ref(10);

const store = useWaitlistStore();
const {
  waitlist,
} = storeToRefs(store);

const headers = [
  { text: '候補順序', value: 'order', sortable: true },
  { text: '幼兒編號', value: 'id' },
  { text: '身份資格', value: 'identity', sortable: true },
  { text: '報名時間', value: 'registrationTime', sortable: true },
];

const pageTitle = computed(() => {
  return `候補名單 | ${getDaycareNameById(props.daycareID)}`;
});

function getDaycareNameById(daycareId) {
  return `daycare ${daycareId}`;
}
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
