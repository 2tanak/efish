<template>
  <div>
    <AnimalWorldUserName />

    <FormGroupWrapper1 :title="$t('inputs.region')">
      <region
        :name="'region_id'"
        :required="true"
        :key="form.region_id"
        :disabled="true"
        :userBind="userRegions"
        :placeholder="$t('placeholder.choose')"
        :errors="v.form.region_id"
        @update:modelValue="form.region_id = $event"
      >
      </region>
    </FormGroupWrapper1>

    <FormGroupWrapper1 :title="$t('inputs.pond')">
      <pond
        :required="true"
        :key="render_pond"
        :disabled="true"
        :userBind="userPond"
        :name="'farm_id'"
        :placeholder="$t('placeholder.choose')"
        :errors="v.form.farm_id"
        v-on:update:modelValue="form.farm_id = $event"
      ></pond>
    </FormGroupWrapper1>

    <FormGroupWrapper1 :title="$t('inputs.district')">
      <district
        :required="true"
        :key="render_district"
        :disabled="true"
        :name="'district_id'"
        :userBind="userPond"
        :placeholder="$t('placeholder.choose')"
        v-on:update:modelValue="form.district_id = $event"
      ></district>
    </FormGroupWrapper1>

    <SelectYear v-model="surrender_date" :disabled="disabled" />

    <div v-if="form.kato_id" class="reporting-line">
      <div class="row">
        <div class="col-xl-4">
          <div class="reporting__title">
            {{ $t('inputs.kato') }}
          </div>
        </div>
        <div class="col-xl-5">
          <kato
            :name="'kato_id'"
            :required="true"
            :disabled="true"
            :categoryValue="form.region_id"
            :placeholder="$t('placeholder.choose')"
            :errors="v.form.kato_id"
            :modelValue="form.kato_id"
            @update:modelValue="form.kato_id = $event"
          ></kato>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/boot/axios';

import AnimalWorldUserName from '@/components/reporting-management/AnimalWorldUserName.vue';
import FormGroupWrapper1 from '@/components/UI/FormGroupWrappers/FormGroupWrapper1.vue';
import Kato from '@/components/components/Inputs/kato';

import Region from '@/components/components/Inputs/region';
import Pond from '@/components/components/Inputs/pond';
import District from '@/components/components/Inputs/district';
import SelectYear from '@/components/reporting-management/SelectYear.vue';

export default {
  components: {
    AnimalWorldUserName,
    FormGroupWrapper1,
    Region,
    Pond,
    District,
    SelectYear,
    Kato,
  },
  data() {
    return {
      applicationsUser: null,
      userRegions: null,
      render_pond: 0,
      render_farm: 0,
      render_district: 0,
      quarter_input_disabled: false,
    };
  },
  props: {
    v: {
      type: Object,
      default: null,
    },
    form: {
      type: Object,
      default: null,
    },
    quarter_value: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    '$store.state.userObject': {
      immediate: true,
      handler: function () {
        this.apiGetUserRegions();
      },
    },
    'form.farm_id': function () {
      this.render_farm++;
      this.render_pond++;
    },
    'form.district_id': function () {
      this.render_district++;
    },
  },
  computed: {
    userPond() {
      return this.applicationsUser?.pond || [];
    },
    surrender_date: {
      get() {
        return this.form.surrender_date;
      },
      set(value) {
        this.$emit('input', {
          ...this.form,
          surrender_date: value,
        });
      },
    },
  },
  methods: {
    apiGetUserRegions() {
      if (this.$store.state.userObject && this.$store.state.userObject.regions) {
        let array = [];
        this.$store.state.userObject.regions.find((element) => {
          array.push(element.region_id);
        });
        this.userRegions = array;
      }
    },
    apiGetUser() {
      api
        .get('/user/region')
        .then((response) => {
          if (response.data) {
            this.applicationsUser = response.data;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error?.response?.status == 500) {
              this.errorMessage.status = 500;
              this.errorMessage.text = this.$t('system_message.500');
            }
            if (error?.response?.status == 401) {
              this.errorMessage.status = 401;
              this.errorMessage.text = error.response.data.error_message;
              this.$router.push('/' + this.$i18n.locale + '/login');
            }
            if (error?.response?.status == 422) {
              this.errorMessage.status = 422;
              this.errorMessage.text = error.response.data.error_message;
            }
          }
        });
    },
  },
  beforeMount() {
    this.apiGetUser();
  },
};
</script>
