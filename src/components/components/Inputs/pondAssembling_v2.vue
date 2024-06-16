<template>
  <div>
    <div class="vodoem_item" v-for="(item, key) in modelValue" :key="key">
      <div>
        <div class="content__title--text mb-3 mt-5">
          {{ item.value }}
        </div>
        <div class="reporting-line">
          <div class="row">
            <div class="col-xl-8">
              <div class="row">
                <div class="col-xl-6">
                  <div class="row">
                    <div class="col-lg-12">
                      <TextInput
                        :title="'Код КАТО (классификатор административно-территориальных объектов)'"
                        :type="'text'"
                        :name="'code_kato'"
                        :required="true"
                        :placeholder="'Код'"
                        v-on:update:modelValue="item.code_kato = $event"
                      ></TextInput>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="row">
                        <div class="title col-12">
                          Общее количество рыбохозяйственных водоемов и (или) участков (с указанием
                          общей площади (гектар))
                        </div>
                        <div class="col-lg-6">
                          <TextInput
                            :title="''"
                            :type="'text'"
                            :name="'code_kato'"
                            :required="true"
                            :placeholder="'Код'"
                            v-on:update:modelValue="item.code_kato = $event"
                          ></TextInput>
                        </div>
                        <div class="col-lg-6">
                          <TextInput
                            :title="''"
                            :type="'text'"
                            :name="'code_kato'"
                            :required="true"
                            :placeholder="'Код'"
                            v-on:update:modelValue="item.code_kato = $event"
                          ></TextInput>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-----reporting-line-1------------>
        <div class="title3">
          Закрепление рыбохозяйственных водоемов за рыбохозяйственными организациями
        </div>
        <div class="reporting-line">
          <div class="row">
            <div class="col-xl-8">
              <div class="row">
                <div class="col-lg-6">
                  <div class="row">
                    <div class="title col-12">
                      Количество закрепленных водоемов (с указанием общей площади (гектар))
                    </div>
                    <div class="col-lg-6">
                      <TextInput
                        :title="''"
                        :type="'number'"
                        :name="'zakrep_vidoem'"
                        :required="true"
                        :disabled="disabled"
                        :placeholder="'Количество'"
                        v-on:inputName="input_name = $event"
                        v-on:update:modelValue="updateItem"
                      ></TextInput>
                    </div>

                    <div class="col-lg-6">
                      <TextInput
                        :title="''"
                        :type="'number'"
                        :name="'zakrep_vidoem_gektar'"
                        :required="true"
                        :disabled="disabled"
                        :placeholder="'Гектар'"
                        v-on:inputName="input_name = $event"
                        v-on:update:modelValue="updateItem"
                      ></TextInput>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="row">
                    <div class="col-lg-7">
                      <TextInput
                        :title="'Количество рыбохозяйственных организаций'"
                        :type="'number'"
                        :name="'zakrep_vidoem'"
                        :required="true"
                        :disabled="disabled"
                        :placeholder="'Количество'"
                        v-on:inputName="input_name = $event"
                        v-on:update:modelValue="updateItem"
                      ></TextInput>
                    </div>

                    <div class="col-lg-5">
                      <TextInput
                        :title="'% закрепления<br><br>'"
                        :type="'number'"
                        :name="'zakrep_vidoem_gektar'"
                        :required="true"
                        :disabled="disabled"
                        :placeholder="'Гектар'"
                        v-on:inputName="input_name = $event"
                        v-on:update:modelValue="updateItem"
                      ></TextInput>
                    </div>
                  </div>
                </div>
              </div>
              <!------row------->
            </div>
            <!------col------->
          </div>
          <!-----row------->
        </div>
        <!-----reporting-line------->
        <div class="reporting-line">
          <div class="row">
            <div class="col-xl-8">
              <div class="row">
                <div class="col-lg-6">
                  <div class="row">
                    <div class="title col-12">
                      Количество незакрепленных рыбохозяйственных водоемов (с указанием общей
                      площади (гектар))
                    </div>
                    <div class="col-lg-6">
                      <TextInput
                        :title="''"
                        :type="'number'"
                        :name="'zakrep_vidoem'"
                        :required="true"
                        :disabled="disabled"
                        :placeholder="'Количество'"
                        v-on:inputName="input_name = $event"
                        v-on:update:modelValue="updateItem"
                      ></TextInput>
                    </div>

                    <div class="col-lg-6">
                      <TextInput
                        :title="''"
                        :type="'number'"
                        :name="'zakrep_vidoem_gektar'"
                        :required="true"
                        :disabled="disabled"
                        :placeholder="'Гектар'"
                        v-on:inputName="input_name = $event"
                        v-on:update:modelValue="updateItem"
                      ></TextInput>
                    </div>
                  </div>
                </div>
              </div>
              <!------row------->
            </div>
            <!------col------->
          </div>
          <!-----row------->
        </div>
        <!-----reporting-line------->
      </div>
      <!-------vodoem_item------>
    </div>
    <!-------корень------>
    <div class="reporting-wrapper">
      <a
        class="input-btn form__line--btn form__line--btn-blue"
        @click="$modal.show('modal_add_square')"
      >
        {{ $t('button.add_pond') }}
        <img src="../../../assets/img/icon-plus.svg" />
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
                    v-on:update:modelObjectsName="array.value = $event"
                  ></pond>
                </div>
                <div class="reporting-line">
                  <TextInput
                    :type="'number'"
                    :placeholder="'Гектар'"
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

export default {
  name: 'pondSquare',
  components: {
    TextInput,
    Pond,
  },
  data() {
    return {
      input_name: null,
      array: {
        pond_id: null,
        square: null,
        code_kato: null,
        value: null,
      },
    };
  },
  props: {
    value: {
      type: [Number, Array],
      default: null,
    },
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
  },
  emits: ['update:modelValue'],
  watch: {},
  computed: {},
  methods: {
    updateItem(val) {
      this.value[this.input_name] = val;
      this.$emit('input', this.value);
    },
    addFild() {
      this.modelValue.push(this.array);
      this.$modal.hide('modal_add_square');
      this.array = {
        pond_id: null,
        square: null,
        code_kato: null,
      };
    },
    removeFild(index) {
      //this.modelValue.splice(index, 1);
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
