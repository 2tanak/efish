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

          <div class="login__block">
            <div class="content__title--block">
              <div class="content__title section__title">
                {{ $t('site.authorization.title') }}
              </div>
            </div>

            <div class="login__tabs">
              <div
                class="login__tab--item"
                v-bind:class="{ 'login__tab--active': ecpSign == false }"
              >
                <a @click="ecpSign = false">
                  {{ $t('site.authorization.ecp') }}
                </a>
              </div>
              <div
                class="login__tab--item"
                v-bind:class="{ 'login__tab--active': ecpSign == true }"
              >
                <a @click="ecpSign = true">
                  {{ $t('site.authorization.login') }}
                </a>
              </div>
            </div>

            <div class="login__block--form">
              <div class="row">
                <div class="col-lg-12">
                  <div
                    class="login__block--tab"
                    v-bind:class="{ 'login__block--active': ecpSign == false }"
                    v-if="ecpSign == false"
                  >
                    <div class="form__block--line">
                      <label class="form__block--input">
                        <div class="form__file" style="margin-bottom: 15px" @click="onPki">
                          <img src="../assets/img/icon-ecp.svg" />
                          {{ $t('site.authorization.download_certificate') }}
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
                        <span class="input-required">Войти</span>
                      </label>
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
                        <span class="form__block--title" v-if="message.text">
                          {{ message.text }}
                        </span>
                        <div
                          class="form__block--title"
                          v-if="message.texts && message.texts.password"
                        >
                          <p v-for="text in message.texts.password">
                            {{ text }}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div
                    class="login__block--tab"
                    v-bind:class="{ 'login__block--active': ecpSign == true }"
                    v-if="ecpSign == true"
                  >
                    <form method="POST" @submit.prevent="onSubmit">
                      <div class="form__block--line">
                        <label class="form__block--input">
                          <input
                            type="text"
                            class="input-linck input-linck-icon"
                            :class="[message.status != 200 && message.status ? 'input--error' : '']"
                            required=""
                            name="email"
                            value=""
                            :placeholder="$t('site.authorization.input.email_iin')"
                          />
                          <div class="input__icon">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                                stroke="#52A5FC"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                stroke="#52A5FC"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </label>
                      </div>
                      <div class="form__block--line">
                        <label class="form__block--input">
                          <input
                            type="password"
                            v-if="!inputType"
                            class="input-linck input-linck-icon"
                            v-model="password"
                            required=""
                            name="password"
                            value=""
                            :placeholder="$t('site.authorization.input.password')"
                          />
                          <input
                            type="text"
                            v-else
                            class="input-linck input-linck-icon"
                            v-model="password"
                            required=""
                            name="password"
                            value=""
                            :placeholder="$t('site.authorization.input.password')"
                          />
                          <div class="input__icon">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                                stroke="#52A5FC"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                                stroke="#52A5FC"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <div
                            class="password__eye"
                            v-tooltip.top-center="{
                              content: $t('site.authorization.input.password_length'),
                              class: ['tooltip__btn'],
                            }"
                          >
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
                        </label>
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
                          <span class="form__block--title" v-if="message.text">
                            {{ message.text }}
                          </span>
                          <div
                            class="form__block--title"
                            v-if="message.texts && message.texts.password"
                          >
                            <p v-for="text in message.texts.password">
                              {{ text }}
                            </p>
                          </div>
                        </label>
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

                      <div class="form__listitem--line form__listitem--button">
                        <div class="form__listitem--input">
                          <button class="input__button">
                            {{ $t('site.authorization.input_login') }}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="form__listitem--registr">
                    <router-link :to="'/' + $i18n.locale + '/recovery'">{{
                      $t('site.authorization.recovery')
                    }}</router-link>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form__listitem--registr">
                    <router-link :to="'/' + $i18n.locale + '/registration'">{{
                      $t('site.authorization.registration')
                    }}</router-link>
                  </div>
                </div>
              </div>
            </div>
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
      ecpSign: true,
      token: null,
      registration_agreement: false,
      message: {
        status: null,
        text: null,
        texts: null,
      },
      loading: null,

      dataEcp: '',
      password: '',
      inputType: false,
    };
  },
  beforeCreate() {
    this.$store.commit('getUserRoles', []);
    this.$store.commit('SET_USER_OBJECT', null);
    if (localStorage.token) {
      delete localStorage.token;
      location.reload();
    }
  },
  methods: {
    onSubmit(evt) {
      if (!this.registration_agreement) return;
      this.message.status = null;
      this.message.text = null;
      this.message.texts = null;
      const formData = new FormData(evt.target);

      api
        .post('login', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = response.status;
            this.message.text = response.data.message;

            localStorage.setItem('token', 'Bearer ' + response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('refresh_time', new Date().getTime());
            this.token = response.data.access_token;
            this.$router.push({ path: '/' + this.$i18n.locale + '/account' });
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
          if (error?.response?.status == 500) {
            this.message.status = 500;
            this.message.text = this.$t('system_message.500');
          }
        });
    },
    onPki() {
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
        .post('login/pki', {
          data: this.dataEcp || this.$configFile.xml,
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = response.status;
            this.message.text = response.data.message;

            localStorage.setItem('token', 'Bearer ' + response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('refresh_time', new Date().getTime());
            this.token = response.data.access_token;
            this.$router.push({ path: '/' + this.$i18n.locale + '/account' });
          }
        })
        .catch((error) => {
          if (error?.response?.status == 500) {
            this.message.status = 500;
            this.message.text = this.$t('system_message.500');
          }
          if (error?.response?.status == 401) {
            this.message.status = 401;
            this.message.text = error.response.data.error_message;
          }
          if (error?.response?.status == 422) {
            this.message.status = 422;
            this.message.text = error.response.data.error_message;
          }
        });
    },
  },
  head: {
    title() {
      return {
        inner: this.$t('site.authorization.title'),
      };
    },
    meta: function () {
      return [
        {
          name: 'description',
          content: this.$t('site.authorization.description'),
        },
      ];
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
