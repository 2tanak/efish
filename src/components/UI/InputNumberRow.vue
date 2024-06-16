<template>
  <FormGroupWrapper1 :title="title">
    <TextInput
      :type="type"
      :name="name"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      :errors="errors"
      :modelValue="modelValue"
      v-on:update:modelValue="$emit('update:modelValue', $event)"
    ></TextInput>
  </FormGroupWrapper1>
</template>

<script>
import FormGroupWrapper1 from '@/components/UI/FormGroupWrappers/FormGroupWrapper1.vue';
import TextInput from '@/components/components/Inputs/TextInput.vue';

export default {
  name: 'InputNumberRow',
  components: { FormGroupWrapper1, TextInput },
  props: {
    type: {
      type: String,
      default: 'number',
    },
    name: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: ['update:modelValue'],
};
</script>
