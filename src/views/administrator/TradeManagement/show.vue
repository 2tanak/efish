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
          <v-sidebar :active="['TradeManagement']"></v-sidebar>
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
                      Журнал учета лова рыбных ресурсов и других водных животных (промысловый
                      журнал)
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
                                              step="1"
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
                              v-for="(fish, fishIndex) in formList.fish"
                              :key="fishIndex"
                              class="quota-fish__line"
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

                  <!--
                  <hr class="form__line">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Подпись лица, принявшего улов
                      </div>
                    </div>
                    <div class="form__line--right">

                      <div class="input__row">
                        <a class="input-btn form__line--btn " @click="$modal.show('modal_head')" v-if="application.status != 'active' && application.status != 'deleted'">
                          Подписать
                        </a>
                      </div>

                      <div class="form__block--line form__messages " v-if="message.status" :class="{'form__messages--error': message.status != 200, 'form__messages--success': message.status == 200}">
                        <label class="form__block--input">
                      <span class="form__block--title">
                        {{ message.text }}
                      </span>
                        </label>
                      </div>
                      <div class="form__block--line form__messages " v-if="errorMessage.text" :class="{'form__messages--error': errorMessage.status != 200, 'form__messages--success': errorMessage.status == 200}">
                        <label class="form__block--input">
                      <span class="form__block--title">
                        {{ errorMessage.text }}
                      </span>
                        </label>
                      </div>

                    </div>
                  </div>
                  -->
                  <!--
                  <modal class="modal__block modal__block--middle modal__block--success"
                         name="modal_head"
                         :width="550"
                         :min-width="550"
                         height="auto"
                  >
                    <div class="modal__block--wrapper">
                      <div class="modal__block--close" @click="$modal.hide('modal_head')">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.5 7.5L7.5 22.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M7.5 7.5L22.5 22.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <div class="modal__wrapper">
                        <div class="modal__header">
                          <div class="modal__title">
                            Для сохранения журнала, необходимо подтверждение электронно цифровой подписью
                          </div>
                        </div>

                        <div class="modal__content">
                          <div class="modal__form">

                            <div class="block__row">
                              <div class="block__row--left">
                                <a class="block__item block__item--green" @click="saveElement">
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 18.3333C14.6025 18.3333 18.3334 14.6025 18.3334 9.99996C18.3334 5.39746 14.6025 1.66663 10 1.66663C5.39752 1.66663 1.66669 5.39746 1.66669 9.99996C1.66669 14.6025 5.39752 18.3333 10 18.3333Z" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7.5 10L9.16667 11.6667L12.5 8.33337" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                  Подписать ЭЦП
                                </a>
                              </div>
                              <div class="block__row--right">
                                <a class="block__item block__item--blue" @click="$modal.hide('modal_head')">
                                  {{ $t('button.cancel') }}
                                </a>
                              </div>
                            </div>
                            <div class="form__block--line form__messages " v-if="message.status" :class="{'form__messages--error': message.status != 200, 'form__messages--success': message.status == 200}">
                              <label class="form__block--input">
                                <span class="form__block--title">
                                  {{ message.text }}
                                </span>
                              </label>
                            </div>
                            <div class="form__block--line form__messages " v-if="errorMessage.text" :class="{'form__messages--error': errorMessage.status != 200, 'form__messages--success': errorMessage.status == 200}">
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
          if (e?.fish_id == element.id) {
            element.value = String(e.value).substr(1);
            return true;
          }
        });
      });

      this.permission = permissionList;

      let list = {
        permission: permissionList?.code,
        fish: fishList,
        gears: gearsList,
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList', '_fetchPondList', '_fetchFishes', '_fetchGuns']),
    saveElement() {
      if (this.$configFile.active) return this.sendEcpKey();
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
          this.sendEcpKey();
        }
      };
    },
    sendEcpKey() {
      api
        .post('trade/' + this.$route.params.id + '/activate', {
          data: this.dataEcp || this.$configFile.xml,
        })
        .then((response) => {
          if (response.status == 200) {
            this.$modal.hide('modal_head');
            this.message.status = 200;
            this.message.text = response.data.message;
            // this.$router.push({path: '/'+ this.$i18n.locale +'/account/trade/'+this.$route.params.id});
            this.apiGetTrade();
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
    apiGetTrade() {
      api
        .get('trade/' + this.$route.params.id)
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
        .get('user/permissions')
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
