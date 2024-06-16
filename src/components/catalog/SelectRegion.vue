<template>
  <InputWrapper
    class="select-region"
    :title="withTitle ? 'Регионы сбыта в Республике Казахстан' : ''"
    :is-error="!!errors"
    :error="errors && !errors.required ? $t('system_message.required_message') : ''"
  >
    <MultiSelect
      track-by="id"
      label="name"
      class="multiselect__check"
      placeholder="Добавить регион"
      :max="multiple && max"
      :preserve-search="true"
      :required="required"
      :multiple="multiple"
      :close-on-select="!multiple"
      :disabled="disabled"
      :options="options"
      v-model="modelValue"
    >
      <template slot="noResult">{{ $t('components.not_found') }}</template>
      <template slot="noOptions">{{ $t('components.not_found') }}</template>
      <template slot="placeholder">{{ $t('placeholder.choose') }}</template>
    </MultiSelect>
  </InputWrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import MultiSelect from 'vue-multiselect';

import InputWrapper from '@/components/UI/FormGroupWrappers/InputWrapper.vue';

export default {
  name: 'SelectRegion',
  components: {
    MultiSelect,
    InputWrapper,
  },
  props: {
    withTitle: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: null,
    },
    errors: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Object, Array],
      default: null,
    },
    confinesValue: {
      type: Array,
      default: () => [],
    },
    watchValue: null,
  },
  emits: ['input'],
  computed: {
    ...mapGetters({
      _getRegionList: '_getRegionList',
    }),
    modelValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    options() {
      if (this.confinesValue?.length) return this.confinesValue;
      return this._getRegionList || [];
    },
  },
  watch: {
    watchValue() {
      this.$emit('input', null);
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
  },
  async beforeMount() {
    await this._fetchRegionList();
  },
};
</script>

<style>
.select-region .multiselect__tags {
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

.select-region .multiselect--disabled .multiselect__tags {
  border: 1px solid #d3e7fb;
}

.select-region .multiselect--disabled .multiselect__placeholder {
  margin-bottom: 0;
}

.select-region .multiselect__single {
  margin-bottom: 0;
}

.select-region .input-body--error.input-body .multiselect__tags {
  border-color: #f3574d;
}

.select-region .input-body--error + .input-required {
  display: block;
}
</style>
