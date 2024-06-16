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
          <v-sidebar :active="['LimitManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('sidebar.limit') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <!--<div class="table__filter--search">
                        <label class="search__label">
                          <input type="text" value="" name="filter_search" v-model="filters.search" :placeholder="$t('placeholder.search')">
                          <button >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M20.9999 21L16.6499 16.65" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </button>
                        </label>
                      </div>-->
                      <div class="table__filter--order">
                        <multiselect
                          class="select__status"
                          v-model="filterData"
                          :options="dataList"
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
                      <div class="table__filter--order">
                        <multiselect
                          class="select__status"
                          v-model="filterStatus"
                          :options="orderStatus"
                          label="name"
                          :clearOnSelect="false"
                          :clear-on-select="false"
                          placeholder="Статус"
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
                        v-if="$store.getters.userPermission(['change_limit'])"
                        :to="'/' + $i18n.locale + '/account/limits/create'"
                        class="btn--link btn--link--plus"
                      >
                        Сформировать новый лимит <img src="../../../assets/img/icon-plus.svg" />
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
                      Лимит от {{ item.created_at | formatOnlyDate }}
                    </template>
                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | formatDate }}
                    </template>
                    <template v-slot:item.active_at="{ item }">
                      {{ item.active_at | formatDate }}
                    </template>
                    <template v-slot:item.status="{ item }">
                      <a
                        class="tb__table--status"
                        :class="{
                          'tb__status--success':
                            item.status == 'active' || item.status == 'approved_manager',
                          'tb__status--error': item.status == 'deleted',
                        }"
                      >
                        {{ item.status == 'active' ? 'Направлен в Ассоциацию' : '' }}
                        {{ item.status == 'deleted' ? 'Отклонен/на доработку' : '' }}
                        {{ item.status == 'new' ? 'Новый' : '' }}
                        {{ item.status == 'revoked' ? 'Отозван' : '' }}
                        {{ item.status == 'sent_manager' ? 'Отправлен на проверку' : '' }}
                        {{ item.status == 'check_manager' ? 'Отправлен руководителю' : '' }}
                        {{ item.status == 'approved_manager' ? 'Утвержден руководителем' : '' }}
                      </a>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <router-link
                        v-if="
                          $store.getters.userPermission(['read_limit']) &&
                          !$store.getters.userPermission(['change_limit'])
                        "
                        :to="'/' + $i18n.locale + '/account/limits/' + item.id"
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
                      </router-link>
                      <router-link
                        v-if="$store.getters.userPermission(['change_limit'])"
                        :to="'/' + $i18n.locale + '/account/limits/' + item.id"
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
                            d="M9 15H15.75"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.375 2.62505C12.6734 2.32668 13.078 2.15906 13.5 2.15906C13.7089 2.15906 13.9158 2.20021 14.1088 2.28016C14.3019 2.36012 14.4773 2.47731 14.625 2.62505C14.7727 2.77278 14.8899 2.94817 14.9699 3.1412C15.0498 3.33423 15.091 3.54112 15.091 3.75005C15.091 3.95898 15.0498 4.16587 14.9699 4.35889C14.8899 4.55192 14.7727 4.72731 14.625 4.87505L5.25 14.25L2.25 15L3 12L12.375 2.62505Z"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </router-link>
                      <!--
                      <a v-if="$store.getters.userPermission(['read_limit'])" :href="'/'+ $i18n.locale +'/account/limits/'+ item.id + '/list'" class="tb__table--btn tb__table--view" v-tooltip.top-center="{content:'Список лимитов', class: ['tooltip__btn']}">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 3H13.5C13.8978 3 14.2793 3.15803 14.5606 3.43934C14.842 3.72065 15 4.10218 15 4.5V15C15 15.3978 14.842 15.7793 14.5606 16.0606C14.2793 16.342 13.8978 16.5 13.5 16.5H4.5C4.10218 16.5 3.72065 16.342 3.43934 16.0606C3.15803 15.7793 3 15.3978 3 15V4.5C3 4.10218 3.15803 3.72065 3.43934 3.43934C3.72065 3.15803 4.10218 3 4.5 3H6" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M11.25 1.5H6.75C6.55109 1.5 6.36032 1.57902 6.21967 1.71967C6.07902 1.86032 6 2.05109 6 2.25V3.75C6 3.94891 6.07902 4.13968 6.21967 4.28033C6.36032 4.42098 6.55109 4.5 6.75 4.5H11.25C11.4489 4.5 11.6397 4.42098 11.7803 4.28033C11.9209 4.13968 12 3.94891 12 3.75V2.25C12 2.05109 11.9209 1.86032 11.7803 1.71967C11.6397 1.57902 11.4489 1.5 11.25 1.5Z" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M9 8.25H12" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M9 12H12" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6 8.25H6.0075" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6 12H6.0075" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>
                      -->
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
      filterData: {
        status: 'all',
        name: 'Все',
      },
      dataList: [
        {
          status: 'all',
          name: 'Все',
        },
        {
          status: '2023',
          name: '2023',
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

      filterStatus: {
        status: 'all',
        name: 'Все',
      },
      orderStatus: [
        {
          status: 'all',
          name: 'Все',
        },
        {
          status: 'active',
          name: 'Активный',
        },
        {
          status: 'new',
          name: 'Новый',
        },
        {
          status: 'withdrawn',
          name: 'Отозван',
        },
        {
          status: 'sent_manager',
          name: 'Отправлен на проверку',
        },
        {
          status: 'check_manager',
          name: 'Отправлен руководителю',
        },
        {
          status: 'approved_manager',
          name: 'Утвержден руководителем',
        },
        {
          status: 'deleted',
          name: 'Отклонен/на доработку',
        },
      ],

      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Наименование лимита', value: 'name', width: '40%' },
        { text: this.$t('headers.created_at'), value: 'created_at' },
        { text: 'Дата утверждения', value: 'active_at' },
        { text: this.$t('headers.status'), value: 'status' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '150px',
        },
      ],
    };
  },
  watch: {
    '$store.state.userObject': {
      immediate: true,
      handler: function () {
        this.apiGetLimitList();
      },
    },
  },
  methods: {
    apiGetLimitList() {
      api
        .get('limit/list', {
          params: {
            status: this.$store.getters.userPermission(['list_limit']) ? null : 'active',
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
  },
  computed: {
    filteredlist() {
      return this.applications.filter((d) => {
        if (
          //d.name.toLowerCase().includes(this.filters.search.toLowerCase()) &&
          (this.filterStatus.status == 'all' || d.status == this.filterStatus.status) &&
          (this.Categories == 'all' || d.category_id == this.Categories) &&
          (this.filterData.status == 'all' ||
            d.created_at.toLowerCase().includes(this.filterData.status))
        ) {
          return true;
        }
      });
    },
  },
  mounted() {
    this.apiGetLimitList();
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
