<template>
  <div class="input-wrapper">
    <div v-if="title" class="title">
      <span v-html="title"></span>
      <span v-if="subtitle">
        <br />
        {{ subtitle }}
      </span>
    </div>
    <div class="input-body" :class="{ 'input-body--error': errors && errors.$error }">
      <input
        class="input"
        :type="type"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        :required="required"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur', $event.target.value)"
      />
    </div>
    <div v-if="errors && !errors.required" class="input-required">
      {{ $t('system_message.required_message') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    errors: {
      type: Object,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue'],
};
</script>

<style>
.input-wrapper {
  width: 100%;
}

.title {
  font-weight: 600;
  font-size: 12px;
  color: #0a091d;
  margin-bottom: 8px;
  line-height: 1.2;
}

.title span {
  color: #708295;
}

.input {
  border: 1px solid #0a091d;
  border-radius: 5px;
  background: #ffffff;
  font-weight: 400;
  font-size: 14px;
  color: #0a091d;
  padding: 10px 20px;
  line-height: 1.2;
  width: 100%;
}

.input[disabled='disabled'] {
  border: 1px solid #d3e7fb;
}

.input-body--error {
  animation-name: shakeError;
  animation-fill-mode: forwards;
  animation-duration: 0.6s;
  animation-timing-function: ease-in-out;
}

.input-body--error input,
.input-body--error textarea,
.input-body--error input:focus,
.input-body--error input:hover {
  border-color: #f3574d;
}

.input-body--error + .input-required {
  display: block;
}
</style>
