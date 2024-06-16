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
                :subtitle="'Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков'"
              />
              <div class="card__content--body">
                <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
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
                          :disabled="isNotEditable"
                          :confinesValue="getUserRegions"
                          :placeholder="$t('placeholder.choose')"
                          :errors="$v.form.region_id"
                          :modelValue="form.region_id"
                          v-on:update:modelValue="form.region_id = $event"
                        ></region>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          {{ $t('inputs.kato') }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <kato
                          :name="'kato_id'"
                          :required="true"
                          :disabled="isNotEditable"
                          :categoryValue="form.region"
                          :placeholder="$t('placeholder.choose')"
                          :errors="$v.form.kato_id"
                          :modelValue="form.kato_id"
                          v-on:update:modelValue="form.kato_id = $event"
                        ></kato>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />
                  <pondSquare
                    :modelValue="form.pondGrup"
                    :disabled="isNotEditable"
                    v-on:update:modelValue="form.pondGrup = $event"
                  ></pondSquare>
                  <SelectPool
                    :modelValue="form.pondGrup"
                    :disabled="isNotEditable"
                    v-on:update:modelValue="form.pondGrup = $event"
                  ></SelectPool>

                  <hr class="reporting__hr" />

                  <ReportManageFormButtons :edit="!isNotEditable" :report="'5-rh'" />
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
import { required } from 'vuelidate/lib/validators';

import { api } from '@/boot/axios';
import { convertObjectToFormData } from '@/formData';

import pondSquare from '@/components/components/Inputs/pondSquare';
import Region from '@/components/components/Inputs/region';
import Kato from '@/components/components/Inputs/kato';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';
import SelectPool from '@/components/reporting-management/SelectPool.vue';

export default {
  name: 'ReportPage6',
  components: {
    pondSquare,
    Region,
    Kato,
    HeaderBack,
    ReportManageModal,
    ReportManageFormButtons,
    SelectPool,
  },
  props: {
    statusPage: {
      type: String,
      default: 'create',
    },
  },
  validations: {
    form: {
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
      modelValue: [],
    },
  },
  data() {
    return {
      form: {
        region_id: null,
        surrender_date_start: '',
        surrender_date_end: '',
        pools: [
          {
            farm_id: null,
            waters: [
              {
                farm_id: null,
                kato_id: null,
                total_fish_farms_count: null,
                total_fish_farms_hectare: null,
                total_fish_farms_fixed_count: null,
                total_fish_farms_fixed_hectare: null,
                total_fish_farms_organizations_count: null,
                total_fish_farms_organizations_fixed_percent: null,
                total_fish_farms_unfixed_count: null,
                total_fish_farms_unfixed_hectare: null,
              },
            ],
          },
        ],

        // farm_id: null,
        // district_id: null,
        // kato_id: null,

        // pondGrup: [{ pond_id: 4, value: 'Тестовое озеро', square: null, code_kato: null }],
        // count_of_gamekeeper_start_of_year: '',
        // count_of_gamekeeper_start_of_reporting_period: '',
        // count_of_protocols: '',
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
    getUserRegions() {
      if (this.$store.state.userObject && this.$store.state.userObject.regions) {
        return this.$store.state.userObject.regions.map((element) => {
          return element.region_id;
        });
      }
      return [];
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
        .catch((e) => {})
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

        let data = this.form;
        for (let key in data) {
          if (data[key] == null) delete data[key];
        }

        let formData = convertObjectToFormData(data);

        if (this.statusPage == 'edit') {
          formData.append('_method', 'PUT');
        }

        api
          .post(
            `/tir/store/6${this.statusPage === 'edit' ? `/${this.$route.params.id}` : ''}`,
            formData,
          )
          .then(() => {
            this.$router.push('/ru/account/reporting/6-rh');
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
          const { data } = await api.get(`tir/show/6/${this.$route.params.id}`);
          this.form = {
            ...this.form,
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

<style scoped>
.reporting-line {
  margin-bottom: 10px;
}
</style>
