<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !applications }">
    <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>

    <div class="container" v-if="applications">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['UserManagementMain', 'RequestRegistration']"></v-sidebar>
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
                      {{ $t('sidebar.request_registration') }}
                    </div>
                    <div class="content__title--subtext">
                      Субъекта рыбного хозяйства ({{ applications.first_name }}
                      {{ applications.last_name }} {{ applications.middle_name }})
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Имя</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <input
                            type="text"
                            class="input-linck"
                            :value="applications.first_name"
                            disabled
                            placeholder="Имя"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Фамилия</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <input
                            type="text"
                            class="input-linck"
                            :value="applications.last_name"
                            disabled
                            placeholder="Фамилия"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Отчество</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <input
                            type="text"
                            class="input-linck"
                            :value="applications.middle_name"
                            disabled
                            placeholder="Отчество"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Наименование организации</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <input
                            type="text"
                            class="input-linck"
                            :value="applications.name_company"
                            disabled
                            placeholder="Наименование организации"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">ИИН</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <input
                            type="text"
                            class="input-linck"
                            :value="applications.iin_bin"
                            disabled
                            placeholder="ИИН"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Электронная почта(Логин)</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <input
                            type="text"
                            class="input-linck"
                            :value="applications.email"
                            disabled
                            placeholder="Электронная почта"
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
                          <a class="form__line--file form__line--link" @click="downloadApp">
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
                              <div class="form__file--text">Скачать</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form__line form__line--comment" v-if="applications.comment">
                  <div class="form__line--left">
                    <div class="form__line--title">Причина отказа</div>
                  </div>
                  <div class="form__line--right">
                    <div class="col-xl-12">
                      {{ applications.comment }}
                    </div>
                  </div>
                </div>

                <div class="form__line">
                  <div class="form__line--right">
                    <div class="input__row">
                      <button
                        class="input-btn form__line--btn"
                        v-if="applications.status == 'new'"
                        @click="activeElement(applications.id)"
                      >
                        Одобрить <img src="../../../assets/img/icon-success-w.svg" />
                      </button>
                      <button
                        class="input-btn form__line-error form__line--btn"
                        v-if="applications.status == 'new'"
                        @click="$modal.show('modal_delete')"
                      >
                        Заблокировать <img src="../../../assets/img/icon-close-w.svg" />
                      </button>
                    </div>
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

                <modal
                  class="modal__block modal__block--middle modal__block--delete"
                  name="modal_delete"
                  :width="550"
                  :min-width="550"
                  height="auto"
                >
                  <div class="modal__block--wrapper">
                    <div class="modal__block--close" @click="$modal.hide('modal_delete')">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.5 7.5L7.5 22.5"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.5 7.5L22.5 22.5"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div class="modal__wrapper">
                      <div class="modal__header">
                        <div class="modal__title">
                          Вы уверены что хотите отклонить регистрацию<br />
                          <strong>
                            {{ applications.first_name }} {{ applications.last_name }}
                            {{ applications.middle_name }}
                          </strong>
                        </div>
                      </div>

                      <form method="POST" @submit.prevent="blockElement">
                        <div class="modal__content">
                          <div class="modal__form">
                            <div class="form__line">
                              <div class="form__line--right">
                                <div
                                  class="form__line--input"
                                  :class="[
                                    errorMessage.messages && errorMessage.messages.comment
                                      ? 'input--error'
                                      : '',
                                  ]"
                                >
                                  <textarea
                                    class="input-linck"
                                    required=""
                                    name="comment"
                                    placeholder="Причина отклонения"
                                  ></textarea>
                                </div>
                                <div
                                  class="input-required"
                                  v-if="errorMessage.messages && errorMessage.messages.comment"
                                >
                                  <p v-for="massage in errorMessage.messages.comment">
                                    {{ massage }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="block__row">
                              <div class="block__row--left">
                                <button class="block__item">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10 18.3333C14.6024 18.3333 18.3333 14.6023 18.3333 9.99996C18.3333 5.39759 14.6024 1.66663 10 1.66663C5.39763 1.66663 1.66667 5.39759 1.66667 9.99996C1.66667 14.6023 5.39763 18.3333 10 18.3333Z"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M12.5 7.5L7.5 12.5"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M7.5 7.5L12.5 12.5"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  Заблокировать
                                </button>
                              </div>
                              <div class="block__row--right">
                                <a
                                  class="block__item block__item--blue"
                                  @click="$modal.hide('modal_delete')"
                                >
                                  {{ $t('button.cancel') }}
                                </a>
                              </div>
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
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { api, urlApi } from '@/boot/axios';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      urlApi: urlApi,
      applications: null,
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

      // roleModel: [],
      // roleList: null,
    };
  },
  methods: {
    downloadApp(e) {
      api
        .get(
          'https://api-prod.efish.airweb.kz/api/v1/user/register/' +
            this.$route.params.id +
            '/file',
        )
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = this.applications.document.split('/').slice(-1);
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
    },
    activeElement(id) {
      const formData = new FormData();
      const fromEntries = Object.fromEntries(formData.entries());
      formData.append('role_id', 3);
      api
        .post('user/register/' + id + '/accept', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
            this.applications.status = null;
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/request_registration' });
          }
        })
        .catch((error) => {
          if (error.response == 'undefined') {
            this.applications.status = null;
          }
          if (error.response && error?.response?.status == 200) {
            this.message.status = 200;
            this.message.text = error?.response?.data?.message;
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/request_registration' });
          }
          if (error.response && error?.response?.status == 401) {
            this.errorMessage.status = 401;
            this.errorMessage.text = error.response.data.error_message;
          }
          if (error.response && error?.response?.status == 422) {
            this.errorMessage.status = 422;
            this.errorMessage.text = error.response.data.error_message;
          }
          if (error.response) {
            this.errorMessage.messages = error.response.data.error_messages;
          }
        });
    },
    blockElement(evt) {
      const formData = new FormData(evt.target);
      api
        .post('user/register/' + this.applications.id + '/deny', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.$modal.hide('modal_delete');
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/request_registration' });
          }
        });
    },

    apiGetUser() {
      api
        .get('user/register/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.applications = response.data;
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
          if (error?.response?.status == 404) {
            this.errorMessage.status = 404;
            this.errorMessage.text = this.$t('system_message.500');
          }
          if (error?.response?.status == 403) {
            this.errorMessage.status = 403;
            this.errorMessage.text = error?.response?.data?.message;
          }
        });
    },
    /*apiGetUserList(){
      api.get('user/role/list').then(response => {
        if (response.data) {
          this.roleList = response.data;
        }
      }).catch((error) => {
        if (error?.response?.status == 500) {
          this.errorMessage.status = 500;
          this.errorMessage.text = this.$t('system_message.500');
        }
        if (error?.response?.status == 401) {
          this.errorMessage.status = 401;
          this.errorMessage.text = error.response.data.error_message;
          this.$router.push('/'+this.$i18n.locale+'/login');
        }
        if (error?.response?.status == 422) {
          this.errorMessage.status = 422;
          this.errorMessage.text = error.response.data.error_message;
        }
      });
    }*/
  },
  beforeMount() {
    this.apiGetUser();
    // this.apiGetUserList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
