<template>
	<header class="bottom-sheet__header">
		<div class="bottom-sheet__title-grid">
			<div class="bottom-sheet__title">
				{{ title }}
			</div>
			<a
				v-if="link"
				class="bottom-sheet__link"
				@click="$emit('click:link')"
			>
				{{ link }}
			</a>
		</div>
	</header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: null,
  },
  link: {
    type: String,
    default: null,
  },
  isChildPage: {
    type: Boolean,
    default: false,
  },
});
</script>
