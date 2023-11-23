/**
 * 依據裝置畫面更新的頻率 throttle function，省略畫面更新之間多餘的 function call，可以幫助提升動畫的效能
 * @param {Function} func - 需要 throttle 的 function
 * @returns {Function} throttled function
 * @example
 * window.addEventListener('scroll', ThrottleByAnimationFrame(() => {
 *   // update some UI when user is scrolling
 * }));
 */
function throttleByAnimationFrame(func = () => {}) {
	let isWaitingForNextAnimationFrame = false;
	return function() {
		if (isWaitingForNextAnimationFrame) {
			return;
		}
		isWaitingForNextAnimationFrame = true;
		const funcArguments = arguments;
		window.requestAnimationFrame(() => {
			func(...funcArguments);
			isWaitingForNextAnimationFrame = false;
		});
	};
}

export default throttleByAnimationFrame;
