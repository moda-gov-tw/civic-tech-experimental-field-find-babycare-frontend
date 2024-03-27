<script setup>
defineProps({

  text: {
    type: String,
    required: true,
  },
  divider: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  align: {
    type: String,
    default: 'right',
    validator(value) {
      return ['left', 'right'].indexOf(value) !== -1
    }
  },
});

defineEmits([
  'update:modelValue',
]);
</script>

<template>

<div 
  :class="[
    $style.checkBoxRadioInput,
    divider && $style.divider,
    disabled && $style.disabled,
    $style[align],
    $style[type]
  ]">

  <label :for="uid" :class="$style.checkBoxContainer">
    
    <span v-if="align === 'right'" 
      :class="$style.label"
    >
      {{ text }}
    </span>

    <input
      :id="uid"
      type="checkbox"
      :class="$style.input"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)"/>

    <div :class="[
      $style.checkBoxIndicator, 
    ]"></div>

    <span 
      v-if="align === 'left'" 
      :class="$style.label"
    >
      {{text}}
    </span>
  
  </label>

</div>


</template>


<style module>
.divider {
  padding-bottom:20px;
  border-bottom: 1px solid var(--bb-color-gray-200);;
}

.checkBoxRadioInput:after {
  content: "";
  display: table;
  clear: both;

}


.checkBoxContainer {
  display: block;
  position: relative;
  margin-bottom: 5px;
  cursor: pointer;
}

.label {
  float: left;
  font-size: 14px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  color: #565656;
}

.label a {
  color: var(--bb-color-orange-600);;
  text-decoration: underline;
  font-weight: normal;
  cursor: pointer;
}

.left .label {
  margin-left: calc(22px + 18px);
}

.right .label {
  width: 70%;
}

.input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.checkBoxIndicator {
  width: 18px;
  height: 18px;
  border: solid 1px #acacac;
  border-radius: 4px;
  transition: 0.3s background-color, 0.3s border-color;
}

.checkbox .checkBoxIndicator {
  border-radius: 4px;
}


.left .checkBoxIndicator {
  position: absolute;
}

.right .checkBoxIndicator {
  float: right;
}

.input:checked ~ .checkBoxIndicator {
  background: var(--bb-color-orange-600);
  border-color: var(--bb-color-orange-600);
}

.input:focus ~ .checkBoxIndicator {
  border-color: var(--bb-color-orange-600);
}

.input:focus:checked ~ .checkBoxIndicator {
  border: solid 1px #acacac;
}

.input:disabled ~ .checkBoxIndicator {
  opacity: 0.3;
}

</style>