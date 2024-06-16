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
      <MultiSelect
        :max-height="150"
        :max="3"
        :required="required"
        :options="formList"
        :preserve-search="true"
        track-by="id"
        label="name"
        :multiple="multiple"
        :close-on-select="!multiple"
        :disabled="disabledIn || disabled"
        :placeholder="placeholder"
        class="multiselect__check"
        v-model="value"
      >
        <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
        <template slot="noResult">{{ $t('components.not_found') }}</template>
        <template slot="noOptions">{{ $t('components.not_found') }}</template>
        <template slot="placeholder">{{ placeholder || $t('placeholder.choose') }}</template>
      </MultiSelect>
      <input v-if="value && !multiple" type="hidden" :name="name" :value="value.id" />
      <input v-else-if="value" type="hidden" :name="name" :value="'[' + idValues(value) + ']'" />
    </div>
    <div v-if="errors && !errors.required" class="input-required">
      {{ $t('system_message.required_message') }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import MultiSelect from 'vue-multiselect';

export default {
  name: 'RegionSelect',
  components: {
    MultiSelect,
  },
  data() {
    return {
      value: null,
      disabledIn: false,
    };
  },
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
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [Number, Array],
      default: null,
    },
    categoryValue: {
      type: [Number, Array],
      default: null,
    },
    confinesValue: {
      type: Array,
      default: Array,
    },
    userBind: {
      type: Array,
      default: Array,
    },
  },
  emits: ['update:modelValue'],
  watch: {
    categoryValue() {
      this.value = null;
      this.$emit('update:modelValue', null);
    },
    value(item) {
      if (item) {
        if (!this.multiple) {
          this.$emit('update:modelValue', item.id);
          this.$emit('update:modelObjectsName', item.name);
        } else {
          this.$emit('update:modelValue', this.idValues(item));
        }
      }
    },
    _getRegionList: {
      handler() {
        this.setValues();
      },
      immediate: true,
    },
    modelValue: {
      handler() {
        this.setValues();
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(['_getRegionList']),
    formList() {
      if (this.confinesValue?.length > 0) {
        return this._getRegionList.filter((element) => {
          return this.confinesValue.find((e) => {
            if (e == element.id) {
              this.disabledIn = true;
              this.value = element;
              return true;
            }
          });
        });
      }

      if (this.userBind?.length > 0) {
        return this._getRegionList.filter((element) => {
          return this.userBind.find((e) => {
            if (e == element.id) {
              this.value = element;
              return true;
            }
          });
        });
      }

      if (this.placeholder === 'Все...') return [{ id: 0, name: 'Все...' }, ...this._getRegionList];

      return this._getRegionList;
    },
  },
  beforeMount() {
    this._fetchRegionList();
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
    idValues(array) {
      return array.map((element) => element.id);
    },
    setValues() {
      if (this._getRegionList) {
        let multi = [];
        this._getRegionList.forEach((e) => {
          if (this.modelValue && !this.multiple) {
            if (e.id == this.modelValue) {
              this.value = e;
            }
          }
          if (this.modelValue && this.multiple) {
            this.modelValue.find((id) => {
              if (e.id == id) {
                multi.push(e);
              }
            });
            this.value = multi;
          }
        });
      }
    },
  },
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
import { watch } from 'vue';
