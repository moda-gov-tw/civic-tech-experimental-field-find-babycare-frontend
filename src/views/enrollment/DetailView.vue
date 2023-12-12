<template>
  <div class="px-8 py-7 grid gap-7">
    <MainTitle :text="$t('title.individual_application', { InfantName: detailData.infantName })" divider />
    <BodyText :text="explainText" />
    <div class="grid gap-6">
      <ApplicantList
        v-for="item in detailData.itemList"
        :key="item.title"
        :main-title="item.title"
        :type="item.type"
        :list="item.detailList"
      />
    </div>
  </div>

  <div class="px-8 py-5 flex justify-end gap-5">
    <NormalButton
      v-for="btn in displaybuttons"
      :key="btn.text"
      :text="btn.text"
      :is-ghost="btn.isGhost"
    />
  </div>

  <RouterView />
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import isEmpty from 'lodash.isempty';
import MainTitle from '../../components/MainTitle.vue';
import BodyText from '../../components/BodyText.vue';
import ApplicantList from '../../components/applications/ApplicantList.vue';
import NormalButton from '../../components/NormalButton.vue';
import { displayFormatter } from '../../helpers/detailItemFormatter.js';
import { useEnrollmentStore } from '../../stores/enrollment.js';
import { storeToRefs } from 'pinia';
const enrollmentStore = useEnrollmentStore();

const { t } = useI18n();

const props = defineProps({
  enrollmentID: { // TODO: for calling API
    type: String,
  },
});

const {
  allData,
} = storeToRefs(enrollmentStore);

const currentData = allData.value.filter(d => {
  return (d.id || d.applicantId) === props.enrollmentID;
})?.[0] || {};

const displaybuttons = computed(() => {
  const status = currentData.enrollmentStatus;
  if(status === '0') {
    return [
      { isGhost: true, text: t('button.graduate') },
    ];
  }
  return [];
});

const explainText = computed(() => {
  const i18n = [
    t('message.status_enrolled'),
    t('message.status_graduated'),
  ];

  return i18n[currentData.enrollmentStatus] || '';
});

const detailData = {
  infantName: displayFormatter(currentData, 'infantName'),
  itemList: [
    {
      title: t('title.applicant_info'), // 申請人資料
      type: 'text',
      detailList: [
        {
          title: t('input.applicant_name'), // 申請人姓名
          text: displayFormatter(currentData, 'applicantName'),
        },
        {
          title: t('input.infant_relationship'), //與幼兒關係
          text: displayFormatter(currentData, 'relationshipWithInfant'),
        },
         {
          title: t('input.phone'), // 聯絡電話
          text: displayFormatter(currentData, 'applicantPhoneNumber'),
        },
         {
          title: t('input.same_household'), // 是否同住
          text: displayFormatter(currentData, 'applicantLivesWithInfant'),
        },
        {
          title: t('input.resident_address'), // 戶籍地址
          text: displayFormatter(currentData, 'applicantResidentAddress'),
        },
        {
          title: t('input.mailing_address'), // 通訊地址
          text: displayFormatter(currentData, 'applicantMailingAddress'),
        },
      ].filter(d => !isEmpty(d.text)),
    },
    {
      title: t('title.infant_info'), // 幼兒資料
      type: 'text',
      detailList: [
        {
          title: t('input.infant_name'), // 幼兒姓名
          text: displayFormatter(currentData, 'infantName'),
        },
        {
          title: t('input.sex'), // 生理性別
          text: displayFormatter(currentData, 'infantSex'),
        },
        {
          title: t('input.roc_id'), // 身分證字號
          text: displayFormatter(currentData, 'infantRocNumber'),
        },
        {
          title: t('input.birthdate'), // 出生年月日
          text: displayFormatter(currentData, 'infantBirthdate'),
        },
        {
          title: t('input.resident_address'), //戶籍地址
          text: displayFormatter(currentData, 'infantResidentAddress'),
        },
        {
          title: t('input.medical_condition'), // 是否有特殊疾病
          text: displayFormatter(currentData, 'infantMedicalCondition'),
        },
        {
          title: t('input.identity'), // 身分資格
          text: displayFormatter(currentData, 'identities'),
        },
      ].filter(d => !isEmpty(d.text)),
    },
    {
      title: '上傳文件',
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
    },
  ],
};
</script>
