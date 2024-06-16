<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader':
        !_getPondList ||
        !_getFishes ||
        !_getFishPurposes ||
        !applications ||
        !application ||
        !_getPools ||
        !_getRegionList,
    }"
  >
    <v-preloader
      v-if="
        !_getPondList ||
        !_getRegionList ||
        !_getFishes ||
        !_getFishPurposes ||
        !application ||
        !applications ||
        !_getPools
      "
      :message="errorMessage"
    ></v-preloader>

    <div
      class="container"
      v-if="
        _getPondList &&
        _getRegionList &&
        _getFishes &&
        _getFishPurposes &&
        applications &&
        application &&
        _getPools
      "
    >
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['LimitManagement']"></v-sidebar>
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
                    <div class="content__title--text">Редактирование таблицы</div>
                    <div class="content__title--subtext">
                      {{ application.name }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование лимита</div>
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
                              v-model="applications.name"
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

                  <div
                    class="form__line"
                    v-if="$route.params.chapter == 'republic' && application.status != 'active'"
                  >
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование бассейна</div>
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
                              placeholder="Выберите водоемы"
                              class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.name
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line" v-if="application.status != 'active'">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование регионов</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <multiselect
                              required=""
                              v-model="regionValue"
                              :options="formList.region"
                              :multiple="true"
                              :close-on-select="false"
                              :clear-on-select="false"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              placeholder="Выберите водоемы"
                              class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.values[0].value
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="form__line" />

                  <div class="form__line" v-if="application.status != 'active'">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование водоемов</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <multiselect
                              required=""
                              v-model="reservoirsValue"
                              :options="formList.pond"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              placeholder="Выберите водоемы"
                              class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.values[0].value
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                        </div>
                        <div class="col-xl-4">
                          <div class="input__row">
                            <a
                              class="input-btn form__line--btn"
                              :disabled="reservoirsValue == null"
                              @click="reservoirsValue != null ? pondsTable() : ''"
                            >
                              {{ $t('button.add') }}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line--table" v-if="reservoirsList.length">
                    <div class="form__line">
                      <div class="modal__table--table">
                        <table class="table__limit">
                          <thead>
                            <tr>
                              <td rowspan="3" class="table__border--blue"></td>
                              <td rowspan="3" class="table__border--blue"><center>№</center></td>
                              <td rowspan="3" class="table__border--blue">
                                Виды рыб и других водных животных
                              </td>

                              <td :colspan="reservoirsList.length + 2">Наименование водоемов</td>
                            </tr>
                            <tr class="table__align--bottom">
                              <td
                                :rowspan="1"
                                :colspan="1"
                                v-for="(element, index) in reservoirsListNew"
                                :key="index"
                              >
                                {{ element.name }}
                                <a
                                  class="tb__table--btn tb__table--delete"
                                  v-if="application.status != 'active'"
                                  @click="deleteColumn(index)"
                                  v-tooltip.top-center="{
                                    content: $t('button.delete'),
                                    class: ['tooltip__btn'],
                                  }"
                                >
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M11.25 6.75L6.75 11.25"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M6.75 6.75L11.25 11.25"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </a>
                              </td>

                              <td rowspan="2" class="table__border--blue table__align--center">
                                Всего, тонн
                              </td>
                            </tr>

                            <tr class="table__border--blue">
                              <td
                                class="table__border--blue"
                                regions="element.regions"
                                v-for="(element, index) in reservoirsListNew"
                              >
                                {{ element.region_name }}
                              </td>
                            </tr>
                          </thead>
                          <thead>
                            <tr class="table__limit--number">
                              <td v-for="(element, index) in reservoirsListNew.length + 4">
                                {{ index != 0 ? index : '' }}
                              </td>
                            </tr>
                          </thead>

                          <tbody
                            v-for="(includingElement, includingIndex) in includingTable"
                            v-if="includingElement.fish"
                          >
                            <tr>
                              <center v-if="application.status != 'active'">
                                <a
                                  class="tb__table--btn tb__table--delete"
                                  @click="deleteTable(includingIndex)"
                                  v-tooltip.top-center="{
                                    content: $t('button.delete'),
                                    class: ['tooltip__btn'],
                                  }"
                                >
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M11.25 6.75L6.75 11.25"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M6.75 6.75L11.25 11.25"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </a>
                                <a
                                  class="tb__table--btn tb__table--up"
                                  @click="upTable(includingIndex)"
                                  v-tooltip.top-center="{
                                    content: 'Вверх',
                                    class: ['tooltip__btn'],
                                  }"
                                >
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9 14.25V3.75"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M3.75 9L9 3.75L14.25 9"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </a>
                                <a
                                  class="tb__table--btn tb__table--down"
                                  @click="downTable(includingIndex)"
                                  v-tooltip.top-center="{
                                    content: 'Вниз',
                                    class: ['tooltip__btn'],
                                  }"
                                >
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9 3.75L9 14.25"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M14.25 9L9 14.25L3.75 9"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </a>
                              </center>
                              <td>
                                <center>{{ indexTable() }}</center>
                              </td>
                              <td>
                                {{ includingElement.name }}
                              </td>
                              <td
                                class="td__input"
                                v-for="(reservoirsElement, reservoirIndex) in reservoirsListNew"
                              >
                                <div class="form__input--input">
                                  <input
                                    type="number"
                                    min="0"
                                    class="input-linck"
                                    disabled
                                    :value="limitSumColumn[includingIndex][reservoirsElement.id]"
                                  />
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input
                                    type="number"
                                    min="0"
                                    class="input-linck"
                                    disabled
                                    :value="limitSumColumnLine[includingIndex]"
                                  />
                                </div>
                              </td>
                            </tr>

                            <tr v-for="(fishElement, fishIndex) in includingElement.fish">
                              <td class="td__input--controller"></td>
                              <td>
                                <center>{{ indexTable() }}</center>
                              </td>
                              <td>
                                {{ fishElement.name }}
                              </td>
                              <td
                                class="td__input"
                                v-for="(reservoirsElement, reservoirIndex) in reservoirsListNew"
                              >
                                <div class="form__input--input">
                                  <input
                                    type="number"
                                    step=".01"
                                    min="0"
                                    class="input-linck"
                                    :name="
                                      'limit[' +
                                      includingIndex +
                                      '][' +
                                      fishElement.id +
                                      '][' +
                                      reservoirsElement.region_id +
                                      '][' +
                                      reservoirsElement.id +
                                      ']'
                                    "
                                    v-model="
                                      includingTableNew[includingIndex][fishIndex][
                                        reservoirsElement.id
                                      ]
                                    "
                                  />
                                  <input
                                    type="hidden"
                                    :name="
                                      'target[' +
                                      includingIndex +
                                      '][' +
                                      fishElement.id +
                                      '][' +
                                      reservoirsElement.region_id +
                                      '][' +
                                      reservoirsElement.id +
                                      ']'
                                    "
                                    :value="
                                      targetValueNew[includingIndex][fishIndex][
                                        reservoirsElement.id
                                      ]
                                        ? targetValueNew[includingIndex][fishIndex][
                                            reservoirsElement.id
                                          ].id
                                        : ''
                                    "
                                  />
                                  <input
                                    type="hidden"
                                    :name="
                                      'region_id[' +
                                      includingIndex +
                                      '][' +
                                      fishElement.id +
                                      '][' +
                                      reservoirsElement.region_id +
                                      '][' +
                                      reservoirsElement.id +
                                      ']'
                                    "
                                    :value="reservoirsElement.region_id"
                                  />
                                  <input
                                    type="hidden"
                                    :name="
                                      'group[' +
                                      includingIndex +
                                      '][' +
                                      fishElement.id +
                                      '][' +
                                      reservoirsElement.region_id +
                                      '][' +
                                      reservoirsElement.id +
                                      ']'
                                    "
                                    :value="includingIndex"
                                  />

                                  <span class="form__number--cat">{{
                                    targetValueNew[includingIndex][fishIndex][reservoirsElement.id]
                                      ? targetValueNew[includingIndex][fishIndex][
                                          reservoirsElement.id
                                        ].values[1].value
                                      : ''
                                  }}</span>
                                </div>
                                <div class="form__input--icon">
                                  <a
                                    @click="
                                      $modal.show('modal_target'),
                                        (indexValue[0] = includingIndex),
                                        (indexValue[1] = fishIndex),
                                        (indexValue[2] = reservoirsElement.id)
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
                                        d="M3 9H15"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M3 4.5H15"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M3 13.5H15"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input
                                    type="number"
                                    min="0"
                                    class="input-linck"
                                    disabled
                                    :value="limitSumLine[includingIndex][fishIndex]"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td class="td__input--controller">
                                <center v-if="application.status != 'active'">
                                  <a
                                    class="tb__table--btn tb__table--delete"
                                    @click="deleteTable(includingIndex)"
                                    v-tooltip.top-center="{
                                      content: $t('button.delete'),
                                      class: ['tooltip__btn'],
                                    }"
                                  >
                                    <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                                        stroke="#F19797"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M11.25 6.75L6.75 11.25"
                                        stroke="#F19797"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M6.75 6.75L11.25 11.25"
                                        stroke="#F19797"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </a>
                                  <a
                                    class="tb__table--btn tb__table--up"
                                    @click="upTable(includingIndex)"
                                    v-tooltip.top-center="{
                                      content: 'Вверх',
                                      class: ['tooltip__btn'],
                                    }"
                                  >
                                    <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9 14.25V3.75"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M3.75 9L9 3.75L14.25 9"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </a>
                                  <a
                                    class="tb__table--btn tb__table--down"
                                    @click="downTable(includingIndex)"
                                    v-tooltip.top-center="{
                                      content: 'Вниз',
                                      class: ['tooltip__btn'],
                                    }"
                                  >
                                    <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9 3.75L9 14.25"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M14.25 9L9 14.25L3.75 9"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </center>
                              </td>
                              <td>
                                <center>{{ indexTable() }}</center>
                              </td>
                              <td>
                                {{ includingElement[0].name }}
                              </td>
                              <td
                                class="td__input"
                                v-for="(reservoirsElement, reservoirIndex) in reservoirsListNew"
                              >
                                <div class="form__input--input">
                                  <input
                                    type="number"
                                    step=".01"
                                    min="0"
                                    class="input-linck"
                                    :name="
                                      'limit[' +
                                      includingIndex +
                                      '][' +
                                      includingElement[0].id +
                                      '][' +
                                      reservoirsElement.region_id +
                                      '][' +
                                      reservoirsElement.id +
                                      ']'
                                    "
                                    v-model="
                                      includingTableNew[includingIndex][0][reservoirsElement.id]
                                    "
                                  />
                                  <input
                                    type="hidden"
                                    :name="
                                      'target[' +
                                      includingIndex +
                                      '][' +
                                      includingElement[0].id +
                                      '][' +
                                      reservoirsElement.region_id +
                                      '][' +
                                      reservoirsElement.id +
                                      ']'
                                    "
                                    :value="
                                      targetValueNew[includingIndex][0][reservoirsElement.id]
                                        ? targetValueNew[includingIndex][0][reservoirsElement.id].id
                                        : ''
                                    "
                                  />
                                  <input
                                    type="hidden"
                                    :name="
                                      'region_id[' +
                                      includingIndex +
                                      '][' +
                                      includingElement[0].id +
                                      '][' +
                                      reservoirsElement.region_id +
                                      '][' +
                                      reservoirsElement.id +
                                      ']'
                                    "
                                    :value="reservoirsElement.region_id"
                                  />
                                  <input
                                    type="hidden"
                                    :name="
                                      'group[' +
                                      includingIndex +
                                      '][' +
                                      includingElement[0].id +
                                      '][' +
                                      reservoirsElement.region_id +
                                      '][' +
                                      reservoirsElement.id +
                                      ']'
                                    "
                                    :value="includingIndex"
                                  />

                                  <span class="form__number--cat">{{
                                    targetValueNew[includingIndex][0][reservoirsElement.id]
                                      ? targetValueNew[includingIndex][0][reservoirsElement.id]
                                          .values[1].value
                                      : ''
                                  }}</span>
                                </div>
                                <div class="form__input--icon">
                                  <a
                                    @click="
                                      $modal.show('modal_target'),
                                        (indexValue[0] = includingIndex),
                                        (indexValue[1] = 0),
                                        (indexValue[2] = reservoirsElement.id)
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
                                        d="M3 9H15"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M3 4.5H15"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M3 13.5H15"
                                        stroke="#52A5FC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                              </td>
                              <td class="td__input">
                                <div class="form__input--input">
                                  <input
                                    type="number"
                                    min="0"
                                    class="input-linck"
                                    disabled
                                    :value="limitSumLine[includingIndex]"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div class="form__line" v-if="application.status != 'active'">
                      <div class="form__line--left">
                        <div class="form__line--title">Категория рыбы(если нужно)</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-4">
                            <div class="form__line--input">
                              <multiselect
                                required=""
                                v-model="categoryValue"
                                :options="formList.categoryFish"
                                :preserve-search="true"
                                track-by="id"
                                label="name"
                                placeholder="Категория рыбы"
                                class="multiselect__check"
                              >
                                <template slot="singleLabel" slot-scope="{ option }">{{
                                  option.values[0].value
                                }}</template>
                                <template slot="option" slot-scope="{ option, search, isOpen }">
                                  <div class="select__check">
                                    <div class="select__check--name">
                                      {{ option.values[0].value }}
                                    </div>
                                  </div>
                                </template>
                                <template slot="noResult">{{
                                  $t('components.not_found')
                                }}</template>
                              </multiselect>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form__line" v-if="application.status != 'active'">
                      <div class="form__line--left">
                        <div class="form__line--title">Добавить рыбу</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-4">
                            <div class="form__line--input">
                              <multiselect
                                required=""
                                v-model="includingValue"
                                :options="formList.fish"
                                :multiple="true"
                                :close-on-select="false"
                                :clear-on-select="false"
                                :preserve-search="true"
                                track-by="id"
                                label="name"
                                placeholder="Вид рыбы"
                                class="multiselect__check"
                              >
                                <template slot="singleLabel" slot-scope="{ option }">{{
                                  option.values[0].value
                                }}</template>
                                <template slot="option" slot-scope="{ option, search, isOpen }">
                                  <div class="select__check">
                                    <div class="select__check--name">
                                      {{ option.values[0].value }}
                                    </div>
                                  </div>
                                </template>
                                <template slot="noResult">{{
                                  $t('components.not_found')
                                }}</template>
                              </multiselect>
                            </div>
                          </div>
                          <div class="col-xl-4">
                            <div class="input__row">
                              <a
                                class="input-btn form__line--btn"
                                v-bind:disabled="includingValue == []"
                                @click="includingValue != [] ? fishTable() : ''"
                              >
                                {{ $t('button.add') }}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form__line">
                      <div class="form__line--right">
                        <div class="input__row">
                          <button
                            class="input-btn form__line--btn"
                            v-if="
                              /*application.status != 'sent_manager' && application.status != 'approved_manager' &&*/ application.status !=
                              'active'
                            "
                          >
                            {{ $t('button.save') }}
                          </button>
                        </div>
                      </div>
                    </div>

                    <hr class="form__line" />

                    <ul class="form__line--target">
                      <li v-for="target in _getFishPurposes" :key="target.id">
                        <span>{{ target.name }}</span> - {{ target.symbol }}
                      </li>
                    </ul>
                  </div>

                  <modal
                    class="modal__block modal__block--table modal__block--auto"
                    name="modal_target"
                    :width="550"
                    :min-width="550"
                    height="auto"
                  >
                    <div class="modal__block--wrapper">
                      <div class="modal__block--close" @click="$modal.hide('modal_target')">
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
                            <br />
                          </div>
                        </div>

                        <div class="modal__content">
                          <div class="modal__form">
                            <multiselect
                              required=""
                              v-model="targetValue"
                              :options="_getFishPurposes"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              placeholder="Цели"
                              class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.name
                              }}</template>
                              <template slot="option" slot-scope="{ option, search, isOpen }">
                                <div class="select__check">
                                  <div class="select__check--name">
                                    {{ option.name }}
                                  </div>
                                </div>
                              </template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                        </div>
                      </div>
                    </div>
                  </modal>

                  <div class="form__line">
                    <div class="form__line--left"></div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
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

import Multiselect from 'vue-multiselect';
import { api } from '@/boot/axios';

var index = 0;
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      application: null,
      applications: null,
      // applications: {
      //   values: null,
      //   application: null,
      //   region: null,
      //   pond: null,
      //   pool: null,
      //   fish: null,
      //   target: null,
      // },

      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      reservoirsStatus: {
        republic: null,
        local: true,
      },
      reservoirs: {
        republic: null,
        local: null,
      },

      nameLimit: '',
      limit: [],
      total: [],
      arrayElement: [],
      limitSumLine: [],
      limitSumColumn: [],
      limitSumColumnLine: [],
      reservoirSumColmn: [],
      reservoirSumLine: [],

      indexValue: [],
      regionValue: [],
      poolValue: [],
      targetValue: null,
      targetValueNew: [],
      reservoirsValue: null,

      categoryValue: null,
      catalogItem: null,
      fishList: null,

      reservoirsList: [],
      reservoirsNew: [],
      reservoirsListNew: [],

      includingValue: null,
      includingTable: [],
      includingTableNew: [],
      includingList: [],
    };
  },
  watch: {
    includingTableNew: {
      handler() {
        index = 0;
        this.sumTable();
      },
    },
    targetValue: {
      handler() {
        index = 0;
        this.targetTable();
      },
    },
    includingValue: {
      handler() {
        index = 0;
      },
    },
    nameLimit: {
      handler() {
        index = 0;
      },
    },
    reservoirsValue: {
      handler() {
        index = 0;
        this.fishTable();
        this.sumTable();
      },
    },
    applicationsList: {
      handler() {
        this.dataItem();
      },
    },
  },
  computed: {
    ...mapGetters([
      '_getRegionList',
      '_getPondList',
      '_getPools',
      '_getFishes',
      '_getFishCategories',
      '_getFishPurposes',
    ]),
    applicationsList() {
      const { applications, _getRegionList, _getPondList, _getFishes, _getFishPurposes } = this;
      return {
        applications,
        _getRegionList,
        _getPondList,
        _getFishes,
        _getFishPurposes,
      };
    },
    formList() {
      let regionList = this._getRegionList.filter((element) => {
        if (this.poolValue && this.poolValue.links) {
          return this.poolValue.links.find((selected) => {
            return element.id == selected.item_id ? true : false;
          });
        }
        return true;
      });
      let pondList = this._getPondList.filter((element) => {
        if (this.regionValue && this.regionValue.length) {
          return this.regionValue.find((region) => {
            if (region && region.links) {
              return region.links.find((selected) => {
                return element.id == selected.item_id ? true : false;
              });
            }
            return false;
          });
        }
        return false;
      });

      let fishList = this._getFishes.filter((element) => {
        if (this.categoryValue) {
          return this.categoryValue.id == element.category.id ? true : false;
        }
        return true;
      });

      let list = {
        pool: this._getPools,
        region: regionList,
        pond: pondList,

        categoryFish: this._getFishCategories,
        fish: fishList,
      };
      return list;
    },
  },
  methods: {
    ...mapActions([
      '_fetchRegionList',
      '_fetchPondList',
      '_fetchPools',
      '_fetchFishes',
      '_fetchFishCategories',
      '_fetchFishPurposes',
    ]),
    targetTable() {
      this.targetValueNew[this.indexValue[0]][this.indexValue[1]][this.indexValue[2]] =
        this.targetValue;
      this.$modal.hide('modal_target');
    },
    sumTable() {
      this.includingTableNew.find((element, index) => {
        this.limitSumLine[index] = [];
        this.limitSumColumn[index] = [];
        this.limitSumColumnLine[index] = 0;
        element.find((e, i) => {
          this.limitSumLine[index][i] = 0;
          for (let key in e) {
            this.limitSumLine[index][i] += Number(e[key]);
            if (!this.limitSumColumn[index][key]) this.limitSumColumn[index][key] = 0;
            this.limitSumColumn[index][key] += Number(e[key]);
            this.limitSumColumnLine[index] += Number(e[key]);
          }
        });
      });
    },
    indexTable($index) {
      index = index + 1;
      return index;
    },
    pondsTable() {
      index = 0;
      let value = null;
      let list = [];
      this.regionValue.find((element) => {
        if (this.reservoirsValue) {
          return this.reservoirsValue.category.find((category) => {
            if (category.catalog_id == element.id) {
              value = this.reservoirsValue;
              value.region_id = category.catalog_id;
              value.region_name = element.name;
              let pondTrue = false;
              this.reservoirsNew.find((el) => {
                if (category.item_id == el.id && el.region_id == category.catalog_id)
                  pondTrue = true;
              });

              if (!pondTrue) {
                this.reservoirsList.push(value);
                this.reservoirsNew.push({
                  id: value.id,
                  name: value.values[0].value,
                  region_id: category.catalog_id,
                  region_name: element.name,
                });
              }
            }
          });
        }
      });

      list = this.reservoirsNew;

      this.reservoirsListNew = list;

      this.reservoirsValue = null;
    },
    fishTable() {
      index = 0;
      if (this.includingValue) {
        if (this.categoryValue && this.includingValue.length) {
          let fishList = [];
          let catalogItem = {
            id: 0,
            name: '',
            catalog_id: 0,
            fish: [],
            category: [],
            links: [],
          };

          catalogItem.id = this.categoryValue.id;
          catalogItem.name = this.categoryValue.name;
          catalogItem.catalog_id = this.categoryValue.catalog_id;

          let reservoirLine = [];
          let reservoirLine2 = [];
          this.includingValue.find((element, index) => {
            fishList.push(element);
            catalogItem.fish.push(element);

            let i = 0;
            reservoirLine[index] = [];
            reservoirLine2[index] = [];
            while (i < this.reservoirsList.length) {
              reservoirLine[index].push('');
              reservoirLine2[index].push('');
              i++;
            }
          });

          this.includingTableNew.push(reservoirLine);
          this.targetValueNew.push(reservoirLine2);
          this.includingTable.push(catalogItem);
          this.categoryValue = null;
        } else {
          this.includingValue.find((element, index) => {
            let reservoirLine = [];
            let reservoirLine2 = [];
            let fishList = [];
            fishList.push(element);
            this.includingTable.push(fishList);

            let i = 0;
            reservoirLine[0] = [];
            reservoirLine2[0] = [];
            while (i < this.reservoirsList.length) {
              reservoirLine[0].push('');
              reservoirLine2[0].push('');
              i++;
            }
            this.includingTableNew.push(reservoirLine);
            this.targetValueNew.push(reservoirLine2);
          });
        }

        this.includingValue = [];
      }
    },
    dataItem() {
      if (
        this.applications &&
        this._getFishes &&
        this._getRegionList &&
        this._getPondList &&
        this._getFishPurposes &&
        !this.includingTable.length &&
        !this.reservoirsNew.length
      ) {
        let list = [];
        let listNew = [];
        let listList = [];
        let pondList = [];
        let regionList = [];

        let region = null;
        let pond = null;

        let valueList = [];
        this.applications.values.filter((element) => {
          if (valueList[element.group] == null || valueList[element.group] == undefined)
            valueList[element.group] = [];
          valueList[element.group].push(element);
        });

        let fish = [];
        valueList.find((element, index) => {
          fish[index] = [];
          /*let reservoirIds = [];
          let reservoirIds2 = [];*/
          if (element) {
            element.find((el) => {
              let pondId = true;
              pondList.find((pond) => {
                if (pond.pond_id == el.pond_id && pond.region_id == el.region_id) pondId = false;
              });
              if (pondId) {
                pondList.push({
                  pond_id: el.pond_id,
                  region_id: el.region_id,
                });
              }

              let fishStat = true;
              fish[index].find((f) => {
                if (f == el.fish_id) fishStat = false;
              });
              if (fishStat) {
                fish[index].push(el.fish_id);
              }

              /*fish = el.fish_id;
              reservoirIds.push(el.value);
              let targetItem = null;
              this._getFishPurposes.find(targetElement=>{
                if(targetElement.id == el.target) targetItem = targetElement;
              });
              reservoirIds2.push(targetItem);*/
            });

            /*let fishItem = null;
            this._getFishes.find(fishElement=>{
              if(fishElement.id == fish) fishItem = fishElement;
            });
            this.includingTable.push(fishItem);*/
          }
        });

        fish.find((element) => {
          if (element.length > 1) {
            let fishList = [];
            let categoryFishItem = null;
            element.find((fishId) => {
              let fishItem = null;
              this._getFishes.find((fishElement) => {
                if (fishElement.id == fishId) {
                  fishItem = fishElement;
                  fishItem.parent_id = fishElement.category.id;
                  categoryFishItem = this._getFishCategories.find((categoryElement) => {
                    if (fishElement.category.id == categoryElement.id) return categoryElement;
                  });
                }
              });
              fishList.push(fishItem);
            });

            this.includingTable.push({
              name: categoryFishItem ? categoryFishItem.name : '',
              fish: fishList,
            });
          } else {
            let fishItem = null;
            let fishList = [];
            this._getFishes.find((fishElement) => {
              if (fishElement.id == element) {
                fishItem = fishElement;
                fishItem.parent_id = fishElement.category.id;
              }
            });
            if (fishItem) {
              fishList.push(fishItem);
            }
            if (fishList.length) {
              this.includingTable.push(fishList);
            }

            // this.includingTableNew.push(reservoirLine);
            // this.targetValueNew.push(reservoirLine2);
          }
        });

        this.includingTable.find((element, index) => {
          if (element.fish) {
            let pondValues = [];
            let targetValues = [];
            element.fish.find((el, indexFish) => {
              // pondValues[indexFish] = [];
              // targetValues[indexFish] = [];

              pondValues[indexFish] = new Object();
              targetValues[indexFish] = new Object();

              pondList.find((pond) => {
                valueList.find((valueList) => {
                  valueList.find((value) => {
                    if (
                      pond.pond_id == value.pond_id &&
                      pond.region_id == value.region_id &&
                      el.id == value.fish_id &&
                      index == value.group
                    ) {
                      // pondValues[indexFish].push(value.value);

                      pondValues[indexFish][value.pond_id] = value.value;

                      this._getFishPurposes.find((target) => {
                        if (value.target == target.id || (value.target == null && target.id == 1)) {
                          // targetValues[indexFish].push(target);
                          targetValues[indexFish][value.pond_id] = target;
                        }
                      });
                    }
                  });
                });
              });
            });

            this.targetValueNew.push(targetValues);
            this.includingTableNew.push(pondValues);
          } else {
            let pondValues = [];
            let targetValues = [];
            element.find((el) => {
              //pondValues[0] = [];
              // targetValues[0] = [];

              pondValues[0] = new Object();
              targetValues[0] = new Object();

              if (el) {
                pondList.find((pond) => {
                  valueList.find((valueList) => {
                    if (valueList) {
                      valueList.find((value) => {
                        if (
                          pond.pond_id == value.pond_id &&
                          pond.region_id == value.region_id &&
                          el.id == value.fish_id &&
                          index == value.group
                        ) {
                          //pondValues[0].push(value.value);

                          pondValues[0][value.pond_id] = value.value;

                          this._getFishPurposes.find((target) => {
                            if (
                              value.target == target.id ||
                              (value.target == null && target.id == 1)
                            ) {
                              // targetValues[0].push(target);

                              targetValues[0][value.pond_id] = target;
                            }
                          });
                        }
                      });
                    }
                  });
                });
              }
              this.includingTableNew.push(pondValues);
              this.targetValueNew.push(targetValues);
            });
          }
        });

        pondList.find((category) => {
          let value = null;
          let valueRegion = null;
          this._getPondList.find((reservoir) => {
            if (reservoir.id == category.pond_id) {
              value = reservoir;
            }
          });
          this._getRegionList.find((region) => {
            if (region.id == category.region_id) {
              valueRegion = region;
            }
          });
          value.region_id = category.region_id;
          value.region_name = valueRegion.name;

          this.reservoirsList.push(value);
          this.reservoirsNew.push({
            id: value.id,
            name: value.name,
            region_id: category.region_id,
            region_name: valueRegion.name,
          });
        });
        listNew = this.reservoirsNew;
        this.reservoirsListNew = listNew;
      }
    },
    deleteTable(index) {
      this.includingTable.splice(index, 1);
      this.includingTableNew.splice(index, 1);
      this.targetValueNew.splice(index, 1);
    },
    deleteColumn(index) {
      this.reservoirsList.splice(index, 1);
      this.reservoirsListNew.splice(index, 1);
    },
    upTable(index) {
      if (index != 0) {
        let t = this.includingTable[index];
        this.includingTable[index] = this.includingTable[index - 1];
        this.includingTable[index - 1] = t;

        t = this.includingTableNew[index];
        this.includingTableNew[index] = this.includingTableNew[index - 1];
        this.includingTableNew[index - 1] = t;

        t = this.targetValueNew[index];
        this.targetValueNew[index] = this.targetValueNew[index - 1];
        this.targetValueNew[index - 1] = t;
      }
      this.includingTable.push();
      this.includingTableNew.push();
      this.targetValueNew.push();
      this.fishTable();
    },
    downTable(index) {
      if (index + 1 < this.includingTable.length) {
        let t = this.includingTable[index];
        this.includingTable[index] = this.includingTable[index + 1];
        this.includingTable[index + 1] = t;

        t = this.includingTableNew[index];
        this.includingTableNew[index] = this.includingTableNew[index + 1];
        this.includingTableNew[index + 1] = t;

        t = this.targetValueNew[index];
        this.targetValueNew[index] = this.targetValueNew[index + 1];
        this.targetValueNew[index + 1] = t;
      }
      this.includingTable.push();
      this.includingTableNew.push();
      this.targetValueNew.push();
      this.fishTable();
    },
    apiGetLimit() {
      api
        .get('limit/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.application = response.data;
            // this.$set(this.applications, 'application', response.data);
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
          if (error?.response?.status == 403) {
            this.errorMessage.status = 403;
            this.errorMessage.text = error?.response?.data?.message;
          }
        });
    },

    apiGetItem() {
      api
        .get('/limit/' + this.$route.params.id + '/item/' + this.$route.params.itemId)
        .then((response) => {
          if (response.data) {
            this.applications = response.data;
            // this.$set(this.applications, 'values', response.data);
            this._fetchRegionList();
            this._fetchPondList();
            this._fetchPools();
            this._fetchFishes();
            this._fetchFishPurposes();
            this._fetchFishCategories();
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
          if (error?.response?.status == 403) {
            this.errorMessage.status = 403;
            this.errorMessage.text = error?.response?.data?.message;
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
      this.$modal.hide('modal_table');
      formData.append('chapter', this.$route.params.chapter);
      api
        .post('/limit/' + this.$route.params.id + '/item/' + this.$route.params.itemId, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
            this.$router.push({
              path:
                '/' +
                this.$i18n.locale +
                '/account/limits/' +
                this.$route.params.id +
                '/' +
                this.$route.params.chapter +
                '/',
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
  },
  beforeMount() {
    this.apiGetLimit();
    this.apiGetItem();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
