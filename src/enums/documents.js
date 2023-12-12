import { useI18n } from 'vue-i18n';

// 證明文件
export const DOCUMENT = {
  X: 'document.X', // 戶口名簿或戶籍謄本
  Y: 'document.Y', // 綜合所得稅核定通知書
  A: 'document.A', // 「社宅租賃合約」或「教職員工在職證明」文件
  B: 'document.B', // 弱勢家庭證明文件
  C: 'document.C', // 發展遲緩或持有身心障礙證明
  G: 'document.G', // 試養證明文件
  H: 'document.H', // 公托員工在職證明
  K: 'document.K', // 居留證
  L: 'document.L', // 特殊疾病診斷證明
};

// Identity corresponds to the required document
export const IDENTITY_TO_DOCUMENT = {
  'defult': ['X','Y'],
  'disadvantageFamily': ['B', '-Y'], 
  'challenged': ['C'],
  'abdoption': ['G','-Y'], 
  'immigrant': ['-X','K'],
  "withSpecialMedicalCondition":['L'],
  'withPublicReservedSpot':['A'],
  'withSchoolReservedSpot':['A'],
  'withEmployeeReservedSpot':['H'],
}

// 根據身份獲取需要的文件
export function getDocumentsByIdentities(identities) {
  let documents = [...IDENTITY_TO_DOCUMENT['defult']];
  // 遍歷所有身份
  identities.forEach(identity => {
    // 如果該身份有對應的文件
    if (IDENTITY_TO_DOCUMENT[identity]) {
      // 獲取該身份的文件
      const identityDocuments = IDENTITY_TO_DOCUMENT[identity];
      identityDocuments.forEach(doc => {
        // 如果文件以'-'開頭，表示該文件需要被移除
        if (doc.startsWith('-')) {
          const index = documents.indexOf(doc.substring(1));
          // 如果該文件存在於文件列表中，則移除
          if (index > -1) {
            documents.splice(index, 1);
          }
        } else {
          // 如果文件列表中不存在該文件，則添加到文件列表中
          if (!documents.includes(doc)) {
            documents.push(doc);
          }
        }
      });
    }
  });

  // 返回文件列表
  return documents;
}


export const DOCUMENT_INSTRUCTION_TEXT = {
  X: {
    'explanationText':[
      'instructions.document_x_1',
      'instructions.document_x_2',
      'instructions.document_x_3',
      'instructions.document_x_4',
    ],
    'popupInstructionURL': {
      'onlineURL': 'https://mydata.nat.gov.tw/personal/list/1',
      'inPersonURL':'https://www.gov.tw/News3_Content.aspx?n=2&s=516376',
      'image':'document_x.png'
    }
  },
  Y: {
    'explanationText':[
      'instructions.document_y_1',
    ],
    'popupInstructionURL': {
      'onlineURL': 'https://www.etax.nat.gov.tw/etwmain/etw109w/cases/services/OLFETWI12/5',
      'inPersonURL':'https://www.gov.tw/News3_Content.aspx?n=2&s=513404',
      'image':'document_y.png'
    },
  },
  A: {
    'explanationText':[
      'instructions.document_a_1',
      'instructions.document_a_2',
    ],
    'popupInstructionURL': null,
  },
  B:{
    'explanationText':[
      'instructions.document_c_1',
    ],
    'popupInstructionURL': null,
  },

  C: {
    'explanationText':[
      'instructions.document_c_1',
      'instructions.document_c_2',
    ],
    'popupInstructionURL': null,
  },
  G: {
    'explanationText':[
      'instructions.document_g_1',
      'instructions.document_g_2',
      'instructions.document_g_3',
    ],
    'popupInstructionURL': null,
  },
  H: {
    'explanationText':[
      'instructions.document_h_1',
    ],
    'popupInstructionURL': null,
  },
  K: {
    'explanationText':[
      'instructions.document_k_1',
    ],
    'popupInstructionURL': null,
  },
  L: {
    'explanationText':[
      'instructions.document_l_1',
    ],
    'popupInstructionURL': null
  },
}


export const formatDocument = key => {
  const { t } = useI18n();
  return t(DOCUMENT[key]);
};
