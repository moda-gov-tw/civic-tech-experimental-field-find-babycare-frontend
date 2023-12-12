<template>
  <div class="customize-footer">
    <div v-if="isShowCustomizeRowsPerPage" class="customize-rows-per-page">
      <select
        class="select-items"
        @change="updateRowsPerPageSelect"
      >
        <option
          v-for="item in rowsPerPageOptions"
          :key="item"
          :selected="item === rowsPerPageActiveOption"
          :value="item"
        >
          {{ item }} rows per page
        </option>
      </select>
    </div>

    <div v-if="isShowNowDisplaying" class="customize-index">
      Now displaying: {{currentPageFirstIndex}} ~ {{currentPageLastIndex}} of {{clientItemsLength}}
    </div>

    <!-- pagination -->
    <div class="w-full flex justify-between">
      <div class="customize-pagination">
        <button
          class="prev-page  flex flex-row flex-nowrap min-w-max gap-4"
          @click="prevPage"
          :disabled="isFirstPage"
        >
          <IconArrowNarrowLeft />
          前一頁
        </button>
      </div>

      <div class="customize-buttons flex justify-center">
        <span
          v-for="(paginationNumber, idx) in maxPaginationNumber"
          :key="idx"
          class="customize-button"
          :class="{'active': paginationNumber === currentPaginationNumber}"
          @click="updatePage(paginationNumber)"
        >
          {{paginationNumber}}
        </span>
      </div>

      <div class="customize-pagination">
        <button
          class="next-page flex flex-row flex-nowrap min-w-max gap-4"
          @click="nextPage"
          :disabled="isLastPage"
        >
          下一頁
          <IconArrowNarrowRight />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { unref, computed } from 'vue'
import IconArrowNarrowLeft from './icons/IconArrowNarrowLeft.vue';
import IconArrowNarrowRight from './icons/IconArrowNarrowRight.vue';

const props = defineProps({
  tableRef: {
    required: true,
  },
  isShowCustomizeRowsPerPage: {
    type: Boolean,
    default: false,
  },
  isShowNowDisplaying: {
    type: Boolean,
    default: false,
  },
});

// index related
const currentPageFirstIndex = computed(() => unref(props.tableRef)?.currentPageFirstIndex);
const currentPageLastIndex = computed(() => unref(props.tableRef)?.currentPageLastIndex);
const clientItemsLength = computed(() => unref(props.tableRef)?.clientItemsLength);

// pagination related
const maxPaginationNumber = computed(() => unref(props.tableRef)?.maxPaginationNumber);
const currentPaginationNumber = computed(() => unref(props.tableRef)?.currentPaginationNumber);

const isFirstPage = computed(() => unref(props.tableRef)?.isFirstPage);
const isLastPage = computed(() => unref(props.tableRef)?.isLastPage);

const nextPage = () => {
  unref(props.tableRef).nextPage();
};
const prevPage = () => {
  unref(props.tableRef).prevPage();
};
const updatePage = paginationNumber => {
  unref(props.tableRef).updatePage(paginationNumber);
};

// rows per page related
const rowsPerPageOptions = computed(() => unref(props.tableRef)?.rowsPerPageOptions);
const rowsPerPageActiveOption = computed(() => unref(props.tableRef)?.rowsPerPageActiveOption);

const updateRowsPerPageSelect = (e) => {
  unref(props.tableRef).updateRowsPerPageActiveOption(Number((e.target).value));
};
</script>

<style scoped>
.customize-footer {
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.customize-footer div {
  margin: 5px;
}

.customize-buttons {
  display: flex;
  color: var(--bb-color-gray-200);
  border-top: 1px solid;
  width: 100%;
}

.customize-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 3px;
  line-height: 20px;
  font-weight: 500;
  font-size: 14px;
  color: var(--bb-color-gray-600);
  padding: 16px;
  padding-bottom: 0;
}

.customize-button.active {
  color: var(--bb-color-orange-700);
  border-top: 2px solid;
}

.customize-pagination button {
  margin: 0 5px;
  cursor: pointer;
}

.filter-wrapper {
  display: flex;
  align-items: center;
}

.slider {
  flex-grow: 1;
}
</style>

<style>
.customize-table {
  border-radius: 6px;
  overflow: hidden;
  --easy-table-border: 1px solid var(--bb-color-gray-200);
  --easy-table-row-border: 1px solid var(--bb-color-gray-200);

  --easy-table-header-font-size: 12px;
  --easy-table-header-height: 40px;
  --easy-table-header-font-color: var(--bb-color-white);
  --easy-table-header-background-color: var(--bb-color-gray-600);

  --easy-table-header-item-padding: 16px 24px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;

  --easy-table-body-row-font-color: var(--bb-color-gray-600);
  --easy-table-body-row-background-color: var(--bb-color-white);
  --easy-table-body-row-height: 52px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: var(--bb-color-gray-600);
  --easy-table-body-row-hover-background-color: var(--bb-color-gray-50);

  --easy-table-body-item-padding: 16px 24px;

  --easy-table-footer-background-color: #2d3a4f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
