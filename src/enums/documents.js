import { useI18n } from 'vue-i18n';

// 證明文件
export const DOCUMENT = {
  X: 'document.X', // 戶口名簿或戶籍謄本
  Y: 'document.Y', // 綜合所得稅核定通知書
  A: 'document.A', // 回饋名額身分證明文件
  B: 'document.B', // 弱勢家庭證明文件
  C: 'document.C', // 發展遲緩或持有身心障礙證明
  G: 'document.G', // 試養證明文件
  H: 'document.H', // 公托員工在職證明
  K: 'document.K', // 居留證
  L: 'document.L', // 特殊疾病診斷證明
};

export const formatDocument = key => {
  const { t } = useI18n();
  return t(DOCUMENT[key]);
};
