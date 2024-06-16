<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader': !applications || !permissionsList || !moduleList || !moduleSelect,
    }"
  >
    <v-preloader
      v-if="!applications || !permissionsList || !moduleList || !moduleSelect"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="applications && permissionsList && moduleList && moduleSelect">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReferenceManagement']"></v-sidebar>
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
                    <div class="content__title--text">Редактирование справочника</div>
                    <div class="content__title--subtext">
                      {{ applications.name }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Название</div>
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
                              :disabled="applications.uneditable == 1"
                              v-model="applications.name"
                              placeholder="Наименование"
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
                      <div class="form__line--title">Столбцы в таблице</div>
                    </div>
                    <div class="form__line--right">
                      <div
                        class="form__line form__line--children"
                        v-for="(item, index) in fildsList"
                      >
                        <div class="row align-items-center">
                          <div class="col-xl-5">
                            <div class="form__line--input">
                              <input
                                type="text"
                                class="input-linck"
                                :name="'columns[' + index + ']'"
                                :disabled="applications.uneditable == 1"
                                v-model="fildsList[index].name"
                                placeholder="Доп.поле"
                              />
                            </div>
                          </div>
                          <div class="col-xl-2" v-if="applications.uneditable != 1">
                            <div class="input__block--add">
                              <a
                                @click="deleteFild(index)"
                                v-tooltip.right="{
                                  content: 'Удалить поле',
                                  class: ['tooltip__btn'],
                                }"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#F19797"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M15 9L9 15"
                                    stroke="#F19797"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M9 9L15 15"
                                    stroke="#F19797"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="form__line form__line--children"
                        v-if="applications.uneditable != 1"
                      >
                        <div class="row align-items-center">
                          <div class="col-xl-5">
                            <div class="form__line--input">
                              <input
                                type="text"
                                class="input-linck"
                                @keyup.enter="addFild(fildsIndex)"
                                :name="'filds[' + fildsIndex + 1 + ']'"
                                v-model="fildsNew"
                                placeholder="Доп.поле"
                              />
                            </div>
                          </div>
                          <div class="col-xl-2">
                            <div class="input__block--add">
                              <a
                                @click="addFild(fildsIndex)"
                                v-tooltip.right="{
                                  content: 'Добавить поле',
                                  class: ['tooltip__btn'],
                                }"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#52A5FC"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M12 8V16"
                                    stroke="#52A5FC"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M8 12H16"
                                    stroke="#52A5FC"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Использовать</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__checkbox--block">
                            <label class="form__checkbox--line" v-for="element in moduleSelect">
                              <input
                                type="checkbox"
                                name="modules[]"
                                :value="element.value"
                                :checked="element.checked"
                              />
                              <div class="checkbox__item">
                                <span class="form__checkbox--text">
                                  {{ element.name }}
                                </span>
                                <span class="form__checkbox--check"></span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left"></div>
                    <div class="form__line--right">
                      <div
                        class="permission__block"
                        :class="[
                          errorMessage.messages && errorMessage.messages.roles
                            ? 'input--error'
                            : '',
                        ]"
                      >
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="permission__block--add">
                              <a @click="$modal.show('modal_permission')">
                                Роль <img src="../../../assets/img/icon-plus-blue.svg" />
                              </a>
                            </div>
                            <div class="permission__block--list">
                              <a
                                class="permission__block--item"
                                v-for="(permission, key) in permissions"
                              >
                                {{ permission.description }}
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
                              @click="$modal.hide('modal_monitoring')"
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
                              <div class="modal__content">
                                <div class="modal__form">
                                  <ul class="modal__permission--list">
                                    <li v-for="(permission, key) in permissionsList">
                                      <a @click="permissionAdd(key)">{{
                                        permission.description
                                      }}</a>
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
                        v-if="errorMessage.messages && errorMessage.messages.roles"
                      >
                        <p v-for="massage in errorMessage.messages.roles">{{ massage }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left"></div>
                    <div class="form__line--right">
                      <div
                        class="form__btn--line"
                        v-if="$store.getters.userPermission(['change_catalog'])"
                      >
                        <div class="input__row">
                          <button class="input-btn form__line--btn">
                            {{ $t('button.save') }}
                          </button>
                          <a
                            class="input-btn form__line--btn"
                            v-if="applications.status != 'active'"
                            @click="activeStatus(applications.id)"
                          >
                            Применить справочник
                          </a>
                          <a
                            class="input-btn form__line-error form__line--btn"
                            v-if="applications.status != 'deleted' && applications.uneditable != 1"
                            @click="$modal.show('modal_delete')"
                          >
                            Заблокировать справочник
                          </a>
                        </div>
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
                                Вы уверены что хотите заблокировать справочник<br />
                                <strong>
                                  {{ applications.name }}
                                </strong>
                              </div>
                            </div>

                            <div class="modal__content">
                              <div class="modal__form">
                                <div class="block__row">
                                  <div class="block__row--left">
                                    <a class="block__item" @click="blockStatus(applications.id)">
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

      fildsNew: '',
      fildsList: [],
      fildsIndex: 0,

      moduleList: null,
      moduleSelect: null,

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
      if (this.permissionsSelect.indexOf(this.permissionsList[element].id) == -1) {
        this.permissions.push(this.permissionsList[element]);
        this.permissionsSelect.push(this.permissionsList[element].id);
      }
    },
    addFild(index) {
      if (this.fildsNew != '') {
        this.fildsList.push({ name: this.fildsNew });
        this.fildsIndex = this.fildsList.length;
        this.fildsNew = '';
      }
    },
    deleteFild(index) {
      this.fildsList.splice(index, 1);
      this.fildsIndex = this.fildsList.length;
    },
    activeStatus(id) {
      api
        .post('catalog/' + id + '/activate', {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;

            this.$router.push({ path: '/' + this.$i18n.locale + '/account/references' });
          }
        });
    },
    blockStatus(id) {
      api
        .post('catalog/' + id + '/deactivate', {
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

            this.$router.push({ path: '/' + this.$i18n.locale + '/account/references' });
          }
        });
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
        formData.append('roles[' + i + ']', this.permissionsSelect[i]);
      }
      if (this.fildsNew != '') {
        formData.append('columns[' + this.fildsList.length + ']', this.fildsNew);
      }
      api
        .post('catalog/' + this.$route.params.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;

            //this.$router.push({path: '/'+ this.$i18n.locale +'/account/references'});
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

    apiGetRoleList() {
      api
        .get('user/role/list')
        .then((response) => {
          if (response.data) {
            this.permissionsList = response.data;

            this.apiGetCatalog();
            this.apiGetModuleList();
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
    apiGetModuleList() {
      api.get('catalog/module/list').then((response) => {
        if (response.data) {
          this.moduleList = response.data;
        }
      });
    },
    apiGetCatalog() {
      api
        .get('catalog/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.applications = response.data;
            this.fildsList = response.data.columns;
            this.moduleSelect = this.moduleList.filter((element) => {
              let module = element;
              this.applications.modules.includes(element.value)
                ? (module.checked = true)
                : (module.checked = false);
              return module;
            });
            this.applications.roles.find((element) => {
              this.permissionsSelect.push(element.id);
            });
            this.permissions = this.permissionsList.filter((element) => {
              return this.permissionsSelect.includes(element.id);
            });
          }
        })
        .catch((error) => {
          if (error.response) {
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
          }
        });
    },
  },
  beforeMount() {
    this.apiGetRoleList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>

<style scoped></style>
