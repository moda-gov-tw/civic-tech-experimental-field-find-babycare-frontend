<template>
  <div class="flex gap-5">
    <div class="flex-auto">
      <div :class="$style.type">{{ displayDaycareType }}</div>
      <div :class="$style.title">{{ daycareInfo.name }}</div>
      <div :class="$style.statusText">
        <span>{{ daycareInfo.status }}</span>
        <span v-if="daycareInfo.currentWaitlistCount" :class="$style.gapBar">|</span>
        <span v-if="daycareInfo.currentWaitlistCount" :class="$style.currentWait">{{ $t('daycare.currentwait') }}{{ daycareInfo.currentWaitlistCount }}</span>
      </div>
    </div>
    <IconShare :class="$style.shareIcon" />
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

.statusText {
  color: var(--bb-color-gray-600);

  /* Webpage Text Styles/Additional Explanation */
  font-family: Noto Sans CJK TC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */

  display: flex;
  gap: 8px;
  align-items: center;
}

.currentWait {
  position: relative;

  &:before {
    position: absolute;
    content: '';
  }
}

.shareIcon {
  cursor: pointer;
  margin: 4px;
}
</style>
