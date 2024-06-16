<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader': !_getRegionList || !applicationsPond || !applicationsFish,
    }"
  >
    <v-preloader
      v-if="!_getRegionList || !applicationsPond || !applicationsFish"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="_getRegionList && applicationsPond && applicationsFish">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingAnalyticManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ title }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="filter__width">
                      <div class="row">
                        <div class="col-lg-4">
                          <div class="row">
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
                      </div>
                    </div>
                  </div>

                  <v-data-table
                    class="table__analytic"
                    :headers="[
                      // { text: 'Id', value: 'id', sortable: false, width: '40px'  },
                      {
                        text: 'Наименование водоема',
                        value: 'farm_name',
                        width: '20vw',
                        sortable: false,
                      },
                      { text: 'Лимит (тонн)', value: 'farm_sum_of_payment_plan', sortable: false },
                      { text: 'Фактич (тонн)', value: 'farm_sum_of_payment_fact', sortable: false },
                      { text: '%', value: 'percentage', sortable: false },
                    ]"
                    :items="analytic"
                    hide-default-footer
                    :loading="false"
                    show-expand
                    :single-expand="true"
                    :expanded.sync="expanded"
                    item-key="user_name"
                  >
                    <template v-slot:expanded-item="{ headers, item }">
                      <td
                        :colspan="headers.length"
                        style="padding: 0; border-radius: 10px !important"
                        v-if="item.fish"
                      >
                        <div class="v-data-table">
                          <div class="v-data-table__wrapper">
                            <table width="100%">
                              <thead class="v-data-table-header">
                                <tr>
                                  <th style="width: 100%; min-width: 20vw">Рыбы</th>
                                  <th style="width: 150px; min-width: 150px; max-width: 150px">
                                    Лимит (тонн)
                                  </th>
                                  <th style="width: 150px; min-width: 150px; max-width: 150px">
                                    Фактич (тонн)
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="fish in item.fish">
                                  <td style="border-right: 1px solid #d3e7fb">{{ fish.name }}</td>
                                  <td>{{ fish.limit_plan }}</td>
                                  <td>{{ fish.limit_fact }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </template>

                    <template v-slot:body.append="{ headers }">
                      <tr class="tr__total" v-if="analytic.result">
                        <td :colspan="2">
                          <strong>Итого</strong>
                        </td>
                        <td>
                          <strong>{{ analytic.result.limit_plan }}</strong>
                        </td>
                        <td>
                          <strong>{{ analytic.result.limit_fact }}</strong>
                        </td>
                        <td>
                          <strong>{{ analytic.result.payments_plan }}</strong>
                        </td>
                        <td>
                          <strong>{{ analytic.result.payments_fact }}</strong>
                        </td>
                      </tr>
                    </template>

                    <v-alert slot="no-results" :value="true" color="error">
                      {{ $t('system_message.search') }}
                    </v-alert>
                  </v-data-table>

                  <div class="monitoring__line monitoring__line--footer" v-if="analytic.data">
                    <div class="monitoring__line--title">
                      {{ $t('admin.monitoring.form') }}
                    </div>
                    <div class="monitoring__line--download">
                      <div class="monitoring__download--item">
                        <a class="monitoring__download--link" @click="apiGetAnalyticsFile('xlsx')"
                          >.xls</a
                        >
                      </div>
                      <div class="monitoring__download--item">
                        <a class="monitoring__download--link" @click="apiGetAnalyticsFile('pdf')"
                          >.pdf</a
                        >
                      </div>
                    </div>
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
import { mapGetters, mapActions } from 'vuex';

import { api } from '@/boot/axios';

export default {
  data() {
    return {
      viewType: 'table',
      title: '',
      expanded: [],
      singleExpand: false,

      analytic: [],

      applicationsLimit: [],
      applicationsPond: [],
      applicationsFish: [],
      applicationsUser: null,

      modalTo: false,
      modalFrom: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      filter: {
        limit: null,
        region: null,
        pond: null,
        fish: null,
        range_to: null,
        range_from: null,
        user: null,
      },

      errorMessage: {
        status: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
    };
  },
  watch: {
    date(val) {
      //this.dateFormatted = this.formatDate(this.date)
    },
    filter: {
      handler() {
        //this.apiGetAnalytics();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['_getRegionList']),
    formList() {
      let pondList = this.applicationsPond.filter((element) => {
        if (this.filter.region && this.filter.region.length) {
          return this.filter.region.find((region) => {
            if (region && region.links) {
              return region.links.find((selected) => {
                return element.id == selected.item_id ? true : false;
              });
            }
            return false;
          });
        }
        return false;
      });
      let fishList = this.applicationsFish.filter((element) => {
        return true;
      });
      let userList = [];
      if (this.applicationsUser) {
        userList = this.applicationsUser[0].users;
      }

      let list = {
        region: this._getRegionList,
        pond: pondList,
        fish: fishList,
        user: userList,
      };
      if (!this.filter.limit) {
        list = {
          region: [],
          pond: [],
          fish: [],
          user: [],
        };
      }
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
    nameWithLang({ first_name, last_name, middle_name, iin_bin }) {
      return `${first_name} ${last_name} ${middle_name}(${iin_bin})`;
    },
    apiGetAnalyticsFile(typeFile) {
      let { limit, ...params } = this.filter;
      if (this.filter.limit) {
        params.limit = this.filter.limit.id;
      }
      if (this.filter.region) {
        params.region = [];
        this.filter.region.find((item) => {
          params.region.push(item.id);
        });
      }
      if (this.filter.pond) {
        params.pond = [];
        this.filter.pond.find((item) => {
          params.pond.push(item.id);
        });
      }
      if (this.filter.fish) {
        params.fish = [];
        this.filter.fish.find((item) => {
          params.fish.push(item.id);
        });
      }
      if (this.filter.user) {
        params.user = [];
        this.filter.user.find((item) => {
          params.user.push(item.id);
        });
      }
      params.type = typeFile;
      api
        .get('analytics/1rh/subject', {
          responseType: 'arraybuffer',
          params: params,
        })
        .then((response) => {
          let fileURL = window.URL.createObjectURL(new Blob([response.data]), {
            type: response.headers['content-type'],
          });
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          const extensions = {
            'application/vnd.ms-excel': 'xlsx',
            'application/pdf': 'pdf',
          };
          const contentType = response.headers['content-type'];
          const extension = extensions[contentType];
          const filename = 'reporting.' + extension;

          fileLink.setAttribute('download', filename);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(() => {});
    },
    apiGetAnalytics() {
      this.analytic = [];
      let { limit, ...params } = this.filter;
      if (this.filter.limit) {
        params.limit = this.filter.limit.id;
      }
      if (this.filter.region) {
        params.region = [];
        this.filter.region.find((item) => {
          params.region.push(item.id);
        });
      }
      if (this.filter.pond) {
        params.pond = [];
        this.filter.pond.find((item) => {
          params.pond.push(item.id);
        });
      }
      if (this.filter.fish) {
        params.fish = [];
        this.filter.fish.find((item) => {
          params.fish.push(item.id);
        });
      }
      if (this.filter.user) {
        params.user = [];
        this.filter.user.find((item) => {
          params.user.push(item.id);
        });
      }
      api
        .get('analytics/1rh/subject', {
          params: params,
        })
        .then((response) => {
          if (response.data) {
            if (response.data.data.length) {
              this.analytic = response.data;
            }
          }
        });
    },
    apiGetPondList() {
      alert(1);

      api.get('https://api.efish.airweb.kz/api/v1/o/list/1').then((response) => {
        const farm = response.data.data.find((item) => item.region_id == this.$route.params.id);
        this.title = farm.region_name;

        if (response.data) {
          this.analytic = farm.farms;
        }
      });

      return false;
    },
    apiGetFishList() {
      api
        .get('catalog/' + 4 + '/entry/all')
        .then((response) => {
          if (response.data) {
            response.data.find((element) => {
              element.name = element.values[0].value;
            });
            this.applicationsFish = response.data;
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
            if (error?.response?.status == 403) {
              this.errorMessage.status = 403;
              this.errorMessage.text = error?.response?.data?.message;
            }
          }
        });
    },

    apiGetLimitList() {
      api
        .get('limit/list', {
          params: {
            status: 'active',
          },
        })
        .then((response) => {
          if (response.data) {
            this.applicationsLimit = response.data.data;
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
            if (error?.response?.status == 403) {
              this.errorMessage.status = 403;
              this.errorMessage.text = error?.response?.data?.message;
            }
          }
        });
    },
  },
  beforeMount() {
    //this._fetchRegionList();
    this.apiGetPondList();
    //this.apiGetFishList();

    //this.apiGetAnalytics();
    //this.apiGetLimitList();
  },
};
</script>

<style scoped></style>
