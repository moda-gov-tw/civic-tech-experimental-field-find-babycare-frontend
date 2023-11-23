<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n';
import MenuLogo from '../logos/MenuLogo.vue'
import IconTitle from './icons/IconTitle.vue';
import IconMenu from './icons/IconMenu.vue';
import {
  Dialog,
  DialogPanel,
} from '@headlessui/vue'

import { XMarkIcon } from '@heroicons/vue/24/outline';

import MenuDropdown from "@/components/menu/MenuDropdown.vue";
import MenuDropdownItem from "@/components/menu/MenuDropdownItem.vue";

import MobileMenuDropDown from "@/components/menu/MobileMenuDropDown.vue";
import MobileMenuDropDownItem from "@/components/menu/MobileMenuDropDownItem.vue";

import { useMenuStore } from '../stores/menu.js';
import { storeToRefs } from 'pinia';

const store = useMenuStore();
const {
  isMobileMenuOpen,
} = storeToRefs(store);
const {
  openMobileMenu,
  closeMobileMenu,
} = store;

const { t } = useI18n();

const menus = computed(() => [
  {
    name: t('header.instruction'),
    subnav: [
      { name: t('header.instruction_download'), href: '#' },
      { name: t('header.template_sample'), pageName: 'documents' },
    ],
    href: '#',
  },
  { name: t('header.application_management'), pageName: 'applications.approval' },
  { name: t('header.enrollment_management'), pageName: 'enrollment.approval' },
  { name: t('header.daycare_management'), pageName: 'daycares.info' },
]);
</script>

<template>
  <header class="bg-primary text-white">
    <nav
      class="flex justify-between lg:justify-start items-center px-6 py-4 md:py-3 md:px-8 gap-6 text-sm"
      aria-label="Global"
    >
      <!-- 電腦版 Menu  -->
      <RouterLink :to="{ name: 'home' }" class="flex gap-3 items-center text-white hover:text-white">
        <MenuLogo class="mr-3" />
        <IconTitle />
      </RouterLink>

      <MenuDropdown v-for="menu in menus"
        :label="menu.name"
        :hasSubnav="!!menu['subnav']"
        :key="menu.name"
        v-bind="menu"
      >
        <template v-if="menu['subnav']">
          <MenuDropdownItem
            v-for="item in menu['subnav']"
            :key="item.name"
            :name="item.name"
            v-bind="item"
          />
        </template>
      </MenuDropdown>
      <!-- 電腦版 Menu -->

      <!-- 手機版 Menu  -->
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="openMobileMenu"
        >
          <IconMenu class="text-white" aria-hidden="true" />
        </button>
      </div>
    </nav>

    <!-- 手機版 Menu  -->
    <Dialog as="div" class="lg:hidden" @close="closeMobileMenu" :open="isMobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-0 z-10 overflow-y-auto bg-white">
        <div class="flex items-center justify-between sticky top-0 bg-primary px-6 py-4">
          <MenuLogo />
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="closeMobileMenu">
            <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>

        <div class="mt-3 text-lg">
          <MobileMenuDropDown
            v-for="menu in menus"
            :key="menu.name"
            :label="menu.name"
            :hasSubnav="!!menu['subnav']"
            :open="isMobileMenuOpen"
            v-bind="menu"
          >
            <template v-if="menu['subnav']">
              <MobileMenuDropDownItem
                v-for="item in menu['subnav']"
                :key="item.name"
                :name="item.name"
                :href="item.href"
                v-bind="item"
              />
            </template>
          </MobileMenuDropDown>
        </div>
      </DialogPanel>
    </Dialog>
    <!-- 手機版 Menu -->
  </header>
</template>
