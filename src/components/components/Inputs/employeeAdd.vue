<template>
  <div>
    <div class="title" v-if="title">
      {{ title }}
    </div>
    <div class="brand-wrapper">
      <div class="brand-item" v-for="(item, key) in modelValue">
        <div class="item-wrap">
          <div class="item-wrap__header">
            <div class="item-wrap__title">
              {{ item.employee }}
            </div>
            <div class="item-wrap__remove">
              <div class="input__block--add">
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
          <div class="item-wrap__block">
            <div class="row">
              <div class="col-lg-6">
                <TextInput
                  class="mb-2"
                  :name="name + '[' + key + '][wage]'"
                  :placeholder="'Заработная плата'"
                  :disabled="true"
                  :modelValue="item.wage"
                ></TextInput>
              </div>
              <div class="col-lg-6">
                <TextInput
                  class="mb-2"
                  :name="name + '[' + key + '][position]'"
                  :placeholder="'Должность'"
                  :disabled="true"
                  :modelValue="item.position"
                ></TextInput>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="reporting-wrapper">
      <a class="input-btn form__line--btn form__line--btn-blue" @click="$modal.show('modal_add')">
        {{ $t('button.add_employee') }} <img src="../../../assets/img/icon-plus.svg" />
      </a>
    </div>

    <modal
      class="modal__block modal__block--middle"
      name="modal_add"
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
                  <TextInput
                    :placeholder="'ФИО сотрудника'"
                    :modelValue="array.employee"
                    v-on:update:modelValue="array.employee = $event"
                  ></TextInput>
                </div>
                <div class="reporting-line">
                  <TextInput
                    :placeholder="'Заработная плата'"
                    :modelValue="array.wage"
                    v-on:update:modelValue="array.wage = $event"
                  ></TextInput>
                </div>
                <div class="reporting-line">
                  <TextInput
                    :placeholder="'Должность'"
                    :modelValue="array.position"
                    v-on:update:modelValue="array.position = $event"
                  ></TextInput>
                </div>
              </form>

              <div v-show="!disabled" class="reporting-btn">
                <div class="reporting-wrapper">
                  <a class="input-btn form__line--btn" @click="addFild()">
                    {{ $t('button.add') }}
                  </a>
                  <a
                    class="input-btn form__line--btn form__line--btn-black"
                    @click="$modal.hide('modal_add')"
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
// import User from "@/components/components/Inputs/user";
import TextInput from '@/components/components/Inputs/TextInput.vue';
import Fish from '@/components/components/Inputs/fish';

export default {
  name: 'employeeAdd',
  components: {
    TextInput,
    Fish,
  },
  data() {
    return {
      array: {
        employee: null,
        wage: null,
        position: null,
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
    modelValue: {
      type: Array,
      default: [],
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  watch: {},
  computed: {},
  methods: {
    addFild() {
      this.modelValue.push(this.array);
      this.$modal.hide('modal_add');
      this.array = {
        employee: null,
        wage: null,
        position: null,
      };
    },
    removeFild(index) {
      this.modelValue.splice(index, 1);
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
