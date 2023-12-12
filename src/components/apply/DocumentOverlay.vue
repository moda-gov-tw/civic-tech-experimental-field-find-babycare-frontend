<template>
  <TransitionRoot as="template" :show="isOverlayOpen">
    <Dialog :class="$style.dialog" as="div" class="relative z-10" @close="isOverlayOpen = false">

      <TransitionChild 
        as="template" 
        enter="ease-out duration-300" 
        enter-from="opacity-0" 
        enter-to="opacity-100" 
        leave="ease-in duration-200" 
        leave-from="opacity-100" 
        leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" 
            enter="ease-out duration-300" 
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
            enter-to="opacity-100 translate-y-0 sm:scale-100" 
            leave="ease-in duration-200" 
            leave-from="opacity-100 translate-y-0 sm:scale-100" 
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-5 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              
              <div class="mb-5">
                <div class="flex justify-between">
                  <h1 :class="$style.title">{{$t(OverlayName)}}</h1>
                  <img
                    :class="$style.closeIcon"
                    @click="closeOverlay" 
                    src="../icons/delete.svg"
                  >
                </div>
                
                <div :class="$style.divider"></div>
                
              </div>

              <div class="flex justify-center">
                <img 
                  :class="$style.image"
                  :src="getImageUrl(OverlayImage)"
                >
              </div>

              <div class="mt-5 sm:mt-6">
                <FullButton 
                  isGhost
                  isExternalLink
                  :externalLink="OverlayOnlineExternalLink"
                  :text="$t('button.get_online')" 
                />
                <FullButton 
                  class="mt-4"
                  isGhost
                  isExternalLink
                  :externalLink="OverlayInpersonExternalLink"
                  :text="$t('button.get_inperson')" 
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useOverlayStore } from '../../stores/documentOverlay';

import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import FullButton from '../FullButton.vue';

const overlayStore = useOverlayStore();
const {
  isOverlayOpen,
  OverlayName,
  OverlayInpersonExternalLink,
  OverlayOnlineExternalLink,
  OverlayImage,
} = storeToRefs(overlayStore);

const { 
  closeOverlay,
} = overlayStore;

const getImageUrl = (name) => {
  return new URL(`../../images/${name}`, import.meta.url).href
}

</script>

<style module>
.dialog{
  height:60vh;
  /* width:500px; */
  border:1px solid red;

}
.title {
  color: var(--black, #111827);
  font-family: Noto Sans CJK TC;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 177.778% */
}

.closeIcon{
  cursor: pointer;
  width:15px;
}

.divider {
  height: 1px;
  background: var(--bb-color-gray-200);
}

.image {
  width: 135px;
  height: 160px;
  background: url(../../images/document_x.png), lightgray 50% / cover no-repeat;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10);
}
</style>
