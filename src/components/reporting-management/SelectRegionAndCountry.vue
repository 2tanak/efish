<template>
  <div>
    <div class="row brand-wrapper" v-for="(item, itemInd) in value" :key="itemInd">
      <div class="col-xl-5">
        <SelectRegion
          :value="getElem(item[regionKey], '_getRegionList')"
          :required="required"
          :disabled="disabled"
          :with-title="itemInd === 0"
          @input="update(itemInd, regionKey, $event.id)"
        />
      </div>
      <div class="col-xl-5">
        <SelectCountry
          :value="getElem(item[countryKey], '_getCountryList')"
          :required="required"
          :disabled="disabled"
          :with-title="itemInd === 0"
          @input="update(itemInd, countryKey, $event.id)"
        />
      </div>
      <div class="col-1">
        <div class="ml-3" v-if="!disabled && value.length > 1">
          <div class="input__block--add justify-content-center">
            <a @click="removeField(itemInd)">
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

    <div v-if="!disabled" class="reporting-wrapper">
      <a class="input-btn form__line--btn form__line--btn-blue" @click="addField()">
        {{ $t('button.add_fields') }} <img :src="require('@/assets/img/icon-plus.svg')" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import SelectRegion from '@/components/catalog/SelectRegion.vue';
import SelectCountry from '@/components/catalog/SelectCountry.vue';

export default {
  name: 'SelectRegionAndCountry',
  components: { SelectRegion, SelectCountry },
  props: {
    regionKey: {
      type: String,
      required: true,
    },
    countryKey: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['input'],
  computed: {
    ...mapGetters({
      _getRegionList: '_getRegionList',
      _getCountryList: '_getCountryList',
    }),
    getElem() {
      return (id, listName) => {
        return this[listName]?.find((e) => e.id === id);
      };
    },
  },
  methods: {
    update(index, key, value) {
      this.$emit(
        'input',
        this.value.map((el, ind) => {
          if (ind === index) {
            return {
              ...el,
              [key]: value,
            };
          }
          return el;
        }),
      );
    },
    addField() {
      this.$emit('input', [
        ...this.value,
        {
          [this.regionKey]: '',
          [this.countryKey]: '',
        },
      ]);
    },
    removeField(index) {
      this.$emit(
        'input',
        this.value.filter((_, ind) => ind !== index),
      );
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 12px;
  color: #0a091d;
  margin-bottom: 8px;
  line-height: 1.2;
}

.brand-wrapper {
  margin-bottom: 15px;
}

.input-btn {
  padding: 10px 20px;
}
</style>
