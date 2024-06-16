<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 offset-lg-4">
          <div class="login__lang header__lang">
            <HeaderLang></HeaderLang>
          </div>
          <div class="header__logo login__logo">
            <div class="header__logo--left">
              <a :href="'/' + $i18n.locale + '/'">
                <img src="../assets/img/logo.svg" alt="" />
              </a>
            </div>
            <div class="header__logo--right">
              <div class="header__logo--title">
                {{ $t('site.logo.title') }}
              </div>
              <div class="header__logo--subtitle">
                {{ $t('site.logo.desc') }}
              </div>
            </div>
          </div>
          <div class="login__block registration__block">
            <div class="content__title--block">
              <div class="content__title section__title">{{ $t('site.registration.title') }}</div>
            </div>
            <div class="login__block--form">
              <div class="row">
                <div class="col-lg-12">
                  <div class="login__block--tab login__block--active">
                    <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                      <div class="form__block--line" v-if="!result">
                        <label
                          class="form__block--input"
                          :class="[
                            errorMessage.messages && errorMessage.messages.ecp
                              ? 'input--error'
                              : '',
                          ]"
                        >
                          <div class="form__file" @click="refisterPki">
                            <img src="../assets/img/icon-ecp.svg" />
                            {{ $t('site.registration.pki') }}
                          </div>
                        </label>
                        <div
                          class="input-required"
                          v-if="errorMessage.messages && errorMessage.messages.ecp"
                        >
                          <p>{{ errorMessage.messages.ecp }}</p>
                        </div>
                      </div>

                      <div v-if="result">
                        <div class="form__line form__line--column">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              {{ $t('site.registration.name') }}
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-12">
                                <div
                                  class="form__line--input form__block--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.first_name
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="text"
                                    class="input-linck"
                                    required=""
                                    name="first_name"
                                    v-model="result.data.commonName.split(' ')[1]"
                                    :placeholder="$t('site.registration.name')"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="errorMessage.messages && errorMessage.messages.first_name"
                                >
                                  <p
                                    v-for="(massage, massageInd) in errorMessage.messages
                                      .first_name"
                                    :key="massageInd"
                                  >
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line form__line--column">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              {{ $t('site.registration.last_name') }}
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-12">
                                <div
                                  class="form__line--input form__block--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.last_name
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="text"
                                    class="input-linck"
                                    required=""
                                    name="last_name"
                                    v-model="result.data.commonName.split(' ')[0]"
                                    :placeholder="$t('site.registration.last_name')"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="errorMessage.messages && errorMessage.messages.last_name"
                                >
                                  <p v-for="massage in errorMessage.messages.last_name">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line form__line--column">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              {{ $t('site.registration.middle_name') }}
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-12">
                                <div
                                  class="form__line--input form__block--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.middle_name
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="text"
                                    class="input-linck"
                                    name="middle_name"
                                    v-model="result.data.lastName"
                                    :placeholder="$t('site.registration.middle_name')"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="errorMessage.messages && errorMessage.messages.middle_name"
                                >
                                  <p v-for="massage in errorMessage.messages.middle_name">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="form__line form__line--column">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              {{ $t('site.registration.name_company') }}
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-12">
                                <div
                                  class="form__line--input form__block--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.name_company
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="text"
                                    class="input-linck"
                                    name="name_company"
                                    v-model="result.data.organization"
                                    :placeholder="$t('site.registration.name_company')"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="errorMessage.messages && errorMessage.messages.name_company"
                                >
                                  <p v-for="massage in errorMessage.messages.name_company">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line form__line--column">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              {{ $t('site.registration.iin_bin') }}
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="row">
                              <div class="col-xl-12">
                                <div
                                  class="form__line--input form__block--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.iin_bin
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="text"
                                    class="input-linck"
                                    name="iin_bin"
                                    disabled
                                    v-model="result.data.iin"
                                    :placeholder="$t('site.registration.iin_bin')"
                                  />
                                </div>
                                <div
                                  class="input-required"
                                  v-if="errorMessage.messages && errorMessage.messages.iin_bin"
                                >
                                  <p v-for="massage in errorMessage.messages.iin_bin">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="form__line form__line--column">
                        <div class="form__line--left">
                          <div class="form__line--title">
                            {{ $t('site.registration.email') }}
                          </div>
                        </div>
                        <div class="form__line--right">
                          <div class="row">
                            <div class="col-xl-12">
                              <div
                                class="form__line--input form__block--input"
                                :class="[
                                  errorMessage.messages && errorMessage.messages.email
                                    ? 'input--error'
                                    : '',
                                ]"
                              >
                                <input
                                  class="input-linck"
                                  type="text"
                                  name="email"
                                  v-model="result.data.email"
                                  :placeholder="$t('site.registration.email')"
                                  v-if="result && result.data"
                                />
                                <input
                                  class="input-linck"
                                  type="text"
                                  name="email"
                                  :placeholder="$t('site.registration.email')"
                                  v-else
                                />
                              </div>
                              <div
                                class="input-required"
                                v-if="errorMessage.messages && errorMessage.messages.email"
                              >
                                <p v-for="massage in errorMessage.messages.email">{{ massage }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="form__line form__line--column">
                        <div class="form__line--left">
                          <div class="form__line--title">
                            {{ $t('site.registration.contract') }}
                          </div>
                        </div>
                        <div class="form__line--right">
                          <div class="row">
                            <div class="col-xl-12">
                              <div
                                class="form__line--input form__block--input"
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
                                    accept=".pdf,.png,.jpg,.doc,.docx,.excel"
                                    v-on:change="handleFileUpload()"
                                  />
                                  <div class="form__file">
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
                                    <div class="form__file--text" v-if="fileDocuments.fileName">
                                      {{ fileDocuments.fileName }}
                                    </div>
                                    <div class="form__file--text" v-else>
                                      {{ $t('site.upload_file') }}
                                    </div>
                                  </div>
                                </label>
                              </div>
                              <div
                                class="input-required"
                                v-if="errorMessage.messages && errorMessage.messages.document"
                              >
                                <p v-for="massage in errorMessage.messages.document">
                                  {{ massage }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="form__line form__line--column">
                        <div class="form__line--left">
                          <div class="form__line--title">
                            {{ $t('site.registration.password') }}
                            <span
                              v-tooltip.top-center="{
                                content: $t('site.authorization.input.password_length'),
                                class: ['tooltip__btn'],
                              }"
                            >
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 19 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.04688 16.5807C13.189 16.5807 16.5469 13.2228 16.5469 9.08066C16.5469 4.93852 13.189 1.58066 9.04688 1.58066C4.90474 1.58066 1.54688 4.93852 1.54688 9.08066C1.54688 13.2228 4.90474 16.5807 9.04688 16.5807Z"
                                  stroke="black"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9.04688 6.08066V9.08066"
                                  stroke="black"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9.04688 12.0807H9.05438"
                                  stroke="black"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        <div class="form__line--right">
                          <div class="row">
                            <div class="col-xl-12">
                              <div class="form__line--input">
                                <div
                                  class="form__block--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.password
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="password"
                                    class="input-linck"
                                    v-model="password"
                                    required=""
                                    v-if="!inputType"
                                    name="password"
                                    :placeholder="$t('site.registration.password')"
                                  />
                                  <input
                                    type="text"
                                    class="input-linck"
                                    v-model="password"
                                    required=""
                                    v-else
                                    name="password"
                                    :placeholder="$t('site.registration.password')"
                                  />
                                  <div class="password__eye">
                                    <img
                                      src="../assets/img/icon-eye-off.svg"
                                      v-if="inputType"
                                      @click="inputType = false"
                                    />
                                    <img
                                      src="../assets/img/icon-eye.svg"
                                      v-else
                                      @click="inputType = true"
                                    />
                                  </div>
                                </div>
                                <div
                                  class="input-required"
                                  v-if="errorMessage.messages && errorMessage.messages.password"
                                >
                                  <p v-for="massage in errorMessage.messages.password">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form__line form__line--column">
                        <div class="form__line--left">
                          <div class="form__line--title">
                            {{ $t('site.registration.password_repeat') }}
                            <span
                              v-tooltip.top-center="{
                                content: $t('site.authorization.input.password_length'),
                                class: ['tooltip__btn'],
                              }"
                            >
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 19 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.04688 16.5807C13.189 16.5807 16.5469 13.2228 16.5469 9.08066C16.5469 4.93852 13.189 1.58066 9.04688 1.58066C4.90474 1.58066 1.54688 4.93852 1.54688 9.08066C1.54688 13.2228 4.90474 16.5807 9.04688 16.5807Z"
                                  stroke="black"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9.04688 6.08066V9.08066"
                                  stroke="black"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9.04688 12.0807H9.05438"
                                  stroke="black"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        <div class="form__line--right">
                          <div class="row">
                            <div class="col-xl-12">
                              <div class="form__line--input">
                                <div
                                  class="form__block--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.password
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <input
                                    type="password"
                                    class="input-linck"
                                    v-model="comparePassword"
                                    required=""
                                    v-if="!inputType"
                                    name="compare"
                                    :placeholder="$t('site.registration.password_repeat')"
                                  />
                                  <input
                                    type="text"
                                    class="input-linck"
                                    v-model="comparePassword"
                                    required=""
                                    v-else
                                    name="compare"
                                    :placeholder="$t('site.registration.password_repeat')"
                                  />
                                  <div class="password__eye">
                                    <img
                                      src="../assets/img/icon-eye-off.svg"
                                      v-if="inputType"
                                      @click="inputType = false"
                                    />
                                    <img
                                      src="../assets/img/icon-eye.svg"
                                      v-else
                                      @click="inputType = true"
                                    />
                                  </div>
                                </div>
                                <div
                                  class="input-required"
                                  v-if="errorMessage.messages && errorMessage.messages.compare"
                                >
                                  <p v-for="massage in errorMessage.messages.compare">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="form__line form__line--column">
                        <div class="form__line--right">
                          <div class="row">
                            <div class="col-xl-12">
                              <div class="registration_agreement">
                                <div class="registration_agreement__title">
                                  {{ $t('register_agreement_title') }}
                                </div>
                                <p v-html="$t('register_agreement')"></p>
                                <label
                                  for="registration_agreement_input"
                                  class="form__line--input registration_agreement_input"
                                >
                                  <input
                                    v-if="!inputType"
                                    v-model="registration_agreement"
                                    id="registration_agreement_input"
                                    type="checkbox"
                                    required
                                    name="registration_agreement"
                                  />
                                  <span>{{ $t('accept') }}</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        v-if="message.text"
                        class="form__block--line form__messages"
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

                      <div class="form__listitem--line form__listitem--button">
                        <div class="form__listitem--input">
                          <button class="input__button" type="submit">
                            {{ $t('site.registration.input_registration') }}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="form__listitem--registr">
                    <router-link :to="'/' + $i18n.locale + '/login'">{{
                      $t('site.authorization.input_login')
                    }}</router-link>
                  </div>
                </div>
              </div>
            </div>

            <modal
              class="modal__block modal__block--middle modal__block--success"
              name="modal_success"
              :width="550"
              :min-width="550"
              height="auto"
              :clickToClose="false"
            >
              <div class="modal__block--wrapper">
                <div class="modal__wrapper">
                  <div class="modal__header">
                    <div class="modal__title">
                      {{ $t('site.registration.successful.title') }}
                    </div>
                  </div>
                  <div class="modal__content">
                    <div class="modal__form">
                      <div class="modal__form--message message__center">
                        {{ $t('site.registration.successful.desc') }}
                      </div>
                      <div class="form__listitem--registr">
                        <router-link :to="'/' + $i18n.locale + '/login'">{{
                          $t('site.authorization.input_login')
                        }}</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/boot/axios';
import HeaderLang from '@/components/HeaderLang';

export default {
  components: {
    HeaderLang,
  },
  data() {
    return {
      result: null,
      registrEcp: {},
      registration_agreement: false,

      fileDocuments: {
        fileName: '',
        fileClass: '',
      },

      ecpSign: false,
      token: null,
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
        texts: null,
      },
      loading: null,

      password: '',
      comparePassword: '',
      inputType: false,
      dataEcp: '',
    };
  },
  beforeCreate() {
    if (localStorage.token) {
      delete localStorage.token;
      location.reload();
    }
  },
  methods: {
    handleFileUpload() {
      this.fileDocuments.file = this.$refs.fileDocuments.files[0];
      this.fileDocuments.fileName = this.$refs.fileDocuments.files[0].name;
      this.fileDocuments.fileClass = 'add_tourist--success';
    },
    onSubmit(evt) {
      this.message.status = null;
      this.message.text = null;
      this.message.texts = null;

      const formData = new FormData(evt.target);
      formData.append('document', this.fileDocuments.file);
      formData.append('iin_bin', this.result.data.iin);
      const fromEntries = Object.fromEntries(formData.entries());
      if (fromEntries.compare != fromEntries.password) {
        this.errorMessage.status = 422;
        this.errorMessage.messages = {
          compare: [this.$t('system_message.comparePassword')],
          password: [this.$t('system_message.comparePassword')],
        };
      } else if (this.registration_agreement) {
        this.errorMessage.messages = {
          registration_agreement: true,
        };
      } else {
        api
          .post('register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (response.status == 200) {
              this.errorMessage.status = response.status;
              this.errorMessage.text = response.data.message;

              this.$modal.show('modal_success');
            }
          })
          .catch((error) => {
            if (error?.response?.status == 401) {
              this.message.status = 401;
              if (error.response.data.error_message)
                this.message.text = error.response.data.error_message;
              if (error.response.data.error_messages)
                this.message.texts = error.response.data.error_messages;
            }
            if (error?.response?.status == 422) {
              this.message.status = 422;
              if (error.response.data.error_message)
                this.message.text = error.response.data.error_message;
              if (error.response.data.error_messages)
                this.message.texts = error.response.data.error_messages;
            }
            this.errorMessage.messages = error.response.data.error_messages;
          });
      }
    },

    refisterPki() {
      if (this.$configFile.active) return this.sendEcpKey();
      this.dataEcp = null;
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
              'AUTHENTICATION',
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
        if (this.dataEcp) {
          this.sendEcpKey();
        }
      };
    },

    sendEcpKey() {
      this.message.status = null;
      this.message.text = null;
      this.message.texts = null;
      api
        .post(
          'register/data',
          {
            data: this.dataEcp || this.$configFile.xml,
          },
          {},
        )
        .then((response) => {
          this.result = response.data;
        })
        .catch((error) => {
          if (error?.response?.status == 401) {
            this.message.status = 401;
            if (error.response.data.error_message)
              this.message.text = error.response.data.error_message;
            if (error.response.data.error_messages)
              this.message.texts = error.response.data.error_messages;
          }
          if (error?.response?.status == 422) {
            this.message.status = 422;
            if (error.response.data.error_message)
              this.message.text = error.response.data.error_message;

            if (error.response.data.error_messages)
              this.message.texts = error.response.data.error_messages;
          }
          this.errorMessage.messages = error.response.data.error_messages;
        });
    },
  },
  head: {
    title() {
      return {
        inner: this.$t('site.registration.title'),
      };
    },
    meta: function () {
      return [{ name: 'description', content: this.$t('site.registration.description') }];
    },
  },
};
</script>

<style scoped>
header .header__site--row {
  display: none;
}

.registration_agreement {
  text-align: justify;
  font-size: 12px;
  line-height: 1.2;
}

.registration_agreement__title {
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
}

.registration_agreement a {
  color: inherit;
  text-decoration: underline;
}

.registration_agreement_input {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
}

.registration_agreement input {
  min-width: 22px;
  width: 22px;
  height: 22px;
  background: #ffffff;
  cursor: pointer;
}
</style>
