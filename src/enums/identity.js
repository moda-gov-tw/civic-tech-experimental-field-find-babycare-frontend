import { useI18n } from 'vue-i18n';

// 身份別
export const IDENTITY = {
  'A-1': 'identity.A', // 回饋名額：社宅住戶或學校職員之子女
  'A-2': 'identity.A', // 回饋名額:里、社區別活動中心之設籍嬰幼兒
  B: 'identity.B', // 弱勢家庭之嬰幼兒
  C: 'identity.C', // 發展遲緩或持有身心障礙證明之嬰幼兒
  D: 'identity.D', // 具原住民身分之嬰幼兒
  E: 'identity.E', // 為未成年親職家庭之嬰幼兒
  F: 'identity.F', // 父母戶內育有三名（含）以上子女家庭之嬰幼兒
  G: 'identity.G', // 試養階段之嬰幼兒
  H: 'identity.H', // 任職於該公托現職員工之子女
  I: 'identity.I', // 一般家庭之多胞胎嬰幼兒
  J: 'identity.J', // 一般家庭之嬰幼兒
  K: 'identity.K', // 監護人為單親一方尚未取得身分證的新住民
  L: 'identity.L', // 被診斷出特殊疾病之嬰兒
};

export const formatIdentity = (key) => {
  const { t } = useI18n();
  return t(IDENTITY[key]);
};
