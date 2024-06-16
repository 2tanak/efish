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
      <multiselect
        :max-height="150"
        :max="3"
        :required="required"
        :options="formList"
        :preserve-search="true"
        track-by="id"
        label="title"
        :multiple="multiple"
        :close-on-select="!multiple"
        :disabled="disabled"
        :placeholder="placeholder"
        class="multiselect__check"
        v-model="value"
      >
        <template slot="singleLabel" slot-scope="{ option }">{{ option.title }}</template>
        <template slot="noResult">{{ $t('components.not_found') }}</template>
        <template slot="noOptions">{{ $t('components.not_found') }}</template>
        <template slot="placeholder">{{ $t('placeholder.choose') }}</template>
      </multiselect>
      <input type="hidden" :name="name" :value="value.id" v-if="value && !multiple" />
      <input type="hidden" :name="name" :value="'[' + idValues(value) + ']'" v-else-if="value" />
    </div>
    <div class="input-required" v-if="errors && !errors.required">
      {{ $t('system_message.required_message') }}
    </div>
  </div>
</template>

<script>
import { apiSecond } from '@/boot/axios';
import Multiselect from 'vue-multiselect';

export default {
  name: 'CatchType',
  components: {
    Multiselect,
  },
  data() {
    return {
      value: null,
      array: [],
    };
  },
  props: {
    modelValue: {
      type: [Number, String, Array],
      default: null,
    },
    errors: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
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
    name: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  watch: {
    categoryValue() {
      this.value = null;
      this.$emit('update:modelValue', null);
    },
    value(item) {
      if (item && !this.multiple) {
        this.$emit('update:modelValue', item.id);
        this.$emit('update:modelObjectsName', item.title);
      } else if (item) {
        this.$emit('update:modelValue', this.idValues(item));
        this.$emit('update:modelObjectsName', this.idNames(item));
      }
    },
    formList: {
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
    formList() {
      return this.array;
    },
  },
  methods: {
    apiGetCatchTypesList() {
      apiSecond
        .get('/v2/handbook-fish-type-catches')
        .then((response) => {
          if (response.data && response.data.data) {
            let multi = [];
            response.data.data.find((element) => {
              if (this.modelValue && !this.multiple) {
                if (element.id == this.modelValue) {
                  this.value = element;
                }
              }
              if (this.modelValue && this.multiple) {
                this.modelValue.find((id) => {
                  if (element.id == id) {
                    multi.push(element);
                  }
                });
                this.value = multi;
              }
            });
            this.array = response.data.data;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error?.response?.status == 500) {
              this.errorMessage.status = 500;
              this.errorMessage.text = this.$t('system_message.500');
            }
            if (error?.response?.status == 401) {
              this.errorMessage.status = 401;
              this.errorMessage.text = error.response.data.error_message;
              this.$router.push('/' + this.$i18n.locale + '/login');
            }
            if (error?.response?.status == 422) {
              this.errorMessage.status = 422;
              this.errorMessage.text = error.response.data.error_message;
            }
          }
        });
    },
    idValues(array) {
      let ids = [];
      array.find((element) => {
        ids.push(element.id);
      });
      return ids;
    },
    idNames(array) {
      let names = [];
      array.find((element) => {
        names.push(element.title);
      });
      return names;
    },
    setValues() {
      if (this.modelValue == null) {
        this.value = null;
        return;
      }
      if (this.formList) {
        let multi = [];
        this.formList.forEach((e) => {
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
  beforeMount() {
    this.apiGetCatchTypesList();
  },
};
</script>

<style scoped>
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
