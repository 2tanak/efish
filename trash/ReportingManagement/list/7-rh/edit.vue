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
              <HeaderBack :title="getReportTitle" :subtitle="$t('reporting.reports.7-rh')" />
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
                          :required="true"
                          :errors="$v.form.region_id"
                          :disabled="isNotEditable"
                          :modelValue="form.region_id"
                          :confinesValue="getUserRegions"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="form.region_id = $event"
                        ></region>
                      </div>
                    </div>
                  </div>
                  <hr class="reporting__hr" />

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Количество рыболовных бригад</div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :type="'number'"
                          :name="'fishing_crews_count'"
                          :required="true"
                          :errors="$v.form.fishing_crews_count"
                          :disabled="isNotEditable"
                          :placeholder="$t('placeholder.quantity')"
                          :modelValue="form.fishing_crews_count"
                          v-on:update:modelValue="form.fishing_crews_count = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Общее количество рыбаков</div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :type="'number'"
                          :name="'fishermen_total_count'"
                          :required="true"
                          :errors="$v.form.fishermen_total_count"
                          :disabled="isNotEditable"
                          :placeholder="$t('placeholder.quantity')"
                          :modelValue="form.fishermen_total_count"
                          v-on:update:modelValue="form.fishermen_total_count = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Самоходный флот (единица)</div>
                      </div>
                      <div class="col-xl-5">
                        <brand-repeater
                          :name="'brand'"
                          :required="true"
                          :disabled="isNotEditable"
                          :modelValue="form.self_propelled_fleets"
                          v-on:update:modelValue="form.self_propelled_fleets = $event"
                        ></brand-repeater>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Не самоходный флот (единица)</div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :type="'number'"
                          :name="'no_fleet_count'"
                          :required="true"
                          :errors="$v.form.no_fleet_count"
                          :disabled="isNotEditable"
                          :placeholder="$t('placeholder.quantity')"
                          :modelValue="form.no_fleet_count"
                          v-on:update:modelValue="form.no_fleet_count = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Транспортные средства (единица)</div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row">
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Снегоход'"
                              :name="'snowmobile_count'"
                              :required="false"
                              :disabled="isNotEditable"
                              :modelValue="form.snowmobile_count"
                              v-on:update:modelValue="form.snowmobile_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Автотранспорт'"
                              :name="'motor_vehicle_count'"
                              :required="false"
                              :disabled="isNotEditable"
                              :modelValue="form.motor_vehicle_count"
                              v-on:update:modelValue="form.motor_vehicle_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Мотоцикл'"
                              :name="'motorcycle_count'"
                              :required="false"
                              :disabled="isNotEditable"
                              :modelValue="form.motorcycle_count"
                              v-on:update:modelValue="form.motorcycle_count = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Орудий лова (единица)</div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Невода'"
                              :name="'seine_count'"
                              :required="false"
                              :disabled="isNotEditable"
                              :modelValue="form.seine_count"
                              v-on:update:modelValue="form.seine_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Волокуши'"
                              :name="'trawl_count'"
                              :required="false"
                              :disabled="isNotEditable"
                              :modelValue="form.trawl_count"
                              v-on:update:modelValue="form.trawl_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Ставные сети'"
                              :name="'fixed_nets_count'"
                              :required="false"
                              :disabled="isNotEditable"
                              :modelValue="form.fixed_nets_count"
                              v-on:update:modelValue="form.fixed_nets_count = $event"
                            ></TextInput>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Вентеря'"
                              :name="'venter_count'"
                              :required="false"
                              :disabled="isNotEditable"
                              :modelValue="form.venter_count"
                              v-on:update:modelValue="form.venter_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-8">
                            <TextInput
                              :type="'number'"
                              :title="'Крючковые снасти и другие виды орудии лова'"
                              :name="'hooks_etc_count'"
                              :required="false"
                              :disabled="isNotEditable"
                              :modelValue="form.hooks_etc_count"
                              v-on:update:modelValue="form.hooks_etc_count = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Транспортные средства (единица)</div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Цеха филейные'"
                              :subtitle="'тонн/сутки'"
                              :name="'fillet_workshops_count'"
                              :disabled="isNotEditable"
                              :modelValue="form.fillet_workshops_count"
                              v-on:update:modelValue="form.fillet_workshops_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Цеха рыбной муки'"
                              :subtitle="'тонн/сутки'"
                              :name="'fish_flour_workshops_count'"
                              :disabled="isNotEditable"
                              :modelValue="form.fish_flour_workshops_count"
                              v-on:update:modelValue="form.fish_flour_workshops_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Цеха коптильные'"
                              :subtitle="'тонн/сутки'"
                              :name="'smoking_workshops_count'"
                              :disabled="isNotEditable"
                              :modelValue="form.smoking_workshops_count"
                              v-on:update:modelValue="form.smoking_workshops_count = $event"
                            ></TextInput>
                          </div>
                        </div>
                        <div class="row mb-2">
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Ледогенераторы'"
                              :subtitle="'тенге/сутки'"
                              :name="'ice_generators_count'"
                              :disabled="isNotEditable"
                              :modelValue="form.ice_generators_count"
                              v-on:update:modelValue="form.ice_generators_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Ледники'"
                              :subtitle="'тенге/сутки'"
                              :name="'icebox_count'"
                              :disabled="isNotEditable"
                              :modelValue="form.icebox_count"
                              v-on:update:modelValue="form.icebox_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Термоконтейнеры'"
                              :subtitle="'кубометр'"
                              :name="'termocontainer_count'"
                              :disabled="isNotEditable"
                              :modelValue="form.termocontainer_count"
                              v-on:update:modelValue="form.termocontainer_count = $event"
                            ></TextInput>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :title="'Холодильники'"
                              :subtitle="'тенге/сутки'"
                              :name="'refrigerators_count'"
                              :required="true"
                              :disabled="isNotEditable"
                              :modelValue="form.refrigerators_count"
                              v-on:update:modelValue="form.refrigerators_count = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

                  <ReportManageFormButtons :edit="!isNotEditable" :report="'7-rh'" />
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
import TextInput from '@/components/components/Inputs/TextInput.vue';
import Region from '@/components/components/Inputs/region';
import BrandRepeater from '@/components/components/Inputs/brandRepeater';

import { required } from 'vuelidate/lib/validators';
import { convertObjectToFormData } from '@/formData';
import { api } from '@/boot/axios';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';
import AnimalWorldUserName from '@/components/reporting-management/AnimalWorldUserName.vue';

export default {
  name: 'Rh7Edit',
  components: {
    BrandRepeater,
    AnimalWorldUserName,
    Region,
    ReportManageModal,
    ReportManageFormButtons,
    TextInput,
    HeaderBack,
  },
  props: {
    statusPage: {
      type: String,
      default: 'create',
    },
  },
  validations: {
    /*filters: {
      date_from: {
        required
      },
      date_to: {
        required
      },
    },*/
    form: {
      region_id: {
        required,
      },
      fishing_crews_count: {
        required,
      },
      fishermen_total_count: {
        required,
      },
      no_fleet_count: {
        required,
      },
    },
  },
  data() {
    return {
      form: {
        surrender_date: '2023',
        kato_id: null,

        user_id: null,
        region_id: null,
        fishing_crews_count: null,
        fishermen_total_count: null,
        self_propelled_fleets: [
          {
            fleet_brand: null,
            year_of_manufacture: null,
          },
        ],
        no_fleet_count: null,
        snowmobile_count: null,
        motor_vehicle_count: null,
        motorcycle_count: null,
        seine_count: null,
        trawl_count: null,
        fixed_nets_count: null,
        venter_count: null,
        hooks_etc_count: null,
        fillet_workshops_count: null,
        fish_flour_workshops_count: null,
        smoking_workshops_count: null,
        ice_generators_count: null,
        icebox_count: null,
        termocontainer_count: null,
        refrigerators_count: null,
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
    getUserId() {
      return this.$store.state.userObject?.id;
    },
  },
  watch: {
    getUserId(val) {
      if (val) this.form.user_id = val;
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
        .post(`subject/sign/7/${this.$route.params.id}`, formData)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/7-rh' });
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

        if (this.statusPage === 'edit') {
          formData.append('_method', 'PUT');
        }

        api
          .post(
            `/subject/store/7${this.statusPage === 'edit' ? `/${this.$route.params.id}` : ''}`,
            formData,
          )
          .then(() => {
            this.$router.push('/ru/account/reporting/3-rh');
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
          const { data } = await api.get(`subject/show/7/${this.$route.params.id}`);
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
