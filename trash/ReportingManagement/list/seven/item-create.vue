<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !_getRegionList }">
    <v-preloader v-if="!_getRegionList" :message="errorMessage"></v-preloader>

    <div class="container" v-if="_getRegionList">
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
                      Сведения о материально-техническом оснащении пользователей
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST">
                  <!--@submit.prevent="onSubmit"-->

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
                              errorMessage.messages && errorMessage.messages.region
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
                              errorMessage.messages && errorMessage.messages.region
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
                            v-if="errorMessage.messages && errorMessage.messages.region"
                          >
                            <p v-for="massage in errorMessage.messages.region">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

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

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Количество рыболовных бригад</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.total_fish_brigad
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="total_fish_brigad"
                              v-model="form.total_fish_brigad"
                              placeholder="Количество"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.total_fish_brigad"
                          >
                            <p v-for="massage in errorMessage.messages.total_fish_brigad">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Общее количество рыбаков</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.total_rybakov
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="total_rybakov"
                              v-model="form.total_rybakov"
                              placeholder="Количество"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.total_rybakov"
                          >
                            <p v-for="massage in errorMessage.messages.total_rybakov">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Самоходный флот (единица)</div>
                    </div>
                    <div class="form__line--right">
                      <div class="quota-fish__line">
                        <div class="quota-fish__wrapper">
                          <div class="row align-items-center">
                            <div class="col-xl-5">
                              <div class="form__line--title">Марка</div>
                              <div
                                class="form__line--input"
                                :class="[
                                  errorMessage.messages && errorMessage.messages.flot_samohod_marka
                                    ? 'input--error'
                                    : '',
                                ]"
                              >
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  v-model="form.flot_samohod_marka"
                                  value=""
                                  placeholder="Марка"
                                />
                              </div>
                              <div
                                class="input-required"
                                v-if="
                                  errorMessage.messages && errorMessage.messages.flot_samohod_marka
                                "
                              >
                                <p v-for="massage in errorMessage.messages.flot_samohod_marka">
                                  {{ massage }}
                                </p>
                              </div>
                            </div>
                            <div class="col-xl-5">
                              <div class="form__line--title">Год выпуска</div>
                              <div
                                class="form__line--input"
                                :class="[
                                  errorMessage.messages &&
                                  errorMessage.messages.flot_samohod_startyear
                                    ? 'input--error'
                                    : '',
                                ]"
                              >
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  v-model="form.flot_samohod_startyear"
                                  value=""
                                  placeholder="Год выпуска"
                                />
                              </div>
                              <div
                                class="input-required"
                                v-if="
                                  errorMessage.messages &&
                                  errorMessage.messages.flot_samohod_startyear
                                "
                              >
                                <p v-for="massage in errorMessage.messages.flot_samohod_startyear">
                                  {{ massage }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Не самоходный флот (единица)</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.neflot
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="neflot"
                              v-model="form.neflot"
                              placeholder="Количество"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.neflot"
                          >
                            <p v-for="massage in errorMessage.messages.neflot">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Транспортные средства (единица)</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-4">
                          <div class="form__line--title">Снегоход</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.transport_snowmobile
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.transport_snowmobile"
                              value=""
                              placeholder="Снегоход"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages && errorMessage.messages.transport_snowmobile
                            "
                          >
                            <p v-for="massage in errorMessage.messages.transport_snowmobile">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-4">
                          <div class="form__line--title">Автотранспорт</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.transport_automobile
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.transport_automobile"
                              value=""
                              placeholder="Автотранспорт"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages && errorMessage.messages.transport_automobile
                            "
                          >
                            <p v-for="massage in errorMessage.messages.transport_automobile">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-4">
                          <div class="form__line--title">Мотоцикл</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.transport_motorbik
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.transport_motorbik"
                              value=""
                              placeholder="Мотоцикл"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.transport_motorbik"
                          >
                            <p v-for="massage in errorMessage.messages.transport_motorbik">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Орудий лова</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-4">
                          <div class="form__line--title">Невода</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.fishing_gear_nevoda
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.fishing_gear_nevoda"
                              value=""
                              placeholder="Невода"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages && errorMessage.messages.fishing_gear_nevoda
                            "
                          >
                            <p v-for="massage in errorMessage.messages.fishing_gear_nevoda">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-4">
                          <div class="form__line--title">Волокуши</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.fishing_gear_shovel
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.fishing_gear_shovel"
                              value=""
                              placeholder="Волокуши"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages && errorMessage.messages.fishing_gear_shovel
                            "
                          >
                            <p v-for="massage in errorMessage.messages.fishing_gear_shovel">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-4">
                          <div class="form__line--title">Ставные сети</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.fishing_gear_fixed_nets
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.fishing_gear_fixed_nets"
                              value=""
                              placeholder="Ставные сети"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages && errorMessage.messages.fishing_gear_fixed_nets
                            "
                          >
                            <p v-for="massage in errorMessage.messages.fishing_gear_fixed_nets">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-6">
                          <br />
                          <div class="form__line--title">Вентеря</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.fishing_gear_ventery
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.fishing_gear_ventery"
                              value=""
                              placeholder="Вентеря"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages && errorMessage.messages.fishing_gear_ventery
                            "
                          >
                            <p v-for="massage in errorMessage.messages.fishing_gear_ventery">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-6">
                          <br />
                          <div class="form__line--title">
                            Крючковые снасти и другие виды орудии лова
                          </div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages &&
                              errorMessage.messages.fishing_gear_fishing_gear
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.fishing_gear_fishing_gear"
                              value=""
                              placeholder="Крючковые снасти"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages &&
                              errorMessage.messages.fishing_gear_fishing_gear
                            "
                          >
                            <p v-for="massage in errorMessage.messages.fishing_gear_fishing_gear">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Материально-техническая база</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-4">
                          <div class="form__line--title">Цеха филейные (тонн/сутки)</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_fillet_shops
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.material_t_base_fillet_shops"
                              value=""
                              placeholder="Цеха филейные"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_fillet_shops
                            "
                          >
                            <p
                              v-for="massage in errorMessage.messages.material_t_base_fillet_shops"
                            >
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-4">
                          <div class="form__line--title">Цеха рыбной муки (тонн/сутки)</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_fishmeal_workshops
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.material_t_base_fishmeal_workshops"
                              value=""
                              placeholder="Цеха рыбной муки"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_fishmeal_workshops
                            "
                          >
                            <p
                              v-for="massage in errorMessage.messages
                                .material_t_base_fishmeal_workshops"
                            >
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-4">
                          <div class="form__line--title">Цеха коптильные (тонн/сутки)</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_smoke_shops
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.material_t_base_smoke_shops"
                              value=""
                              placeholder="Цеха коптильные"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_smoke_shops
                            "
                          >
                            <p v-for="massage in errorMessage.messages.material_t_base_smoke_shops">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-4">
                          <br />
                          <div class="form__line--title">Ледогенераторы (тенге/сутки)</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_ice_generators
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.material_t_base_ice_generators"
                              value=""
                              placeholder="Ледогенераторы"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_ice_generators
                            "
                          >
                            <p
                              v-for="massage in errorMessage.messages
                                .material_t_base_ice_generators"
                            >
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-4">
                          <br />
                          <div class="form__line--title">Ледники (квадратный метр)</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_glaciers
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.material_t_base_glaciers"
                              value=""
                              placeholder="Ледники"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_glaciers
                            "
                          >
                            <p v-for="massage in errorMessage.messages.material_t_base_glaciers">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-4">
                          <br />
                          <div class="form__line--title">Термоконтейнеры (кубометр)</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_thermal_containers
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.material_t_base_thermal_containers"
                              value=""
                              placeholder="Термоконтейнеры"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_thermal_containers
                            "
                          >
                            <p
                              v-for="massage in errorMessage.messages
                                .material_t_base_thermal_containers"
                            >
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                        <div class="col-xl-4">
                          <br />
                          <div class="form__line--title">Холодильники (тенге/сутки)</div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_refrigerators
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="form.material_t_base_refrigerators"
                              value=""
                              placeholder="Холодильники"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="
                              errorMessage.messages &&
                              errorMessage.messages.material_t_base_refrigerators
                            "
                          >
                            <p
                              v-for="massage in errorMessage.messages.material_t_base_refrigerators"
                            >
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

                  <!--
                    <div class="form__line">
                      <div class="modal__table--table">

                        <table class="table__limit table__reporting">
                          <thead>

                            <tr>

                              <td rowspan="2"> </td>
                              <td rowspan="2"> № </td>
                              <td rowspan="2"> Наименование пользователя животным миром </td>
                              <td rowspan="2"> Количество рыболовных бригад </td>
                              <td rowspan="2"> Общее количество рыбаков </td>
                              <td rowspan="1" colspan="2"> Самоходный флот (единица) </td>
                              <td rowspan="2"> Не самоходный флот (единица) </td>
                              <td rowspan="1" colspan="3"> Транспортные средства (единица) </td>
                              <td rowspan="1" colspan="5"> Орудий лова </td>
                              <td rowspan="1" colspan="7"> Материально-техническая база </td>

                            </tr>
                            <tr>

                              <td rowspan="1"> Марка </td>
                              <td rowspan="1"> Год выпуска </td>

                              <td rowspan="1"> Снегоход </td>
                              <td rowspan="1"> Автотранспорт </td>
                              <td rowspan="1"> Мотоцикл </td>

                              <td rowspan="1"> Невода </td>
                              <td rowspan="1"> Волокуши </td>
                              <td rowspan="1"> Ставные сети </td>
                              <td rowspan="1"> Вентеря </td>
                              <td rowspan="1"> Крючковые снасти и другие виды орудии лова </td>

                              <td rowspan="1"> Цеха филейные (тонн/сутки) </td>
                              <td rowspan="1"> Цеха рыбной муки (тонн/сутки) </td>
                              <td rowspan="1"> Цеха коптильные (тонн/сутки) </td>
                              <td rowspan="1"> Ледогенераторы (тенге/сутки) </td>
                              <td rowspan="1"> Ледники (квадратный метр) </td>
                              <td rowspan="1"> Термоконтейнеры (кубометр) </td>
                              <td rowspan="1"> Холодильники (тенге/сутки) </td>

                            </tr>

                          </thead>

                          <thead>
                            <tr class="table__limit--number">
                              <td> </td>
                              <td> 1 </td>
                              <td> 2 </td>
                              <td> 3 </td>
                              <td> 4 </td>
                              <td> 5 </td>
                              <td> 6 </td>
                              <td> 7 </td>
                              <td> 8 </td>
                              <td> 9 </td>
                              <td> 10 </td>
                              <td> 11 </td>
                              <td> 12 </td>
                              <td> 13 </td>
                              <td> 14 </td>
                              <td> 15 </td>
                              <td> 16 </td>
                              <td> 17 </td>
                              <td> 18 </td>
                              <td> 19 </td>
                              <td> 20 </td>
                              <td> 21 </td>
                              <td> 22 </td>
                            </tr>
                          </thead>

                          <tbody>

                            <tr v-for="(item, index) in mejList">

                              <td class="td__input--controller" style="max-width: 50px">
                                <center>
                                  <a class="tb__table--btn tb__table--delete" @click="deleteMejList(index)" v-tooltip.top-center="{content:$t('button.delete'), class: ['tooltip__btn']}">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#F19797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M11.25 6.75L6.75 11.25" stroke="#F19797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M6.75 6.75L11.25 11.25" stroke="#F19797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                  </a>
                                </center>
                              </td>
                              <td><center>{{ index + 1 }}</center></td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.t_animal" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.total_fish_brigad" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.total_rybakov" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.flot_samohod.marka" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.flot_samohod.start_year" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.neflot" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.transport.snowmobile" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.transport.auto_transport" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.transport.motorcycle" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.fishing_gear.nevoda" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.fishing_gear.shovel" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.fishing_gear.nets" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.fishing_gear.ventery" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.fishing_gear.hook" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.material_t_base.sirloin" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.material_t_base.fish_muki" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.material_t_base.koptilnie" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.material_t_base.l_generator" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.material_t_base.ledniki_kv_metr" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.material_t_base.termocontainer" class="input-linck">
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input type="text" v-model="item.material_t_base.fridge" class="input-linck">
                                </div>
                              </td>

                            </tr>

                            <tr class="tr__input--add">

                              <td colspan="23" class="td__input--add">
                                <div class="table__add">

                                  <div class="table__add--icon" @click="addTableMej()">
                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12.8212 22.541C18.344 22.541 22.8212 18.0639 22.8212 12.541C22.8212 7.01817 18.344 2.54102 12.8212 2.54102C7.29832 2.54102 2.82117 7.01817 2.82117 12.541C2.82117 18.0639 7.29832 22.541 12.8212 22.541Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M12.8212 8.54102V16.541" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M8.82117 12.541H16.8212" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                  </div>
                                  <div class="table__add--line"></div>

                                </div>
                              </td>
                            </tr>

                          </tbody>

                        </table>

                      </div>
                    </div>

                    <div class="form__line">
                      <div class="form__line--right">

                        <div class="input__row">
                          <button class="input-btn form__line--btn" >
                            {{ $t('button.save') }}
                          </button>
                        </div>

                        <div class="row">
                          <div class="col-xl-12">
                            <div class="form__block--line form__messages " v-if="message.text" :class="{'form__messages--error': message.status != 200, 'form__messages--success': message.status == 200}">
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
                  -->
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

      name: '',

      mejList: [],

      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      applicationsUser: null,
      regionValue: null,

      form: {
        name: '',
        region_id: '',
        title_animal: '',
        total_fish_brigad: '',
        total_rybakov: '',
        flot_samohod_marka: '',
        flot_samohod_startyear: '',
        neflot: '',
        transport_snowmobile: '',
        transport_automobile: '',
        transport_motorbik: '',
        fishing_gear_nevoda: '',
        fishing_gear_shovel: '',
        fishing_gear_fixed_nets: '',
        fishing_gear_ventery: '',
        fishing_gear_fishing_gear: '',
        material_t_base_fillet_shops: '',
        material_t_base_fishmeal_workshops: '',
        material_t_base_smoke_shops: '',
        material_t_base_ice_generators: '',
        material_t_base_glaciers: '',
        material_t_base_thermal_containers: '',
        material_t_base_refrigerators: '',
      },
    };
  },
  computed: {
    ...mapGetters(['_getRegionList']),
    formList() {
      let region = [];

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

      let list = {
        region: region,
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
    /*
    addTableMej() {
      this.mejList.push(
          {
            t_animal: '',
            total_fish_brigad: '',
            total_rybakov: '',
            flot_samohod: {
              marka: '',
              start_year: ''
            },
            neflot: '',
            transport: {
              snowmobile: '',
              auto_transport: '',
              motorcycle: '',
            },
            fishing_gear: {
              nevoda: '',
              shovel: '',
              nets: '',
              ventery: '',
              hook: '',
            },
            material_t_base: {
              sirloin: '',
              fish_muki: '',
              koptilnie: '',
              l_generator: '',
              ledniki_kv_metr: '',
              termocontainer: '',
              fridge: '',
            }
          }
      );
    },
    deleteMejList(index) {
      this.mejList.splice(index, 1);
    },
    */
    /*
    onSubmit(evt) {
      this.errorMessage = {
        status: null,
        messages: null,
        text: null
      };
      this.message = {
        status: null,
        text: null
      };
      // const formData = new FormData(evt.target);
      if (!this.mejList.length) {
        this.message = {
          status: '500',
          text: 'Таблица не заполнена'
        };
        return false;
      }

      api.post('/report/add', {
        name: this.name
      }).then(response => {
        this.applicationSubmit = response.data;
        this.onSubmitList();
      }).catch((error) => {
        if (error?.response?.status == 500) {
          this.errorMessage.status = 500;
          this.errorMessage.text = this.$t('system_message.500');
        }
        if (error?.response?.status == 401) {
          this.errorMessage.status = 401;
          this.errorMessage.text = error.response.data.error_message;
          this.$router.push('/'+this.$i18n.locale+'/login');
        }
        if (error?.response?.status == 422) {
          this.errorMessage.status = 422;
          this.errorMessage.text = error.response.data.error_message;
        }
        this.errorMessage.messages = error.response.data.error_messages;
      });

    },

    onSubmitList() {
      this.mejList.find(element=>{
        this.onSubmitTable(element);
      });
      this.$router.push({path: '/'+ this.$i18n.locale +'/account/reporting/'+ 7 });
    },

    onSubmitTable(element) {

      api.post('/report/add/indexseven', {

        report_fish_id: this.applicationSubmit.id,
        t_animal: element.t_animal,
        total_fish_brigad: element.total_fish_brigad,
        total_rybakov: element.total_rybakov,
        flot_samohod: {
          marka: element.flot_samohod.marka,
          start_year: element.flot_samohod.start_year,
        },
        neflot: element.neflot,
        transport: {
          snowmobile: element.transport.snowmobile,
          auto_transport: element.transport.auto_transport,
          motorcycle: element.transport.motorcycle,
        },
        fishing_gear: {
          nevoda: element.fishing_gear.nevoda,
          shovel: element.fishing_gear.shovel,
          nets: element.fishing_gear.nets,
          ventery: element.fishing_gear.ventery,
          hook: element.fishing_gear.hook,
        },
        material_t_base: {
          sirloin: element.material_t_base.sirloin,
          fish_muki: element.material_t_base.fish_muki,
          koptilnie: element.material_t_base.koptilnie,
          l_generator: element.material_t_base.l_generator,
          ledniki_kv_metr: element.material_t_base.ledniki_kv_metr,
          termocontainer: element.material_t_base.termocontainer,
          fridge: element.material_t_base.fridge,
        }

      }).then(response => {
        return true;
      }).catch((error) => {
        if (error?.response?.status == 500) {
          this.errorMessage.status = 500;
          this.errorMessage.text = this.$t('system_message.500');
        }
        if (error?.response?.status == 401) {
          this.errorMessage.status = 401;
          this.errorMessage.text = error.response.data.error_message;
          this.$router.push('/'+this.$i18n.locale+'/login');
        }
        if (error?.response?.status == 422) {
          this.errorMessage.status = 422;
          this.errorMessage.text = error.response.data.error_message;
        }
        this.errorMessage.messages = error.response.data.error_messages;
        return false;
      });

    }
    */

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
      /*
      if(this.form.name == '') {
        validation = false;
        messages.name = [];
        messages.name.push(this.$t('system_message.required_message'));
      }
      formData.append('name', this.form.name);
      */
      /// Удалить --------------------------

      this.form.name = 'Test';
      formData.append('type', 'mej');

      /// Удалить --------------------------

      /*
      if(this.form.title_animal == '') {
        validation = false;
        messages.title_animal = [];
        messages.title_animal.push(this.$t('system_message.required_message'));
      }
      formData.append('title_animal', this.form.title_animal);
      */
      if (this.form.total_fish_brigad == '') {
        validation = false;
        messages.total_fish_brigad = [];
        messages.total_fish_brigad.push(this.$t('system_message.required_message'));
      }
      formData.append('total_fish_brigad', this.form.total_fish_brigad);
      if (this.form.total_rybakov == '') {
        validation = false;
        messages.total_rybakov = [];
        messages.total_rybakov.push(this.$t('system_message.required_message'));
      }
      formData.append('total_rybakov', this.form.total_rybakov);

      if (this.form.flot_samohod_marka == '') {
        validation = false;
        messages.flot_samohod_marka = [];
        messages.flot_samohod_marka.push(this.$t('system_message.required_message'));
      }
      formData.append('flot_samohod_marka', this.form.flot_samohod_marka);
      if (this.form.flot_samohod_startyear == '') {
        validation = false;
        messages.flot_samohod_startyear = [];
        messages.flot_samohod_startyear.push(this.$t('system_message.required_message'));
      }
      formData.append('flot_samohod_startyear', this.form.flot_samohod_startyear);

      if (this.form.neflot == '') {
        validation = false;
        messages.neflot = [];
        messages.neflot.push(this.$t('system_message.required_message'));
      }
      formData.append('neflot', this.form.neflot);
      if (this.form.transport_snowmobile == '') {
        validation = false;
        messages.transport_snowmobile = [];
        messages.transport_snowmobile.push(this.$t('system_message.required_message'));
      }
      formData.append('transport_snowmobile', this.form.transport_snowmobile);
      if (this.form.transport_automobile == '') {
        validation = false;
        messages.transport_automobile = [];
        messages.transport_automobile.push(this.$t('system_message.required_message'));
      }
      formData.append('transport_automobile', this.form.transport_automobile);
      if (this.form.transport_motorbik == '') {
        validation = false;
        messages.transport_motorbik = [];
        messages.transport_motorbik.push(this.$t('system_message.required_message'));
      }
      formData.append('transport_motorbik', this.form.transport_motorbik);
      if (this.form.fishing_gear_nevoda == '') {
        validation = false;
        messages.fishing_gear_nevoda = [];
        messages.fishing_gear_nevoda.push(this.$t('system_message.required_message'));
      }
      formData.append('fishing_gear_nevoda', this.form.fishing_gear_nevoda);
      if (this.form.fishing_gear_shovel == '') {
        validation = false;
        messages.fishing_gear_shovel = [];
        messages.fishing_gear_shovel.push(this.$t('system_message.required_message'));
      }
      formData.append('fishing_gear_shovel', this.form.fishing_gear_shovel);
      if (this.form.fishing_gear_fixed_nets == '') {
        validation = false;
        messages.fishing_gear_fixed_nets = [];
        messages.fishing_gear_fixed_nets.push(this.$t('system_message.required_message'));
      }
      formData.append('fishing_gear_fixed_nets', this.form.fishing_gear_fixed_nets);
      if (this.form.fishing_gear_ventery == '') {
        validation = false;
        messages.fishing_gear_ventery = [];
        messages.fishing_gear_ventery.push(this.$t('system_message.required_message'));
      }
      formData.append('fishing_gear_ventery', this.form.fishing_gear_ventery);
      if (this.form.fishing_gear_fishing_gear == '') {
        validation = false;
        messages.fishing_gear_fishing_gear = [];
        messages.fishing_gear_fishing_gear.push(this.$t('system_message.required_message'));
      }
      formData.append('fishing_gear_fishing_gear', this.form.fishing_gear_fishing_gear);
      if (this.form.material_t_base_fillet_shops == '') {
        validation = false;
        messages.material_t_base_fillet_shops = [];
        messages.material_t_base_fillet_shops.push(this.$t('system_message.required_message'));
      }
      formData.append('material_t_base_fillet_shops', this.form.material_t_base_fillet_shops);
      if (this.form.material_t_base_fishmeal_workshops == '') {
        validation = false;
        messages.material_t_base_fishmeal_workshops = [];
        messages.material_t_base_fishmeal_workshops.push(
          this.$t('system_message.required_message'),
        );
      }
      formData.append(
        'material_t_base_fishmeal_workshops',
        this.form.material_t_base_fishmeal_workshops,
      );
      if (this.form.material_t_base_smoke_shops == '') {
        validation = false;
        messages.material_t_base_smoke_shops = [];
        messages.material_t_base_smoke_shops.push(this.$t('system_message.required_message'));
      }
      formData.append('material_t_base_smoke_shops', this.form.material_t_base_smoke_shops);
      if (this.form.material_t_base_ice_generators == '') {
        validation = false;
        messages.material_t_base_ice_generators = [];
        messages.material_t_base_ice_generators.push(this.$t('system_message.required_message'));
      }
      formData.append('material_t_base_ice_generators', this.form.material_t_base_ice_generators);
      if (this.form.material_t_base_glaciers == '') {
        validation = false;
        messages.material_t_base_glaciers = [];
        messages.material_t_base_glaciers.push(this.$t('system_message.required_message'));
      }
      formData.append('material_t_base_glaciers', this.form.material_t_base_glaciers);
      if (this.form.material_t_base_thermal_containers == '') {
        validation = false;
        messages.material_t_base_thermal_containers = [];
        messages.material_t_base_thermal_containers.push(
          this.$t('system_message.required_message'),
        );
      }
      formData.append(
        'material_t_base_thermal_containers',
        this.form.material_t_base_thermal_containers,
      );
      if (this.form.material_t_base_refrigerators == '') {
        validation = false;
        messages.material_t_base_refrigerators = [];
        messages.material_t_base_refrigerators.push(this.$t('system_message.required_message'));
      }
      formData.append('material_t_base_refrigerators', this.form.material_t_base_refrigerators);

      if (validation == false) {
        this.$modal.hide('modal_head');
        this.errorMessage.messages = messages;
        return false;
      }
      api
        .post('/report/add', {
          name: this.form.name,
          index: 7,
          region_id: region,
        })
        .then((response) => {
          this.applicationSubmit = response.data;

          formData.append('report_fish_id', response.data.id);

          api
            .post('/report/add/indexseven', formData)
            .then((response) => {
              this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/' + 7 });
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
  },
  beforeMount() {
    this.apiGetUserRegions();
    this._fetchRegionList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
