<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !applications || !$store.state.userObject }"
  >
    <v-preloader v-if="!$store.state.userObject" :message="errorMessage"></v-preloader>

    <div class="container" v-if="$store.state.userObject">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ImplementedManagement', 'TradeManagementMain']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">Журналы реализованной рыбы</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <div class="table__filter--order">
                        <multiselect
                          class="select__status"
                          v-model="filterCategories"
                          :options="orderList"
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
                        v-if="$store.getters.userPermission(['change_trade'])"
                        :to="'/' + $i18n.locale + '/account/logs/implemented/create'"
                        class="btn--link btn--link--plus"
                      >
                        Запись в журнал <img src="../../../../assets/img/icon-plus.svg" />
                      </router-link>
                    </div>
                  </div>

                  <v-data-table
                    :headers="headers"
                    :items="filteredlist"
                    :loading="false"
                    :options.sync="options"
                    :server-items-length="totalItems"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 20, 30, 40, 50],
                    }"
                    @update:options="pagination"
                  >
                    <template v-slot:item.name="{ item }">
                      <router-link :to="'/' + $i18n.locale + '/account/logs/implemented/' + item.id">
                        Запись от {{ item.catch_at | formatOnlyDate }}
                      </router-link>
                    </template>
                    <template v-slot:item.type="{ item }">
                      <span v-if="item.type == 'wholesale'">Оптовая</span>
                      <span v-if="item.type == 'retail'">Розничная</span>
                      <span v-if="item.type == 'export'">Экспорт</span>
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
                        {{ item.status == 'active' ? 'Отправленный' : '' }}
                        {{ item.status == 'deleted' ? 'Заблокирован' : '' }}
                        {{ item.status == 'new' ? 'Новый' : '' }}
                      </a>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <router-link
                        :to="'/' + $i18n.locale + '/account/logs/implemented/' + item.id"
                        class="tb__table--btn tb__table--show"
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
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      urlApi: urlApi,

      applications: null,
      totalItems: null,
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
      orderList: [
        {
          status: 'all',
          name: 'Все',
        },
        {
          status: 'active',
          name: 'Отправленные',
        },
        {
          status: 'deleted',
          name: 'Заблокированные',
        },
      ],

      headers: [
        { text: 'Id', value: 'id', width: '80px' },
        { text: 'Улов', value: 'name', width: '25vw' },
        { text: 'Тип', value: 'type' },
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
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    pagination(options) {
      this.apiGetUserTradeList(options.page, options.itemsPerPage);
    },
    apiGetUserTradeList(page = 1, per_page = 10) {
      api
        .get(
          `implemented/list?user_id=${this.$store.state.userObject.id}&page=${page}&per_page=${per_page}`,
        )
        .then((response) => {
          if (response.data) {
            this.applications = response.data.data;
            this.totalItems = response.data.total;
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
      return (
        this.applications?.filter((d) => {
          if (
            (d.name ? d.name.toLowerCase().includes(this.filters.search.toLowerCase()) : true) &&
            (this.filterCategories.status == 'all' || d.status == this.filterCategories.status)
          ) {
            return true;
          }
        }) || []
      );
    },
  },

  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  head: {
    title() {
      return {
        inner: 'Электронный промысловый журнал',
      };
    },
    meta: [],
  },
};
</script>
<style>
header .header__row {
  display: flex;
}
</style>
