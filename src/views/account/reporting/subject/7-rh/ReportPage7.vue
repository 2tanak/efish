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

                  <SelectYear
                    :value="form.surrender_date"
                    :disabled="isNotEditable || isEditPage"
                    @input="form = { ...form, surrender_date: $event }"
                  />

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

                  <ReportManageFormButtons
                    :edit="!isNotEditable"
                    :sign-status="sign_status"
                    :report="'7-rh'"
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
import { required } from 'vuelidate/lib/validators';

import { api } from '@/boot/axios';
import { convertObjectToFormData } from '@/formData';

import TextInput from '@/components/components/Inputs/TextInput.vue';
import Region from '@/components/components/Inputs/region';
import BrandRepeater from '@/components/components/Inputs/brandRepeater';
import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';
import ReportManageErrorModal from '@/components/reporting-management/ReportManageErrorModal.vue';
import AnimalWorldUserName from '@/components/reporting-management/AnimalWorldUserName.vue';
import SelectYear from '@/components/reporting-management/SelectYear.vue';

export default {
  name: 'Rh7Edit',
  components: {
    TextInput,
    Region,
    BrandRepeater,
    HeaderBack,
    ReportManageModal,
    ReportManageFormButtons,
    ReportManageErrorModal,
    AnimalWorldUserName,
    SelectYear,
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
      pageType: 'subject',
      pageId: 7,
      form: {
        surrender_date: null,
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
    isEditPage() {
      return this.statusPage == 'edit';
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
