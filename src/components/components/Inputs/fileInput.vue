<template>
  <div class="input-wrapper">
    <div class="title" v-if="title">
      {{ title }}
    </div>
    <div class="input-body" :class="{ 'input-body--error': errors && errors.$error }">
      <label class="file_item">
        <input class="d-none" type="file" ref="file" :name="name" v-on:change="fileUpload()" />
        <span class="file_item__title" v-if="!file">
          {{ placeholder }}
        </span>
        <span class="file_item__title" v-else>
          {{ file.name }}
        </span>
        <span class="file_item__icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3978 15 15V5.625L10.875 1.5H4.5C4.10218 1.5 3.72064 1.65804 3.43934 1.93934C3.15804 2.22064 3 2.60218 3 3V6"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.5 1.5V6H15"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.5 11.25H9"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.75 13.5L9 11.25L6.75 9"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </label>
    </div>
    <!-- v-bind:required="required"  -->
    <div class="input-required" v-if="errors && !errors.required">
      {{ $t('system_message.required_message') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'fileInput',
  data() {
    return {
      file: null,
    };
  },
  props: {
    name: {
      type: String,
    },
    title: {
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
      type: [File, String],
      default: null,
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    fileUpload() {
      this.file = this.$refs.file.files[0];
      this.$emit('update:modelValue', this.$refs.file.files[0]);
    },
  },
};
</script>

<style scoped>
.file_item {
  background: #52a5fc;
  border-radius: 5px;
  padding: 12px 40px 12px 20px;
  margin-bottom: 0;
  width: 100%;
  display: flex;
  position: relative;
  cursor: pointer;
}
.file_item__title {
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
}
.file_item__icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
