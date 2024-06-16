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
                          :modelValue="form.region_id"
                          v-on:update:modelValue="form.region_id = $event"
                        ></region>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-5">
                      <SelectYear v-model="year" :disabled="isNotEditable || isEditPage" />
                    </div>
                    <div class="col-xl-5">
                      <SelectPeriod v-model="period" :disabled="isNotEditable || isEditPage" />
                    </div>
                  </div>

                  <div v-for="(pool, poolInd) in form.pools" :key="poolInd">
                    <div v-if="_getPondById(pool.farm_id)" class="title2">
                      <div class="row">
                        <div class="col-12">
                          <a
                            v-if="!isNotEditable && form.pools.length > 1"
                            class="mr-2"
                            @click="removePoolField(pool.farm_id)"
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
                          <span>{{ _getPondById(pool.farm_id).name }}</span>
                        </div>
                      </div>
                    </div>

                    <div v-for="(water, waterInd) in pool.waters" :key="waterInd">
                      <div class="reporting-line">
                        <div class="row">
                          <div class="col-xl-4">
                            <div class="reporting__title">
                              {{ $t('inputs.kato') }}
                            </div>
                          </div>
                          <div class="col-xl-8">
                            <kato
                              :required="true"
                              :disabled="isNotEditable"
                              :categoryValue="null"
                              :placeholder="$t('placeholder.choose')"
                              :modelValue="water.kato_id"
                              @update:modelValue="water.kato_id = $event"
                            ></kato>
                          </div>
                        </div>
                      </div>

                      <div class="reporting-line">
                        <div class="row">
                          <div class="col-xl-4">
                            <div class="reporting__title">
                              Общее количество рыбохозяйственных водоемов и (или) участков (с
                              указанием общей площади (гектар))
                            </div>
                          </div>
                          <div class="col-xl-5">
                            <div class="row">
                              <div class="col-lg-6">
                                <TextInput
                                  class="mb-2"
                                  :type="'number'"
                                  :name="'total_fish_farms_count'"
                                  :required="true"
                                  :disabled="isNotEditable"
                                  :placeholder="$t('placeholder.quantity')"
                                  :modelValue="water.total_fish_farms_count"
                                  v-on:update:modelValue="water.total_fish_farms_count = $event"
                                ></TextInput>
                              </div>
                              <div class="col-lg-6">
                                <TextInput
                                  class="mb-2"
                                  :type="'number'"
                                  :name="'total_fish_farms_hectare'"
                                  :required="true"
                                  :disabled="isNotEditable"
                                  :placeholder="'Гектар'"
                                  :modelValue="water.total_fish_farms_hectare"
                                  v-on:update:modelValue="water.total_fish_farms_hectare = $event"
                                ></TextInput>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="mb-4">
                        Закрепление рыбохозяйственных водоемов за рыбохозяйственными организациями
                      </div>

                      <div class="reporting-line">
                        <div class="row">
                          <div class="col-xl-4">
                            <div class="reporting__title">
                              Количество закрепленных водоемов (с указанием общей площади (гектар))
                            </div>
                          </div>
                          <div class="col-xl-5">
                            <div class="row">
                              <div class="col-lg-6">
                                <TextInput
                                  class="mb-2"
                                  :type="'number'"
                                  :name="'total_fish_farms_fixed_count'"
                                  :required="true"
                                  :disabled="isNotEditable"
                                  :placeholder="$t('placeholder.quantity')"
                                  :modelValue="water.total_fish_farms_fixed_count"
                                  v-on:update:modelValue="
                                    water.total_fish_farms_fixed_count = $event
                                  "
                                ></TextInput>
                              </div>
                              <div class="col-lg-6">
                                <TextInput
                                  class="mb-2"
                                  :type="'number'"
                                  :name="'total_fish_farms_fixed_hectare'"
                                  :required="true"
                                  :disabled="isNotEditable"
                                  :placeholder="'Гектар'"
                                  :modelValue="water.total_fish_farms_fixed_hectare"
                                  v-on:update:modelValue="
                                    water.total_fish_farms_fixed_hectare = $event
                                  "
                                ></TextInput>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="reporting-line">
                        <div class="row">
                          <div class="col-xl-5">
                            <div class="row">
                              <div class="col-lg-6">
                                <div class="reporting__title">
                                  Количество рыбохозяйственных организаций
                                </div>
                                <TextInput
                                  class="mb-2"
                                  :type="'number'"
                                  :name="'total_fish_farms_organizations_count'"
                                  :required="true"
                                  :disabled="isNotEditable"
                                  :placeholder="$t('placeholder.quantity')"
                                  :modelValue="water.total_fish_farms_organizations_count"
                                  v-on:update:modelValue="
                                    water.total_fish_farms_organizations_count = $event
                                  "
                                ></TextInput>
                              </div>
                              <div class="col-lg-6">
                                <div class="reporting__title">% закрепления</div>
                                <TextInput
                                  class="mb-2"
                                  :type="'number'"
                                  :name="'total_fish_farms_organizations_fixed_percent'"
                                  :required="true"
                                  :disabled="isNotEditable"
                                  :placeholder="'Гектар'"
                                  :modelValue="water.total_fish_farms_organizations_fixed_percent"
                                  v-on:update:modelValue="
                                    water.total_fish_farms_organizations_fixed_percent = $event
                                  "
                                ></TextInput>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="reporting-line">
                        <div class="row">
                          <div class="col-xl-4">
                            <div class="reporting__title">
                              Количество незакрепленных рыбохозяйственных водоемов (с 
                              указанием общей площади (гектар))
                            </div>
                          </div>
                          <div class="col-xl-5">
                            <div class="row">
                              <div class="col-lg-6">
                                <TextInput
                                  class="mb-2"
                                  :type="'number'"
                                  :name="'total_fish_farms_unfixed_count'"
                                  :required="true"
                                  :disabled="isNotEditable"
                                  :placeholder="$t('placeholder.quantity')"
                                  :modelValue="water.total_fish_farms_unfixed_count"
                                  v-on:update:modelValue="
                                    water.total_fish_farms_unfixed_count = $event
                                  "
                                ></TextInput>
                              </div>
                              <div class="col-lg-6">
                                <TextInput
                                  class="mb-2"
                                  :type="'number'"
                                  :name="'total_fish_farms_unfixed_hectare'"
                                  :required="true"
                                  :disabled="isNotEditable"
                                  :placeholder="'Гектар'"
                                  :modelValue="water.total_fish_farms_unfixed_hectare"
                                  v-on:update:modelValue="
                                    water.total_fish_farms_unfixed_hectare = $event
                                  "
                                ></TextInput>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <SelectWaters
                      v-if="!isNotEditable"
                      class="mb-2"
                      :pool-id="pool.farm_id"
                      @add="addWater(poolInd, $event)"
                    ></SelectWaters>
                  </div>

                  <hr class="reporting__hr" />

                  <SelectPool
                    v-if="!isNotEditable"
                    class="mb-2"
                    @add="addPool($event)"
                  ></SelectPool>

                  <hr class="reporting__hr" />

                  <ReportManageFormButtons
                    :edit="!isNotEditable"
                    :sign-status="sign_status"
                    :report="'6-tir-rh'"
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
import SelectPool from '@/components/reporting-management/SelectPool.vue';
import SelectWaters from '@/components/reporting-management/SelectWaters.vue';
import ReportManageErrorModal from '@/components/reporting-management/ReportManageErrorModal.vue';
import SelectYear from '@/components/reporting-management/SelectYear.vue';
import SelectPeriod from '@/components/reporting-management/SelectPeriod.vue';

export default {
  name: 'ReportPageTir6',
  components: {
    TextInput,
    Region,
    Kato,
    HeaderBack,
    ReportManageModal,
    ReportManageFormButtons,
    SelectPool,
    SelectWaters,
    ReportManageErrorModal,
    SelectYear,
    SelectPeriod,
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
      year: null,
      period: null,
      pageType: 'tir',
      pageId: 6,
      form: {
        region_id: null,
        surrender_date_start: null,
        surrender_date_end: null,
        pools: [],
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
      _getPondById: '_getPondById',
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
  },
  watch: {
    year() {
      this.parseDate();
    },
    period() {
      this.parseDate();
    },
  },
  methods: {
    addPool(pool) {
      this.form.pools.push({
        farm_id: pool.id,
        waters: [],
      });
    },
    removePoolField(poolInd) {
      this.form.pools = this.form.pools.filter((pool) => pool.farm_id === poolInd);
    },
    addWater(poolInd, water) {
      this.form.pools[poolInd].waters.push({
        farm_id: this.form.pools[poolInd].farm_id,
        kato_id: water.id,
        total_fish_farms_count: null,
        total_fish_farms_hectare: null,
        total_fish_farms_fixed_count: null,
        total_fish_farms_fixed_hectare: null,
        total_fish_farms_organizations_count: null,
        total_fish_farms_organizations_fixed_percent: null,
        total_fish_farms_unfixed_count: null,
        total_fish_farms_unfixed_hectare: null,
      });
    },
    parseDate() {
      if (this.year && this.period) {
        if (this.period === 1) {
          this.form.surrender_date_start = `${new Date().getFullYear()}-01-01`;
          this.form.surrender_date_end = `${new Date().getFullYear()}-06-30`;
        } else {
          this.form.surrender_date_start = `${new Date().getFullYear()}-07-01`;
          this.form.surrender_date_end = `${new Date().getFullYear()}-12-31`;
        }
      }
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
      if (data.surrender_date) {
        const date_split = data.surrender_date.split(' ');
        this.year = +date_split[date_split.length - 1];
        this.period = date_split[0] === 'I' ? 1 : 2;
      }
      const form = Object.keys(this.form).reduce((acc, key) => {
        if (data[key]) acc[key] = data[key];
        return acc;
      }, {});
      this.form = {
        ...this.form,
        ...form,
      };
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

<style scoped>
.reporting-line {
  margin-bottom: 10px;
}
</style>
