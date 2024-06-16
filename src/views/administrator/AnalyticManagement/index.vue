<template>
  <div class="wrap__content">
    <!--    <v-preloader v-if="!applications || !$store.state.userObject" :message="errorMessage"></v-preloader>-->

    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['AnalyticManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('sidebar.analytics') }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="card__content--body">
                <!--<v-quota-schedule></v-quota-schedule>-->

                <div class="analytic__filter">
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="analytic__filter--item">
                        <multiselect
                          class="select__status"
                          v-model="filter.region"
                          :options="formList.region"
                          label="name"
                          :preserve-search="true"
                          :clearOnSelect="false"
                          :clear-on-select="false"
                          :placeholder="$t('components.region')"
                        >
                          <template slot="singleLabel" slot-scope="{ option }">{{
                            option.name
                          }}</template>
                          <template slot="noOptions">{{
                            $t('components.region_not_found')
                          }}</template>
                          <template slot="noResult">{{ $t('components.not_found') }}</template>
                        </multiselect>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="analytic__filter--item">
                        <multiselect
                          class="select__status"
                          v-model="filter.pond"
                          :options="formList.pond"
                          label="name"
                          :preserve-search="true"
                          :clearOnSelect="false"
                          :clear-on-select="false"
                          :placeholder="$t('components.pond')"
                        >
                          <template slot="singleLabel" slot-scope="{ option }">{{
                            option.name
                          }}</template>
                          <template slot="noOptions">{{
                            $t('components.pond_not_found')
                          }}</template>
                          <template slot="noResult">{{ $t('components.not_found') }}</template>
                        </multiselect>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="analytic__filter--item">
                            <v-app>
                              <v-dialog
                                ref="dialog"
                                v-model="modalTo"
                                :return-value.sync="date"
                                persistent
                                width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <label class="search__label">
                                    <input
                                      type="text"
                                      name="user"
                                      :value="filter.range_to"
                                      v-on="on"
                                      v-bind="attrs"
                                      :placeholder="$t('components.filter.range_to')"
                                    />
                                  </label>
                                </template>
                                <v-date-picker
                                  v-model="filter.range_to"
                                  @input="modalTo = false"
                                  locale="ru-RU"
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="(filter.range_to = null), (modalTo = false)"
                                  >
                                    {{ $t('components.filter.reset') }}
                                  </v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-app>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="analytic__filter--item">
                            <v-app>
                              <v-dialog
                                ref="dialog"
                                v-model="modalFrom"
                                :return-value.sync="date"
                                persistent
                                width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <label class="search__label">
                                    <input
                                      type="text"
                                      name="user"
                                      :value="filter.range_from"
                                      v-on="on"
                                      v-bind="attrs"
                                      :placeholder="$t('components.filter.range_from')"
                                    />
                                  </label>
                                </template>
                                <v-date-picker
                                  v-model="filter.range_from"
                                  @input="modalFrom = false"
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="(filter.range_from = null), (modalFrom = false)"
                                  >
                                    {{ $t('components.filter.reset') }}
                                  </v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-app>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-lg-4"
                      v-if="
                        $store.state.userObject && $store.state.userObject.role.name != 'declarer'
                      "
                    >
                      <div class="analytic__filter--item">
                        <UserAsyncList v-model="filter.user" :value="filter.user" />
                      </div>
                    </div>
                    <!--
                    <div class="col-lg-2 offset-lg-6">
                      <button class="input-btn form__line--btn" @click="show()">
                        Показать
                      </button>
                    </div>
                    -->
                  </div>
                </div>

                <div class="analytic__body">
                  <div class="analytic__body--card">
                    <v-quota-trade-all :filter="filter"></v-quota-trade-all>
                  </div>

                  <div class="analytic__body--card">
                    <v-quota-all :filter="filter"></v-quota-all>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api, urlApi } from '@/boot/axios';
import QuotaTradeAll from '@/components/dashboard/QuotaTradeAll';
import QuotaAll from '@/components/dashboard/QuotaAll';
import Multiselect from 'vue-multiselect';
import UserAsyncList from '@/components/catalog/UserAsyncList.vue';

import { MOCK_REGIONS_LIST, MOCK_PONDS_LIST } from '@/mockData.js';

export default {
  components: {
    Multiselect,
    UserAsyncList,
    'v-quota-trade-all': QuotaTradeAll,
    'v-quota-all': QuotaAll,
  },
  data() {
    return {
      urlApi: urlApi,

      applicationsPond: null,
      applicationsRegion: null,

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modalTo: false,
      modalFrom: false,
      filter: {
        region: null,
        pond: null,
        range_to: null,
        range_from: null,
        user: null,
      },
    };
  },
  props: {
    user: {
      type: Object,
    },
    placeholder: {
      type: String,
      default: 'Дата',
    },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    'filter.region': function () {
      this.filter.pond = null;
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },

    formList() {
      let pondList = [];
      let regionList = [];

      if (this.applicationsRegion) {
        regionList = this.applicationsRegion;
      }

      if (this.applicationsPond) {
        pondList = this.applicationsPond;
        if (this.filter.region) {
          pondList = [];
          pondList = this.applicationsPond.filter((element) => {
            if (element.category[0].catalog_id == this.filter.region.id) return true;
          });
        }
      }

      let list = {
        region: regionList,
        pond: pondList,
      };
      return list;
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },

    apiGetPondList() {
      MOCK_REGIONS_LIST.find((element) => {
        element.name = element.values[0].value;
      });
      this.applicationsPond = MOCK_REGIONS_LIST;
    },
    apiGetRegionList() {
      MOCK_PONDS_LIST.find((element) => {
        element.name = element.values[0].value;
      });
      this.applicationsRegion = MOCK_PONDS_LIST;
    },
    show() {},
  },
  beforeMount() {
    this.apiGetPondList();
    this.apiGetRegionList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  head: {
    title() {
      return {
        inner: this.$t('sidebar.analytics'),
      };
    },
    meta: [],
  },
};
</script>
<style>
header .header__row {
  display: flex;
}
</style>
