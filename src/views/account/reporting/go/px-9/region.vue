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
              <HeaderBack :title="'СВЕДЕНИЯ О РЫБОПЕРЕРАБАТЫВАЮЩИХ ПРЕДПРИЯТИЯХ'" />

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

                          <div class="col-md-4">
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
                              v-on:update:modelValue="v_model_pond_search = $event"
                            >
                            </pond>
                          </div>

                          <!-----col------>

                          <div class="col-md-4">
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
                    :headers="headers"
                    :items="filteredlist"
                    hide-default-footer
                    :loading="false"
                    show-expand
                    :single-expand="true"
                    item-key="region_id"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 20, 30, 40, 50],
                    }"
                  >
                    <template v-slot:expanded-item="{ item }">
                      <td
                        :colspan="headers.length + 2"
                        style="padding: 0; border-radius: 10px !important"
                      >
                        <v-data-table
                          class="table__analytic px-9-2"
                          :headers="headers2"
                          :items="item.types"
                          hide-default-footer
                          :loading="false"
                          :single-expand="true"
                          item-key="type_id"
                        >
                        </v-data-table>
                      </td>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <router-link
                        :to="
                          '/' +
                          $i18n.locale +
                          '/account/reporting-analytics/' +
                          9 +
                          `/${item.region_id}`
                        "
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
                            stroke="#5ABB5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                            stroke="#5ABB5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </router-link>
                    </template>

                    <v-alert slot="no-results" :value="true" color="error">
                      {{ $t('system_message.search') }}
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
</template>

<script>
import { api } from '@/boot/axios';

import quarter from '@/components/components/Inputs/quarter';
import Region from '@/components/components/Inputs/region';
import Pond from '@/components/components/Inputs/pond';
import Fish from '@/components/components/Inputs/fish';

import HeaderBack from '@/components/UI/HeaderBack.vue';

export default {
  name: 'ReportManageGoRegion9',
  components: {
    quarter,
    Region,
    Pond,
    Fish,
    HeaderBack,
  },
  data() {
    return {
      pageId: 9,
      analytic: [],
      headers: [
        {
          text: 'Наименование областей',
          value: 'region_name',
          sortable: false,
        },
      ],
      headers2: [
        {
          text: 'Наименование типов',
          value: 'type_name',
          width: '10vw',
          sortable: false,
        },
        {
          text: 'Тонн в сутки',
          value: 'sum_tons_per_day',
          width: '10vw',
          sortable: false,
        },
        {
          text: 'Тонн в год',
          value: 'sum_tons_per_year',
          width: '10vw',
          sortable: false,
        },
        {
          text: 'Сырье для переработки (тонн)',
          value: 'sum_materials_for_processing',
          width: '10vw',
          sortable: false,
        },
        {
          text: 'Коэффициент перерасчета выхода готовой продукции (количество)',
          value: 'sum_coefficient_recalculation_factor',
          width: '10vw',
          sortable: false,
        },
        {
          text: 'Объем конечной переработанной рыбной продукции для реализации (тонн)',
          value: 'sum_volume_products_for_sale',
          width: '10vw',
          sortable: false,
        },
        {
          text: 'Собственный вылов (тон)',
          value: 'sum_own_catch',
          width: '10vw',
          sortable: false,
        },
        {
          text: 'Океаническая рыба (тон)',
          value: 'sum_ocean_fish',
          width: '10vw',
          sortable: false,
        },
        {
          text: 'Приобретено (тон)',
          value: 'sum_acquired',
          width: '10vw',
          sortable: false,
        },
        {
          text: 'Выращенная рыба (тон)',
          value: 'sum_farmed_fish',
          width: '10vw',
          sortable: false,
        },
        {
          text: 'Среднегодовая численность работников занятых на переработке рыбной продукции (человек)',
          value: 'sum_average_employees',
          width: '10vw',
          sortable: false,
        },
      ],
      v_model_name_search: [],
      v_model_region_search: [],
      v_model_pond_search: [],
      v_model_iin_search: '',
      multiple: true,
      v_model_fish_search: '',
      render: 0,
      quarter_value: '',
      inputYears: null,
      viewType: 'table',
      applicationsRegion: [],
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
    filteredlist() {
      return this.analytic.map((region) => {
        return {
          ...region,
          types: region.types.map((type, index) => ({ ...type, type_id: index + 1 })),
        };
      });
    },
  },
  methods: {
    checkError(error) {
      if (error?.response?.status > 500) {
        this.errorMessage.status = 500;
        this.errorMessage.text = this.$t('system_message.500');
      } else if (error?.response?.status == 401) {
        this.errorMessage.status = 401;
        this.errorMessage.text = error?.response?.data?.message;
        this.$router.push('/' + this.$i18n.locale + '/login');
      } else {
        this.errorMessage.status = 422;
        this.errorMessage.text = error?.response?.data?.message;
      }
      this.$modal.show('ReportManageErrorModal');
    },
    async apiGetAnalytics() {
      try {
        const response = await api.get(`go/list/${this.pageId}`);
        if (response.data) {
          this.analytic = response.data.data;
        }
      } catch (error) {
        this.checkError(error);
      }
    },
  },
  async beforeMount() {
    await this.apiGetAnalytics();
  },
};
</script>

<style>
.reporting-btn .input-btn.form__line--btn {
  background: #52a5fc;
  width: 250px;
  height: 47px;
  padding: 0;
  justify-content: center;
  transition: background 1s ease-in;
}

.px-9-2 th span {
  white-space: pre-wrap;
}

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
  font-family: 'Montserrat';
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
  content: '';
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
