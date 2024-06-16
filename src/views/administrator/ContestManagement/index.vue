<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !applications }">
    <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>

    <div class="container" v-if="applications">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ContestManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('sidebar.contest') }}
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
                          :placeholder="$t('placeholder.choose')"
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
                        :to="'/' + $i18n.locale + '/account/contest/create'"
                        v-if="$store.getters.userPermission(['change_contest'])"
                        class="btn--link btn--link--plus"
                      >
                        Добавить новую запись результатов
                        <img src="../../../assets/img/icon-plus.svg" />
                      </router-link>
                    </div>
                  </div>

                  <v-data-table
                    class="table__block--wrap"
                    :headers="headers"
                    :items="filteredlist"
                    :loading="false"
                    :options.sync="options"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 20, 30, 40, 50],
                    }"
                  >
                    <template v-slot:item.document="{ item }">
                      <a
                        :href="urlApi + item.document"
                        download
                        class="tb__table--btn tb__table--view"
                        v-tooltip.top-center="{
                          content: $t('tooltip.look'),
                          class: ['tooltip__btn'],
                        }"
                      >
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.30371 7.29504V28.2422C4.30371 29.209 5.09473 30 6.06152 30H24.0456C25.0124 30 25.8034 29.209 25.8034 28.2422V1.75781C25.8034 0.791016 25.0124 0 24.0456 0H11.5988"
                            fill="#E74C3C"
                          />
                          <path
                            d="M4.30371 7.29504H9.84097C10.8078 7.29504 11.5988 6.50402 11.5988 5.53723V0"
                            fill="#C0392B"
                          />
                          <path
                            d="M2.3974 19.6533H4.30378V17.1387L2.22528 19.7278H2.22563C2.26079 19.6818 2.32029 19.6533 2.3974 19.6533Z"
                            fill="#262626"
                          />
                          <path
                            d="M27.7099 19.6533H25.8035V17.1387L27.882 19.7278H27.8817C27.8465 19.6818 27.787 19.6533 27.7099 19.6533Z"
                            fill="#262626"
                          />
                          <path
                            d="M25.9065 25.2384C25.8498 25.3893 25.6716 25.5127 25.5105 25.5127H4.59673C4.4356 25.5127 4.25742 25.3893 4.20081 25.2384L2.20737 19.9276C2.15074 19.7767 2.23625 19.6533 2.39739 19.6533H27.7099C27.871 19.6533 27.9565 19.7767 27.8999 19.9276L25.9065 25.2384Z"
                            fill="#C0392B"
                          />
                          <path
                            d="M9.82178 23.9743C9.82178 23.8274 9.86525 23.7141 9.95227 23.6343C10.0393 23.5545 10.1658 23.5146 10.3318 23.5146C10.4899 23.5146 10.6112 23.5545 10.6958 23.6343C10.7804 23.7142 10.8227 23.8275 10.8227 23.9743C10.8227 24.118 10.7792 24.2301 10.6922 24.3107C10.6051 24.3913 10.4851 24.4316 10.3318 24.4316C10.1737 24.4316 10.0492 24.3917 9.95827 24.3119C9.86728 24.2321 9.82178 24.1196 9.82178 23.9743Z"
                            fill="white"
                          />
                          <path
                            d="M13.9523 21.9844C13.9523 22.3756 13.837 22.6777 13.6063 22.8908C13.3756 23.1039 13.048 23.2105 12.6233 23.2105H12.3576V24.3718H11.4117V20.871H12.6233C13.0655 20.871 13.3976 20.9676 13.6195 21.1607C13.8414 21.3539 13.9523 21.6285 13.9523 21.9844ZM12.3576 22.4394H12.53C12.6721 22.4394 12.785 22.3995 12.8688 22.3197C12.9526 22.2399 12.9945 22.1297 12.9945 21.9892C12.9945 21.753 12.8636 21.6348 12.6018 21.6348H12.3576V22.4394Z"
                            fill="white"
                          />
                          <path
                            d="M17.4819 22.5471C17.4819 23.1314 17.3211 23.5816 16.9994 23.8977C16.6777 24.2137 16.2255 24.3718 15.6429 24.3718H14.5103V20.871H15.7219C16.2838 20.871 16.7176 21.0146 17.0233 21.302C17.329 21.5893 17.4819 22.0044 17.4819 22.5471ZM16.5001 22.5807C16.5001 22.2598 16.4367 22.022 16.3098 21.8671C16.1828 21.7123 15.9901 21.6348 15.7315 21.6348H15.4561V23.596H15.6668C15.9542 23.596 16.1649 23.5126 16.299 23.3457C16.4331 23.179 16.5001 22.9239 16.5001 22.5807Z"
                            fill="white"
                          />
                          <path
                            d="M19.0407 24.3718H18.1093V20.871H20.1782V21.63H19.0407V22.2981H20.0896V23.0572H19.0407V24.3718Z"
                            fill="white"
                          />
                          <path
                            d="M21.3862 10.8346C21.3862 11.0763 21.1226 11.2741 20.8003 11.2741H9.22418C8.90192 11.2741 8.63824 11.0763 8.63824 10.8346C8.63824 10.5929 8.90192 10.3951 9.22418 10.3951H20.8003C21.1226 10.3951 21.3862 10.5929 21.3862 10.8346Z"
                            fill="white"
                          />
                          <path
                            d="M21.3617 13.4713C21.3617 13.713 21.0981 13.9108 20.7758 13.9108H9.19971C8.87744 13.9108 8.61377 13.713 8.61377 13.4713C8.61377 13.2296 8.87744 13.0319 9.19971 13.0319H20.7758C21.0981 13.0319 21.3617 13.2296 21.3617 13.4713Z"
                            fill="white"
                          />
                          <path
                            d="M21.3862 16.1138C21.3862 16.3555 21.1226 16.5532 20.8003 16.5532H9.22418C8.90192 16.5532 8.63824 16.3555 8.63824 16.1138C8.63824 15.8721 8.90192 15.6743 9.22418 15.6743H20.8003C21.1226 15.6743 21.3862 15.8721 21.3862 16.1138Z"
                            fill="white"
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
    axios,
  },
  data() {
    return {
      urlApi: urlApi,

      applications: null,
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

      filterCategories: this.$t('orders.userList'),
      orderList: this.$t('orders.user'),

      headers: [
        { text: 'Id', value: 'id', sortable: false },
        { text: 'Дата проведения конкурса', value: 'date_at', sortable: false },
        { text: 'Условия конкурса', value: 'condition_desc', sortable: false },
        { text: 'Сведения об объекте', value: 'object_desc', sortable: false },
        { text: 'Сведения о победителе конкурса', value: 'winner_desc', sortable: false },
        {
          text: 'Обязательства сторон по подписанию договора',
          value: 'commitments',
          sortable: false,
        },
        {
          text: 'результаты PDF',
          value: 'document',
          align: 'center',
          sortable: false,
          width: '130px',
        },
      ],
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    apiGetUserDocumentList() {
      api
        .get('contest/list')
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
        if (
          d.condition_desc
            ? d.condition_desc.toLowerCase().includes(this.filters.search.toLowerCase())
            : true
        ) {
          return true;
        }
      });
    },
  },
  beforeMount() {
    this.apiGetUserDocumentList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  head: {
    title() {
      return {
        inner: this.$t('sidebar.users_parent'),
      };
    },
    meta: [],
  },
};
</script>
