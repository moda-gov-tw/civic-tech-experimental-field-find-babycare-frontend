<template>
  Enrollment View {{ enrollmentID }}

  <div class="px-8 py-7 grid gap-7">
    <MainTitle :text="`報名資料 | ${ enrollmentData.infantName }`" divider />
    <BodyText :text="`目前入托狀態為「尚未回覆報到意願」，申請人需於 ${ registrationDeadline } 前回覆報到意願。系統將於回覆期限前每日寄送信件提醒。`" />
    <div class="grid gap-6">
      <ApplicantList
        v-for="item in enrollmentData.itemList"
        :key="item.title"
        :main-title="item.title"
        :type="item.type"
        :list="item.detailList"
      />
    </div>
  </div>

  <div class="px-8 py-5 flex justify-end gap-5">
    <NormalButton text="確認入托" />
  </div>

  <RouterView />
</template>

<script setup>
import { computed } from 'vue';
import MainTitle from '../../components/MainTitle.vue';
import BodyText from '../../components/BodyText.vue';
import ApplicantList from '../../components/applications/ApplicantList.vue';
import NormalButton from '../../components/NormalButton.vue';
import { ENROLLMENT_STATUS } from '../../enums/enrollmentStatus.js';

defineProps({
  enrollmentID: { // TODO: for calling API
    type: String,
  },
  enrollmentStatus: {
    type: String,
    validator: (val) => {
      return ENROLLMENT_STATUS.includes(val);
    },
  },
});

const enrollmentData = {
  infantName: 'infantName test',
  itemList: [
    {
      title: '申請人資料',
      type: 'text',
      detailList: [
        {
          title: '申請人姓名',
          text: 'OOO',
        },
        {
          title: '與幼兒關係',
          text: '父子',
        },
        {
          title: '聯絡電話',
          text: '09123456578',
        },
        {
          title: '戶籍地址',
          text: '407 台中是西屯區OO路XX號',
        },
        {
          title: '通訊地址',
          text: '407 台中是西屯區OO路XX號',
        },
      ],
    },
    {
      title: '幼兒資料',
      type: 'text',
      detailList: [
        {
          title: '幼兒姓名',
          text: 'OOO',
        },
        {
          title: '生理性別',
          text: '男性',
        },
      ],
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

const registrationDeadline = computed(() => {
  return '2023/10/11';
});
</script>
