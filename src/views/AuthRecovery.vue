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
                {{ $t('site.recovery.title') }}
              </div>
            </div>
            <div class="login__block--form">
              <div class="row">
                <div class="col-lg-12">
                  <div class="login__block--tab login__block--active">
                    <form method="POST" @submit.prevent="onSubmit">
                      <div class="form__block--line">
                        <label class="form__block--input">
                          <input
                            type="text"
                            class="input-linck input-linck-icon"
                            :class="[
                              message.status != 200 && message.status != null ? 'input--error' : '',
                            ]"
                            required=""
                            name="iin_bin"
                            value=""
                            :placeholder="$t('site.recovery.form.iin_bin')"
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
                            type="text"
                            class="input-linck input-linck-icon"
                            :class="[
                              message.status != 200 && message.status != null ? 'input--error' : '',
                            ]"
                            required=""
                            name="email"
                            value=""
                            :placeholder="$t('site.recovery.form.email')"
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
                                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                                stroke="#52A5FC"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M16 7.99999V13C16 13.7956 16.3161 14.5587 16.8787 15.1213C17.4413 15.6839 18.2044 16 19 16C19.7957 16 20.5587 15.6839 21.1213 15.1213C21.6839 14.5587 22 13.7956 22 13V12C21.9999 9.74302 21.2362 7.55247 19.8333 5.78452C18.4303 4.01658 16.4706 2.77521 14.2726 2.26229C12.0747 1.74936 9.76794 1.99503 7.72736 2.95936C5.68677 3.92368 4.03241 5.54995 3.03327 7.57371C2.03413 9.59748 1.74898 11.8997 2.22418 14.1061C2.69938 16.3125 3.90699 18.2932 5.65064 19.7263C7.39429 21.1593 9.57144 21.9603 11.8281 21.9991C14.0847 22.0379 16.2881 21.3122 18.08 19.94"
                                stroke="#52A5FC"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </label>
                      </div>

                      <div class="form__block--line form__info--line">
                        <label class="form__block--input">
                          <span class="form__block--title">
                            {{ $t('site.recovery.form.text') }}
                          </span>
                        </label>
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
      const formData = new FormData(evt.target);

      api
        .post('login/forgot', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = response.status;
            this.message.text = response.data.message;
          }
        })
        .catch((error) => {
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
