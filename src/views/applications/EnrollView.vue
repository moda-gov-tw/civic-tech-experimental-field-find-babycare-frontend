
<template>
  <div :class="$style.page" class="flex flex-col p-7  items-center justify-center">
    
     <EnrollActionBar
      :text="$t('title.registar_or_not')"
     /> 
    <div :class="[$style.section, $style.detail]">
      <ApplicantList
        :key="acceptanceInfo.title"
        :main-title="acceptanceInfo.title"
        :type="acceptanceInfo.type"
        :list="acceptanceInfo.detailList"
      />
    </div>

    <div 
      class="lg:px-5 lg:py-5  lg:w-1/4 ">
        <FullButton 
          class="mb-4"
          :text="$t('button.confirm_acceptance')"
        />
        <FullButton 
          :text="$t('button.forfeit')" 
          isGhost
        />
    </div>
  </div>

  <RouterView />
</template>


<script setup>
import { useI18n } from 'vue-i18n';
import ApplicantList from '../../components/applications/ApplicantList.vue';
import FullButton from '../../components/FullButton.vue';
import EnrollActionBar from '../../components/applications/EnrollActionBar.vue';

const { t } = useI18n();


const daycareName = '台中市ＯＯＯＯ托育中心'
const acceptanceInfo = {
  title: `${t('title.acceptance_info')} | ${daycareName}`, // 申請人資料
  type: 'text',
  detailList: [
    {
      title: t('input.infant_name'), // 幼兒姓名
      text: 'OOO',
    },
    {
      title: t('input.daycare'), // 公托機構
      text: '台中市ＯＯＯＯ托育中心',
    },
      {
      title: t('input.accept_deadline_date'), // 回覆報到意願期限
      text: '2023/12/19',
    },
      {
      title: t('input.enroll_date'), // 入托日期
      text: '2023/12/24',
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

.detail {
  margin-top:40px;
  margin-bottom:20px;
}
.section {
  width:100%;
  min-width: 350px;
  @media (min-width: 960px) {
    width: 750px;    
  }
}


</style>
