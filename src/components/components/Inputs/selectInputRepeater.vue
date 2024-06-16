<template>
  <div>
    <div class="title" v-if="title" v-html="title"></div>
    <div class="brand-wrapper">
      <div class="brand-item" v-for="(item, key) in modelValue" :key="key">
        <div class="d-flex align-items-center">
          <region
            v-if="chouseComponent === 'region'"
            :required="true"
            :placeholder="placeholderInput"
            v-on:update:modelValue="item.id = $event"
            v-on:update:modelObjectsName="item.name = $event"
          ></region>

          <country
            v-if="chouseComponent === 'country'"
            :required="true"
            :placeholder="placeholderInput"
            v-on:update:modelValue="item.id = $event"
            v-on:update:modelObjectsName="item.name = $event"
          ></country>

          <div class="ml-3" v-if="key != 0">
            <div class="input__block--add justify-content-center">
              <a @click="removeFild(key)">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.02375 12.9762L12.9762 8.02375M12.9762 12.9762L8.02375 8.02375M10.5 19.25C15.3125 19.25 19.25 15.3125 19.25 10.5C19.25 5.6875 15.3125 1.75 10.5 1.75C5.6875 1.75 1.75 5.6875 1.75 10.5C1.75 15.3125 5.6875 19.25 10.5 19.25Z"
                    stroke="#DF4242"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="reporting-wrapper">
      <a
        v-if="placeholderButton"
        class="input-btn form__line--btn form__line--btn-blue"
        @click="addFild()"
      >
        {{ placeholderButton }} <img src="../../../assets/img/icon-plus.svg" />
      </a>
      <a v-else class="input-btn form__line--btn form__line--btn-blue" @click="addFild()">
        {{ $t('button.add_fields') }} <img src="../../../assets/img/icon-plus.svg" />
      </a>
    </div>
  </div>
</template>

<script>
import Region from '@/components/components/Inputs/region';
import Country from '@/components/components/Inputs/country';

export default {
  name: 'selectInputRepeater',
  components: { Region, Country },
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
    },
    index: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    placeholderInput: {
      type: String,
      default: '',
    },
    chouseComponent: {
      type: String,
      default: '',
    },
    placeholderButton: {
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
      type: Array,
      default() {
        return [];
      },
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    addFild() {
      this.$emit('input', [...this.modelValue, { id: '', name: '' }]);
    },
    removeFild(index) {
      this.$emit(
        'input',
        this.modelValue.filer((_, ind) => ind === index),
      );
    },
  },
};
</script>

<style scoped>
.brand-wrapper {
  margin-bottom: 15px;
}
.brand-item {
  margin-bottom: 10px;
}
.input-btn {
  padding: 10px 20px;
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
</style>
