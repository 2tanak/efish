<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingAnalyticManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__page--back">
                    <a @click="$router.go(-1)">
                      <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            d="M13.125 5.25L7.875 10.5L13.125 15.75"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t("reports.px-1") }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">


                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <div class="search-main">
                        <div class="row">
                          <div class="col-md-4">

                            <div class="table__filter--search">
                              <label class="search__label">
                                <input
                                    type="text"
                                    value=""
                                    name="filter_search"
                                    v-model="v_model_name_search"
                                    placeholder="Поиск по наименованию"
                                />

                                <button>
                                  <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M20.9999 21L16.6499 16.65"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                  </svg>
                                </button>
                              </label>
                            </div>
                            <!-----tsble-filter-search------>
                          </div>
                          <!-----col------>

                          <div class="col-md-4">


                            <div class="table__filter--search">
                              <label class="search__label">
                                <input
                                    type="text"
                                    v-model="v_model_iin_search"
                                    placeholder="Поиск по ИИН/БИН"
                                />

                                <button>
                                  <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M20.9999 21L16.6499 16.65"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                  </svg>
                                </button>
                              </label>
                            </div>
                            <!-----search------>
                          </div>
                          <!-----col------>

                          <div class='col-md-4'>

                            <div class="calendar">

                              <quarter
                                  :title="''"
                                  ref="quarter"
                                  :placeholder="'Выбрать квартал'"
                                  :inputYears="true"
                                  :allOptions="true"
                                  v-on:update:modelValue="quarter_value = $event"
                              >
                              </quarter>
                            </div>
                          </div>
                        </div>
                        <!-----row------>


                        <div class="row mt-3">

                          <div class="col-md-4">


                            <region
                                ref="region"
                                :name="'region_id'"
                                v-on:update:modelValue="v_model_region_search = $event"
                                :allOptions="false"
                                :multiple="multiple"
                                :title="''"
                                :placeholder="'Поиск по региону'"
                            >
                            </region>

                          </div>
                          <!-----col------>

                          <div class="col-md-4">

                            <pond
                                :key="render"
                                :multiple="multiple"
                                :title="''"
                                :required="true"
                                :allOptions="false"
                                ref="pond"

                                :placeholder="'Водоем'"
                                v-on:update:modelValue="
                              v_model_pond_search = $event
                              "
                            >
                            </pond>


                          </div>


                          <!-----col------>

                          <div class='col-md-4'>
                            <fish
                                :required="true"
                                :multiple="multiple"
                                name="fish"
                                :placeholder="$t('placeholder.choose')"
                                v-on:update:modelValue="v_model_fish_search = $event"
                            ></fish>

                          </div>
                        </div>
                        <!-----row------>


                      </div>
                      <!-----search-main------>
                    </div>
                  </div>


                  <v-data-table
                      class="table__analytic"
                      :headers="[
                      // { text: 'Id', value: 'id', sortable: false, width: '40px'  },
                      {
                        text: 'Наименование субъекта',
                        value: 'name',
                        width: '20vw',
                        sortable: false,
                      },
                      { text: 'Квота (тонн)', value: 'total_catch_quota', sortable: false },
                      {
                        text: 'Освоение (тонн)',
                        value: 'total_actually_caught',
                        sortable: false,
                      },
                      { text: '%', value: 'percentage_caught', sortable: false },
                      { text: 'Платежи за пользование биоресурсами (тысяч тенге)', value: 'payments', sortable: false},
					/*
                      {
                        text: this.$t('headers.action'),
                        value: 'action',
                        align: 'center',
                        sortable: false,
                        width: '200px',
                      },
					  */
                      ,
                    ]"
                      :items="filteredlist"
                      hide-default-footer
                      :loading="false"
                      :footer-props="{
                        'items-per-page-options': [5, 10, 20, 30, 40, 50],
                      }"

                      show-expand
                      :single-expand="true"
                      :expanded.sync="expanded"
                      item-key="region_name"
                  >
                    <template v-slot:expanded-item="{ headers, item }">
                      <td :colspan="headers.length" style="padding: 0; border-radius: 10px !important;" v-if="item.fishes">
                        <div class="v-data-table" style="padding: 10px 60px;background: white;border-radius: 10px !important;">
                          <div class="v-data-table__wrapper">

                            <table width="100%">
                              <thead class="v-data-table-header">
                              <tr>

                                <th style="width: 100%; min-width: 20vw;">Рыба</th>
                                <th style="width: 140px; min-width: 140px; max-width: 140px;">Лимит (тонн)</th>
                                <th style="width: 167px; min-width: 167px; max-width: 167px;">Фактич (тонн)</th>
                                <th style="width: 52px; min-width: 52px; max-width: 52px;">%</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="fish in item.fishes">
                                <td style="border-right: 1px solid #D3E7FB;">{{ fish.fish }}</td>
                                <td>{{ fish.catch_quota }}</td>
                                <td>{{ fish.actually_caught }}</td>
                                <td>{{ fish.percentage }}</td>
                              </tr>
                              </tbody>
                            </table>

                          </div>
                        </div>
                      </td>
                    </template>

                    <template v-slot:item.payments="{item}">

                      <div class="payments__block">

                        <div class="payments__item">
                          <strong>план</strong><br>
                          <span>{{ item.payment_plan ?? 0 }}</span>
                        </div>
                        <div class="payments__item">
                          <strong>факт</strong><br>
                          <span>{{ item.payment_fact ?? 0 }}</span>
                        </div>
                        <div class="payments__item">
                          <strong>%</strong><br>
                          <span>{{ item.percentage_payments ?? 0 }}</span>
                        </div>

                      </div>

                    </template>

                    <v-alert slot="no-results" :value="true" color="error">
                      {{ $t("system_message.search") }}
                    </v-alert>
                  </v-data-table>


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

import {api} from "@/boot/axios";
import quarter from "@/components/components/Inputs/quarter";
import Region from "@/components/components/Inputs/region";
import Pond from "@/components/components/Inputs/pond";
import Fish from "@/components/components/Inputs/fish";

export default {
  components: {
    quarter, Region, Pond, Fish
  },
  data() {
    return {
      v_model_name_search: [],
      v_model_region_search: [],
      v_model_pond_search: [],
      v_model_iin_search: "",
      multiple: true,
      v_model_fish_search: "",
      render: 0,
      quarter_value: "",
      inputYears: null,
      viewType: "table",
      analytic: null,
      applicationsLimit: [],
      modalTo: false,
      modalFrom: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      filter: {
        limit: null,
        region: null,
        range_to: null,
        range_from: null,
        user: null,
      },

      expanded: [],

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
  computed: {
    ...mapGetters(['_getRegionList']),
    filteredlist() {

      let region = [];
      let pond = [];
      let arr = [];
      if (
          this.v_model_pond_search.length > 0 ||
          this.v_model_region_search.length > 0
      ) {


        const data = [...this.analytic?.data];

        if (this.v_model_pond_search.length > 0) {
          pond = data.filter(e => {
            if (e.farms?.length) {
              return e.farms.find(v => {
                if (v.farm_id) {
                  //e['search']=e.region_name;
                  return this.v_model_pond_search.includes(v.farm_id);
                }
              })
            }
          });
        }


        if (this.v_model_region_search.length > 0) {
          region = data.filter(e => {
            //e['search']=e.region_name;
            return this.v_model_region_search.includes(e.region_id);
          });
        }

        let filter_collect = [...region, ...pond];

        if (this.v_model_region_search.length > 0) {
          filter_collect = filter_collect.filter(e => {
            return this.v_model_region_search.includes(e.region_id);
          });
        }

        if (this.v_model_pond_search.length > 0) {
          filter_collect = filter_collect.filter(e => {
            if (e.farms?.length) {
              return e.farms.find(v => {
                if (v.farm_id) {
                  //e['search']=e.region_name;
                  return this.v_model_pond_search.includes(v.farm_id);
                }
              })
            }
          });
        }

        //убираем дубликаты
        if (filter_collect.length > 0) {
          return filter_collect.filter(val => {
            if (!arr.includes(val.region_name)) {
              arr.push(val.region_name);
              return true;
            }
          })
        }
        return filter_collect;


      }
      return this.analytic?.data;
    },
    formList() {
      let list = {
        region: this._getRegionList,
      };
      if (!this.filter.limit) {
        list = {
          region: [],
        };
      }
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
    apiGetAnalyticsFile(typeFile) {
      let {limit, ...params} = this.filter;
      if (this.filter.limit) {
        params.limit = this.filter.limit.id;
      }
      if (this.filter.region) {
        params.region = this.filter.region.id;
      }
      if (this.filter.user) {
        params.user = this.filter.user.id;
      }
      params.type = typeFile;
      api
          .get("analytics/1rh/regions", {
            responseType: "arraybuffer",
            params: params,
          })
          .then((response) => {
            let fileURL = window.URL.createObjectURL(new Blob([response.data]), {
              type: response.headers["content-type"],
            });
            let fileLink = document.createElement("a");
            fileLink.href = fileURL;
            const extensions = {
              "application/vnd.ms-excel": "xlsx",
              "application/pdf": "pdf",
            };
            const contentType = response.headers["content-type"];
            const extension = extensions[contentType];
            const filename = "reporting." + extension;

            fileLink.setAttribute("download", filename);
            document.body.appendChild(fileLink);

            fileLink.click();
          })
          .catch(() => {});
    },
    apiGetAnalytics() {

      this.analytic = null;
      /*
        let { limit, ...params } = this.filter;
        if (this.filter.limit) {
          params.limit = this.filter.limit.id;
        }
        if (this.filter.region) {
          params.region = this.filter.region.id;
        }
        if (this.filter.user) {
          params.user = this.filter.user.id;
        }
        this.analytic = [];
        */
      api
          .get("http://api.efish.airweb.kz/api/v1/go/list/subjects/1")
          .then((response) => {
            if (response.data) {
              this.analytic = response.data;
            }
          }).catch(() => {});
    },
    apiGetLimitList() {
      api
          .get("limit/list", {
            params: {
              status: "active",
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
                this.errorMessage.text = this.$t("system_message.500");
              }
              if (error?.response?.status == 401) {
                this.errorMessage.status = 401;
                this.errorMessage.text = error.response.data.error_message;
                this.$router.push("/" + this.$i18n.locale + "/login");
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
    this.apiGetAnalytics();
    //this.apiGetLimitList();
  },
};
</script>

<style scoped>

.reporting-btn .input-btn.form__line--btn {
  background: #52A5FC;
  width: 250px;
  height: 47px;
  padding: 0;
  justify-content: center;
  transition: background 1s;
}

/*filter*/
.checkbox {
  display: flex;

  align-items: center;
  align-content: center;
  padding: 10px 0;
}


.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.custom-checkbox + label {
  width: 200px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  color: #0a091d;

  cursor: pointer;
  display: inline-flex;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 6px;

  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  border: 1.5px solid #52a5fc;
}

/* стили при наведении курсора на checkbox */
.custom-checkbox > input:not(:disabled):not(:checked) + span:hover::before {
}

/* стили для активного чекбокса (при нажатии на него) */
.custom-checkbox > input:not(:disabled):active + span::before {
}

/* стили для чекбокса, находящегося в фокусе */
.custom-checkbox > input:focus + span::before {
}

/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.custom-checkbox > input:focus:not(:checked) + span::before {
}

/* стили для чекбокса, находящегося в состоянии checked */
.custom-checkbox > input:checked + span::before {
}

/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox > input:disabled + span::before {
}

.table__block--filter {

  display: block;
  padding: 30px;
}

.search-main {
  width: 100%;
}

.table__filter--search {
  width: 100%;
  margin: 0;
}

.search__label {
  display: block;
  width: 100%;
}

.table__filter--search label input {
  width: 100%;
}

</style>
