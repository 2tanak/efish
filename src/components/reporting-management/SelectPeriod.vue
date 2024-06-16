<template>
  <FormGroupWrapper1 :title="'Выбрать период'">
    <multiselect
      :max-height="150"
      :max="3"
      :required="required"
      :options="getPeriods"
      :preserve-search="true"
      track-by="id"
      :disabled="disabled"
      class="multiselect__check"
      v-model="modelValue"
    >
      <template slot="singleLabel" slot-scope="{ option }">{{ option }}</template>

      <template slot="noResult">{{ $t('components.not_found') }}</template>
      <template slot="noOptions">{{ $t('components.not_found') }}</template>
      <template slot="placeholder">{{ $t('placeholder.choose') }}</template>
    </multiselect>
  </FormGroupWrapper1>
</template>

<script>
import Multiselect from 'vue-multiselect';

import FormGroupWrapper1 from '@/components/UI/FormGroupWrappers/FormGroupWrapper1.vue';

export default {
  name: 'SelectPeriod',
  components: {
    Multiselect,
    FormGroupWrapper1,
  },
  props: {
    value: {
      type: Number,
      default: 1,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getPeriods() {
      return [1, 2];
    },
    modelValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  emits: ['update'],
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

.input-body .multiselect__tags {
  padding-left: 20px;
  border: 1px solid #0a091d;
  border-radius: 5px;
  background: #ffffff;
  font-weight: 400;
  font-size: 14px;
  color: #0a091d;
  line-height: 1.2;
  width: 100%;
}

.q .input-body {
  position: relative;
}

.input-body .multiselect__content-wrapper {
  width: 261px;
}

.q .multiselect__tags {
  display: flex;
  align-items: center;
}

.q .multiselect__tags {
  padding-left: 0px;
  padding-right: 0px;
  padding: 0;
}

.q .multiselect__placeholder {
  padding-left: 10px;
}

.q input[type='number'] {
  width: 70px;
  padding-right: 10px;
}

.q .input-body {
  display: flex;
  border: 1px solid #d3e7fb;
  align-items: center;
  padding: 0 0px;
}

.input-body .multiselect__tags {
  border: 1px solid #d3e7fb !important;
}

.q .input-body .multiselect__tags {
  border: transparent !important;
}

.input-body .multiselect__select {
  display: none;
}

.input-body .multiselect--disabled .multiselect__tags {
  border: 1px solid #d3e7fb;
}

.input-body .multiselect--disabled .multiselect__placeholder {
  margin-bottom: 0;
}

.input-body .multiselect__single {
  margin-bottom: 0;
}

.input-body--error.input-body .multiselect__tags {
  border-color: #f3574d;
}

.input-body--error + .input-required {
  display: block;
}
</style>
