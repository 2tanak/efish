<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader': !permissions || !$store.state.userObject,
    }"
  >
    <v-preloader
      v-if="!permissions || !$store.state.userObject"
      :message="errorMessage"
    ></v-preloader>

    <div v-if="permissions && $store.state.userObject" class="container">
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
                  <!-- @submit.prevent="onSubmit" -->

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
                            <input type="text" class="input-linck" required="" name="name" value="" ref="name" placeholder="Наименование">
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
                            <multiselect
                              required=""
                              v-model="permission"
                              :options="permissions"
                              :preserve-search="true"
                              track-by="id"
                              label="code"
                              placeholder="Выберите разрешение"
                              class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.code
                              }}</template>
                              <template slot="noOptions">{{
                                $t('components.permissions_not_found')
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="form__line" />

                  <div v-if="permissionData">
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
                                type="date"
                                class="input-linck"
                                required=""
                                :min="catchFrom"
                                :max="catchTo"
                                ref="catch_at"
                                name="catch_at"
                                value=""
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
                                :value="permissionData.region.value"
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
                                :value="permissionData.pond.value"
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
                                type="number"
                                step="1"
                                min="0"
                                class="input-linck"
                                required=""
                                ref="fishermen"
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
                              v-for="(gear, gearIndex) in permissionData.gears"
                              :key="gearIndex"
                            >
                              <div class="form__line--input">
                                <div class="row align-items-center">
                                  <div class="col-xl-12">
                                    <div
                                      class="quota-fish__item"
                                      :class="[
                                        errorMessage.messages && errorMessage.messages.gear
                                          ? 'input--error'
                                          : '',
                                      ]"
                                    >
                                      <div class="row align-items-center">
                                        <div class="col-xl-8">
                                          <div class="form__line--input">
                                            <input
                                              type="text"
                                              class="input-linck"
                                              :value="gear.catalog_entry.value"
                                              disabled
                                            />
                                            <input
                                              type="hidden"
                                              :name="'gear[' + gear.gear_id + '][gear_id]'"
                                              :ref="'gear'"
                                              :data-id="gear.gear_id"
                                              :value="gear.gear_id"
                                            />
                                          </div>
                                        </div>
                                        <div class="col-xl-4">
                                          <div class="form__line--input">
                                            <input
                                              type="number"
                                              step="1"
                                              min="1"
                                              :max="gear.value"
                                              :name="'gear[' + gear.gear_id + '][value]'"
                                              :ref="'gear'"
                                              :data-id="gear.gear_id"
                                              class="input-linck"
                                              :placeholder="gear.value"
                                              v-model="gear.quantity"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      class="input-required"
                                      v-if="errorMessage.messages && errorMessage.messages.gear"
                                    >
                                      <p>{{ errorMessage.messages.gear[gear.gear_id] }}</p>
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
                        <div class="form__line--title">Видовой состав улова, виды рыб / тон.</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-8">
                            <div
                              class="quota-fish__line"
                              v-for="(fish, fishIndex) in permissionData.fishs"
                              :key="fishIndex"
                            >
                              <div class="form__line--input">
                                <div class="row align-items-center">
                                  <div class="col-xl-12">
                                    <div
                                      class="quota-fish__item"
                                      :class="[
                                        errorMessage.messages && errorMessage.messages.fish
                                          ? 'input--error'
                                          : '',
                                      ]"
                                    >
                                      <div class="row align-items-center">
                                        <div class="col-xl-8">
                                          <div class="form__line--input">
                                            <input
                                              type="text"
                                              class="input-linck"
                                              :value="fish.catalog_entry.value"
                                              disabled
                                            />
                                            <input
                                              type="hidden"
                                              :name="'fish[' + fish.fish_id + '][fish_id]'"
                                              :ref="'fish'"
                                              :data-id="fish.fish_id"
                                              :value="fish.fish_id"
                                            />
                                          </div>
                                        </div>
                                        <div class="col-xl-4">
                                          <div class="form__line--input">
                                            <input
                                              type="number"
                                              step=".01"
                                              min="0"
                                              :max="fish.value"
                                              :name="'fish[' + fish.fish_id + '][value]'"
                                              :ref="'fish'"
                                              :data-id="fish.fish_id"
                                              class="input-linck"
                                              v-model="permissionAmount[fishIndex]"
                                              :placeholder="fish.value"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      class="input-required"
                                      v-if="errorMessage.messages && errorMessage.messages.fish"
                                    >
                                      <p>{{ errorMessage.messages.fish[fish.fish_id] }}</p>
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
                                type="number"
                                step=".01"
                                min="0"
                                class="input-linck"
                                required=""
                                ref="catch_size"
                                :value="amount"
                                disabled
                                name="catch_size"
                                placeholder="0"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.catch_size"
                            >
                              <p
                                v-for="(massage, massageInd) in errorMessage.messages.catch_size"
                                :key="massageInd"
                              >
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
                              <input type="number" step=".01" min="0" class="input-linck" required="" name="released_size" placeholder="0">
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
                              <input type="date" class="input-linck" required="" name="shipment_at" value="" placeholder="Дата отгрузки">
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
                              <input type="text" class="input-linck" required="" name="consignment_number" value="" placeholder="№ накладной">
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
                              <input type="text" class="input-linck" required="" name="transport_number" value="" placeholder="№ автомашины, судна">
                            </div>
                            <div class="input-required" v-if="errorMessage.messages && errorMessage.messages.transport_number"><p v-for="massage in errorMessage.messages.transport_number">{{ massage }}</p></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    -->

                    <div class="form__line">
                      <div class="form__line--left"></div>
                      <div class="form__line--right">
                        <!--
                        <div class="input__row">
                          <button class="input-btn form__line--btn ">
                            {{ $t('button.save') }}
                          </button>
                        </div>
                        -->
                        <div class="input__row">
                          <a class="input-btn form__line--btn" @click="validateFirm()">
                            <!-- v-if="applications.status != 'active' && applications.status != 'deleted'" -->
                            <!--Отправить в ГО(Территориальное подразделение)-->
                            Подписать
                          </a>
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
import Multiselect from 'vue-multiselect';
import { api } from '@/boot/axios';
import moment from 'moment';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      applicationPermission: null,
      permission: null,
      permissions: null,

      regionValue: null,
      reservoirsValue: null,
      gearValue: null,

      fildsList: [],
      tradeFish: null,
      tradeFishValue: null,

      gearsList: [],
      tradeGears: null,
      tradeGearsValue: null,

      permissionAmount: [],
      amount: 0,
      catchFrom: null,
      catchTo: null,

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
    permissionData() {
      if (this.applicationPermission) {
        this.applicationPermission.permission.fishs.find((element, index) => {
          this.applicationPermission.trade.find((trade) => {
            trade.fishs.find((fish) => {
              if (element.fish_id == fish.item.fish_id) {
                element.value = parseFloat(element.value) + parseFloat(fish.item.value);
              }
            });
          });
        });

        this.catchFrom = moment(this.applicationPermission.permission.catch_from).format(
          'YYYY-MM-DD',
        );
        if (
          moment(this.applicationPermission.permission.catch_to).format('YYYY-MM-DD') >
          new Date().toISOString().split('T')[0]
        ) {
          this.catchTo = new Date().toISOString().split('T')[0];
        } else {
          this.catchTo = moment(this.applicationPermission.permission.catch_to).format(
            'YYYY-MM-DD',
          );
        }

        return this.applicationPermission.permission;
      } else {
        return null;
      }
    },
  },
  watch: {
    permission: {
      handler() {
        this.apiGetPermissionTrade();
      },
    },
    permissionAmount: {
      handler() {
        this.sumTable();
      },
    },
  },
  methods: {
    validateFirm() {
      this.errorMessage.status = null;
      this.errorMessage.messages = null;
      this.errorMessage.text = null;

      let valid = false;
      let messages = {};
      /*if(this.$refs.name.value == '') {
        valid = true;
        messages.name = [this.$t('system_message.required_message')];
      }*/
      if (this.$refs.catch_at.value == '') {
        valid = true;
        messages.catch_at = [this.$t('system_message.required_message')];
      }
      if (this.$refs.fishermen.value == '') {
        valid = true;
        messages.fishermen = [this.$t('system_message.required_message')];
      }
      if (this.$refs.catch_size.value == '') {
        valid = true;
        messages.catch_size = [this.$t('system_message.required_message')];
      }

      messages.gear = [];
      this.$refs.gear.find((element) => {
        if (element.value == '') {
          valid = true;
          messages.gear[element.dataset.id] = this.$t('system_message.required_message');
        }
        if (element.max && Number(element.max) < Number(element.value)) {
          valid = true;
          messages.gear[element.dataset.id] = this.$t('system_message.max_message');
        }
      });
      messages.fish = [];
      this.$refs.fish.find((element) => {
        if (element.value == '') {
          valid = true;
          messages.fish[element.dataset.id] = this.$t('system_message.required_message');
        }
        if (element.max && Number(element.max) < Number(element.value)) {
          valid = true;
          messages.fish[element.dataset.id] = this.$t('system_message.max_message');
        }
      });

      if (valid) {
        this.errorMessage.messages = messages;
        this.errorMessage.status = 422;
        this.errorMessage.text = this.$t('system_message.form_error');
      } else {
        this.$modal.show('modal_head');
      }
    },

    sumTable() {
      let amount = 0;
      this.permissionAmount.find((element) => {
        if (element) {
          amount += Number(element);
        }
      });
      this.amount = amount;
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
          this.$modal.hide('modal_head');
        }
      };
    },

    onSubmit() {
      //evt

      this.message.status = null;
      this.message.text = null;
      this.message.texts = null;

      const formData = new FormData(); //evt.target

      formData.append('user_id', this.$store.state.userObject.id);
      formData.append('permission_id', this.permission.id);

      //formData.append('name', this.$refs.name.value);
      formData.append('catch_at', this.$refs.catch_at.value);
      formData.append('fishermen', this.$refs.fishermen.value);
      formData.append('catch_size', this.$refs.catch_size.value);

      this.$refs.gear.find((element) => {
        formData.append(element.name, element.value);
      });
      this.$refs.fish.find((element) => {
        formData.append(element.name, element.value);
      });

      formData.append('data', this.dataEcp || this.$configFile.xml);

      // if(this.regionValue){
      //   formData.append('region_id', this.regionValue.id);//this.pondModel.id
      // }
      // if(this.reservoirsValue){
      //   formData.append('pond_id', this.reservoirsValue.id);//this.pondModel.id
      // }

      api
        .post('trade/create', formData)
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
            this.$router.push({
              path: '/' + this.$i18n.locale + '/account/trade/' + response.data.data.id,
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
    apiGetPermissionTrade() {
      api
        .get('trade/permission/' + this.permission.id)
        .then((response) => {
          if (response.data) {
            this.applicationPermission = response.data;
            this.applicationPermission.permission.fishs.find((element, index) => {
              this.permissionAmount[index] = '';
            });
            this.applicationPermission.permission.gears.find((element, index) => {
              element.quantity = element.value;
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
          if (error?.response?.status == 403) {
            this.errorMessage.status = 403;
            this.errorMessage.text = error?.response?.data?.message;
          }
        });
    },
  },
  beforeMount() {
    this.apiGetPermissionList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>

<style scoped></style>
