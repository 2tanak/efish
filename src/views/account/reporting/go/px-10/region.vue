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
                :title="'Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков(По субъектам)'"
              />

              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <div class="search-main">
                        <div class="row">
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
                      </div>
                      <!-----search-main------>
                    </div>
                  </div>

                  <v-data-table
                    class="table__analytic"
                    :headers="filteredHeaders"
                    :items="filteredlist"
                    hide-default-footer
                    :loading="false"
                    disable-pagination
                  >
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

import HeaderBack from '@/components/UI/HeaderBack.vue';

export default {
  name: 'ReportManageGoRegion10',
  components: {
    quarter,
    Region,
    HeaderBack,
  },
  data() {
    return {
      pageId: 10,
      analytic: [],
      farms: [],
      headers: [],
      rows: {
        protocols_violations_count: {
          name: 'Составлено протоколов о нарушении рыбоохранного законодательства, из них:',
          unit: 'количество протоколов',
        },
        protocols_violations_human_count: {
          name: '',
          unit: 'количество человек',
        },
        protocols_violations_water_count: {
          name: 'за загрязнение водоемов',
          unit: 'количество протоколов',
        },
        protocols_violations_water_human_count: {
          name: '',
          unit: 'количество человек',
        },
        protocols_violations_navigation_count: {
          name: 'за нарушение режима судоходства',
          unit: 'количество протоколов',
        },
        protocols_violations_navigation_human_count: {
          name: '',
          unit: 'количество человек',
        },
        protocols_violations_fishing_count: {
          name: 'за незаконный лов рыбы',
          unit: 'количество протоколов',
        },
        protocols_violations_fishing_human_count: {
          name: '',
          unit: 'количество человек',
        },
        administrative_materials_count: {
          name: 'Рассмотрено административных материалов Инспекцией',
          unit: 'количество протоколов',
        },
        administrative_materials_human_count: {
          name: '',
          unit: 'количество человек',
        },
        administrative_materials_court_count: {
          name: 'количество дел об административных правонарушениях, направленных в суд',
          unit: 'количество протоколов',
        },
        administrative_materials_court_human_count: {
          name: '',
          unit: 'количество человек',
        },
        administrative_materials_responsibility_count: {
          name: 'привлечено судом к административной ответственности',
          unit: 'количество протоколов',
        },
        administrative_materials_responsibility_human_count: {
          name: '',
          unit: 'количество человек',
        },
        transferred_investigative_bodies_count: {
          name: 'Передано дел на нарушителей рыбоохранного законодательства в следственные органы, из них',
          unit: 'количество протоколов',
        },
        transferred_investigative_bodies_human_count: {
          name: '',
          unit: 'количество человек',
        },
        transferred_investigative_bodies_criminal_count: {
          name: 'возбуждено уголовных дел',
          unit: 'количество протоколов',
        },
        transferred_investigative_bodies_criminal_human_count: {
          name: '',
          unit: 'количество человек',
        },
        transferred_investigative_bodies_criminal_cases_to_court_count: {
          name: 'направлено уголовных дел в суд',
          unit: 'количество протоколов',
        },
        transferred_investigative_bodies_criminal_cases_to_court_h_count: {
          name: '',
          unit: 'количество человек',
        },
        transferred_investigative_bodies_responsibility_count: {
          name: 'привлечено судом к уголовной ответственности',
          unit: 'количество протоколов',
        },
        transferred_investigative_bodies_responsibility_human_count: {
          name: '',
          unit: 'количество человек',
        },
        transferred_investigative_bodies_court_process_count: {
          name: 'в процессе рассмотрения в суде',
          unit: 'количество протоколов',
        },
        transferred_investigative_bodies_court_process_human_count: {
          name: '',
          unit: 'количество человек',
        },
        transferred_investigative_bodies_refusal_count: {
          name: 'отказано в возбуждении уголовного дела и рассмотрено по производству об административных правонарушениях, из них',
          unit: 'количество протоколов',
        },
        transferred_investigative_bodies_refusal_human_count: {
          name: '',
          unit: 'количество человек',
        },
        transferred_investigative_bodies_inspections_count: {
          name: 'инспекцией',
          unit: 'количество протоколов',
        },
        transferred_investigative_bodies_inspections_human_count: {
          name: '',
          unit: 'количество человек',
        },
        transferred_investigative_bodies_court_count: {
          name: 'судом',
          unit: 'количество протоколов',
        },
        transferred_investigative_bodies_court_human_count: {
          name: '',
          unit: 'количество человек',
        },
        transferred_investigative_bodies_law_enforcement_count: {
          name: 'правоохранительным органом',
          unit: 'количество протоколов',
        },
        transferred_investigative_bodies_law_enforcement_human_count: {
          name: '',
          unit: 'количество человек',
        },
        transferred_investigative_bodies_impersonal_violations_count: {
          name: 'безличные нарушения',
          unit: 'дел',
        },
        violations_total_count: {
          name: 'Нарушения допущены, всего',
          unit: 'дел',
        },
        violations_total_human_count: {
          name: '',
          unit: 'человек',
        },
        violations_fishing_organizations_count: {
          name: 'рыбодобывающими организациями',
          unit: 'дел',
        },
        violations_fishing_organizations_human_count: {
          name: '',
          unit: 'человек',
        },
        violations_citizens_count: {
          name: 'гражданами (физическими лицами)',
          unit: 'дел',
        },
        violations_citizens_human_count: {
          name: '',
          unit: 'человек',
        },
        violations_officials_count: {
          name: 'должностными лицами',
          unit: 'дел',
        },
        violations_officials_human_count: {
          name: '',
          unit: 'человек',
        },
        violations_impersonal_violations_count: {
          name: 'безличные нарушения дел',
          unit: 'дел',
        },
        violations_law_enforcement_count: {
          name: 'Открыто нарушений совместно с сотрудниками правоохранительных органов',
          unit: '(количество) протоколов',
        },
        fines_total_human_count: {
          name: 'Наложено штрафов всего, из них:',
          unit: 'человек',
        },
        fines_total_human_fines_total_thousand_tengecount: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_article_383_human_count: {
          name: 'по статье 383 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          unit: 'человек',
        },
        fines_article_383_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_article_389_human_count: {
          name: 'по статье 389 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          unit: 'человек',
        },
        fines_article_389_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_article_811_human_count: {
          name: 'по статье 811 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          unit: 'человек',
        },
        fines_article_811_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_enforcement_human_count: {
          name: 'направлено дел на принудительное взыскание',
          unit: 'человек',
        },
        fines_enforcement_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_collected_human_count: {
          name: 'Взыскано штрафов',
          unit: 'человек',
        },
        fines_collected_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_collected_voluntarily_human_count: {
          name: 'в добровольном порядке',
          unit: 'человек',
        },
        fines_collected_voluntarily_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_collected_article_383_human_count: {
          name: 'по статье 383 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          unit: 'человек',
        },
        fines_collected_article_383_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_collected_article_389_human_count: {
          name: 'по статье 389 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          unit: 'человек',
        },
        fines_collected_article_389_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_collected_article_811_human_count: {
          name: 'по статье 811 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          unit: 'человек',
        },
        fines_collected_article_811_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_collected_enforcement_human_count: {
          name: 'в принудительном порядке',
          unit: 'человек',
        },
        fines_collected_enforcement_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_damages_human_count: {
          name: 'Предъявлено за ущерб',
          unit: 'человек',
        },
        fines_damages_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_damages_collected_human_count: {
          name: 'Взыскано за ущерб',
          unit: 'человек',
        },
        fines_damages_collected_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_collected_previous_years_human_count: {
          name: 'Взыскано сумма штрафа прошлых лет',
          unit: 'человек',
        },
        fines_collected_previous_years_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_damages_collected_previous_years_human_count: {
          name: 'Взыскано сумма иска прошлых лет',
          unit: 'человек',
        },
        fines_damages_collected_previous_years_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_confiscated_total_human_count: {
          name: 'Поступило средств от реализации конфискантов, всего',
          unit: 'человек',
        },
        fines_confiscated_total_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_confiscated_fish_human_count: {
          name: 'рыбы',
          unit: 'человек',
        },
        fines_confiscated_fish_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_confiscated_caviar_human_count: {
          name: 'икры',
          unit: 'человек',
        },
        fines_confiscated_caviar_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_confiscated_transport_human_count: {
          name: 'транспортных и плавательных средств',
          unit: 'человек',
        },
        fines_confiscated_transport_thousand_tenge: {
          name: '',
          unit: 'тысяча тенге',
        },
        fines_seized_total_kg: {
          name: 'Изъято у нарушителей, всего',
          unit: 'килограмм',
        },
        fines_seized_fish_kg: {
          name: 'рыбы частиковых видов',
          unit: 'килограмм',
        },
        fines_seized_fish_sturgeon_kg: {
          name: 'рыбы осетровых видов',
          unit: 'килограмм',
        },
        fines_seized_caviar_sturgeon_kg: {
          name: 'икры осетровых видов',
          unit: 'килограмм',
        },
        fines_seized_other_kg: {
          name: 'иных видов',
          unit: 'килограмм',
        },
        fines_seized_gear_total_pieces: {
          name: 'Изъято у нарушителей орудий лова, транспортных и плавательных средств, всего',
          unit: 'штук',
        },
        fines_seized_gear_fish_pieces: {
          name: 'рыбы частиковых видов',
          unit: 'штук',
        },
        fines_seized_gear_net_pieces: {
          name: 'сетей',
          unit: 'штук',
        },
        fines_seized_gear_other_pieces: {
          name: 'петель и другие',
          unit: 'штук',
        },
        fines_seized_gear_transport: {
          name: 'транспортных и плавательных средств',
          unit: 'транспортных средств',
        },
        fines_seized_gear_swimming: {
          name: '',
          unit: 'плавательных средств',
        },
        fines_seized_gear_communication_pieces: {
          name: 'средства связи',
          unit: '',
        },
        fines_seized_gear_navigator_pieces: {
          name: 'навигаторов',
          unit: '',
        },
        fines_seized_gear_echo_pieces: {
          name: 'эхолотов',
          unit: '',
        },
        fines_seized_abandoned_total_pieces: {
          name: 'Изъято бесхозных орудий лова, автомобильных и плавательных средств, всего',
          unit: 'штук',
        },
        fines_seized_abandoned_net_pieces: {
          name: 'сетей',
          unit: 'штук',
        },
        fines_seized_abandoned_other_pieces: {
          name: 'петель и другие',
          unit: 'штук',
        },
        fines_seized_abandoned_transport: {
          name: 'транспортных и плавательных средств',
          unit: 'плавательных средств',
        },
        fines_seized_abandoned_swimming: {
          name: '',
          unit: 'транспортных средств',
        },
        fines_seized_abandoned_communication_pieces: {
          name: 'средства связи',
          unit: '',
        },
        fines_seized_abandoned_navigator_pieces: {
          name: 'навигаторов',
          unit: '',
        },
        fines_seized_abandoned_echo_pieces: {
          name: 'эхолотов',
          unit: '',
        },
        fines_agitation_total_pieces: {
          name: 'Aгитационно-массовая работа',
          unit: '',
        },
        fines_agitation_radio_pieces: {
          name: 'выступление по радио',
          unit: '',
        },
        fines_agitation_tv_pieces: {
          name: 'выступление по телевидению',
          unit: '',
        },
        fines_agitation_articles_pieces: {
          name: 'опубликовано статей',
          unit: '',
        },
        fines_acts_total_pieces: {
          name: 'Количество актов составленных при проверке промысловых орудий лова',
          unit: '',
        },
        fines_acts_violations_pieces: {
          name: 'при этом вскрыто нарушений',
          unit: 'штук',
        },
        fines_water_intakes_total_pieces: {
          name: 'Количество проверок водозаборов',
          unit: '',
        },
        fines_water_intakes_violations_pieces: {
          name: 'при этом вскрыто нарушений',
          unit: '',
        },
        fines_technical_means_total_pieces: {
          name: 'Участие технических средств и инспекторов',
          unit: 'единиц',
        },
        fines_technical_means_river_pieces: {
          name: 'количество речных судов',
          unit: 'единиц',
        },
        fines_technical_means_sea_pieces: {
          name: 'количество морских судов',
          unit: 'единиц',
        },
        fines_technical_means_motorboats_pieces: {
          name: 'участие мотолодок',
          unit: 'единиц',
        },
        fines_technical_means_participating_inspectors: {
          name: 'Количество участвовавших инспекторов',
          unit: 'единиц',
        },
        fines_posts_total_pieces: {
          name: 'Организовано рыбоохранных постов',
          unit: '',
        },
      },
      v_model_region_search: [10],
      multiple: true,
      quarter_value: '',
      inputYears: null,
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
    filteredHeaders() {
      return [
        {
          text: 'Наименование показателей',
          value: 'name',
          width: '10vw',
          sortable: false,
        },
        {
          text: 'единица измерения',
          value: 'unit',
          width: '10vw',
          sortable: false,
        },
        ...this.headers.filter((h) => this.v_model_region_search.includes(h.region_id)),
      ];
    },
    filteredlist() {
      return this.analytic;
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
    parseData(data) {
      const keys = Object.keys(data[0])
        .filter((key) => !['farm_id', 'farms', 'region_id', 'region_name'].includes(key))
        .map((key) => ({
          name: this.rows[key]?.name,
          key: key,
          unit: this.rows[key]?.unit || '-',
        }));
      data.forEach((region) => {
        region.farms.forEach((farm) => {
          this.farms.push({
            id: farm.id,
            region_id: region.region_id,
            region: region.region_name,
            text: farm.value,
            value: String(farm.id),
          });
        });
        keys.forEach((key) => {
          region[key.key].farm.forEach((f) => {
            key[f.farm_id] = f.total;
          });
        });
      });
      this.headers.push(...this.farms);
      return keys;
    },
    async apiGetAnalytics() {
      try {
        const response = await api.get(`go/list/${this.pageId}`);
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
