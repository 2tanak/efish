<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ContestManagement']"></v-sidebar>
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
                    <div class="content__title--text">Добавить новую запись результатов</div>
                    <div class="content__title--subtext">Новая запись</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Условия конкурса</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.condition_desc
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="condition_desc"
                              placeholder="Условия конкурса"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.condition_desc"
                          >
                            <p v-for="massage in errorMessage.messages.condition_desc">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Дата проведения конкурса</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
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
                              placeholder="Дата проведения конкурса"
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
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Сведения об объекте</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.object_desc
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="object_desc"
                              placeholder="Сведения об объекте"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.object_desc"
                          >
                            <p v-for="massage in errorMessage.messages.object_desc">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Сведения о победителе конкурса</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.winner_desc
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="winner_desc"
                              placeholder="Сведения о победителе конкурса"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.winner_desc"
                          >
                            <p v-for="massage in errorMessage.messages.winner_desc">
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
                        Обязательства сторон по подписанию договора
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.commitments
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="commitments"
                              placeholder="Обязательства сторон"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.commitments"
                          >
                            <p v-for="massage in errorMessage.messages.commitments">
                              {{ massage }}
                            </p>
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
                                <div class="form__file--text" v-if="fileDocuments.fileName">
                                  {{ fileDocuments.fileName }}
                                </div>
                                <div class="form__file--text" v-else>Загрузите PDF</div>
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
                      <div class="input__row">
                        <button class="input-btn form__line--btn">
                          <!-- v-if="applications.status != 'active' && applications.status != 'deleted'" -->
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
import { api, urlApi } from '@/boot/axios';
import axios from 'axios';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
    axios,
  },
  data() {
    return {
      urlApi: urlApi,

      applications: null,
      errorMessage: {
        status: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      blockElemet: null,
      unlockElemet: null,

      fileDocuments: {
        file: null,
        fileName: '',
        fileClass: '',
      },
    };
  },
  methods: {
    handleFileUpload() {
      this.fileDocuments.file = this.$refs.fileDocuments.files[0];
      this.fileDocuments.fileName = this.$refs.fileDocuments.files[0].name;
      this.fileDocuments.fileClass = 'add_tourist--success';
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
      if (this.fileDocuments.file) {
        formData.append('document', this.fileDocuments.file);
      }

      api
        .post('contest/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/contest/' });
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

  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  head: {
    title() {
      return {
        inner: this.$t('sidebar.users_parent'),
      };
    },
    meta: [],
  },
};
</script>
