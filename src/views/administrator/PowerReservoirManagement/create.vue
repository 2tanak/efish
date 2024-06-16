<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader': !_getRegionList || !_getPondList,
    }"
  >
    <v-preloader v-if="!_getRegionList || !_getPondList" :message="errorMessage"></v-preloader>

    <div class="container" v-if="_getRegionList && _getPondList">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['PowerReservoirManagement']"></v-sidebar>
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
                      {{ $t('sidebar.power_reservoir') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование</div>
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
                      <div class="form__line--title">Пользователь</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.user
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <UserAsyncList
                              v-model="userValue"
                              :value="userValue"
                              placeholder="Выберите пользователя"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.user"
                          >
                            <p v-for="massage in errorMessage.messages.user">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Регион</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <multiselect
                              required=""
                              v-model="regionValue"
                              :options="formList.region || []"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              placeholder="Выберите регион"
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
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование водоема</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <multiselect
                              required=""
                              v-model="pondValue"
                              :options="formList.pond || []"
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
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Файл</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-7">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.document
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <label class="form__line--file" :class="fileDocuments.fileClass">
                              <input
                                type="file"
                                ref="fileDocuments"
                                name="fileDocuments"
                                accept=".jpeg,.png,.jpg,.pdf,.doc,.docx"
                                v-on:change="handleFileUpload()"
                              />
                              <div class="form__file" v-if="fileDocuments.fileName">
                                <div class="form__file--text">
                                  {{ fileDocuments.fileName }}
                                </div>
                              </div>
                              <div class="form__file" v-else>
                                <div class="form__file--text">Загрузить файл</div>
                                <div class="form__file--icon">
                                  <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 17 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M14.1667 11.475C14.7223 11.0905 15.1414 10.5393 15.3634 9.90114C15.5854 9.26293 15.5989 8.57067 15.4018 7.92432C15.2047 7.27797 14.8074 6.71097 14.2671 6.30517C13.7268 5.89937 13.0715 5.67578 12.3958 5.66667H11.1208C10.9067 4.94437 10.5308 4.28035 10.0217 3.72505C9.51255 3.16975 8.88358 2.73777 8.18253 2.46191C7.48148 2.18605 6.72679 2.07357 5.97576 2.13301C5.22474 2.19245 4.49713 2.42225 3.84821 2.80495C3.19928 3.18765 2.64609 3.71319 2.23065 4.34167C1.81521 4.97014 1.54844 5.68502 1.45061 6.43202C1.35278 7.17901 1.42646 7.93847 1.66605 8.65273C1.90563 9.36699 2.30483 10.0173 2.83332 10.5542"
                                      stroke="white"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M8.5 8.5V14.875"
                                      stroke="white"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M5.66669 12.0417L8.50002 14.875L11.3334 12.0417"
                                      stroke="white"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </label>
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.document"
                          >
                            <p v-for="massage in errorMessage.messages.document">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left"></div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
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
import UserAsyncList from '@/components/catalog/UserAsyncList.vue';

export default {
  components: {
    Multiselect,
    UserAsyncList,
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

      regionValue: null,

      pondValue: null,

      userValue: null,

      fileDocuments: {
        file: null,
        fileName: '',
        fileClass: '',
      },
    };
  },
  computed: {
    ...mapGetters(['_getRegionList', '_getPondList']),
    formList() {
      let pondList = [];
      pondList = this._getPondList.filter((element) => {
        if (this.regionValue && this.regionValue.links) {
          return this.regionValue.links.find((selected) => {
            return element.id == selected.item_id ? true : false;
          });
        }
        return false;
      });

      let list = {
        region: this._getRegionList,
        pond: pondList,
      };
      return list;
    },
  },

  methods: {
    ...mapActions(['_fetchRegionList', '_fetchPondList']),
    handleFileUpload() {
      this.message.status = null;
      this.message.text = null;
      this.message.texts = null;
      this.errorMessage = {
        status: null,
        text: null,
        messages: null,
      };
      this.fileDocuments.file = this.$refs.fileDocuments.files[0];
      this.fileDocuments.fileName = this.$refs.fileDocuments.files[0].name;
      this.fileDocuments.fileClass = 'add_tourist--success';
    },
    onSubmit(evt) {
      this.message.status = null;
      this.message.text = null;
      this.message.texts = null;

      const formData = new FormData(evt.target);
      if (this.regionValue) {
        formData.append('region_id', this.regionValue.id); //this.pondModel.id
      }
      if (this.pondValue) {
        formData.append('pond_id', this.pondValue.id); //this.pondModel.id
      }
      if (this.userValue) {
        formData.append('user_id', this.userValue.id); //this.pondModel.id
      }
      if (this.fileDocuments.file) {
        formData.append('document', this.fileDocuments.file);
      }
      api
        .post('power-reservoir/create', formData)
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
            this.$router.push({
              path: '/' + this.$i18n.locale + '/account/power-reservoir/' + response.data.data.id,
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
