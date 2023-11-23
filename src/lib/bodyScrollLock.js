let bodyScrollTopOnLock;
const syncDocumentHeight = () => {
	document.documentElement.style.height = `${ window.innerHeight }px`;
};

/**
 * 利用 position fixed 將 body 的畫面固定在當前 scroll 的位置，解鎖時再將 scroll 的位置重新設回 window （參考 Airbnb modal 的做法）
 * @example
 * lockBodyScroll();
 */
export function lockBodyScroll() {
	bodyScrollTopOnLock = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	document.body.style.overflow = 'hidden';
	document.body.style.position = 'fixed';
	document.body.style.top = `${ -bodyScrollTopOnLock }px`;
	document.body.style.bottom = '0';
	document.body.style.left = '0';
	document.body.style.right = '0';
	syncDocumentHeight();
	window.addEventListener('resize', syncDocumentHeight);
}

/**
 * 解鎖 body scroll
 * @example
 * unlockBodyScroll();
 */
export function unlockBodyScroll() {
	window.removeEventListener('resize', syncDocumentHeight);
	document.body.style.overflow = '';
	document.body.style.position = '';
	document.body.style.top = '';
	document.body.style.bottom = '';
	document.body.style.left = '';
	document.body.style.right = '';
	document.documentElement.style.height = '';
	document.documentElement.style.scrollBehavior = 'auto'; // avoid CSS scroll-behavior `smooth` transition
	window.scrollTo(0, bodyScrollTopOnLock);
	document.documentElement.style.scrollBehavior = '';
}

/**
 * Reference
 * - https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
 */
