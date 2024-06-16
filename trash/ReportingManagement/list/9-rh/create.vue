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
                  <FormGroupWrapper1 :title="$t('inputs.region')">
                    <region
                      :required="true"
                      :modelValue="formApp.region"
                      :confinesValue="getUserRegions"
                      :placeholder="$t('placeholder.choose')"
                      v-on:update:modelValue="formApp.region = $event"
                    ></region>
                  </FormGroupWrapper1>
                  <FormGroupWrapper1 :title="$t('inputs.kato')">
                    <kato
                      :required="true"
                      :modelValue="formApp.kato"
                      :categoryValue="formApp.region"
                      :placeholder="$t('placeholder.choose')"
                      v-on:update:modelValue="formApp.kato = $event"
                    ></kato>
                  </FormGroupWrapper1>

                  <hr class="reporting__hr" />

                  <div class="title2">Живая рыба</div>
                  <div class="title3">Производственная мощность предприятия</div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-7">
                        <div class="row">
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :name="'tons_per_day'"
                              :title="'Тонн в сутки'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.tons_per_day"
                              v-on:update:modelValue="formApp.tons_per_day = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :name="'tons_per_year'"
                              :title="'Тонн в год'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.tons_per_year"
                              v-on:update:modelValue="formApp.tons_per_year = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              :type="'number'"
                              :name="'materials_for_processing'"
                              :title="'Сырье для переработки (тонн)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.materials_for_processing"
                              v-on:update:modelValue="formApp.materials_for_processing = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-7">
                        <div class="row">
                          <div class="col-lg-6">
                            <TextInput
                              :type="'number'"
                              :name="'coefficient_recalculation_factor'"
                              :title="'Коэффициент перерасчета выхода готовой продукции'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.coefficient_recalculation_factor"
                              v-on:update:modelValue="
                                formApp.coefficient_recalculation_factor = $event
                              "
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :type="'number'"
                              :name="'volume_products_for_sale'"
                              :title="'Объем конечной переработанной рыбной продукции для реализации (тонн)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.volume_products_for_sale"
                              v-on:update:modelValue="formApp.volume_products_for_sale = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line" style="margin-top: 26px">
                    <div class="title3">Источники сырья (тонн)</div>
                    <div class="row">
                      <div class="col-xl-9 mt-2">
                        <div class="row">
                          <div class="col-lg-3">
                            <TextInput
                              :type="'number'"
                              :name="'own_catch'"
                              :title="'Собственный вылов'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.own_catch"
                              v-on:update:modelValue="formApp.own_catch = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-3">
                            <TextInput
                              :type="'number'"
                              :name="'acquired'"
                              :title="'Приобретено'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.acquired"
                              v-on:update:modelValue="formApp.acquired = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-3">
                            <TextInput
                              :type="'number'"
                              :name="'ocean_fish'"
                              :title="'Океаническая рыба'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.ocean_fish"
                              v-on:update:modelValue="formApp.ocean_fish = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-3">
                            <TextInput
                              :type="'number'"
                              :name="'farmed_fish'"
                              :title="'Выращенная рыба'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.farmed_fish"
                              v-on:update:modelValue="formApp.farmed_fish = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-7">
                        <div class="row">
                          <div class="col-lg-6">
                            <selectInputRepeater
                              :required="true"
                              :title="'Регионы сбыта в Республике Казахстан'"
                              :modelValue="formApp.region_list"
                              :placeholderInput="'Выбрать регион'"
                              :placeholderButton="'Добавить регион'"
                              :chouseComponent="'region'"
                            ></selectInputRepeater>
                          </div>

                          <div class="col-lg-6">
                            <selectInputRepeater
                              :required="true"
                              :title="'Экспорт (страна)'"
                              :modelValue="formApp.country_list"
                              :placeholderInput="'Выбрать страну'"
                              :placeholderButton="'Добавить страну'"
                              :chouseComponent="'country'"
                            ></selectInputRepeater>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-7">
                        <div class="row">
                          <div class="col-lg-12">
                            <TextInput
                              :type="'number'"
                              :name="'average_employees'"
                              :title="'Среднегодовая численность работников занятых на переработке рыбной продукции (человек)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.average_employees"
                              v-on:update:modelValue="formApp.average_employees = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

                  <div class="title2">Охлажденно-мороженная рыба</div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-7">
                        <div class="row">
                          <div class="col-lg-12">
                            <TextInput
                              :type="'number'"
                              :name="'number1'"
                              :title="'Филе'"
                              :required="true"
                              :classValue="'v2'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-7">
                        <div class="row">
                          <div class="col-lg-12">
                            <TextInput
                              :type="'number'"
                              :name="'number1'"
                              :title="'Потрошенная с головой'"
                              :required="true"
                              :classValue="'v2'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-7">
                        <div class="row">
                          <div class="col-lg-12">
                            <TextInput
                              :type="'number'"
                              :name="'number1'"
                              :title="'Тушка без головы'"
                              :required="true"
                              :classValue="'v2'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-7">
                        <div class="row">
                          <div class="col-lg-12">
                            <TextInput
                              :type="'number'"
                              :name="'number1'"
                              :title="'Другие виды разделки'"
                              :required="true"
                              :classValue="'v2'"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="reporting__hr" />
                  <FormGroupWrapper1 :title="'Юридический адрес местонахождения предприятия'">
                    <TextInput
                      :type="'text'"
                      :name="'legal_address'"
                      :title="''"
                      :required="true"
                      :classValue="'v2'"
                      :placeholder="''"
                      :modelValue="formApp.legal_address"
                      v-on:update:modelValue="formApp.legal_address = $event"
                    ></TextInput>
                  </FormGroupWrapper1>
                  <FormGroupWrapper1
                    :title="'Фамилия, имя, отчество (при его наличии) исполнителя'"
                  >
                    <TextInput
                      :type="'text'"
                      :name="'performer_full_name'"
                      :title="''"
                      :required="true"
                      :classValue="'v2'"
                      :placeholder="''"
                      :modelValue="formApp.performer_full_name"
                      v-on:update:modelValue="formApp.performer_full_name = $event"
                    ></TextInput>
                    <div class="row mt-2">
                      <div class="col-lg-6">
                        <TextInput
                          :type="'text'"
                          :name="'performer_contact_phone'"
                          :title="'Контактный телефон'"
                          :required="true"
                          :placeholder="'+7(_ _ _)_ _ _  _ _  _ _'"
                          :modelValue="formApp.performer_contact_phone"
                          v-on:update:modelValue="formApp.performer_contact_phone = $event"
                        ></TextInput>
                      </div>
                      <div class="col-lg-6">
                        <TextInput
                          :type="'text'"
                          :name="'performer_email'"
                          :title="'Электронный адрес'"
                          :required="true"
                          :placeholder="''"
                          :modelValue="formApp.performer_email"
                          v-on:update:modelValue="formApp.performer_email = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </FormGroupWrapper1>
                  <FormGroupWrapper1
                    :title="'Фамилия, имя, отчество (при его наличии) руководителя или исполняющее его обязанности межобластной бассейновой инспекции рыбного хозяйства'"
                  >
                    <TextInput
                      :type="'text'"
                      :name="'inspection_full_name'"
                      :title="''"
                      :required="true"
                      :classValue="'v2'"
                      :placeholder="''"
                      :modelValue="formApp.inspection_full_name"
                      v-on:update:modelValue="formApp.inspection_full_name = $event"
                    ></TextInput>
                  </FormGroupWrapper1>
                  <FormGroupWrapper1
                    :title="'Фамилия, имя, отчество (при его наличии) руководителя предприятия'"
                  >
                    <TextInput
                      :type="'text'"
                      :name="'enterprise_manager_full_name'"
                      :title="''"
                      :required="true"
                      :classValue="'v2'"
                      :placeholder="''"
                      :modelValue="formApp.enterprise_manager_full_name"
                      v-on:update:modelValue="formApp.enterprise_manager_full_name = $event"
                    ></TextInput>
                  </FormGroupWrapper1>
                  <FormGroupWrapper1
                    :title="'Фамилия, имя, отчество (при его наличии) главного бухгалтера'"
                  >
                    <TextInput
                      :type="'text'"
                      :name="'accountant_full_name'"
                      :title="''"
                      :required="true"
                      :classValue="'v2'"
                      :placeholder="''"
                      :modelValue="formApp.accountant_full_name"
                      v-on:update:modelValue="formApp.accountant_full_name = $event"
                    ></TextInput>
                    <div class="row mt-2">
                      <div class="col-lg-6">
                        <TextInput
                          :type="'text'"
                          :name="'accountant_contact_phone'"
                          :title="'Контактный телефон'"
                          :required="true"
                          :placeholder="'+7(_ _ _)_ _ _  _ _  _ _'"
                          :modelValue="formApp.accountant_contact_phone"
                          v-on:update:modelValue="formApp.accountant_contact_phone = $event"
                        ></TextInput>
                      </div>
                      <div class="col-lg-6">
                        <TextInput
                          :type="'text'"
                          :name="'accountant_email'"
                          :title="'Электронный адрес'"
                          :required="true"
                          :placeholder="''"
                          :modelValue="formApp.accountant_email"
                          v-on:update:modelValue="formApp.accountant_email = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </FormGroupWrapper1>
                  <hr class="reporting__hr" />

                  <ReportManageFormButtons :edit="!isNotEditable" :report="'9-rh'" />
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
import { api } from '@/boot/axios';
import { convertObjectToFormData } from '@/formData';

import TextInput from '@/components/components/Inputs/TextInput.vue';
import Region from '@/components/components/Inputs/region';
import Kato from '@/components/components/Inputs/kato';
import SelectInputRepeater from '@/components/components/Inputs/selectInputRepeater';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';
import FormGroupWrapper1 from '@/components/UI/FormGroupWrappers/FormGroupWrapper1.vue';

export default {
  name: 'ReportPage9',
  components: {
    TextInput,
    Region,
    Kato,
    SelectInputRepeater,
    HeaderBack,
    ReportManageModal,
    ReportManageFormButtons,
    FormGroupWrapper1,
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
      formApp: {
        surrender_date: '',
        kato: null,
        fish: null,
        pond: [],
        fishTonTenge: [],
        employees: [],
        number1: '',
        number2: '',
        number3: '',
        region_list: [{ id: null, name: null }],
        country_list: [{ id: null, name: null }],
        tons_per_day: '',
        tons_per_year: '',
        materials_for_processing: '',
        coefficient_recalculation_factor: '',
        volume_products_for_sale: '',
        own_catch: '',
        acquired: '',
        ocean_fish: '',
        farmed_fish: '',
        average_employees: '',
        region: null,
        report_year: '', // -
        legal_address: '',
        performer_full_name: '',
        performer_contact_phone: '',
        performer_email: '',
        inspection_full_name: '',
        enterprise_manager_full_name: '',
        accountant_full_name: '',
        accountant_contact_phone: '',
        accountant_email: '',
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
        .post(`subject/sign/9/${this.$route.params.id}`, formData)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/9-rh' });
          }
        })
        .catch((e) => {})
        .finally(() => {
          document.querySelector('.preloader').classList.remove('active');
        });
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
            `/subject/store/9${this.statusPage === 'edit' ? `/${this.$route.params.id}` : ''}`,
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
          const { data } = await api.get(`subject/show/9/${this.$route.params.id}`);
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
  async beforeMount() {
    await this.showDetailManagment();
  },
};
</script>
