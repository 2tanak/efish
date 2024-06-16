<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack
                :title="'Просмотр отчета'"
                :subtitle="'Сведения об освоении квоты вылова рыбы и других водных животных пользователями'"
              />
              <div class="card__content--body">
                <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                  <AnimalWorldUserName />
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          {{ $t('inputs.region') }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <region
                          :name="'region_id'"
                          :key="render_region"
                          :required="true"
                          :errors="$v.formApp.region_id"
                          :disabled="statusPage == 'show'"
                          :modelValue="formApp.region_id"
                          :confinesValue="userRegions"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="formApp.region_id = $event"
                        >
                        </region>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          {{ $t('inputs.pond') }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <pond
                          :required="true"
                          :key="render_pond"
                          :errors="$v.formApp.farm_id"
                          :disabled="statusPage == 'show'"
                          :modelValue="formApp.farm_id"
                          :name="'farm_id'"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="formApp.farm_id = $event"
                        ></pond>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Выбрать квартал</div>
                      </div>

                      <div class="col-xl-5">
                        <quarter
                          :required="true"
                          :errors="$v.quarter_value"
                          :disabled="true"
                          ref="q"
                          :placeholder="'Выбрать регион'"
                          v-on:update:modelValue="quarter_value = $event"
                        >
                        </quarter>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

                  <div v-if="tradeApp" ref="tradeApp">
                    <div
                      v-for="(typeCatch, typeCatchInd) in tradeApp"
                      :key="typeCatch.keyd"
                      class="reporting-line"
                    >
                      <div class="row">
                        <div class="col-xl-4">
                          <div class="reporting__title">{{ typeCatch.typeCatch }}</div>
                        </div>
                        <div class="col-xl-7">
                          <div class="row total">
                            <div class="col-lg-6">
                              <TextInput
                                :name="'commercial_fishing[0][total_catch_quota]'"
                                :title="'Квота на вылов'"
                                :type="'number'"
                                :required="true"
                                :disabled="true"
                                :placeholder="'Квота на вылов'"
                                :modelValue="getFishesSum(typeCatchInd, 'quota')"
                              ></TextInput>
                            </div>
                            <div class="col-lg-6">
                              <TextInput
                                :name="'commercial_fishing[0][total_actually_caught]'"
                                :title="'Фактически выловлено'"
                                :type="'number'"
                                :required="true"
                                :disabled="true"
                                :placeholder="'Фактически выловлено'"
                                :modelValue="getFishesSum(typeCatchInd, 'caught')"
                              ></TextInput>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-xl-4">
                          <div class="reporting__title">В том числе по видам рыб</div>
                        </div>
                        <div class="col-xl-7">
                          <template v-if="typeCatch.fishes">
                            <div
                              v-for="(item, index) in typeCatch.fishes"
                              :key="index"
                              class="items"
                            >
                              <div class="row mb-2">
                                <div class="col-lg-4">
                                  <fish
                                    class="mb-2"
                                    :title="'Рыба'"
                                    :placeholder="'Выберите рыбу'"
                                    :name="'[' + index + '][weight]'"
                                    :disabled="true"
                                    :modelValue="item.id"
                                    :variant="'def-input'"
                                  ></fish>
                                </div>
                                <div class="col-lg-4">
                                  <TextInput
                                    :name="`[catch_quota]`"
                                    :title="'Квота на вылов'"
                                    :required="true"
                                    :disabled="true"
                                    :placeholder="$t('placeholder.quantity')"
                                    :modelValue="item.quota"
                                    v-on:blur="updateQuota(typeCatchInd, index, $event)"
                                  >
                                  </TextInput>
                                </div>
                                <div class="col-lg-4">
                                  <TextInput
                                    :name="`[actually_caught]`"
                                    :title="'Фактически выловлено'"
                                    :required="true"
                                    :disabled="true"
                                    :placeholder="$t('placeholder.quantity')"
                                    :modelValue="item.caught"
                                  >
                                  </TextInput>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Платежи за пользование животным миром</div>
                      </div>
                      <div class="col-xl-7">
                        <div class="row">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'План (тысяч тенге)'"
                              :type="'number'"
                              :name="'payment_plan'"
                              :required="true"
                              :errors="$v.formApp.payment_plan"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.payment_plan"
                              v-on:update:modelValue="formApp.payment_plan = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Фактически оплачено (тысяч тенге)'"
                              :type="'number'"
                              :name="'payment_fact'"
                              :errors="$v.formApp.payment_fact"
                              :required="true"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.payment_fact"
                              v-on:update:modelValue="formApp.payment_fact = $event"
                            >
                            </TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

                  <div v-if="!sign_status" class="reporting-btn">
                    <div class="reporting-wrapper">
                      <a class="input-btn form__line--btn" @click="activeElement()">
                        Подписать ЭЦП
                      </a>
                      <router-link
                        v-if="!sign_status"
                        :to="
                          '/' +
                          $i18n.locale +
                          '/account/reporting/1-rh/' +
                          $route.params.id +
                          '/edit'
                        "
                        class="input-btn form__line--btn form__line--btn-black"
                      >
                        {{ $t('button.edit') }}
                      </router-link>
                    </div>
                  </div>
                </form>

                <modal
                  class="modal__block modal__block--middle modal__block--success"
                  name="modal_save"
                  :width="550"
                  :min-width="550"
                  height="auto"
                >
                  <div class="modal__block--wrapper">
                    <div class="modal__block--close" @click="$modal.hide('modal_save')">
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
                          {{ $t('reporting.ecp_text') }}
                        </div>
                      </div>

                      <div class="modal__content">
                        <div class="modal__form">
                          <div class="block__row">
                            <div class="block__row--left">
                              <a class="block__item block__item--green">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 18.3333C14.6025 18.3333 18.3334 14.6025 18.3334 9.99996C18.3334 5.39746 14.6025 1.66663 10 1.66663C5.39752 1.66663 1.66669 5.39746 1.66669 9.99996C1.66669 14.6025 5.39752 18.3333 10 18.3333Z"
                                    stroke="#5ABB5E"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M7.5 10L9.16667 11.6667L12.5 8.33337"
                                    stroke="#5ABB5E"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                                {{ $t('button.save') }}
                              </a>
                            </div>
                            <div class="block__row--right">
                              <a
                                class="block__item block__item--blue"
                                @click="$modal.hide('modal_head')"
                              >
                                {{ $t('button.cancel') }}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </modal>

                <modal
                  class="modal__block modal__block--middle modal__block--success"
                  name="modal_head"
                  :width="550"
                  :min-width="550"
                  height="auto"
                >
                  <div class="modal__block--wrapper">
                    <div class="modal__block--close" @click="$modal.hide('modal_head')">
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
                          {{ $t('reporting.ecp_text') }}
                        </div>
                      </div>

                      <div class="modal__content">
                        <div class="modal__form">
                          <div class="block__row">
                            <div class="block__row--left">
                              <a class="block__item block__item--green">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 18.3333C14.6025 18.3333 18.3334 14.6025 18.3334 9.99996C18.3334 5.39746 14.6025 1.66663 10 1.66663C5.39752 1.66663 1.66669 5.39746 1.66669 9.99996C1.66669 14.6025 5.39752 18.3333 10 18.3333Z"
                                    stroke="#5ABB5E"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M7.5 10L9.16667 11.6667L12.5 8.33337"
                                    stroke="#5ABB5E"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                                {{ $t('button.ecp') }}
                              </a>
                            </div>
                            <div class="block__row--right">
                              <a
                                class="block__item block__item--blue"
                                @click="$modal.hide('modal_head')"
                              >
                                {{ $t('button.cancel') }}
                              </a>
                            </div>
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
</template>

<script>
import TextInput from '@/components/components/Inputs/TextInput';
import Region from '@/components/components/Inputs/region';
import Pond from '@/components/components/Inputs/pond';
import { api } from '@/boot/axios';
import { required } from 'vuelidate/lib/validators';
import quarter from '@/components/components/Inputs/quarter';
import moment from 'moment';
import Fish from '@/components/components/Inputs/fish';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import AnimalWorldUserName from '@/components/reporting-management/AnimalWorldUserName.vue';

export default {
  name: 'Report1View',
  components: {
    HeaderBack,
    AnimalWorldUserName,
    Pond,
    Region,
    TextInput,
    quarter,
    Fish,
  },
  props: {
    statusPage: {
      type: String,
      default: 'create',
    },
  },
  validations: {
    formApp: {
      region_id: {
        required,
      },
      farm_id: {
        required,
      },
      district_id: {
        required,
      },
      kato_id: {
        required,
      },
      // surrender_date_start: {
      //   required
      // },
      // surrender_date_end: {
      //   required
      // },
      payment_plan: {
        required,
      },
      payment_fact: {
        required,
      },
      amateur_catch_quota: {
        required,
      },
      amateur_actually_caught: {
        required,
      },
      meliorative_catch_quota: {
        required,
      },
      meliorative_actually_caught: {
        required,
      },
    },
  },
  data() {
    return {
      application: null,
      userRegions: null,
      id: null,
      tradeApp: null,
      render_pond: 0,
      render_region: 0,
      render_district: 0,
      quarter_value: null,
      sign_status: false,
      filters: {
        date_from: null,
        date_to: null,
      },
      formApp: {
        region_id: null,
        farm_id: null,
        district_id: null,
        kato_id: null,
        amateur_catch_quota: null,
        amateur_actually_caught: null,
        meliorative_catch_quota: null,
        meliorative_actually_caught: null,
        payment_fact: null,
        payment_plan: null,
      },
    };
  },
  computed: {
    getFishesSum() {
      return (typeInd, key) => {
        return (this.tradeApp || [])[typeInd]?.fishes.reduce((summ, elem) => {
          summ += Number(elem[key]);
          return summ;
        }, 0);
      };
    },
  },
  watch: {
    'formApp.district_id': function () {
      this.render_district++;
    },
    'formApp.region_id': function () {
      this.render_pond++;
      this.render_region++;
    },
  },
  methods: {
    getQuaterInterval() {
      const quarter = moment().month(this.quarter_value);
      if (this.quarter_value === 6 || this.quarter_value === 9) {
        quarter.subtract('years', 1);
      }

      const start_quarter = quarter.startOf('month').format('YYYY-MM-D');
      const end_quarter = quarter.add('month', 2).endOf('month').format('YYYY-MM-D');

      return [start_quarter, end_quarter];
    },
    activeElement() {
      if (this.$configFile.active) return this.sendEcpKey();
      this.ecp = false;
      const websocket = new WebSocket('wss://127.0.0.1:13579/');
      var ready = null;
      let ecpData = {
        path: null,
        owner: null,
        data: null,
      };
      websocket.onopen = () => {
        ready = true;
        handle();
      };
      websocket.onclose = (e) => {
        if (e.wasClean) {
        } else {
          if (this.$i18n.locale == 'kz')
            alert('NCYLayer бағдарламасы іске қосылғандығына көз жеткізіңіз');
          if (this.$i18n.locale == 'ru') alert('Убедитесь, что программа NCALayer запущена');
          if (this.$i18n.locale == 'en') alert('Make sure that the NCALayer program is running');

          //setErrormodal(true);
          setTimeout(() => {
            //setErrormodal(false);
          }, 5000);
        }
      };
      function handle() {
        if (!ready) {
          alert('Убедитесь, что программа NCALayer запущена');
        } else {
          const data = {
            module: 'kz.gov.pki.knca.commonUtils',
            method: 'signXml',
            args: [
              'PKCS12',
              'SIGNATURE',
              '<login><sessionid>caacda70-fd36-45ed-8d94-45a88890f83a</sessionid></login>',
              '',
              '',
            ],
          };
          websocket.send(JSON.stringify(data));
        }
      }
      websocket.onmessage = (e) => {
        const data1 = JSON.parse(e.data);
        this.dataEcp = data1.responseObject;
        if (data1.responseObject) {
          this.sendEcpKey();
        }
      };
    },
    sendEcpKey() {
      const formData = new FormData();
      formData.append('report_id', this.$route.params.id);
      formData.append('xml', this.dataEcp || this.$configFile.xml);
      document.querySelector('.preloader').classList.add('active');
      api
        .post(`subject/sign/1/${this.$route.params.id}`, formData)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/1-rh' });
            document.querySelector('.preloader').classList.remove('active');
          }
        })
        .catch(() => {});
    },
    formatDate(date) {
      let str = '';
      const dateArr = date.split('.').reverse();
      str = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
      return str;
    },
    checkStatusSign() {
      api
        .get('subject/list/1')
        .then((response) => {
          if (response.data) {
            const post_status = response.data.data.find((e) => {
              return e.id == this.$route.params.id;
            });

            if (post_status.status) {
              if (post_status.status === 'Подписан') {
                this.sign_status = true;
              }
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
        });
    },
    async showDetailManagment() {
      try {
        const { data } = await api.get(`subject/show/1/${this.$route.params.id}`);
        this.application = data.data;
        this.id = data.data.id;
        const datastart = data.data.surrender_date_start;
        if (datastart) {
          const format = moment(datastart, 'YYYY,MM,D');
          const month_number = format.format('M') - 1;

          let list_quarter = this.$refs.q.list_quarter;

          list_quarter = list_quarter.find((item) => {
            if (item.period.includes(month_number)) {
              return true;
            }
          });
          if (Object.values(list_quarter).length > 0) {
            this.$refs.q.value = list_quarter;
          }
        }

        this.formApp.region_id = data.data.region_id;
        this.formApp.farm_id = data.data.farm_id;
        this.formApp.district_id = data.data.district_id;
        this.formApp.kato_id = data.data.kato_id;
        this.formApp.payment_fact = data.data.payment_fact;
        this.formApp.payment_plan = data.data.payment_plan;
        this.formApp.amateur_catch_quota =
          data.data.amateur_meliorative_fishing.amateur_catch_quota;
        this.formApp.amateur_actually_caught =
          data.data.amateur_meliorative_fishing.amateur_actually_caught;
        this.formApp.meliorative_catch_quota =
          data.data.amateur_meliorative_fishing.meliorative_catch_quota;
        this.formApp.meliorative_actually_caught =
          data.data.amateur_meliorative_fishing.meliorative_actually_caught;
        setTimeout(() => {
          //document.querySelectorAll(".date__input")[0].value = this.formatDate(data.data.surrender_date_start)
          //document.querySelectorAll(".date__input")[1].value = this.formatDate(data.data.surrender_date_end)
        }, 100);
      } catch (error) {}
    },
    getApplications() {
      if (
        !this.formApp.farm_id ||
        !this.formApp.region_id ||
        typeof this.quarter_value !== 'number'
      )
        return;
      const [start_quarter, end_quarter] = this.getQuaterInterval();
      this.tradeApp = null;
      api
        .get('trade/user/from-to', {
          params: {
            surrender_date_start: start_quarter,
            surrender_date_end: end_quarter,
            region_id: this.formApp.region_id,
            reservoir_id: this.formApp.farm_id,
          },
        })
        .then((response) => {
          if (response.data) {
            const tradeApp = response.data.data;

            if (this.statusPage !== 'create' && this.application) {
              this.application.typeCatches.forEach((typeCatch) => {
                const trade = tradeApp.find(
                  (trade) => trade.typeCatchId === typeCatch.type_catch_id,
                );
                if (trade) {
                  trade.fishes.forEach((fish) => {
                    fish.quota =
                      typeCatch.fishes.find((f) => f.fish_id === fish.id)?.quota || fish.quota;
                  });
                }
              });
            }

            this.tradeApp = tradeApp;
          }
        });
    },
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },

  async beforeMount() {
    await this.showDetailManagment();
    this.getApplications();
    this.checkStatusSign();
  },
};
</script>

<style scoped></style>
import { forEach } from 'core-js/core/array';import { forEach } from 'core-js/core/array';
