<script setup>
import router from '../router/index.js';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  divider: {
    type: Boolean,
    default: false,
  },
  editable:{
    type: Boolean,
    default: false,
  },
  editableRouterName:{
    type: String,
  },
});

const handleClick = () => {
  router.push( {'name': props.editableRouterName} )
}

</script>

<template>
  <div class="flex flex-col gap-2 " :class="$style.title">
    <div class="flex justify-between">
      <h1 class="">
        {{ text }}
      </h1>
      <span v-if="editable" 
        @click="handleClick"
        class="text-sm">
        <a href="">編輯</a>
      </span>
    </div>
      
    <div v-if="divider" :class="$style.divider"></div>
  </div>
  
</template>

<style module>
.title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.6;
  color: var(--bb-color-black);
}

.divider {
  height: 1px;
  background: var(--bb-color-gray-200);
}
</style>
