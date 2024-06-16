<template>
  <div>
    <div class="brand-wrapper">
      <div class="brand-item" v-for="(item, key) in modelValue" :key="key">
        <div class="d-flex align-items-center">
          <TextInput
            :title="title"
            :placeholder="placeholder"
            :name="name + '[' + key + ']'"
            :required="required"
            :disabled="disabled"
            :errors="errors"
            :modelValue="item.value"
            v-on:update:modelValue="update(key, $event)"
          ></TextInput>
          <div class="ml-3">
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

    <div v-if="!disabled" class="reporting-wrapper">
      <a class="input-btn form__line--btn form__line--btn-blue" @click="addField()">
        {{ $t('button.add_fields') }} <img src="../../../assets/img/icon-plus.svg" />
      </a>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/components/Inputs/TextInput.vue';

export default {
  name: 'TextInputRepeater',
  components: { TextInput },
  props: {
    modelValue: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
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
  methods: {
    addField() {
      this.$emit('update:modelValue', [...this.modelValue, { value: '' }]);
    },
    removeFild(index) {
      this.$emit(
        'update:modelValue',
        this.modelValue.filter((_, eInd) => eInd !== index),
      );
    },
    update(index, value) {
      this.$emit(
        'update:modelValue',
        this.modelValue.map((el, eInd) => {
          if (eInd === index) return { ...el, value };
          return el;
        }),
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
</style>
