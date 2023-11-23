<script setup>
import { defineProps } from 'vue'

defineProps({
  text: {
    type: String,
    default: null,
  },
});

</script>

<template>
	<div class="relative flex flex-col items-center group p-1">

    <!-- question Mark -->
    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
    </svg>

    <!-- Tool Tip -->
		<div v-if="text" 
      class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
			<span 
        :class="$style.textArea"
        class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">{{ text }}</span>
			<div 
        :class="$style.arrow"
        class="w-3 h-3 -mt-2 rotate-4"></div>
		</div>
	</div>

</template>

<style module>

.textArea {
  width: 200px;
  border-radius: 5px;
  padding: 12px;
  background-color: #555555;
  line-height: 1.45;
}

.arrow {
  width: 0;
  height: 0;
  border-left: 10px solid transparent; /* $width: 10px; */
  border-right: 10px solid transparent; /* $width: 10px; */
  border-top: 8px solid #555555; /* $height: 8px; */
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -10px; /* margin-left: -$width; */
}

@media screen and (max-width: 700px) {
  .arrow {
    left: auto;
    right: 17px; /* Adjusted from SCSS logic */
  }
}


</style>