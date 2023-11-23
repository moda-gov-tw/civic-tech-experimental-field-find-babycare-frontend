<template>
  <div class="p-6 grid gap-5" :class="$style.applicationList">
    <MainTitle 
      :text="mainTitle" 
      :editable="editable"
      :editableRouterName="editableRouterName"
      divider 
    />
    <Component
      v-for="item in list"
      :key="item.title"
      :is="applicantDisplayComponent"
      v-bind="item"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import MainTitle from '../../components/MainTitle.vue';
import ApplicantPdfDisplay from './ApplicantPdfDisplay.vue';
import ApplicantTextDisplay from './ApplicantTextDisplay.vue';

const props = defineProps({
  mainTitle: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
    validator: (val) => ['text', 'file'].includes(val),
  },
  list: {
    type: Array,
    default: () => [],
  },
  editable: {
    type: Boolean,
    default: false,
  },
  editableRouterName: {
    type: String,
    default: '',
  },
});

const applicantDisplayComponent = computed(() => {
  return props.type === 'text'
    ? ApplicantTextDisplay
    : ApplicantPdfDisplay;
});
</script>

<style module>
.applicationList {
  border-radius: 5px;
  background: var(--bb-color-gray-50);
}
</style>
