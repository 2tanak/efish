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
                :title="getReportTitle"
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
                          :required="true"
                          :key="render_region"
                          :errors="$v.formApp.region_id"
                          :disabled="false"
                          :modelValue="formApp.region_id"
                          :userBind="userRegions"
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
                          :disabled="false"
                          :userBind="userPond"
                          :modelValue="formApp.farm_id"
                          :name="'farm_id'"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="formApp.farm_id = $event"
                        ></pond>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          {{ $t('inputs.district') }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <district
                          :required="true"
                          :key="render_district"
                          :disabled="false"
                          :errors="$v.formApp.district_id"
                          :modelValue="formApp.district_id"
                          :name="'district_id'"
                          :userBind="userPond"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="formApp.district_id = $event"
                        ></district>
                      </div>
                    </div>
                  </div> -->

                  <kato
                    :required="true"
                    :hidden="true"
                    :disabled="statusPage == 'show'"
                    :errors="$v.formApp.kato_id"
                    :modelValue="formApp.kato_id"
                    :name="'kato_id'"
                    :placeholder="$t('placeholder.choose')"
                    v-on:update:modelValue="formApp.kato_id = $event"
                  >
                  </kato>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Выбрать квартал</div>
                      </div>
                      <div class="col-xl-5">
                        <quarter
                          :disabled="quarter_input_disabled"
                          :required="true"
                          :errors="$v.quarter_value"
                          :placeholder="'Выбрать регион'"
                          ref="q"
                          v-on:update:modelValue="quarter_value = $event"
                        >
                        </quarter>
                      </div>
                    </div>

                    <div class="input-required" v-if="$v.quarter && !$v.quarter.required">
                      {{ $t('system_message.required_message') }}
                    </div>
                  </div>

                  <!-------------
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Период от
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <input type="date" v-model="filters.from" class="date__input">
                      </div>
                    </div>
                  </div>
				  ----------------->
                  <!------
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Период до
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <input type="date" v-model="filters.to" class="date__input">
                      </div>
                    </div>
                  </div>
                ------------------------->
                  <hr class="reporting__hr" />
                  <div v-if="tradeApp && tradeApp.length" ref="tradeApp">
                    <div
                      v-for="(typeCatch, typeCatchInd) in tradeApp"
                      :key="typeCatchInd.keyd"
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
                                    :disabled="false"
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
                  <div v-else-if="tradeApp && !tradeApp.length">
                    На данный квартал по водоему нет записей в журнале
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

                  <div v-if="tradeApp && tradeApp.length" class="reporting-btn">
                    <div class="reporting-wrapper">
                      <button
                        class="input-btn form__line--btn"
                        v-if="statusPage == 'create' || statusPage == 'edit'"
                      >
                        {{ $t('button.save') }}
                      </button>
                      <!--
                      <a
                        class="input-btn form__line--btn"
                        @click="$modal.show('modal_head')"
                        v-if="statusPage == 'show'"
                      >
                        {{ $t("button.ecp") }}
                      </a>
                      <a
                        :href="
                          '/' +
                          $i18n.locale +
                          '/account/reporting/2-rh/' +
                          $route.params.id +
                          '/edit'
                        "
                        class="input-btn form__line--btn form__line--btn-black"
                        v-if="statusPage == 'show'"
                      >
                        {{ $t("button.edit") }}
                      </a>
                      -->
                    </div>
                  </div>
                </form>

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
                              <a class="block__item block__item--green" @click="saveElementReport">
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
                              <a class="block__item block__item--green" @click="saveElementReport">
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
import TextInput from '@/components/components/Inputs/TextInput.vue';
import Region from '@/components/components/Inputs/region';
import quarter from '@/components/components/Inputs/quarter';
import Pond from '@/components/components/Inputs/pond';
import District from '@/components/components/Inputs/district';
import Kato from '@/components/components/Inputs/kato';
import { api } from '@/boot/axios';
import { required } from 'vuelidate/lib/validators';
// import { convertObjectToFormData } from '@/formData';
import moment from 'moment';
import Fish from '@/components/components/Inputs/fish';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import AnimalWorldUserName from '@/components/reporting-management/AnimalWorldUserName.vue';

export default {
  name: 'edit',
  components: {
    HeaderBack,
    AnimalWorldUserName,
    Kato,
    District,
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
    quarter_value: {
      required,
    },
    formApp: {
      region_id: {
        required,
      },
      farm_id: {
        required,
      },
      // district_id: {
      //   required,
      // },
      payment_plan: {
        required,
      },
      payment_fact: {
        required,
      },
      // amateur_catch_quota: {
      //   required,
      // },
      // amateur_actually_caught: {
      //   required,
      // },
      // meliorative_catch_quota: {
      //   required,
      // },
      // meliorative_actually_caught: {
      //   required,
      // },
    },
  },
  data() {
    return {
      application: null,
      message: {
        status: null,
        text: null,
      },
      userRegions: null,
      tradeApp: null,
      sign_status: false,
      render_pond: 0,
      render_region: 0,
      render_district: 0,
      applicationsUser: null,
      id: null,
      quarter_input_disabled: false,
      dataEcp: null,
      filters: {
        date_from: null,
        date_to: null,
      },
      quarter_value: null,
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
  watch: {
    '$store.state.userObject': {
      immediate: true,
      handler: function () {
        this.apiGetUserRegions();
      },
    },
    'formApp.region_id': function () {
      this.render_pond++;
      this.render_region++;
      this.getApplications();
    },
    'formApp.district_id': function () {
      this.render_district++;
    },
    sign_status: function (val) {
      if (val === true) {
        this.$router.push('/ru/account/reporting/1-rh');
      }
    },
    quarter_value() {
      this.getApplications();
    },
    'formApp.farm_id': function () {
      this.getApplications();
    },
  },
  computed: {
    getReportTitle() {
      if (this.statusPage == 'show') return this.$t('reporting.title');
      else if (this.statusPage == 'edit') return 'Редактирование отчета';
      return 'Добавление нового отчета';
    },
    userPond() {
      return this.applicationsUser?.pond || [];
    },
    getFishesSum() {
      return (typeInd, key) => {
        return (this.tradeApp || [])[typeInd]?.fishes.reduce((summ, elem) => {
          summ += Number(elem[key]);
          return summ;
        }, 0);
      };
    },
  },
  methods: {
    updateQuota(typeInd, fishInd, value) {
      this.tradeApp = this.tradeApp?.map((type, tInd) => {
        if (tInd === typeInd) {
          return {
            typeCatchId: type.typeCatchId,
            typeCatch: type.typeCatch,
            keyd: type.keyd,
            fishes: type.fishes.map((fish, fInd) => {
              if (fInd === fishInd) {
                return {
                  ...fish,
                  quota: value,
                };
              } else return fish;
            }),
          };
        } else return type;
      });
    },
    getQuaterInterval() {
      const quarter = moment().month(this.quarter_value);
      if (this.quarter_value === 6 || this.quarter_value === 9) {
        quarter.subtract('years', 1);
      }

      const start_quarter = quarter.startOf('month').format('YYYY-MM-D');
      const end_quarter = quarter.add('month', 2).endOf('month').format('YYYY-MM-D');

      return [start_quarter, end_quarter];
    },
    saveElementReport() {
      const formData = new FormData();

      if (this.statusPage === 'edit') {
        formData.append('_method', 'PUT');
      }

      formData.append('region_id', this.formApp.region_id);
      formData.append('farm_id', this.formApp.farm_id);

      if (this.quarter_value || this.quarter_value === 0) {
        const [start_quarter, end_quarter] = this.getQuaterInterval();

        formData.append('surrender_date_start', start_quarter || '2023-01-01');
        formData.append('surrender_date_end', end_quarter || '2023-01-01');
      }

      this.tradeApp.forEach((trade, tradeInd) => {
        formData.append(`type_catches[${tradeInd}][type_catch_id]`, trade.typeCatchId);
        formData.append(
          `type_catches[${tradeInd}][type_catch_quota]`,
          this.getFishesSum(tradeInd, 'quota'),
        );
        formData.append(
          `type_catches[${tradeInd}][type_catch_caught]`,
          this.getFishesSum(tradeInd, 'caught'),
        );

        trade.fishes.forEach((fish, fishInd) => {
          formData.append(`type_catches[${tradeInd}][fishes][${fishInd}][fish_id]`, fish.id);
          formData.append(`type_catches[${tradeInd}][fishes][${fishInd}][quota]`, fish.quota);
          formData.append(`type_catches[${tradeInd}][fishes][${fishInd}][caught]`, fish.caught);
        });
      });

      formData.append('payment_plan', this.formApp.payment_plan);
      formData.append('payment_fact', this.formApp.payment_fact);

      const current_month_number = moment().format('M') - 1;

      const selected_q = this.$refs.q.list_quarter.find((item) => {
        if (item.period.includes(this.quarter_value)) {
          return true;
        }
      });

      if (!selected_q.period.includes(current_month_number)) {
        document.querySelector('.preloader').classList.remove('active');
        this.message.status = 402;
        this.message.text = 'Cрок сдачи отчета просрочен';
        return false;
      }

      if (this.$route.path.includes('edit')) {
        api
          .post(`/subject/store/1/${this.$route.params.id}`, formData)
          .then(() => {
            //this.$router.push("/ru/account/reporting/1-rh");
            this.$router.push({
              path: '/' + this.$i18n.locale + '/account/reporting/1-rh',
            });
            document.querySelector('.preloader').classList.remove('active');
          })
          .catch((err) => {
            document.querySelector('.preloader').classList.remove('active');

            this.message = {
              status: err.response.status,
              text: err.response.data.message,
            };
            if (err?.response?.status == 500) {
              this.message.status = 500;
              this.message.text = this.$t('system_message.500');
            }
            if (err?.response?.status == 401) {
              this.message.status = 401;
              this.message.text = err.response.data.error_message;
              this.$router.push('/' + this.$i18n.locale + '/login');
            }
            if (err?.response?.status == 422) {
              this.message.status = 422;
              this.message.text = `Данные неправильно введены`;
            }
          });
      } else {
        api
          .post('/subject/store/1', formData)
          .then(() => {
            this.$router.go(-1);
            document.querySelector('.preloader').classList.remove('active');
          })
          .catch((err) => {
            document.querySelector('.preloader').classList.remove('active');

            this.message = {
              status: err.response.status,
              text: err.response.data.message,
            };

            this.message = {
              status: err.response.status,
              text: err.response.data.message,
            };
            if (err?.response?.status == 500) {
              this.message.status = 500;
              this.message.text = this.$t('system_message.500');
            }
            if (err?.response?.status == 401) {
              this.message.status = 401;
              this.message.text = err.response.data.error_message;
              this.$router.push('/' + this.$i18n.locale + '/login');
            }
            if (err?.response?.status == 422) {
              this.message.status = 422;
              this.message.text = `Данные неправильно введены`;
            }
          });
      }
    },
    apiGetUserRegions() {
      if (this.$store.state.userObject && this.$store.state.userObject.regions) {
        let array = [];
        this.$store.state.userObject.regions.find((element) => {
          array.push(element.region_id);
        });
        this.userRegions = array;
      }
    },
    apiGetUser() {
      api
        .get('/user/region')
        .then((response) => {
          if (response.data) {
            this.applicationsUser = response.data;
          }
        })
        .catch((error) => {
          if (error.response) {
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
          }
        });
    },
    onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        document.querySelector('.preloader').classList.add('active');
        this.saveElementReport();
      }
      // this.$modal.show('modal_save')
    },
    //Test
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
    formatDate(date) {
      let str = '';
      const dateArr = date.split('.').reverse();
      str = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
      return str;
    },
    async showDetailManagment() {
      if (this.$route.path.includes('edit')) {
        try {
          const { data } = await api.get(`subject/show/1/${this.$route.params.id}`);
          this.application = data.data;

          const datastart = data.data.surrender_date_start;
          if (datastart) {
            const format = moment(datastart, 'YYYY,MM,D');
            const month_number = format.format('M') - 1;
            const list_quarters = this.$refs.q.list_quarter;
            const quarter_element_selected = list_quarters.find((item) => {
              if (item.period.includes(month_number)) {
                return true;
              }
            });

            if (quarter_element_selected) {
              if (Object.values(quarter_element_selected).length > 0) {
                this.quarter_input_disabled = true;
                this.$refs.q.value = quarter_element_selected;
              } else {
                this.quarter_input_disabled = false;
              }
            }
          }

          this.id = data.data.id;
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
            document.querySelectorAll('.date__input')[0].value = this.formatDate(
              data.data.surrender_date_start,
            );
            document.querySelectorAll('.date__input')[1].value = this.formatDate(
              data.data.surrender_date_end,
            );
          }, 100);
        } catch (error) {}
      }
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
        });
    },
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  beforeMount() {
    this.checkStatusSign();
    this.showDetailManagment();
    this.apiGetUser();
  },
};
</script>

<style scoped></style>
