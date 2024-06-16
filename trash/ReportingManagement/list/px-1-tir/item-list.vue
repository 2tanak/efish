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
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      Сведения об освоении квоты вылова рыбы и других водных животных пользователями
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left"></div>
                    <div class="table__filter--right">
                      <router-link
                        v-if="$store.getters.userPermission(['change_reporting-5rh'])"
                        :to="'/' + $i18n.locale + '/account/reporting/' + 1 + '-tir/create'"
                        class="btn--link btn--link--plus"
                      >
                        {{ $t('button.add') }} <img src="../../../../../assets/img/icon-plus.svg" />
                      </router-link>
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
                    <template v-slot:item.name="{ item }">
                      <a class="tb__table--link">
                        <!-- :href="'/'+ $i18n.locale +'/account/reporting/1/item/'+ item.id" -->
                        Отчет от {{ item.created_at | formatOnlyDate }}
                      </a>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <a
                        @click="downloadFile(item.id)"
                        class="tb__table--btn tb__table--list"
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
                            stroke="#5ABB5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.88208 8.17725L9.63208 11.9272L13.3821 8.17725"
                            stroke="#5ABB5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.63208 11.9272V2.92725"
                            stroke="#5ABB5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </a>
                      <!--<router-link :to="'/'+ $i18n.locale +'/account/reporting/1/item/' + item.id" class="tb__table--btn tb__table--view" v-tooltip.top-center="{content:'Просмотр', class: ['tooltip__btn']}">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </router-link>-->
                    </template>
                    <v-alert slot="no-results" :value="true" color="error">
                      {{ $t('system_message.search') }}
                    </v-alert>
                  </v-data-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { api, urlApi } from '@/boot/axios';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      urlApi: urlApi,

      applications: [],
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
        { text: 'Наименование отчета', value: 'name', width: '40vw' },
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
    downloadFile(id) {
      api
        .get('report-user/1rh/download', {
          responseType: 'arraybuffer',
          params: {
            report_id: id,
          },
        })
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
        .get('report-user/1rh/list')
        .then((response) => {
          if (response.data) {
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
  computed: {
    filteredlist() {
      return this.applications.filter((d) => {
        return true;
      });
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
