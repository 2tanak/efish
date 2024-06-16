<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !permissionsList }">
    <v-preloader v-if="!permissionsList" :message="errorMessage"></v-preloader>

    <div class="container" v-if="permissionsList">
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
                    <div class="content__title--text">Создание роли</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименовании роли</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.name
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="name"
                              value=""
                              placeholder="Наименовании роли"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.name"
                          >
                            <p v-for="massage in errorMessage.messages.name">{{ massage }}</p>
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
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.description
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <textarea
                              class="input-linck"
                              required=""
                              name="description"
                              placeholder="Описание роли"
                            ></textarea>
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.description"
                          >
                            <p v-for="massage in errorMessage.messages.description">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        class="permission__block"
                        :class="[
                          errorMessage.messages && errorMessage.messages.accesses
                            ? 'input--error'
                            : '',
                        ]"
                      >
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="permission__block--add">
                              <a @click="$modal.show('modal_permission')">
                                Разрешения <img src="../../../assets/img/icon-plus-blue.svg" />
                              </a>
                            </div>
                            <div class="permission__block--list">
                              <a
                                class="permission__block--item"
                                v-for="(permission, key) in permissions"
                              >
                                {{ permission.name }}
                                <span class="permission__close" @click="permissionClick(key)">
                                  <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                                      stroke="white"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M9.375 5.625L5.625 9.375"
                                      stroke="white"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M5.625 5.625L9.375 9.375"
                                      stroke="white"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>

                        <modal
                          class="modal__block modal__block--middle modal__permission"
                          name="modal_permission"
                          :width="520"
                          :min-width="160"
                          height="auto"
                        >
                          <div class="modal__block--wrapper">
                            <div
                              class="modal__block--close"
                              @click="$modal.hide('modal_permission')"
                            >
                              <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M22.5 7.5L7.5 22.5"
                                  stroke="#52A5FC"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M7.5 7.5L22.5 22.5"
                                  stroke="#52A5FC"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                            <div class="modal__wrapper">
                              <div class="modal__content">
                                <div class="modal__form">
                                  <ul class="modal__permission--list">
                                    <li v-for="(permission, key) in permissionsList">
                                      <a @click="permissionAdd(key)">{{ permission.name }}</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </modal>
                      </div>
                      <div
                        class="input-required"
                        v-if="errorMessage.messages && errorMessage.messages.accesses"
                      >
                        <p v-for="massage in errorMessage.messages.accesses">{{ massage }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left"></div>
                    <div class="form__line--right">
                      <button
                        class="input-btn form__line--btn"
                        v-if="$store.getters.userPermission(['change_role'])"
                      >
                        {{ $t('button.save') }}
                      </button>

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
      permissionsSelect: [],
      permissions: [],
    };
  },
  methods: {
    permissionClick(key) {
      this.permissions.splice(key, 1);
      this.permissionsSelect.splice(key, 1);
    },
    permissionAdd(element) {
      if (this.permissionsSelect.indexOf(this.permissionsList[element].value) == -1) {
        this.permissions.push(this.permissionsList[element]);
        this.permissionsSelect.push(this.permissionsList[element].value);
      }
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
      // formData.append('accesses', JSON.stringify(this.permissions));
      // formData.append('accesses[]', JSON.stringify(this.permissions));
      for (var i = 0; i < this.permissionsSelect.length; i++) {
        formData.append('accesses[' + i + ']', this.permissionsSelect[i]);
      }
      api
        .post('user/role/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;

            this.$router.push({
              path: '/' + this.$i18n.locale + '/account/roles/' + response.data.data.id,
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
          this.errorMessage.messages = error.response.data.error_messages;
        });
    },

    apiGetUserList() {
      api
        .get('user/access/list')
        .then((response) => {
          if (response.data) {
            this.permissionsList = response.data;
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
