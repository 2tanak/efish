<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader': !_getPools || !_getFishes || !_getPondList || !_getRegionList,
    }"
  >
    <v-preloader
      v-if="!_getPools || !_getFishes || !_getPondList || !_getRegionList"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="_getPools && _getFishes && _getPondList && _getRegionList">
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
                              <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
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
                      <div class="form__line--title">Наименование Лимита</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <multiselect
                              required=""
                              v-model="limitValue"
                              :options="limitList"
                              :preserve-search="true"
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line" v-if="formList.region">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование региона</div>
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

                  <div class="form__line">
                    <div class="form__line--left"></div>
                    <div class="form__line--right">
                      <div class="input__row">
                        <a class="input-btn form__line--btn" disabled=""> Активировать </a>
                        <button class="input-btn form__line--btn">
                          {{ $t('button.save') }}
                        </button>
                        <!--
                        <a class="input-btn form__line--btn form__btn--border form__line--btn-blue" disabled="">
                          Отправить в ГО
                        </a>
                        <a class="input-btn form__line--btn form__btn--border" disabled="">
                          Отправить в МИО
                        </a>
                        -->
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
      regionValue: null,
      poolValue: null,
      reservoirsValue: null,

      quotaFish: [],
      quotaValue: [],
      quotaSum: [],
      finalSum: 0,

      limitValue: null,
      limitList: [],

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

  computed: {
    ...mapGetters(['_getRegionList', '_getPondList', '_getPools', '_getFishes']),
    formList() {
      let regionList = [];
      if (!this.$store.state.userObject.regions.length) {
        regionList = this._getRegionList.filter((element) => {
          if (this.poolValue && this.poolValue.links) {
            return this.poolValue.links.find((selected) => {
              return element.id == selected.item_id ? true : false;
            });
          }
          return true;
        });
      } else {
        let regionAllList = this._getRegionList.filter((element) => {
          return this.$store.state.userObject.regions.find((selected) => {
            return selected.region_id == element.id ? true : false;
          });
        });
        regionList = regionAllList.filter((element) => {
          if (this.poolValue && this.poolValue.links) {
            return this.poolValue.links.find((selected) => {
              return element.id == selected.item_id ? true : false;
            });
          }
          return true;
        });
        if (this.$store.state.userObject.regions.length && regionList.length == 1) {
          this.regionValue = regionList[0];
          regionList = null;
        }
      }

      let list = {
        pool: this._getPools,
        region: regionList,
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList', '_fetchPondList', '_fetchPools', '_fetchFishes']),
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

      if (this.regionValue) {
        formData.append('region_id', this.regionValue.id); //this.pondModel.id
      }
      if (this.limitValue) {
        formData.append('limit_id', this.limitValue.id); //this.pondModel.id
      }

      api
        .post('quota/create', formData, {
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
              path: '/' + this.$i18n.locale + '/account/quotas/' + response.data.data.id + '/list',
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
    this._fetchPondList();
    this._fetchPools();
    this._fetchRegionList();
    this._fetchFishes();
    this.apiGetLimitList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
