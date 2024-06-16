<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader':
        !limitList ||
        !_getRegionList ||
        !applicationsPond ||
        !applicationsDistrict ||
        !applicationsKato ||
        !applicationsFish,
    }"
  >
    <v-preloader
      v-if="
        !limitList ||
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
        limitList &&
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
                    <div class="content__title--text">Добавление нового отчета</div>
                    <div class="content__title--subtext">
                      Сведения об освоении квоты вылова рыбы и других водных животных пользователями
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Выберите годовой лимит</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div
                          class="form__line--input"
                          :class="[
                            errorMessage.messages && errorMessage.messages.name
                              ? 'input--error'
                              : '',
                          ]"
                        >
                          <multiselect
                            required=""
                            v-model="filter.limit"
                            :options="formList.limit"
                            :preserve-search="true"
                            :disabled="formList.limit.length == 1"
                            track-by="id"
                            label="created_at"
                            placeholder="Выберите"
                            class="multiselect__check"
                          >
                            <template slot="option" slot-scope="{ option }"
                              >Лимит от {{ option.created_at | formatOnlyDate }}</template
                            >
                            <template slot="singleLabel" slot-scope="{ option }"
                              >Лимит от {{ option.created_at | formatOnlyDate }}</template
                            >
                            <template slot="noResult">{{ $t('components.not_found') }}</template>
                          </multiselect>
                          <input
                            type="hidden"
                            v-if="filter.limit"
                            v-model="(appForm.limit_id = filter.limit.id)"
                          />
                          <input type="hidden" v-else v-model="(appForm.limit_id = null)" />
                        </div>
                        <div
                          class="input-required"
                          v-if="errorMessage.messages && errorMessage.messages.name"
                        >
                          <p v-for="massage in errorMessage.messages.name">{{ massage }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form method="POST">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование пользователя животного мира</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.t_animal
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              disabled
                              :value="
                                $store.state.userObject.name_company
                                  ? $store.state.userObject.name_company +
                                    '(' +
                                    $store.state.userObject.iin_bin +
                                    ')'
                                  : $store.state.userObject.iin_bin
                              "
                              placeholder="Наименование"
                            />

                            <input
                              type="hidden"
                              v-if="$store.state.userObject"
                              v-model="(appForm.user_id = $store.state.userObject.id)"
                            />
                            <input type="hidden" v-else v-model="(appForm.user_id = null)" />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.t_animal"
                          >
                            <p v-for="massage in errorMessage.messages.t_animal">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="applicationsUser">
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
                                errorMessage.messages && errorMessage.messages.name
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <multiselect
                                required=""
                                v-model="filter.region"
                                :options="formList.region"
                                :preserve-search="true"
                                track-by="id"
                                label="name"
                                :disabled="formList.region.length == 1"
                                placeholder="Выберите регион"
                                class="multiselect__check"
                              >
                                <template slot="singleLabel" slot-scope="{ option }">{{
                                  option.values[0].value
                                }}</template>
                                <template slot="noResult">{{
                                  $t('components.not_found')
                                }}</template>
                              </multiselect>

                              <input
                                type="hidden"
                                v-if="filter.region"
                                v-model="(appForm.region_id = filter.region.id)"
                              />
                              <input type="hidden" v-else v-model="(appForm.region_id = null)" />
                            </div>

                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.name"
                            >
                              <p v-for="massage in errorMessage.messages.name">{{ massage }}</p>
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
                                errorMessage.messages && errorMessage.messages.name
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <multiselect
                                required=""
                                v-model="filter.pond"
                                :options="formList.pond"
                                :preserve-search="true"
                                track-by="id"
                                label="name"
                                :disabled="formList.pond.length == 1"
                                placeholder="Выберите регион"
                                class="multiselect__check"
                              >
                                <template slot="singleLabel" slot-scope="{ option }">{{
                                  option.values[0].value
                                }}</template>
                                <template slot="noResult">{{
                                  $t('components.not_found')
                                }}</template>
                              </multiselect>

                              <input
                                type="hidden"
                                v-if="filter.pond"
                                v-model="(appForm.pond_id = filter.pond.id)"
                              />
                              <input type="hidden" v-else v-model="(appForm.pond_id = null)" />
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
                                :disabled="formList.district.length == 1"
                              >
                                <template slot="singleLabel" slot-scope="{ option }">{{
                                  option.values[0].value
                                }}</template>
                                <template slot="noResult">{{
                                  $t('components.not_found')
                                }}</template>
                              </multiselect>

                              <input
                                type="hidden"
                                v-if="districtValue"
                                v-model="(appForm.district_id = districtValue.id)"
                              />
                              <input type="hidden" v-else v-model="(appForm.district_id = null)" />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.t_district"
                            >
                              <p v-for="massage in errorMessage.messages.t_district">
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
                                :disabled="formList.district.length == 1"
                              >
                                <template slot="singleLabel" slot-scope="{ option }">{{
                                  option.values[0].value
                                }}</template>
                                <template slot="noResult">{{
                                  $t('components.not_found')
                                }}</template>
                              </multiselect>

                              <input
                                type="hidden"
                                v-if="katoValue"
                                v-model="(appForm.kato_id = katoValue.id)"
                              />
                              <input type="hidden" v-else v-model="(appForm.kato_id = null)" />
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
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Сдать за</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.reporting_period_id
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <multiselect
                                required=""
                                v-model="reporting_periodValue"
                                :options="formList.reporting_period"
                                :preserve-search="true"
                                track-by="id"
                                label="name"
                                placeholder="Выберите"
                                class="multiselect__check"
                              >
                                <template slot="singleLabel" slot-scope="{ option }">{{
                                  option.name
                                }}</template>
                                <template slot="noResult">{{
                                  $t('components.not_found')
                                }}</template>
                              </multiselect>

                              <input
                                type="hidden"
                                v-if="reporting_periodValue"
                                v-model="(appForm.reporting_period_id = reporting_periodValue.id)"
                              />
                              <input
                                type="hidden"
                                v-else
                                v-model="(appForm.reporting_period_id = null)"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="
                                errorMessage.messages && errorMessage.messages.reporting_period_id
                              "
                            >
                              <p v-for="massage in errorMessage.messages.reporting_period_id">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="applications">
                    <hr class="form__line" />

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Промысловый лов (тонн)</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="form__line--title">Квота на вылов</div>
                            <div class="form__line--input">
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                disabled
                                :value="applications.summ.quota"
                                placeholder="Квота на вылов"
                              />
                            </div>
                          </div>
                          <div class="col-xl-5">
                            <div class="form__line--title">Фактически выловлено</div>
                            <div class="form__line--input">
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                disabled
                                :value="applications.summ.trade"
                                placeholder="Фактически выловлено"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">В том числе по видам рыб</div>
                      </div>
                      <div class="form__line--right">
                        <div class="quota-fish__line" v-for="(item, key) in appForm.fish">
                          <div class="quota-fish__wrapper">
                            <div class="row align-items-center">
                              <div class="col-xl-4">
                                <div class="form__line--title">Рыба</div>
                                <div class="form__line--input">
                                  <input
                                    type="text"
                                    class="input-linck"
                                    required=""
                                    disabled
                                    :value="item.fish"
                                    placeholder="Квота на вылов"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-3">
                                <div class="form__line--title">Квота на вылов</div>
                                <div class="form__line--input">
                                  <input
                                    type="text"
                                    class="input-linck"
                                    required=""
                                    name="fish[quota][]"
                                    disabled
                                    v-model="item.quota"
                                    placeholder="Квота на вылов"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-3">
                                <div class="form__line--title">Фактически выловлено</div>
                                <div class="form__line--input">
                                  <input
                                    type="text"
                                    class="input-linck"
                                    required=""
                                    name="fish[trade][]"
                                    disabled
                                    :value="item.trade"
                                    placeholder="Фактически выловлено"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="input-required"></div>
                        </div>
                      </div>
                    </div>

                    <hr class="form__line" />

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Любительский (спортивный) - лов (тонн)</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="form__line--title">Квота на вылов</div>
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.amateur_plan
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                v-model="appForm.amateur_plan"
                                placeholder="Квота на вылов"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.amateur_plan"
                            >
                              <p v-for="massage in errorMessage.messages.amateur_plan">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                          <div class="col-xl-5">
                            <div class="form__line--title">Фактически выловлено</div>
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.amateur_actually
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                v-model="appForm.amateur_actually"
                                placeholder="Фактически выловлено"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.amateur_actually"
                            >
                              <p v-for="massage in errorMessage.messages.amateur_actually">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Мелиоративный лов (тонн)</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="form__line--title">Квота на вылов</div>
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.meliorative_plan
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                v-model="appForm.meliorative_plan"
                                value=""
                                placeholder="Разрешения"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.meliorative_plan"
                            >
                              <p v-for="massage in errorMessage.messages.meliorative_plan">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                          <div class="col-xl-5">
                            <div class="form__line--title">Фактически выловлено</div>
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.meliorative_actually
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                v-model="appForm.meliorative_actually"
                                placeholder="Фактически выловлено"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="
                                errorMessage.messages && errorMessage.messages.meliorative_actually
                              "
                            >
                              <p v-for="massage in errorMessage.messages.meliorative_actually">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr class="form__line" />
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Платежи за пользование животным миром</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="form__line--title">План (тысяч тенге)</div>
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.payments_plan
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                v-model="appForm.payments_plan"
                                placeholder="Разрешения"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.payments_plan"
                            >
                              <p v-for="massage in errorMessage.messages.payments_plan">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                          <div class="col-xl-5">
                            <div class="form__line--title">Фактически оплачено (тысяч тенге)</div>
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.payments_actually
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                v-model="appForm.payments_actually"
                                placeholder="Фактически выловлено"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="
                                errorMessage.messages && errorMessage.messages.payments_actually
                              "
                            >
                              <p v-for="massage in errorMessage.messages.payments_actually">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form__line">
                      <div class="form__line--right">
                        <div class="input__row">
                          <div class="block__row--left">
                            <a class="input-btn form__line--btn" @click="$modal.show('modal_head')">
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

import { convertObjectToFormData } from '@/formData';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      appForm: {
        fish: [],
      },
      filter: {
        limit: null,
        region: null,
        pond: null,
      },

      reporting_periodValue: null,
      reporting_period: [
        {
          id: 1,
          name: 'Первый квартал(январь-март)',
        },
        {
          id: 2,
          name: 'Второй квартал(апрель-июнь)',
        },
        {
          id: 3,
          name: 'Третий квартал(июль-сентябрь)',
        },
        {
          id: 4,
          name: 'Четвертый квартал(октябрь-декабрь)',
        },
      ],

      applications: null,

      applicationsUser: null,
      applicationsPond: null,
      pondValue: null,
      applicationsDistrict: null,
      districtValue: null,
      applicationsFish: null,

      applicationsQuota: null,

      applicationsKato: null,
      katoValue: null,

      limitList: [],

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
  watch: {
    filter: {
      handler() {
        if (this.filter.limit) {
          this.apiGetUserRegions(this.filter.limit);
        } else {
          this.applicationsUser = null;
        }
        if (this.filter.limit && this.filter.region && this.filter.pond) {
          this.getApplications(this.filter.limit, this.filter.region, this.filter.pond);
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['_getRegionList']),
    formList() {
      let limit = [];
      let region = [];
      let district = [];
      let pond = [];
      let kato = [];

      limit = this.limitList;
      if (limit.length == 1) {
        this.filter.limit = limit[0];
      }

      region = this._getRegionList.filter((element) => {
        if (this.applicationsUser && this.applicationsUser.region) {
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
      if (region.length == 1) {
        this.filter.region = region[0];
      }

      pond = this.applicationsPond.filter((element) => {
        if (this.applicationsUser && this.applicationsUser.pond) {
          return this.applicationsUser.pond.find((e) => {
            if (e.id == element.id && !this.filter.region) {
              element.value = e.value;
              return true;
            } else if (this.filter.region && this.filter.region.links) {
              return this.filter.region.links.find((pon) => {
                if (pon.item_id == element.id && pon.item_id == e.id) {
                  element.value = e.value;
                  return true;
                }
              });
            }
          });
        } else {
          return true;
        }
      });

      if (pond.length == 1) {
        this.filter.pond = pond[0];
      }

      district = this.applicationsDistrict.filter((element) => {
        if (this.applicationsUser && this.applicationsUser.pond) {
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
      if (district.length == 1) {
        this.districtValue = district[0];
      }

      kato = this.applicationsKato.filter((element) => {
        if (this.applicationsUser && this.applicationsUser.region) {
          return this.applicationsUser.region.find((e) => {
            if (e.id == element.values[0].parent_id && !this.filter.region) {
              element.value = e.value;
              return true;
            } else if (this.filter.region && this.filter.region.id == element.values[0].parent_id) {
              element.value = e.value;
              return true;
            }
          });
        } else {
          return true;
        }
      });
      if (kato.length == 1) {
        this.katoValue = kato[0];
      }

      let list = {
        limit: limit,
        region: region,
        district: district,
        pond: pond,
        kato: kato,
        fish: this.applicationsFish,
        reporting_period: this.reporting_period,
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
    getApplications(limit, region, pond) {
      this.applications = null;
      api
        .get('trade/user/from-to', {
          params: {
            limit_id: limit ? limit.id : null,
            region_id: region ? region.id : null,
            pond_id: pond ? pond.id : null,
          },
        })
        .then((response) => {
          if (response.data) {
            this.applications = response.data.data;
            this.appForm.fish = this.applications.fish;
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
      alert(1);
      return false;
    },
    apiGetUserRegions(limit) {
      api
        .get('/user/region', {
          params: {
            limit_id: limit ? limit.id : null,
          },
        })
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
    apiGetLimitList() {
      api
        .get('limit/list', {
          params: {
            status: 'active',
          },
        })
        .then((response) => {
          if (response.data) {
            this.limitList = response.data.data;
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
    this.apiGetLimitList();
    this._fetchRegionList();
    this.apiGetDistrictList();
    this.apiGetPondList();
    this.apiGetKatoList();
    this.apiGetPondFish();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
