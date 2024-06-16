<template>
  <div
    class="wrap__content"
    :class="{
      'wrap__content--preloader':
        !_getRegionList ||
        !applicationsPond ||
        !applicationsDistrict ||
        !applicationsKato ||
        !applicationsFish,
    }"
  >
    <v-preloader
      v-if="
        !_getRegionList ||
        !applicationsPond ||
        !applicationsDistrict ||
        !applicationsKato ||
        !applicationsFish
      "
      :message="errorMessage"
    ></v-preloader>
    <div
      v-if="
        _getRegionList &&
        applicationsPond &&
        applicationsDistrict &&
        applicationsKato &&
        applicationsFish
      "
      class="container"
    >
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack
                :title="getReportTitle"
                :subtitle="'Сведения о выполнении запланированных на текущий год объемов финансовых средств пользователями для развития рыбного хозяйства'"
              />
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование региона</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            v-if="formList.region.length == 1"
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.region_id
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              :value="formList.region[0].name"
                              disabled
                              placeholder="Наименование"
                            />
                            <input type="hidden" name="region_id" :value="formList.region[0].id" />
                          </div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.region_id
                                ? 'input--error'
                                : '',
                            ]"
                            v-else
                          >
                            <multiselect
                              required=""
                              :options="formList.region"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              placeholder="Выберите регион"
                              class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.values[0].value
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>

                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.region_id"
                          >
                            <p
                              v-for="(massage, massageInd) in errorMessage.messages.region_id"
                              :key="massageInd"
                            >
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Наименование рыбохозяйственных водоемов и (или) участков
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.t_water
                                ? 'input--error'
                                : '',
                            ]"
                            v-if="formList.pond.length == 1"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              :value="formList.pond[0].name"
                              disabled
                              placeholder="Наименование"
                            />
                            <input type="hidden" name="t_water" :value="formList.pond[0].name" />
                          </div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.t_water
                                ? 'input--error'
                                : '',
                            ]"
                            v-else
                          >
                            <multiselect
                              required=""
                              :options="formList.pond"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              placeholder="Выберите водоем"
                              class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.values[0].value
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.t_water"
                          >
                            <p
                              v-for="(massage, massageInd) in errorMessage.messages.t_water"
                              :key="massageInd"
                            >
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Наименование района (местонахождения водоема и (или) участка)
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.t_district
                                ? 'input--error'
                                : '',
                            ]"
                            v-if="formList.district.length == 1"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              :value="formList.district[0].name"
                              disabled
                              placeholder="Наименование"
                            />
                            <input
                              type="hidden"
                              name="t_district"
                              :value="formList.district[0].name"
                            />
                          </div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.t_district
                                ? 'input--error'
                                : '',
                            ]"
                            v-else
                          >
                            <multiselect
                              required=""
                              :options="formList.district"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              placeholder="Выберите район"
                              class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.values[0].value
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.t_district"
                          >
                            <p
                              v-for="(massage, massageInd) in errorMessage.messages.t_district"
                              :key="massageInd"
                            >
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Код местонахождения по КАТО (классификатор административно-территориальных
                        объектов)
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.c_kato
                                ? 'input--error'
                                : '',
                            ]"
                            v-if="formList.kato.length == 1"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              :value="formList.kato[0].name"
                              disabled
                              placeholder="КАТО"
                            />
                            <input type="hidden" name="c_kato" :value="formList.kato[0].name" />
                          </div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.c_kato
                                ? 'input--error'
                                : '',
                            ]"
                            v-else
                          >
                            <multiselect
                              required=""
                              :options="formList.kato"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              placeholder="Выберите КАТО"
                              class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.values[0].value
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.c_kato"
                          >
                            <p
                              v-for="(massage, massageInd) in errorMessage.messages.c_kato"
                              :key="massageInd"
                            >
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="form__line" />
                  <div class="row">
                    <div class="col-xl-3 col-lg-5">
                      <TabHeader
                        :tabs="[
                          { id: 1, name: 'Раздел 1' },
                          { id: 2, name: 'Раздел 2' },
                          { id: 3, name: 'Раздел 3' },
                          { id: 4, name: 'Раздел 4' },
                        ]"
                        :current="tabElement"
                        @change="tabElement = $event"
                      />
                    </div>
                    <div class="col-xl-9 col-lg-7">
                      <div
                        class="login__block--tab"
                        :class="{ 'login__block--active': tabElement == 1 }"
                        v-if="tabElement == 1"
                      >
                        <FormLine
                          :title="'Объем финансовых средств на работы (тысяч тенге)'"
                          :planned="form.amount_of_funds_1.work_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.amount_of_financial_resources_planned
                          "
                          :actually="form.amount_of_funds_1.work_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.amount_of_financial_resources_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm1()"
                          @plannedChange="form.amount_of_funds_1.work_planned = $event"
                          @actuallyChange="form.amount_of_funds_1.work_actually = $event"
                        />
                        <FormLine
                          :title="'Объем финансовых средств на мероприятия по воспроизводству рыбных ресурсов и других водных животных(тысяч тенге)'"
                          :planned="form.amount_of_funds_1.reproduction_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_measures_planned
                          "
                          :actually="form.amount_of_funds_1.reproduction_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_measures_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm1()"
                          @plannedChange="form.amount_of_funds_1.reproduction_planned = $event"
                          @actuallyChange="form.amount_of_funds_1.reproduction_actually = $event"
                        />
                        <FormLine
                          :title="'объем финансовых средств на зарыбление и количество выпущенной молоди (тысяч тенге)'"
                          :planned="form.amount_of_funds_1.stocking_price_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_activities_planned
                          "
                          :actually="form.amount_of_funds_1.stocking_price_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_activities_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm1()"
                          @plannedChange="form.amount_of_funds_1.stocking_price_planned = $event"
                          @actuallyChange="form.amount_of_funds_1.stocking_price_actually = $event"
                        />
                        <FormLine
                          :title="'объем финансовых средств на зарыбление и количество выпущенной молоди (тысяч штук)'"
                          :planned="form.amount_of_funds_1.stocking_count_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_activities_planned
                          "
                          :actually="form.amount_of_funds_1.stocking_count_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_activities_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm1()"
                          @plannedChange="form.amount_of_funds_1.stocking_count_planned = $event"
                          @actuallyChange="form.amount_of_funds_1.stocking_count_actually = $event"
                        />
                        <FormLine
                          :title="'Объем финансовых средств на мероприятия по охране рыбных ресурсов и других водных животных и среды их обитания (тысяч тенге)'"
                          :planned="form.amount_of_funds_1.security_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_stocking_planned
                          "
                          :actually="form.amount_of_funds_1.security_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_stocking_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm1()"
                          @plannedChange="form.amount_of_funds_1.security_planned = $event"
                          @actuallyChange="form.amount_of_funds_1.security_actually = $event"
                        />
                        <FormLine
                          :title="'Объем финансовых средств на развитие рыбоводства (аквакультуры)'"
                          :planned="form.amount_of_funds_1.development_aquaculture_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_measure_protect_planned
                          "
                          :actually="form.amount_of_funds_1.development_aquaculture_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_measure_protect_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm1()"
                          @plannedChange="
                            form.amount_of_funds_1.development_aquaculture_planned = $event
                          "
                          @actuallyChange="
                            form.amount_of_funds_1.development_aquaculture_actually = $event
                          "
                        />
                        <FormLine
                          :title="'Объем финансовых средств на развитие рыбоводства любительского(спортивного) (тысяч тенге)'"
                          :planned="form.amount_of_funds_1.development_amateur_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_measure_protect_planned
                          "
                          :actually="form.amount_of_funds_1.development_amateur_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_measure_protect_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm1()"
                          @plannedChange="
                            form.amount_of_funds_1.development_amateur_planned = $event
                          "
                          @actuallyChange="
                            form.amount_of_funds_1.development_amateur_actually = $event
                          "
                        />
                        <FormLine
                          :title="'Итого'"
                          :planned="form.amount_of_funds_1.total_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_development_planned
                          "
                          :actually="form.amount_of_funds_1.total_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_development_actually
                          "
                          :disabled="true"
                        />
                      </div>
                      <div
                        class="login__block--tab"
                        :class="{ 'login__block--active': tabElement == 2 }"
                        v-if="tabElement == 2"
                      >
                        <FormLine
                          :title="'Объем финансовых средств на рыбохозяйственные мероприятия (тысяч тенге)'"
                          :planned="form.amount_of_funds_2.fishery_activities_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.amount_of_financial_resources_planned
                          "
                          :actually="form.amount_of_funds_2.fishery_activities_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.amount_of_financial_resources_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm2()"
                          @plannedChange="
                            form.amount_of_funds_2.fishery_activities_planned = $event
                          "
                          @actuallyChange="
                            form.amount_of_funds_2.fishery_activities_actually = $event
                          "
                        />
                        <FormLine
                          :title="'Объем финансовых средств на мероприятия по воспроизводству рыбных ресурсов и других водных животных (тысяч тенге)'"
                          :planned="form.amount_of_funds_2.reproduction_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.activities_for_the_reproduction_planned
                          "
                          :actually="form.amount_of_funds_2.reproduction_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.activities_for_the_reproduction_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm2()"
                          @plannedChange="form.amount_of_funds_2.reproduction_planned = $event"
                          @actuallyChange="form.amount_of_funds_2.reproduction_actually = $event"
                        />
                        <FormLine
                          :title="'Объем финансовых средств на зарыбление и количество выпущенной молоди (тысяч тенге)'"
                          :planned="form.amount_of_funds_2.stocking_price_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_stocking_planned
                          "
                          :actually="form.amount_of_funds_2.stocking_price_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_stocking_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm2()"
                          @plannedChange="form.amount_of_funds_2.stocking_price_planned = $event"
                          @actuallyChange="form.amount_of_funds_2.stocking_price_actually = $event"
                        />
                        <FormLine
                          :title="'Объем финансовых средств на зарыбление и количество выпущенной молоди (штук)'"
                          :planned="form.amount_of_funds_2.stocking_count_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_stocking_planned
                          "
                          :actually="form.amount_of_funds_2.stocking_count_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.financial_resources_for_stocking_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm2()"
                          @plannedChange="form.amount_of_funds_2.stocking_count_planned = $event"
                          @actuallyChange="form.amount_of_funds_2.stocking_count_actually = $event"
                        />
                        <FormLine
                          :title="'Объем финансовых средств на мероприятия по охране рыбных ресурсов и других водных животных и среды их обитания (тысяч тенге)'"
                          :planned="form.amount_of_funds_2.security_planned"
                          :plannedError="
                            errorMessage.messages &&
                            errorMessage.messages.resources_for_measures_protect_fish_planned
                          "
                          :actually="form.amount_of_funds_2.security_actually"
                          :actuallyError="
                            errorMessage.messages &&
                            errorMessage.messages.resources_for_measures_protect_fish_actually
                          "
                          :disabled="isNotEditable"
                          @input="sumForm2()"
                          @plannedChange="form.amount_of_funds_2.security_planned = $event"
                          @actuallyChange="form.amount_of_funds_2.security_actually = $event"
                        />
                        <FormLine
                          :title="'Итого'"
                          :planned="form.amount_of_funds_2.total_planned"
                          :plannedError="
                            errorMessage.messages && errorMessage.messages.total_planned
                          "
                          :actually="form.amount_of_funds_2.total_actually"
                          :actuallyError="
                            errorMessage.messages && errorMessage.messages.total_actually
                          "
                          :disabled="true"
                        />
                      </div>
                      <div
                        class="login__block--tab"
                        :class="{ 'login__block--active': tabElement == 3 }"
                        v-if="tabElement == 3"
                      >
                        <FormLine
                          :title="'Проведение рыбоводно-мелиоративных работ, направленных на улучшение ихтиофауны (приобретение рыбопосадочного материала и зарыбление водоема сеголетками весом не менее 12 грамм)'"
                          :planned="form.amount_of_funds_3.breeding_and_reclamation_price_planned"
                          :actually="form.amount_of_funds_3.breeding_and_reclamation_price_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm3()"
                          @plannedChange="
                            form.amount_of_funds_3.breeding_and_reclamation_price_planned = $event
                          "
                          @actuallyChange="
                            form.amount_of_funds_3.breeding_and_reclamation_price_actually = $event
                          "
                        />
                        <FormLine
                          :title="''"
                          :planned="form.amount_of_funds_3.breeding_and_reclamation_count_planned"
                          :actually="form.amount_of_funds_3.breeding_and_reclamation_count_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm3()"
                          @plannedChange="
                            form.amount_of_funds_3.breeding_and_reclamation_count_planned = $event
                          "
                          @actuallyChange="
                            form.amount_of_funds_3.breeding_and_reclamation_count_actually = $event
                          "
                        />
                        <FormLine
                          :title="'Проведение противозаморных мероприятий (бурение лунок в зимний период, прорубка майн) (единица)'"
                          :planned="form.amount_of_funds_3.antifouling_planned"
                          :actually="form.amount_of_funds_3.antifouling_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm3()"
                          @plannedChange="form.amount_of_funds_3.antifouling_planned = $event"
                          @actuallyChange="form.amount_of_funds_3.antifouling_actually = $event"
                        />
                        <FormLine
                          :title="'Проведение исследования состояния ихтиофауны (тысяч тенге)'"
                          :planned="form.amount_of_funds_3.research_planned"
                          :actually="form.amount_of_funds_3.research_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm3()"
                          @plannedChange="form.amount_of_funds_3.research_planned = $event"
                          @actuallyChange="form.amount_of_funds_3.research_actually = $event"
                        />
                        <FormLine
                          :title="'Приобретение рыбоводно-мелиоративной техники (тысяч тенге)'"
                          :planned="form.amount_of_funds_3.equipment_planned"
                          :actually="form.amount_of_funds_3.equipment_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm3()"
                          @plannedChange="form.amount_of_funds_3.equipment_planned = $event"
                          @actuallyChange="form.amount_of_funds_3.equipment_actually = $event"
                        />
                        <FormLine
                          :title="'Содержание егерской службы (тысяч тенге)'"
                          :planned="form.amount_of_funds_3.gamekeeper_service_planned"
                          :actually="form.amount_of_funds_3.gamekeeper_service_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm3()"
                          @plannedChange="
                            form.amount_of_funds_3.gamekeeper_service_planned = $event
                          "
                          @actuallyChange="
                            form.amount_of_funds_3.gamekeeper_service_actually = $event
                          "
                        />
                        <FormLine
                          :title="'Обустройство береговой прилегающей полосы в соответствии с санитарными и иными нормами (тысяч тенге)'"
                          :planned="form.amount_of_funds_3.arrangement_planned"
                          :actually="form.amount_of_funds_3.arrangement_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm3()"
                          @plannedChange="form.amount_of_funds_3.arrangement_planned = $event"
                          @actuallyChange="form.amount_of_funds_3.arrangement_actually = $event"
                        />
                        <FormLine
                          :title="'Итого'"
                          :planned="form.amount_of_funds_3.total_planned"
                          :plannedError="
                            errorMessage.messages && errorMessage.messages.total_planned
                          "
                          :actually="form.amount_of_funds_3.total_actually"
                          :actuallyError="
                            errorMessage.messages && errorMessage.messages.total_actually
                          "
                          :disabled="true"
                        />
                      </div>
                      <div
                        class="login__block--tab"
                        :class="{ 'login__block--active': tabElement == 4 }"
                        v-if="tabElement == 4"
                      >
                        <FormLine
                          :title="'Приобретение садков для выращивания рыб (тысяч тенге)'"
                          :planned="form.amount_of_funds_4.purchase_of_cages_planned"
                          :actually="form.amount_of_funds_4.purchase_of_cages_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm4()"
                          @plannedChange="form.amount_of_funds_4.purchase_of_cages_planned = $event"
                          @actuallyChange="
                            form.amount_of_funds_4.purchase_of_cages_actually = $event
                          "
                        />
                        <FormLine
                          :title="'Затраты на создание береговой инфраструктуры (тысяч тенге)'"
                          :planned="
                            form.amount_of_funds_4.cost_of_creating_coastal_infrastructure_planned
                          "
                          :actually="
                            form.amount_of_funds_4.cost_of_creating_coastal_infrastructure_actually
                          "
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm4()"
                          @plannedChange="
                            form.amount_of_funds_4.cost_of_creating_coastal_infrastructure_planned =
                              $event
                          "
                          @actuallyChange="
                            form.amount_of_funds_4.cost_of_creating_coastal_infrastructure_actually =
                              $event
                          "
                        />
                        <FormLine
                          :title="'Приобретение рыбопосадочного материала сеголетками весом не менее 12 грамм (тысяч тенге)'"
                          :planned="form.amount_of_funds_4.purchase_of_fish_stock_price_planned"
                          :actually="form.amount_of_funds_4.purchase_of_fish_stock_price_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm4()"
                          @plannedChange="
                            form.amount_of_funds_4.purchase_of_fish_stock_price_planned = $event
                          "
                          @actuallyChange="
                            form.amount_of_funds_4.purchase_of_fish_stock_price_actually = $event
                          "
                        />
                        <FormLine
                          :title="'Приобретение рыбопосадочного материала сеголетками весом не менее 12 грамм (тысяч штук)'"
                          :planned="form.amount_of_funds_4.purchase_of_fish_stock_count_planned"
                          :actually="form.amount_of_funds_4.purchase_of_fish_stock_count_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm4()"
                          @plannedChange="
                            form.amount_of_funds_4.purchase_of_fish_stock_count_planned = $event
                          "
                          @actuallyChange="
                            form.amount_of_funds_4.purchase_of_fish_stock_count_actually = $event
                          "
                        />
                        <FormLine
                          :title="'Покупка кормов для рыб (тысяч тенге)'"
                          :planned="form.amount_of_funds_4.feed_planned"
                          :actually="form.amount_of_funds_4.feed_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm4()"
                          @plannedChange="form.amount_of_funds_4.feed_planned = $event"
                          @actuallyChange="form.amount_of_funds_4.feed_actually = $event"
                        />
                        <FormLine
                          :title="'Организация охраны садков (тысяч тенге)'"
                          :planned="form.amount_of_funds_4.cage_security_planned"
                          :actually="form.amount_of_funds_4.cage_security_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm4()"
                          @plannedChange="form.amount_of_funds_4.cage_security_planned = $event"
                          @actuallyChange="form.amount_of_funds_4.cage_security_actually = $event"
                        />
                        <FormLine
                          :title="'Затраты на научные исследования (тысяч тенге)'"
                          :planned="form.amount_of_funds_4.research_costs_planned"
                          :actually="form.amount_of_funds_4.research_costs_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm4()"
                          @plannedChange="form.amount_of_funds_4.research_costs_planned = $event"
                          @actuallyChange="form.amount_of_funds_4.research_costs_actually = $event"
                        />
                        <FormLine
                          :title="'Приобретение техники для обеспечения ведения садкового рыбоводного хозяйства, транспортировки товарной рыбы (тысяч тенге)'"
                          :planned="form.amount_of_funds_4.technique_planned"
                          :actually="form.amount_of_funds_4.technique_actually"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm4()"
                          @plannedChange="form.amount_of_funds_4.technique_planned = $event"
                          @actuallyChange="form.amount_of_funds_4.technique_actually = $event"
                        />
                        <FormLine
                          :title="'Содержание штатных работников (тысяч тенге)'"
                          :planned="form.amount_of_funds_4.staff_members_actually"
                          :actually="form.amount_of_funds_4.staff_members_planned"
                          :fulfillmentActive="false"
                          :disabled="isNotEditable"
                          @input="sumForm4()"
                          @plannedChange="form.amount_of_funds_4.staff_members_actually = $event"
                          @actuallyChange="form.amount_of_funds_4.staff_members_planned = $event"
                        />
                        <FormLine
                          :title="'Итого'"
                          :planned="form.amount_of_funds_4.total_planned"
                          :plannedError="
                            errorMessage.messages && errorMessage.messages.total_planned
                          "
                          :actually="form.amount_of_funds_4.total_actually"
                          :actuallyError="
                            errorMessage.messages && errorMessage.messages.total_actually
                          "
                          :disabled="true"
                        />
                      </div>
                      <hr class="form__line" />
                      <ReportManageFormButtons :edit="!isNotEditable" :report="'3-rh'" />
                    </div>
                  </div>
                  <ReportManageModal
                    :ecp="true"
                    :errorMessage="errorMessage"
                    :message="message"
                    @accept="saveElement"
                    @close="$modal.hide('modal_head')"
                  />
                </form>
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
import { mapGetters, mapActions } from 'vuex';
import { convertObjectToFormData } from '@/formData';

import Multiselect from 'vue-multiselect';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import TabHeader from '@/components/UI/TabHeader.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';

import FormLine from './components/FormLine.vue';

export default {
  name: 'ReportPage3',
  components: {
    Multiselect,
    HeaderBack,
    TabHeader,
    ReportManageModal,
    ReportManageFormButtons,
    FormLine,
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
      applicationsUser: null,
      applicationsPond: null,
      applicationsDistrict: null,
      applicationsKato: null,
      applicationsFish: null,
      form: {
        surrender_date: '2023-12-05',

        region_id: null,
        farm_id: null,
        district_id: null,
        amount_of_funds_1: {
          work_planned: '',
          work_actually: '',
          //воспроизведение
          reproduction_planned: '',
          reproduction_actually: '',
          //зарыбление/цена и штук
          stocking_price_planned: '',
          stocking_price_actually: '',
          stocking_count_planned: '',
          stocking_count_actually: '',
          //по охране
          security_planned: '',
          security_actually: '',
          //(аквакультуры)
          development_aquaculture_planned: '',
          development_aquaculture_actually: '',
          //любительское рыболовство
          development_amateur_planned: '',
          development_amateur_actually: '',
          //итог
          total_planned: '',
          total_actually: '',
        },
        amount_of_funds_2: {
          fishery_activities_planned: '',
          fishery_activities_actually: '',
          //воспроизведение
          reproduction_planned: '',
          reproduction_actually: '',
          //зарыбление/цена и штук
          stocking_price_planned: '',
          stocking_price_actually: '',
          stocking_count_planned: '',
          stocking_count_actually: '',
          //по охране
          security_planned: '',
          security_actually: '',
          //итог
          total_planned: '',
          total_actually: '',
        },
        amount_of_funds_3: {
          //цена/штук
          breeding_and_reclamation_price_planned: '',
          breeding_and_reclamation_price_actually: '',
          breeding_and_reclamation_count_planned: '',
          breeding_and_reclamation_count_actually: '',
          //Проведение противозаморных мероприятий
          antifouling_planned: '',
          antifouling_actually: '',
          //Проведение исследования состояния ихтиофауны
          research_planned: '',
          research_actually: '',
          //Приобретение рыбоводно-мелиоративной техники
          equipment_planned: '',
          equipment_actually: '',
          //Содержание егерской службы (тысяч тенге)
          gamekeeper_service_planned: '',
          gamekeeper_service_actually: '',
          //Обустройство береговой прилегающей полосы в
          arrangement_planned: '',
          arrangement_actually: '',
          total_planned: '',
          total_actually: '',
        },
        amount_of_funds_4: {
          //Приобретение садков для выращивания рыб (тысяч тенге)
          purchase_of_cages_planned: '',
          purchase_of_cages_actually: '',
          //Затраты на создание береговой инфраструктуры
          cost_of_creating_coastal_infrastructure_planned: '',
          cost_of_creating_coastal_infrastructure_actually: '',
          //Приобретение рыбопосадочного материала сеголетками весом не менее 12 грамм (тысяч штук/ тысяч тенге)
          purchase_of_fish_stock_count_planned: '',
          purchase_of_fish_stock_count_actually: '',
          purchase_of_fish_stock_price_planned: '',
          purchase_of_fish_stock_price_actually: '',
          //Покупка кормов для рыб
          feed_planned: '',
          feed_actually: '',
          //Организация охраны садков
          cage_security_planned: '',
          cage_security_actually: '',
          //Затраты на научные исследования (тысяч тенге)
          research_costs_planned: '',
          research_costs_actually: '',
          //Приобретение техники для обеспечения ведения садкового рыбоводного хозяйства
          technique_planned: '',
          technique_actually: '',
          //Содержание штатных работников (тысяч тенге)
          staff_members_actually: '',
          staff_members_planned: '',
          //итог
          total_planned: '',
          total_actually: '',
        },
      },
      tabElement: 1,
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
      dataEcp: null,
    };
  },
  computed: {
    ...mapGetters(['_getRegionList']),
    getReportTitle() {
      if (this.statusPage == 'show') return this.$t('reporting.title');
      else if (this.statusPage == 'edit') return 'Редактирование отчета';
      return 'Добавление нового отчета';
    },
    isNotEditable() {
      return this.statusPage == 'show';
    },
    isFullFilled() {
      return this.statusPage === 'edit' || this.statusPage === 'show';
    },
    getUserRegionList() {
      if (!this._getRegionList) return [];
      if (!this.applicationsUser) this._getRegionList;
      return this._getRegionList.filter((element) => {
        return this.applicationsUser.region.find((e) => {
          if (e.id == element.id) {
            element.value = e.value;
            return true;
          }
        });
      });
    },
    getUserPondList() {
      if (!this.applicationsPond) return [];
      if (!this.applicationsUser) this.applicationsPond;
      return this.applicationsPond.filter((element) => {
        return this.applicationsUser.pond.find((e) => {
          if (e.id == element.id) {
            element.value = e.value;
            return true;
          }
        });
      });
    },
    getUserDistrictList() {
      if (!this.applicationsDistrict) return [];
      if (!this.applicationsUser) this.applicationsDistrict;
      return this.applicationsDistrict.filter((element) => {
        return this.applicationsUser.pond.find((e) => {
          return element.links.find((d) => {
            if (e.id == d.item_id && element.id == d.catalog_id) {
              return true;
            }
          });
        });
      });
    },
    getUserKatoList() {
      if (!this.applicationsKato) return [];
      if (!this.applicationsUser) this.applicationsKato;
      return this.applicationsKato.filter((element) => {
        return this.applicationsUser.region.find((e) => {
          if (e.id == element.values[0].parent_id) {
            element.value = e.value;
            return true;
          }
        });
      });
    },
    formList() {
      return {
        region: this.getUserRegionList,
        district: this.getUserDistrictList,
        pond: this.getUserPondList,
        kato: this.getUserKatoList,
      };
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
    saveElement() {
      if (this.$configFile.active) return this.sendEcpKey();
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

          //setErrormodal(true);
          setTimeout(() => {
            //setErrormodal(false);
          }, 5000);
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
        this.dataEcp = data1.responseObject;
        if (data1.responseObject) {
          this.sendEcpKey();
        }
      };
    },
    sendEcpKey() {
      const formData = new FormData();
      formData.append('xml', this.dataEcp || this.$configFile.xml);
      document.querySelector('.preloader').classList.add('active');
      api
        .post(`subject/sign/3/${this.$route.params.id}`, formData)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/3-rh' });
          }
        })
        .catch((e) => {})
        .finally(() => {
          document.querySelector('.preloader').classList.remove('active');
        });
    },
    sumForm1() {
      this.form.amount_of_funds_1.total_planned =
        Number(this.form.amount_of_funds_1.work_planned) +
        Number(this.form.amount_of_funds_1.reproduction_planned) +
        Number(this.form.amount_of_funds_1.stocking_price_planned) +
        //+ Number(this.form.amount_of_funds_1.stocking_count_planned)
        Number(this.form.amount_of_funds_1.security_planned) +
        Number(this.form.amount_of_funds_1.development_aquaculture_planned) +
        Number(this.form.amount_of_funds_1.development_amateur_planned);

      this.form.amount_of_funds_1.total_actually =
        Number(this.form.amount_of_funds_1.work_actually) +
        Number(this.form.amount_of_funds_1.reproduction_actually) +
        Number(this.form.amount_of_funds_1.stocking_price_actually) +
        //+ Number(this.form.amount_of_funds_1.stocking_count_actually)
        Number(this.form.amount_of_funds_1.security_actually) +
        Number(this.form.amount_of_funds_1.development_aquaculture_actually) +
        Number(this.form.amount_of_funds_1.development_amateur_actually);
    },
    sumForm2() {
      this.form.amount_of_funds_2.total_planned =
        Number(this.form.amount_of_funds_2.fishery_activities_planned) +
        Number(this.form.amount_of_funds_2.reproduction_planned) +
        Number(this.form.amount_of_funds_2.stocking_price_planned) +
        //+ Number(this.form.amount_of_funds_1.stocking_count_planned)
        Number(this.form.amount_of_funds_2.security_planned);

      this.form.amount_of_funds_2.total_actually =
        Number(this.form.amount_of_funds_2.fishery_activities_actually) +
        Number(this.form.amount_of_funds_2.reproduction_actually) +
        Number(this.form.amount_of_funds_2.stocking_price_actually) +
        //+ Number(this.form.amount_of_funds_1.stocking_count_actually)
        Number(this.form.amount_of_funds_2.security_actually);
    },
    sumForm3() {
      this.form.amount_of_funds_3.total_planned =
        Number(this.form.amount_of_funds_3.breeding_and_reclamation_price_planned) +
        Number(this.form.amount_of_funds_3.antifouling_planned) +
        Number(this.form.amount_of_funds_3.research_planned) +
        //+ Number(this.form.amount_of_funds_1.stocking_count_planned)
        Number(this.form.amount_of_funds_3.equipment_planned) +
        Number(this.form.amount_of_funds_3.gamekeeper_service_planned) +
        Number(this.form.amount_of_funds_3.arrangement_planned);

      this.form.amount_of_funds_3.total_actually =
        Number(this.form.amount_of_funds_3.breeding_and_reclamation_price_actually) +
        Number(this.form.amount_of_funds_3.antifouling_actually) +
        Number(this.form.amount_of_funds_3.research_actually) +
        //+ Number(this.form.amount_of_funds_1.stocking_count_planned)
        Number(this.form.amount_of_funds_3.equipment_actually) +
        Number(this.form.amount_of_funds_3.gamekeeper_service_actually) +
        Number(this.form.amount_of_funds_3.arrangement_actually);
    },
    sumForm4() {
      this.form.amount_of_funds_4.total_planned =
        Number(this.form.amount_of_funds_4.purchase_of_cages_planned) +
        Number(this.form.amount_of_funds_4.cost_of_creating_coastal_infrastructure_planned) +
        Number(this.form.amount_of_funds_4.purchase_of_fish_stock_price_planned) +
        Number(this.form.amount_of_funds_1.stocking_count_planned) +
        Number(this.form.amount_of_funds_4.feed_planned) +
        Number(this.form.amount_of_funds_4.cage_security_planned) +
        //+ Number(this.form.amount_of_funds_4.arrangement_planned)
        Number(this.form.amount_of_funds_4.research_costs_planned) +
        Number(this.form.amount_of_funds_4.technique_planned) +
        Number(this.form.amount_of_funds_4.staff_members_planned);

      this.form.amount_of_funds_4.total_actually =
        Number(this.form.amount_of_funds_4.purchase_of_cages_actually) +
        Number(this.form.amount_of_funds_4.cost_of_creating_coastal_infrastructure_actually) +
        Number(this.form.amount_of_funds_4.purchase_of_fish_stock_price_actually) +
        //+ Number(this.form.amount_of_funds_1.stocking_count_planned)
        Number(this.form.amount_of_funds_4.feed_actually) +
        Number(this.form.amount_of_funds_4.cage_security_actually) +
        //+ Number(this.form.amount_of_funds_4.arrangement_actually)
        Number(this.form.amount_of_funds_4.research_costs_actually) +
        Number(this.form.amount_of_funds_4.technique_actually) +
        Number(this.form.amount_of_funds_4.staff_members_actually);
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        document.querySelector('.preloader').classList.add('active');

        let data = this.form;
        for (let key in data) {
          if (data[key] == null) delete data[key];
        }

        let formData = convertObjectToFormData(data);

        if (this.statusPage == 'edit') {
          formData.append('_method', 'PUT');
        }

        api
          .post(
            `/subject/store/3${this.statusPage === 'edit' ? `/${this.$route.params.id}` : ''}`,
            formData,
          )
          .then(() => {
            this.$router.push('/ru/account/reporting/3-rh');
          })
          .catch((err) => {})
          .finally(() => {
            document.querySelector('.preloader').classList.remove('active');
          });
      }
    },
    async apiGetDistrictList() {
      try {
        const response = await api.get('catalog/13/entry/all');
        if (response.data) {
          this.applicationsDistrict = response.data.map((element) => {
            element.name = element.values[0].value;
            return element;
          });
        }
      } catch (error) {
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
      }
    },
    async apiGetPondList() {
      try {
        const response = await api.get('catalog/3/entry/all');
        if (response.data) {
          this.applicationsPond = response.data.map((element) => {
            element.name = element.values[0].value;
            return element;
          });
        }
      } catch (error) {
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
      }
    },
    async apiGetKatoList() {
      try {
        const response = await api.get('catalog/12/entry/all');
        if (response.data) {
          this.applicationsKato = response.data.map((element) => {
            element.name = element.values[0].value;
            return element;
          });
        }
      } catch (error) {
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
      }
    },
    async apiGetUserRegions() {
      try {
        const response = await api.get('/user/region');
        if (response.data) {
          this.applicationsUser = response.data;
        }
      } catch (error) {
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
      }
    },
    async apiGetPondFish() {
      try {
        const response = await api.get('catalog/4/entry/all');
        if (response.data) {
          this.applicationsFish = response.data.map((element) => {
            element.name = element.values[0].value;
            return element;
          });
        }
      } catch (error) {
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
      }
    },
    setInitFormData() {
      this.form = {
        ...this.form,
        region_id: this.formList.region[0].id,
        farm_id: this.formList.pond[0].id,
        district_id: this.formList.district[0].id,
      };
    },
    async showDetailManagment() {
      if (this.isFullFilled) {
        try {
          const { data } = await api.get(`subject/show/3/${this.$route.params.id}`);
          this.form = {
            ...this.form,
            ...data.data,
          };
        } catch (error) {}
      }
    },
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
  async beforeMount() {
    await this._fetchRegionList();
    await this.apiGetDistrictList();
    await this.apiGetPondList();
    await this.apiGetKatoList();
    await this.apiGetUserRegions();
    await this.apiGetPondFish();
    this.setInitFormData();
    await this.showDetailManagment();
  },
};
</script>
