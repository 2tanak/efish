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
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <div class="table__filter--search">
                        <label class="search__label">
                          <input
                            type="text"
                            value=""
                            name="filter_search"
                            v-model="filters.search"
                            :placeholder="$t('placeholder.search')"
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
                    </div>
                    <div class="table__filter--right">
                      <router-link
                        v-if="$store.getters.userPermission(['change_reporting'])"
                        :to="'/' + $i18n.locale + '/account/reporting/' + '8-rh' + '/create'"
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
                      <router-link
                        :to="'/' + $i18n.locale + '/account/reporting/' + item.id"
                        class="tb__table--link"
                      >
                        {{ item.name }}
                      </router-link>
                    </template>
                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | formatDate }}
                    </template>
                    <template v-slot:item.status="{ item }">
                      <a
                        class="tb__table--status"
                        :class="{
                          'tb__status--success': item.status == 'active',
                          'tb__status--error': item.status == 'deleted',
                        }"
                      >
                        {{ item.status == 'active' ? 'Активный' : '' }}
                        {{ item.status == 'deleted' ? 'Заблокирован' : '' }}
                        {{ item.status == 'new' ? 'Новый' : '' }}
                      </a>
                    </template>
                    <!--                    <template v-slot:item.action="{item}">-->
                    <!--                      <router-link :to=" urlApi + '/generate/report?id=' + item.id" class="tb__table&#45;&#45;btn tb__table&#45;&#45;list" v-tooltip.top-center="{content:'Скачать', class: ['tooltip__btn']}">-->
                    <!--                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                    <!--                          <path d="M16.3821 11.9272V14.9272C16.3821 15.3251 16.224 15.7066 15.9427 15.9879C15.6614 16.2692 15.2799 16.4272 14.8821 16.4272H4.38208C3.98426 16.4272 3.60272 16.2692 3.32142 15.9879C3.04012 15.7066 2.88208 15.3251 2.88208 14.9272V11.9272" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>-->
                    <!--                          <path d="M5.88208 8.17725L9.63208 11.9272L13.3821 8.17725" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>-->
                    <!--                          <path d="M9.63208 11.9272V2.92725" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>-->
                    <!--                        </svg>-->
                    <!--                      </router-link>-->
                    <!--                    </template>-->
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
import { api, urlApi } from '@/boot/axios';

import HeaderBack from '@/components/UI/HeaderBack.vue';

export default {
  components: {
    HeaderBack,
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

      filters: {
        search: '',
      },
      options: {
        itemsPerPage: 10,
        page: 1,
      },

      Categories: 'all',
      filterCategories: this.$t('orders.userList'),
      orderList: this.$t('orders.user'),

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
    apiGetReportingList() {
      api
        .get('reports', {
          params: {
            index: 6,
          },
        })
        .then((response) => {
          if (response.data) {
            this.applications = response.data;
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
        if (d.name ? d.name.toLowerCase().includes(this.filters.search.toLowerCase()) : true) {
          return true;
        }
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
