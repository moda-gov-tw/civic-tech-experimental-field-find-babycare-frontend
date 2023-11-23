<template>
  <a
		:href="link"
    role="button"
  >
		<span :class="$style.text">
			{{ text }}
		</span>
  </a>
</template>

<script setup>
defineProps({
  link: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<style module>
.text {
  color: var(--bb-color-orange-700);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
}
</style>

