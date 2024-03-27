<script setup>
import MainTitle from '../../components/MainTitle.vue'
import IconWritingApplication from '../../components/icons/IconWritingApplication.vue'
import CheckBoxField from '../../components/form/CheckBoxField.vue'
import NormalButton from '../../components/NormalButton.vue'
import router from '../../router/index.js';


const handleClick = () => {
  router.push({ name: 'apply.step1' })
}


</script>

<template>
<!-- 外層容器 -->
<div :class="$style.page" class="flex flex-col p-7  items-center justify-center">
  <!-- 圖標容器 -->
  <div :class="[
    $style.section,
    $style.sectionMargin
  ]" class="grid gap-7 w-full mb-5 mt-2">
    <MainTitle :text="'開始公托報名'" divider />
  </div>
  <div :class="[$style.section, $style.instructionBg]" class="flex lg:flex-row flex-col p-5 justify-center ">

    <div class="lg:w-2/5  p-7 flex items-center justify-center " >
      <IconWritingApplication/>
    </div>

    <div :class="$style.textContainer" class="lg:w-3/5 ">

      <div class="pb-5">
        <h2 :class="$style.title">{{ $t('message.start_application_1') }}</h2>
        <p>{{ $t('message.start_application_2') }}</p>
      </div>

      <div class="pb-5">
        <h2 :class="$style.title">{{ $t('message.start_application_3') }}</h2>
        <p>{{ $t('message.start_application_4') }}</p>
      </div>

      <div class="pb-5">
        <h2 :class="$style.title">{{ $t('message.start_application_5') }}</h2>
        <p>{{ $t('message.start_application_6') }}</p>
      </div>

      <div>
        <h2 :class="$style.title">{{ $t('message.start_application_7') }}</h2>
         <p>{{ $t('message.start_application_8') }}</p>
      </div>

    </div>

  </div>


  <div :class="$style.section" class="flex flex-col p-3 items-center justify-center">
    <div class="mt-4 p-2 grid gap-7 w-full">
      <CheckBoxField
        :text="$t('input.consent_1')"
        align="left"
        divider
      />
      <CheckBoxField
        :text="$t('input.consent_2')"
        align="left"
        divider
      />

      <CheckBoxField
        :text="$t('input.consent_3')"
        align="left"
        divider
      />
    </div>


    <div
      :class="$style.section" 
      class="px-5 py-5 flex justify-end gap-5">
      <NormalButton 
        @click="handleClick('next')"
        :text="$t('button.start_application')" />
    </div>
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

.sectionMargin {
  margin-top:50px;
}

.section {
  background-color: transparent;
  width:100%;
  min-width: 350px;
  @media (min-width: 960px) {
    width: 750px;    
  }
}

.instructionBg {
  background: var(--bb-color-gray-50);
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
