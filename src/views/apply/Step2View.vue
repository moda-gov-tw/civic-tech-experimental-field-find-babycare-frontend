
<script setup>
import router from '../../router/index.js';

import Step from '../../components/NavigationStep.vue'
import MainTitle from '../../components/MainTitle.vue'
import ToolTip from '../../components/form/ToolTip.vue'
import SelectInput from '../../components/form/SelectInput.vue'
import RadioInput from '../../components/form/RadioInput.vue'
import NormalButton from '../../components/NormalButton.vue';
import FullButton from '../../components/FullButton.vue';

import daycares from '@/api/mocks/daycares.json';

import { useApplicationDetailStore } from '../../stores/applicationDetail';
import { storeToRefs } from 'pinia';

const applicationDetailStore = useApplicationDetailStore();
const {
  applicantDaycares,
} = storeToRefs(applicationDetailStore);

const {  
  addDayCareApplication,
  removeDayCareApplication
} = applicationDetailStore;

const daycaresOptions = daycares.records
  .filter(daycare => daycare.fields.type === '公設民營')
  .map(daycare => daycare.fields.daycare_name);


function getLocation(daycare_name) {
  const daycare = daycares.records.find(d => d.fields.daycare_name === daycare_name);
  return daycare ? daycare.fields.location : null;
}


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

    <template v-for="(daycare, i) in applicantDaycares" :key="`daycare-${i}`">

      <div 
        v-if="applicantDaycares.length > 1" 
        class="flex justify-between"
      >
        <span   
          class="flex" 
          :class="$style.orderLabel
        ">
          公托 {{i+1}}
        </span>
        <a 
          :class="$style.removeButton"
          v-if="applicantDaycares.length > 1"
          @click="removeDayCareApplication(i)"
        >刪除此公托</a>
      </div>

      <!-- 公托選擇	 -->
      <SelectInput
        v-model="daycare.name"
        label="公托"
        :options="daycaresOptions"
        placeholder="請選擇欲報名之公托"
      />

      <!-- 您是否有回饋名額資格？ -->
      <div class="flex">
        {{ $t('input.daycare_reserved_spot') }} 
        <ToolTip
          :text="$t('helptip.daycare_reserved_spot')"
        /> 
      </div>

      <RadioInput
        v-if="getLocation(daycare.name) === '社會住宅' || getLocation(daycare.name) === '社區活動中心'"
        v-model="daycare.withPublicReservedSpot"
        returnBoolean
        :label="`是否為此 ${getLocation(daycare.name)} 設籍居民之嬰幼兒`"
        :options="[$t('options.yes'), $t('options.no')]"
      />

      <RadioInput
        v-if="getLocation(daycare.name) === '學校'"
        v-model="daycare.withSchoolReservedSpot"
        returnBoolean
        :label="`是否為此 ${getLocation(daycare.name)} 職員之嬰幼兒`"
        :options="[$t('options.yes'), $t('options.no')]"
      />
      
      <RadioInput
        v-model="daycare.withEmployeeReservedSpot"
        label="是否為公托現職員工之子女"
        returnBoolean
        :options="[$t('options.yes'), $t('options.no')]"
      />

        <FullButton 
          isAddButton
          v-if="i == applicantDaycares.length-1"
          :text="$t('button.add_daycare')" 
          @click="addDayCareApplication"
        />

    </template>
    
    

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
  margin-top: 20px;
  width: 750px;
}

.applicantInfo {
  width: 750px;
  background: var(--gray-gray-50, #F8F8F8);
}


.removeButton{
  cursor :pointer; 
}

.removeButton:hover{
  text-decoration: none;
}

.orderLabel{
  width: fit-content;
  padding:4px 8px;
  background-color:#9CA3AF ;
  color:white
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

