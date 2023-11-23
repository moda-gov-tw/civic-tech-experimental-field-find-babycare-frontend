<script setup>
import { ref } from 'vue';
import router from '../../router/index.js';

import Step from '../../components/NavigationStep.vue'
import MainTitle from '../../components/MainTitle.vue'
import DateSelectorField from '../../components/form/DateSelectorField.vue'
import SelectInput from '../../components/form/SelectInput.vue'
import RadioInput from '../../components/form/RadioInput.vue'
import NormalButton from '../../components/NormalButton.vue';
import CheckBoxField from '../../components/form/CheckBoxField.vue'
import InputField from '../../components/form/InputField.vue';

const sex = ref(null);
const sick = ref(null);

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
      v-model="username"
      :label="$t('input.applicant_name')"
      :placeholder="$t('instructions.id_name')"
    />

    <!-- 與幼兒關係	 -->
    <InputField
      v-model="infantRelationship"
      :label="$t('input.infant_relationship')"
      :placeholder="$t('instructions.infant_relationship')"

    />

    <!-- 聯絡電話	 -->
    <InputField
      v-model="phone"
      :label="$t('input.phone')"
      :placeholder="$t('instructions.phone')"
    />

    <!-- 是否同住	 -->
    <RadioInput
      v-model="sameHousehold"
      :label="$t('input.same_household')"
      :options="[$t('options.yes'), $t('options.no')]"
    />

    <!-- 戶籍地址	 -->
    <!-- 通訊地址	 -->
    <RadioInput
      v-model="sick"
      :label="$t('input.resident_address')"
      :options="[$t('options.same_address'), $t('options.different_address')]"
    />
  </div>

  <!-- 幼兒資料  -->
  <div :class="$style.applicantInfo" class="mt-7 p-7 grid gap-6 ">

    <div class="grid gap-7 w-full mb-5">
      <MainTitle :text="$t('title.infant_info')"  divider />
    </div>

    <!-- 是否為單胞胎	 -->
    <RadioInput
      v-model="isSingleBirth"
      :label="$t('input.single_or_multiple')"
      :options="[$t('options.single_birth'), $t('options.multiple_birth')]"
    />

    <!-- 幼兒姓名	 -->
    <InputField
      v-model="infantName"
      :label="$t('input.infant_name')"
      :placeholder="$t('instructions.name')"
    />

     <!-- 生理性別 -->
    <SelectInput
      v-model="sex"
      :label="$t('input.sex')"
      :options="[$t('options.male'), $t('options.female') ]"
      :placeholder="$t('instructions.sex')"
    />

    <!-- 身分證字號	 -->
    <InputField
      :label="$t('input.roc_id')"
      :placeholder="$t('instructions.roc_id')"
      v-model="username"
    />

    <!-- 出生日期 -->
    <DateSelectorField
      :label="$t('input.birthdate')"
      :placeholder="$t('instructions.date')"
    />

    <!-- 特殊疾病 -->
    <RadioInput
      v-model="medicalCondition"
      :label="$t('input.medical_condition')"
      :options="[$t('options.yes'), $t('options.no')]"
      :toolTipText="$t('helptip.medical_condition')"
    />

    <!-- 戶籍地址  -->
    <RadioInput
      v-model="sick"
      :label="$t('input.resident_address')"
      :options="[$t('options.same_applicant'), $t('options.different_applicant')]"
    />

    <div class="mt-4 p-2 grid gap-7 w-full">
      <span>{{ $t('input.identity') }}</span> <!-- 請選擇符合幼兒狀況的選項(可複選) -->

      <CheckBoxField
        :text="$t('options.disadvantage_family')"
        divider
      />

      <CheckBoxField
        :text="$t('options.challenged')"
        divider
      />

      <CheckBoxField
        :text="$t('options.aboriginal')"
        divider
      />

      <CheckBoxField
        :text="$t('options.under_age')"
        divider
      />

      <CheckBoxField
        :text="$t('options.big_family')"
        divider
      />

      <CheckBoxField
        :text="$t('options.abdoption')"
        divider
      />

      <CheckBoxField
        :text="$t('options.immigrant')"
        divider
      />

      <CheckBoxField
        :text="$t('options.none')"
        divider
      />
    </div>
  </div>

  <!-- 幼兒資料  -->
  <div :class="$style.applicantInfo" class="mt-7 p-7 grid gap-6 ">

    <div class="grid gap-7 w-full mb-5">
      <MainTitle :text="'其他聯絡人'" divider />
    </div>

    <!-- 聯絡人姓名	 -->
    <InputField
      v-model="contactName"
      :label="$t('input.contact_name')"
      :placeholder="$t('instructions.name')"
    />

    <!-- 與幼兒關係	 -->
    <InputField
      v-model="infantRelationship"
      :label="$t('input.infant_relationship')"
      :placeholder="$t('instructions.infant_relationship')"
    />

    <!-- 聯絡電話	 -->
    <InputField
      v-model="Phone"
      :label="$t('input.phone')"
      :placeholder="$t('instructions.phone')"
    />

    <!-- 是否同住	 -->
    <RadioInput
      v-model="sameHousehold"
      :label="$t('input.same_household')"
      :options="[$t('options.yes'), $t('options.no')]"
    />
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
  width: 750px;
}

.applicantInfo {
  width: 750px;
  background: var(--gray-gray-50, #F8F8F8);
}

.bottom {
  width: 750px;
}

.title {
  color: #000;
  font-family: Noto Sans CJK TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
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
