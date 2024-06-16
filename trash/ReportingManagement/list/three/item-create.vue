<template>
  <div
    class="wrap__content"
    v-bind:class="{
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
      class="container"
      v-if="
        _getRegionList &&
        applicationsPond &&
        applicationsDistrict &&
        applicationsKato &&
        applicationsFish
      "
    >
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">Добавление нового отчета</div>
                    <div class="content__title--subtext">
                      Сведения о выполнении запланированных на текущий год объемов финансовых
                      средств пользователями для развития рыбного хозяйства
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST">
                  <!--  @submit.prevent="onSubmit" -->

                  <!--
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Наименование отчета
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input" :class="[errorMessage.messages && errorMessage.messages.name ? 'input--error' : '']">
                            <input type="text" class="input-linck" required="" name="name" v-model="form.name" placeholder="Наименование">
                          </div>
                          <div class="input-required" v-if="errorMessage.messages && errorMessage.messages.name"><p v-for="massage in errorMessage.messages.name">{{ massage }}</p></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  -->

                  <!--
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Наименование пользователя животного мира
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input" :class="[errorMessage.messages && errorMessage.messages.t_animal ? 'input--error' : '']">
                            <input type="text" class="input-linck" required="" disabled :value="$store.state.userObject.name_company ? $store.state.userObject.name_company+'('+$store.state.userObject.iin_bin+')':$store.state.userObject.iin_bin" placeholder="Наименование">
                          </div>
                          <div class="input-required" v-if="errorMessage.messages && errorMessage.messages.t_animal"><p v-for="massage in errorMessage.messages.t_animal">{{ massage }}</p></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  -->

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование региона</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.region_id
                                ? 'input--error'
                                : '',
                            ]"
                            v-if="formList.region.length == 1"
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
                              v-model="regionValue"
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
                            <p v-for="massage in errorMessage.messages.region_id">{{ massage }}</p>
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
                              v-model="pondValue"
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
                            <p v-for="massage in errorMessage.messages.t_water">{{ massage }}</p>
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
                              v-model="districtValue"
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
                            <p v-for="massage in errorMessage.messages.t_district">{{ massage }}</p>
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
                              v-model="katoValue"
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
                            <p v-for="massage in errorMessage.messages.c_kato">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="form__line" />

                  <div class="row">
                    <div class="col-xl-3 col-lg-5">
                      <div class="main__sidebar main__sidebar--tabs">
                        <nav class="main__sidebar--nav">
                          <ul class="menu sidebar__nav sidebar__nav--main">
                            <li
                              class="sidebar-item"
                              v-bind:class="{ 'menu-open': tabElement == 1 }"
                            >
                              <a class="sidebar-link" @click="tabElement = 1"> Раздел 1 </a>
                            </li>
                            <li
                              class="sidebar-item"
                              v-bind:class="{ 'menu-open': tabElement == 2 }"
                            >
                              <a class="sidebar-link" @click="tabElement = 2"> Раздел 2 </a>
                            </li>
                            <li
                              class="sidebar-item"
                              v-bind:class="{ 'menu-open': tabElement == 3 }"
                            >
                              <a class="sidebar-link" @click="tabElement = 3"> Раздел 3 </a>
                            </li>
                            <li
                              class="sidebar-item"
                              v-bind:class="{ 'menu-open': tabElement == 4 }"
                            >
                              <a class="sidebar-link" @click="tabElement = 4"> Раздел 4 </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                    <div class="col-xl-9 col-lg-7">
                      <div
                        class="login__block--tab"
                        v-bind:class="{ 'login__block--active': tabElement == 1 }"
                        v-if="tabElement == 1"
                      >
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Объем финансовых средств на работы (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm1()"
                                    v-model="form.chapter1.amount_of_financial_resources_planned"
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_planned
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .amount_of_financial_resources_planned"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm1()"
                                    v-model="form.chapter1.amount_of_financial_resources_actually"
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_actually
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .amount_of_financial_resources_actually"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">% выполнения</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_fulfillment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="
                                      form.chapter1.amount_of_financial_resources_fulfillment
                                    "
                                    value=""
                                    placeholder="% выполнения"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_fulfillment
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .amount_of_financial_resources_fulfillment"
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
                              Объем финансовых средств на мероприятия по воспроизводству рыбных
                              ресурсов и других водных животных(тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_measures_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm1()"
                                    v-model="form.chapter1.financial_resources_for_measures_planned"
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_measures_planned
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_measures_planned"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_measures_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm1()"
                                    v-model="
                                      form.chapter1.financial_resources_for_measures_actually
                                    "
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_measures_actually
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_measures_actually"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">% выполнения</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_measures_fulfillment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="
                                      form.chapter1.financial_resources_for_measures_fulfillment
                                    "
                                    value=""
                                    placeholder="% выполнения"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_measures_fulfillment
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_measures_fulfillment"
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
                              объем финансовых средств на зарыбление и количество выпущенной молоди
                              (тысяч тенге/тысяч штук)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_activities_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm1()"
                                    v-model="
                                      form.chapter1.financial_resources_for_activities_planned
                                    "
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_activities_planned
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_activities_planned"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_activities_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm1()"
                                    v-model="
                                      form.chapter1.financial_resources_for_activities_actually
                                    "
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_activities_actually
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_activities_actually"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">% выполнения</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_activities_fulfillment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="
                                      form.chapter1.financial_resources_for_activities_fulfillment
                                    "
                                    value=""
                                    placeholder="% выполнения"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_activities_fulfillment
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_activities_fulfillment"
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
                              Объем финансовых средств на мероприятия по охране рыбных ресурсов и
                              других водных животных и среды их обитания (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_stocking_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm1()"
                                    v-model="form.chapter1.financial_resources_for_stocking_planned"
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_stocking_planned
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_stocking_planned"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_stocking_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm1()"
                                    v-model="
                                      form.chapter1.financial_resources_for_stocking_actually
                                    "
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_stocking_actually
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_stocking_actually"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">% выполнения</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_stocking_fulfillment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="
                                      form.chapter1.financial_resources_for_stocking_fulfillment
                                    "
                                    value=""
                                    placeholder="% выполнения"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_stocking_fulfillment
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_stocking_fulfillment"
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
                              Объем финансовых средств на развитие рыбоводства (аквакультуры) и
                              любительского(спортивного) рыболовства (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_measure_protect_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm1()"
                                    v-model="
                                      form.chapter1.financial_resources_for_measure_protect_planned
                                    "
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_measure_protect_planned
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_measure_protect_planned"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_measure_protect_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm1()"
                                    v-model="
                                      form.chapter1.financial_resources_for_measure_protect_actually
                                    "
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_measure_protect_actually
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_measure_protect_actually"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">% выполнения</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_measure_protect_fulfillment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="
                                      form.chapter1
                                        .financial_resources_for_measure_protect_fulfillment
                                    "
                                    value=""
                                    placeholder="% выполнения"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_measure_protect_fulfillment
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_measure_protect_fulfillment"
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
                            <div class="form__line--title">Итого</div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_development_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    @input="sumForm1()"
                                    v-model="
                                      form.chapter1.financial_resources_for_development_planned
                                    "
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_development_planned
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_development_planned"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_development_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    @input="sumForm1()"
                                    v-model="
                                      form.chapter1.financial_resources_for_development_actually
                                    "
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_development_actually
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_development_actually"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">% выполнения</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_development_fulfillment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="
                                      form.chapter1.financial_resources_for_development_fulfillment
                                    "
                                    value=""
                                    placeholder="% выполнения"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_development_fulfillment
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_development_fulfillment"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="login__block--tab"
                        v-bind:class="{ 'login__block--active': tabElement == 2 }"
                        v-if="tabElement == 2"
                      >
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Объем финансовых средств на рыбохозяйственные мероприятия (тысяч
                              тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm2()"
                                    v-model="form.chapter2.amount_of_financial_resources_planned"
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_planned
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .amount_of_financial_resources_planned"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm2()"
                                    v-model="form.chapter2.amount_of_financial_resources_actually"
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_actually
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .amount_of_financial_resources_actually"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">% выполнения</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_fulfillment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="
                                      form.chapter2.amount_of_financial_resources_fulfillment
                                    "
                                    value=""
                                    placeholder="% выполнения"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.amount_of_financial_resources_fulfillment
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .amount_of_financial_resources_fulfillment"
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
                              Объем финансовых средств на мероприятия по воспроизводству рыбных
                              ресурсов и других водных животных (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.activities_for_the_reproduction_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm2()"
                                    v-model="form.chapter2.activities_for_the_reproduction_planned"
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.activities_for_the_reproduction_planned
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .activities_for_the_reproduction_planned"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.activities_for_the_reproduction_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm2()"
                                    v-model="form.chapter2.activities_for_the_reproduction_actually"
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.activities_for_the_reproduction_actually
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .activities_for_the_reproduction_actually"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">% выполнения</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .activities_for_the_reproduction_fulfillment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="
                                      form.chapter2.activities_for_the_reproduction_fulfillment
                                    "
                                    value=""
                                    placeholder="% выполнения"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .activities_for_the_reproduction_fulfillment
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .activities_for_the_reproduction_fulfillment"
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
                              Объем финансовых средств на зарыбление и количество выпущенной молоди
                              (тысяч тенге/тысяч штук)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_stocking_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm2()"
                                    v-model="form.chapter2.financial_resources_for_stocking_planned"
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_stocking_planned
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_stocking_planned"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_stocking_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm2()"
                                    v-model="
                                      form.chapter2.financial_resources_for_stocking_actually
                                    "
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages.financial_resources_for_stocking_actually
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_stocking_actually"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">% выполнения</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_stocking_fulfillment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="
                                      form.chapter2.financial_resources_for_stocking_fulfillment
                                    "
                                    value=""
                                    placeholder="% выполнения"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .financial_resources_for_stocking_fulfillment
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .financial_resources_for_stocking_fulfillment"
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
                              Объем финансовых средств на мероприятия по охране рыбных ресурсов и
                              других водных животных и среды их обитания (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .resources_for_measures_protect_fish_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm2()"
                                    v-model="
                                      form.chapter2.resources_for_measures_protect_fish_planned
                                    "
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .resources_for_measures_protect_fish_planned
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .resources_for_measures_protect_fish_planned"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .resources_for_measures_protect_fish_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm2()"
                                    v-model="
                                      form.chapter2.resources_for_measures_protect_fish_actually
                                    "
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .resources_for_measures_protect_fish_actually
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .resources_for_measures_protect_fish_actually"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">% выполнения</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .resources_for_measures_protect_fish_fulfillment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="
                                      form.chapter2.resources_for_measures_protect_fish_fulfillment
                                    "
                                    value=""
                                    placeholder="% выполнения"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages &&
                                    errorMessage.messages
                                      .resources_for_measures_protect_fish_fulfillment
                                  "
                                >
                                  <p
                                    v-for="massage in errorMessage.messages
                                      .resources_for_measures_protect_fish_fulfillment"
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
                            <div class="form__line--title">Итого</div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.total_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    @input="sumForm1()"
                                    v-model="form.chapter2.total_planned"
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages && errorMessage.messages.total_planned
                                  "
                                >
                                  <p v-for="massage in errorMessage.messages.total_planned">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.total_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    @input="sumForm1()"
                                    v-model="form.chapter2.total_actually"
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages && errorMessage.messages.total_actually
                                  "
                                >
                                  <p v-for="massage in errorMessage.messages.total_actually">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form__line--title">% выполнения</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.total_fulfillment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="form.chapter2.total_fulfillment"
                                    value=""
                                    placeholder="% выполнения"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages && errorMessage.messages.total_fulfillment
                                  "
                                >
                                  <p v-for="massage in errorMessage.messages.total_fulfillment">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="login__block--tab"
                        v-bind:class="{ 'login__block--active': tabElement == 3 }"
                        v-if="tabElement == 3"
                      >
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Проведение рыбоводно-мелиоративных работ, направленных на улучшение
                              ихтиофауны (приобретение рыбопосадочного материала и зарыбление
                              водоема сеголетками весом не менее 12 грамм)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">
                                  Запланировано<br />(тысяч тенге)
                                </div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="form.chapter3.carrying_fish_works_tenge_planned"
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически<br />(тысяч тенге)</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="form.chapter3.carrying_fish_works_tenge_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <br />
                                <div class="form__line--title">Запланировано<br />(тысяч штук)</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="form.chapter3.carrying_fish_works_things_planned"
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>

                              <div class="col-xl-6">
                                <br />
                                <div class="form__line--title">Фактически<br />(тысяч штук)</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="form.chapter3.carrying_fish_works_things_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Проведение противозаморных мероприятий (бурение лунок в зимний период,
                              прорубка майн) (единица)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="form.chapter3.carrying_anti_freeze_measures_planned"
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="form.chapter3.carrying_anti_freeze_measures_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Проведение исследования состояния ихтиофауны (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="form.chapter3.studies_state_ichthyofauna_planned"
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="form.chapter3.studies_state_ichthyofauna_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Приобретение рыбоводно-мелиоративной техники (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="
                                      form.chapter3.fish_farming_reclamation_equipment_planned
                                    "
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="
                                      form.chapter3.fish_farming_reclamation_equipment_actually
                                    "
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Содержание егерской службы (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="form.chapter3.contents_jaeger_service_planned"
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="form.chapter3.contents_jaeger_service_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Обустройство береговой прилегающей полосы в соответствии с санитарными
                              и иными нормами (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="
                                      form.chapter3.arrangement_adjacent_coastal_strip_planned
                                    "
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm3()"
                                    v-model="
                                      form.chapter3.arrangement_adjacent_coastal_strip_actually
                                    "
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">Итого</div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.total_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="form.chapter3.total_planned"
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages && errorMessage.messages.total_planned
                                  "
                                >
                                  <p v-for="massage in errorMessage.messages.total_planned">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.total_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="form.chapter3.total_actually"
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages && errorMessage.messages.total_actually
                                  "
                                >
                                  <p v-for="massage in errorMessage.messages.total_actually">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="login__block--tab"
                        v-bind:class="{ 'login__block--active': tabElement == 4 }"
                        v-if="tabElement == 4"
                      >
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Приобретение садков для выращивания рыб (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.acquisition_cages_growing_planned"
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.acquisition_cages_growing_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Затраты на создание береговой инфраструктуры (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.coastal_infrastructure_costs_planned"
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.coastal_infrastructure_costs_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Приобретение рыбопосадочного материала сеголетками весом не менее 12
                              грамм (тысяч штук/ тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.acquisition_fish_stock_planned"
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.acquisition_fish_stock_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Покупка кормов для рыб (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.buying_fish_food_planned"
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.buying_fish_food_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Организация охраны садков (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.organization_protection_cages_planned"
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.organization_protection_cages_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Затраты на научные исследования (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.research_costs_planned"
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.research_costs_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Приобретение техники для обеспечения ведения садкового рыбоводного
                              хозяйства, транспортировки товарной рыбы (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="
                                      form.chapter4.acquisition_equipment_cage_fish_farming_planned
                                    "
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="
                                      form.chapter4.acquisition_equipment_cage_fish_farming_actually
                                    "
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Содержание штатных работников (тысяч тенге)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.maintenance_full_time_employees_planned"
                                    placeholder="Запланировано"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div class="form__line--input">
                                  <input
                                    type="number"
                                    class="input-linck"
                                    required=""
                                    @input="sumForm4()"
                                    v-model="form.chapter4.maintenance_full_time_employees_actually"
                                    placeholder="Фактически"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">Итого</div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="form__line--title">Запланировано</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.total_planned
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="form.chapter4.total_planned"
                                    value=""
                                    placeholder="Запланировано"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages && errorMessage.messages.total_planned
                                  "
                                >
                                  <p v-for="massage in errorMessage.messages.total_planned">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="form__line--title">Фактически</div>
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.total_actually
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="number"
                                    class="input-linck"
                                    disabled
                                    required=""
                                    v-model="form.chapter4.total_actually"
                                    value=""
                                    placeholder="Фактически"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="
                                    errorMessage.messages && errorMessage.messages.total_actually
                                  "
                                >
                                  <p v-for="massage in errorMessage.messages.total_actually">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr class="form__line" />

                      <div class="form__line">
                        <div class="form__line--right">
                          <div class="input__row">
                            <div class="block__row--left">
                              <a
                                class="input-btn form__line--btn"
                                @click="$modal.show('modal_head')"
                              >
                                <!-- v-if="applications.status != 'active' && applications.status != 'deleted'" -->
                                Подписать ЭЦП
                              </a>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-xl-12">
                              <div
                                class="form__block--line form__messages"
                                v-if="message.text"
                                :class="{
                                  'form__messages--error': message.status != 200,
                                  'form__messages--success': message.status == 200,
                                }"
                              >
                                <label class="form__block--input">
                                  <span class="form__block--title">
                                    {{ message.text }}
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <modal
                    class="modal__block modal__block--middle modal__block--success"
                    name="modal_head"
                    :width="550"
                    :min-width="550"
                    height="auto"
                  >
                    <div class="modal__block--wrapper">
                      <div class="modal__block--close" @click="$modal.hide('modal_head')">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.5 7.5L7.5 22.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.5 7.5L22.5 22.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div class="modal__wrapper">
                        <div class="modal__header">
                          <div class="modal__title">
                            Для сохранения журнала, необходимо подтверждение электронно цифровой
                            подписью
                          </div>
                        </div>

                        <div class="modal__content">
                          <div class="modal__form">
                            <div class="block__row">
                              <div class="block__row--left">
                                <a class="block__item block__item--green" @click="saveElement">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10 18.3333C14.6025 18.3333 18.3334 14.6025 18.3334 9.99996C18.3334 5.39746 14.6025 1.66663 10 1.66663C5.39752 1.66663 1.66669 5.39746 1.66669 9.99996C1.66669 14.6025 5.39752 18.3333 10 18.3333Z"
                                      stroke="#5ABB5E"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M7.5 10L9.16667 11.6667L12.5 8.33337"
                                      stroke="#5ABB5E"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  Подписать ЭЦП
                                </a>
                              </div>
                              <div class="block__row--right">
                                <a
                                  class="block__item block__item--blue"
                                  @click="$modal.hide('modal_head')"
                                >
                                  {{ $t('button.cancel') }}
                                </a>
                              </div>
                            </div>
                            <div
                              class="form__block--line form__messages"
                              v-if="message.status"
                              :class="{
                                'form__messages--error': message.status != 200,
                                'form__messages--success': message.status == 200,
                              }"
                            >
                              <label class="form__block--input">
                                <span class="form__block--title">
                                  {{ message.text }}
                                </span>
                              </label>
                            </div>
                            <div
                              class="form__block--line form__messages"
                              v-if="errorMessage.text"
                              :class="{
                                'form__messages--error': errorMessage.status != 200,
                                'form__messages--success': errorMessage.status == 200,
                              }"
                            >
                              <label class="form__block--input">
                                <span class="form__block--title">
                                  {{ errorMessage.text }}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </modal>
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
import { mapGetters, mapActions } from 'vuex';

import { api } from '@/boot/axios';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      applications: null,
      applicationSubmit: null,
      applicationsUser: null,
      regionValue: null,
      applicationsPond: null,
      pondValue: null,
      applicationsDistrict: null,
      districtValue: null,
      applicationsFish: null,

      applicationsKato: null,
      katoValue: null,

      tabElement: 1,

      fishValue: {
        fish: null,
        quota: null,
        value: null,
      },
      listFish: [],

      form: {
        name: '',
        region_id: '',

        chapter1: {
          amount_of_financial_resources_planned: '',
          amount_of_financial_resources_actually: '',
          amount_of_financial_resources_fulfillment: '',

          financial_resources_for_measures_planned: '',
          financial_resources_for_measures_actually: '',
          financial_resources_for_measures_fulfillment: '',

          financial_resources_for_activities_planned: '',
          financial_resources_for_activities_actually: '',
          financial_resources_for_activities_fulfillment: '',

          financial_resources_for_stocking_planned: '',
          financial_resources_for_stocking_actually: '',
          financial_resources_for_stocking_fulfillment: '',

          financial_resources_for_measure_protect_planned: '',
          financial_resources_for_measure_protect_actually: '',
          financial_resources_for_measure_protect_fulfillment: '',

          financial_resources_for_development_planned: '',
          financial_resources_for_development_actually: '',
          financial_resources_for_development_fulfillment: '',
        },
        chapter2: {
          amount_of_financial_resources_planned: '',
          amount_of_financial_resources_actually: '',
          amount_of_financial_resources_fulfillment: '',

          activities_for_the_reproduction_planned: '',
          activities_for_the_reproduction_actually: '',
          activities_for_the_reproduction_fulfillment: '',

          financial_resources_for_stocking_planned: '',
          financial_resources_for_stocking_actually: '',
          financial_resources_for_stocking_fulfillment: '',

          resources_for_measures_protect_fish_planned: '',
          resources_for_measures_protect_fish_actually: '',
          resources_for_measures_protect_fish_fulfillment: '',

          total_planned: '',
          total_actually: '',
          total_fulfillment: '',
        },
        chapter3: {
          carrying_fish_works_tenge_planned: '',
          carrying_fish_works_tenge_actually: '',
          carrying_fish_works_things_planned: '',
          carrying_fish_works_things_actually: '',

          carrying_anti_freeze_measures_planned: '',
          carrying_anti_freeze_measures_actually: '',

          studies_state_ichthyofauna_planned: '',
          studies_state_ichthyofauna_actually: '',

          fish_farming_reclamation_equipment_planned: '',
          fish_farming_reclamation_equipment_actually: '',

          contents_jaeger_service_planned: '',
          contents_jaeger_service_actually: '',

          arrangement_adjacent_coastal_strip_planned: '',
          arrangement_adjacent_coastal_strip_actually: '',

          total_planned: '',
          total_actually: '',
        },
        chapter4: {
          acquisition_cages_growing_planned: '',
          acquisition_cages_growing_actually: '',

          coastal_infrastructure_costs_planned: '',
          coastal_infrastructure_costs_actually: '',

          acquisition_fish_stock_planned: '',
          acquisition_fish_stock_actually: '',

          buying_fish_food_planned: '',
          buying_fish_food_actually: '',

          organization_protection_cages_planned: '',
          organization_protection_cages_actually: '',

          research_costs_planned: '',
          research_costs_actually: '',

          acquisition_equipment_cage_fish_farming_planned: '',
          acquisition_equipment_cage_fish_farming_actually: '',

          maintenance_full_time_employees_planned: '',
          maintenance_full_time_employees_actually: '',

          total_planned: '',
          total_actually: '',
        },
      },

      typeValue: null,
      type: [
        {
          name: 'Рыбохозяйственные водоемы и (или) участки международного значения',
          type: 'mej',
        },
        {
          name: 'Рыбохозяйственные водоемы и (или) участки республиканского значения',
          type: 'res',
        },
        {
          name: 'Рыбохозяйственные водоемы и (или) участки местного значения',
          type: 'mests',
        },
      ],

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
      formData: null,
    };
  },
  computed: {
    ...mapGetters(['_getRegionList']),
    formList() {
      let region = [];
      let district = [];
      let pond = [];
      let kato = [];

      region = this._getRegionList.filter((element) => {
        if (this.applicationsUser) {
          return this.applicationsUser.region.find((e) => {
            if (e.id == element.id) {
              element.value = e.value;
              return true;
            }
          });
        } else {
          return true;
        }
      });

      pond = this.applicationsPond.filter((element) => {
        if (this.applicationsUser) {
          return this.applicationsUser.pond.find((e) => {
            if (e.id == element.id) {
              element.value = e.value;
              return true;
            }
          });
        } else {
          return true;
        }
      });

      district = this.applicationsDistrict.filter((element) => {
        if (this.applicationsUser) {
          /*let dist = this.applicationsUser.region.find(e=>{
            if (e.id == element.values[0].parent_id) {
              element.value = e.value;
              return true;
            }
          });
          return dist;*/
          return this.applicationsUser.pond.find((e) => {
            let dist = element.links.find((d) => {
              if (e.id == d.item_id && element.id == d.catalog_id) {
                return true;
              }
            });
            return dist;
          });
        } else {
          return true;
        }
      });

      kato = this.applicationsKato.filter((element) => {
        if (this.applicationsUser) {
          return this.applicationsUser.region.find((e) => {
            if (e.id == element.values[0].parent_id) {
              element.value = e.value;
              return true;
            }
          });
        } else {
          return true;
        }
      });

      let list = {
        region: region,
        district: district,
        pond: pond,
        kato: kato,
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
    sumForm1() {
      // chapter1
      this.form.chapter1.amount_of_financial_resources_fulfillment =
        (this.form.chapter1.amount_of_financial_resources_actually * 100) /
        this.form.chapter1.amount_of_financial_resources_planned;
      this.form.chapter1.financial_resources_for_measures_fulfillment =
        (this.form.chapter1.financial_resources_for_measures_actually * 100) /
        this.form.chapter1.financial_resources_for_measures_planned;
      this.form.chapter1.financial_resources_for_activities_fulfillment =
        (this.form.chapter1.financial_resources_for_activities_actually * 100) /
        this.form.chapter1.financial_resources_for_activities_planned;
      this.form.chapter1.financial_resources_for_stocking_fulfillment =
        (this.form.chapter1.financial_resources_for_stocking_actually * 100) /
        this.form.chapter1.financial_resources_for_stocking_planned;
      this.form.chapter1.financial_resources_for_measure_protect_fulfillment =
        (this.form.chapter1.financial_resources_for_measure_protect_actually * 100) /
        this.form.chapter1.financial_resources_for_measure_protect_planned;

      this.form.chapter1.financial_resources_for_development_planned =
        Number(this.form.chapter1.amount_of_financial_resources_planned) +
        Number(this.form.chapter1.financial_resources_for_measures_planned) +
        Number(this.form.chapter1.financial_resources_for_activities_planned) +
        Number(this.form.chapter1.financial_resources_for_stocking_planned) +
        Number(this.form.chapter1.financial_resources_for_measure_protect_planned);
      this.form.chapter1.financial_resources_for_development_actually =
        Number(this.form.chapter1.amount_of_financial_resources_actually) +
        Number(this.form.chapter1.financial_resources_for_measures_actually) +
        Number(this.form.chapter1.financial_resources_for_activities_actually) +
        Number(this.form.chapter1.financial_resources_for_stocking_actually) +
        Number(this.form.chapter1.financial_resources_for_measure_protect_actually);
      this.form.chapter1.financial_resources_for_development_fulfillment =
        (Number(this.form.chapter1.financial_resources_for_development_actually) * 100) /
        Number(this.form.chapter1.financial_resources_for_development_planned);
    },
    sumForm2() {
      this.form.chapter2.amount_of_financial_resources_fulfillment =
        (this.form.chapter2.amount_of_financial_resources_actually * 100) /
        this.form.chapter2.amount_of_financial_resources_planned;
      this.form.chapter2.activities_for_the_reproduction_fulfillment =
        (this.form.chapter2.activities_for_the_reproduction_actually * 100) /
        this.form.chapter2.activities_for_the_reproduction_planned;
      this.form.chapter2.financial_resources_for_stocking_fulfillment =
        (this.form.chapter2.financial_resources_for_stocking_actually * 100) /
        this.form.chapter2.financial_resources_for_stocking_planned;
      this.form.chapter2.resources_for_measures_protect_fish_fulfillment =
        (this.form.chapter2.resources_for_measures_protect_fish_actually * 100) /
        this.form.chapter2.resources_for_measures_protect_fish_planned;

      this.form.chapter2.total_planned =
        Number(this.form.chapter2.amount_of_financial_resources_planned) +
        Number(this.form.chapter2.activities_for_the_reproduction_planned) +
        Number(this.form.chapter2.financial_resources_for_stocking_planned) +
        Number(this.form.chapter2.resources_for_measures_protect_fish_planned);

      this.form.chapter2.total_actually =
        Number(this.form.chapter2.amount_of_financial_resources_actually) +
        Number(this.form.chapter2.activities_for_the_reproduction_actually) +
        Number(this.form.chapter2.financial_resources_for_stocking_actually) +
        Number(this.form.chapter2.resources_for_measures_protect_fish_actually);
      this.form.chapter2.total_fulfillment =
        (Number(this.form.chapter2.total_actually) * 100) /
        Number(this.form.chapter2.total_planned);
    },
    sumForm3() {
      this.form.chapter3.total_planned =
        Number(this.form.chapter3.carrying_fish_works_tenge_planned) +
        Number(this.form.chapter3.carrying_fish_works_things_planned) +
        Number(this.form.chapter3.carrying_anti_freeze_measures_planned) +
        Number(this.form.chapter3.studies_state_ichthyofauna_planned) +
        Number(this.form.chapter3.fish_farming_reclamation_equipment_planned) +
        Number(this.form.chapter3.contents_jaeger_service_planned) +
        Number(this.form.chapter3.arrangement_adjacent_coastal_strip_planned);

      this.form.chapter3.total_actually =
        Number(this.form.chapter3.carrying_fish_works_tenge_actually) +
        Number(this.form.chapter3.carrying_fish_works_things_actually) +
        Number(this.form.chapter3.carrying_anti_freeze_measures_actually) +
        Number(this.form.chapter3.studies_state_ichthyofauna_actually) +
        Number(this.form.chapter3.fish_farming_reclamation_equipment_actually) +
        Number(this.form.chapter3.contents_jaeger_service_actually) +
        Number(this.form.chapter3.arrangement_adjacent_coastal_strip_actually);
    },
    sumForm4() {
      this.form.chapter4.total_planned =
        Number(this.form.chapter4.acquisition_cages_growing_planned) +
        Number(this.form.chapter4.coastal_infrastructure_costs_planned) +
        Number(this.form.chapter4.acquisition_fish_stock_planned) +
        Number(this.form.chapter4.buying_fish_food_planned) +
        Number(this.form.chapter4.organization_protection_cages_planned) +
        Number(this.form.chapter4.research_costs_planned) +
        Number(this.form.chapter4.acquisition_equipment_cage_fish_farming_planned) +
        Number(this.form.chapter4.maintenance_full_time_employees_planned);

      this.form.chapter4.total_actually =
        Number(this.form.chapter4.acquisition_cages_growing_actually) +
        Number(this.form.chapter4.coastal_infrastructure_costs_actually) +
        Number(this.form.chapter4.acquisition_fish_stock_actually) +
        Number(this.form.chapter4.buying_fish_food_actually) +
        Number(this.form.chapter4.organization_protection_cages_actually) +
        Number(this.form.chapter4.research_costs_actually) +
        Number(this.form.chapter4.acquisition_equipment_cage_fish_farming_actually) +
        Number(this.form.chapter4.maintenance_full_time_employees_actually);
    },

    saveElement() {
      if (this.$configFile.active) return this.onSubmit();
      this.ecp = false;
      const websocket = new WebSocket('wss://127.0.0.1:13579/');
      var ready = null;
      let ecpData = {
        path: null,
        owner: null,
        data: null,
      };
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
        ecpData.data = data1.responseObject;
        this.dataEcp = data1.responseObject;
        if (data1.responseObject) {
          this.onSubmit();
        }
      };
    },

    onSubmit() {
      let region = null;
      let pond = null;
      let kato = null;
      let messages = {};
      let validation = true;
      const formData = new FormData();
      if (this.regionValue) {
        formData.append('region_id', this.regionValue.id);
        region = this.regionValue.id;
      } else {
        formData.append('region_id', this.formList.region[0].id);
        region = this.formList.region[0].id;
      }
      if (this.form.name == '') {
        validation = false;
        messages.name = [];
        messages.name.push(this.$t('system_message.required_message'));
      }

      if (validation == false) {
        this.$modal.hide('modal_head');
        this.errorMessage.messages = messages;
        return false;
      }
      api
        .post('/report/add', {
          name: this.form.name,
          index: 3,
          region_id: region,
        })
        .then((response) => {
          this.applicationSubmit = response.data;

          formData.append('report_fish_id', response.data.id);

          api
            .post('/report/add/indexone', formData)
            .then((response) => {
              this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/' + 1 });
            })
            .catch((error) => {
              if (error?.response?.status == 500) {
                this.errorMessage.status = 500;
                this.errorMessage.text = this.$t('system_message.500');
              }
              if (error?.response?.status == 401) {
                this.errorMessage.status = 401;
                this.errorMessage.text = error?.response?.data?.message;
                this.$router.push('/' + this.$i18n.locale + '/login');
              }
              if (error?.response?.status == 422) {
                this.errorMessage.status = 422;
                this.errorMessage.text = error?.response?.data?.message;
              }
              this.errorMessage.messages = error.response.data.errors;
              this.$modal.hide('modal_head');
              return false;
            });
        })
        .catch((error) => {
          if (error?.response?.status == 500) {
            this.errorMessage.status = 500;
            this.errorMessage.text = this.$t('system_message.500');
          }
          if (error?.response?.status == 401) {
            this.errorMessage.status = 401;
            this.errorMessage.text = error?.response?.data?.message;
            this.$router.push('/' + this.$i18n.locale + '/login');
          }
          if (error?.response?.status == 422) {
            this.errorMessage.status = 422;
            this.errorMessage.text = error?.response?.data?.message;
          }
          this.$modal.hide('modal_head');
          this.errorMessage.messages = error.response.data.errors;
        });
    },

    apiGetUserRegions() {
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

    apiGetPondList() {
      api
        .get('catalog/' + 3 + '/entry/all')
        .then((response) => {
          if (response.data) {
            response.data.find((element) => {
              element.name = element.values[0].value;
            });
            this.applicationsPond = response.data;
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
    apiGetKatoList() {
      api
        .get('catalog/' + 12 + '/entry/all')
        .then((response) => {
          if (response.data) {
            response.data.find((element) => {
              element.name = element.values[0].value;
            });
            this.applicationsKato = response.data;
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
    apiGetDistrictList() {
      api
        .get('catalog/' + 13 + '/entry/all')
        .then((response) => {
          if (response.data) {
            response.data.find((element) => {
              element.name = element.values[0].value;
            });
            this.applicationsDistrict = response.data;
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

    apiGetPondFish() {
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
          }
        });
    },
  },
  beforeMount() {
    this._fetchRegionList();
    this.apiGetDistrictList();
    this.apiGetPondList();
    this.apiGetKatoList();
    this.apiGetUserRegions();
    this.apiGetPondFish();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
