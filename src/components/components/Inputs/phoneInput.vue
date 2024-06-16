<template>
  <div class="input-wrapper">
    <div class="title" v-if="title">
      {{ title }}
      <span v-if="subtitle">
        <br />
        {{ subtitle }}
      </span>
    </div>
    <div class="input-body" :class="{ 'input-body--error': errors && errors.$error }">
      <the-mask
        class="input"
        type="tel"
        masked="true"
        :name="name"
        v-bind:disabled="disabled"
        :placeholder="'+7 (_ _ _)  _ _ _  _ _  _ _'"
        :mask="['+7 (###) ### ## ##']"
        :value="modelValue"
        v-on:input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <!-- v-bind:required="required"  -->
    <div class="input-required" v-if="errors && !errors.required">
      {{ $t('system_message.required_message') }}
    </div>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask';

export default {
  name: 'phoneInput',
  components: { TheMask },
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
    },
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
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
      type: [String, Number],
      default: '',
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  watch: {},
  computed: {},
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
.input-body {
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
