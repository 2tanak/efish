<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack
                :title="$t('reporting.title')"
                :subtitle="'Сведения о контрольно-инспекционной деятельности территориальных органов в части охраны рыбных ресурсов'"
              />
              <div class="card__content--body">
                <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                  <FormGroupWrapper1 :title="$t('inputs.region')">
                    <region
                      :name="'region_id'"
                      :required="true"
                      :modelValue="form.region_id"
                      :disabled="true"
                      :userBind="userRegions"
                      :placeholder="$t('placeholder.choose')"
                      @update:modelValue="form.region_id = $event"
                    >
                    </region>
                  </FormGroupWrapper1>

                  <FormGroupWrapper1 :title="$t('inputs.pond')">
                    <pond
                      :name="'farm_id'"
                      :required="true"
                      :modelValue="form.farm_id"
                      :disabled="true"
                      :userBind="userPond"
                      :placeholder="$t('placeholder.choose')"
                      @update:modelValue="form.farm_id = $event"
                    ></pond>
                  </FormGroupWrapper1>

                  <FormGroupWrapper1 :title="$t('inputs.district')">
                    <district
                      :name="'district_id'"
                      :required="true"
                      :modelValue="form.district_id"
                      :disabled="true"
                      :userBind="userPond"
                      :placeholder="$t('placeholder.choose')"
                      @update:modelValue="form.district_id = $event"
                    ></district>
                  </FormGroupWrapper1>
                  <div class="row">
                    <div class="col-xl-5">
                      <SelectYear
                        v-model="year"
                        :disabled="isNotEditable || isEditPage"
                        :error="isError('surrender_date_start')"
                      />
                    </div>
                    <div class="col-xl-5">
                      <SelectPeriod
                        v-model="period"
                        :disabled="isNotEditable || isEditPage"
                        :error="isError('surrender_date_end')"
                      />
                    </div>
                  </div>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">№</th>
                        <th scope="col">Наименование показателей</th>
                        <th scope="col">Количество (единица измерения)</th>
                        <th scope="col" colspan="2">За отчетный период</th>
                        <th scope="col" colspan="2">Сначала года</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, rowInd) in tableData" :key="rowInd">
                        <th class="align-middle" scope="row">{{ row.id }}</th>
                        <td :class="{ 'col-5 table-title-left': row.type === 'main' }">
                          {{ row.title }}
                        </td>
                        <td
                          v-if="row.label"
                          :rowspan="row.label.count"
                          class="td__input col-3"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ row.label.title }}
                        </td>
                        <td class="td__input" :colspan="row.period_to !== undefined ? 1 : 2">
                          <div
                            class="form__input--input"
                            :class="{ error: isError(row.field_period_from) }"
                          >
                            <input
                              v-model="row.period_from"
                              type="text"
                              class="input-linck"
                              :disabled="isNotEditable"
                            />
                          </div>
                        </td>
                        <td v-if="row.period_to !== undefined" class="td__input">
                          <div
                            class="form__input--input"
                            :class="{ error: isError(row.field_period_to) }"
                          >
                            <input
                              v-model="row.period_to"
                              type="text"
                              class="input-linck"
                              :disabled="isNotEditable"
                            />
                          </div>
                        </td>
                        <td class="td__input" :colspan="row.year_to !== undefined ? 1 : 2">
                          <div class="form__input--input">
                            <input
                              v-model="row.year_from"
                              type="text"
                              class="input-linck"
                              :disabled="isNotEditable"
                            />
                          </div>
                        </td>
                        <td v-if="row.year_to !== undefined" class="td__input">
                          <div class="form__input--input">
                            <input
                              v-model="row.year_to"
                              type="text"
                              class="input-linck"
                              :disabled="isNotEditable"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr class="reporting__hr" />

                  <ReportManageFormButtons
                    :edit="!isNotEditable"
                    :sign-status="sign_status"
                    :report="'10-rh'"
                  />
                </form>

                <ReportManageErrorModal :message="message" :errorMessage="errorMessage" />
                <ReportManageModal @accept="saveElement" />
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
import { convertObjectToFormData } from '@/formData';

import Region from '@/components/components/Inputs/region';
import Pond from '@/components/components/Inputs/pond';
import District from '@/components/components/Inputs/district';

import FormGroupWrapper1 from '@/components/UI/FormGroupWrappers/FormGroupWrapper1.vue';
import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';
import ReportManageErrorModal from '@/components/reporting-management/ReportManageErrorModal.vue';
import SelectYear from '@/components/reporting-management/SelectYear.vue';
import SelectPeriod from '@/components/reporting-management/SelectPeriod.vue';

export default {
  name: 'ReportPage10',
  components: {
    Region,
    Pond,
    District,
    FormGroupWrapper1,
    HeaderBack,
    ReportManageModal,
    ReportManageFormButtons,
    ReportManageErrorModal,
    SelectYear,
    SelectPeriod,
  },
  props: {
    statusPage: {
      type: String,
      default: 'create',
    },
  },
  validations: {},
  data() {
    return {
      pageType: 'subject',
      pageId: 10,
      applicationsUser: null,
      userRegions: null,
      year: null,
      period: null,
      tableData: [
        {
          id: '1',
          field_period_from: 'protocols_violations_count',
          field_period_to: 'protocols_violations_human_count',
          type: 'main',
          title: 'Составлено протоколов о нарушении рыбоохранного законодательства, из них:',
          label: {
            title: 'количество протоколов/человек',
            count: 7,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '1.1',
          field_period_from: 'protocols_violations_water_count',
          field_period_to: 'protocols_violations_water_human_count',
          title: 'за загрязнение водоемов',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '1.2',
          field_period_from: 'protocols_violations_navigation_count',
          field_period_to: 'protocols_violations_navigation_human_count',
          title: 'за нарушение режима судоходства',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '1.3',
          field_period_from: 'protocols_violations_fishing_count',
          field_period_to: 'protocols_violations_fishing_human_count',
          title: 'за незаконный лов рыбы',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '2',
          field_period_from: 'administrative_materials_count',
          field_period_to: 'administrative_materials_human_count',
          type: 'main',
          title: 'Рассмотрено административных материалов Инспекцией',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '2.1',
          field_period_from: 'administrative_materials_court_count',
          field_period_to: 'administrative_materials_court_human_count',
          title: 'количество дел об административных правонарушениях, направленных в суд',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '2.2',
          field_period_from: 'administrative_materials_responsibility_count',
          field_period_to: 'administrative_materials_responsibility_human_count',
          title: 'привлечено судом к административной ответственности',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '3',
          field_period_from: 'transferred_investigative_bodies_count',
          field_period_to: 'transferred_investigative_bodies_human_count',
          type: 'main',
          title:
            'Передано дел на нарушителей рыбоохранного законодательства в следственные органы, из них',
          label: {
            title: 'дел/человек	',
            count: 9,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '3.1',
          field_period_from: 'transferred_investigative_bodies_criminal_count',
          field_period_to: 'transferred_investigative_bodies_criminal_human_count',
          title: 'возбуждено уголовных дел',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '3.1.1',
          field_period_from: 'transferred_investigative_bodies_criminal_cases_to_court_count',
          field_period_to: 'transferred_investigative_bodies_criminal_cases_to_court_h_count',
          title: 'направлено уголовных дел в суд',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '3.1.2',
          field_period_from: 'transferred_investigative_bodies_responsibility_count',
          field_period_to: 'transferred_investigative_bodies_responsibility_human_count',
          title: 'привлечено судом к уголовной ответственности',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '3.1.3',
          field_period_from: 'transferred_investigative_bodies_court_process_count',
          field_period_to: 'transferred_investigative_bodies_court_process_human_count',
          title: 'в процессе рассмотрения в суде',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '3.2',
          field_period_from: 'transferred_investigative_bodies_refusal_count',
          field_period_to: 'transferred_investigative_bodies_refusal_human_count',
          title:
            'отказано в возбуждении уголовного дела и рассмотрено по производству об административных правонарушениях, из них',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '3.2.1',
          field_period_from: 'transferred_investigative_bodies_inspections_count',
          field_period_to: 'transferred_investigative_bodies_inspections_human_count',
          title: 'инспекцией',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '3.2.2',
          field_period_from: 'transferred_investigative_bodies_court_count',
          field_period_to: 'transferred_investigative_bodies_court_human_count',
          title: 'судом',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '3.2.3',
          field_period_from: 'transferred_investigative_bodies_law_enforcement_count',
          field_period_to: 'transferred_investigative_bodies_law_enforcement_human_count',
          title: 'правоохранительным органом',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '3.2.4',
          field_period_from: 'transferred_investigative_bodies_impersonal_violations_count',
          field_period_to: '',
          title: 'безличные нарушения',
          label: {
            title: 'дел',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '4',
          field_period_from: 'violations_total_count',
          field_period_to: 'violations_total_human_count',
          type: 'main',
          title: 'Нарушения допущены, всего',
          label: {
            title: 'дел/человек',
            count: 4,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '4.1',
          field_period_from: 'violations_fishing_organizations_count',
          field_period_to: 'violations_fishing_organizations_human_count',
          title: 'рыбодобывающими организациями',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '4.2',
          field_period_from: 'violations_citizens_count',
          field_period_to: 'violations_citizens_human_count',
          title: 'гражданами (физическими лицами)',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '4.3',
          field_period_from: 'violations_officials_count',
          field_period_to: 'violations_officials_human_count',
          title: 'должностными лицами',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '4.4',
          field_period_from: 'violations_impersonal_violations_count',
          field_period_to: '',
          title: 'безличные нарушения дел',
          label: {
            title: 'дел',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '5',
          field_period_from: 'violations_law_enforcement_count',
          field_period_to: '',
          type: 'main',
          title: 'Открыто нарушений совместно с сотрудниками правоохранительных органов',
          label: {
            title: '(количество) протоколов',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '6',
          field_period_from: 'fines_total_human_count',
          field_period_to: 'fines_total_thousand_tenge',
          type: 'main',
          title: 'Наложено штрафов всего, из них:',
          label: {
            title: 'человек/тысяча тенге',
            count: 4,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '6.1',
          field_period_from: 'fines_article_383_human_count',
          field_period_to: 'fines_article_383_thousand_tenge',
          title:
            'по статье 383 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '6.2',
          field_period_from: 'fines_article_389_human_count',
          field_period_to: 'fines_article_389_thousand_tenge',
          title:
            'по статье 389 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '6.3',
          field_period_from: 'fines_article_811_human_count',
          field_period_to: 'fines_article_811_thousand_tenge',
          title:
            'по статье 811 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '6.4',
          field_period_from: 'fines_enforcement_human_count',
          field_period_to: 'fines_enforcement_thousand_tenge',
          title: 'направлено дел на принудительное взыскание',
          label: {
            title: 'человек/тысяча тенге',
            count: 1,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '7',
          field_period_from: 'fines_collected_human_count',
          field_period_to: 'fines_collected_thousand_tenge',
          type: 'main',
          title: 'Взыскано штрафов',
          label: {
            title: 'человек/тысяча тенге',
            count: 6,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '7.1',
          field_period_from: 'fines_collected_voluntarily_human_count',
          field_period_to: 'fines_collected_voluntarily_thousand_tenge',
          title: 'в добровольном порядке',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '7.1.1',
          field_period_from: 'fines_collected_article_383_human_count',
          field_period_to: 'fines_collected_article_383_thousand_tenge',
          title:
            'по статье 383 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '7.1.2',
          field_period_from: 'fines_collected_article_389_human_count',
          field_period_to: 'fines_collected_article_389_thousand_tenge',
          title:
            'по статье 389 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '7.1.3',
          field_period_from: 'fines_collected_article_811_human_count',
          field_period_to: 'fines_collected_article_811_thousand_tenge',
          title:
            'по статье 811 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '7.2',
          field_period_from: 'fines_collected_enforcement_human_count',
          field_period_to: 'fines_collected_enforcement_thousand_tenge',
          title: 'в принудительном порядке',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '8',
          field_period_from: 'fines_damages_human_count',
          field_period_to: 'fines_damages_thousand_tenge',
          type: 'main',
          title: 'Предъявлено за ущерб',
          label: {
            title: 'человек/тысяча тенге',
            count: 1,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '9',
          field_period_from: 'fines_damages_collected_human_count',
          field_period_to: 'fines_damages_collected_thousand_tenge',
          type: 'main',
          title: 'Взыскано за ущерб',
          label: {
            title: 'человек/тысяча тенге',
            count: 1,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '10',
          field_period_from: 'fines_collected_previous_years_human_count',
          field_period_to: 'fines_collected_previous_years_thousand_tenge',
          type: 'main',
          title: 'Взыскано сумма штрафа прошлых лет',
          label: {
            title: 'человек/тысяча тенге',
            count: 1,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '11',
          field_period_from: 'fines_damages_collected_previous_years_human_count',
          field_period_to: 'fines_damages_collected_previous_years_thousand_tenge',
          type: 'main',
          title: 'Взыскано сумма иска прошлых лет',
          label: {
            title: 'человек/тысяча тенге',
            count: 1,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '12',
          field_period_from: 'fines_confiscated_total_human_count',
          field_period_to: 'fines_confiscated_total_thousand_tenge',
          type: 'main',
          title: 'Поступило средств от реализации конфискантов, всего',
          label: {
            title: 'человек/тысяча тенге',
            count: 4,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '12.1',
          field_period_from: 'fines_confiscated_fish_human_count',
          field_period_to: 'fines_confiscated_fish_thousand_tenge',
          title: 'рыбы',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '12.2',
          field_period_from: 'fines_confiscated_caviar_human_count',
          field_period_to: 'fines_confiscated_caviar_thousand_tenge',
          title: 'икры',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '12.3',
          field_period_from: 'fines_confiscated_transport_human_count',
          field_period_to: 'fines_confiscated_transport_thousand_tenge',
          title: 'транспортных и плавательных средств',
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '13',
          field_period_from: 'fines_seized_total_kg',
          field_period_to: '',
          type: 'main',
          title: 'Изъято у нарушителей, всего',
          label: {
            title: 'килограмм',
            count: 4,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '13.1',
          field_period_from: 'fines_seized_fish_kg',
          field_period_to: '',
          title: 'рыбы частиковых видов',
          period_from: null,
          year_from: null,
        },
        {
          id: '13.2',
          field_period_from: 'fines_seized_fish_sturgeon_kg',
          field_period_to: '',
          title: 'рыбы осетровых видов',
          period_from: null,
          year_from: null,
        },
        {
          id: '13.3',
          field_period_from: 'fines_seized_caviar_sturgeon_kg',
          field_period_to: '',
          title: 'икры осетровых видов',
          period_from: null,
          year_from: null,
        },
        {
          id: '13.4',
          field_period_from: 'fines_seized_other_kg',
          field_period_to: '',
          title: 'иных видов',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '14',
          field_period_from: 'fines_seized_gear_total_pieces',
          field_period_to: '',
          type: 'main',
          title: 'Изъято у нарушителей орудий лова, транспортных и плавательных средств, всего',
          label: {
            title: 'штук',
            count: 4,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '14.1',
          field_period_from: 'fines_seized_gear_fish_pieces',
          field_period_to: '',
          title: 'рыбы частиковых видов',
          period_from: null,
          year_from: null,
        },
        {
          id: '14.2',
          field_period_from: 'fines_seized_gear_net_pieces',
          field_period_to: '',
          title: 'сетей',
          period_from: null,
          year_from: null,
        },
        {
          id: '14.3',
          field_period_from: 'fines_seized_gear_other_pieces',
          field_period_to: '',
          title: 'петель и другие',
          period_from: null,
          year_from: null,
        },
        {
          id: '14.4',
          field_period_from: 'fines_seized_gear_transport',
          field_period_to: 'fines_seized_gear_swimming',
          title: 'транспортных и плавательных средств',
          label: {
            title: 'транспортных/плавательных средств',
            count: 1,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '14.5',
          field_period_from: 'fines_seized_gear_communication_pieces',
          field_period_to: '',
          title: 'средства связи',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '14.6',
          field_period_from: 'fines_seized_gear_navigator_pieces',
          field_period_to: '',
          title: 'навигаторов',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '14.7',
          field_period_from: 'fines_seized_gear_echo_pieces',
          field_period_to: '',
          title: 'эхолотов',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '15',
          field_period_from: 'fines_seized_abandoned_total_pieces',
          field_period_to: '',
          type: 'main',
          title: 'Изъято бесхозных орудий лова, автомобильных и плавательных средств, всего',
          label: {
            title: 'штук',
            count: 3,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '15.1',
          field_period_from: 'fines_seized_abandoned_net_pieces',
          field_period_to: '',
          title: 'сетей',
          period_from: null,
          year_from: null,
        },
        {
          id: '15.2',
          field_period_from: 'fines_seized_abandoned_other_pieces',
          field_period_to: '',
          title: 'петель и другие',
          period_from: null,
          year_from: null,
        },
        {
          id: '15.3',
          field_period_from: 'fines_seized_abandoned_transport',
          field_period_to: 'fines_seized_abandoned_swimming',
          title: 'транспортных и плавательных средств',
          label: {
            title: 'транспортных/плавательных средств',
            count: 1,
          },
          period_from: null,
          period_to: null,
          year_from: null,
          year_to: null,
        },
        {
          id: '15.4',
          field_period_from: 'fines_seized_abandoned_communication_pieces',
          field_period_to: '',
          title: 'средства связи',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '15.5',
          field_period_from: 'fines_seized_abandoned_navigator_pieces',
          field_period_to: '',
          title: 'навигаторов',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '15.6',
          field_period_from: 'fines_seized_abandoned_echo_pieces',
          field_period_to: '',
          title: 'эхолотов',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '16',
          field_period_from: 'fines_agitation_total_pieces',
          field_period_to: '',
          type: 'main',
          title: 'Aгитационно-массовая работа',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '16.1',
          field_period_from: 'fines_agitation_radio_pieces',
          field_period_to: '',
          title: 'выступление по радио',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '16.2',
          field_period_from: 'fines_agitation_tv_pieces',
          field_period_to: '',
          title: 'выступление по телевидению',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '16.3',
          field_period_from: 'fines_agitation_articles_pieces',
          field_period_to: '',
          title: 'опубликовано статей',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '17',
          field_period_from: 'fines_acts_total_pieces',
          field_period_to: '',
          type: 'main',
          title: 'Количество актов составленных при проверке промысловых орудий лова',
          label: {
            title: 'штук',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '17.1',
          field_period_from: 'fines_acts_violations_pieces',
          field_period_to: '',
          title: 'при этом вскрыто нарушений',
          label: {
            title: 'штук',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '18',
          field_period_from: 'fines_water_intakes_total_pieces',
          field_period_to: '',
          type: 'main',
          title: 'Количество проверок водозаборов',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '18.1',
          field_period_from: 'fines_water_intakes_violations_pieces',
          field_period_to: '',
          title: 'при этом вскрыто нарушений',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '19',
          field_period_from: 'fines_technical_means_total_pieces',
          field_period_to: '',
          type: 'main',
          title: 'Участие технических средств и инспекторов',
          label: {
            title: 'единиц',
            count: 5,
          },
          period_from: null,
          year_from: null,
        },
        {
          id: '19.1',
          field_period_from: 'fines_technical_means_river_pieces',
          field_period_to: '',
          title: 'количество речных судов',
          period_from: null,
          year_from: null,
        },
        {
          id: '19.2',
          field_period_from: 'fines_technical_means_sea_pieces',
          field_period_to: '',
          title: 'количество морских судов',
          period_from: null,
          year_from: null,
        },
        {
          id: '19.3',
          field_period_from: 'fines_technical_means_motorboats_pieces',
          field_period_to: '',
          title: 'участие мотолодок',
          period_from: null,
          year_from: null,
        },
        {
          id: '19.4',
          field_period_from: 'fines_technical_means_participating_inspectors',
          field_period_to: '',
          title: 'Количество участвовавших инспекторов',
          period_from: null,
          year_from: null,
        },
        {
          id: '20',
          field_period_from: 'fines_posts_total_pieces',
          field_period_to: '',
          type: 'main',
          title: 'Организовано рыбоохранных постов',
          label: {
            title: '',
            count: 1,
          },
          period_from: null,
          year_from: null,
        },
      ],
      form: {
        region_id: null,
        farm_id: null,
        district_id: null,
        surrender_date_start: null,
        surrender_date_end: null,
      },
      sign_status: false,
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
      formErrors: {},
    };
  },
  computed: {
    getReportTitle() {
      if (this.statusPage == 'show') return this.$t('reporting.title');
      else if (this.statusPage == 'edit') return 'Редактирование отчета';
      return 'Добавление нового отчета';
    },
    isNotEditable() {
      return this.statusPage == 'show';
    },
    isEditPage() {
      return this.statusPage == 'edit';
    },
    isFullFilled() {
      return this.statusPage === 'edit' || this.statusPage === 'show';
    },
    getUserRegions() {
      if (this.$store.state.userObject && this.$store.state.userObject.regions) {
        return this.$store.state.userObject.regions.map((element) => {
          return element.region_id;
        });
      }
      return [];
    },
    userPond() {
      return this.applicationsUser?.pond || [];
    },
  },
  watch: {
    '$store.state.userObject': {
      immediate: true,
      handler: function () {
        this.apiGetUserRegions();
      },
    },
    year() {
      this.parseDate();
    },
    period() {
      this.parseDate();
    },
  },
  methods: {
    isError(name) {
      if (!name) return false;
      return this.formErrors[name];
    },
    parseDate() {
      if (this.year && this.period) {
        if (this.period === 1) {
          this.form.surrender_date_start = `${new Date().getFullYear()}-01-01`;
          this.form.surrender_date_end = `${new Date().getFullYear()}-06-30`;
        } else {
          this.form.surrender_date_start = `${new Date().getFullYear()}-07-01`;
          this.form.surrender_date_end = `${new Date().getFullYear()}-12-31`;
        }
      }
    },
    parseData() {
      return this.tableData.reduce(
        (acc, el) => {
          if (el.field_period_from && el.period_from) acc[el.field_period_from] = el.period_from;
          if (el.field_period_to && el.period_to) acc[el.field_period_to] = el.period_to;
          return acc;
        },
        { ...this.form },
      );
    },
    saveElement() {
      if (this.$configFile.active) return this.sendEcpKey(this.$configFile.xml);
      const websocket = new WebSocket('wss://127.0.0.1:13579/');
      var ready = null;
      websocket.onopen = () => {
        ready = true;
        handle();
      };
      websocket.onclose = (e) => {
        if (e.wasClean) {
          
        } else {
          if (this.$i18n.locale == 'kz')
            alert('NCYLayer бағдарламасы іске қосылғандығына көз жеткізіңіз');
          if (this.$i18n.locale == 'ru') alert('Убедитесь, что программа NCALayer запущена');
          if (this.$i18n.locale == 'en') alert('Make sure that the NCALayer program is running');
        }
      };
      function handle() {
        if (!ready) {
          alert('Убедитесь, что программа NCALayer запущена');
        } else {
          const data = {
            module: 'kz.gov.pki.knca.commonUtils',
            method: 'signXml',
            args: [
              'PKCS12',
              'SIGNATURE',
              '<login><sessionid>caacda70-fd36-45ed-8d94-45a88890f83a</sessionid></login>',
              '',
              '',
            ],
          };
          websocket.send(JSON.stringify(data));
        }
      }
      websocket.onmessage = (e) => {
        const data1 = JSON.parse(e.data);
        if (data1.responseObject) {
          this.sendEcpKey(data1.responseObject);
        }
      };
    },
    sendEcpKey(ecpString) {
      const formData = new FormData();
      formData.append('xml', ecpString);
      document.querySelector('.preloader').classList.add('active');
      api
        .post(`${this.pageType}/sign/${this.pageId}/${this.$route.params.id}`, formData)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({
              path: `/${this.$i18n.locale}/account/reporting/${this.pageId}${
                this.pageType === 'subject' ? '' : '-tir'
              }-rh`,
            });
          }
        })
        .catch((error) => {
          this.checkError(error);
        })
        .finally(() => {
          document.querySelector('.preloader').classList.remove('active');
        });
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        document.querySelector('.preloader').classList.add('active');
        const data = this.parseData();
        let formData = convertObjectToFormData(data);

        if (this.statusPage == 'edit') {
          formData.append('_method', 'PUT');
        }

        api
          .post(
            `/${this.pageType}/store/${this.pageId}${
              this.statusPage === 'edit' ? `/${this.$route.params.id}` : ''
            }`,
            formData,
          )
          .then(() => {
            this.$router.push(
              `/ru/account/reporting/${this.pageId}${this.pageType === 'subject' ? '' : '-tir'}-rh`,
            );
          })
          .catch((error) => {
            this.checkError(error);
          })
          .finally(() => {
            document.querySelector('.preloader').classList.remove('active');
          });
      }
    },
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
        if (error?.response?.data?.errors && !this.isNotEditable) {
          this.formErrors = error?.response?.data?.errors;
        }
      }
      this.$modal.show('ReportManageErrorModal');
    },
    async checkStatusSign() {
      if (!this.isNotEditable) return;
      try {
        const response = await api.get(`/${this.pageType}/list/${this.pageId}`);
        this.sign_status =
          response?.data?.data?.find((e) => {
            return e.id == this.$route.params.id;
          })?.status === 'Подписан';
      } catch (error) {
        this.checkError(error);
      }
    },
    parseServerData(data) {
      this.tableData = this.tableData.map((el) => {
        if (el.field_period_from && data[el.field_period_from] !== undefined)
          el.period_from = data[el.field_period_from];
        if (el.field_period_to && data[el.field_period_to] !== undefined)
          el.period_to = data[el.field_period_to];
        if (data[el.id] !== undefined) el.year_from = data[el.id];
        if (data[`${el.id}h`] !== undefined) el.year_to = data[`${el.id}h`];
        return el;
      });
      if (data.surrender_date_start) {
        this.year = data.surrender_date_start.split('-')[0];
        this.period = +data.surrender_date_start.split('-')[1] < 7 ? 1 : 2;
      }
    },
    async showDetailManagment() {
      if (this.isFullFilled) {
        try {
          const { data } = await api.get(
            `/${this.pageType}/show/${this.pageId}/${this.$route.params.id}`,
          );
          this.parseServerData(data.data);
        } catch (error) {
          this.checkError(error);
        }
      }
    },
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
          this.checkError(error);
        });
    },
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
  async beforeMount() {
    await this.showDetailManagment();
    await this.checkStatusSign();
    this.apiGetUser();
  },
};
</script>

<style scoped>
.td__input {
  position: relative;
}
.form__input--input {
  width: 100%;
  height: 90%;
}
table tr td input.text-left {
  transform: translateX(20px);
}
table tr td,
table tr th {
  padding: 5px 20px !important;
  border: 1px solid #000 !important;
}
table tr th {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #0a091d;
}
table tbody tr td {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  color: #000000;
}
table thead tr th {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #000000;
}
.table-title-left {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  color: #000000;
}
</style>
