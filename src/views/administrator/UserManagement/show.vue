<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !applications }">
    <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>

    <div class="container" v-if="applications">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['UserManagementMain', 'UserManagement']"></v-sidebar>
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
                    <div class="content__title--text">Просмотр пользователя</div>
                    <div class="content__title--subtext">
                      {{ applications.first_name }} {{ applications.last_name }}
                      {{ applications.middle_name }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Роль</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <input
                            type="text"
                            class="input-linck"
                            :value="applications.role.description"
                            disabled
                            placeholder="Роль"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form__line" v-if="regionModel">
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
                            :value="regionModel.title"
                            disabled
                            placeholder="Регион"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

                <!--
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">
                      Название структурного подразделения
                    </div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                -->

                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Должность</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <input
                            type="text"
                            class="input-linck"
                            :value="applications.job"
                            disabled
                            placeholder="Должность"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api, apiSecond } from '@/boot/axios';

export default {
  name: 'UserManagementShow',
  data() {
    return {
      applications: null,
      regionModel: null,
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },

      message: '',

      password: '',
      comparePassword: '',
      inputType: false,
    };
  },
  methods: {
    apiGetUser() {
      api
        .get('user/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.applications = response.data;
            if (response.data.region_id) {
              apiSecond
                .get('/v2/handbook-regions/' + response.data.region_id, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
                .then((response) => {
                  if (response.status == 200) {
                    this.regionModel = response.data.data;
                  }
                });
            }
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
    this.apiGetUser();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>

<style scoped></style>
