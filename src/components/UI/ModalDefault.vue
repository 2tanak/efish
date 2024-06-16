<template>
  <div>
    <div class="reporting-wrapper">
      <a class="input-btn form__line--btn form__line--btn-blue" @click="$modal.show(name)">
        {{ title }} <img :src="require('@/assets/img/icon-plus.svg')" />
      </a>
    </div>

    <modal
      class="modal__block modal__block--middle"
      :name="name"
      :width="550"
      :min-width="550"
      height="auto"
    >
      <div class="modal__block--wrapper">
        <div class="modal__wrapper">
          <div class="modal__header">
            <div class="modal__title">{{ title }}</div>
          </div>
          <div class="modal__content">
            <div class="modal__form">
              <slot></slot>

              <div class="reporting-btn mt-2">
                <div class="reporting-wrapper">
                  <a class="input-btn form__line--btn" @click="$emit('accept'), $modal.hide(name)">
                    {{ $t('button.add') }}
                  </a>
                  <a
                    class="input-btn form__line--btn form__line--btn-black"
                    @click="$modal.hide(name)"
                  >
                    {{ $t('button.close') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'ModalDefault',
  props: {
    title: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'ModalDefault',
    },
  },
  emits: ['accept'],
};
</script>
