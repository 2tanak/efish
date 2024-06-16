<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !roleList }">
    <v-preloader v-if="!roleList" :message="errorMessage"></v-preloader>

    <div class="container" v-if="roleList">
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
                    <div class="content__title--text">Регистрация пользователя</div>
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
                  <div class="form__line" v-if="_getRegionList && roleModel.role_region">
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
                  <!--
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Пароль
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <div class="form__block--input" :class="[errorMessage.messages && errorMessage.messages.password ? 'input--error' : '']">
                              <input type="password" class="input-linck" v-model="password" v-if="!inputType" name="password"  placeholder="Пароль">
                              <input type="text"     class="input-linck" v-model="password" v-else name="password" placeholder="Пароль">
                              <div class="password__eye">
                                <img src="../../../assets/img/icon-eye-off.svg" v-if="inputType" @click="inputType=false" >
                                <img src="../../../assets/img/icon-eye.svg" v-else @click="inputType=true" >
                              </div>
                            </div>
                            <div class="input-required" v-if="errorMessage.messages && errorMessage.messages.password"><p v-for="massage in errorMessage.messages.password">{{ massage }}</p></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Повтор пароля
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <div class="form__block--input" :class="[errorMessage.messages && errorMessage.messages.password ? 'input--error' : '']">
                              <input type="password" class="input-linck" v-model="comparePassword" v-if="!inputType" name="compare" placeholder="Повтор пароля">
                              <input type="text"     class="input-linck" v-model="comparePassword" v-else name="compare" placeholder="Повтор пароля">
                              <div class="password__eye">
                                <img src="../../../assets/img/icon-eye-off.svg" v-if="inputType" @click="inputType=false" >
                                <img src="../../../assets/img/icon-eye.svg" v-else @click="inputType=true" >
                              </div>
                            </div>
                            <div class="input-required" v-if="errorMessage.messages && errorMessage.messages.compare"><p v-for="massage in errorMessage.messages.compare">{{ massage }}</p></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  -->

                  <div class="form__line">
                    <div class="form__line--left"></div>
                    <div class="form__line--right">
                      <div class="input__row" v-if="$store.getters.userPermission(['change_user'])">
                        <button class="input-btn form__line--btn">Регистрация</button>
                      </div>

                      <div class="row">
                        <div class="col-xl-5">
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
                                {{ message.text }}
                              </span>
                            </label>
                          </div>
                        </div>
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

      message: '',

      roleModel: [],
      roleList: null,
      regionModel: [],

      password: '',
      comparePassword: '',
      inputType: false,
    };
  },
  computed: {
    ...mapGetters(['_getRegionList']),
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
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
      /*if(fromEntries.compare != fromEntries.password){
        this.errorMessage.status = 422;
        this.errorMessage.messages = {
          compare: [this.$t('system_message.comparePassword')],
          password: [this.$t('system_message.comparePassword')]
        };
      }else{*/
      formData.append('role_id', this.roleModel.id);
      if (this.regionModel) {
        this.regionModel.find((element, index) => {
          formData.append('regions[' + index + ']', element.id);
        });
      }
      api
        .post('user/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.errorMessage.status = 200;
            this.errorMessage.text = response.data.message;
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/users' });
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
      //}
    },
    apiGetUserList() {
      api
        .get('user/role/list')
        .then((response) => {
          if (response.data) {
            this.roleList = response.data;
            response.data.find((element) => {
              element.accesses.find((accesse) => {
                if (accesse == 'role_region') element.role_region = true;
              });
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
    this._fetchRegionList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>

<style scoped></style>
