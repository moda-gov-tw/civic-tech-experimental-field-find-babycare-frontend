<template>
  <div>
    <div :class="$style.title" class="mb-3">
      {{ title }}
    </div>
    <hr class="mb-5">
    <div class="grid gap-5">
      <template
        v-for="(info, idx) in infoList"
        :key="info.id"
      >
        <div
          :class="$style.infoItem"
          class="grid gap-2"
        >
          <div :class="$style.infoTitle">{{ info.title }}</div>
          <div :class="$style.infoContent">{{ info.content }}</div>
        </div>
        <hr v-if="idx < infoList.length - 1">
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import isEmpty from 'lodash.isempty';
const { t } = useI18n();

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  daycareInfo: {
    type: Object,
    default: () => ({}),
  },
});

const daycareId = props.daycareInfo.id;
const infoList = computed(() => {
  return [
    { title: 'phone_number', content: 'phoneNumber' }, // 聯絡電話
    { title: 'address', content: 'address' }, // 地址
    { title: 'capacity', content: 'capacity' }, // 收托人數
    { title: 'operation_hours', content: 'operationHours' }, // 收托時間
    { title: 'fee', content: 'fee' }, // 每月平均收費總額
  ]
  .filter(info => !isEmpty(props.daycareInfo[info.content]))
  .map(info => ({
    id: daycareId,
    title: t(`daycare.${ info.title }`),
    content: props.daycareInfo[info.content],
  }));
});
</script>

<style module>
.title {
  color: var(--bb-color-black);

  /* Webpage Text Styles/Body Text */
  font-family: Noto Sans CJK TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
}

.infoItem {
}

.infoTitle {
  color: var(--bb-color-gray-600);

  /* Webpage Text Styles/Body Text */
  font-family: Noto Sans CJK TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
}

.infoContent {
  color: var(--bb-color-black);

  /* Webpage Text Styles/Body Text */
  font-family: Noto Sans CJK TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
}
</style>
