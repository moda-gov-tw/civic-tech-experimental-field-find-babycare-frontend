<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import router from '../../router/index.js';


import { DISTRICT_OPTIONS_I18N } from '../../enums/district';
import { IDENTITY_OPTIONS_I18N, DISADVANTAGE_OPTIONS_I18N } from '../../enums/identity';

import { useApplicationDetailStore } from '../../stores/applicationDetail';
import { storeToRefs } from 'pinia';

import Step from '../../components/NavigationStep.vue'
import MainTitle from '../../components/MainTitle.vue'
import ToolTip from '../../components/form/ToolTip.vue'
import DateSelectorField from '../../components/form/DateSelectorField.vue'
import SelectInput from '../../components/form/SelectInput.vue'
import RadioInput from '../../components/form/RadioInput.vue'
import NormalButton from '../../components/NormalButton.vue';
import CheckBoxField from '../../components/form/CheckBoxField.vue'
import InputField from '../../components/form/InputField.vue';
import FullButton from '../../components/FullButton.vue';

const DISTRICT_OPTIONS = DISTRICT_OPTIONS_I18N.map(option => t(option))

const DISADVANTAGE_FAMILY_OPTIONS = DISADVANTAGE_OPTIONS_I18N.map(option => t(option))

// 幼兒資料 Infant info
const singleOrMultiple = ref('single'); 


const applicationDetailStore = useApplicationDetailStore();
const {
  applicantInfo,
  infantsInfo,
  contactsInfo,
} = storeToRefs(applicationDetailStore);

const { 
  // 嬰兒
  addInfantApplication, 
  removeInfantApplication, 
  resetInfantIdentities,
  setMailingAddressSameAsResident,
  //聯絡人
  addContactApplication,
  removeContactApplication,
} = applicationDetailStore;


const handleClick = () => {
  router.push({ name: 'apply.step2' })
}
</script>

<template>
<!-- 外層容器 -->
<div :class="$style.page" class="flex flex-col p-7  items-center justify-center">
  <!-- 圖標容器 -->

  <div :class="$style.navigation">
    <Step
      currentStep="01"
    />
  </div>

  <!-- 申請人資料  -->
  <div :class="$style.applicantInfo" class="p-7 grid gap-6 ">

    <div class="grid gap-7 w-full mb-5">
      <MainTitle
        :text="$t('title.applicant_info')"
        divider
      />
    </div>

    <!-- 申請人姓名	 -->
    <InputField
      v-model="applicantInfo.applicantName"
      :label="t('input.applicant_name')"
      :placeholder="t('instructions.id_name')"
    />

    <!-- 與幼兒關係	 -->
    <InputField
      v-model="applicantInfo.infantRelationship"
      :label="t('input.infant_relationship')"
      :placeholder="t('instructions.infant_relationship')"
      
    />

    <!-- 聯絡電話	 -->
    <InputField
      v-model="applicantInfo.phone"
      :label="t('input.phone')"
      :placeholder="t('instructions.phone')"
    />

    <!-- 是否同住	 -->
    <RadioInput
      v-model="applicantInfo.sameHousehold"
      :label="t('input.same_household')"
      :options="[t('options.yes'), t('options.no')]"
    />
      
  <!-- 戶籍地址	 -->
  <div class="grid gap-2">
    <label :for="$attrs.name" class="block text-sm font-medium leading-6">戶籍地址</label>
    <div class="flex justify-between">
      <SelectInput
        class="w-1/2 mr-5"
        v-model="applicantInfo.residentAddressCity"
        :disabled="true"
      />
      <SelectInput
        class="w-1/2 "
        v-model="applicantInfo.residentAddressDistrict"
        :options="DISTRICT_OPTIONS"
        :placeholder="t('instructions.district')"
      />
    </div>
    <InputField
      class="mt-2"
      v-model="applicantInfo.residentAddressAddress"
      :placeholder="t('instructions.address')"
    />
  </div>

  <!--  與戶籍地址相同 -->
    <CheckBoxField
      v-model="applicantInfo.isSameAddress"
      @click="setMailingAddressSameAsResident"
      align="left"
      :text="$t('options.same_address')"
    />

  <!-- 通訊地址	 -->
  <div v-if="!applicantInfo.isSameAddress" class="grid gap-2">
    <label :for="$attrs.name" class="block text-sm font-medium leading-6">通訊地址</label>
    <div class="flex justify-between">
      <SelectInput
        class="w-1/2 mr-5"
        v-model="applicantInfo.mailingAddressCity"
        :disabled="true"
      />
      <SelectInput
        class="w-1/2 "
        v-model="applicantInfo.mailingAddressDistrict"
        :options="DISTRICT_OPTIONS"
        :placeholder="t('instructions.district')"
      />
    </div>
    <InputField
      class="mt-2"
      v-model="applicantInfo.mailingAddressAddress"
      :placeholder="t('instructions.address')"
    />
  </div>

  </div>

  <!-- 幼兒資料  -->
  <div :class="$style.applicantInfo" class="mt-7 p-7 grid gap-6">

    <div class="grid gap-7 w-full mb-5">
      <MainTitle :text="$t('title.infant_info')"  divider />
    </div>
    
      <!-- 是否為單胞胎	 -->
      <RadioInput
        v-model="singleOrMultiple"
        :label="t('input.single_or_multiple')"
        :options="[t('options.single_birth'), t('options.multiple_birth')]"
      />
    <template v-for="(infant,i) in infantsInfo" :key="`infant-${i}`">
      <div 
        v-if="singleOrMultiple === t('options.multiple_birth')" 
        class="flex justify-between">
        <span   
          class="flex" 
          :class="$style.orderLabel
        ">
          入托順序 {{i+1}} <ToolTip
            :toolTipText="$t('helptip.enter_order')"
          />
        </span>
        <a 
          :class="$style.removeButton"
          v-if="infantsInfo.length > 1"
          @click="removeInfantApplication(i)"
        >刪除此幼兒資料</a>
      </div>

      <!-- 幼兒姓名	 -->
      <InputField
        v-model="infant.infantName"
        :label="t('input.infant_name')"
        :placeholder="t('instructions.name')"
      />

      <!-- 生理性別 -->
      <SelectInput
        v-model="infant.sex"
        :label="t('input.sex')"
        :options="[t('options.male'), t('options.female') ]"
        :placeholder="t('instructions.sex')"
      />

      <!-- 身分證字號	 -->
      <InputField
        v-model="infant.rocId"
        :label="t('input.roc_id')"
        :placeholder="t('instructions.roc_id')"
      />

      <!-- 出生日期 -->
      <DateSelectorField
        v-model="infant.birthDate"
        :label="t('input.birthdate')"
        :placeholder="t('instructions.date')"
      />


      <!-- 戶籍地址	 -->
      <RadioInput
        v-model="infant.isSameAddress"
        :label="t('input.resident_address')"
        :options="[t('options.same_address'), t('options.different_address')]"
      />

      <div v-if="infant.isSameAddress == t('options.different_address')" class="grid gap-2">
        <div class="flex justify-between">
          <SelectInput
            class="w-1/2 mr-5"
            v-model="infant.residentAddressCity"
            :disabled="true"
          />
          <SelectInput
            class="w-1/2 "
            v-model="infant.residentAddressDistrict"
            :options="DISTRICT_OPTIONS"
            :placeholder="t('instructions.district')"
          />
        </div>
        <InputField
          class="mt-2"
          v-model="infant.residentAddressAddress"
          :placeholder="t('instructions.address')"
        />
      </div>


      <!-- 是否有特殊疾病 -->
      <RadioInput
        v-model="infant.withSpecialMedicalCondition"
        returnBoolean
        :label="t('input.medical_condition')"
        :options="[t('options.yes'), t('options.no')]"
        :toolTipText="t('helptip.medical_condition')"
      />
      <!-- 特殊疾病 -->
      <InputField
        v-if="infant.withSpecialMedicalCondition == t('options.yes')"
        v-model="infant.specialMedicalCondition"
        :placeholder="'請輸入特殊疾病之名稱'"
      />


      <div class="mt-4 p-2 grid gap-7 w-full">
        <span>{{ t('input.identity') }}</span>

        <CheckBoxField 
          v-model="infant.identity.disadvantageFamily"
          :text="t(IDENTITY_OPTIONS_I18N['disadvantageFamily'])"
          @change="resetInfantIdentities(i)"
          divider
        />

        <SelectInput v-if="infant.identity.disadvantageFamily"
          v-model="infant.identity.disadvantageFamilyType"
          :options="DISADVANTAGE_FAMILY_OPTIONS"
          placeholder="Options"
        />

        <CheckBoxField 
          v-model="infant.identity.challenged"
          :text="t(IDENTITY_OPTIONS_I18N['challenged'])"
          @change="resetInfantIdentities(i)"
          divider
        />

        <CheckBoxField 
          v-model="infant.identity.aboriginal"
          :text="t(IDENTITY_OPTIONS_I18N['aboriginal'])"
          @change="resetInfantIdentities(i)"
          divider
        />

        <CheckBoxField 
          v-model="infant.identity.underAge"
          :text="t(IDENTITY_OPTIONS_I18N['underAge'])"
          @change="resetInfantIdentities(i)"
          divider
        />

        <CheckBoxField 
          v-model="infant.identity.bigFamily"
          :text="t(IDENTITY_OPTIONS_I18N['bigFamily'])"
          @change="resetInfantIdentities(i)"
          divider
        />

        <CheckBoxField 
          v-model="infant.identity.abdoption"
          :text="t(IDENTITY_OPTIONS_I18N['abdoption'])"
          @change="resetInfantIdentities(i)"
          divider
        />

        <CheckBoxField 
          v-model="infant.identity.immigrant"
          :text="t(IDENTITY_OPTIONS_I18N['immigrant'])"
           @change="resetInfantIdentities(i)"
          divider
        />
        
         
        <CheckBoxField 
          v-model="infant.identity.none"
          :text="t(IDENTITY_OPTIONS_I18N['none'])"
          @change="resetInfantIdentities(i,true)"
        />
      

      </div>

      <FullButton 
        isAddButton
        v-if="(singleOrMultiple === t('options.multiple_birth')) && (i == infantsInfo.length-1)"
        :text="$t('button.add_infant')" 
        @click="addInfantApplication"
      />

    </template>
    
  </div>

  <!-- 幼兒資料  -->
  <div :class="$style.applicantInfo" class="mt-7 p-7 grid gap-6 ">

    <div class="grid gap-7 w-full mb-5">
      <MainTitle :text="'其他聯絡人'" divider />
    </div>

    <template v-for="(contact, i) in contactsInfo" :key="`contact-${i}`">

      <div 
        v-if="contactsInfo.length > 1" 
        class="flex justify-between"
      >
        <span   
          class="flex" 
          :class="$style.orderLabel
        ">
          聯絡人 {{i+1}}
        </span>
        <a 
          :class="$style.removeButton"
          v-if="contactsInfo.length != 1"
          @click="removeContactApplication(i)"
        >刪除此聯絡人資料</a>
      </div>
      <!-- 聯絡人姓名	 -->
      <InputField
        v-model="contact.contactName"
        :label="t('input.contact_name')"
        :placeholder="t('instructions.name')"
      />

      <!-- 聯絡人與幼兒關係	 -->
      <InputField
        v-model="contact.infantRelationship"
        :label="t('input.infant_relationship')"
        :placeholder="t('instructions.infant_relationship')"
      />

      <!-- 聯絡人聯絡電話	 -->
      <InputField
        v-model="contact.phone"
        :label="t('input.phone')"
        :placeholder="t('instructions.phone')"
      />

      <!-- 聯絡人是否同住	 -->
      <RadioInput
        v-model="contact.sameHousehold"
        :label="t('input.same_household')"
        :options="[t('options.yes'), t('options.no')]"
      />

      <FullButton 
        isAddButton
        v-if="i == contactsInfo.length-1"
        :text="$t('button.add_contact')" 
        @click="addContactApplication"
      />

    </template>
  </div>

  <div
    :class="$style.bottom"
    class="px-5 py-5 flex justify-end gap-5"
  >
    <NormalButton
      :text="$t('button.next_step')"
      @click="handleClick"
    />
  </div>
</div>

</template>

<style module>
.page {
  background-color: var(--bb-color-white);

  @media (min-width: 1024px) {
    background-color: transparent;
  }
}

.navigation {
  margin-top: 20px;
  width: 750px;
}

.applicantInfo {
  width: 750px;
  background: var(--gray-gray-50, #F8F8F8);
}

.bottom {
  width: 750px;
}

.removeButton{
  cursor :pointer; 
}

.removeButton:hover{
  text-decoration: none;
}


.title {
  color: #000;
  font-family: Noto Sans CJK TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
}

.orderLabel{
  width: fit-content;
  padding:4px 8px;
  background-color:#9CA3AF ;
  color:white
}


.textContainer {
  display: flex;
  flex-direction: column; /* 使標題和描述垂直排列 */
}

.textContainer h2 {
  margin: 0 0 10px 0; /* 移除標題的預設外邊距，並添加下邊距 */
}

.textContainer p {
  margin: 0; /* 移除段落的預設外邊距 */
}
</style>
