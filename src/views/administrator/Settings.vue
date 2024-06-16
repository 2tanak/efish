<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="[]"></v-sidebar>
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
                      {{ $t('admin.login.settings') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="row">
                  <div class="col-xl-4">
                    <div class="setting__account" v-if="$store.state.userObject">
                      <div class="setting__account--left">
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
                      <div class="setting__account--right">
                        <div class="setting__account--info">
                          <div class="setting__account--name">
                            {{ $store.state.userObject.first_name }}
                            {{ $store.state.userObject.last_name }}
                          </div>
                          <div class="setting__account--position">
                            {{ $store.state.userObject.role.description }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <form method="POST" @submit.prevent="onSubmit">
                      <div class="form__line form__line--minmargin">
                        <div class="form__line--right">
                          <div class="form__line--input">
                            <div
                              class="form__block--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.old_password
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="password"
                                v-if="!inputType"
                                class="input-linck"
                                v-model="oldPassword"
                                required=""
                                name="old_password"
                                value=""
                                :placeholder="$t('placeholder.old_password')"
                              />
                              <input
                                type="text"
                                v-else
                                class="input-linck"
                                v-model="oldPassword"
                                required=""
                                name="old_password"
                                value=""
                                :placeholder="$t('placeholder.old_password')"
                              />
                              <div class="password__eye">
                                <img
                                  src="../../assets/img/icon-eye-off.svg"
                                  v-if="inputType"
                                  @click="inputType = false"
                                />
                                <img
                                  src="../../assets/img/icon-eye.svg"
                                  v-else
                                  @click="inputType = true"
                                />
                              </div>
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.old_password"
                            >
                              <p v-for="massage in errorMessage.messages.old_password">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form__line form__line--minmargin">
                        <div class="form__line--right">
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
                                v-if="!inputType"
                                class="input-linck"
                                v-model="password"
                                required=""
                                name="password"
                                value=""
                                :placeholder="$t('placeholder.new_password')"
                              />
                              <input
                                type="text"
                                v-else
                                class="input-linck"
                                v-model="password"
                                required=""
                                name="password"
                                value=""
                                :placeholder="$t('placeholder.new_password')"
                              />
                              <div class="password__eye">
                                <img
                                  src="../../assets/img/icon-eye-off.svg"
                                  v-if="inputType"
                                  @click="inputType = false"
                                />
                                <img
                                  src="../../assets/img/icon-eye.svg"
                                  v-else
                                  @click="inputType = true"
                                />
                              </div>
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.password"
                            >
                              <p v-for="massage in errorMessage.messages.password">{{ massage }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form__line form__line--minmargin">
                        <div class="form__line--right">
                          <div class="form__line--input">
                            <div
                              class="form__block--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.compare
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="password"
                                v-if="!inputType"
                                class="input-linck"
                                v-model="comparePassword"
                                required=""
                                name="compare"
                                value=""
                                :placeholder="$t('placeholder.compare_password')"
                              />
                              <input
                                type="text"
                                v-else
                                class="input-linck"
                                v-model="comparePassword"
                                required=""
                                name="compare"
                                value=""
                                :placeholder="$t('placeholder.compare_password')"
                              />
                              <div class="password__eye">
                                <img
                                  src="../../assets/img/icon-eye-off.svg"
                                  v-if="inputType"
                                  @click="inputType = false"
                                />
                                <img
                                  src="../../assets/img/icon-eye.svg"
                                  v-else
                                  @click="inputType = true"
                                />
                              </div>
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.compare"
                            >
                              <p v-for="massage in errorMessage.messages.compare">{{ massage }}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="form__line">
                        <div class="form__line--infotext">
                          {{ $t('system_message.new_password') }}
                        </div>
                      </div>

                      <div class="form__line">
                        <div class="form__line--right">
                          <button class="input-btn form__line--btn">
                            {{ $t('button.save') }}
                          </button>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-xl-12">
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

export default {
  data() {
    return {
      user: null,

      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },

      oldPassword: '',
      password: '',
      comparePassword: '',
      inputType: false,

      message: '',
    };
  },
  methods: {
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

      const fromEntries = Object.fromEntries(formData.entries());
      if (fromEntries.password != '' && fromEntries.compare != fromEntries.password) {
        this.errorMessage.status = 422;
        this.errorMessage.messages = {
          compare: [this.$t('system_message.comparePassword')],
          password: [this.$t('system_message.comparePassword')],
        };
      } else {
        if (fromEntries.password == '') {
          formData.delete('compare');
        }
        api
          .post('user/new-password', formData)
          .then((response) => {
            if (response.status == 200) {
              this.message.status = 200;
              this.message.text = response.data.message;
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
            }
            if (error?.response?.status == 422) {
              this.errorMessage.status = 422;
              this.errorMessage.text = error.response.data.error_message;
              this.message.status = 422;
              this.message.text = error.response.data.error_message;
            }
            this.errorMessage.messages = error.response.data.error_messages;
          });
      }
    },
  },
  watch: {},
  beforeMount() {},
  beforeCreate() {},
};
</script>
