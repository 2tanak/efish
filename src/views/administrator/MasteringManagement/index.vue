<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !applications }">
    <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>

    <div class="container" v-if="applications">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['MasteringManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('sidebar.mastering') }}
                    </div>
                  </div>
                </div>
              </div>
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
                      <div class="table__filter--order"></div>
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
                      {{ item.first_name }} {{ item.last_name }} {{ item.middle_name }}({{
                        item.iin_bin
                      }})
                      <span v-if="item.name_company"
                        ><br /><small>{{ item.name_company }}</small></span
                      >
                    </template>
                    <template v-slot:item.percent="{ item }">
                      <a
                        class="tb__table--status"
                        :class="{
                          'tb__status--success': item.mastering >= 25,
                          'tb__status--error': item.mastering < 25,
                        }"
                      >
                        <strong>{{ item.mastering }}%</strong>
                      </a>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <a
                        class="tb__table--btn tb__table--view"
                        v-tooltip.top-center="{
                          content: $t('tooltip.look'),
                          class: ['tooltip__btn'],
                        }"
                      >
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
import { api, urlApi } from '@/boot/axios';
import axios from 'axios';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      menuClick: false,

      applications: null,
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
        itemsPerPage: 5,
        page: 1,
      },

      Categories: 'all',
      filterCategories: this.$t('orders.userList'),
      orderList: [
        {
          status: 'all',
          name: 'Все',
        },
        {
          status: '2022',
          name: '2022',
        },
        {
          status: '2021',
          name: '2021',
        },
        {
          status: '2020',
          name: '2020',
        },
      ],

      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Наименование субъекта', value: 'name', width: '60%' },
        { text: 'Процент освоения', value: 'percent', align: 'center' },
        //{ text: this.$t('headers.action'), value: 'action', align:'center', sortable: false, width: '200px' },
      ],
    };
  },
  methods: {
    apiGetMasteringList() {
      api
        .get('mastering/list')
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
          if (error?.response?.status == 403) {
            this.errorMessage.status = 403;
            this.errorMessage.text = error?.response?.data?.message;
          }
        });
    },
  },
  computed: {
    filteredlist() {
      return this.applications.filter((d) => {
        let full_name = d.first_name + ' ' + d.last_name + ' ' + d.middle_name;
        if (
          ((d.first_name
            ? d.first_name.toLowerCase().includes(this.filters.search.toLowerCase())
            : true) &&
            (d.last_name
              ? d.last_name.toLowerCase().includes(this.filters.search.toLowerCase())
              : true) &&
            (d.middle_name
              ? d.middle_name.toLowerCase().includes(this.filters.search.toLowerCase())
              : true)) ||
          (full_name
            ? full_name.toLowerCase().includes(this.filters.search.toLowerCase())
            : true) ||
          (d.iin_bin
            ? d.iin_bin.toLowerCase().includes(this.filters.search.toLowerCase())
            : true) ||
          (this.$options.filters.formatDate(d.created_at)
            ? this.$options.filters
                .formatDate(d.created_at)
                .toLowerCase()
                .includes(this.filters.search.toLowerCase())
            : true)
        ) {
          return true;
        }
      });
    },
  },
  beforeMount() {
    this.apiGetMasteringList();
  },
  head: {
    title() {
      return {
        inner: 'Главная',
      };
    },
    meta: [],
  },
};
</script>
