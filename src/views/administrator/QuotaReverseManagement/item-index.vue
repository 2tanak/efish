<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !applications || !application }"
  >
    <v-preloader v-if="!applications || !application" :message="errorMessage"></v-preloader>

    <div class="container" v-if="applications && application">
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
                      {{ $t('sidebar.quotas') }}
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
                    <div class="table__filter--right">
                      <router-link
                        v-if="$store.getters.userPermission(['change_quota-reverse'])"
                        :to="
                          '/' +
                          $i18n.locale +
                          '/account/quotas-reverse/' +
                          $route.params.id +
                          '/item/create'
                        "
                        class="btn--link btn--link--plus"
                      >
                        Заявка на перераспределение квот
                        <img src="../../../assets/img/icon-plus.svg" />
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
                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | formatDate }}
                    </template>
                    <template v-slot:item.action="{ item }">
                      <router-link
                        v-if="$store.getters.userPermission(['read_quota'])"
                        :to="
                          '/' +
                          $i18n.locale +
                          '/account/quotas-reverse/' +
                          $route.params.id +
                          '/item/' +
                          item.id
                        "
                        class="tb__table--btn tb__table--view"
                        v-tooltip.top-center="{ content: 'Просмотр', class: ['tooltip__btn'] }"
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
      application: null,
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
    apiGetLimitList() {
      api
        .get('quota-reverse/' + this.$route.params.id + '/list', {
          headers: {
            'Content-Type': 'multipart/form-data',
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
    },

    apiGetQuota() {
      api
        .get('quota/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.application = response.data;
          }
        })
        .catch((error) => {
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
            if (error?.response?.status == 403) {
              this.errorMessage.status = 403;
              this.errorMessage.text = error?.response?.data?.message;
            }
          }
        });
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
  beforeMount() {
    this.apiGetQuota();
    this.apiGetLimitList();
  },
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
