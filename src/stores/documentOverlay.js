import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOverlayStore = defineStore('overlay', () => {
  const isOverlayOpen = ref(false);

  const OverlayName = ref('');
  const OverlayInpersonExternalLink = ref('');
  const OverlayOnlineExternalLink = ref('');
  const OverlayImage = ref('');

  function openOverlay(document) {
    isOverlayOpen.value = true;

    OverlayName.value = document['i18Name'];
    OverlayInpersonExternalLink.value = document['popupInstruction']['inPersonURL'];
    OverlayOnlineExternalLink.value = document['popupInstruction']['onlineURL'];
    OverlayImage.value = document['popupInstruction']['image'];
  }
  function closeOverlay() {
    isOverlayOpen.value = false;
  }

  return {
    isOverlayOpen,
    OverlayName,
    OverlayInpersonExternalLink,
    OverlayOnlineExternalLink,
    OverlayImage,

    openOverlay,
    closeOverlay,
  };
});
