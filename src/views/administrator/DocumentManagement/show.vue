<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !application }">
    <v-preloader v-if="!application" :message="errorMessage"></v-preloader>

    <div class="container" v-if="application">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['DocumentManagement']"></v-sidebar>
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
                      {{ $t('sidebar.documents') }}
                    </div>
                    <div class="content__title--subtext">
                      {{ application.name }}
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
                            :value="application.name"
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
                    <div class="form__line--title">Дата добавления</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <input
                            type="text"
                            class="input-linck"
                            :value="application.document_at | formatDate"
                            disabled
                            placeholder="Дата"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">
                      Добавление документа<br />
                      (PDF, WORD)
                    </div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <a
                          :href="application.document"
                          download
                          class="form__block--input form__line--link"
                          :class="[
                            errorMessage.messages && errorMessage.messages.ecp
                              ? 'input--error'
                              : '',
                          ]"
                        >
                          <div class="form__file">
                            <img src="../../../assets/img/icon-ecp.svg" />
                            Скачать
                          </div>
                        </a>
                        <div
                          class="input-required"
                          v-if="errorMessage.messages && errorMessage.messages.ecp"
                        >
                          <p>{{ errorMessage.messages.ecp }}</p>
                        </div>
                      </div>
                    </div>
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
import { api, urlApi } from '@/boot/axios';

export default {
  data() {
    return {
      urlApi: urlApi,
      application: null,
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
    };
  },
  watch: {
    '$store.state.userObject': {
      immediate: true,
      handler: function () {
        this.apiGetUserDocumentList();
      },
    },
  },
  methods: {
    apiGetUserDocumentList() {
      api
        .get('user/document/' + this.$route.params.id, {
          params: {
            user_id: this.$store.state.userObject.id,
          },
        })
        .then((response) => {
          if (response.data) {
            this.application = response.data;
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
  beforeMount() {},
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
