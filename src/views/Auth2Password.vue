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

          <div class="login__block" v-if="success == 'success'">
            <div class="login__block--form">
              <div class="row">
                <div class="col-lg-12">
                  <div class="login__block--tab login__block--active">
                    <div class="recovery__block recovery__block--success">
                      <div class="recovery__block--title">
                        {{ $t('site.recovery.success.title') }}
                      </div>
                      <div class="recovery__block--link">
                        <router-link :to="'/' + $i18n.locale + '/recovery'">{{
                          $t('site.recovery.come_back')
                        }}</router-link>
                      </div>
                    </div>
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
          </div>
          <div class="login__block" v-else-if="success == 'error'">
            <div class="login__block--form">
              <div class="row">
                <div class="col-lg-12">
                  <div class="login__block--tab login__block--active">
                    <div class="recovery__block recovery__block--error">
                      <div class="recovery__block--title">
                        <!--<strong>IvanIvanov</strong><br>-->
                        {{ $t('site.recovery.user_not_found') }}
                      </div>
                      <div class="recovery__block--link">
                        <router-link :to="'/' + $i18n.locale + '/recovery'">{{
                          $t('site.recovery.come_back')
                        }}</router-link>
                      </div>
                    </div>
                    <div class="recovery__block--line">
                      <label class="form__block--input">
                        <div class="form__block--title">
                          {{ $t('site.recovery.contact_administrator') }}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="login__block" v-else>
            <div class="content__title--block">
              <div class="content__title section__title">
                {{ $t('site.auth.title') }}
              </div>
            </div>
            <div class="login__block--form">
              <div class="row">
                <div class="col-lg-12">
                  <div class="login__block--tab login__block--active">
                    <form method="POST" @submit.prevent="onSubmit">
                      <input type="hidden" name="token" :value="$route.params.token" />

                      <div class="form__block--line">
                        <label
                          class="form__block--input"
                          :class="[
                            errorMessage.messages && errorMessage.messages.password
                              ? 'input--error'
                              : '',
                          ]"
                        >
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
                                stroke="#292E4F"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                                stroke="#292E4F"
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
                        <div
                          class="input-required"
                          v-if="errorMessage.messages && errorMessage.messages.password"
                        >
                          <p v-for="massage in errorMessage.messages.password">{{ massage }}</p>
                        </div>
                      </div>

                      <div
                        class="form__block--line form__messages"
                        v-if="message.text"
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
                          <button class="input__button">
                            {{ $t('site.recovery.send') }}
                          </button>
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
      success: null,
      token: null,
      message: {
        status: null,
        text: null,
      },
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      loading: null,

      password: '',
      inputType: false,
    };
  },
  beforeCreate() {
    if (localStorage.token) {
      delete localStorage.token;

      location.reload();
    }
  },
  methods: {
    onSubmit(evt) {
      this.errorMessage = {
        status: null,
        messages: null,
        text: null,
      };
      const formData = new FormData(evt.target);

      api
        .post('login/auth/code', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = response.status;
            this.message.text = response.data.message;

            if (response.data.access_token) {
              localStorage.setItem('token', 'Bearer ' + response.data.access_token);
              localStorage.setItem('refresh_token', response.data.refresh_token);
              localStorage.setItem('refresh_time', new Date().getTime());
              this.token = response.data.access_token;
              this.$router.push({ path: '/' + this.$i18n.locale + '/account' });
            }
          }
        })
        .catch((error) => {
          if (error?.response?.status == 401) {
            this.message.status = 401;
            this.message.text = error?.response?.data?.message;
          }
          if (error?.response?.status == 422) {
            this.message.status = 422;
            // this.message.text = error?.response?.data?.message;
            this.errorMessage.status = 422;
            if (error.response.data.error_message)
              this.errorMessage.text = error.response.data.error_message;
            if (error.response.data.error_messages)
              this.errorMessage.messages = error.response.data.error_messages;
            if (error.response.data.error_message)
              this.message.text = error.response.data.error_message;
          }
          // this.message.status = error?.response?.status;
          // this.message.text = error?.response?.data?.message;
        });
    },
  },
  head: {
    title() {
      return {
        inner: this.$t('site.recovery.title'),
      };
    },
    meta: function () {
      return [{ name: 'description', content: this.$t('site.recovery.description') }];
    },
  },
};
</script>

<style>
header .header__site--row {
  display: none;
}
</style>
