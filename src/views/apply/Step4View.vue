
<template>
  <div :class="$style.page" class="flex flex-col p-7  items-center justify-center">
    <div :class="$style.navigation">
      <Step
        currentStep="04"
      />
    </div>

    <div :class="$style.section">
      <ApplicantList
        :editable='true'
        :editableRouterName='"apply.step1"'
        :key="allicationInfo.title"
        :main-title="allicationInfo.title"
        :type="allicationInfo.type"
        :list="allicationInfo.detailList"
      />
    </div>

    <div :class="$style.section">
      <ApplicantList
        :editable='true'
        :editableRouterName='"apply.step2"'
        :key="infantInfo.title"
        :main-title="infantInfo.title"
        :type="infantInfo.type"
        :list="infantInfo.detailList"
      />
    </div>

    <div :class="$style.section">
      <ApplicantList
        :editable='true'
        :editableRouterName='"apply.step3"'
        :key="documentUpload.title"
        :main-title="documentUpload.title"
        :type="documentUpload.type"
        :list="documentUpload.detailList"
      />
    </div>

    <div 
      :class="$style.bottom" 
      class="px-5 py-5 flex justify-end gap-5">
      <NormalButton
        @click="handleClick('prev')"
        :text="$t('button.previous_step')" isGhost 
      />
      <NormalButton
        @click="handleClick('next')" 
        :text="$t('button.submit')" 
      />
    </div>
  </div>

  <RouterView />
</template>


<script setup>
import router from '../../router/index.js';
import { useI18n } from 'vue-i18n';
import Step from '../../components/NavigationStep.vue'
import ApplicantList from '../../components/applications/ApplicantList.vue';
import NormalButton from '../../components/NormalButton.vue';
import { APPLICATION_STATUS } from '../../enums/applicationStatus';

const { t } = useI18n();

defineProps({
  applicationID: { // TODO: for calling API
    type: String,
  },
  applicationStatus: {
    type: String,
    validator: (val) => {
      return APPLICATION_STATUS.includes(val);
    },
  },
});

const handleClick = (step) => {
  if(step==='prev') router.push({ name: 'apply.step3' })
  if(step==='next') router.push({ name: 'apply.confirmation' })
}

const allicationInfo = {
  title: t('title.applicant_info'), // 申請人資料
  type: 'text',
  detailList: [
    {
      title: t('input.applicant_name'), // 申請人姓名
      text: 'OOO',
    },
    {
      title: t('input.infant_relationship'), //與幼兒關係
      text: '父子',
    },
      {
      title: t('input.phone'), // 聯絡電話
      text: 'OOO',
    },
      {
      title: t('input.same_household'), // 是否同住
      text: 'OOO',
    },
    {
      title: t('input.resident_address'), // 戶籍地址
      text: 'OOO',
    },
    {
      title: t('input.mailing_address'), // 通訊地址
      text: 'OOO',
    },
  ],
}

const infantInfo = {
  title: t('title.infant_info'), // 幼兒資料
  type: 'text',
  detailList: [
    {
      title: t('input.infant_name'), // 幼兒姓名
      text: 'OOO',
    },
    {
      title: t('input.sex'), // 生理性別
      text: '男性',
    },
    {
      title: t('input.roc_id'), // 身分證字號
      text: '男性',
    },
    {
      title: t('input.birthdate'), // 出生年月日
      text: '男性',
    },
    {
      title: t('input.resident_address'), //戶籍地址
      text: '男性',
    },
    {
      title: t('input.medical_condition'), // 是否有特殊疾病
      text: '男性',
    },
    {
      title: t('input.identity'), // 身分資格
      text: '男性',
    }
  ]
};

const documentUpload = {
  title: t('title.document_upload'), // 文件上傳
  type: 'file',
  detailList: [
    {
      title: '戶口名簿或戶籍謄本',
      src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      title: '綜合所得稅核定通知書',
      src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      title: '弱勢家庭證明',
      src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
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

.navigation {
  width: 750px;
}

.section{
  width: 750px;
  margin-bottom:20px;
}


.bottom {
  width: 750px;
}


</style>
