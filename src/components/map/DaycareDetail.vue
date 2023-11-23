<template>
  <component
    :is="wrapper"
    :is-open="isOpen"
    :title="'title'"
    @toggle="$emit('toggle')"
    @close="$emit('close')"
  >
    <template #content>
      <div :class="$style.daycareDetail">
        <DaycareDetailHeader :daycare-info="daycareInfo" />
        <img
          class="my-6"
          :src="daycareInfo.imageUrl"
          :alt="daycareInfo.name"
        >
        <div class="flex gap-3">
          <RouterLink :to="{ name: 'waitlist', params: { daycareID: daycareInfo.id } }">
            <NormalButton class="flex-auto" :text="$t('button.see_waitlist')" isGhost />
          </RouterLink>
          <a :href="daycareInfo.facebook" target="_blank">
            <NormalButton class="flex-auto" :text="$t('button.facebook')" isGhost />
          </a>
        </div>
        <DaycareDetailInfo
          :title="$t('daycare.basic_info')"
          :daycare-info="daycareInfo"
        />
      </div>
    </template>
  </component>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue';
import DaycareDetailHeader from './DaycareDetailHeader.vue';
import DaycareDetailInfo from './DaycareDetailInfo.vue';
import NormalButton from '../../components/NormalButton.vue';

const wrapper = computed(() => {
  return (window.innerWidth >= 768)
    ? defineAsyncComponent(() => import('./SidePanel.vue'))
    : defineAsyncComponent(() => import('./BottomSheet.vue'));
});

defineProps({
  daycareInfo: {
    type: Object,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits([
  'toggle',
  'close',
]);
</script>

<style module>
.daycareDetail {
  padding: 24px 16px;
  overflow: auto;
}
</style>
