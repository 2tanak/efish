<template>
  <div class="input-wrapper" :class="{ q: inputYears }">
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
        :options="list_quarter"
        :preserve-search="true"
        track-by="id"
        label="name"
        :multiple="multiple"
        :close-on-select="!multiple"
        :disabled="disabled"
        :selectionChanged="'4 квартал(январь-март)'"
        class="multiselect__check"
        v-model="value"
      >
        <template slot="singleLabel" slot-scope="{ option }">{{ option.values[0].value }}</template>

        <template slot="noResult">{{ $t('components.not_found') }}</template>
        <template slot="noOptions">{{ $t('components.not_found') }}</template>
        <template slot="placeholder">{{ $t('placeholder.choose') }}</template>
      </multiselect>
      <input v-if="inputYears" type="number" min="1900" max="2099" step="1" v-model="years" />
      <input type="hidden" :name="name" :value="value.id" v-if="value && !multiple" />
      <input type="hidden" :name="name" :value="'[' + idValues(value) + ']'" v-else-if="value" />
    </div>
    <div class="input-required" v-if="errors && !errors.required">
      {{ $t('system_message.required_message') }}
    </div>
  </div>
</template>

<script>
import { api } from '@/boot/axios';
import Multiselect from 'vue-multiselect';
import moment from 'moment';

export default {
  name: 'region',
  components: {
    Multiselect,
  },
  data() {
    return {
      value: null,
      years: null,
      list_quarter: [],
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
    allOptions: {
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

    inputYears: {
      type: Boolean,
      default: false,
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
        let quartal;
        if (this.inputYears) {
          quartal = item.id + ',' + this.years;
        } else {
          quartal = item.id;
        }
        this.$emit('update:modelValue', quartal);
      } else if (item) {
        this.$emit('update:modelValue', this.idValues(item));
      }
    },
  },
  computed: {
    formList() {
      if (this.confinesValue) {
        let list = this.array.filter((element) => {
          return this.confinesValue.find((e) => {
            if (e == element.id) {
              return true;
            }
          });
        });
        return list;
      }

      return this.array;
    },
  },
  methods: {
    idValues(array) {
      let ids = [];
      array.find((element) => {
        ids.push(element.id);
      });
      return ids;
    },
  },
  beforeMount() {
    this.list_quarter = [
      {
        name: '1 квартал(январь-март)',
        period: [0, 1, 2],
        id: 0,
        values: [{ value: '1 квартал(январь-март)' }],
      },
      {
        name: '2 квартал(апрель-июнь)',
        period: [3, 4, 5],
        id: 3,
        values: [{ value: '2 квартал(апрель-июнь)' }],
        selected: true,
      },
      {
        name: '3 квартал(июль-сентябрь)',
        period: [6, 7, 8],
        id: 6,
        values: [{ value: '3 квартал(июль-сентябрь)' }],
      },
      {
        name: '4 квартал(октябрь-декабрь)',
        period: [9, 10, 11],
        id: 9,
        values: [{ value: '4 квартал(октябрь-декабрь)' }],
      },
    ];

    if (this.allOptions) {
      this.list_quarter.unshift({
        name: 'Все...',
        id: 177,
        values: [{ value: 'Все...' }],
      });
    }
    this.years = moment().format('YYYY');

    //const input_body = document.querySelector('.input-body');
    //const width = input_body.clientWidth;
  },
};
</script>

<style>
.input-wrapper {
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
