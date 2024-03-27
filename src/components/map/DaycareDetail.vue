<template>
  <component
    :is="wrapper"
    :is-open="isOpen"
    :title="'title'"
    @toggle="$emit('toggle')"
    @close="$emit('close')"
  >
    <template #body>
      <div :class="$style.daycareDetail" class="grid gap-6">
        <DaycareDetailHeader :daycare-info="daycareInfo" />
        <img
          width="358"
          height="190"
          v-if="daycareInfo.daycarePhotoUrl"
          :src="daycareInfo.daycarePhotoUrl"
          :alt="daycareInfo.name"
          :class="$style.photo"
        >
        <div v-if="daycareInfo.currentWaitlistCount || daycareInfo.facebookUrl" class="flex gap-3">
          <RouterLink
            v-if="daycareInfo.currentWaitlistCount"
            :to="{ name: 'waitlist', params: { daycareID: daycareInfo.id } }"
          >
            <NormalButton class="flex-auto" :text="$t('button.see_waitlist')" isGhost />
          </RouterLink>
          <a v-if="daycareInfo.facebookUrl" :href="daycareInfo.facebookUrl" target="_blank">
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
    ? defineAsyncComponent(() => import('./SidePanel.vue')) // desktop
    : defineAsyncComponent(() => import('./BottomSheet.vue')); // mobile
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
  display: grid;
  gap: 6;
  padding: 24px 16px;
  overflow: auto;

  @media (min-width: 768px) {
    padding: 0;
  }
}

.photo {
  object-fit: contain;
}
</style>
