<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  isGhost: {
    type: Boolean,
    default: false,
  },
  isAddButton:{
    type: Boolean,
    default: false,
  },
  isExternalLink:{
    type: Boolean,
    default: false,
  },
  externalLink:{
    type: String,
    default: '',
  }
});
</script>

<template>
  <button 
    :class="[
      $style.btn, 
      isGhost && $style.isGhost,
      isAddButton && $style.isAddButton
    ]">
      <div 
        v-if="isAddButton" 
        class="flex justify-center">
        <img 
          class="mr-2"
          src="./icons/plus-circule.svg" alt=""> {{ text }}
      </div>

      <div 
        v-else-if="isExternalLink" 
        class="flex justify-center">
        <img 
          class="mr-2"
          src="./icons/external-link.svg" alt="">
          <a :href="externalLink" target="_blank">{{ text }}</a> 
      </div>

      <span v-else>
         {{ text }} 
      </span>
      
      
    </button>
</template>

<style module>
.btn {
  width: 100%;
  background: var(--bb-color-orange-700);
  color: var(--bb-color-white);
  padding: 8px 16px;
  border-radius: 6px;
}

.isGhost {
  background: transparent;
  color: var(--bb-color-orange-700);
  border: 1px solid var(--bb-color-orange-700);
}

.isAddButton{
  color: var(--bb-color-orange-700);
  border-radius: 6px;
  border: 1px solid var(--orange-orange-700, #C2410C);
  background: var(--white, #FFF);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

a:hover{
  text-decoration: none;
}
</style>
