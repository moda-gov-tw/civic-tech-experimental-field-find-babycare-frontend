import { ref } from 'vue'
import { defineStore } from 'pinia'
import { watch } from 'vue';


// 幼兒資料
function infantState() {
  return {
    infantName:'',
    sex:'',
    rocId:'',
    birthDate:'',
    isSameAddress:"與申請人相同",
    residentAddressCity:'台中市',
    residentAddressDistrict:'',
    residentAddressAddress:'',
    withSpecialMedicalCondition:false,
    specialMedicalCondition:'',
    identity: {
      disadvantageFamily: false,  // 弱勢家庭之嬰幼兒
      disadvantageFamilyType:'', // 弱勢家庭類型
      challenged: false,  // 發展遲緩或持有身心障礙證明之嬰幼兒
      aboriginal: false,  // 具原住民身分之嬰幼兒
      underAge: false,  // 未成年親職家庭之嬰幼兒
      bigFamily: false,  //父母戶內育有三名（含）以上子女家庭之嬰幼兒
      abdoption: false,  // 試養階段之嬰幼兒
      immigrant: false,  // 監護人為單親一方尚未取得身分證的新住民
      none: false, // 以上皆非
    },
    
  }
}


// 聯絡人資料
function contactState() {
  return {
    contactName:'',
    infantRelationship:'',
    phone:'',
    sameHousehold:false,
  }
}

// 公托申請資料
function daycareState() {
  return {
    name:'',
    withPublicReservedSpot:false,
    withSchoolReservedSpot:false,
    withEmployeeReservedSpot:false,
  }
}


export const useApplicationDetailStore = defineStore('applicationDetail', () => {

  // 1. 申請人資料
  const applicantInfo = ref({
    applicantName:'',
    infantRelationship:'',
    phone:'',
    sameHousehold:false,
    residentAddressCity:'台中市',
    residentAddressDistrict:'',
    residentAddressAddress:'',
    isSameAddress:false,
    mailingAddressCity:'台中市',
    mailingAddressDistrict:'',
    mailingAddressAddress:'',
  });

  function setMailingAddressSameAsResident() {
    infantsInfo.value.mailingAddressCity = infantsInfo.value.residentAddressCity
    infantsInfo.value.mailingAddressDistrict = infantsInfo.value.residentAddressDistrict
    infantsInfo.value.mailingAddressAddress = infantsInfo.value.residentAddressAddress
  }


  // 2. 幼兒資料 
  const infantsInfo = ref([
    infantState()
  ]);

  function addInfantApplication() {
    infantsInfo.value.push(infantState())
    console.log(infantsInfo)
  }

  function removeInfantApplication(index) {
    infantsInfo.value.splice(index, 1)
  }

  function resetInfantIdentities(index, fromNone=false){
    // 取消勾選
    console.log('fromNone',fromNone)
    if(fromNone && infantsInfo.value[index].identity.none){
      Object.keys(infantsInfo.value[index].identity).forEach(key => {
        if (key !== 'none') {
          infantsInfo.value[index].identity[key] = false;
        }
      });
      infantsInfo.value[index].identity.disadvantageFamilyType = '';
    }
    // 取消 None 勾選
    else {
      infantsInfo.value[index].identity['none'] = false
    }

  }

  // 3. 聯絡人資料
  const contactsInfo = ref([contactState()]);

  function addContactApplication() {
    contactsInfo.value.push(contactState())
  }

  function removeContactApplication(index) {
    contactsInfo.value.splice(index, 1)
  }

  // 公托申請申請
  const applicantDaycares = ref([
    daycareState()
  ]);

  function addDayCareApplication() {
    applicantDaycares.value.push(daycareState())
  }

  function removeDayCareApplication(index) {
    applicantDaycares.value.splice(index, 1)
  }
  
  // Get all identity for document 
  function listInfantIdentities() {
    const identities = [];

    // 獲取所有嬰兒的 identity 集合
    infantsInfo.value.forEach((infant) => {
      if(infant.withSpecialMedicalCondition){
        identities.push('withSpecialMedicalCondition');
      }

      if (Object.values(infant.identity).some((value) => value === true)) {
        const keys = Object.keys(infant.identity).filter((key) => infant.identity[key] === true);
        identities.push(...keys);
      }
    });

    // 獲取所公托申請資格的 identity 集合
    applicantDaycares.value.forEach((daycare) => {
      console.log('daycare',daycare)
      const keys = Object.keys(daycare).filter((key) => daycare[key] === true);
      identities.push(...keys);
    });

    
    return identities;
  }


  return {
    // 申請人資料
    applicantInfo,
    setMailingAddressSameAsResident,
    // 嬰兒資料
    infantsInfo,
    addInfantApplication,
    removeInfantApplication,
    resetInfantIdentities,
    listInfantIdentities,
    // 聯絡人資料'
    contactsInfo,
    addContactApplication,
    removeContactApplication,
    // 公托申請資料
    applicantDaycares,
    addDayCareApplication,
    removeDayCareApplication
  };
});
