<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !_getBrigades.length || !$store.state.userObject }"
  >
    <v-preloader
      v-if="loading || !_getBrigades || !$store.state.userObject"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="!loading && _getBrigades && $store.state.userObject">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['Brigade']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack :title="$t('sidebar.brigade')" />
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
                        v-if="$store.getters.userPermission(['change_reporting-1rh'])"
                        :to="'/' + $i18n.locale + '/account/brigade/create'"
                        class="btn--link btn--link--plus"
                      >
                        {{ $t('button.add') }}
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
                    :server-items-length="filteredlist.length"
                  >
                    <template v-slot:item.title="{ item }">
                      <a class="tb__table--link">
                        <span v-html="item.title"></span>
                      </a>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <router-link :to="'/' + $i18n.locale + '/account/brigade/' + `${item.id}`">
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
                        :to="'/' + $i18n.locale + '/account/brigade/' + `${item.id}/edit`"
                        style="margin-left: 15px"
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
                      <button @click="removeBrigade(item.id)" class="item__remove">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          id="remove"
                          width="18px"
                          height="18px"
                          style="margin-left: 15px"
                        >
                          <path
                            d="M2.56 7.34c0 .83.67 1.5 1.5 1.5h.8v17.72c0 2.73 2.21 4.94 4.93 4.94h12.42c2.72 0 4.93-2.21 4.93-4.94V8.84h.8c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-5.25V4.29C22.69 2.2 20.99.5 18.9.5h-5.8c-2.09 0-3.79 1.7-3.79 3.79v1.55H4.06c-.83 0-1.5.67-1.5 1.5zm18.67 5.76v11.14c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V13.1c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5zm-8.92-8.81c0-.44.35-.79.79-.79h5.8c.44 0 .79.35.79.79v1.55h-7.38V4.29zm-1.54 8.81c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v11.14c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V13.1z"
                            fill="red"
                          ></path>
                        </svg>
                      </button>
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
      <ReportManageErrorModal :message="message" :errorMessage="errorMessage" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { apiSecond } from '@/boot/axios';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageErrorModal from '@/components/reporting-management/ReportManageErrorModal.vue';

export default {
  components: {
    HeaderBack,
    ReportManageErrorModal,
  },
  data() {
    return {
      loading: false,
      headers: [
        { text: 'Id', value: 'id', width: '50px' },
        { text: 'Наименование бригады', value: 'title', width: '40vw' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '50px',
        },
      ],
      filters: {
        search: '',
      },
      options: {
        itemsPerPage: 10,
        page: 1,
      },
      errorMessage: {
        status: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
    };
  },
  computed: {
    ...mapGetters(['_getBrigades']),
    filteredlist() {
      return this._getBrigades.filter((brigade) => {
        return brigade.title.toLowerCase().startsWith(this.filters.search.toLowerCase());
      });
    },
  },
  mounted() {
    this._fetchBrigades();
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
  methods: {
    ...mapActions(['_fetchBrigades']),
    removeBrigade(id) {
      this.loading = true;
      apiSecond
        .delete(`/v2/brigade/destroy/${id}`)
        .then(() => {
          this._fetchBrigades()
            .catch((error) => {
              this.checkError(error);
            })
            .finally(() => {
              this.loading = false;
            });
        })
        .catch((error) => {
          this.loading = false;
          this.checkError(error);
        })
        .finally(() => {
          document.querySelector('.preloader').classList.remove('active');
        });
    },
    checkError(error) {
      if (error?.response?.status > 500) {
        this.errorMessage.status = 500;
        this.errorMessage.text = this.$t('system_message.500');
      } else if (error?.response?.status == 401) {
        this.errorMessage.status = 401;
        this.errorMessage.text = error?.response?.data?.message;
        this.$router.push('/' + this.$i18n.locale + '/login');
      } else {
        this.errorMessage.status = 422;
        this.errorMessage.text = error?.response?.data?.message;
      }
      this.$modal.show('ReportManageErrorModal');
    },
  },
};
</script>

<style scoped>
.item__remove {
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
}
</style>
