<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

defineProps({
  label: {
    type: String,
    required: false
  },
  placeholder:{
    type: String,
    default: '請選擇日期',  
  }
})

const date = ref()

</script>

<template>
  <div class="grid gap-2">
    <label class="block text-sm font-medium leading-6">{{ label }}</label>
    <VueDatePicker 
      v-model="date"
      :placeholder="placeholder"
      class="text-sm font-medium leading-6" >
    </VueDatePicker>
  </div>
</template>

<style>
 :root{
    --dp-font-size: 0.875rem;
 }
</style>

