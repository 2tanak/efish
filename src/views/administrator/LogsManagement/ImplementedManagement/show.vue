<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !_getFishes || !application }"
  >
    <v-preloader v-if="!_getFishes || !application" :message="errorMessage"></v-preloader>

    <div class="container" v-if="_getFishes && application">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ImplementedManagement', 'TradeManagementMain']"></v-sidebar>
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
                    <div class="content__title--text">Журнал учета реализованной рыбы</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Реализация</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              v-if="application.type == 'wholesale'"
                              type="text"
                              class="input-linck"
                              required=""
                              name="catch_at"
                              value="Оптовая"
                              disabled
                              placeholder="Реализация"
                            />
                            <input
                              v-if="application.type == 'retail'"
                              type="text"
                              class="input-linck"
                              required=""
                              name="catch_at"
                              value="Розничная"
                              disabled
                              placeholder="Реализация"
                            />
                            <input
                              v-if="application.type == 'export'"
                              type="text"
                              class="input-linck"
                              required=""
                              name="catch_at"
                              value="Экспорт"
                              disabled
                              placeholder="Реализация"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Дата закупки</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.catch_at
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="catch_at"
                              :value="application.catch_at | formatDate"
                              disabled
                              placeholder="Дата улова"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.catch_at"
                          >
                            <p v-for="massage in errorMessage.messages.catch_at">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="form__line" />

                  <div v-if="application.type == 'wholesale'">
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Наименование организации</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.company
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                name="company"
                                ref="company"
                                disabled
                                :value="application.company"
                                placeholder="Наименование"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.company"
                            >
                              <p v-for="massage in errorMessage.messages.company">{{ massage }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Номер справки о происхождении</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.reference
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                name="company"
                                ref="company"
                                disabled
                                :value="application.reference"
                                placeholder="Номер"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.reference"
                            >
                              <p v-for="massage in errorMessage.messages.reference">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="application.type == 'retail'">
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Номер справки о происхождении</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.reference
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                name="reference"
                                ref="reference"
                                disabled
                                :value="application.reference"
                                value=""
                                placeholder="Номер"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.reference"
                            >
                              <p v-for="massage in errorMessage.messages.reference">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="application.type == 'export'">
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Страна экспорта</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.country_id
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                name="country_id"
                                disabled
                                :value="application.country_id"
                                placeholder="Наименование"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.country_id"
                            >
                              <p v-for="massage in errorMessage.messages.country_id">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Номер накладной</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.waybill
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                name="certificate_sender"
                                disabled
                                :value="application.waybill"
                                value=""
                                placeholder="Номер"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.waybill"
                            >
                              <p v-for="massage in errorMessage.messages.waybill">{{ massage }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="form__line" />

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
                                            :value="fish.name"
                                            disabled
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
                                            disabled
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

      fildsList: [],
      tradeFish: null,
      tradeFishValue: null,

      value: {
        company: '',
        reference: '',
        waybill: '',
      },
      data: {
        id: 0,
        name: 'Оптовая',
        type: 'wholesale',
      },
      dataList: [
        {
          id: 0,
          name: 'Оптовая',
          type: 'wholesale',
        },
        {
          id: 1,
          name: 'Розничная',
          type: 'retail',
        },
        {
          id: 2,
          name: 'Экспорт',
          type: 'export',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['_getFishes']),
    formList() {
      let fishList = [];
      fishList = this._getFishes.filter((element) => {
        return this.application.fishs.find((e) => {
          if (e.fish_id == element.id) {
            element.value = String(e.value);
            return true;
          }
        });
      });
      let list = {
        fish: fishList,
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchFishes']),
    apiGetImplemented() {
      api
        .get('implemented/' + this.$route.params.id)
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
    this.apiGetImplemented();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>

<style scoped></style>
