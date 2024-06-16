<template>
  <div class="wrap__content" :key="render">
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
                          :disabled="true"
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
                          :disabled="true"
                          :userBind="userPond"
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
                        <div class="reporting__title">
                          {{ $t('inputs.district') }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <district
                          :required="true"
                          :key="render_district"
                          :disabled="true"
                          :errors="$v.formApp.district_id"
                          :modelValue="formApp.district_id"
                          :name="'district_id'"
                          :userBind="userPond"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="formApp.district_id = $event"
                        ></district>
                      </div>
                    </div>
                  </div>

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

                  <div v-if="tradeApp" ref="tradeApp">
                    <div class="reporting-line">
                      <div class="row">
                        <div class="col-xl-4">
                          <div class="reporting__title">Промысловый лов (тонн)</div>
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
                                :modelValue="tradeApp.summ.quota"
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
                                :modelValue="tradeApp.summ.trade"
                              ></TextInput>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="reporting-line">
                      <div class="row">
                        <div class="col-xl-4">
                          <div class="reporting__title">В том числе по видам рыб</div>
                        </div>
                        <div class="col-xl-7">
                          <template v-if="tradeApp.fish">
                            <div v-for="(item, index) in tradeApp.fish" :key="index" class="items">
                              <div class="row mb-2">
                                <div class="col-lg-4">
                                  <TextInput
                                    :name="`[fish_id]`"
                                    :title="'Рыба'"
                                    :required="true"
                                    :disabled="true"
                                    :placeholder="'Рыба'"
                                    :modelValue="item.fish"
                                  >
                                  </TextInput>
                                </div>
                                <div class="col-lg-4">
                                  <TextInput
                                    :name="`[catch_quota]`"
                                    :title="'Квота на вылов'"
                                    :required="true"
                                    :disabled="true"
                                    :placeholder="$t('placeholder.quantity')"
                                    :modelValue="item.quota"
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
                                    :modelValue="item.trade"
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
                  <div v-else>
                    <v-preloader></v-preloader>
                  </div>

                  <hr class="reporting__hr" />

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Любительский (спортивный) - лов (тонн)</div>
                      </div>
                      <div class="col-xl-7">
                        <div class="row">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Квота на вылов'"
                              :type="'number'"
                              :errors="$v.formApp.amateur_catch_quota"
                              :name="'amateur_meliorative_fishing[0][amateur_catch_quota]'"
                              :required="true"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.amateur_catch_quota"
                              v-on:update:modelValue="formApp.amateur_catch_quota = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Фактически выловлено'"
                              :type="'number'"
                              :name="'amateur_actually_caught'"
                              :errors="$v.formApp.amateur_actually_caught"
                              :required="true"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.amateur_actually_caught"
                              v-on:update:modelValue="formApp.amateur_actually_caught = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Мелиоративный лов (тонн)</div>
                      </div>
                      <div class="col-xl-7">
                        <div class="row">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Квота на вылов'"
                              :type="'number'"
                              :name="'meliorative_catch_quota'"
                              :errors="$v.formApp.meliorative_catch_quota"
                              :required="true"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.meliorative_catch_quota"
                              v-on:update:modelValue="formApp.meliorative_catch_quota = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Фактически выловлено'"
                              :type="'number'"
                              :name="'meliorative_actually_caught'"
                              :errors="$v.formApp.meliorative_actually_caught"
                              :required="true"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.meliorative_actually_caught"
                              v-on:update:modelValue="formApp.meliorative_actually_caught = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

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

                  <div class="reporting-btn">
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
                              <a class="block__item block__item--green" @click="saveElement">
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
import { convertObjectToFormData } from '@/formData';
import moment from 'moment';

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
      district_id: {
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
    },
    'formApp.region_id': function () {
      this.render_region++;
    },
    'formApp.district_id': function () {
      this.render_district++;
    },
    sign_status: function (val) {
      if (val === true) {
        this.$router.push('/ru/account/reporting/1-rh');
      }
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
  },
  methods: {
    saveElementReport() {
      let dataInputs = {};
      this.$refs.tradeApp.querySelectorAll('.items').forEach((el, index) => {
        el.querySelectorAll('input').forEach((item) => {
          if (!item.name.includes('fish_id')) {
            dataInputs['commercial_fishing_by_types' + `[${index}]` + item.name] = item.value;
          } else {
            if (this.tradeApp.fish)
              Object.values(this.tradeApp.fish).forEach((fish, id) => {
                let fishIndex = '';
                if (fish.fish === item.value) {
                  fishIndex = Object.keys(this.tradeApp.fish)[id];
                  dataInputs['commercial_fishing_by_types' + `[${index}]` + item.name] = fishIndex;
                }
              });
          }
        });
      });
      this.$refs.tradeApp.querySelectorAll('.total').forEach((el) => {
        el.querySelectorAll('input').forEach((item) => {
          dataInputs[item.name] = item.value;
        });
      });

      const data = {
        user_id: this.$store.state.userObject.id,
        ...dataInputs,
        ...this.formApp,
      };

      data['amateur_meliorative_fishing[0][amateur_catch_quota]'] = data.amateur_catch_quota;
      delete data.amateur_catch_quota;
      data['amateur_meliorative_fishing[0][amateur_actually_caught]'] =
        data.amateur_actually_caught;
      delete data.amateur_actually_caught;
      data['amateur_meliorative_fishing[0][meliorative_catch_quota]'] =
        data.meliorative_catch_quota;
      delete data.meliorative_catch_quota;
      data['amateur_meliorative_fishing[0][meliorative_actually_caught]'] =
        data.meliorative_actually_caught;
      delete data.meliorative_actually_caught;

      // Значение объекта переводим в Number
      Object.keys(data).forEach(function (el) {
        data[el] = parseInt(data[el]);
      });
      let formData = convertObjectToFormData(data);
      if (this.quarter_value || this.quarter_value === 0) {
        const quarter = moment().month(this.quarter_value);
        if (this.quarter_value === 6 || this.quarter_value === 9) {
          quarter.subtract('years', 1);
        }

        const start_quarter = quarter.startOf('month').format('YYYY-MM-D');
        const end_quarter = quarter.add('month', 2).endOf('month').format('YYYY-MM-D');
        formData.append('surrender_date_start', start_quarter || '2023-01-01');
        formData.append('surrender_date_end', end_quarter || '2023-01-01');
      }

      const current_month_number = moment().format('M') - 1;
      const selected_q = this.$refs.q.list_quarter.find((item) => {
        if (item.period.includes(this.quarter_value)) {
          return true;
        }
      });
      if (selected_q.period.includes(current_month_number)) {
      } else {
        document.querySelector('.preloader').classList.remove('active');
        alert('Cрок сдачи отчета просрочен');
        return false;
      }

      if (this.$route.path.includes('edit')) {
        formData.append('_method', 'PUT');
        formData.append('id', this.id);

        api
          .post('/subject/store/1', formData)
          .then((res) => {
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
          });
      } else {
        api
          .post('/subject/store/1', formData)
          .then((res) => {
            this.$router.go(-1);
            document.querySelector('.preloader').classList.remove('active');
          })
          .catch((err) => {
            document.querySelector('.preloader').classList.remove('active');

            this.message = {
              status: err.response.status,
              text: err.response.data.message,
            };
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
          }
        });
    },

    onSubmit(evt) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        document.querySelector('.preloader').classList.add('active');
        this.saveElementReport();
      }
      // this.$modal.show('modal_save')
    },

    //Test
    getApplications(limit, region, pond) {
      this.tradeApp = null;
      api
        .get('trade/user/from-to', {
          params: {
            limit_id: limit ? limit : null,
            region_id: region ? region : null,
            pond_id: pond ? pond : null,
          },
        })
        .then((response) => {
          if (response.data) {
            this.tradeApp = response.data.data;
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
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  beforeMount() {
    this.checkStatusSign();
    this.getApplications(1, 10, 28);
    this.showDetailManagment(), this.apiGetUser();
  },
};
</script>

<style scoped></style>
