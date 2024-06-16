<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader': !_getFishes || !_getGuns || !_getPondList,
    }"
  >
    <v-preloader
      v-if="!_getFishes || !_getGuns || !_getPondList"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="_getFishes && _getGuns && _getPondList">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['PermissionCreateManagement']"></v-sidebar>
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
                    <div class="content__title--text">Заявка на разрешение на вылов</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Номер</div>
                    </div>
                    <div class="form__line--right">
                      <div class="col-xl-5">
                        <div
                          class="form__line--input"
                          :class="[
                            errorMessage.messages && errorMessage.messages.code
                              ? 'input--error'
                              : '',
                          ]"
                        >
                          <input
                            type="text"
                            class="input-linck"
                            required=""
                            name="code"
                            value=""
                            placeholder="Номер"
                          />
                        </div>
                        <div
                          class="input-required"
                          v-if="errorMessage.messages && errorMessage.messages.code"
                        >
                          <p v-for="massage in errorMessage.messages.code">{{ massage }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование</div>
                    </div>
                    <div class="form__line--right">
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
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">ИИН/БИН</div>
                    </div>
                    <div class="form__line--right">
                      <div class="col-xl-5">
                        <div
                          class="form__line--input"
                          :class="[
                            errorMessage.messages && errorMessage.messages.user_iin
                              ? 'input--error'
                              : '',
                          ]"
                        >
                          <input
                            type="text"
                            class="input-linck"
                            required=""
                            name="user_iin"
                            value=""
                            placeholder="ИИН/БИН"
                          />
                        </div>
                        <div
                          class="input-required"
                          v-if="errorMessage.messages && errorMessage.messages.user_iin"
                        >
                          <p v-for="massage in errorMessage.messages.user_iin">{{ massage }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Дата заявки</div>
                    </div>
                    <div class="form__line--right">
                      <div class="col-xl-5">
                        <div
                          class="form__line--input"
                          :class="[
                            errorMessage.messages && errorMessage.messages.date_at
                              ? 'input--error'
                              : '',
                          ]"
                        >
                          <input
                            type="date"
                            class="input-linck"
                            required=""
                            name="date_at"
                            value=""
                            placeholder="Дата"
                          />
                        </div>
                        <div
                          class="input-required"
                          v-if="errorMessage.messages && errorMessage.messages.date_at"
                        >
                          <p v-for="massage in errorMessage.messages.date_at">{{ massage }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Данные</div>
                    </div>
                    <div class="form__line--right">
                      <div class="col-xl-5">
                        <div
                          class="form__line--input"
                          :class="[
                            errorMessage.messages && errorMessage.messages.data
                              ? 'input--error'
                              : '',
                          ]"
                        >
                          <textarea
                            class="input-linck"
                            required=""
                            name="data"
                            placeholder="Данные"
                          ></textarea>
                        </div>
                        <div
                          class="input-required"
                          v-if="errorMessage.messages && errorMessage.messages.data"
                        >
                          <p v-for="massage in errorMessage.messages.data">{{ massage }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование региона</div>
                    </div>
                    <div class="form__line--right">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <multiselect
                            required=""
                            v-model="regionValue"
                            :options="formList.region"
                            track-by="id"
                            label="name"
                            placeholder="Выберите региона"
                            class="multiselect__check"
                          >
                            <template slot="singleLabel" slot-scope="{ option }">{{
                              option.values[0].value
                            }}</template>
                            <template slot="noOptions">Регион не найден</template>
                            <template slot="noResult">{{ $t('components.not_found') }}</template>
                          </multiselect>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование водоема</div>
                    </div>
                    <div class="form__line--right">
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
                            <template slot="noOptions">Водоем не найден</template>
                            <template slot="noResult">{{ $t('components.not_found') }}</template>
                          </multiselect>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="form__line" />

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Виды и количество использованных орудий лова
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-7">
                          <div class="quota-fish__line" v-for="(gear, gearIndex) in gearsList">
                            <div class="form__line--input">
                              <div class="row align-items-center">
                                <div class="col-xl-10">
                                  <div class="quota-fish__item">
                                    <div class="row align-items-center">
                                      <div class="col-xl-7">
                                        <div class="form__line--input">
                                          <multiselect
                                            required=""
                                            v-model="gear.gear"
                                            :options="_getGuns"
                                            :preserve-search="true"
                                            track-by="id"
                                            label="name"
                                            placeholder="Выберите рыбу"
                                            class="multiselect__check"
                                          >
                                            <template slot="singleLabel" slot-scope="{ option }">{{
                                              option.name
                                            }}</template>
                                            <template slot="noResult">{{
                                              $t('components.not_found')
                                            }}</template>
                                          </multiselect>
                                        </div>
                                      </div>
                                      <div class="col-xl-5">
                                        <div class="form__line--input">
                                          <input
                                            type="number"
                                            step=".01"
                                            min="0"
                                            class="input-linck"
                                            v-model="gear.value"
                                            placeholder="0"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-xl-2">
                                  <div class="input__block--add">
                                    <a
                                      @click="deleteFildGear(gearIndex)"
                                      v-tooltip.right="{
                                        content: 'Удалить рыбу',
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
                            </div>
                          </div>
                          <!-- /.quota-fish__line -->

                          <div class="quota-fish__line">
                            <div class="form__line--input">
                              <div class="row align-items-center">
                                <div class="col-xl-10">
                                  <div class="quota-fish__item">
                                    <div class="row align-items-center">
                                      <div class="col-xl-7">
                                        <div class="form__line--input">
                                          <multiselect
                                            required=""
                                            v-model="tradeGears"
                                            :options="_getGuns"
                                            :preserve-search="true"
                                            track-by="id"
                                            label="name"
                                            placeholder="Выберите рыбу"
                                            class="multiselect__check"
                                          >
                                            <template slot="singleLabel" slot-scope="{ option }">{{
                                              option.name
                                            }}</template>
                                            <template slot="noResult">{{
                                              $t('components.not_found')
                                            }}</template>
                                          </multiselect>
                                        </div>
                                      </div>
                                      <div class="col-xl-5">
                                        <div class="form__line--input">
                                          <input
                                            type="number"
                                            step=".01"
                                            min="0"
                                            class="input-linck"
                                            v-model="tradeGearsValue"
                                            placeholder="0"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-xl-2">
                                  <div class="input__block--add">
                                    <a
                                      @click="addFildGear()"
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
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Видовой состав улова, виды рыб / тон.</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-7">
                          <div class="quota-fish__line" v-for="(fish, fishIndex) in fildsList">
                            <div class="form__line--input">
                              <div class="row align-items-center">
                                <div class="col-xl-10">
                                  <div class="quota-fish__item">
                                    <div class="row align-items-center">
                                      <div class="col-xl-7">
                                        <div class="form__line--input">
                                          <multiselect
                                            required=""
                                            v-model="fish.fish"
                                            :options="formList.fish"
                                            :preserve-search="true"
                                            track-by="id"
                                            label="name"
                                            placeholder="Выберите рыбу"
                                            class="multiselect__check"
                                          >
                                            <template slot="singleLabel" slot-scope="{ option }">{{
                                              option.values[0].value
                                            }}</template>
                                            <template slot="noResult">{{
                                              $t('components.not_found')
                                            }}</template>
                                          </multiselect>
                                        </div>
                                      </div>
                                      <div class="col-xl-5">
                                        <div class="form__line--input">
                                          <input
                                            type="number"
                                            step=".01"
                                            min="0"
                                            class="input-linck"
                                            v-model="fish.value"
                                            placeholder="0"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-xl-2">
                                  <div class="input__block--add">
                                    <a
                                      @click="deleteFildFish(fishIndex)"
                                      v-tooltip.right="{
                                        content: 'Удалить рыбу',
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
                            </div>
                          </div>

                          <div class="quota-fish__line">
                            <div class="form__line--input">
                              <div class="row align-items-center">
                                <div class="col-xl-10">
                                  <div class="quota-fish__item">
                                    <div class="row align-items-center">
                                      <div class="col-xl-7">
                                        <div class="form__line--input">
                                          <multiselect
                                            required=""
                                            v-model="tradeFish"
                                            :options="formList.fish"
                                            :preserve-search="true"
                                            track-by="id"
                                            label="name"
                                            placeholder="Выберите рыбу"
                                            class="multiselect__check"
                                          >
                                            <template slot="singleLabel" slot-scope="{ option }">{{
                                              option.values[0].value
                                            }}</template>
                                            <template slot="noResult">{{
                                              $t('components.not_found')
                                            }}</template>
                                          </multiselect>
                                        </div>
                                      </div>
                                      <div class="col-xl-5">
                                        <div class="form__line--input">
                                          <input
                                            type="number"
                                            step=".01"
                                            min="0"
                                            class="input-linck"
                                            v-model="tradeFishValue"
                                            placeholder="0"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-xl-2">
                                  <div class="input__block--add">
                                    <a
                                      @click="addFildFish()"
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

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
      gearsList: [],
      tradeGears: null,
      tradeGearsValue: null,

      regionValue: null,
      reservoirsValue: null,

      fildsList: [],
      tradeFish: null,
      tradeFishValue: null,
    };
  },
  computed: {
    ...mapGetters(['_getRegionList', '_getPondList', '_getFishes', '_getGuns']),
    formList() {
      let pondList = [];
      pondList = this._getPondList.filter((element) => {
        if (this.regionValue && this.regionValue.links) {
          return this.regionValue.links.find((selected) => {
            return element.id == selected.item_id ? true : false;
          });
        }
      });

      let list = {
        region: this._getRegionList,
        pond: pondList,
        fish: this._getFishes,
      };
      return list;
    },
  },

  methods: {
    ...mapActions(['_fetchRegionList', '_fetchPondList', '_fetchFishes', '_fetchGuns']),
    addFildFish() {
      let fishTrue = true;
      if (!this.tradeFish || this.tradeFish == undefined) fishTrue = false;
      if (fishTrue) {
        this.fildsList.find((element) => {
          if (element.fish.id == this.tradeFish.id) fishTrue = false;
        });
      }

      if (this.tradeFishValue != 0 && this.tradeFishValue != undefined && fishTrue) {
        this.fildsList.push({
          fish: this.tradeFish,
          value: Number(this.tradeFishValue),
        });

        this.tradeFish = null;
        this.tradeFishValue = null;
      }
    },
    deleteFildFish(fishIndex) {
      this.fildsList.splice(fishIndex, 1);
    },
    addFildGear() {
      let fishTrue = true;
      if (!this.tradeGears || this.tradeGears == undefined) fishTrue = false;
      if (fishTrue) {
        this.gearsList.find((element) => {
          if (element.gear.id == this.tradeGears.id) fishTrue = false;
        });
      }

      if (this.tradeGearsValue != 0 && this.tradeGearsValue != undefined && fishTrue) {
        this.gearsList.push({
          gear: this.tradeGears,
          value: Number(this.tradeGearsValue),
        });

        this.tradeGears = null;
        this.tradeGearsValue = null;
      }
    },
    deleteFildGear(fishIndex) {
      this.gearsList.splice(fishIndex, 1);
    },
    onSubmit(evt) {
      this.message.status = null;
      this.message.text = null;
      this.message.texts = null;

      const formData = new FormData(evt.target);

      let fishIndex = 0;
      if (this.fildsList) {
        this.fildsList.find((element, index) => {
          formData.append('fish[' + fishIndex + '][fish_id]', element.fish.id);
          formData.append('fish[' + fishIndex + '][value]', element.value);
          fishIndex++;
        });
      }
      if (this.tradeFish && this.tradeFishValue && this.tradeFishValue != 0) {
        formData.append('fish[' + fishIndex + '][fish_id]', this.tradeFish.id);
        formData.append('fish[' + fishIndex + '][value]', this.tradeFishValue);
      }

      let gearIndex = 0;
      if (this.gearsList) {
        this.gearsList.find((element, index) => {
          formData.append('gear[' + gearIndex + '][gear_id]', element.gear.id);
          formData.append('gear[' + gearIndex + '][value]', element.value);
          gearIndex++;
        });
      }
      if (this.tradeGears && this.tradeGearsValue && this.tradeGearsValue != 0) {
        formData.append('gear[' + gearIndex + '][gear_id]', this.tradeGears.id);
        formData.append('gear[' + gearIndex + '][value]', this.tradeGearsValue);
      }

      formData.append('region', this.regionValue.id);
      formData.append('pond', this.reservoirsValue.id);

      api
        .post('permission-application/create', formData)
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
            this.$router.push({
              path: '/' + this.$i18n.locale + '/account/permission-list/' + response.data.data.id,
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
          this.errorMessage.messages = error.response.data.error_messages;
        });
    },
  },
  beforeMount() {
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
