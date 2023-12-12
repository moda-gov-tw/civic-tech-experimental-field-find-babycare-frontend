<script setup>
import { unref, computed } from 'vue'
import { useI18n } from 'vue-i18n';
import MenuLogo from '../logos/MenuLogo.vue'
import IconTitle from './icons/IconTitle.vue';
import IconMenu from './icons/IconMenu.vue';
import IconUserCircle from './icons/IconUserCircle.vue';
// import IconCog from './icons/IconCog.vue';
import IconLogout from './icons/IconLogout.vue';
import {
  Dialog,
  DialogPanel,
} from '@headlessui/vue'

import { XMarkIcon } from '@heroicons/vue/24/outline';

import MenuDropdown from "@/components/menu/MenuDropdown.vue";
import MenuDropdownItem from "@/components/menu/MenuDropdownItem.vue";

import MobileMenuDropdown from "@/components/menu/MobileMenuDropdown.vue";
import MobileMenuDropdownItem from "@/components/menu/MobileMenuDropdownItem.vue";

import { useMenuStore } from '../stores/menu.js';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const store = useMenuStore();
const {
  isMobileMenuOpen,
} = storeToRefs(store);
const {
  openMobileMenu,
  closeMobileMenu,
} = store;

const route = useRoute();
const { t } = useI18n();

const localeNav = computed(() => ({
  label: t('header.language'), // 語言選擇
  subnav: [
    { label: '繁體中文', routeName: route.name, routeParams: route.params, routeQuery: { locale: 'zh' } },
    { label: 'English', routeName: route.name, routeParams: route.params, routeQuery: { locale: 'en' } },
  ],
}));

const memberNav = computed(() => ({
  label: IconUserCircle,
  subnav: [
    // { label: t('header.account_setting'), routeName: 'accountSetting', leadingIcon: IconCog }, // 帳號設定
    { label: t('header.logout'), routeName: 'logout', leadingIcon: IconLogout }, // 登出
  ],
  hasChevronDownIcon: false,
  subNavPosition: 'right',
}));

const pagesNav = computed(() => ([
  { // 報名說明
    label: t('header.instruction'),
    subnav: [
      { label: t('header.instruction_download'), href: 'https://www.society.taichung.gov.tw/media/815560/%E8%87%BA%E4%B8%AD%E5%B8%82%E6%94%BF%E5%BA%9C%E7%A4%BE%E6%9C%83%E5%B1%80%E5%85%AC%E8%A8%AD%E6%B0%91%E7%87%9F%E6%89%98%E5%AC%B0%E4%B8%AD%E5%BF%83%E6%94%B6%E6%89%98%E8%A8%88%E7%95%AB-111%E5%B9%B47%E6%9C%881%E6%97%A5%E8%B5%B7%E9%81%A9%E7%94%A8.pdf' }, // 下載入托計劃文件
      // { label: t('header.template_sample'), routeName: 'documents' }, // 模板及範本
    ],
  },
  { label: t('header.my_application'), routeName: 'myApplications.drafts' }, // 我的報名
  { label: t('header.application_management'), routeName: 'applications.approval' }, // 報名管理
  // { label: t('header.daycare_management'), routeName: 'daycares.info' }, // 公托管理
  { label: t('header.enrollment_management'), routeName: 'enrollment.approval' }, // 入退托管理
  { label: t('header.about_platform'), href: 'https://findbabycare.notion.site/Project-Wiki-bdff28bb5de4409db4f7842df8296807' }, // 關於此平台
]));

const desktopMenu = computed(() => [
  ...unref(pagesNav),
]);

const mobileMenu = computed(() => [
  ...unref(pagesNav),
  { ...unref(localeNav) },
  ...unref(memberNav).subnav,
]);
</script>

<template>
  <header class="sticky top-0 z-50 bg-primary text-white">
    <nav class="flex justify-between px-6 py-4 lg:px-8 lg:py-3" aria-label="Global">
      <!-- desktop Menu  -->
      <div class="flex justify-start items-center gap-6 text-sm">
        <RouterLink
          :to="{ name: 'home' }"
          class="flex gap-3 items-center text-white hover:text-white"
        >
          <MenuLogo class="mr-3" />
          <IconTitle />
        </RouterLink>

        <MenuDropdown
          v-for="menu in desktopMenu"
          :hasSubnav="!!menu['subnav']"
          :key="menu.label"
          v-bind="menu"
        >
          <MenuDropdownItem
            v-for="item in menu['subnav']"
            :key="item.label"
            :name="item.label"
            v-bind="item"
          />
        </MenuDropdown>
      </div>
      <!-- /desktop Menu -->

      <!-- locale & member -->
      <div class="flex justify-start items-center gap-4">
        <!-- locale -->
        <MenuDropdown
          :hasSubnav="!!localeNav['subnav']"
          :key="localeNav.label"
          v-bind="localeNav"
        >
          <MenuDropdownItem
            v-for="item in localeNav['subnav']"
            :key="item.label"
            :name="item.label"
            v-bind="item"
          />
        </MenuDropdown>
        <!-- member -->
        <MenuDropdown
          :hasSubnav="!!memberNav['subnav']"
          :key="memberNav.label"
          v-bind="memberNav"
        >
          <MenuDropdownItem
            v-for="item in memberNav['subnav']"
            :key="item.label"
            :name="item.label"
            v-bind="item"
          />
        </MenuDropdown>
        <!-- mobile hamburger -->
        <div class="flex lg:hidden">
          <button
            type="button"
            class="p-2.5"
            @click="openMobileMenu"
          >
            <IconMenu class="text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>

    <!-- mobile Menu  -->
    <Dialog as="div" class="lg:hidden" @close="closeMobileMenu" :open="isMobileMenuOpen">
      <DialogPanel class="fixed inset-0 z-10 overflow-y-auto bg-white">
        <div class="flex items-center justify-between sticky top-0 bg-primary px-6 py-4">
          <MenuLogo />
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="closeMobileMenu">
            <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>

        <div class="mt-3 text-lg">
          <MobileMenuDropdown
            v-for="menu in mobileMenu"
            :key="menu.label"
            :label="menu.label"
            :hasSubnav="!!menu['subnav']"
            :open="isMobileMenuOpen"
            v-bind="menu"
          >
            <MobileMenuDropdownItem
              v-for="item in menu['subnav']"
              :key="item.label"
              :name="item.label"
              :href="item.href"
              v-bind="item"
            />
          </MobileMenuDropdown>
        </div>
      </DialogPanel>
    </Dialog>
    <!-- mobile Menu -->
  </header>
</template>
