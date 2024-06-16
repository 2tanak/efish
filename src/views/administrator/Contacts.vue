<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['Contacts']"></v-sidebar>
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
                      {{ $t('sidebar.contacts') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div v-for="(element, index) in applications" style="width: 100%">
                    <div class="form__line" style="width: 100%">
                      <div style="width: 100%">
                        <div class="form__line--right">
                          <div class="row" style="width: 100%">
                            <div class="col-xl-12">
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  name="type"
                                  required
                                  :placeholder="$t('placeholder.name_type')"
                                  v-model="element.type"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                        <div class="form__line--right">
                          <div class="row" style="width: 100%">
                            <div class="col-xl-6">
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  name="text_ru"
                                  :placeholder="$t('placeholder.name_ru')"
                                  v-model="element.text_ru"
                                />
                              </div>
                            </div>
                            <div class="col-xl-6">
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  name="text_kz"
                                  :placeholder="$t('placeholder.name_kz')"
                                  v-model="element.text_kz"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                        <div class="form__line--right">
                          <div class="row" style="width: 100%">
                            <div class="col-xl-6">
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  name="link_ru"
                                  :placeholder="$t('placeholder.link_ru')"
                                  v-model="element.link_ru"
                                />
                              </div>
                            </div>
                            <div class="col-xl-6">
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  name="link_kz"
                                  :placeholder="$t('placeholder.link_kz')"
                                  v-model="element.link_kz"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="block__row--left">
                      <button
                        class="input-btn form__line--btn form__line-error"
                        @click="deleteFild(index)"
                      >
                        {{ $t('button.delete') }}
                      </button>
                    </div>

                    <br />

                    <hr />
                  </div>

                  <div class="block__row--left"></div>

                  <br />
                  <div class="form__line">
                    <div class="input__row" style="width: 100%; justify-content: space-between">
                      <a class="input-btn form__line--btn" @click="addFild()">
                        {{ $t('button.add') }}
                      </a>
                      <button class="input-btn form__line--btn">
                        {{ $t('button.save') }}
                      </button>
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
import { api } from '@/boot/axios';
import { convertObjectToFormData } from '@/formData';

export default {
  data() {
    return {
      contacts: null,
      applications: [],

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
  methods: {
    getContacts() {
      api
        .get('contacts', {})
        .then((response) => {
          this.contacts = response.data;
          this.applications = [];
          for (let key in this.contacts) {
            this.contacts[key].find((el) => {
              this.applications.push(el);
            });
          }
        })
        .catch(() => {});
    },

    addFild() {
      this.applications.push({
        type: '',
        text_ru: '',
        link_ru: '',
        text_kz: '',
        link_kz: '',
        text_en: '',
        link_en: '',
      });
    },
    deleteFild(index) {
      this.applications.splice(index, 1);
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

      api
        .post(
          'contacts',
          {
            params: this.applications,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;

            this.getContacts();
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
  mounted() {
    this.getContacts();
  },
};
</script>

<style scoped></style>
