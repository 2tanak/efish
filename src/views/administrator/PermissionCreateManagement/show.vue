<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader': !_getFishes || !_getGuns || !application,
    }"
  >
    <v-preloader
      v-if="!_getFishes || !_getGuns || !application"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="_getFishes && _getGuns && application">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['PermissionCreateManagement']"></v-sidebar>
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
                    <div class="content__title--text">Заявка на разрешение на вылов</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Номер</div>
                  </div>
                  <div class="form__line--right">
                    <div class="col-xl-5">
                      <div
                        class="form__line--input"
                        :class="[
                          errorMessage.messages && errorMessage.messages.code ? 'input--error' : '',
                        ]"
                      >
                        <input
                          type="text"
                          class="input-linck"
                          required=""
                          name="code"
                          :value="application.code"
                          disabled
                          placeholder="Номер"
                        />
                      </div>
                      <div
                        class="input-required"
                        v-if="errorMessage.messages && errorMessage.messages.code"
                      >
                        <p v-for="massage in errorMessage.messages.code">{{ massage }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Наименование</div>
                  </div>
                  <div class="form__line--right">
                    <div class="col-xl-5">
                      <div
                        class="form__line--input"
                        :class="[
                          errorMessage.messages && errorMessage.messages.name ? 'input--error' : '',
                        ]"
                      >
                        <input
                          type="text"
                          class="input-linck"
                          required=""
                          name="name"
                          :value="application.name"
                          disabled
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
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">ИИН/БИН</div>
                  </div>
                  <div class="form__line--right">
                    <div class="col-xl-5">
                      <div
                        class="form__line--input"
                        :class="[
                          errorMessage.messages && errorMessage.messages.user_iin
                            ? 'input--error'
                            : '',
                        ]"
                      >
                        <input
                          type="text"
                          class="input-linck"
                          required=""
                          name="user_iin"
                          :value="application.user_iin"
                          disabled
                          placeholder="ИИН/БИН"
                        />
                      </div>
                      <div
                        class="input-required"
                        v-if="errorMessage.messages && errorMessage.messages.user_iin"
                      >
                        <p v-for="massage in errorMessage.messages.user_iin">{{ massage }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Дата заявки</div>
                  </div>
                  <div class="form__line--right">
                    <div class="col-xl-5">
                      <div
                        class="form__line--input"
                        :class="[
                          errorMessage.messages && errorMessage.messages.date_at
                            ? 'input--error'
                            : '',
                        ]"
                      >
                        <input
                          type="text"
                          class="input-linck"
                          required=""
                          name="date_at"
                          :value="application.date_at | formatDate"
                          disabled
                          placeholder="Дата"
                        />
                      </div>
                      <div
                        class="input-required"
                        v-if="errorMessage.messages && errorMessage.messages.date_at"
                      >
                        <p v-for="massage in errorMessage.messages.date_at">{{ massage }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Данные</div>
                  </div>
                  <div class="form__line--right">
                    <div class="col-xl-5">
                      <div
                        class="form__line--input"
                        :class="[
                          errorMessage.messages && errorMessage.messages.data ? 'input--error' : '',
                        ]"
                      >
                        <textarea
                          class="input-linck"
                          required=""
                          name="data"
                          placeholder="Данные"
                          >{{ application.data }}</textarea
                        >
                      </div>
                      <div
                        class="input-required"
                        v-if="errorMessage.messages && errorMessage.messages.data"
                      >
                        <p v-for="massage in errorMessage.messages.data">{{ massage }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Наименование региона</div>
                  </div>
                  <div class="form__line--right">
                    <div class="col-xl-5">
                      <div class="form__line--input">
                        <input
                          type="text"
                          class="input-linck"
                          required=""
                          name="date_at"
                          :value="application.region.value"
                          disabled
                          placeholder="Наименование региона"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Наименование водоема</div>
                  </div>
                  <div class="form__line--right">
                    <div class="col-xl-5">
                      <div class="form__line--input">
                        <input
                          type="text"
                          class="input-linck"
                          required=""
                          name="date_at"
                          :value="application.pond.value"
                          disabled
                          placeholder="Наименование водоема"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="form__line" />

                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">
                      Виды и количество использованных орудий лова
                    </div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-7">
                        <div class="quota-fish__line" v-for="(gear, gearIndex) in formList.gears">
                          <div class="form__line--input">
                            <div class="row align-items-center">
                              <div class="col-xl-10">
                                <div class="quota-fish__item">
                                  <div class="row align-items-center">
                                    <div class="col-xl-7">
                                      <div class="form__line--input">
                                        <input
                                          type="text"
                                          class="input-linck"
                                          v-model="gear.name"
                                          disabled
                                          placeholder="0"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-xl-5">
                                      <div class="form__line--input">
                                        <input
                                          type="number"
                                          step=".01"
                                          min="0"
                                          class="input-linck"
                                          v-model="gear.value"
                                          placeholder="0"
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
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Видовой состав улова, виды рыб / тон.</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-7">
                        <div class="quota-fish__line" v-for="(fish, fishIndex) in formList.fish">
                          <div class="form__line--input">
                            <div class="row align-items-center">
                              <div class="col-xl-10">
                                <div class="quota-fish__item">
                                  <div class="row align-items-center">
                                    <div class="col-xl-7">
                                      <div class="form__line--input">
                                        <input
                                          type="text"
                                          class="input-linck"
                                          v-model="fish.name"
                                          disabled
                                          placeholder="0"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-xl-5">
                                      <div class="form__line--input">
                                        <input
                                          type="number"
                                          step=".01"
                                          min="0"
                                          class="input-linck"
                                          v-model="fish.value"
                                          placeholder="0"
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
import { api } from '@/boot/axios';

export default {
  data() {
    return {
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      application: null,

      gearsList: [],
      tradeGears: null,
      tradeGearsValue: null,

      fildsList: [],
      tradeFish: null,
      tradeFishValue: null,
    };
  },
  computed: {
    ...mapGetters(['_getFishes', '_getGuns']),
    formList() {
      let gearsList = [];
      gearsList = this._getGuns.filter((element) => {
        return this.application.gears.find((e) => {
          if (e.gear_id == element.id) {
            element.value = e.value;
            return true;
          }
        });
      });

      let fishList = [];
      fishList = this._getFishes.filter((element) => {
        return this.application.fishs.find((e) => {
          if (e.fish_id == element.id) {
            element.value = e.value;
            return true;
          }
        });
      });

      let list = {
        fish: fishList,
        gears: gearsList,
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchFishes', '_fetchGuns']),
    apiGetPermission() {
      api
        .get('permission-application/' + this.$route.params.id)
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
  beforeMount() {
    this._fetchFishes();
    this._fetchGuns();
    this.apiGetPermission();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>

<style scoped></style>
