<template>
  <div
    :class="[
      $style.sidePanel,
      isOpen && $style.open,
    ]"
  >
    <div
      :class="$style.collapseButton"
      @click="$emit('toggle')"
    >
      <IconChevronRight
        :class="[
          !isOpen && $style.iconReverse,
        ]"
      />
    </div>
    <div
      class="p-7"
      :class="$style.contentScroller"
    >
      <slot name="body" />
    </div>
  </div>
</template>

<script setup>
import IconChevronRight from '../icons/IconChevronRight.vue';

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
</script>

<style module>
.sidePanel {
  --side-panel-width: 395px;

  position: absolute;
  z-index: 2;
  top: 0;
  right: calc(0px - var(--side-panel-width));
  bottom: 0;
  height: 100%;
  background: var(--bb-color-white);
  width: var(--side-panel-width);
  max-width: 100%;
  max-height: 100%;
  transition: transform .2s ease-in-out;

  &.open {
    transform: translateX(calc(0px - var(--side-panel-width)));
  }

  @media (min-width: 768px) {
    /* TODO: hardcoded 52px */
    top: 52px;
    max-height: calc(100% - 52px);
  }
}

.collapseButton {
  --width: 40px;

  position: absolute;
  top: 60px;
  left: calc(0px - var(--width));
  width: var(--width);
  height: 77px;
  background-color: var(--bb-color-white);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,.25);
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.iconReverse {
  transform: rotate(-180deg);
}

.contentScroller {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
