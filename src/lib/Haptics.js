const HAPTICS_PATTERNS = {
	rigid: [5],
};

/**
 * 使用 Web Vibration API 產生震動回饋
 *
 * - `rigid`: 微弱短暫地震動一下
 *
 * @param {String} patternName - pattern name
 * @example haptics('rigid');
 */
function haptics(patternName) {
	if (!HAPTICS_PATTERNS[patternName]) {
		return;
	}
	window.navigator?.vibrate?.(HAPTICS_PATTERNS[patternName]);
}

export default haptics;
