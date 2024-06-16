<template>
  <div class="input-wrapper">
    <div v-if="title" class="title">
      {{ title }}
      <span v-if="subtitle">
        <br />
        {{ subtitle }}
      </span>
    </div>
    <div class="input-body" :class="{ 'input-body--error': errors && errors.$error }">
      <textarea
        class="input"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
    <!-- v-bind:required="required" -->
    <div v-if="errors && !errors.required" class="input-required">
      {{ $t('system_message.required_message') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextareaInput',
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
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
};
</script>

<style>
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

.input-body--error.input-body .input {
  border-color: #f3574d;
}

.input-body--error + .input-required {
  display: block;
}
</style>
