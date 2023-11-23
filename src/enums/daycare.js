import { useI18n } from 'vue-i18n';

export const DAYCARE_TYPE = [
  'PUBLIC', // 0 公設民營
  'SEMI_PUBLIC', // 1 準公共
  'PRIVATE', // 2 私立
];

export const DAYCARE_TYPE_I18N = [
  'daycare.type_public', // 0 公設民營
  'daycare.type_semipublic', // 1 準公共
  'daycare.type_private', // 2 私立
];

export const formatDaycareType = typeNumber => {
  const { t } = useI18n();
  return t(DAYCARE_TYPE_I18N[typeNumber])
}
