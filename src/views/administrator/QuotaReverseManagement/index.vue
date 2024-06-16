<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !applications || !$store.getters.userPermission }"
  >
    <v-preloader
      v-if="!applications || !$store.getters.userPermission"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="applications && $store.getters.userPermission">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['QuotaReverseManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('sidebar.quotas_reverse') }}
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
                      <div class="table__filter--order">
                        <multiselect
                          class="select__status"
                          v-model="filterCategories"
                          :options="orderList"
                          label="name"
                          :clearOnSelect="false"
                          :clear-on-select="false"
                          placeholder="Год лимита"
                        >
                          <template slot="singleLabel" slot-scope="{ option }">{{
                            option.name
                          }}</template>
                          <template slot="noResult">{{ $t('components.not_found') }}</template>
                        </multiselect>
                      </div>
                    </div>
                    <div class="table__filter--right"></div>
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
                        {{ item.status == 'deleted' ? 'Заблокирована' : '' }}
                        {{ item.status == 'new' ? 'Новый' : '' }}
                      </a>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <router-link
                        v-if="$store.getters.userPermission(['read_quota'])"
                        :to="'/' + $i18n.locale + '/account/quotas-reverse/' + item.id + '/list'"
                        class="tb__table--btn tb__table--view"
                        v-tooltip.top-center="{ content: 'Список квот', class: ['tooltip__btn'] }"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 3H13.5C13.8978 3 14.2793 3.15803 14.5606 3.43934C14.842 3.72065 15 4.10218 15 4.5V15C15 15.3978 14.842 15.7793 14.5606 16.0606C14.2793 16.342 13.8978 16.5 13.5 16.5H4.5C4.10218 16.5 3.72065 16.342 3.43934 16.0606C3.15803 15.7793 3 15.3978 3 15V4.5C3 4.10218 3.15803 3.72065 3.43934 3.43934C3.72065 3.15803 4.10218 3 4.5 3H6"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.25 1.5H6.75C6.55109 1.5 6.36032 1.57902 6.21967 1.71967C6.07902 1.86032 6 2.05109 6 2.25V3.75C6 3.94891 6.07902 4.13968 6.21967 4.28033C6.36032 4.42098 6.55109 4.5 6.75 4.5H11.25C11.4489 4.5 11.6397 4.42098 11.7803 4.28033C11.9209 4.13968 12 3.94891 12 3.75V2.25C12 2.05109 11.9209 1.86032 11.7803 1.71967C11.6397 1.57902 11.4489 1.5 11.25 1.5Z"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 8.25H12"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 12H12"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 8.25H6.0075"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 12H6.0075"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </router-link>
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
import { api } from '@/boot/axios';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      applications: null,
      regionArray: [],
      errorMessage: {
        status: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      blockElemet: null,
      unlockElemet: null,

      filters: {
        search: '',
      },
      options: {
        itemsPerPage: 10,
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
        { text: 'Наименование квоты', value: 'name', width: '60%' },
        { text: this.$t('headers.created_at'), value: 'created_at' },
        { text: this.$t('headers.status'), value: 'status' },
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
  watch: {
    '$store.state.userObject': {
      immediate: true,
      handler: function () {
        this.apiGetQuotaList();
      },
    },
  },
  methods: {
    apiGetQuotaList() {
      if (this.regionArray) {
        api
          .get('quota-reverse/list', {
            params: {
              regions: this.regionArray,
              status: 'active',
            },
          })
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
      }
    },
  },
  computed: {
    filteredlist() {
      return this.applications.filter((d) => {
        if (
          d.name.toLowerCase().includes(this.filters.search.toLowerCase()) &&
          (this.filterCategories.status == 'all' || d.status == this.filterCategories.status) &&
          (this.Categories == 'all' || d.category_id == this.Categories)
        ) {
          return true;
        }
      });
    },
  },
  beforeMount() {},
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
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
