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
          <div class="modal__title">
            {{ title }}
          </div>
        </div>

        <div class="modal__content">
          <div class="modal__form">
            <div class="block__row">
              <div class="block__row--left">
                <a class="block__item block__item--green" @click.prevent="$emit('accept')">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 18.3333C14.6025 18.3333 18.3334 14.6025 18.3334 9.99996C18.3334 5.39746 14.6025 1.66663 10 1.66663C5.39752 1.66663 1.66669 5.39746 1.66669 9.99996C1.66669 14.6025 5.39752 18.3333 10 18.3333Z"
                      stroke="#5ABB5E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.5 10L9.16667 11.6667L12.5 8.33337"
                      stroke="#5ABB5E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Подписать ЭЦП
                </a>
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
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ReportManageModal',
  props: {
    title: {
      type: String,
      default: 'Для сохранения журнала, необходимо подтверждение электронно цифровой подписью',
    },
    name: {
      type: String,
      default: 'ReportManageModal',
    },
  },
  emits: ['close', 'accept'],
  methods: {
    close() {
      this.$modal.hide(this.name);
      this.$emit('close');
    },
  },
};
</script>
