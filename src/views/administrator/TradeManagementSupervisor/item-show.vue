<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader':
        !application ||
        !_getFishes ||
        !_getGuns ||
        !_getRegionList ||
        !_getPondList ||
        !$store.state.userObject,
    }"
  >
    <v-preloader
      v-if="
        !application ||
        !_getFishes ||
        !_getGuns ||
        !_getRegionList ||
        !_getPondList ||
        !$store.state.userObject
      "
      :message="errorMessage"
    ></v-preloader>

    <div
      class="container"
      v-if="
        application &&
        _getFishes &&
        _getGuns &&
        _getRegionList &&
        _getPondList &&
        $store.state.userObject
      "
    >
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['TradeManagementSupervisor']"></v-sidebar>
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
                      <!--                      Журнал учета лова рыбных ресурсов и других водных животных (промысловый журнал)-->
                      {{ $t('sidebar.trade_list') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST">
                  <!--@submit.prevent="onSubmit"-->

                  <!--<div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Наименование
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input" :class="[errorMessage.messages && errorMessage.messages.name ? 'input--error' : '']">
                            <input type="text" class="input-linck" required="" name="name" :value="application.name" disabled placeholder="Наименование">
                          </div>
                          <div class="input-required" v-if="errorMessage.messages && errorMessage.messages.name"><p v-for="massage in errorMessage.messages.name">{{ massage }}</p></div>
                        </div>
                      </div>
                    </div>
                  </div>-->

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Разрешение</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              :value="formList.permission"
                              disabled
                              placeholder="Значение"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="form__line" />

                  <div v-if="permission">
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Дата улова</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.catch_at
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                name="catch_at"
                                :value="application.catch_at | formatDate"
                                disabled
                                placeholder="Дата улова"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.catch_at"
                            >
                              <p v-for="massage in errorMessage.messages.catch_at">{{ massage }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Наименование региона</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="form__line--input">
                              <input
                                type="text"
                                class="input-linck"
                                :value="application.permission.region.value"
                                disabled
                                placeholder="Значение"
                              />
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
                            <div class="form__line--input">
                              <input
                                type="text"
                                class="input-linck"
                                :value="application.permission.pond.value"
                                disabled
                                placeholder="Значение"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr class="form__line" />

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Количество рыбаков, осуществивших улов</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-8">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.fishermen
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                step="1"
                                min="0"
                                class="input-linck"
                                required=""
                                :value="application.fishermen"
                                disabled
                                name="fishermen"
                                placeholder="0"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.fishermen"
                            >
                              <p v-for="massage in errorMessage.messages.fishermen">
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
                          Виды и количество использованных орудий лова
                        </div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-8">
                            <div
                              class="quota-fish__line"
                              v-for="(gear, gearIndex) in formList.gears"
                            >
                              <div class="form__line--input">
                                <div class="row align-items-center">
                                  <div class="col-xl-10">
                                    <div class="quota-fish__item">
                                      <div class="row align-items-center">
                                        <div class="col-xl-7">
                                          <div class="form__line--input">
                                            <input
                                              type="text"
                                              class="input-linck"
                                              v-model="gear.name"
                                              disabled
                                              placeholder="0"
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
                                              disabled
                                              v-model="gear.value"
                                              placeholder="0"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">
                          Видовой состав улова, виды рыб / тон.
                          <!--килограмм-->
                        </div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-8">
                            <div
                              class="quota-fish__line"
                              v-for="(fish, fishIndex) in formList.fish"
                            >
                              <div class="form__line--input">
                                <div class="row align-items-center">
                                  <div class="col-xl-10">
                                    <div class="quota-fish__item">
                                      <div class="row align-items-center">
                                        <div class="col-xl-7">
                                          <div class="form__line--input">
                                            <input
                                              type="text"
                                              class="input-linck"
                                              v-model="fish.name"
                                              disabled
                                              placeholder="0"
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
                                              disabled
                                              v-model="fish.value"
                                              placeholder="0"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Объем улова, тон</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-8">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.catch_size
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                :value="application.catch_size"
                                disabled
                                name="catch_size"
                                placeholder="0"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.catch_size"
                            >
                              <p v-for="massage in errorMessage.messages.catch_size">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!--
                    <hr class="form__line">

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">
                          Всего отпущено рыбы, тон.
                        </div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="form__line--input" :class="[errorMessage.messages && errorMessage.messages.released_size ? 'input--error' : '']">
                              <input type="text" class="input-linck" required="" :value="application.released_size" disabled name="released_size" placeholder="0">
                            </div>
                            <div class="input-required" v-if="errorMessage.messages && errorMessage.messages.released_size"><p v-for="massage in errorMessage.messages.released_size">{{ massage }}</p></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">
                          Дата отгрузки
                        </div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="form__line--input" :class="[errorMessage.messages && errorMessage.messages.shipment_at ? 'input--error' : '']">
                              <input type="text" class="input-linck" required="" name="shipment_at" :value="application.shipment_at | formatDate" disabled placeholder="Дата отгрузки">
                            </div>
                            <div class="input-required" v-if="errorMessage.messages && errorMessage.messages.shipment_at"><p v-for="massage in errorMessage.messages.shipment_at">{{ massage }}</p></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">
                          № накладной
                        </div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="form__line--input" :class="[errorMessage.messages && errorMessage.messages.consignment_number ? 'input--error' : '']">
                              <input type="text" class="input-linck" required="" name="consignment_number" :value="application.consignment_number" disabled placeholder="№ накладной">
                            </div>
                            <div class="input-required" v-if="errorMessage.messages && errorMessage.messages.consignment_number"><p v-for="massage in errorMessage.messages.consignment_number">{{ massage }}</p></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">
                          № автомашины, судна
                        </div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="form__line--input" :class="[errorMessage.messages && errorMessage.messages.transport_number ? 'input--error' : '']">
                              <input type="text" class="input-linck" required="" name="transport_number" :value="application.transport_number" disabled placeholder="№ автомашины, судна">
                            </div>
                            <div class="input-required" v-if="errorMessage.messages && errorMessage.messages.transport_number"><p v-for="massage in errorMessage.messages.transport_number">{{ massage }}</p></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    -->
                  </div>

                  <!--<hr class="form__line">-->
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

export default {
  data() {
    return {
      permission: null,
      permissions: null,

      application: null,

      regionValue: null,
      reservoirsValue: null,
      gearValue: null,

      fildsList: [],
      tradeFish: null,
      tradeFishValue: null,

      gearsList: [],
      tradeGears: null,
      tradeGearsValue: null,

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
    ...mapGetters(['_getRegionList', '_getPondList', '_getFishes', '_getGuns']),
    formList() {
      let permissionList = [];
      permissionList = this.permissions.find((element) => {
        if (this.application.permission_id == element.id) return true;
      });

      let gearsList = [];
      gearsList = this._getGuns.filter((element) => {
        return this.application.gears.find((e) => {
          if (e.gear_id == element.id) {
            element.value = e.value;
            return true;
          }
        });
      });

      let fishList = [];
      fishList = this._getFishes.filter((element) => {
        return this.application.fishsitem.find((e) => {
          if (e.fish_id == element.id) {
            element.value = String(e.value).substr(1);
            return true;
          }
        });
      });

      this.permission = permissionList;
      let list = {
        permission: permissionList.code,
        fish: fishList,
        gears: gearsList,
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList', '_fetchPondList', '_fetchFishes', '_fetchGuns']),
    apiGetTrade() {
      api
        .get('/user/' + this.$route.params.userId + '/trade/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.application = response.data;
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

    apiGetPermissionList() {
      api
        .get('user/' + this.$route.params.userId + '/permissions')
        .then((response) => {
          if (response.data) {
            this.permissions = response.data.data;
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
  },
  beforeMount() {
    this.apiGetPermissionList();
    this.apiGetTrade();
    this._fetchFishes();
    this._fetchGuns();
    this._fetchPondList();
    this._fetchRegionList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>

<style scoped></style>
