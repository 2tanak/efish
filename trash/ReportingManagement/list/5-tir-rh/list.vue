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
                :title="'Сведения о рыбохозяйственных водоемах и (или) участках местного значения'"
              />
              <div class="card__content--body index-page">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <div class="search-main">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="title mb-2">Поиск по наименованию</div>
                            <div class="table__filter--search">
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

                            <div class="table__filter--search">
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
                          <div class="col-md-3">
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
                          <!----col ---->
                          <!-----
                          <div class="col-md-3">
						 
                            <region
							  ref="region"
                              :name="'region_id'"
                              v-on:update:modelName="
                              v_model_region_search = $event
                              "
							  allOptions="true"
                              :title="'Регион'"
                              :placeholder="'Все...'"
                            >
                            </region>
							
                          </div>
                        ------>
                          <div class="col-md-3">
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
                          <!---------
					   <div class='col-md-2'>
					   <div class='checkbox'>
					   
					   
					   <input type="checkbox" class="custom-checkbox align-self-center" id="passed" name="happy" value="yes">
                       <label for="passed">Сдан</label>
					 
					  
					  
					   <input type="checkbox" class="custom-checkbox" id="no_passed" name="happy" value="yes">
                       <label for="no_passed">Не сдан</label>
					  
					   
					   </div>
					   </div>
				---------------------->
                        </div>
                      </div>
                      <!-----search-main------>
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
                  >
                    <!---------------1-------------->
                    <template v-slot:item.name="{ item }">
                      <a class="tb__table--link" v-html="item.name">
                        <!-- :href="'/'+ $i18n.locale +'/account/reporting/1/item/'+ item.id" -->
                        <!-- Отчет  {{ item.created_at | formatOnlyDate }} -->
                      </a>
                    </template>
                    <!---------------2-------------->
                    <template v-slot:item.archived="{ item }">
                      <a class="tb__table--link">
                        {{ !item.archived ? 'Создан' : 'В архиве' }}
                      </a>
                    </template>
                    <!---------------3-------------->
                    <template v-slot:item.action="{ item }">
                      <!-------------
                      <a :href="'1-tir-rh' + `/${item.user_id}`">
                    
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
                            stroke="#5ABB5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                            stroke="#5ABB5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </a>
                      --------------------->
                      <a
                        class="tb__table--btn tb__table--list"
                        :href="'https://api.efish.airweb.kz/api/v1/subject/pdf/1?id=' + item.id"
                        target="_blank"
                        download
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

                      <!--<a :href="'/'+ $i18n.locale +'/account/reporting/1/item/' + item.id" class="tb__table--btn tb__table--view" v-tooltip.top-center="{content:'Просмотр', class: ['tooltip__btn']}">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>-->
                    </template>
                    <v-alert slot="no-results" :value="true" color="error">
                      {{ $t('system_message.search') }}
                    </v-alert>
                  </v-data-table>
                </div>
              </div>

              <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                <hr class="reporting__hr" />

                <div class="reporting-btn">
                  <div class="reporting-wrapper">
                    <a class="input-btn form__line--btn" @click="activeElement()">
                      Подписать ЭЦП
                    </a>
                    <!-----
                      <button
                        type="submit"
                        class="input-btn form__line--btn"
                       
                      >
                        отправить
						<img src="../../../../../assets/img/icon-plus.svg">
                      </button>
					  ----->
                    <!-- <a class="input-btn form__line--btn" @click="$modal.show('modal_head')" v-if="statusPage == 'show'">
                        {{ $t('button.ecp') }}
                      </a> -->
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/components/Inputs/TextInput.vue';
import Multiselect from 'vue-multiselect';
import Region from '@/components/components/Inputs/region';
import Pond from '@/components/components/Inputs/pond';
import { api, urlApi } from '@/boot/axios';
import quarter from '@/components/components/Inputs/quarter';
import moment from 'moment';
import { convertObjectToFormData } from '@/formData';

import HeaderBack from '@/components/UI/HeaderBack.vue';

export default {
  components: {
    HeaderBack,
    Multiselect,
    TextInput,
    Region,
    Pond,
    quarter,
  },

  data() {
    return {
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
      applications: [],
      dataEcp: null,
      errorMessage: {
        status: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      options: {
        itemsPerPage: 10,
        page: 1,
      },

      headers: [
        { text: 'Id', value: 'id', width: '50px' },
        { text: 'Субъект', value: 'name', width: '10vw' },
        { text: 'Дата сдачи', value: 'date_of_submission', width: '7vw' },
        //{ text: "Водоем", value: "pond", width: "8vw" },
        { text: 'Область, регион', value: 'region', width: '12vw' },
        //{ text: 'iin', value: 'iin_bin', width: '5vw' },
        { text: 'Статус', value: 'archived', width: '5vw' },
        // { text: this.$t('headers.created_at'), value: 'created_at' },
        // { text: this.$t('headers.status'), value: 'status' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '200px',
        },
      ],
    };
  },

  methods: {
    activeElement() {
      if (this.$configFile.active) return this.sendEcpKey();
      this.ecp = false;
      const websocket = new WebSocket('wss://127.0.0.1:13579/');
      var ready = null;
      let ecpData = {
        path: null,
        owner: null,
        data: null,
      };
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
          //this.sendEcpKey(id, 'approved-manager');
        }
      };
      //this.sendEcpKey(id, 'approved-manager');
    },
    sendEcpKey() {
      const formData = new FormData();
      formData.append('xml', this.dataEcp || this.$configFile.xml);
      formData.append('report_id', this.id);
      formData.append('_method', 'PUT');
      document.querySelector('.preloader').classList.add('active');
      api
        .post('tir/sign/1', formData)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/1-tir-rh' });
            document.querySelector('.preloader').classList.remove('active');
            //this.$router.push("/account/reporting/1-tir-rh");
          }
        })
        .catch(() => {});
    },

    onSubmit() {
      document.querySelector('.preloader').classList.add('active');

      let formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('accept', 1);

      api
        .post('tir/send/1', formData)
        .then((res) => {
          document.querySelector('.preloader').classList.remove('active');
        })
        .catch(() => {});
    },
    downloadFile(id) {
      api
        .get('subject/pdf/2?id=' + id)
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
        .catch(() => {});
    },

    apiGetReportingList() {
      api
        .get('tir/list/1')
        .then((response) => {
          if (response.data) {
            /*
            response.data.data.push({
              iin_bin: 155,
              name: "Тоо иии",
              pond: "Озеро Куренное",
              region: "Актюбинская область",
            });
			*/
            this.id = response.data.data.id;
            this.applications = response.data.data;
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
  },
  watch: {
    v_model_name_search(val) {
      this.quarter_value = null;
      this.$refs.region.value = null;
      this.v_model_region_search = '';
      this.$refs.pond.value = null;
      this.v_model_pond_search = '';
      this.$refs.quarter.value = null;
      this.v_model_iin_search = '';
      //this.v_model_name_search=''
    },
    v_model_region_search(val) {
      this.quarter_value = null;
      //this.$refs.region.value=null;
      //this.v_model_region_search='';
      this.$refs.pond.value = null;
      this.v_model_pond_search = '';
      this.$refs.quarter.value = null;
      this.v_model_iin_search = '';
      this.v_model_name_search = '';
    },
    v_model_pond_search(val) {
      this.quarter_value = null;
      this.$refs.region.value = null;
      this.v_model_region_search = '';
      //this.$refs.pond.value=null;
      //this.v_model_pond_search='';
      this.$refs.quarter.value = null;
      this.v_model_iin_search = '';
      this.v_model_name_search = '';
    },
    v_model_iin_search(val) {
      this.quarter_value = null;
      this.$refs.region.value = null;
      this.v_model_region_search = '';
      this.$refs.pond.value = null;
      this.v_model_pond_search = '';
      this.$refs.quarter.value = null;
      //this.v_model_iin_search='';
      this.v_model_name_search = '';
    },
    quarter_value(val) {
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
      const filter_name = this.applications.filter((d) => {
        let name;
        let region;
        let pond;
        let iin;

        if (this.v_model_name_search && d.name) {
          let cutTag = d.name.replace(/&quot;/g, '');
          if (cutTag) {
            name = cutTag.toLowerCase().includes(this.v_model_name_search.toLowerCase());
          } else {
            d.name.toLowerCase().includes(this.v_model_name_search.toLowerCase());
          }
        }
        if (this.v_model_region_search && d.region) {
          region = d.region.toLowerCase().includes(this.v_model_region_search.toLowerCase());
        }
        if (this.v_model_pond_search && d?.pond) {
          pond = d.pond.toLowerCase().includes(this.v_model_pond_search.toLowerCase());
        }

        if (this.v_model_iin_search) {
          if (d['iin_bin'] == Number(this.v_model_iin_search)) {
            return true;
          }
        }

        if (this.quarter_value) {
          const format_array = this.quarter_value.split(',');
          const month_number = format_array[0];
          const years = format_array[1];
          const format_month = moment().years(years).month(Number(month_number));
          let start_quarter = format_month.startOf('month').format('x');
          let end_quarter = format_month.add('month', 2).endOf('month').format('x');

          if (d.date_of_submission) {
            let quarter = moment(d.date_of_submission, 'DD,MM,YYYY').format('x');
            quarter = Number(quarter);

            if (quarter > start_quarter && quarter < end_quarter) {
              return true;
            }
          }
        }

        if (name || region || pond || iin) {
          return true;
        }
      });

      if (
        this.v_model_name_search ||
        this.v_model_region_search ||
        this.v_model_pond_search ||
        this.quarter_value ||
        this.v_model_iin_search
      ) {
        if (this.v_model_region_search === 'Все...') {
          return this.applications;
        }
        if (this.v_model_pond_search === 'Все...') {
          return this.applications;
        }
        if (parseInt(this.quarter_value)) {
          if (parseInt(this.quarter_value) == 177) {
            return this.applications;
          }
        }
      } else {
        return this.applications.filter((d) => {
          return true;
        });
      }
      if (filter_name.length > 0) {
        return filter_name;
      }
    },
  },

  beforeMount() {
    this.apiGetReportingList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  head: {
    title() {
      return {
        inner: this.$t('sidebar.references'),
      };
    },
    meta: [],
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
  transition: background 1s;
}
</style>
