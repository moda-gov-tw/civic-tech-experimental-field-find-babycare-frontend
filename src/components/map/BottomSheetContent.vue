<template>
	<section class="bottom-sheet__content">
		<!-- below header -->
		<div
			v-if="$slots['below-header']"
			class="bottom-sheet__below-header"
		>
			<slot name="below-header" />
		</div>
		<!-- body -->
		<div
			ref="body"
			class="bottom-sheet__body"
			:class="{
				'bottom-sheet__body--scroll-at-top': isScrollAtTop,
				'bottom-sheet__body--scroll-at-bottom': isScrollAtBottom,
			}"
		>
			<slot name="body" />
		</div>
		<!-- above-footer -->
		<div
			v-if="$slots['footer'] && $slots['above-footer']"
			class="bottom-sheet__above-footer"
		>
			<slot name="above-footer" />
		</div>
		<!-- footer -->
		<div
			v-if="$slots['footer']"
			class="bottom-sheet__footer"
		>
			<div class="bottom-sheet__footer-container">
				<slot name="footer" />
			</div>
		</div>
	</section>
</template>

<!-- This is a private component, do not use directly in your project -->

<script>
export default {
	data() {
		return {
			isScrollAtTop: true,
			isScrollAtBottom: true,
			mutationObserver: null,
		};
	},
	mounted() {
		window.addEventListener('resize', this.detectBodyScrollPosition);
		this.$refs.body.addEventListener('scroll', this.detectBodyScrollPosition);

		// observe dom mutation in bottom sheet body
		if (window.MutationObserver) {
			this.mutationObserver = new MutationObserver(() => {
				this.detectBodyScrollPosition();
			});
			this.mutationObserver.observe(this.$el, {
				childList: true,
				characterData: true,
				subtree: true,
			});
		}

		this.detectBodyScrollPosition();
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.detectBodyScrollPosition);
		this.$refs.body.removeEventListener('scroll', this.detectBodyScrollPosition);
		this.mutationObserver.disconnect();
	},
	methods: {
		detectBodyScrollPosition() {
			const contentBody = this.$refs.body;
			const scrollTop = contentBody.scrollTop;
			this.isScrollAtTop = scrollTop <= 0;
			this.isScrollAtBottom = scrollTop >= (contentBody.scrollHeight - contentBody.clientHeight);
		},
	},
}
</script>
