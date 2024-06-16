<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !applications && !permissionsList && !moduleList }"
  >
    <v-preloader
      v-if="!applications && !permissionsList && !moduleList"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="applications && permissionsList && moduleList">
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
                    <div class="content__title--text">Просмотр справочника</div>
                    <div class="content__title--subtext">
                      {{ applications.name }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Название</div>
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
                            placeholder="Наименование"
                          />
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
                    <div class="form__line form__line--children" v-for="(item, index) in fildsList">
                      <div class="row align-items-center">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              :name="'columns[' + index + ']'"
                              v-model="fildsList[index].name"
                              placeholder="Доп.поле"
                            />
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
                              disabled
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
                              {{ permission.description }}
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
                      v-if="$store.getters.userPermission(['change_catalog'])"
                    >
                      <div class="input__row">
                        <a
                          class="input-btn form__line--btn"
                          v-if="(applications.status != 'active', applications.uneditable != 1)"
                          @click="activeStatus(applications.id)"
                        >
                          Применить справочник
                        </a>
                        <a
                          class="input-btn form__line-error form__line--btn"
                          v-if="(applications.status != 'deleted', applications.uneditable != 1)"
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

    apiGetRoleList() {
      api
        .get('user/role/list')
        .then((response) => {
          if (response.data) {
            this.permissionsList = response.data;
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
          this.apiGetCatalog();
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
