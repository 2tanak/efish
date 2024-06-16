<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader': !_getRegionList || !_getPondList || !application,
    }"
  >
    <v-preloader
      v-if="!_getRegionList || !_getPondList || !application"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="_getRegionList && _getPondList && application">
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
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="name"
                              :value="application.name"
                              disabled
                              placeholder="Наименование"
                            />
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
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="name"
                              :value="
                                userValue.first_name +
                                ' ' +
                                userValue.last_name +
                                ' ' +
                                userValue.middle_name +
                                '\(' +
                                userValue.iin_bin +
                                ')'
                              "
                              disabled
                              placeholder="Пользователь"
                            />
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
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="name"
                              :value="regionValue.values[0].value"
                              disabled
                              placeholder="Наименование"
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
                              required=""
                              name="name"
                              :value="pondValue.values[0].value"
                              disabled
                              placeholder="Наименование"
                            />
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
                        <div class="col-xl-5">
                          <div class="form__line--input form__block--input">
                            <a
                              :href="urlApi + fileDocuments.file"
                              class="form__line--file form__line--link"
                              target="_blank"
                              download="download"
                            >
                              <div class="form__file form__file--center">
                                <div class="form__file--icon">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M20 16.2C20.7844 15.6572 21.3761 14.8791 21.6895 13.9781C22.0029 13.0771 22.0219 12.0998 21.7437 11.1873C21.4655 10.2748 20.9045 9.4743 20.1418 8.90141C19.379 8.32852 18.4539 8.01286 17.5 8H15.7C15.3977 6.98027 14.867 6.04284 14.1483 5.25889C13.4295 4.47493 12.5415 3.86508 11.5518 3.47563C10.5621 3.08618 9.49665 2.92739 8.43638 3.0113C7.37611 3.09522 6.3489 3.41963 5.43277 3.95992C4.51663 4.5002 3.73566 5.24215 3.14916 6.12941C2.56266 7.01666 2.18605 8.0259 2.04793 9.08048C1.90982 10.1351 2.01383 11.2072 2.35207 12.2156C2.69031 13.224 3.25389 14.142 3.99999 14.9"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M12 12V21"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M8 17L12 21L16 17"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </div>
                                <div class="form__file--text">Скачать файл</div>
                              </div>
                            </a>
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

import { api, urlApi } from '@/boot/axios';

export default {
  data() {
    return {
      urlApi: urlApi,
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      application: null,

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
  watch: {
    applicationsList: {
      handler() {
        this.dataItem();
      },
    },
  },
  computed: {
    ...mapGetters(['_getRegionList', '_getPondList']),
    applicationsList() {
      const { application, _getRegionList, _getPondList } = this;
      return { application, _getRegionList, _getPondList };
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList', '_fetchPondList']),
    dataItem() {
      if (this.application && this._getRegionList && this._getPondList) {
        this.regionValue = this._getRegionList.find((element) => {
          if (element.id == this.application.region_id) {
            return element;
          }
        });
        this.pondValue = this._getPondList.find((element) => {
          if (element.id == this.application.pond_id) {
            return element;
          }
        });
      }
    },
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
      formData.append('document', this.fileDocuments.file);
      api
        .post('power-reservoir/' + this.$route.params.id, formData)
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
    apiGetPower() {
      api
        .get('power-reservoir/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.application = response.data;

            this.userValue = this.application.user;
            this.fileDocuments.file = this.application.document;
            this.fileDocuments.fileName = this.application.document;
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
    this.apiGetPower();
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
