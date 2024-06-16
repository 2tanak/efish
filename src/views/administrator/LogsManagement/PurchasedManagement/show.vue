<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !_getFishes || !application }"
  >
    <v-preloader v-if="!_getFishes || !application" :message="errorMessage"></v-preloader>

    <div class="container" v-if="_getFishes && application">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['PurchasedManagement', 'TradeManagementMain']"></v-sidebar>
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
                    <div class="content__title--text">Журнал учета закупленной рыбы</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Внутренний рынок/Импорт</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="catch_at"
                              :value="
                                application.type == 'interior' ? 'Внутренний рынок' : 'Импорт'
                              "
                              disabled
                              placeholder="Дата улова"
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

                  <div v-if="application.type == 'interior'">
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
                  <div v-if="application.type == 'import'">
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Страна импорта</div>
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
                                ref="country_id"
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
                                value=""
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
                        <div class="form__line--title">
                          Номер вет. сертификата<br />(страна Отправитель)
                        </div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.certificate_sender
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
                                ref="certificate_sender"
                                :value="application.certificate_sender"
                                placeholder="Номер"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="
                                errorMessage.messages && errorMessage.messages.certificate_sender
                              "
                            >
                              <p v-for="massage in errorMessage.messages.certificate_sender">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">
                          Номер вет. сертификата<br />(Внутренний)
                        </div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.certificate_interior
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                type="text"
                                class="input-linck"
                                required=""
                                name="certificate_interior"
                                disabled
                                ref="certificate_interior"
                                :value="application.certificate_interior"
                                placeholder="Номер"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="
                                errorMessage.messages && errorMessage.messages.certificate_interior
                              "
                            >
                              <p v-for="massage in errorMessage.messages.certificate_interior">
                                {{ massage }}
                              </p>
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
        certificate_sender: '',
        certificate_interior: '',
      },
      data: {
        id: 0,
        name: 'Внутренний рынок',
        type: 'interior',
      },
      dataList: [
        {
          id: 0,
          name: 'Внутренний рынок',
          type: 'interior',
        },
        {
          id: 1,
          name: 'Импорт',
          type: 'import',
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
    apiGetPurchased() {
      api
        .get('purchased/' + this.$route.params.id)
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
    this.apiGetPurchased();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>

<style scoped></style>
