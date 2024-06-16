<template>
  <div>
    <div class="brand-wrapper">
      <div class="brand-item" v-for="(item, key) in modelValue" :key="key">
        <div class="d-flex align-items-center">
          <div class="">
            <div class="row">
              <div class="col-lg-8">
                <TextInput
                  :title="$t('inputs.brand')"
                  :placeholder="$t('inputs.brand')"
                  :name="name + '[' + key + ']' + '[fleet_brand]'"
                  v-bind:required="required"
                  v-bind:disabled="disabled"
                  :modelValue="item.fleet_brand"
                  v-on:update:modelValue="item.fleet_brand = $event"
                ></TextInput>
              </div>
              <div class="col-lg-4">
                <TextInput
                  :title="$t('inputs.year_of_issue')"
                  :placeholder="$t('inputs.year_of_issue')"
                  :name="name + '[' + key + ']' + '[year_of_manufacture]'"
                  v-bind:required="required"
                  v-bind:disabled="disabled"
                  :modelValue="item.year_of_manufacture"
                  v-on:update:modelValue="item.year_of_manufacture = $event"
                ></TextInput>
              </div>
            </div>
          </div>
          <div class="ml-3" v-if="!disabled">
            <div class="input__block--add justify-content-center mt-3">
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

    <div class="reporting-wrapper" v-if="!disabled">
      <a class="input-btn form__line--btn form__line--btn-blue" @click="addFild()">
        {{ $t('button.add_fields') }} <img src="../../../assets/img/icon-plus.svg" />
      </a>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/components/Inputs/TextInput.vue';

export default {
  name: 'BrandRepeater',
  components: { TextInput },
  props: {
    name: {
      type: String,
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
  },
  emits: ['update:modelValue'],
  methods: {
    addFild() {
      this.modelValue.push({
        fleet_brand: '',
        year_of_manufacture: '',
      });
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
</style>
