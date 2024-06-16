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
              <HeaderBack
                :title="'СВЕДЕНИЯ О ВЫПОЛНЕНИИ ЗАПЛАНИРОВАННЫХ НА ТЕКУЩИЙ ГОД ОБЪЕМОВ ФИНАНСОВЫХ СРЕДСТВ ПОЛЬЗОВАТЕЛЯМИ ДЛЯ РАЗВИТИЯ РЫБНОГО ХОЗЯЙСТВА'"
              />

              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <div class="search-main">
                        <div class="row">
                          <div class="col-md-4">
                            <MultiSelect
                              track-by="value"
                              label="name"
                              class="multiselect__check"
                              placeholder="Выбрать раздел"
                              :preserve-search="false"
                              :required="true"
                              :multiple="false"
                              :close-on-select="true"
                              :options="quarters"
                              v-model="quarter"
                            >
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                              <template slot="noOptions">{{ $t('components.not_found') }}</template>
                              <template slot="placeholder">{{ $t('placeholder.choose') }}</template>
                            </MultiSelect>
                          </div>
                          <!-- <div class="col-md-4">
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
                          </div> -->
                          <!-- <div class="col-md-4">
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
                          </div> -->
                        </div>
                      </div>
                      <!-----search-main------>
                    </div>
                  </div>
                  <div class="v-data-table table__analytic v-data-table--has-bottom theme--light">
                    <div class="v-data-table__wrapper">
                      <table
                        :style="{
                          borderLeft: '1px solid #D3E7FB',
                          borderRight: '1px solid #D3E7FB',
                        }"
                      >
                        <thead class="v-data-table-header">
                          <tr
                            :style="{
                              borderTop: '1px solid #D3E7FB',
                              borderBottom: '1px solid #D3E7FB',
                            }"
                          >
                            <th>
                              {{ headers[0].text }}
                            </th>
                            <template v-for="(field, fieldInd) in fields[selectedQuarter]">
                              <th v-if="field" colspan="2" :key="fieldInd">
                                <div
                                  :style="{
                                    width: '220px',
                                    whiteSpace: 'break-spaces',
                                  }"
                                >
                                  {{ field }}
                                </div>
                              </th>
                            </template>
                          </tr>
                          <tr
                            :style="{
                              borderTop: '1px solid #D3E7FB',
                              borderBottom: '1px solid #D3E7FB',
                            }"
                          >
                            <th></th>
                            <template v-for="(field, fieldInd) in fields[selectedQuarter]">
                              <template v-if="field">
                                <th :key="fieldInd + '1'">Запланировано</th>
                                <th :key="fieldInd + '2'">Фактически</th>
                              </template>
                            </template>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(region, regionInd) in analytic" :key="regionInd">
                            <td>{{ region.region_name }}</td>
                            <template
                              v-for="(field, fieldInd) in Object.keys(fields[selectedQuarter])"
                            >
                              <td class="text-start" :key="fieldInd">
                                <div
                                  :style="{
                                    width: '110px',
                                    whiteSpace: 'break-spaces',
                                  }"
                                >
                                  {{ region[selectedQuarter][field] }}
                                </div>
                              </td>
                            </template>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!-- <v-data-table
                    class="table__analytic"
                    :headers="headers"
                    :items="filteredlist"
                    :loading="false"
                    disable-pagination
                  >
                    <v-alert slot="no-results" :value="true" color="error">
                      {{ $t('system_message.search') }}
                    </v-alert>
                  </v-data-table> -->
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

import MultiSelect from 'vue-multiselect';
// import quarter from '@/components/components/Inputs/quarter';
// import Region from '@/components/components/Inputs/region';

import HeaderBack from '@/components/UI/HeaderBack.vue';

export default {
  name: 'ReportManageGoRegion3',
  components: {
    // quarter,
    // Region,
    MultiSelect,
    HeaderBack,
  },
  data() {
    return {
      pageId: 3,
      analytic: [],
      quarter: { value: 'quater1', name: 'Раздел 1' },
      headers: [
        {
          text: 'Наименование региона',
          value: 'region_name',
          sortable: false,
        },
        {
          text: 'Раздел 1',
          value: 'quater1',
          sortable: false,
        },
        {
          text: 'Раздел 2',
          value: 'quater2',
          sortable: false,
        },
        {
          text: 'Раздел 3',
          value: 'quater3',
          sortable: false,
        },
        {
          text: 'Раздел 4',
          value: 'quater4',
          sortable: false,
        },
      ],
      quarters: [
        { value: 'quater1', name: 'Раздел 1' },
        { value: 'quater2', name: 'Раздел 2' },
        { value: 'quater3', name: 'Раздел 3' },
        { value: 'quater4', name: 'Раздел 4' },
      ],
      fields: {
        quater1: {
          work_planned: 'Объем финансовых средств на работы (тысяч тенге)',
          work_actually: null,
          reproduction_planned:
            'Объем финансовых средств на мероприятия по воспроизводству рыбных ресурсов и других водных животных(тысяч тенге)',
          reproduction_actually: null,
          stocking_price_planned:
            'объем финансовых средств на зарыбление и количество выпущенной молоди (тысяч тенге)',
          stocking_price_actually: null,
          stocking_count_planned:
            'объем финансовых средств на зарыбление и количество выпущенной молоди (тысяч штук)',
          stocking_count_actually: null,
          security_planned:
            'Объем финансовых средств на мероприятия по охране рыбных ресурсов и других водных животных и среды их обитания (тысяч тенге)',
          security_actually: null,
          development_aquaculture_planned:
            'Объем финансовых средств на развитие рыбоводства (аквакультуры)',
          development_aquaculture_actually: null,
          development_amateur_planned:
            'Объем финансовых средств на развитие рыбоводства любительского(спортивного) (тысяч тенге)',
          development_amateur_actually: null,
        },
        quater2: {
          fishery_activities_planned:
            'Объем финансовых средств на рыбохозяйственные мероприятия (тысяч тенге)',
          fishery_activities_actually: null,
          reproduction_planned:
            'Объем финансовых средств на мероприятия по воспроизводству рыбных ресурсов и других водных животных (тысяч тенге)',
          reproduction_actually: null,
          stocking_price_planned:
            'Объем финансовых средств на зарыбление и количество выпущенной молоди (тысяч тенге)',
          stocking_price_actually: null,
          stocking_count_planned:
            'Объем финансовых средств на зарыбление и количество выпущенной молоди (штук)',
          stocking_count_actually: null,
          security_planned:
            'Объем финансовых средств на мероприятия по охране рыбных ресурсов и других водных животных и среды их обитания (тысяч тенге)',
          security_actually: null,
        },
        quater3: {
          breeding_and_reclamation_price_planned:
            'Проведение рыбоводно-мелиоративных работ, направленных на улучшение ихтиофауны (приобретение рыбопосадочного материала и зарыбление водоема сеголетками весом не менее 12 грамм)',
          breeding_and_reclamation_price_actually: null,
          antifouling_planned:
            'Проведение противозаморных мероприятий (бурение лунок в зимний период, единиц)',
          antifouling_actually: null,
          antifouling_planned_2: 'Проведение противозаморных мероприятий (прорубка майн, единиц)',
          antifouling_actually_2: null,
          research_planned: 'Проведение исследования состояния ихтиофауны (тысяч тенге)',
          research_actually: null,
          equipment_planned: 'Приобретение рыбоводно-мелиоративной техники (тысяч тенге)',
          equipment_actually: null,
          gamekeeper_service_planned: 'Содержание егерской службы (тысяч тенге)',
          gamekeeper_service_actually: null,
          arrangement_planned:
            'Обустройство береговой прилегающей полосы в соответствии с санитарными и иными нормами (тысяч тенге)',
          arrangement_actually: null,
        },
        quater4: {
          purchase_of_cages_planned: 'Приобретение садков для выращивания рыб (тысяч тенге)',
          purchase_of_cages_actually: null,
          cost_of_creating_coastal_infrastructure_planned:
            'Затраты на создание береговой инфраструктуры (тысяч тенге)',
          cost_of_creating_coastal_infrastructure_actually: null,
          purchase_of_fish_stock_count_planned:
            'Приобретение рыбопосадочного материала сеголетками весом не менее 12 грамм (тысяч штук)',
          purchase_of_fish_stock_count_actually: null,
          purchase_of_fish_stock_price_planned:
            'Приобретение рыбопосадочного материала сеголетками весом не менее 12 грамм (тысяч тенге)',
          purchase_of_fish_stock_price_actually: null,
          feed_planned: 'Покупка кормов для рыб (тысяч тенге)',
          feed_actually: null,
          cage_security_planned: 'Организация охраны садков (тысяч тенге)',
          cage_security_actually: null,
          research_costs_planned: 'Затраты на научные исследования (тысяч тенге)',
          research_costs_actually: null,
          technique_planned:
            'Приобретение техники для обеспечения ведения садкового рыбоводного хозяйства, транспортировки товарной рыбы (тысяч тенге)',
          technique_actually: null,
          staff_members_actually: 'Содержание штатных работников (тысяч тенге)',
          staff_members_planned: null,
        },
      },
      v_model_region_search: [10],
      quarter_value: '',

      v_model_name_search: [],
      v_model_pond_search: [],
      v_model_iin_search: '',
      multiple: true,
      v_model_fish_search: '',
      render: 0,
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
      return this.analytic;
    },
    selectedQuarter() {
      return this.quarter.value;
    },
    getSection() {
      return (this.quarters.findIndex((f) => f.value === this.quarter.value) || 0) + 1;
    },
  },
  watch: {
    selectedQuarter() {
      this.apiGetAnalytics();
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
    parseData(data = []) {
      return data.map((region) => {
        return {
          region_name: region.region_name,
          quater1: Object.keys(this.fields.quater1).reduce((acc, field) => {
            acc[field] = region[field];
            return acc;
          }, {}),
          quater2: Object.keys(this.fields.quater2).reduce((acc, field) => {
            acc[field] = region[field];
            return acc;
          }, {}),
          quater3: Object.keys(this.fields.quater3).reduce((acc, field) => {
            acc[field] = region[field];
            return acc;
          }, {}),
          quater4: Object.keys(this.fields.quater4).reduce((acc, field) => {
            acc[field] = region[field];
            return acc;
          }, {}),
        };
      });
    },
    async apiGetAnalytics() {
      try {
        const response = await api.get(`go/list/${this.pageId}?section=${this.getSection}`);
        if (response.data) {
          this.analytic = this.parseData(response.data.data);
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
