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
                      :modelValue="form.region_id"
                      :confinesValue="getUserRegions"
                      :placeholder="$t('placeholder.choose')"
                      v-on:update:modelValue="form.region_id = $event"
                    ></region>
                  </FormGroupWrapper1>
                  <FormGroupWrapper1 :title="$t('inputs.kato')">
                    <kato
                      v-if="formList.kato[0]"
                      :required="true"
                      :modelValue="formList.kato[0].id"
                      :disabled="true"
                      :categoryValue="form.region_id"
                      :placeholder="$t('placeholder.choose')"
                    ></kato>
                  </FormGroupWrapper1>

                  <SelectYear
                    :value="form.surrender_date"
                    :disabled="isNotEditable || isEditPage"
                    @input="form = { ...form, surrender_date: $event }"
                  />

                  <hr class="reporting__hr" />

                  <div v-for="prodCap in form.production_capacities" :key="prodCap.type_id">
                    <div class="title2">
                      <div class="row">
                        <div class="col-12">
                          <a
                            v-if="!isNotEditable && form.production_capacities.length > 1"
                            class="mr-2"
                            @click="removeField(itemInd)"
                          >
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.02375 12.9762L12.9762 8.02375M12.9762 12.9762L8.02375 8.02375M10.5 19.25C15.3125 19.25 19.25 15.3125 19.25 10.5C19.25 5.6875 15.3125 1.75 10.5 1.75C5.6875 1.75 1.75 5.6875 1.75 10.5C1.75 15.3125 5.6875 19.25 10.5 19.25Z"
                                stroke="#DF4242"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </a>
                          <span>{{ _getFishStateTypeById(prodCap.type_id)?.name }}</span>
                          <span>{{
                            _getFishStateSubTypeById(prodCap.type_id, prodCap.subtype_id)?.name
                          }}</span>
                        </div>
                      </div>
                    </div>
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
                                :modelValue="prodCap.tons_per_day"
                                :disabled="isNotEditable"
                                v-on:update:modelValue="prodCap.tons_per_day = $event"
                              ></TextInput>
                            </div>
                            <div class="col-lg-4">
                              <TextInput
                                :type="'number'"
                                :name="'tons_per_year'"
                                :title="'Тонн в год'"
                                :required="true"
                                :placeholder="$t('placeholder.quantity')"
                                :modelValue="prodCap.tons_per_year"
                                :disabled="isNotEditable"
                                v-on:update:modelValue="prodCap.tons_per_year = $event"
                              ></TextInput>
                            </div>
                            <div class="col-lg-4">
                              <TextInput
                                :type="'number'"
                                :name="'materials_for_processing'"
                                :title="'Сырье для переработки (тонн)'"
                                :required="true"
                                :placeholder="$t('placeholder.quantity')"
                                :modelValue="prodCap.materials_for_processing"
                                :disabled="isNotEditable"
                                v-on:update:modelValue="prodCap.materials_for_processing = $event"
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
                                :modelValue="prodCap.coefficient_recalculation_factor"
                                :disabled="isNotEditable"
                                v-on:update:modelValue="
                                  prodCap.coefficient_recalculation_factor = $event
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
                                :disabled="isNotEditable"
                                :modelValue="prodCap.volume_products_for_sale"
                                v-on:update:modelValue="prodCap.volume_products_for_sale = $event"
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
                                :disabled="isNotEditable"
                                :modelValue="prodCap.own_catch"
                                v-on:update:modelValue="prodCap.own_catch = $event"
                              ></TextInput>
                            </div>
                            <div class="col-lg-3">
                              <TextInput
                                :type="'number'"
                                :name="'acquired'"
                                :title="'Приобретено'"
                                :required="true"
                                :placeholder="$t('placeholder.quantity')"
                                :disabled="isNotEditable"
                                :modelValue="prodCap.acquired"
                                v-on:update:modelValue="prodCap.acquired = $event"
                              ></TextInput>
                            </div>
                            <div class="col-lg-3">
                              <TextInput
                                :type="'number'"
                                :name="'ocean_fish'"
                                :title="'Океаническая рыба'"
                                :required="true"
                                :placeholder="$t('placeholder.quantity')"
                                :disabled="isNotEditable"
                                :modelValue="prodCap.ocean_fish"
                                v-on:update:modelValue="prodCap.ocean_fish = $event"
                              ></TextInput>
                            </div>
                            <div class="col-lg-3">
                              <TextInput
                                :type="'number'"
                                :name="'farmed_fish'"
                                :title="'Выращенная рыба'"
                                :required="true"
                                :placeholder="$t('placeholder.quantity')"
                                :disabled="isNotEditable"
                                :modelValue="prodCap.farmed_fish"
                                v-on:update:modelValue="prodCap.farmed_fish = $event"
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
                                :name="'average_employees'"
                                :title="'Среднегодовая численность работников занятых на переработке рыбной продукции (человек)'"
                                :required="true"
                                :placeholder="$t('placeholder.quantity')"
                                :disabled="isNotEditable"
                                :modelValue="prodCap.average_employees"
                                v-on:update:modelValue="prodCap.average_employees = $event"
                              ></TextInput>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="reporting-line">
                      <div class="row">
                        <div class="col-xl-10">
                          <div class="row">
                            <div class="col-lg-12">
                              <SelectRegionAndCountry
                                :required="true"
                                :disabled="isNotEditable"
                                :value="prodCap.regions"
                                :region-key="'region_id'"
                                :country-key="'export_country_id'"
                                @input="prodCap.regions = $event"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ChapterAdder v-if="!isNotEditable" @add="addProdCap($event)" />

                  <hr class="reporting__hr" />

                  <FormGroupWrapper1 :title="'Юридический адрес местонахождения предприятия'">
                    <TextInput
                      :type="'text'"
                      :name="'legal_address'"
                      :title="''"
                      :required="true"
                      :classValue="'v2'"
                      :placeholder="''"
                      :modelValue="form.legal_address"
                      :disabled="isNotEditable"
                      v-on:update:modelValue="form.legal_address = $event"
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
                      :modelValue="form.performer_full_name"
                      :disabled="isNotEditable"
                      v-on:update:modelValue="form.performer_full_name = $event"
                    ></TextInput>
                    <div class="row mt-2">
                      <div class="col-lg-6">
                        <TextInput
                          :type="'text'"
                          :name="'performer_contact_phone'"
                          :title="'Контактный телефон'"
                          :required="true"
                          :placeholder="'+7(_ _ _)_ _ _  _ _  _ _'"
                          :modelValue="form.performer_contact_phone"
                          :disabled="isNotEditable"
                          v-on:update:modelValue="form.performer_contact_phone = $event"
                        ></TextInput>
                      </div>
                      <div class="col-lg-6">
                        <TextInput
                          :type="'text'"
                          :name="'performer_email'"
                          :title="'Электронный адрес'"
                          :required="true"
                          :placeholder="''"
                          :modelValue="form.performer_email"
                          :disabled="isNotEditable"
                          v-on:update:modelValue="form.performer_email = $event"
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
                      :modelValue="form.inspection_full_name"
                      :disabled="isNotEditable"
                      v-on:update:modelValue="form.inspection_full_name = $event"
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
                      :modelValue="form.enterprise_manager_full_name"
                      :disabled="isNotEditable"
                      v-on:update:modelValue="form.enterprise_manager_full_name = $event"
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
                      :modelValue="form.accountant_full_name"
                      :disabled="isNotEditable"
                      v-on:update:modelValue="form.accountant_full_name = $event"
                    ></TextInput>
                    <div class="row mt-2">
                      <div class="col-lg-6">
                        <TextInput
                          :type="'text'"
                          :name="'accountant_contact_phone'"
                          :title="'Контактный телефон'"
                          :required="true"
                          :placeholder="'+7(_ _ _)_ _ _  _ _  _ _'"
                          :modelValue="form.accountant_contact_phone"
                          :disabled="isNotEditable"
                          v-on:update:modelValue="form.accountant_contact_phone = $event"
                        ></TextInput>
                      </div>
                      <div class="col-lg-6">
                        <TextInput
                          :type="'text'"
                          :name="'accountant_email'"
                          :title="'Электронный адрес'"
                          :required="true"
                          :placeholder="''"
                          :modelValue="form.accountant_email"
                          :disabled="isNotEditable"
                          v-on:update:modelValue="form.accountant_email = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </FormGroupWrapper1>

                  <hr class="reporting__hr" />

                  <ReportManageFormButtons
                    :edit="!isNotEditable"
                    :sign-status="sign_status"
                    :report="'9-rh'"
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
import { mapGetters } from 'vuex';

import { api } from '@/boot/axios';
import { convertObjectToFormData } from '@/formData';

import TextInput from '@/components/components/Inputs/TextInput.vue';
import Region from '@/components/components/Inputs/region';
import Kato from '@/components/components/Inputs/kato';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';
import FormGroupWrapper1 from '@/components/UI/FormGroupWrappers/FormGroupWrapper1.vue';
import ReportManageErrorModal from '@/components/reporting-management/ReportManageErrorModal.vue';
import SelectYear from '@/components/reporting-management/SelectYear.vue';
import SelectRegionAndCountry from '@/components/reporting-management/SelectRegionAndCountry.vue';
import ChapterAdder from '@/components/reporting-management/ChapterAdder.vue';

const formStructure = {
  region_id: null,
  surrender_date: null,
  production_capacities: [
    {
      type_id: null,
      subtype_id: null,
      tons_per_day: null,
      tons_per_year: null,
      materials_for_processing: null,
      coefficient_recalculation_factor: null,
      volume_products_for_sale: null,
      own_catch: null,
      acquired: null,
      ocean_fish: null,
      farmed_fish: null,
      average_employees: null,
      regions: [
        {
          region_id: null,
          export_country_id: null,
        },
      ],
    },
  ],
  legal_address: null,
  performer_full_name: null,
  performer_contact_phone: null,
  performer_email: null,
  inspection_full_name: null,
  enterprise_manager_full_name: null,
  accountant_full_name: null,
  accountant_contact_phone: null,
  accountant_email: null,
};

export default {
  name: 'ReportPage9',
  components: {
    TextInput,
    Region,
    Kato,
    HeaderBack,
    ReportManageModal,
    ReportManageFormButtons,
    FormGroupWrapper1,
    ReportManageErrorModal,
    SelectYear,
    SelectRegionAndCountry,
    ChapterAdder,
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
      applicationsUser: null,
      applicationsKato: null,
      pageType: 'subject',
      pageId: 9,
      form: {
        region_id: null,
        surrender_date: null,
        production_capacities: [],
        legal_address: null,
        performer_full_name: null,
        performer_contact_phone: null,
        performer_email: null,
        inspection_full_name: null,
        enterprise_manager_full_name: null,
        accountant_full_name: null,
        accountant_contact_phone: null,
        accountant_email: null,
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
    ...mapGetters({
      _getFishStateTypeById: '_getFishStateTypeById',
      _getFishStateSubTypeById: '_getFishStateSubTypeById',
    }),
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
    getUserKatoList() {
      if (!this.applicationsKato) return [];
      if (!this.applicationsUser) return this.applicationsKato;
      return this.applicationsKato.filter((element) => {
        return this.applicationsUser.region.find((e) => {
          if (e?.id == element.values[0].parent_id) {
            element.value = e.value;
            return true;
          }
        });
      });
    },
    formList() {
      return {
        region: this.getUserRegionList,
        district: this.getUserDistrictList,
        pond: this.getUserPondList,
        kato: this.getUserKatoList,
      };
    },
  },
  methods: {
    async apiGetKatoList() {
      try {
        const response = await api.get('catalog/12/entry/all');
        if (response.data) {
          this.applicationsKato = response.data.map((element) => {
            element.name = element.values[0].value;
            return element;
          });
        }
      } catch (error) {
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
      }
    },
    async apiGetUserRegions() {
      try {
        const response = await api.get('/user/region');
        if (response.data) {
          this.applicationsUser = response.data;
        }
      } catch (error) {
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
      }
    },
    addProdCap(value) {
      this.form.production_capacities.push({
        type_id: value.type?.id || null,
        subtype_id: value.subType?.id || null,
        tons_per_day: null,
        tons_per_year: null,
        materials_for_processing: null,
        coefficient_recalculation_factor: null,
        volume_products_for_sale: null,
        own_catch: null,
        acquired: null,
        ocean_fish: null,
        farmed_fish: null,
        average_employees: null,
        regions: [
          {
            region_id: null,
            export_country_id: null,
          },
        ],
      });
    },
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
      this.form = Object.keys(formStructure).reduce((acc, key) => {
        if (data[key]) {
          if (key === 'production_capacities') {
            acc[key] = data[key]?.map((e) => {
              return Object.keys(formStructure[key][0]).reduce((a2, key2) => {
                if (key2 === 'regions' && e?.export_to_countries.length) {
                  a2[key2] = e.export_to_countries.map((c, index) => {
                    return {
                      region_id: e.sales_regions[index].region_id,
                      export_country_id: c.country_id,
                    };
                  });
                } else a2[key2] = e[key2];
                return a2;
              }, {});
            });
          } else acc[key] = data[key];
        }
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
    await this.apiGetKatoList();
    await this.apiGetUserRegions();
    await this.showDetailManagment();
    await this.checkStatusSign();
  },
};
</script>
