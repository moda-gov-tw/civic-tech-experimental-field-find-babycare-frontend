
<template>
  <div :class="$style.page" class="flex flex-col p-7  items-center justify-center">

    <EnrollActionBar
      :text="$t('title.forfeit')"
    /> 

  <div :class="[$style.section, $style.detail]" class="p-7 grid gap-6 ">
      <MainTitle 
        :text="acceptanceInfo.title" 
        divider 
      />

      <ApplicantTextDisplay
        v-for="(info,i) in acceptanceInfo.detailList" :key="`detailList-${i}`"
        :title="info.title"
        :text="info.text"
      />

      <RadioInput
        v-model="forfeitReason"
        :wrapText="true"
        :label="$t('input.forfeit_reason')"
        :options="[$t('options.already_somewhere_else'), $t('options.other')]"
      />

      <InputField 
        v-if="forfeitReason==$t('options.other')"
        type="reason"
        name="reason"
        id="reason"
        :placeholder="$t('instructions.forfeit_reason')"
        v-model="reason"
      />

      <div :class="$style.divider"></div>

      <CheckBoxField
        :text="$t('options.forfeit_consent')"
        align="left"
      />

  
  </div>

  <div
    :class="$style.section" 
    class="px-5 py-5 flex justify-end gap-5">
    <NormalButton 
      :text="$t('button.previous_step')" isGhost />
    <NormalButton 
      :text="$t('button.next_step')" />
  </div>

  </div>

  <RouterView />
</template>


<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import MainTitle from '../../components/MainTitle.vue'
import InputField from '../../components/form/InputField.vue'
import NormalButton from '../../components/NormalButton.vue';
import CheckBoxField from '../../components/form/CheckBoxField.vue'
import ApplicantTextDisplay from '../../components/applications/ApplicantTextDisplay.vue'
import EnrollActionBar from '../../components/applications/EnrollActionBar.vue';

import RadioInput from '../../components/form/RadioInput.vue'

const { t } = useI18n();

const forfeitReason = ref()
const reason = ref()

const daycareName = '台中市ＯＯＯＯ托育中心'
const acceptanceInfo = {
  title: `${t('title.forfeit_acceptance')} | ${daycareName}`, // 申請人資料
  type: 'text',
  detailList: [
    {
      title: t('input.applicant_name'), // 申請人姓名
      text: 'OOO',
    },
    {
      title: t('input.infant_name'), // 幼兒姓名
      text: 'OOO',
    },
  ],
}

</script>

<style module >
.page {
  
  background-color: var(--bb-color-white);

  @media (min-width: 1024px) {
    background-color: transparent;
  }
}

.detail{
  margin-top: 60px;
  background: var(--gray-gray-50, #F8F8F8);
}

.section {
  width:100%;
  min-width: 350px;
  @media (min-width: 960px) {
    width: 750px;    
  }
}


.divider {
  height: 1px;
  background: var(--bb-color-gray-200);
}
</style>
