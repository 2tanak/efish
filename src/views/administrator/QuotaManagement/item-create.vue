<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader':
        !_getPools ||
        !_getFishes ||
        !_getPondList ||
        !_getRegionList ||
        !applications ||
        !applicationsUser,
    }"
  >
    <v-preloader
      v-if="
        !_getPools ||
        !_getFishes ||
        !_getPondList ||
        !_getRegionList ||
        !applications ||
        !applicationsUser
      "
      :message="errorMessage"
    ></v-preloader>

    <div
      class="container"
      v-if="
        _getPools &&
        _getFishes &&
        _getPondList &&
        _getRegionList &&
        applications &&
        applicationsUser
      "
    >
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['QuotaManagement']"></v-sidebar>
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
                    <div class="content__title--text">Создание квоты</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование квоты</div>
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
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="name"
                              value=""
                              placeholder="Наименование"
                            />
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

                  <!--
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Наименование бассейна
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">

                        <div class="col-xl-5">

                          <div class="form__line--input">
                            <multiselect
                                required=""
                                v-model="poolValue"
                                :options="formList.pool"
                                :preserve-search="true"
                                track-by="id"
                                label="name"
                                placeholder="Выберите бассейн"
                                class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{ option.values[0].value }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>

                  <div class="form__line" v-if="formList.region">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Наименование региона
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">

                        <div class="col-xl-5">

                          <div class="form__line--input">
                            <multiselect
                                required=""
                                v-model="regionValue"
                                :options="formList.region"
                                :preserve-search="true"
                                track-by="id"
                                label="name"
                                placeholder="Выберите водоемы"
                                class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{ option.values[0].value }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                  -->

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование водоема</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.pond_id
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <multiselect
                              required=""
                              v-model="reservoirsValue"
                              :options="formList.pond"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              placeholder="Выберите водоемы"
                              class="multiselect__check"
                              v-if="!reservoirsValue"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.values[0].value
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                            <input
                              class="input-linck"
                              type="text"
                              required=""
                              disabled
                              placeholder="Наименование"
                              :value="reservoirsValue.values[0].value"
                              v-else
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.pond_id"
                          >
                            <p v-for="massage in errorMessage.messages.pond_id">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="reservoirsValue">
                    <div class="form__line form__line--margin" v-for="(item, index) in fildsList">
                      <div class="form__line--left">
                        <div class="form__line--title">Субъект рыбного хозяйства</div>
                      </div>
                      <div class="form__line--right">
                        <div class="form__line--children">
                          <div class="row align-items-center">
                            <div class="col-xl-5">
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  min="0"
                                  class="input-linck"
                                  :name="'declarer[' + index + ']'"
                                  disabled
                                  v-model="item.name"
                                  placeholder="Субъект"
                                />
                              </div>
                            </div>
                            <div class="col-xl-2">
                              <div class="input__block--add">
                                <a
                                  @click="deleteFild(index)"
                                  v-tooltip.right="{
                                    content: 'Удалить субъект',
                                    class: ['tooltip__btn'],
                                  }"
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M15 9L9 15"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M9 9L15 15"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>

                          <div class="form-quota__info">
                            <div class="form-quota__head">
                              <div class="row align-items-center">
                                <div class="col-xl-5">
                                  <div class="form-quota__title">
                                    {{ item.company.first_name }} {{ item.company.last_name }}
                                    {{ item.company.middle_name }} ({{
                                      item.company.name_company
                                    }}
                                    БИН {{ item.company.iin_bin }})
                                  </div>
                                </div>
                              </div>

                              <div class="quota-fish__line">
                                <div class="row align-items-center">
                                  <div class="col-xl-5">
                                    <div class="form__line--title">Рейтинговый коэффициент</div>
                                    <div class="form__line--input">
                                      <input
                                        type="text"
                                        class="input-linck"
                                        :name="'rating[' + item.id + ']'"
                                        required
                                        v-model="fildsList[index].rating"
                                        placeholder="Рейтинговый коэффициент"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="quota-fish__line">
                                <div class="row align-items-center">
                                  <div class="col-xl-5">
                                    <div class="form__line--title">Коэффициент изъятия</div>
                                    <div class="form__line--input">
                                      <input
                                        type="text"
                                        class="input-linck"
                                        :name="'coefficient[' + item.id + ']'"
                                        required
                                        v-model="fildsList[index].coefficient"
                                        placeholder="Коэффициент изъятия"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="form-quota__body">
                              <div class="form-quota__fish">
                                <div class="row align-items-center">
                                  <div class="col-xl-5">
                                    <div class="quota-fish__title">
                                      <div class="row align-items-center">
                                        <div class="col-xl-7">
                                          <div class="form__line--title">
                                            Виды рыб по выбранному бассейну
                                          </div>
                                        </div>
                                        <div class="col-xl-5">
                                          <div class="form__line--title">
                                            Выделяемая квота (тон.)
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <!-- /.quota-fish__title -->
                                  </div>
                                </div>

                                <div
                                  class="quota-fish__line"
                                  v-for="(fish, fishIndex) in item.fishs"
                                >
                                  <div
                                    class="quota-fish__wrapper"
                                    :class="[
                                      errorMessage.messages &&
                                      errorMessage.messages[item.company.id] &&
                                      errorMessage.messages[item.company.id][fish.fish.id]
                                        ? 'input--error'
                                        : '',
                                    ]"
                                  >
                                    <div class="row align-items-center">
                                      <div class="col-xl-5">
                                        <div class="quota-fish__item">
                                          <div class="row align-items-center">
                                            <div class="col-xl-7">
                                              <div class="form__line--input">
                                                <input
                                                  type="text"
                                                  disabled
                                                  :value="fish.fish.values[0].value"
                                                  class="input-linck"
                                                />
                                              </div>
                                            </div>
                                            <div class="col-xl-5">
                                              <div class="form__line--input">
                                                <input
                                                  type="number"
                                                  step=".01"
                                                  min="0"
                                                  class="input-linck"
                                                  required=""
                                                  v-model="fish.value"
                                                  @input="sumQuota()"
                                                  :placeholder="fish.preload"
                                                  :max="fish.preload"
                                                  :min="0"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <!-- /.quota-fish__line -->
                                      </div>
                                      <!--
                                      <div class="col-xl-2">
                                        <div class="input__block--add">
                                          <a @click="deleteFildFish(index, fishIndex)" v-tooltip.right="{content:'Удалить рыбу', class: ['tooltip__btn']}">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#F19797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                              <path d="M15 9L9 15" stroke="#F19797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                              <path d="M9 9L15 15" stroke="#F19797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                          </a>
                                        </div>
                                      </div>
                                      -->
                                    </div>
                                  </div>
                                  <div
                                    class="input-required"
                                    v-if="
                                      errorMessage.messages &&
                                      errorMessage.messages[item.company.id] &&
                                      errorMessage.messages[item.company.id][fish.fish.id]
                                    "
                                  >
                                    <p
                                      v-for="massage in errorMessage.messages[item.company.id][
                                        fish.fish.id
                                      ]"
                                    >
                                      {{ massage }}
                                    </p>
                                  </div>
                                </div>
                                <!-- /.quota-fish__line -->

                                <!--
                                <div class="quota-fish__line quota-fish__line--children">
                                  <div class="quota-fish__wrapper" :class="[quotaFish[index] && errorMessage.messages && errorMessage.messages[item.company.id] && errorMessage.messages[item.company.id][quotaFish[index].id] ? 'input--error' : '']">
                                    <div class="row align-items-center">
                                      <div class="col-xl-5">

                                        <div class="quota-fish__item">
                                          <div class="row align-items-center">
                                            <div class="col-xl-7">
                                              <div class="form__line--input">
                                                <multiselect
                                                    required=""
                                                    v-model="quotaFish[index]"
                                                    :options="formList.fish"
                                                    :preserve-search="true"
                                                    track-by="id"
                                                    label="name"
                                                    placeholder="Выберите рыбу"
                                                    class="multiselect__check"
                                                >
                                                  <template slot="singleLabel" slot-scope="{ option }">{{ option.values[0].value }}</template>
                                                  <template slot="noResult">{{ $t('components.not_found') }}</template>
                                                </multiselect>
                                              </div>
                                            </div>
                                            <div class="col-xl-5">
                                              <div class="form__line--input">
                                                <input type="number" step=".01" min="0" class="input-linck" v-model="quotaValue[index]" placeholder="0">
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                      </div>
                                      <div class="col-xl-2">
                                        <div class="input__block--add">
                                          <a @click='addFildFish(index)' v-tooltip.right="{content:'Добавить поле', class: ['tooltip__btn']}">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                              <path d="M12 8V16" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                              <path d="M8 12H16" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="input-required" v-if="quotaFish[index] && errorMessage.messages && errorMessage.messages[item.company.id] && errorMessage.messages[item.company.id][quotaFish[index].id]"><p v-for="massage in errorMessage.messages[item.company.id][quotaFish[index].id]">{{ massage }}</p></div>
                                </div>
                                -->
                                <!-- /.quota-fish__line -->

                                <div class="row align-items-center">
                                  <div class="col-xl-5">
                                    <div class="quota-fish__footer">
                                      Общая выделяемая квота
                                      <strong> {{ quotaSum[index] }} тон.</strong>
                                    </div>
                                    <!-- /.quota-fish__footer -->

                                    <hr />
                                  </div>
                                </div>
                              </div>
                              <!-- /.form-quota__fish -->
                            </div>
                            <!-- /.form-quota__body -->
                          </div>
                          <!-- /.form-line__quota -->
                        </div>
                      </div>
                    </div>

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Субъект рыбного хозяйства</div>
                      </div>
                      <div class="form__line--right">
                        <div class="form__line form__line--children">
                          <div class="row align-items-center">
                            <div class="col-xl-5">
                              <div
                                class="form__line--input"
                                :class="[
                                  errorMessage.messages && errorMessage.messages.quotas
                                    ? 'input--error'
                                    : '',
                                ]"
                              >
                                <!--<input type="number" min="0" class="input-linck" @keyup.enter='addFild(fildsIndex)' v-model="fildsNew" placeholder="ИНН/БИН">-->
                                <multiselect
                                  required=""
                                  v-model="userValue"
                                  :options="formList.user"
                                  :preserve-search="true"
                                  track-by="iin_bin"
                                  label="iin_bin"
                                  :custom-label="nameWithLang"
                                  placeholder="Выберите пользователя"
                                  class="multiselect__check"
                                >
                                  <template slot="option" slot-scope="{ option }"
                                    >{{ option.first_name }} {{ option.last_name }}
                                    {{ option.middle_name }}({{ option.iin_bin }})</template
                                  >
                                  <template slot="singleLabel" slot-scope="{ option }"
                                    >{{ option.first_name }} {{ option.last_name }}
                                    {{ option.middle_name }}({{ option.iin_bin }})</template
                                  >
                                  <template slot="noOptions">Пользователь не найден</template>
                                  <template slot="noResult">{{
                                    $t('components.not_found')
                                  }}</template>
                                </multiselect>
                              </div>
                              <div
                                class="input-required"
                                v-if="errorMessage.messages && errorMessage.messages.quotas"
                              >
                                <p v-for="massage in errorMessage.messages.quotas">{{ massage }}</p>
                              </div>
                            </div>
                            <div class="col-xl-2">
                              <div style="display: flex">
                                <div class="input__block--add">
                                  <a
                                    @click="addFild(fildsIndex)"
                                    v-tooltip.right="{
                                      content: 'Добавить поле',
                                      class: ['tooltip__btn'],
                                    }"
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M12 8V16"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M8 12H16"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>

                                <div class="input__block--add" style="margin-left: 10px">
                                  <a
                                    @click="integration()"
                                    v-tooltip.right="{
                                      content: 'Обновить',
                                      class: ['tooltip__btn'],
                                    }"
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M23 4V10H17"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M1 20V14H7"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M3.51 9.00001C4.01717 7.5668 4.87913 6.28542 6.01547 5.27543C7.1518 4.26545 8.52547 3.55978 10.0083 3.22427C11.4911 2.88877 13.0348 2.93436 14.4952 3.35679C15.9556 3.77922 17.2853 4.56473 18.36 5.64001L23 10M1 14L5.64 18.36C6.71475 19.4353 8.04437 20.2208 9.50481 20.6432C10.9652 21.0657 12.5089 21.1113 13.9917 20.7758C15.4745 20.4402 16.8482 19.7346 17.9845 18.7246C19.1209 17.7146 19.9828 16.4332 20.49 15"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="quota-footer__final">
                            <div class="row align-items-center">
                              <div class="col-xl-5">
                                <hr />

                                <div class="quota-fish__footer quota__footer">
                                  Итоговая квота <strong> {{ finalSum }} тон.</strong>
                                </div>
                                <!-- /.quota-fish__footer -->
                              </div>
                            </div>
                          </div>
                          <!-- /.quota-footer__final -->
                        </div>
                      </div>
                    </div>

                    <div class="form__line">
                      <div class="form__line--left"></div>
                      <div class="form__line--right">
                        <div class="input__row">
                          <button class="input-btn form__line--btn">
                            {{ $t('button.save') }}
                          </button>
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
                </form>

                <modal
                  class="modal__block modal__block--table"
                  name="modal_integration"
                  :width="650"
                  :min-width="650"
                  height="auto"
                >
                  <div class="modal__block--wrapper modal__table">
                    <div class="modal__block--close" @click="$modal.hide('modal_integration')">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.5 7.5L7.5 22.5"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.5 7.5L22.5 22.5"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>

                    На данный момент нет субъектов с доступной квотой
                  </div>
                </modal>
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
      applicationsUser: null,

      userValue: null,
      regionValue: null,
      poolValue: null,
      reservoirsValue: null,

      quotaFish: [],
      quotaValue: [],
      quotaSum: [],
      finalSum: 0,

      fishLimit: [],

      fildsNew: '',
      fildsList: [],
      fildsIndex: 0,

      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
    };
  },
  watch: {
    // '$store.state.userObject': {
    //   immediate: true,
    //   handler: function () {
    //     if (this.$store.state.userObject.regions) {
    //       this.$store.state.userObject.regions.find((element) => {
    //         this.regionArray.push(element.region_id);
    //       });
    //       if (this.regionArray != 'undefined' && this.regionArray) {
    //         this._fetchPondList();
    //       }
    //     }
    //   },
    // },

    reservoirsValue: {
      handler() {
        this.apiGetFishQuota(this.reservoirsValue.id);
      },
    },

    quotaList: {
      handler() {
        this.sumQuota();
      },
    },
  },
  computed: {
    ...mapGetters(['_getRegionList', '_getPondList', '_getPools', '_getFishes']),
    quotaList() {
      const { quotaValue, quotaFish, fildsList } = this;
      return { quotaValue, quotaFish, fildsList };
    },
    formList() {
      this.regionValue = this._getRegionList.find((element) => {
        if (this.applications.region_id == element.id) return element;
      });

      let pondList = [];
      pondList = this._getPondList.filter((element) => {
        if (this.regionValue && this.regionValue.links) {
          return this.regionValue.links.find((selected) => {
            return element.id == selected.item_id ? true : false;
          });
        }
      });

      let list = {
        /*pool: this._getPools,
        region: regionList,*/
        pond: pondList || [],
        fish: this.applicationsFisht || [],
        user: this.applicationsUsert || [],
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList', '_fetchPondList', '_fetchPools', '_fetchFishes']),
    nameWithLang({ first_name, last_name, middle_name, iin_bin }) {
      return `${first_name} ${last_name} ${middle_name}(${iin_bin})`;
    },
    sumQuota() {
      let finalSum = 0;
      this.fildsList.find((element, index) => {
        let sum = 0;
        element.fishs.find((fish) => {
          sum += Number(fish.value);
          finalSum += Number(fish.value);
        });
        if (this.quotaValue[index] && this.quotaFish[index] != null) {
          sum += Number(this.quotaValue[index]);
          finalSum += Number(this.quotaValue[index]);
        }

        this.finalSum = Math.round(finalSum * 1000) / 1000;
        this.quotaSum[index] = Math.round(sum * 1000) / 1000;
      });
    },
    addFild(index) {
      let iinTrue = true;
      this.fildsList.find((element) => {
        if (element.id == this.userValue.id) iinTrue = false;
      });
      if (iinTrue && this.userValue) {
        let name =
          (this.userValue.first_name ? this.userValue.first_name + ' ' : '') +
          (this.userValue.last_name ? this.userValue.last_name + ' ' : '') +
          (this.userValue.middle_name ? this.userValue.middle_name + ' ' : '') +
          '(' +
          this.userValue.iin_bin +
          ')';

        let userLimit = [];
        this.fishLimit.find((el) => {
          userLimit.push({
            fish: el.fish,
            value: '',
            preload: el.preload,
          });
        });

        this.fildsList.push({
          id: this.userValue.id,
          name: name,
          iin_bin: this.userValue.iin_bin,
          company: {
            id: this.userValue.id,
            first_name: this.userValue.first_name,
            last_name: this.userValue.last_name,
            middle_name: this.userValue.middle_name,
            name_company: this.userValue.name_company,
            iin_bin: this.userValue.iin_bin,
          },
          fishs: userLimit,
          rating: '',
          coefficient: '',
          quotaSum: 0,
        });

        this.quotaSum.push(0);
        this.fildsIndex = this.fildsList.length;
        this.fildsNew = '';
      }
      this.userValue = null;
    },
    deleteFild(index) {
      this.fildsList.splice(index, 1);
      this.fildsIndex = this.fildsList.length;

      this.quotaFish[index] = null;
      this.quotaValue[index] = '';
      this.sumQuota();
    },
    integration() {
      this.$modal.show('modal_integration');
    },
    apiGetQuota() {
      api
        .get('quota/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.applications = response.data;
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

    onSubmit(evt) {
      this.errorMessage = {
        status: null,
        messages: null,
        text: null,
      };
      this.message = {
        status: null,
        text: null,
      };
      const formData = new FormData(evt.target);

      /*if(this.regionValue){
        formData.append('region_id', this.regionValue.id);//this.pondModel.id
      }*/
      if (this.reservoirsValue) {
        formData.append('pond_id', this.reservoirsValue.id);
      }
      if (this.fildsList) {
        this.fildsList.find((element, index) => {
          element.fishs.find((fish) => {
            formData.append('quotas[' + element.id + '][' + fish.fish.id + ']', fish.value);
          });

          if (
            this.quotaFish[index] &&
            this.quotaValue[index] &&
            this.quotaValue[index] != undefined
          ) {
            formData.append(
              'quotas[' + element.id + '][' + this.quotaFish[index].id + ']',
              this.quotaValue[index],
            );
          }
        });
      }

      api
        .post('quota/' + this.$route.params.id + '/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
            // this.$router.push({path: '/'+ this.$i18n.locale +'/account/quotas'});
            this.$router.push({
              path: '/' + this.$i18n.locale + '/account/quotas/' + this.$route.params.id + '/list',
            });
          }
        })
        .catch((error) => {
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
          this.errorMessage.messages = error.response.data.error_messages;
        });
    },

    apiGetUsersList() {
      api
        .get('role/user/3')
        .then((response) => {
          if (response.data) {
            this.applicationsUser = response.data.data;
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

    apiGetFishQuota(pondId) {
      api
        .get('quota/' + this.$route.params.id + '/info', {
          params: {
            pond_id: pondId,
          },
        })
        .then((response) => {
          if (response.data) {
            // this.fishLimit = response.data;
            response.data.find((element) => {
              this.fishLimit.push({
                fish: element.fish,
                value: '',
                preload: element.value,
              });
            });
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
    this._fetchPondList();
    this._fetchPools();
    this._fetchRegionList();
    this._fetchFishes();
    this.apiGetQuota();
    this.apiGetUsersList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
