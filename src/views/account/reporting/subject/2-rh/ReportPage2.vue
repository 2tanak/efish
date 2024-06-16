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
                  <r_header v-model="form" :v="$v" :form="form" :disabled="isNotEditable" />
                  <hr class="reporting__hr" />
                  <InputNumberRow
                    :title="$t('reporting.fields.2-rh.count_of_gamekeeper_start_of_year')"
                    :name="'count_of_gamekeeper_start_of_year'"
                    :required="true"
                    :disabled="isNotEditable"
                    :placeholder="$t('placeholder.quantity')"
                    :errors="$v.form.count_of_gamekeeper_start_of_year"
                    :modelValue="form.count_of_gamekeeper_start_of_year"
                    v-on:update:modelValue="form.count_of_gamekeeper_start_of_year = $event"
                  />
                  <InputNumberRow
                    :title="
                      $t('reporting.fields.2-rh.count_of_gamekeeper_start_of_reporting_period')
                    "
                    :name="'count_of_gamekeeper_start_of_reporting_period'"
                    :required="true"
                    :disabled="isNotEditable"
                    :placeholder="$t('placeholder.quantity')"
                    :errors="$v.form.count_of_gamekeeper_start_of_reporting_period"
                    :modelValue="form.count_of_gamekeeper_start_of_reporting_period"
                    v-on:update:modelValue="
                      form.count_of_gamekeeper_start_of_reporting_period = $event
                    "
                  />
                  <InputNumberRow
                    :title="$t('reporting.fields.2-rh.count_of_protocols')"
                    :name="'count_of_protocols'"
                    :required="true"
                    :disabled="isNotEditable"
                    :placeholder="$t('placeholder.quantity')"
                    :errors="$v.form.count_of_protocols"
                    :modelValue="form.count_of_protocols"
                    v-on:update:modelValue="form.count_of_protocols = $event"
                  />

                  <hr class="reporting__hr" />

                  <ReportManageFormButtons
                    :edit="!isNotEditable"
                    :sign-status="sign_status"
                    :report="'2-rh'"
                  />
                </form>

                <ReportManageErrorModal :message="message" :errorMessage="errorMessage" />
                <ReportManageModal @accept="saveElement" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/boot/axios';
import { convertObjectToFormData } from '@/formData';

import r_header from '@/components/reportHeaders';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';
import ReportManageErrorModal from '@/components/reporting-management/ReportManageErrorModal.vue';
import InputNumberRow from '@/components/UI/InputNumberRow.vue';

export default {
  name: 'ReportPage2',
  components: {
    HeaderBack,
    ReportManageModal,
    ReportManageFormButtons,
    ReportManageErrorModal,
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
    form: {
      region_id: {},
      farm_id: {},
      district_id: {},
      count_of_gamekeeper_start_of_year: {},
      count_of_gamekeeper_start_of_reporting_period: {},
      count_of_protocols: {},
    },
  },
  data() {
    return {
      pageType: 'subject',
      pageId: 2,
      form: {
        region_id: null,
        farm_id: null,
        district_id: null,
        surrender_date: null,
        count_of_gamekeeper_start_of_year: '',
        count_of_gamekeeper_start_of_reporting_period: '',
        count_of_protocols: '',
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
      if (this.$configFile.active) return this.sendEcpKey(this.$configFile.xml);
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
        if (data1.responseObject) {
          this.sendEcpKey(data1.responseObject);
        }
      };
    },
    sendEcpKey(ecpString) {
      const formData = new FormData();
      formData.append('xml', ecpString);
      document.querySelector('.preloader').classList.add('active');
      api
        .post(`${this.pageType}/sign/${this.pageId}/${this.$route.params.id}`, formData)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({
              path: `/${this.$i18n.locale}/account/reporting/${this.pageId}${
                this.pageType === 'subject' ? '' : '-tir'
              }-rh`,
            });
          }
        })
        .catch((error) => {
          this.checkError(error);
        })
        .finally(() => {
          document.querySelector('.preloader').classList.remove('active');
        });
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        document.querySelector('.preloader').classList.add('active');

        let formData = convertObjectToFormData(this.form);

        if (this.statusPage == 'edit') {
          formData.append('_method', 'PUT');
        }

        api
          .post(
            `/${this.pageType}/store/${this.pageId}${
              this.statusPage === 'edit' ? `/${this.$route.params.id}` : ''
            }`,
            formData,
          )
          .then(() => {
            this.$router.push(
              `/ru/account/reporting/${this.pageId}${this.pageType === 'subject' ? '' : '-tir'}-rh`,
            );
          })
          .catch((error) => {
            this.checkError(error);
          })
          .finally(() => {
            document.querySelector('.preloader').classList.remove('active');
          });
      }
    },
    checkError(error) {
      if (error?.response?.status > 500) {
        this.errorMessage.status = 500;
        this.errorMessage.text = this.$t('system_message.500');
      } else if (error?.response?.status == 401) {
        this.errorMessage.status = 401;
        this.errorMessage.text = error?.response?.data?.message;
        this.$router.push('/' + this.$i18n.locale + '/login');
      } else {
        this.errorMessage.status = 422;
        this.errorMessage.text = error?.response?.data?.message;
      }
      this.$modal.show('ReportManageErrorModal');
    },
    async checkStatusSign() {
      if (!this.isNotEditable) return;
      try {
        const response = await api.get(`/${this.pageType}/list/${this.pageId}`);
        this.sign_status =
          response?.data?.data?.find((e) => {
            return e.id == this.$route.params.id;
          })?.status === 'Подписан';
      } catch (error) {
        this.checkError(error);
      }
    },
    parseServerData(data) {
      this.form = Object.keys(this.form).reduce((acc, key) => {
        if (data[key]) acc[key] = data[key];
        return acc;
      }, {});
    },
    async showDetailManagment() {
      if (this.isFullFilled) {
        try {
          const { data } = await api.get(
            `/${this.pageType}/show/${this.pageId}/${this.$route.params.id}`,
          );
          this.parseServerData(data.data);
        } catch (error) {
          this.checkError(error);
        }
      }
    },
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
  async beforeMount() {
    await this.showDetailManagment();
    await this.checkStatusSign();
  },
};
</script>

<style scoped></style>
