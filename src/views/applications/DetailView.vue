<template>
  Applications View {{ applicationID }}

  <div class="px-8 py-7 grid gap-7">
    <MainTitle :text="$t('title.enrollment_management')" divider />
    <BodyText :text="$t('message.application_approval_explain')" />
    <div class="grid gap-6">
      <ApplicantList
        v-for="item in applicantData.itemList"
        :key="item.title"
        :main-title="item.title"
        :type="item.type"
        :list="item.detailList"
      />
    </div>
  </div>

  <div class="px-8 py-5 flex justify-end gap-5">
    <NormalButton :text="$t('button.return_application')" isGhost />
    <NormalButton :text="$t('button.approve_application')" />
  </div>

  <RouterView />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import MainTitle from '../../components/MainTitle.vue';
import BodyText from '../../components/BodyText.vue';
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

const applicantData = {
  infantName: 'infantName test',
  itemList: [
    {
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
    },
    {
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
        },
      ],
    },
    {
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
    },
  ],
};

</script>
