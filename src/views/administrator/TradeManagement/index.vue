<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !applications || !$store.state.userObject }"
  >
    <v-preloader v-if="!$store.state.userObject" :message="errorMessage"></v-preloader>

    <div class="container" v-if="$store.state.userObject">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['TradeManagement', 'TradeManagementMain']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">Электронный промысловый журнал</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <!--
                      <div class="table__filter--search">
                        <label class="search__label">
                          <input type="text" value="" name="filter_search" v-model="filters.search" placeholder="Поиск по журналу">
                          <button >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M20.9999 21L16.6499 16.65" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </button>
                        </label>
                      </div>
                      -->
                      <!-- <div class="table__filter--order">
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
                      </div> -->
                    </div>
                    <div class="table__filter--right">
                      <router-link
                        v-if="$store.getters.userPermission(['change_trade'])"
                        :to="'/' + $i18n.locale + '/account/trade/create'"
                        class="btn--link btn--link--plus"
                      >
                        Запись в журнал <img src="../../../assets/img/icon-plus.svg" />
                      </router-link>
                    </div>
                  </div>

                  <form class="filters" @submit.prevent="search">
                    <div class="row">
                      <div class="filters__title">
                        <div class="col">Фильтр</div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-4">
                        <CatchType
                          :title="'Вид лова'"
                          :multiple="false"
                          :modelValue="catchType"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="catchType = $event"
                        ></CatchType>
                      </div>
                      <div class="col-2">
                        <Brigades
                          :title="'Бригада'"
                          :multiple="false"
                          :modelValue="brigade"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="brigade = $event"
                        ></Brigades>
                      </div>
                      <div class="col-2">
                        <div class="form__line form__line--col" style="gap: 8px">
                          <div class="form__line--title" style="margin-top: 0; font-size: 12px">
                            От
                          </div>
                          <div class="form__line--input">
                            <input
                              v-model="catch_at"
                              type="date"
                              class="input-linck"
                              ref="catch_at"
                              name="catch_at"
                              value=""
                              placeholder="Дата улова"
                              style="
                                border: 1px solid #d3e7fb !important;
                                border-radius: 5px;
                                cursor: pointer;
                              "
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-2">
                        <div class="form__line form__line--col" style="gap: 8px">
                          <div class="form__line--title" style="margin-top: 0; font-size: 12px">
                            До
                          </div>
                          <div class="form__line--input">
                            <input
                              v-model="catch_to"
                              type="date"
                              class="input-linck"
                              ref="catch_to"
                              name="catch_to"
                              value=""
                              placeholder="Дата улова"
                              style="
                                border: 1px solid #d3e7fb !important;
                                border-radius: 5px;
                                cursor: pointer;
                              "
                            />
                          </div>
                        </div>
                      </div>
                      <div class="filters__btn">
                        <button type="submit" class="btn--link btn--link--plus">Найти</button>
                      </div>
                      <div class="filters__btn">
                        <button class="btn--link btn--link--plus" @click.prevent.stop="clearFilter">
                          Очистить
                        </button>
                      </div>
                    </div>
                  </form>

                  <v-data-table
                    :headers="getHeaders"
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
                      <router-link :to="'/' + $i18n.locale + '/account/trade/' + item.id">
                        Улов от {{ item.catch_at | formatOnlyDate }}
                      </router-link>
                    </template>
                    <template v-slot:item.brigade_id="{ item }">
                      {{ getBrigadeName(item.brigade_id) }}
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
                        :to="'/' + $i18n.locale + '/account/trade/' + item.id"
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
                      <router-link
                        :to="'/' + $i18n.locale + '/account/trade/' + item.id + '/edit'"
                        class="tb__table--btn tb__table--show"
                        v-tooltip.top-center="{
                          content: $t('tooltip.look'),
                          class: ['tooltip__btn'],
                        }"
                      >
                        <svg
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18px"
                          height="18px"
                          viewBox="0 0 48 48"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
                            fill="#52A5FC"
                            stroke="none"
                          >
                            <path
                              d="M370 435 c-12 -14 -9 -21 18 -47 26 -27 33 -30 47 -18 10 8 15 25 13
                          44 -3 27 -7 31 -34 34 -19 2 -36 -3 -44 -13z"
                            />
                            <path
                              d="M44 389 c-17 -19 -19 -38 -19 -170 0 -201 -7 -194 195 -194 192 0
                          193 0 198 142 2 58 -1 104 -8 113 -19 28 -30 -11 -30 -113 0 -95 -1 -98 -26
                          -107 -33 -13 -235 -13 -269 0 l-26 10 3 152 3 153 90 2 c102 3 135 9 135 23 0
                          6 -46 10 -113 10 -103 0 -116 -2 -133 -21z"
                            />
                            <path
                              d="M258 322 c-60 -62 -92 -122 -74 -139 17 -17 86 21 146 81 l64 66 -29
                          30 c-16 16 -32 30 -35 30 -4 0 -36 -30 -72 -68z"
                            />
                          </g>
                        </svg>
                      </router-link>
                      <button @click="removeTrade(item.id)" class="item__remove">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          id="remove"
                          width="18px"
                          height="18px"
                        >
                          <path
                            d="M2.56 7.34c0 .83.67 1.5 1.5 1.5h.8v17.72c0 2.73 2.21 4.94 4.93 4.94h12.42c2.72 0 4.93-2.21 4.93-4.94V8.84h.8c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-5.25V4.29C22.69 2.2 20.99.5 18.9.5h-5.8c-2.09 0-3.79 1.7-3.79 3.79v1.55H4.06c-.83 0-1.5.67-1.5 1.5zm18.67 5.76v11.14c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V13.1c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5zm-8.92-8.81c0-.44.35-.79.79-.79h5.8c.44 0 .79.35.79.79v1.55h-7.38V4.29zm-1.54 8.81c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v11.14c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V13.1z"
                            fill="red"
                          ></path>
                        </svg>
                      </button>
                    </template>
                    <template v-slot:item.fish="{ header, item }">
                      {{ findFish(item.fishs, header.fish_id) }}
                    </template>
                    <v-alert slot="no-results" :value="true" color="error">
                      {{ $t('system_message.search') }}
                    </v-alert>
                  </v-data-table>

                  <div class="totals">
                    <div class="totals__title">Итого</div>
                    <div class="totals__value">{{ total }}</div>
                  </div>
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
import { mapGetters, mapActions } from 'vuex';

import { api, urlApi, apiSecond } from '@/boot/axios';

import CatchType from '@/components/components/Inputs/CatchType';
import Brigades from '@/components/components/Inputs/Brigades';

export default {
  components: {
    CatchType,
    Brigades,
  },
  data() {
    return {
      catchType: null,
      brigade: null,
      catch_at: null,
      catch_to: null,

      total: 0,

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
        { text: 'Id', value: 'id', width: '20px' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '100px',
        },
        { text: 'Улов', value: 'name', width: '10vw' },
        { text: 'Бригада', value: 'brigade_id' },
        { text: this.$t('headers.status'), value: 'status' },
      ],
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(['_getFishes', '_getBrigades']),
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
    getHeaders() {
      return [
        ...this.headers,
        ...this._getFishes.map((fish) => {
          return { text: fish.name, value: 'fish', fish_id: fish.id, width: '150px' };
        }),
      ];
    },
    userObject() {
      return this.$store.state.userObject;
    },
    getBrigadeName() {
      return (id) => {
        return this._getBrigades.find((b) => b.id == id)?.title || '-';
      };
    },
  },
  methods: {
    ...mapActions(['_fetchFishes', '_fetchBrigades']),
    clearFilter() {
      this.catchType = null;
      this.brigade = null;
      this.catch_at = null;
      this.catch_to = null;
      this.apiGetUserTradeList();
    },
    search() {
      this.apiGetUserTradeList();
      this.getTotalID();
    },
    findFish(fishs, id) {
      return fishs.find((fish) => fish.fish_id == id)?.value || '0';
    },
    isEditable(date) {
      return new Date().getTime() - new Date(date).getTime() < 60 * 60 * 1000;
    },
    pagination(options) {
      this.apiGetUserTradeList(options.page, options.itemsPerPage);
    },
    getQueries() {
      let queries = '';
      if (this.catchType !== null) {
        queries += 'type_catch=' + this.catchType;
      }
      if (this.brigade !== null) {
        queries += '&brigade_id=' + this.brigade;
      }
      if (this.catch_at !== null) {
        queries += '&start_at=' + this.catch_at;
      }
      if (this.catch_to !== null) {
        queries += '&end_at=' + this.catch_to;
      }
      return queries;
    },
    apiGetUserTradeList(page = 1, itemsPerPage = 10) {
      let queries =
        `user_id=${this.userObject.id}&page=${page}&per_page=${itemsPerPage}` +
        '&' +
        this.getQueries();

      api
        .get(`trade/list?${queries}`)
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
    async removeTrade(id) {
      await apiSecond.delete(`/v2/trade/destroy/${id}`);
      this.apiGetUserTradeList();
    },
    async getTotalID() {
      let queries = `?` + this.getQueries();
      const response = await apiSecond.get(`/v2/trade/getTotalTradeResult${queries}`);
      if (response) {
        this.total = response.data.total;
      }
    },
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  async mounted() {
    this.getTotalID();
    await this._fetchFishes();
    await this._fetchBrigades();
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

<style scoped>
header .header__row {
  display: flex;
}
.item__remove {
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
}
.filters {
  margin-bottom: 25px;
  border: 1px solid #d3e7fb;
  padding: 25px;
  border-radius: 25px;
}
.filters__title {
  margin-bottom: 20px;
  font-weight: 600;
}

.filters__btn {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.filters__btn button {
  font-size: 14px;
  padding: 17px;
}

.totals {
  margin-top: 25px;
  background: #d3e7fb99;
  padding: 15px 18px;
  border-radius: 15px;
}

.totals__title {
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 8px;
  line-height: 1;
}

.totals__value {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
}
</style>
import { mapActions } from 'vuex/types/helpers.js'; import { mapGetters } from
'vuex/dist/vuex.common.js';
