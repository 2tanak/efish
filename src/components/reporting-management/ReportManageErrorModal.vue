<template>
  <modal
    class="modal__block modal__block--middle modal__block--success"
    :name="name"
    :width="550"
    :min-width="550"
    height="auto"
  >
    <div class="modal__block--wrapper">
      <div class="modal__block--close" @click="close">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.5 7.5L7.5 22.5"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.5 7.5L22.5 22.5"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="modal__wrapper">
        <div class="modal__header">
          <div class="modal__title">{{ title }}</div>
        </div>

        <div class="modal__content">
          <div class="modal__form">
            <div
              v-if="message.text"
              class="form__block--line form__messages"
              :class="{
                'form__messages--error': message.status != 200,
                'form__messages--success': message.status == 200,
              }"
            >
              <label class="form__block--input">
                <span class="form__block--title">
                  {{ message.text }}
                </span>
              </label>
            </div>
            <div
              v-if="errorMessage.text"
              class="form__block--line form__messages"
              :class="{
                'form__messages--error': errorMessage.status != 200,
                'form__messages--success': errorMessage.status == 200,
              }"
            >
              <label class="form__block--input">
                <span class="form__block--title">
                  {{ errorMessage.text }}
                </span>
              </label>
            </div>
            <div class="block__row--right">
              <a class="block__item block__item--blue" @click="close">
                {{ $t('button.cancel') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ReportManageErrorModal',
  props: {
    title: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'ReportManageErrorModal',
    },
    message: {
      type: Object,
      default: null,
    },
    errorMessage: {
      type: Object,
      default: null,
    },
  },
  emits: ['close'],
  methods: {
    close() {
      this.$modal.hide(this.name);
      this.$emit('close');
    },
  },
};
</script>
