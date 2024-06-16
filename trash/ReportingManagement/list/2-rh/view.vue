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
              <HeaderBack :title="$t('reporting.title')" :subtitle="$t('reporting.reports.2-rh')" />
              <div class="card__content--body">
                <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                  <r_header
                    :v="$v"
                    :formApp="formApp"
                    :quarter_value="quarter_value"
                    v-model="quarter_value"
                  />
                  <!-- <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Период от</div>
                      </div>
                      <div class="col-xl-5">
                        <input type="date" v-model="filters.from" class="date__input" />
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Период до</div>
                      </div>
                      <div class="col-xl-5">
                        <input type="date" v-model="filters.to" class="date__input" />
                      </div>
                    </div>
                  </div> -->

                  <hr class="reporting__hr" />

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          {{ $t('reporting.fields.2-rh.count_of_gamekeeper_start_of_year') }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :type="'number'"
                          :name="'count_of_gamekeeper_start_of_year'"
                          :required="true"
                          :disabled="statusPage == 'show'"
                          :placeholder="$t('placeholder.quantity')"
                          :errors="$v.formApp.count_of_gamekeeper_start_of_year"
                          :modelValue="formApp.count_of_gamekeeper_start_of_year"
                          v-on:update:modelValue="
                            formApp.count_of_gamekeeper_start_of_year = $event
                          "
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          {{
                            $t(
                              'reporting.fields.2-rh.count_of_gamekeeper_start_of_reporting_period',
                            )
                          }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :type="'number'"
                          :name="'count_of_gamekeeper_start_of_reporting_period'"
                          :required="true"
                          :disabled="statusPage == 'show'"
                          :placeholder="$t('placeholder.quantity')"
                          :errors="$v.formApp.count_of_gamekeeper_start_of_reporting_period"
                          :modelValue="formApp.count_of_gamekeeper_start_of_reporting_period"
                          v-on:update:modelValue="
                            formApp.count_of_gamekeeper_start_of_reporting_period = $event
                          "
                        >
                        </TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          {{ $t('reporting.fields.2-rh.count_of_protocols') }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :type="'number'"
                          :name="'count_of_protocols'"
                          :required="true"
                          :disabled="statusPage == 'show'"
                          :placeholder="$t('placeholder.quantity')"
                          :errors="$v.formApp.count_of_protocols"
                          :modelValue="formApp.count_of_protocols"
                          v-on:update:modelValue="formApp.count_of_protocols = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

                  <div class="reporting-btn">
                    <div class="reporting-wrapper">
                      <button
                        type="submit"
                        class="input-btn form__line--btn"
                        v-if="statusPage == 'create' || statusPage == 'edit'"
                      >
                        {{ $t('button.save') }}
                      </button>
                      <!-- <a class="input-btn form__line--btn" @click="$modal.show('modal_head')" v-if="statusPage == 'show'">
                        {{ $t('button.ecp') }}
                      </a> -->
                      <router-link
                        :to="
                          '/' +
                          $i18n.locale +
                          '/account/reporting/2-rh/' +
                          $route.params.id +
                          '/edit'
                        "
                        class="input-btn form__line--btn form__line--btn-black"
                        v-if="statusPage == 'show'"
                      >
                        {{ $t('button.edit') }}
                      </router-link>
                    </div>
                  </div>
                </form>

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
import r_header from '@/components/reportHeaders';
import { required } from 'vuelidate/lib/validators';
import { api } from '@/boot/axios';

import HeaderBack from '@/components/UI/HeaderBack.vue';

export default {
  name: 'edit',
  components: {
    HeaderBack,
    TextInput,
    r_header,
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
      count_of_gamekeeper_start_of_year: {
        required,
      },
      count_of_gamekeeper_start_of_reporting_period: {
        required,
      },
      count_of_protocols: {
        required,
      },
    },
  },
  data() {
    return {
      userRegions: null,
      quarter_value: null,
      // filters: {
      //   date_from: null,
      //   date_to: null,
      // },
      formApp: {
        region_id: null,
        farm_id: null,
        district_id: null,
        kato_id: null,
        count_of_gamekeeper_start_of_year: '',
        count_of_gamekeeper_start_of_reporting_period: '',
        count_of_protocols: '',
      },
    };
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$modal.show('modal_save');
      }
    },
    formatDate(date = '') {
      if (!date) return '';
      return date.split('.').reverse().join('-');
    },
    async showDetailManagment() {
      try {
        const { data } = await api.get(
          `subject/show/2/${this.$route.path.split('/').slice(-1)[0]}`,
        );
        this.formApp = data.data;

        // setTimeout(() => {
        //   document.querySelectorAll('.date__input')[0].value = this.formatDate(
        //     data.data.surrender_date_start,
        //   );
        //   document.querySelectorAll('.date__input')[1].value = this.formatDate(
        //     data.data.surrender_date_end,
        //   );
        // }, 100);
      } catch (error) {}
    },
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  beforeMount() {
    this.showDetailManagment();
  },
};
</script>

<style scoped></style>
