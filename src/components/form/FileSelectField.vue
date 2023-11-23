<template>

<div 
  class="flex justify-between items-center"
  :class="[
    $style.fileSelectInput,
    busy && $style.busy,
    uploaded && $style.uploaded,
    error && $style.error,
    disabled && $style.disabled
  ]">

  <a :class="$style.button"
    :disabled="busy"
    tabindex="0"
    @click="uploaded ? openUpload() : disabled ? null : openFileSelect()">


    <template v-if="uploaded">

      <div :class="$style.content">
        <img :class="$style.icon"
          src="../../components/icons/file.svg" />
 

        <div :class="$style.leftBlock">
          <span :class="$style.mediumText">預覽檔案</span>
        </div>
      </div>

      <div v-if="!disabled" :class="[$style.content, $style.right]">
        <img 
          :class="[$style.icon, $style.delete]"
          src="../../components/icons/delete.svg" 
          @click.stop="$emit('delete')"
        />
 
      </div>

    </template>

    <template v-else>
      <div class="flex h-full justify-between  items-center">
        <img 
          class=""
          src="../../components/icons/upload.svg" 
        />

        <div 
          class=""
          :class="$style.largeText">
          請上傳 PDF / PNG / JPG
        </div>

         <span :class="$style.smallText">最大 20 MB</span>

      </div>

    </template>

  </a>

  <!-- <Error v-if="error">{{error}}</Error> -->

  <input :class="$style.input"
    :id="id"
    type="file"
    ref="$input"
    :disabled="busy || disabled"
    tabindex="-1"
    :accept="accepted.join(', ')"
    @change="checkFile($event.target.files[0])"/>
    
</div>
  
</template>

<style module>
.fileSelectInput.disabled {
  opacity: 0.6;
}

.icon {
  position: relative;
  width: 20px;
  height: 20px;
  border:1px solid red;
}

.icon svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.icon path {
  fill: var(--bb-color-orange-600);;

  transition: 0.3s fill;
}

.fileSelectInput.uploaded .icon path {
  fill: #595959;
}

.error .icon path {
  fill: /* Replace $red with the actual color value */;
}

.icon.delete {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.fileSelectInput.uploaded .icon.delete {
  fill: #bcbcbc;
}

.input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.button {
  outline: none;
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border-radius: 5px;
  border: dashed 1px var(--bb-color-orange-600);;
  cursor: pointer;
  box-sizing: border-box;
  text-decoration:none;

  /* transition: 0.2s background-color, 0.2s border-color, 0.2s opacity; */
}

.button:hover {
  background-color: rgb(246, 219, 194);
  text-decoration:none;
}

.busy .button {
  opacity: 0.5;
  cursor: default;
}

.uploaded .button,
.busy .button {
  background-color: #f0f0f0;
  border-style: solid;
  border-color: #f0f0f0;
}

.uploaded .button:hover,
.busy .button:hover {
  background-color: #e4e4e4;
}

.error .button {
  background-color: #faf2f2;
  border-color: /* Replace $red with the actual color value */;
}

.error .button:hover {
  background-color: #f6dddd;
}

.button {
  display: table;
}

.content {
  display: flex;
  align-items: center;
  /* display: table-cell; */
  /* vertical-align: middle; */
}

.content span {
  display: inline-block;
  vertical-align: middle;
}

.content.left {
  text-align: left;
}

.content.center {
  text-align: center;
}

.content.right {
  text-align: right;
}

.leftBlock {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}

.largeText {
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.7px;
  color: var(--bb-color-orange-600);;
}

.error .largeText {
  color: /* Replace $red with the actual color value */;
}

.mediumText {
  font-size: 10px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.5px;
  color: #656565;
}

.smallText {
  font-size: 8px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.4px;
  color: var(--bb-color-orange-600);;
  margin-top: 3px;
}

.uploaded .smallText {
  color: #7f7d7d;
  display: block;
}

.error .smallText {
  color: /* Replace $red with the actual color value */;
}


</style>

<script>


// import ActivityIndicator from '../others/ActivityIndicator'
// import Error from '../others/Error'


export default {  
  props: {
    id: {
      type: String,
      required: false
    },
    busy: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    },
    accepted: {
      type: Array,
      default: ()=> ['application/pdf', 'image/png', 'image/jpeg']
    },
    maxSize: {
      type: Number,
      default: 20000000
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  components: {
    // ActivityIndicator,
    // Error
  },

  watch: {
    uploaded(value) {
      if (value) {
        this.$refs.$input.value = ''
      }
    }
  },

  methods: {
    openUpload() {
      window.open(this.src)
    },

    openFileSelect() {
      if (this.uploaded) {
        return
      }

      this.$refs.$input.click()
    },

    resetFileSelect() {
      this.$refs.$input.value = ''
    },

    checkFile(file) {
      if (!file) {
        return
      }

      let allowedFileTypes = ['application/pdf', 'image/png', 'image/jpeg']

      if (!allowedFileTypes.includes(file.type)) {
        this.$emit('error', '檔案類型不符，請重新上傳PDF / PNG / JPG 檔案。')
        this.resetFileSelect()
      }
      else if (file.size > this.maxSize) {
        this.$emit('error', '檔案過大，請重新確認過檔案大小後再次上傳。')
        this.resetFileSelect()
      }
      else {
        this.$emit('error', null)
        this.$emit('upload', file)
      }
    }
  },

  computed: {
    uploaded() {
      return !this.busy && this.src ? true : false
    }
  }
}

</script>
