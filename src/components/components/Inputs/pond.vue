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
        v-bind:required="required"
        :options="formList"
        :preserve-search="true"
        track-by="id"
        label="name"
        :multiple="multiple"
        :close-on-select="!multiple"
        :disabled="disabled"
        :placeholder="placeholder"
        class="multiselect__check"
        v-model="value"
      >
        <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
        <template slot="noResult">{{ $t('components.not_found') }}</template>
        <template slot="noOptions">{{ $t('components.not_found') }}</template>
        <template v-if="placeholder" slot="placeholder">{{ placeholder }}</template>
        <template v-else slot="placeholder">{{ $t('placeholder.choose') }}</template>
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
import { mapGetters, mapActions } from 'vuex';

import Multiselect from 'vue-multiselect';

export default {
  name: 'PondList',
  components: {
    Multiselect,
  },
  data() {
    return {
      value: null,
    };
  },
  props: {
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
      default: null,
    },
    errors: {
      type: Object,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
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
    userBind: {
      type: Array,
      default: Array,
    },
    allOptions: {
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
        this.$emit('update:modelObjectsName', item.name);
      } else if (item) {
        this.$emit('update:modelValue', this.idValues(item));
        this.$emit('update:modelObjectsName', this.idNames(item));
      }
    },
    _getPondList: {
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
    ...mapGetters(['_getPondList']),
    formList() {
      // if (this.categoryValue) {
      //   let elements = [];
      //   elements = this._getPondList.filter((element) => {
      //     if (element.category) {
      //       return element.category.find((e) => {
      //         if (!Array.isArray(this.categoryValue) && e.catalog_id == this.categoryValue) {
      //           return true;
      //         } else if (Array.isArray(this.categoryValue)) {
      //           return this.categoryValue.find((category) => {
      //             if (category == e.catalog_id) {
      //               return true;
      //             }
      //           });
      //         }
      //       });
      //     }
      //   });
      //   return elements;
      // }
      if (this.userBind?.length > 0) {
        let list = this._getPondList.filter((element) => {
          return this.userBind.find((e) => {
            if (e.id == element.id) {
              //this.disabled=true;
              this.value = element;
              return true;
            }
          });
        });
        return list;
      }

      if (this.allOptions) {
        return [{ id: 0, name: 'Все...' }, ...this._getPondList];
      }

      return this._getPondList;
    },
  },
  beforeMount() {
    this._fetchPondList();
  },
  methods: {
    ...mapActions(['_fetchPondList']),
    setValues() {
      if (this._getPondList) {
        let multi = [];
        this._getPondList.forEach((e) => {
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
    idNames(array) {
      let names = [];
      array.find((element) => {
        names.push(element.name);
      });
      return names;
    },
    idValues(array) {
      let ids = [];
      array.find((element) => {
        ids.push(element.id);
      });
      return ids;
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
