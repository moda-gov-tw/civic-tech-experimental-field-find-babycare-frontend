import en from './locales/en.json'
import zh from './locales/zh.json'
import { createI18n } from 'vue-i18n'

const loadLocaleMessages = () => ({ en, zh })
const localeMessages = loadLocaleMessages()
/**
 * @return {string}
 */
export const checkDefaultLocale = () => {
  const locales = Object.getOwnPropertyNames(localeMessages)
  let matched = null

  locales.forEach(lang => {
    if (lang === navigator.language) {
      matched = lang
    }
  })
  if (!matched) {
    locales.forEach(lang => {
      let languagePartials = navigator.language.split('-')[0]
      if (lang === languagePartials) {
        matched = lang
      }
    })
  }
  if (!matched) {
    locales.forEach(lang => {
      let languagePartials = navigator.language.split('-')[0]
      if (lang.split('-')[0] === languagePartials) {
        matched = lang
      }
    })
  }
  return matched
}

/**
 * @return {array}
 */
export const getAvailableLocales = () => Object.keys(loadLocaleMessages());

const translations = {
  legacy: false,
  locale: checkDefaultLocale() || 'en',
  messages: Object.assign(localeMessages),
  fallbackLocale: 'zh',
}
export const i18n = createI18n(translations)
