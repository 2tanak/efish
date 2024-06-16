<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !applications }">
    <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>

    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack
                :title="'Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков'"
              />
              <div class="card__content--body index-page">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <div class="search-main">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="title mb-2">Поиск по наименованию</div>
                            <div>
                              <label class="search__label">
                                <input
                                  type="text"
                                  value=""
                                  name="filter_search"
                                  v-model="v_model_name_search"
                                />

                                <button>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M20.9999 21L16.6499 16.65"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </button>
                              </label>
                            </div>
                            <!-----tsble-filter-search------>
                          </div>
                          <!-----col------>

                          <div class="col-md-6">
                            <div class="title mb-2">Поиск по ИИН/БИН</div>

                            <div>
                              <label class="search__label">
                                <input type="text" v-model="v_model_iin_search" />

                                <button>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M20.9999 21L16.6499 16.65"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </button>
                              </label>
                            </div>
                            <!-----search------>
                          </div>
                          <!-----col------>
                        </div>
                        <!-----row------>

                        <div class="row mt-4">
                          <div class="col-md-6">
                            <div class="calendar">
                              <quarter
                                :title="'Период сдачи'"
                                ref="quarter"
                                :placeholder="'Выбрать'"
                                :inputYears="true"
                                :allOptions="true"
                                v-on:update:modelValue="quarter_value = $event"
                              >
                              </quarter>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <pond
                              :title="'Водоем'"
                              :required="true"
                              ref="pond"
                              :allOptions="true"
                              :placeholder="$t('placeholder.choose')"
                              v-on:update:modelValue="v_model_pond_search = $event"
                            >
                            </pond>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <v-data-table
                    :headers="headers"
                    :items="filteredlist"
                    :loading="false"
                    :options.sync="options"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 20, 30, 40, 50],
                    }"
                    :server-items-length="applicationsMeta.total"
                    @update:options="pagination($event)"
                  >
                    <!---------------1-------------->
                    <template v-slot:item.name="{ item }">
                      <a class="tb__table--link" v-html="item.name"></a>
                    </template>
                    <!---------------2-------------->
                    <template v-slot:item.archived="{ item }">
                      <a class="tb__table--link">
                        {{ !item.archived ? 'Создан' : 'В архиве' }}
                      </a>
                    </template>
                    <!---------------3-------------->
                    <template v-slot:item.action="{ item }">
                      <a
                        class="tb__table--btn tb__table--list"
                        @click.prevent="downloadFile(item.id)"
                        v-tooltip.top-center="{ content: 'Скачать', class: ['tooltip__btn'] }"
                      >
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.3821 11.9272V14.9272C16.3821 15.3251 16.224 15.7066 15.9427 15.9879C15.6614 16.2692 15.2799 16.4272 14.8821 16.4272H4.38208C3.98426 16.4272 3.60272 16.2692 3.32142 15.9879C3.04012 15.7066 2.88208 15.3251 2.88208 14.9272V11.9272"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.88208 8.17725L9.63208 11.9272L13.3821 8.17725"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.63208 11.9272V2.92725"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </a>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error">
                      {{ $t('system_message.search') }}
                    </v-alert>
                  </v-data-table>
                </div>
              </div>

              <hr class="reporting__hr" />

              <ReportManageFormButtons
                v-if="filteredlist"
                :edit="false"
                :sign-status="sign_status"
              />

              <ReportManageErrorModal :message="message" :errorMessage="errorMessage" />
              <ReportManageModal @accept="saveElement" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api, urlApi } from '@/boot/axios';

import quarter from '@/components/components/Inputs/quarter';
import Pond from '@/components/components/Inputs/pond';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageErrorModal from '@/components/reporting-management/ReportManageErrorModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';

export default {
  name: 'ReportTirList3',
  components: {
    quarter,
    Pond,
    HeaderBack,
    ReportManageModal,
    ReportManageFormButtons,
    ReportManageErrorModal,
  },
  head: {
    title() {
      return {
        inner: this.$t('sidebar.references'),
      };
    },
    meta: [],
  },
  data() {
    return {
      pageId: 3,
      applications: [],
      applicationsMeta: {},
      headers: [
        { text: 'Id', value: 'id', width: '50px' },
        { text: 'Субъект', value: 'name', width: '10vw' },
        { text: 'Дата сдачи', value: 'date_of_submission', width: '7vw' },
        { text: 'БИН', value: 'iin_bin', width: '12vw' },
        { text: 'Статус', value: 'status', width: '5vw' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '200px',
        },
      ],
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
      sign_status: false,

      test: ['jon', 'mike', 'jana', 'andre', 'vitaly'],
      urlApi: urlApi,
      v_model_name_search: '',
      v_model_region_search: '',
      v_model_pond_search: '',
      v_model_iin_search: '',
      quarter_value: '',
      inputYears: null,
      id: null,
      FormData: null,
      filter: [],
      dataEcp: null,

      options: {
        itemsPerPage: 10,
        page: 1,
      },
    };
  },
  watch: {
    v_model_name_search() {
      this.quarter_value = null;
      this.$refs.region.value = null;
      this.v_model_region_search = '';
      this.$refs.pond.value = null;
      this.v_model_pond_search = '';
      this.$refs.quarter.value = null;
      this.v_model_iin_search = '';
      //this.v_model_name_search=''
    },
    v_model_region_search() {
      this.quarter_value = null;
      //this.$refs.region.value=null;
      //this.v_model_region_search='';
      this.$refs.pond.value = null;
      this.v_model_pond_search = '';
      this.$refs.quarter.value = null;
      this.v_model_iin_search = '';
      this.v_model_name_search = '';
    },
    v_model_pond_search() {
      this.quarter_value = null;
      this.$refs.region.value = null;
      this.v_model_region_search = '';
      //this.$refs.pond.value=null;
      //this.v_model_pond_search='';
      this.$refs.quarter.value = null;
      this.v_model_iin_search = '';
      this.v_model_name_search = '';
    },
    v_model_iin_search() {
      this.quarter_value = null;
      this.$refs.region.value = null;
      this.v_model_region_search = '';
      this.$refs.pond.value = null;
      this.v_model_pond_search = '';
      this.$refs.quarter.value = null;
      //this.v_model_iin_search='';
      this.v_model_name_search = '';
    },
    quarter_value() {
      //this.quarter_value =null;
      this.$refs.region.value = null;
      this.v_model_region_search = '';
      this.$refs.pond.value = null;
      this.v_model_pond_search = '';
      //this.$refs.quarter.value=null;
      this.v_model_iin_search = '';
      this.v_model_name_search = '';
    },
  },
  computed: {
    filteredlist() {
      return this.applications;
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
        .post(`tir/sign/${this.pageId}`, formData)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({
              path: `/${this.$i18n.locale}/account/reporting/${this.pageId}-tir-rh`,
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
    downloadFile(id) {
      api
        .get(`tir/archived/export/excel/${id}`)
        .then((response) => {
          let fileURL = window.URL.createObjectURL(new Blob([response.data]), {
            type: response.headers['content-type'],
          });
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          const extensions = {
            'application/pdf': 'pdf',
          };
          const contentType = response.headers['content-type'];
          const extension = extensions[contentType];
          const filename = 'report.' + extension;

          fileLink.setAttribute('download', filename);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((error) => {
          this.checkError(error);
        });
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
    pagination(options) {
      this.apiGetReportingList(options.page, options.itemsPerPage);
    },
    async apiGetReportingList(page, per_page) {
      try {
        const response = await api.get(`tir/list/${this.pageId}`, { params: { page, per_page } });
        if (response.data) {
          this.applications = response.data.data;
          this.applicationsMeta = response.data.meta;
        }
      } catch (error) {
        this.checkError(error);
      }
    },
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
};
</script>

<style>
.reporting-btn .input-btn.form__line--btn {
  background: #52a5fc;
  width: 220px;
  height: 47px;
  padding: 0;
  justify-content: center;
  transition: background 1s ease-in;
}
</style>
