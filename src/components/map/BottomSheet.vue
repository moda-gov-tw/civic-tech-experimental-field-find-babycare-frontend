<template>
  <div
    class="bottom-sheet"
    :class="{
      'bottom-sheet--open': isOpen,
      'bottom-sheet--full-height': isFullHeight,
    }"
  >
    <div ref="overlay" class="bottom-sheet__overlay" />
    <div ref="fixedWrapper" class="bottom-sheet__fixed-wrapper">
      <div class="bottom-sheet__top-spacer" @click="$emit('close')" />
      <div ref="sheet" class="bottom-sheet__sheet">
        <slot name="content">
          <BottomSheetContent ref="content">
            <template #below-header>
              <slot name="below-header" />
            </template>
            <template #body>
              <slot name="body" />
            </template>
            <template #above-footer>
              <slot name="above-footer" />
            </template>
            <template #footer>
              <slot name="footer" />
            </template>
          </BottomSheetContent>
        </slot>
        <div ref="handle" class="bottom-sheet__handle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import BottomSheetContent from './BottomSheetContent.vue';
import { blockNavigationGesture, unblockNavigationGesture } from '../../lib/navigationGestureBlock.js';
import { lockBodyScroll, unlockBodyScroll } from '../../lib/bodyScrollLock.js';
import throttleByAnimationFrame from '../../lib/throttleByAnimationFrame.js';
import haptics from '../../lib/Haptics.js';

const BOTTOM_SHEET_STATE = 'BOTTOM_SHEET_STATE';

export default {
  components: {
    BottomSheetContent,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    isFullHeight: {
      type: Boolean,
      default: false,
    },
    isHistoryBackToClose: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      unsetSwipingGesture: null,
    };
  },
  watch: {
    isOpen: {
      handler() {
        nextTick(() => {
          this.isOpen ? this.onOpen() : this.onClose();
        });
      },
      immediate: true,
    },
  },
  methods: {
    addHistoryBackHandler() {
      if (!this.isHistoryBackToClose) {
        return;
      }
      window.history.pushState(BOTTOM_SHEET_STATE, null);
      window.addEventListener('popstate', this.popStateHandler);
    },
    removeHistoryBackHandler() {
      if (!this.isHistoryBackToClose) {
        return;
      }
      window.removeEventListener('popstate', this.popStateHandler);
      if (window.history.state === BOTTOM_SHEET_STATE) {
        window.history.back();
      }
    },
    onOpen() {
      // setup
      this.addHistoryBackHandler();
      this.unsetSwipingGesture = this.setSwipingGesture();
      lockBodyScroll();
      blockNavigationGesture(this.$el);

      // open
      this.$emit('opening');
      this.$refs.fixedWrapper.addEventListener('transitionend', () => {
        this.$emit('opened');
      }, { once: true })
    },
    onClose() {
      // unset
      this.removeHistoryBackHandler();
      this.unsetSwipingGesture && this.unsetSwipingGesture();
      unblockNavigationGesture();
      // unlock after history pop state to prevent window from scrolling back to last # anchor
      setTimeout(unlockBodyScroll, 0);

      // close
      this.$emit('closing');
      this.clearSwipingStyle();
      this.$refs.fixedWrapper.addEventListener('transitionend', () => {
        this.$emit('closed');
      }, { once: true })
    },
    clearSwipingStyle() {
      this.$refs.fixedWrapper.style.transition = '';
      this.$refs.fixedWrapper.style.transform = '';
      this.$refs.overlay.style.transition = '';
      this.$refs.overlay.style.opacity = '';
    },
    popStateHandler() {
      if (this.isOpen) {
        // close bottom sheet when history back
        this.$emit('close');
      }
    },
    scrollToElement() {
      this.$refs.content.scrollToElement(...arguments);
    },
    setSwipingGesture() {
      let canDragDown;
      let canDragUp;
      let currentPoint;
      let deltaY;
      let isDraggingDown;
      let isDraggingUp;
      let isSwipingVertically;
      let isTheFirstTouchmove;
      let isLastMoveSwipingDown;
      let lastPoint;
      let startPoint;
      let startTime;
      let swipingSpeed;
      let isCloseable;
      let closeThresholdDistance;
      let shouldVibrateWhenPassCloseThreshold;
      const bottomSheet = this.$el;
      const handle = this.$refs.handle;
      const bottomSheetComputedStyle = getComputedStyle(bottomSheet);
      const fixedWrapper = this.$refs.fixedWrapper;
      const overlay = this.$refs.overlay;

      const onTouchStart = (e) => {
        const bottomSheetBody = e.target.classList.contains('bottom-sheet__body') ? e.target : e.target.closest('.bottom-sheet__body');
        const isTouchOnBody = !!bottomSheetBody;
        const checkScrollInBodyAtTop = (node) => {
          if (!node) {
            return false;
          }
          if (node.scrollHeight > node.clientHeight && node.scrollTop !== 0) {
            return false;
          }
          return node.isSameNode(bottomSheetBody) ? true : checkScrollInBodyAtTop(node.parentNode);
        };
        const checkScrollInBodyAtBottom = (node) => {
          if (!node) {
            return false;
          }
          if (node.scrollHeight > node.clientHeight && node.scrollTop !== (node.scrollHeight - node.clientHeight)) {
            return false;
          }
          return node.isSameNode(bottomSheetBody) ? true : checkScrollInBodyAtBottom(node.parentNode);
        };

        deltaY = 0;
        isLastMoveSwipingDown = isSwipingVertically = isDraggingDown = isDraggingUp = false;
        isTheFirstTouchmove = true;
        canDragDown = !isTouchOnBody || checkScrollInBodyAtTop(e.target);
        canDragUp = !isTouchOnBody || checkScrollInBodyAtBottom(e.target);
        startPoint = lastPoint = currentPoint = e.touches[0];
        startTime = performance.now();
        isCloseable = false;
        closeThresholdDistance = Math.min(this.$refs['sheet'].offsetHeight * parseFloat(bottomSheetComputedStyle.getPropertyValue('--close-by-swiping-down-threshold-ratio')), parseInt(bottomSheetComputedStyle.getPropertyValue('--close-by-swiping-down-threshold-distance')));
        shouldVibrateWhenPassCloseThreshold = true;
      };

      const onTouchMove = (e) => {
        if (!canDragDown && !canDragUp) {
          return;
        }

        lastPoint = currentPoint;
        currentPoint = e.touches[0];
        deltaY = currentPoint.clientY - startPoint.clientY;
        isLastMoveSwipingDown = currentPoint.clientY > lastPoint.clientY;
        if (isTheFirstTouchmove) {
          isSwipingVertically = Math.abs(currentPoint.clientX - lastPoint.clientX) < Math.abs(currentPoint.clientY - lastPoint.clientY);
          isDraggingDown = isSwipingVertically && canDragDown && deltaY > 0;
          isDraggingUp = isSwipingVertically && canDragUp && deltaY < 0;
          isTheFirstTouchmove = false;
        }

        if (!isDraggingDown && !isDraggingUp) {
          return;
        }

        e.preventDefault();
        handleDraggingTransform();
      };

      const handleDraggingTransform = throttleByAnimationFrame(() => {
        if (isDraggingDown) {
          swipingSpeed = deltaY / ((performance.now() - startTime) / 1000);
          isCloseable = isLastMoveSwipingDown && (deltaY > closeThresholdDistance || swipingSpeed > parseInt(bottomSheetComputedStyle.getPropertyValue('--close-by-swiping-down-threshold-speed')));
          if (isCloseable && shouldVibrateWhenPassCloseThreshold) {
            haptics('rigid');
            shouldVibrateWhenPassCloseThreshold = false;
          } else if (!isCloseable && deltaY < closeThresholdDistance) {
            shouldVibrateWhenPassCloseThreshold = true;
          }

          // 往下滑收合 bottom sheet
          fixedWrapper.style.transform = 'translateY(' + Math.max(deltaY, 0) + 'px)';
          fixedWrapper.style.transition = 'none';
          overlay.style.opacity = `${ Math.max(
            // computed
            parseFloat(bottomSheetComputedStyle.getPropertyValue('--overlay-opacity'))
            - deltaY / closeThresholdDistance * (parseFloat(bottomSheetComputedStyle.getPropertyValue('--overlay-opacity')) - parseFloat(bottomSheetComputedStyle.getPropertyValue('--overlay-drag-down-min-opacity'))),
            // min
            parseFloat(bottomSheetComputedStyle.getPropertyValue('--overlay-drag-down-min-opacity'))
          ) }`;
          overlay.style.transition = 'none';
        }
        if (isDraggingUp) {
          // 往上滑的反饋
          fixedWrapper.style.transform = 'translateY(-' + Math.pow(-Math.min(deltaY, 0), (1 - parseFloat(bottomSheetComputedStyle.getPropertyValue('--drag-up-stickiness')))) + 'px)';
          fixedWrapper.style.transition = 'none';
        }
      });

      const onTouchEnd = () => window.requestAnimationFrame(() => {
        if (!isDraggingDown && !isDraggingUp) {
          return;
        }
        if (isCloseable) {
          // close bottom sheet
          bottomSheet.style.setProperty('--open-close-transition-duration', bottomSheetComputedStyle.getPropertyValue('--open-close-transition-duration-after-swipe'));
          this.$refs.fixedWrapper.addEventListener('transitionend', () => {
            bottomSheet.style.setProperty('--open-close-transition-duration', '');
          }, { once: true });
          this.$emit('close');
          // 如果 parent 沒有馬上將 isOpen 設為 false，將 bottom sheet 恢復為展開狀態
          setTimeout(() => this.isOpen && this.clearSwipingStyle(), 0);
        } else {
          // transition back to fully open position
          this.clearSwipingStyle();
        }
      });

      bottomSheet.addEventListener('touchstart', onTouchStart);
      bottomSheet.addEventListener('touchmove', onTouchMove, { passive: false }); // set passive to false, 表示 touchmove event listener 可能會使用 preventDefault
      bottomSheet.addEventListener('touchend', onTouchEnd);

      return () => { // unsetSwipingGesture
        bottomSheet.removeEventListener('touchstart', onTouchStart);
        bottomSheet.removeEventListener('touchmove', onTouchMove);
        bottomSheet.removeEventListener('touchend', onTouchEnd);
      };
    },
  },
}
</script>

<style>
.bottom-sheet {
  --bottom-overlay-min-height: 16px;
  --color-background-surface-dark: #d5d6db;
  --color-text-darker: #212121;
  --color-border-light: #d5d6db;
  --radius-xl: 16px;
  --spacing-1: 2px;
  --spacing-2: 4px;
  --spacing-3: 8px;
  --spacing-4: 12px;
  --spacing-5: 16px;
  --spacing-6: 20px;
  --spacing-7: 24px;
  --spacing-8: 32px;
  --spacing-9: 40px;
  --spacing-10: 48px;
  /* // some css variables are used in component js, edit/remove with caution */
  /* // 開啟/關閉 bottom sheet 的動畫時間（秒） */
  --open-close-transition-duration: .4s;
  /* // 用滑動手勢關閉 bottom sheet 的動畫時間（秒） */
  --open-close-transition-duration-after-swipe: .3s;
  /* // 滑動內容時 body border top 顯示/消失的動畫時間（秒） */
  --body-border-top-transition-duration: .1s;
  /* // bottom sheet 背後 overlay 的透明度（0 ~ 1） */
  --overlay-opacity: 0.48;
  /* // 用滑動手勢收合 bottom sheet 時背後 overlay 透明度的最小值（0 ~ 1） */
  --overlay-drag-down-min-opacity: 0.24;
  /* // 用滑動手勢往上滑動 bottom sheet 的黏著度（0 ~ 1） */
  --drag-up-stickiness: 0.3;
  /* // 用滑動手勢收合 bottom sheet 的最小觸發距離門檻（px） */
  --close-by-swiping-down-threshold-distance: 200px;
  /* // 用滑動手勢收合 bottom sheet 的最小 bottom sheet 比例（ratio） */
  --close-by-swiping-down-threshold-ratio: 0.33;
  /* // 用滑動手勢收合 bottom sheet 的最小速度（px/s） */
  --close-by-swiping-down-threshold-speed: 1000;
  /* // z-index */
  --bottom-sheet-z-index: 1000;

  .bottom-sheet__fixed-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    display: grid;
    grid-template-rows: minmax(var(--bottom-overlay-min-height), 1fr) auto;
    grid-template-areas:
      'top-spacer'
      'sheet';
    visibility: hidden;
    will-change: transform;
    transform: translateY(100%);
    transition: transform var(--open-close-transition-duration), visibility 0s var(--open-close-transition-duration);
    z-index: calc(var(--bottom-sheet-z-index) + 1);

    /* // append a white space for overscroll at bottom */
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 500px;
      background-color: var(--bb-color-white);
    }
  }
  .bottom-sheet--full-height .bottom-sheet__fixed-wrapper {
    grid-template-rows: var(--bottom-overlay-min-height) 1fr;
  }
  .bottom-sheet__top-spacer {
    grid-area: top-spacer;
  }
  .bottom-sheet__sheet {
    grid-area: sheet;
    display: grid;
    grid-template-rows: auto auto minmax(0, 1fr);
    grid-template-areas:
      'handle'
      'header'
      'content';
    min-height: 240px;
    padding-bottom: env(safe-area-inset-bottom, 0);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    background-color: var(--bb-color-white);
    overflow: hidden;
  }

  .bottom-sheet__overlay {
    visibility: hidden;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: #000;
    will-change: opacity;
    transition: opacity var(--open-close-transition-duration), visibility 0s var(--open-close-transition-duration);
    z-index: var(--bottom-sheet-z-index);
  }

  .bottom-sheet__handle {
    --handle-height: 4px;

    grid-area: handle;
    width: 40px;
    height: var(--handle-height);
    border-radius: calc(var(--handle-height) * 0.5);
    background-color: var(--color-background-surface-dark);
    margin: var(--spacing-3) auto;
  }

  /* // header, including: title, icon ,link */
  --header-link-width: 64px;
  .bottom-sheet__header {
    grid-area: header;
    color: var(--color-text-darker);
    background-color: var(--color-white);
  }
  .bottom-sheet__title-grid {
    display: grid;
    grid-template-columns: var(--header-link-width) 1fr var(--header-link-width);
    gap: var(--spacing-3);
    padding: var(--spacing-4) var(--spacing-7);
    align-items: center;
  }
  .bottom-sheet__icon-button {
    justify-self: left;
    cursor: pointer;
    user-select: none;

    /* // increase clickable area */
    box-sizing: content-box;
    padding: 4px;
    margin: -4px;
  }
  .bottom-sheet__title {
    /* @include text-style('subtitle-lg'); */
    /* @include text-ellipsis; */
    text-align: center;
  }
  .bottom-sheet__link {
    /* @include text-style('body-md'); */
    /* @include text-ellipsis; */
    cursor: pointer;
    color: var(--color-text-darker);
    text-decoration: underline;
    justify-self: right;
    max-width: var(--header-link-width);
  }

  /* // content includes: below-header, body, above-footer, footer */
  .bottom-sheet__content {
    grid-area: content;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto auto;
    grid-template-areas:
      'below-header'
      'body'
      'above-footer'
      'footer';
    background-color: var(--bb-color-white);
  }

  .bottom-sheet__below-header {
    grid-area: below-header;
  }

  .bottom-sheet__body {
    grid-area: body;
    overflow: auto;
    border-top: 1px solid var(--color-border-light);
    transition: border-color var(--body-border-top-transition-duration) ease;
  }

  .bottom-sheet__body--scroll-at-top {
    border-top-color: transparent;
  }

  .botttom-sheet__above-footer {
    grid-area: above-footer;
    border-top: 1px solid var(--color-border-light);
  }

  .bottom-sheet__footer {
    grid-area: footer;
    border-top: 1px solid var(--color-border-light);
  }

  .bottom-sheet__footer-container {
    padding: var(--spacing-5) var(--spacing-7);
  }

  .bottom-sheet__above-footer + .bottom-sheet__footer {
    border-top: none;
  }
}
/* // open */
.bottom-sheet--open > .bottom-sheet__fixed-wrapper {
  visibility: visible;
  transform: translateY(0);
  transition: transform var(--open-close-transition-duration), visibility 0s;
}
.bottom-sheet--open > .bottom-sheet__overlay {
  opacity: var(--overlay-opacity);
  visibility: visible;
  transition: opacity var(--open-close-transition-duration), visibility 0s;
}
</style>
