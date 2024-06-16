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
              <HeaderBack :title="getReportTitle" :subtitle="$t('reporting.reports.2-rh')" />
              <div class="card__content--body">
                <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                  <r_header
                    :v="$v"
                    :formApp="formApp"
                    :quarter_value="quarter_value"
                    v-model="quarter_value"
                  />
                  <hr class="reporting__hr" />
                  <InputNumberRow
                    :title="$t('reporting.fields.2-rh.count_of_gamekeeper_start_of_year')"
                    :name="'count_of_gamekeeper_start_of_year'"
                    :required="true"
                    :disabled="statusPage == 'show'"
                    :placeholder="$t('placeholder.quantity')"
                    :errors="$v.formApp.count_of_gamekeeper_start_of_year"
                    :modelValue="formApp.count_of_gamekeeper_start_of_year"
                    v-on:update:modelValue="formApp.count_of_gamekeeper_start_of_year = $event"
                  />
                  <InputNumberRow
                    :title="
                      $t('reporting.fields.2-rh.count_of_gamekeeper_start_of_reporting_period')
                    "
                    :name="'count_of_gamekeeper_start_of_reporting_period'"
                    :required="true"
                    :disabled="statusPage == 'show'"
                    :placeholder="$t('placeholder.quantity')"
                    :errors="$v.formApp.count_of_gamekeeper_start_of_reporting_period"
                    :modelValue="formApp.count_of_gamekeeper_start_of_reporting_period"
                    v-on:update:modelValue="
                      formApp.count_of_gamekeeper_start_of_reporting_period = $event
                    "
                  />
                  <InputNumberRow
                    :title="$t('reporting.fields.2-rh.count_of_protocols')"
                    :name="'count_of_protocols'"
                    :required="true"
                    :disabled="statusPage == 'show'"
                    :placeholder="$t('placeholder.quantity')"
                    :errors="$v.formApp.count_of_protocols"
                    :modelValue="formApp.count_of_protocols"
                    v-on:update:modelValue="formApp.count_of_protocols = $event"
                  />

                  <hr class="reporting__hr" />

                  <ReportManageFormButtons :edit="!isNotEditable" :report="'2-rh'" />
                </form>

                <ReportManageModal
                  :ecp="true"
                  :errorMessage="errorMessage"
                  :message="message"
                  @accept="saveElement"
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
import { required } from 'vuelidate/lib/validators';

import { api } from '@/boot/axios';
import { convertObjectToFormData } from '@/formData';

import r_header from '@/components/reportHeaders';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';
import InputNumberRow from '@/components/UI/InputNumberRow.vue';

export default {
  name: 'ReportPage2',
  components: {
    HeaderBack,
    ReportManageModal,
    ReportManageFormButtons,
    InputNumberRow,
    r_header,
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
      quarter_value: null,
      formApp: {
        region_id: null,
        farm_id: null,
        district_id: null,
        kato_id: null,
        count_of_gamekeeper_start_of_year: '',
        count_of_gamekeeper_start_of_reporting_period: '',
        count_of_protocols: '',
      },
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
      dataEcp: null,
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
    isFullFilled() {
      return this.statusPage === 'edit' || this.statusPage === 'show';
    },
  },
  methods: {
    saveElement() {
      if (this.$configFile.active) return this.sendEcpKey();
      const websocket = new WebSocket('wss://127.0.0.1:13579/');
      var ready = null;
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
      formData.append('xml', this.dataEcp || this.$configFile.xml);
      document.querySelector('.preloader').classList.add('active');
      api
        .post(`tir/sign/6/${this.$route.params.id}`, formData)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/6-rh' });
          }
        })
        .catch((e) => {
        })
        .finally(() => {
          document.querySelector('.preloader').classList.remove('active');
        });
    },
    formatDate(date) {
      return date.split('.').reverse().join('-');
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        document.querySelector('.preloader').classList.add('active');

        let data = this.formApp;
        for (let key in data) {
          if (data[key] == null) delete data[key];
        }

        let formData = convertObjectToFormData(data);

        if (this.quarter_value || this.quarter_value === 0) {
          const quarter = moment().month(this.quarter_value);
          if (this.quarter_value === 6 || this.quarter_value === 9) {
            quarter.subtract('years', 1);
          }

          const start_quarter = quarter.startOf('month').format('YYYY');
          // const end_quarter = quarter.add('month', 2).endOf('month').format('YYYY-MM-D');
          formData.append('surrender_date', start_quarter || '2023-01-01');
          // formData.append("surrender_date_start", start_quarter || "2023-01-01");
          // formData.append("surrender_date_end", end_quarter || "2023-01-01");
        }

        if (this.statusPage == 'edit') {
          formData.append('_method', 'PUT');
        }

        api
          .post(
            `/subject/store/2${this.statusPage === 'edit' ? `/${this.$route.params.id}` : ''}`,
            formData,
          )
          .then(() => {
            this.$router.push('/ru/account/reporting/2-rh');
          })
          .catch((err) => {})
          .finally(() => {
            document.querySelector('.preloader').classList.remove('active');
          });
      }
    },
    async showDetailManagment() {
      if (this.isFullFilled) {
        try {
          const { data } = await api.get(`subject/show/2/${this.$route.params.id}`);
          this.formApp = {
            ...this.formApp,
            ...data.data,
          };
        } catch (error) {}
      }
    },
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
  beforeMount() {
    this.showDetailManagment();
  },
};
</script>

<style scoped></style>
