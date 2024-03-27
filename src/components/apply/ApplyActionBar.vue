<template>
  <div
    class="grid grid-flow-col overflow-x-auto gap-5 items-center py-4 px-6 md:px-8 justify-between"
    :class="$style.actionBar"
  >
    <span
      :class="$style.actionBarTitle"
    >
      {{ $t('title.daycare_application')}}
    </span>
    <div>
      <button :class="$style.actionButton">{{ $t('button.delete_draft')}}</button>
      <button :class="$style.actionButton">{{ $t('button.save_draft')}}</button>
    </div>
   
  </div>
</template>


<style module>
.actionBar {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  background: #565B66;

  color: var(--bb-color-white);
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.actionBarTitle {
  color: var(--white, #FFF);
  /* Webpage Text Styles/Title H2 */
  font-family: Noto Sans CJK TC;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 177.778% */
}

.actionButton {
  padding: 6px 16px;
  margin-right :10px;
  border-radius: 6px;
  border: 1px solid var(--white, #FFF);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);

  color: var(--white, #FFF);
  font-family: Noto Sans CJK TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
}
</style>
