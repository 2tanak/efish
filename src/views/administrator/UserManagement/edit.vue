<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !applications || !roleList || !_getRegionList }"
  >
    <v-preloader
      v-if="!applications || !roleList || !_getRegionList"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="applications && roleList && _getRegionList">
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
                    <div class="content__title--text">Редактирование пользователя</div>
                    <div class="content__title--subtext">
                      {{ applications.first_name }} {{ applications.last_name }}
                      {{ applications.middle_name }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Роль в системе</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.role_id
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <multiselect
                              class="select__status"
                              v-model="roleModel"
                              :options="roleList"
                              label="description"
                              placeholder="Выберите роль"
                              ><!--name="role"-->
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.role_id"
                          >
                            <p v-for="massage in errorMessage.messages.role_id">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="form__line"
                    v-if="
                      _getRegionList &&
                      roleModel.accesses.find((element) => {
                        return element == 'role_region';
                      }) == 'role_region'
                    "
                  >
                    <div class="form__line--left">
                      <div class="form__line--title">Регион</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.region_id
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <multiselect
                              class="select__status"
                              v-model="regionModel"
                              :options="_getRegionList"
                              placeholder="Выберите регион"
                              :multiple="true"
                              :close-on-select="false"
                              :clear-on-select="false"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              required=""
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.name
                              }}</template>
                              <template slot="option" slot-scope="{ option, search, isOpen }">
                                <div class="select__check">
                                  <div class="select__check--name">
                                    {{ option.name }}
                                  </div>
                                </div>
                              </template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.region_id"
                          >
                            <p v-for="massage in errorMessage.messages.region_id">{{ massage }}</p>
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
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.first_name
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="first_name"
                              v-model="applications.first_name"
                              placeholder="Имя"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.first_name"
                          >
                            <p v-for="massage in errorMessage.messages.first_name">{{ massage }}</p>
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
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.last_name
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="last_name"
                              v-model="applications.last_name"
                              placeholder="Фамилия"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.last_name"
                          >
                            <p v-for="massage in errorMessage.messages.last_name">{{ massage }}</p>
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
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.middle_name
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              name="middle_name"
                              v-model="applications.middle_name"
                              placeholder="Отчество"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.middle_name"
                          >
                            <p v-for="massage in errorMessage.messages.middle_name">
                              {{ massage }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Название департамента/управления/отдела
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
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.job
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              name="job"
                              v-model="applications.job"
                              placeholder="Должность"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.job"
                          >
                            <p v-for="massage in errorMessage.messages.job">{{ massage }}</p>
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
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.iin_bin
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="iin_bin"
                              v-model="applications.iin_bin"
                              placeholder="ИИН"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.iin_bin"
                          >
                            <p v-for="massage in errorMessage.messages.iin_bin">{{ massage }}</p>
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
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.email
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="email"
                              v-model="applications.email"
                              placeholder="Электронная почта"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.email"
                          >
                            <p v-for="massage in errorMessage.messages.email">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Пароль</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
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
                                class="input-linck"
                                v-model="password"
                                v-if="!inputType"
                                name="password"
                                placeholder="Пароль"
                              />
                              <input
                                type="text"
                                class="input-linck"
                                v-model="password"
                                v-else
                                name="password"
                                placeholder="Пароль"
                              />
                              <div class="password__eye">
                                <img
                                  src="../../../assets/img/icon-eye-off.svg"
                                  v-if="inputType"
                                  @click="inputType = false"
                                />
                                <img
                                  src="../../../assets/img/icon-eye.svg"
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
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Повтор пароля</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
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
                                class="input-linck"
                                v-model="comparePassword"
                                v-if="!inputType"
                                name="compare"
                                placeholder="Повтор пароля"
                              />
                              <input
                                type="text"
                                class="input-linck"
                                v-model="comparePassword"
                                v-else
                                name="compare"
                                placeholder="Повтор пароля"
                              />
                              <div class="password__eye">
                                <img
                                  src="../../../assets/img/icon-eye-off.svg"
                                  v-if="inputType"
                                  @click="inputType = false"
                                />
                                <img
                                  src="../../../assets/img/icon-eye.svg"
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
                    </div>
                  </div>
                   -->

                  <div class="form__line">
                    <div class="form__line--left"></div>
                    <div class="form__line--right">
                      <div
                        class="form__btn--line"
                        v-if="$store.getters.userPermission(['change_user'])"
                      >
                        <div class="input__row">
                          <button class="input-btn form__line--btn">
                            {{ $t('button.save') }}
                          </button>
                          <a
                            class="input-btn form__line--btn"
                            v-if="applications.is_deleted != '0'"
                            @click="activeElement(applications.id)"
                          >
                            Активировать
                          </a>
                          <a
                            class="input-btn form__line-error form__line--btn"
                            v-if="applications.is_deleted != '1'"
                            @click="$modal.show('modal_delete')"
                          >
                            Заблокировать <img src="../../../assets/img/icon-close-w.svg" />
                          </a>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-xl-5">
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
                            Вы уверены что хотите заблокировать пользователя<br />
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
                  </modal>
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
import { mapGetters, mapActions } from 'vuex';

import Multiselect from 'vue-multiselect';
import { api } from '@/boot/axios';

export default {
  name: 'UserManagementAdd',
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

      roleModel: [],
      roleList: null,

      password: '',
      comparePassword: '',
      inputType: false,
    };
  },
  computed: {
    ...mapGetters(['_getRegionList']),
    regionModel() {
      return this._getRegionList.filter((element) => {
        return this.applications.regions.find((region) => {
          if (element.id == region.region_id) return element;
        });
      });
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
    activeElement(id) {
      api
        .post('user/' + id + '/activate', {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;

            this.$router.push({ path: '/' + this.$i18n.locale + '/account/users' });
          }
        });
    },
    blockElement(evt) {
      const formData = new FormData(evt.target);
      api
        .post('user/' + this.applications.id + '/delete', formData, {
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
            this.apiGetUser();
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
      const fromEntries = Object.fromEntries(formData.entries());
      if (fromEntries.password != '' && fromEntries.compare != fromEntries.password) {
        this.errorMessage.status = 422;
        this.errorMessage.messages = {
          compare: [this.$t('system_message.comparePassword')],
          password: [this.$t('system_message.comparePassword')],
        };
      } else {
        formData.append('role_id', this.roleModel.id);
        if (this.regionModel) {
          this.regionModel.find((element, index) => {
            formData.append('regions[' + index + ']', element.id);
          });
        }
        if (fromEntries.password == '') {
          formData.delete('password');
          formData.delete('compare');
        }
        api
          .post('user/' + this.$route.params.id, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (response.status == 200) {
              this.message.status = 200;
              this.message.text = response.data.message;
              setTimeout(function () {
                this.$router.push({ path: '/' + this.$i18n.locale + '/account/users' });
              }, 3000);
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
    apiGetUserList() {
      api
        .get('user/role/list')
        .then((response) => {
          if (response.data) {
            this.roleList = response.data;
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
    apiGetUser() {
      api
        .get('user/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.applications = response.data;
            this.roleModel = response.data.role;
            this.roleModel.accesses.find((element) => {
              if (element == 'role_region') this.roleModel.role_region = true;
            });
            this._fetchRegionList();
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
