const NAVIGATION_GESTURE_SENSITIVE_AREA = 30;
let currentTargetElement;

const onTouchStart = (e) => {
	if (e.pageX < NAVIGATION_GESTURE_SENSITIVE_AREA || e.pageX > window.innerWidth - NAVIGATION_GESTURE_SENSITIVE_AREA) {
		e.preventDefault();
	}
}

/**
 * 啟用阻擋瀏覽器的 navigation gesture，當使用者在螢幕邊緣操作時可以避免 swipe 手勢觸發瀏覽器的上下頁，導致不小心離開當前的頁面。
 * @param {Element} targetElement - 指定阻擋 navigation gesture 的對象，touch start event 發生在 target element 時才會阻擋 navigation gesture
 * @example
 * blockNavigationGesture(document.getElementById('banner-image-carousel'));
 * @see {@link https://pqina.nl/blog/blocking-navigation-gestures-on-ios-13-4|Blocking Navigation Gestures on iOS Safari}
 */
export function blockNavigationGesture(targetElement) {
	if (!targetElement) {
		return;
	}
	if (currentTargetElement && !currentTargetElement.isSameNode(targetElement)) {
		unblockNavigationGesture();
	}
	targetElement.addEventListener('touchstart', onTouchStart);
	currentTargetElement = targetElement;
}

/**
 * 解除阻擋瀏覽器的 navigation gesture
 * @example
 * unblockNavigationGesture();
 */
export function unblockNavigationGesture() {
	if (!currentTargetElement) {
		return;
	}
	currentTargetElement.removeEventListener('touchstart', onTouchStart);
	currentTargetElement = null;
}
