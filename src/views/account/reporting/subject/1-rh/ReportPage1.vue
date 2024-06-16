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
                          :errors="$v.form.region_id"
                          :disabled="true"
                          :modelValue="form.region_id"
                          :userBind="getUserRegionList"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="form.region_id = $event"
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
                          :errors="$v.form.farm_id"
                          :disabled="true"
                          :userBind="userPond"
                          :modelValue="form.farm_id"
                          :name="'farm_id'"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="form.farm_id = $event"
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
                          :errors="$v.form.district_id"
                          :modelValue="form.district_id"
                          :name="'district_id'"
                          :userBind="userPond"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="form.district_id = $event"
                        ></district>
                      </div>
                    </div>
                  </div>

                  <kato
                    :required="true"
                    :hidden="true"
                    :disabled="statusPage == 'show'"
                    :errors="$v.form.kato_id"
                    :modelValue="form.kato_id"
                    :name="'kato_id'"
                    :placeholder="$t('placeholder.choose')"
                    v-on:update:modelValue="form.kato_id = $event"
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
                              :errors="$v.form.amateur_catch_quota"
                              :name="'amateur_meliorative_fishing[0][amateur_catch_quota]'"
                              :required="true"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.amateur_catch_quota"
                              v-on:update:modelValue="form.amateur_catch_quota = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Фактически выловлено'"
                              :type="'number'"
                              :name="'amateur_actually_caught'"
                              :errors="$v.form.amateur_actually_caught"
                              :required="true"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.amateur_actually_caught"
                              v-on:update:modelValue="form.amateur_actually_caught = $event"
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
                              :errors="$v.form.meliorative_catch_quota"
                              :required="true"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.meliorative_catch_quota"
                              v-on:update:modelValue="form.meliorative_catch_quota = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Фактически выловлено'"
                              :type="'number'"
                              :name="'meliorative_actually_caught'"
                              :errors="$v.form.meliorative_actually_caught"
                              :required="true"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.meliorative_actually_caught"
                              v-on:update:modelValue="form.meliorative_actually_caught = $event"
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
                              :errors="$v.form.payment_plan"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.payment_plan"
                              v-on:update:modelValue="form.payment_plan = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Фактически оплачено (тысяч тенге)'"
                              :type="'number'"
                              :name="'payment_fact'"
                              :errors="$v.form.payment_fact"
                              :required="true"
                              :disabled="statusPage == 'show'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.payment_fact"
                              v-on:update:modelValue="form.payment_fact = $event"
                            >
                            </TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

                  <ReportManageFormButtons
                    :sign-status="sign_status"
                    :edit="!isNotEditable"
                    :report="'1-rh'"
                  />
                </form>

                <ReportManageModal
                  :ecp="true"
                  :errorMessage="errorMessage"
                  :message="message"
                  @accept="saveElementReport"
                  @close="$modal.hide('modal_head')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import { api } from '@/boot/axios';
import { convertObjectToFormData } from '@/formData';

import TextInput from '@/components/components/Inputs/TextInput.vue';
import Region from '@/components/components/Inputs/region';
import quarter from '@/components/components/Inputs/quarter';
import Pond from '@/components/components/Inputs/pond';
import District from '@/components/components/Inputs/district';
import Kato from '@/components/components/Inputs/kato';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import AnimalWorldUserName from '@/components/reporting-management/AnimalWorldUserName.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';

export default {
  name: 'ReportPage1',
  components: {
    TextInput,
    Region,
    quarter,
    Pond,
    District,
    Kato,
    HeaderBack,
    AnimalWorldUserName,
    ReportManageModal,
    ReportManageFormButtons,
  },
  props: {
    statusPage: {
      type: String,
      default: 'create',
    },
  },
  validations: {},
  data() {
    return {
      pageType: 'subject',
      pageId: 1,
      form: {
        region_id: null,
        farm_id: null,
        district_id: null,
        surrender_date_start: null,
        surrender_date_end: null,
        commercial_fishing: [
          {
            total_catch_quota: null,
            total_actually_caught: null,
          },
        ],
        commercial_fishing_by_types: [
          {
            fish_id: null,
            catch_quota: null,
            actually_caught: null,
          },
        ],
        amateur_meliorative_fishing: [
          {
            amateur_catch_quota: null,
            amateur_actually_caught: null,
            meliorative_catch_quota: null,
            meliorative_actually_caught: null,
          },
        ],
        payment_plan: null,
        payment_fact: null,
      },
      sign_status: false,
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      tradeApp: null,
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
    };
  },
  computed: {
    getReportTitle() {
      if (this.statusPage == 'show') return this.$t('reporting.title');
      else if (this.statusPage == 'edit') return 'Редактирование отчета';
      return 'Добавление нового отчета';
    },
    isNotEditable() {
      return this.statusPage == 'show';
    },
    isEditPage() {
      return this.statusPage == 'edit';
    },
    isFullFilled() {
      return this.statusPage === 'edit' || this.statusPage === 'show';
    },
    getUserRegionList() {
      if (this.$store.state.userObject && this.$store.state.userObject.regions) {
        return this.$store.state.userObject.regions.map((element) => {
          return element.region_id;
        });
      }
      return [];
    },
    userPond() {
      return this.applicationsUser?.pond || [];
    },
  },
  watch: {
    'form.region_id': function () {
      this.render_pond++;
      this.render_region++;
    },
    'form.district_id': function () {
      this.render_district++;
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
        ...this.form,
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
          });
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
    onSubmit() {
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
    formatDate(date) {
      return date.split('.').reverse().join('-');
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
          this.form.region_id = data.data.region_id;
          this.form.farm_id = data.data.farm_id;
          this.form.district_id = data.data.district_id;
          this.form.kato_id = data.data.kato_id;
          this.form.payment_fact = data.data.payment_fact;
          this.form.payment_plan = data.data.payment_plan;
          this.form.amateur_catch_quota = data.data.amateur_meliorative_fishing.amateur_catch_quota;
          this.form.amateur_actually_caught =
            data.data.amateur_meliorative_fishing.amateur_actually_caught;
          this.form.meliorative_catch_quota =
            data.data.amateur_meliorative_fishing.meliorative_catch_quota;
          this.form.meliorative_actually_caught =
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
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
  async beforeMount() {
    this.checkStatusSign();
    this.getApplications(1, 10, 28);
    this.apiGetUser();
    await this.showDetailManagment();
  },
};
</script>

<style scoped></style>
