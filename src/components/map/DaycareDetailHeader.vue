<template>
  <div class="flex gap-5">
    <div class="flex-auto">
      <div :class="$style.type">{{ displayDaycareType }}</div>
      <div :class="$style.title">{{ daycareInfo.name }}</div>
      <div v-if="daycareInfo.currentWait" :class="$style.info">
        接受候補中 | {{ $t('daycare.currentwait') }}{{ daycareInfo.currentWait }}
      </div>
    </div>
    <IconShare class="cursor-pointer" />
  </div>
</template>

<script setup>
import IconShare from '../../components/icons/IconShare.vue';
import { computed, unref } from 'vue';
import {
  DAYCARE_TYPE_I18N,
  formatDaycareType,
} from '../../enums/daycare';

const props = defineProps({
  daycareInfo: {
    type: Object,
  },
});

const displayDaycareType = computed(() => {
  const daycareType = String(unref(props.daycareInfo.daycareType)) || '';

  return Object.keys(DAYCARE_TYPE_I18N).includes(daycareType)
    ? formatDaycareType(daycareType)
    : '';
});
</script>

<style module>
.type {
  color: var(--bb-color-black);

  /* Webpage Text Styles/Additional Explanation */
  font-family: Noto Sans CJK TC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
}

.title {
  color: var(--bb-color-black);

  /* Webpage Text Styles/Title H2 */
  font-family: Noto Sans CJK TC;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 177.778% */
}

.info {
  color: var(--bb-color-gray-600);

  /* Webpage Text Styles/Additional Explanation */
  font-family: Noto Sans CJK TC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
}
</style>
