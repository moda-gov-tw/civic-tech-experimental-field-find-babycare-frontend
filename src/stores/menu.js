import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const isMobileMenuOpen = ref(false);

  function openMobileMenu() {
    isMobileMenuOpen.value = true;
  }
  function closeMobileMenu() {
    isMobileMenuOpen.value = false;
  }

  return {
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
  };
});
