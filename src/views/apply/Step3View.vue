
<script setup>
import router from '../../router/index.js';
import { DOCUMENT, DOCUMENT_INSTRUCTION_TEXT, getDocumentsByIdentities } from '../../enums/documents'
import DocumentOverlay from '../../components/apply/DocumentOverlay.vue'
import NormalButton from '../../components/NormalButton.vue'
import FileSelectField from '../../components/form/FileSelectField.vue'
import Step from '../../components/NavigationStep.vue'
import { useApplicationDetailStore } from '../../stores/applicationDetail';
import { useOverlayStore } from '../../stores/documentOverlay';

const handleClick = (step) => {
  if(step==='prev') router.push({ name: 'apply.step2' })
  if(step==='next') router.push({ name: 'apply.step4' })
}

const applicationDetailStore = useApplicationDetailStore();

const { 
  listInfantIdentities
} = applicationDetailStore;


const allIdentities = listInfantIdentities()

const docRequirenment =  getDocumentsByIdentities(allIdentities)

const documentsToUploads = docRequirenment.map(document => {
  return {
    i18Name: DOCUMENT[document],
    descriptions: DOCUMENT_INSTRUCTION_TEXT[document]['explanationText'],
    popupInstruction: DOCUMENT_INSTRUCTION_TEXT[document]['popupInstructionURL'],
  }
})

const overlayStore = useOverlayStore();
const { 
  openOverlay,
} = overlayStore;


</script>


<template>
<div :class="$style.page" class="flex flex-col p-7  items-center justify-center">

  <div :class="[$style.section, $style.navigation]">
    <Step
      currentStep="03"
    />
  </div>

  <div v-for="(document ,key) in documentsToUploads" :key="key" class="p-4 grid gap-6" 
    :class="$style.section"
  > 

    <div class="flex">
     <span :class="$style.instructionTitle">{{ $t(document['i18Name']) }}</span>
     <a v-if="document['popupInstruction']"
        :class="$style.instructionPopupText"
        @click="openOverlay(document)"
      >
        點擊查看文件申請方式
    </a>
    </div>

    <div :class="$style.instructionDetail"
    class="p-4">
      <div>
        請確保資料符合以下規範：<br/>
        <span v-for="(description,key) in document.descriptions" :key="key">
          ・{{ $t(description) }}<br/>
        </span>
      </div>
    </div>

    <FileSelectField/>

  </div>

  <DocumentOverlay/>

  <div
    :class="[$style.section, $style.bottom]"
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

.section {
  width:100%;
  min-width: 350px;
  @media (min-width: 960px) {
    width: 750px;    
  }
}


.instructionTitle {
  color: #374151;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
}

.instructionPopupText {
  color: var(--orange-orange-700, #C2410C);
  text-align: right;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  margin-left: 10px;
}

.instructionPopupText:hover{
  cursor: pointer;
  text-decoration: none;
}

.navigation {
  margin-top: 20px;
  margin-bottom: 20px;
}

.instructionDetail {
  background: var(--gray-gray-50, #F8F8F8);
}

</style>

