<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !applications }">
    <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>

    <div class="container" v-if="applications">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['RoleManagement']"></v-sidebar>
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
                    <div class="content__title--text">Просмотр роли</div>
                    <div class="content__title--subtext">
                      {{ applications.description }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Наименовании роли</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <input
                            type="text"
                            class="input-linck"
                            disabled
                            :value="applications.name"
                            placeholder="Наименовании роли"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Описание роли</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div class="form__line--input">
                          <textarea
                            class="input-linck"
                            disabled
                            :value="applications.description"
                            placeholder="Описание роли"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div class="permission__block">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="permission__block--add">
                            <a> Разрешения </a>
                          </div>
                          <div class="permission__block--list">
                            <a
                              class="permission__block--item"
                              v-for="(permission, key) in permissions"
                            >
                              {{ permission.name }}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form__line">
                  <div class="form__line--left"></div>
                  <div class="form__line--right">
                    <div
                      class="form__btn--line"
                      v-if="$store.getters.userPermission(['change_role'])"
                    >
                      <div class="input__row">
                        <a
                          class="input-btn form__line--btn"
                          v-if="applications.status != 'active'"
                          @click="activeRole(applications.id)"
                        >
                          Активировать роль
                        </a>
                        <a
                          class="input-btn form__line-error form__line--btn"
                          v-if="applications.status != 'deleted'"
                          @click="$modal.show('modal_delete')"
                        >
                          Заблокировать <img src="../../../assets/img/icon-close-w.svg" />
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
                              Вы уверены что хотите заблокировать роль<br />
                              <strong>
                                {{ applications.description }}
                              </strong>
                            </div>
                          </div>

                          <div class="modal__content">
                            <div class="modal__form">
                              <div class="block__row">
                                <div class="block__row--left">
                                  <a class="block__item" @click="blockRole(applications.id)">
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
                                  </a>
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
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { api } from '@/boot/axios';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      applications: null,
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      permissionsList: null,
      permissions: [],
    };
  },
  methods: {
    activeRole(id) {
      api
        .post('user/role/' + id + '/activate', {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;

            this.$router.push({ path: '/' + this.$i18n.locale + '/account/roles' });
          }
        });
    },
    blockRole(id) {
      api
        .post('user/role/' + id + '/deactivate', {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;

            this.blockElemet = null;
            this.$modal.hide('modal_delete');
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
            this.$router.push('/' + this.$i18n.locale + '/login');
          }
          if (error?.response?.status == 422) {
            this.message.status = 422;
            this.message.text = error.response.data.error_message;
          }
          if (error?.response?.status == 403) {
            this.message.status = 403;
            this.message.text = error?.response?.data?.message;
          }
        });
    },

    apiGetUserList() {
      api
        .get('user/access/list')
        .then((response) => {
          if (response.data) {
            this.permissionsList = response.data;
            this.apiGetRole();
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
    apiGetRole() {
      api
        .get('user/role/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.applications = response.data;
            this.permissions = this.permissionsList.filter((element) => {
              return this.applications.accesses.includes(element.value);
            });
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
    this.apiGetUserList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>

<style scoped></style>
