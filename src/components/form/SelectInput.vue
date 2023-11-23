<script setup>
import { watch, ref} from 'vue'

const emit = defineEmits([
  'update:modelValue',
]);

const props = defineProps({
    id: {
      type: String,
      required: false
    },
    label:{
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
});


const opened = ref(false)

const closeItems = () => {
  opened.value = false
}

const toggleItems = (event) => {
  event.stopPropagation(); // prevent closeItems from being triggered
  if (props.disabled) {
    return
  }
  opened.value = !opened.value
}

watch(opened, (value) => {
    if (!value) {
      document.removeEventListener('click', closeItems)
    }
    else {
      document.addEventListener('click', closeItems)
    }
  })

const selectOption = (option) => {
  emit('update:modelValue', option)
  closeItems()
}

</script>

<template>

<div class="grid gap-2">
  <label class="block text-sm font-medium leading-6">
    {{ label }}
  </label>

  <div :class="[
      error && $style.error,
      $style.select,
      opened && $style.opened,
      modelValue !== null && $style.selected,
      disabled && $style.disabled,
    ]">
    
    <button 
      :class="$style.button"
      @click="toggleItems($event)"
    >
        {{ modelValue === null ? placeholder : modelValue}}

      <div :class="$style.arrow">
        <img src="../../components/icons/arrow-down.svg" alt="">
      </div>
    </button>

    <div :class="$style.items">

      <a tabindex="0" v-for="(option, i) in options" :key="i"
        :class="[
          $style.item,
          option === value && $style.selected
        ]"
        @click="selectOption(option)">

        {{option}}

      </a>
    </div>

    <select :class="$style.input"
      :id="id"
      @change="selectOption($event.target.value)">

      <option v-for="(option, i) in options" :key="`option-${i}`"
        :value="option"
        :selected="option === value">
        {{option}}
      </option>
    </select>

  </div>
</div>
  
</template>




<style module>

.select {
  position: relative;
  width: 100%;
  background-color: #fff;
}

.select.disabled {
  opacity: 0.3;
}

.button {
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  width: 100%;
  min-height: 42px;
  padding: 11px 16px;
  
  cursor: pointer;
  transition: .3s border-color;
  text-align: left;
  letter-spacing: .7px;
  color: #b7b7b7;
  background-color: #fff;
  border: solid 1px #c6c6c6;
  border-radius: 5px;
  outline: none;
  background: none;
}

.button:hover {
  border-color: #9CA3AF;
}

.button:focus {
  border-color: theme('colors.primary');
}

.error .button {
  border-color: red; /* $red was a variable, replace with actual color value */
}

.select.selected .button {
  color: #3c3c3c;
}

.arrow {
  position: absolute;
  top: 50%;
  right: 16px;
  width: 9px;
  height: 4px;
  margin-top: -2px;
  transition: .3s transform;
}

.arrow svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.arrow path {
  stroke: #c6c6c6;
  transition: 0.3s stroke;
}

.button:hover .arrow path {
  stroke: #6c6c6c;
}

.select.opened .arrow {
  transform: rotate(180deg);
}

.items {
  position: absolute;
  z-index: 2;
  top: 100%;
  left: 0;
  visibility: hidden;
  overflow-y: auto;
  width: 100%;
  max-height: 200px;
  margin-top: 4px;
  transition: .3s transform, .3s opacity, .3s visibility;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  border: solid 1px #dfdfdf;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 7px 10px 0 rgba(109, 109, 109, .07);
}

.items a { /* no underline */
  text-decoration: none;
}

.select.opened .items {
  visibility: visible;
  transform: scaleY(1);
  opacity: 1;
}

.item {
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  display: block;
  padding: 10px 24px;
  cursor: pointer;
  letter-spacing: .7px;
  color: #4f4f4f;
  outline: none;
}


.item:hover,
.item.selected,
.item:focus {
  background-color: #f5f5f5;
}

.input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

</style>