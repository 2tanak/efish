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
          <v-sidebar :active="['QuotaReverseManagement']"></v-sidebar>
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
                    <div class="content__title--text">
                      {{ $t('sidebar.quotas_reverse') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование заявки</div>
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

                  <hr />

                  <div v-if="reservoirsValue">
                    <div
                      class="form__line form__line--margin"
                      v-for="(item, index) in fildsZeroList"
                    >
                      <div class="form__line--left">
                        <div class="form__line--title">Субъект лишаемый квоты</div>
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
                                  <div class="quota-fish__wrapper">
                                    <div class="row align-items-center">
                                      <div class="col-xl-5">
                                        <div class="quota-fish__item">
                                          <div class="row align-items-center">
                                            <div class="col-xl-7">
                                              <div class="form__line--input">
                                                <input
                                                  type="text"
                                                  :value="fish.fish.values[0].value"
                                                  disabled
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
                                                  disabled
                                                  v-model="fish.value"
                                                  placeholder="0"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <!-- /.quota-fish__line -->
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <!-- /.quota-fish__line -->
                              </div>
                              <!-- /.form-quota__fish -->
                            </div>
                            <!-- /.form-quota__body -->
                          </div>
                          <!-- /.form-line__quota -->
                        </div>
                      </div>
                    </div>

                    <div class="form__line" v-if="fildsZeroList == 0">
                      <div class="form__line--left">
                        <div class="form__line--title">Субъект лишаемый квоты</div>
                      </div>
                      <div class="form__line--right">
                        <div class="form__line form__line--children">
                          <div class="row align-items-center">
                            <div class="col-xl-5">
                              <div class="form__line--input">
                                <multiselect
                                  required=""
                                  v-model="fildsZoro"
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
                                  <template slot="noOptions">Водоем не найден</template>
                                  <template slot="noResult">{{
                                    $t('components.not_found')
                                  }}</template>
                                </multiselect>
                              </div>
                            </div>
                            <div class="col-xl-2">
                              <div class="input__block--add">
                                <a
                                  @click="addZoroFild(fildsZeroIndex)"
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div class="form__line form__line--margin" v-for="(item, index) in fildsList">
                      <div class="form__line--left">
                        <div class="form__line--title">Субъект для дополнительной квоты</div>
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
                                                  :value="fish.fish.values[0].value"
                                                  disabled
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
                                                  placeholder="0"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <!-- /.quota-fish__line -->
                                      </div>
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
                              </div>
                              <!-- /.form-quota__fish -->
                            </div>
                            <!-- /.form-quota__body -->
                          </div>
                          <!-- /.form-line__quota -->
                        </div>
                      </div>
                    </div>

                    <div class="form__line" v-if="fildsZeroList[0]">
                      <div class="form__line--left">
                        <div class="form__line--title">Субъект для дополнительной квоты</div>
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
                                <multiselect
                                  required=""
                                  v-model="fildsNew"
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
                                  <template slot="noOptions">Водоем не найден</template>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left"></div>
                    <div class="form__line--right">
                      <div class="input__row">
                        <button class="input-btn form__line--btn">Распределить</button>
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
      applicationsUser: null,

      userValue: null,
      regionValue: null,
      poolValue: null,
      reservoirsValue: null,

      quotaFish: [],
      quotaValue: [],
      quotaSum: [],
      finalSum: 0,

      fildsZoro: '',
      fildsZeroList: [],
      fildsZeroIndex: 0,

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
        pond: pondList,
        fish: this._getFishes,
        user: this.applicationsUser[0].users,
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
      this.fildsZeroList.find((element) => {
        if (element.id == this.fildsNew.id) iinTrue = false;
      });
      this.fildsList.find((element) => {
        if (element.id == this.fildsNew.id) iinTrue = false;
      });

      if (iinTrue && this.fildsNew) {
        let name =
          (this.fildsNew.first_name ? this.fildsNew.first_name + ' ' : '') +
          (this.fildsNew.last_name ? this.fildsNew.last_name + ' ' : '') +
          (this.fildsNew.middle_name ? this.fildsNew.middle_name + ' ' : '') +
          '(' +
          this.fildsNew.iin_bin +
          ')';

        this.fildsList.push({
          id: this.fildsNew.id,
          name: name,
          iin_bin: this.fildsNew.iin_bin,
          company: {
            id: this.fildsNew.id,
            first_name: this.fildsNew.first_name,
            last_name: this.fildsNew.last_name,
            middle_name: this.fildsNew.middle_name,
            name_company: this.fildsNew.name_company,
            iin_bin: this.fildsNew.iin_bin,
          },
          fishs: [],
          rating: '',
          coefficient: '',
          quotaSum: 0,
        });

        //this.userQuotaFildNew(this.fildsNew.id, this.fildsIndex);
        let fishs = [];
        if (this.fildsZeroList) {
          this.fildsZeroList.find((elementZero) => {
            if (elementZero.fishs) {
              elementZero.fishs.find((e) => {
                let fish = null;
                fish = e.fish;
                fish.value = '';
                fishs.push({
                  fish: fish,
                  value: fish.value,
                });
              });
            }
          });
        }
        this.fildsList[index].fishs = fishs;

        this.quotaSum.push(0);
        this.fildsIndex = this.fildsList.length;
        this.fildsNew = null;
      }
    },
    addZoroFild() {
      let iinTrue = true;
      this.fildsZeroList.find((element) => {
        if (element.id == this.fildsZoro.id) iinTrue = false;
      });

      if (iinTrue && this.fildsZoro) {
        let name =
          (this.fildsZoro.first_name ? this.fildsZoro.first_name + ' ' : '') +
          (this.fildsZoro.last_name ? this.fildsZoro.last_name + ' ' : '') +
          (this.fildsZoro.middle_name ? this.fildsZoro.middle_name + ' ' : '') +
          '(' +
          this.fildsZoro.iin_bin +
          ')';

        this.fildsZeroList.push({
          id: this.fildsZoro.id,
          name: name,
          iin_bin: this.fildsZoro.iin_bin,
          company: {
            id: this.fildsZoro.id,
            first_name: this.fildsZoro.first_name,
            last_name: this.fildsZoro.last_name,
            middle_name: this.fildsZoro.middle_name,
            name_company: this.fildsZoro.name_company,
            iin_bin: this.fildsZoro.iin_bin,
          },
          fishs: [],
          rating: '',
          coefficient: '',
          quotaSum: 0,
        });

        this.userQuotaFild(this.fildsZoro.id, this.fildsZeroIndex);

        this.fildsZeroIndex = this.fildsZeroList.length;
        this.fildsZoro = '';
      }
    },
    deleteFild(index) {
      this.fildsList.splice(index, 1);
      this.fildsIndex = this.fildsList.length;

      this.quotaFish[index] = null;
      this.quotaValue[index] = '';
      this.sumQuota();
    },
    userQuotaFild(userId, index) {
      api
        .get('quota/user', {
          params: {
            id: this.$route.params.id,
            pond_id: this.reservoirsValue.id,
            user_id: userId,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            let fishs = [];
            response.data.find((element) => {
              let fish = this._getFishes.find((f) => {
                if (f.id == element.fish_id) return f;
              });
              fishs.push({
                fish: fish,
                value: Number(element.value),
              });
            });

            this.fildsZeroList[index].fishs = fishs;
          }
        });
    },
    userQuotaFildNew(userId, index) {
      let resourse = null;
      api
        .get('quota/user', {
          params: {
            id: this.$route.params.id,
            pond_id: this.reservoirsValue.id,
            user_id: userId,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            resourse = response.data;
          }
        });
      let fishs = [];

      if (this.fildsZeroList) {
        this.fildsZeroList.find((elementZero) => {
          if (elementZero.fishs) {
            elementZero.fishs.find((e) => {
              let fish = null;
              if (resourse) {
                fish = resourse.find((element) => {
                  if (e.fish.id == element.fish_id) {
                    let eFish = e;
                    eFish.value = element.value;
                    return eFish;
                  }
                });
              }
              if (!fish) {
                fish = e.fish;
                fish.value = '';
              }
              fishs.push({
                fish: fish,
                value: fish.value,
              });
            });
          }
        });
      }

      this.fildsList[index].fishs = fishs;
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

      if (this.reservoirsValue) {
        formData.append('pond_id', this.reservoirsValue.id);
      }

      if (this.fildsZeroList) {
        this.fildsZeroList.find((element, index) => {
          element.fishs.find((fish) => {
            formData.append('zero[' + element.id + '][' + fish.fish.id + ']', fish.value);
          });
        });
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
        .post('quota-reverse/' + this.$route.params.id + '/create', formData, {
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
              path:
                '/' +
                this.$i18n.locale +
                '/account/quotas-reverse/' +
                this.$route.params.id +
                '/list',
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
