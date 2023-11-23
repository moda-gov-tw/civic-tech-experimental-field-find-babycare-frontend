
<script setup>
import { ref } from 'vue';
import router from '../../router/index.js';

import Step from '../../components/NavigationStep.vue'
import MainTitle from '../../components/MainTitle.vue'

import SelectInput from '../../components/form/SelectInput.vue'
import RadioInput from '../../components/form/RadioInput.vue'
import NormalButton from '../../components/NormalButton.vue';


import { i18n } from '@/i18n.js' 


const handleClick = (step) => {
  if(step==='prev') router.push({ name: 'apply.step1' })
  if(step==='next') router.push({ name: 'apply.step3' })
}



</script>

<template>
<!-- 外層容器 -->
<div :class="$style.page" class="flex flex-col p-7  items-center justify-center">
  <!-- 圖標容器 -->

  <div :class="$style.navigation">
    <Step
      currentStep="02"
    />
  </div>

  <!-- 申請人資料  -->
  <div :class="$style.applicantInfo" class="p-7 grid gap-6 ">

    <div class="grid gap-7 w-full mb-5">
      <MainTitle 
        :text="'公托選擇'" 
        divider 
      />
    </div>

    <!-- 公托選擇	 -->
    <SelectInput
      v-model="sex"
      label="公托"
      :options="[i18n.global.t('options.male'), i18n.global.t('options.female') ]"
      placeholder="請選擇欲報名之公托"
    />

    <!-- 是否同住	 -->
    <span> {{ $t('input.daycare_reserved_spot') }}</span>
    <RadioInput
      v-model="sameHousehold"
      :label="'是否為社區別活動中心居民之嬰幼兒'"
      :options="[i18n.global.t('options.yes'), i18n.global.t('options.no')]"
    />

    <RadioInput
      v-model="sameHousehold"
      :label="'是否為公托現職員工之子女'"
      :options="[i18n.global.t('options.yes'), i18n.global.t('options.no')]"
    />
    
    

  </div>

  <div
    :class="$style.bottom" 
    class="px-5 py-5 flex justify-end gap-5">
    <NormalButton 
      @click="handleClick('prev')"
      :text="$t('button.previous_step')" isGhost />
    <NormalButton 
      @click="handleClick('next')"
      :text="$t('button.next_step')" />
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

.bottom {
  width: 750px;
}

.navigation {
  width: 750px;
}

.applicantInfo {
  width: 750px;
  background: var(--gray-gray-50, #F8F8F8);
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

