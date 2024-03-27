<template>
  <div
    class="grid grid-flow-col overflow-x-auto gap-5 items-center py-4 px-6 md:px-8 justify-between"
    :class="$style.actionBar"
  >
    <span
      :class="$style.actionBarTitle"
    >
    {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>


<style module>
.actionBar {
  position: absolute;
  top: 56px;
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

</style>
