
<script setup>
import router from '../../router/index.js';

import NormalButton from '../../components/NormalButton.vue'
import FileSelectField from '../../components/form/FileSelectField.vue'
import Step from '../../components/NavigationStep.vue'

const handleClick = (step) => {
  if(step==='prev') router.push({ name: 'apply.step2' })
  if(step==='next') router.push({ name: 'apply.step4' })
}


</script>


<template>
<!-- 外層容器 -->
<div :class="$style.page" class="flex flex-col p-7  items-center justify-center">
  <!-- 圖標容器 -->

  <!-- 申請人資料  -->

  <div :class="$style.navigation">
    <Step
      currentStep="03"
    />
  </div>


  <div class="p-7 grid gap-6 "> 
    
     <h2 class="font-semibold">{{ $t('document.X') }}</h2>

    <div :class="$style.instruction" class="p-7">
      <div>
        請確保資料符合以下規範：<br/>
        ・為最近三個月申請之資料。<br/>
        ・戶口名簿的記事欄為「詳記」版本的全戶戶籍資料。<br/>
        ・若為原住名身份，嬰幼兒的身分註記內需有原住名身分及族別內容。<br/>
        ・若為多份戶籍謄本，請合併成一份文件上傳。<br/>
      </div>
    </div>

    <FileSelectField/>

  </div>

  <div class="p-7 grid gap-6 "> 
    
    <h2 class="font-semibold">{{ $t('document.Y') }}</h2>

    <div :class="$style.instruction" class="p-7">
      <div>
        請確保資料符合以下規範：<br/>
        ・為最近三個月申請之資料。<br/>
        ・戶口名簿的記事欄為「詳記」版本的全戶戶籍資料。<br/>
        ・若為原住名身份，嬰幼兒的身分註記內需有原住名身分及族別內容。<br/>
        ・若為多份戶籍謄本，請合併成一份文件上傳。<br/>
      </div>
    </div>

    <FileSelectField/>

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


.instruction {
  width: 750px;
  background: var(--gray-gray-50, #F8F8F8);
}

</style>

