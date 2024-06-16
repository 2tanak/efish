<template>
  <div>
    <div class="title" v-if="title">
      {{ title }}
    </div>
    <div class="brand-wrapper">
      <div class="brand-item" v-for="(item, key) in modelValue" :key="key">
        <div class="item-wrap">
          <div class="item-wrap__header">
            <div class="item-wrap__title">
              {{ getName(item.pond_id) }}
            </div>
            <div class="item-wrap__remove">
              <div class="input__block--add">
                <a v-if="!disabled" @click="removeFild(key)">
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
          <div class="item-wrap__block">
            <div class="row">
              <div class="col-lg-12">
                <TextInput
                  :name="name + '[' + key + '][square]'"
                  :placeholder="$t('placeholder.quantity')"
                  :disabled="true"
                  :modelValue="item.square"
                ></TextInput>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!disabled" class="reporting-wrapper">
      <a
        class="input-btn form__line--btn form__line--btn-blue"
        @click="$modal.show('modal_add_square')"
      >
        {{ $t('button.add_pond') }} <img src="../../../assets/img/icon-plus.svg" />
      </a>
    </div>

    <modal
      class="modal__block modal__block--middle"
      name="modal_add_square"
      :width="550"
      :min-width="550"
      height="auto"
    >
      <div class="modal__block--wrapper">
        <div class="modal__wrapper">
          <div class="modal__header">
            <div class="modal__title">
              {{ $t('inputs.fish_ton_tenge') }}
            </div>
          </div>

          <div class="modal__content">
            <div class="modal__form">
              <form method="POST" enctype="multipart/form-data">
                <div class="reporting-line">
                  <pond
                    :placeholder="'Выберите водоем'"
                    :modelValue="array.pond_id"
                    :categoryValue="categoryValue"
                    v-on:update:modelValue="array.pond_id = $event"
                    v-on:update:modelObjectsName="array.pond = $event"
                  ></pond>
                </div>
                <div class="reporting-line">
                  <TextInput
                    :type="'number'"
                    :placeholder="'Гектар'"
                    :modelValue="array.square"
                    v-on:update:modelValue="array.square = $event"
                  ></TextInput>
                </div>
              </form>

              <div class="reporting-btn">
                <div class="reporting-wrapper">
                  <a class="input-btn form__line--btn" @click="addFild()">
                    {{ $t('button.add') }}
                  </a>
                  <a
                    class="input-btn form__line--btn form__line--btn-black"
                    @click="$modal.hide('modal_add_square')"
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
import Pond from '@/components/components/Inputs/pond';
import TextInput from '@/components/components/Inputs/TextInput.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'pondSquare',
  components: {
    TextInput,
    Pond,
  },
  data() {
    return {
      array: {
        pond_id: null,
        square: null,
      },
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
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    categoryValue: {
      type: [Number, Array],
      default: null,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  watch: {},
  computed: {
    ...mapGetters({
      _getPondById: '_getPondById',
    }),
    getName() {
      return (id) => {
        return this._getPondById(id)?.name;
      };
    },
  },
  methods: {
    ...mapActions(['_fetchPondList']),
    addFild() {
      this.modelValue.push(this.array);
      this.$modal.hide('modal_add_square');
      this.array = {
        pond_id: null,
        square: null,
      };
    },
    removeFild(index) {
      this.modelValue.splice(index, 1);
    },
  },
  mounted() {
    this._fetchPondList();
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
.item-wrap {
  background: #f7fbff;
  border-radius: 5px;
  padding: 12px 18px;
}
.item-wrap__header {
  position: relative;
  margin-bottom: 5px;
}
.item-wrap__title {
  font-weight: 600;
  font-size: 16px;
  color: #475f84;
}
.item-wrap__remove {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
