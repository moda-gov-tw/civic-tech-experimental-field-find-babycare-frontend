import { useEventListener } from "./useEventListener";
import { ref } from 'vue';

/**
 * @see https://logaretm.com/blog/my-favorite-5-vuejs-composables/#useeventlistener
 */
export function useMedia(query) {
  const mediaQuery = window.matchMedia(query);
  const matches = ref(mediaQuery.matches);
  useEventListener(mediaQuery, 'change', (e) => {
    matches.value = e.matches;
  });
  return matches;
}
