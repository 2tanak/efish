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
          <v-sidebar :active="['QuotaManagement']"></v-sidebar>
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
                        v-if="$store.getters.userPermission(['change_quota'])"
                        :to="'/' + $i18n.locale + '/account/quotas/create'"
                        class="btn--link btn--link--plus"
                      >
                        Заявка на распределения квот <img src="../../../assets/img/icon-plus.svg" />
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
                    <template v-slot:item.limit="{ item }">
                      Лимит от {{ item.limit.created_at | formatOnlyDate }}
                    </template>
                    <template v-slot:item.region="{ item }">
                      {{ item.region.value }}
                    </template>
                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | formatDate }}
                    </template>
                    <template v-slot:item.excel="{ item }">
                      <a class="table__link--exel" @click="limitFile(item.id, 'xlsx')">
                        <svg
                          width="64"
                          height="24"
                          viewBox="0 0 64 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.3419 4.5683H13.582V7.27092H15.6038C15.9757 7.27092 16.2774 7.57364 16.2774 7.94653C16.2775 8.31952 15.9757 8.62223 15.6038 8.62223H13.582V9.97369H15.6038C15.9757 9.97369 16.2774 10.2764 16.2774 10.6491C16.2775 11.0222 15.9757 11.3249 15.6038 11.3249H13.582V12.6762H15.6038C15.9757 12.6762 16.2774 12.9788 16.2774 13.3519C16.2775 13.7246 15.9757 14.0273 15.6038 14.0273H13.582V15.3788H15.6038C15.9757 15.3788 16.2774 15.6815 16.2774 16.0546C16.2774 16.4275 15.9757 16.7302 15.6038 16.7302H13.582V19.4326H22.3419C22.714 19.4326 23.0158 19.1301 23.0158 18.7569V5.24391C23.0158 4.87092 22.714 4.5683 22.3419 4.5683ZM19.6467 16.7301H18.299C17.9271 16.7301 17.6251 16.4275 17.6251 16.0545C17.6251 15.6815 17.9271 15.3787 18.299 15.3787H19.6467C20.0185 15.3787 20.3204 15.6815 20.3204 16.0545C20.3204 16.4275 20.0185 16.7301 19.6467 16.7301ZM19.6467 14.0272H18.299C17.9271 14.0272 17.6251 13.7245 17.6251 13.3518C17.6251 12.9788 17.9271 12.6761 18.299 12.6761H19.6467C20.0185 12.6761 20.3204 12.9788 20.3204 13.3518C20.3204 13.7245 20.0185 14.0272 19.6467 14.0272ZM19.6467 11.3248H18.299C17.9271 11.3248 17.6251 11.0221 17.6251 10.649C17.6251 10.2764 17.9271 9.97364 18.299 9.97364H19.6467C20.0185 9.97364 20.3204 10.2764 20.3204 10.649C20.3204 11.0221 20.0185 11.3248 19.6467 11.3248ZM19.6467 8.62214H18.299C17.9271 8.62214 17.6251 8.31942 17.6251 7.94644C17.6251 7.57355 17.9271 7.27083 18.299 7.27083H19.6467C20.0185 7.27083 20.3204 7.57355 20.3204 7.94644C20.3204 8.31947 20.0185 8.62214 19.6467 8.62214Z"
                            fill="#207245"
                          />
                          <path
                            d="M12.8694 2.02102C12.7155 1.89267 12.5093 1.83717 12.3154 1.87791L1.53422 3.90469C1.21481 3.96445 0.984375 4.24271 0.984375 4.5683V19.4327C0.984375 19.757 1.21481 20.0365 1.53422 20.0963L12.3153 22.1231C12.3557 22.1311 12.3975 22.1353 12.4394 22.1353C12.5956 22.1353 12.7479 22.0813 12.8693 21.9797C13.0244 21.8516 13.113 21.6597 13.113 21.4595V19.4327V16.7302V15.3788V14.0273V12.6761V11.3248V9.9736V8.62215V7.27088V4.5683V2.54152C13.113 2.34005 13.0244 2.14945 12.8694 2.02102ZM10.1877 15.2111C10.0596 15.3234 9.90173 15.3789 9.74395 15.3789C9.55682 15.3789 9.37082 15.3003 9.23728 15.1466L7.27795 12.9017L5.55956 15.1179C5.42629 15.2897 5.22811 15.3787 5.02734 15.3787C4.88329 15.3787 4.73625 15.3328 4.61217 15.2369C4.31986 15.0073 4.26586 14.5829 4.49503 14.2881L6.37368 11.8667L4.52062 9.74246C4.27537 9.46262 4.30373 9.03568 4.58395 8.78996C4.86159 8.54386 5.28754 8.56951 5.53406 8.85357L7.21593 10.7802L9.21201 8.2073C9.44212 7.91419 9.86535 7.8601 10.1578 8.08993C10.4502 8.31943 10.5044 8.74383 10.2753 9.03858L8.12006 11.8169L10.251 14.2585C10.4961 14.5384 10.4679 14.9654 10.1877 15.2111Z"
                            fill="#207245"
                          />
                          <path
                            d="M39.308 16.232V17H33.368V8.6H39.128V9.368H34.256V12.356H38.6V13.112H34.256V16.232H39.308ZM45.0596 17L43.0556 14.36L41.0396 17H40.0796L42.5756 13.76L40.1996 10.688H41.1596L43.0556 13.16L44.9516 10.688H45.8876L43.5116 13.76L46.0316 17H45.0596ZM49.8431 17.06C49.2191 17.06 48.6591 16.924 48.1631 16.652C47.6751 16.38 47.2911 16 47.0111 15.512C46.7311 15.016 46.5911 14.46 46.5911 13.844C46.5911 13.228 46.7311 12.676 47.0111 12.188C47.2911 11.7 47.6751 11.32 48.1631 11.048C48.6591 10.776 49.2191 10.64 49.8431 10.64C50.3871 10.64 50.8711 10.748 51.2951 10.964C51.7271 11.172 52.0671 11.48 52.3151 11.888L51.6791 12.32C51.4711 12.008 51.2071 11.776 50.8871 11.624C50.5671 11.464 50.2191 11.384 49.8431 11.384C49.3871 11.384 48.9751 11.488 48.6071 11.696C48.2471 11.896 47.9631 12.184 47.7551 12.56C47.5551 12.936 47.4551 13.364 47.4551 13.844C47.4551 14.332 47.5551 14.764 47.7551 15.14C47.9631 15.508 48.2471 15.796 48.6071 16.004C48.9751 16.204 49.3871 16.304 49.8431 16.304C50.2191 16.304 50.5671 16.228 50.8871 16.076C51.2071 15.924 51.4711 15.692 51.6791 15.38L52.3151 15.812C52.0671 16.22 51.7271 16.532 51.2951 16.748C50.8631 16.956 50.3791 17.06 49.8431 17.06ZM59.3793 14.108H54.0993C54.1473 14.764 54.3993 15.296 54.8553 15.704C55.3113 16.104 55.8873 16.304 56.5833 16.304C56.9753 16.304 57.3353 16.236 57.6633 16.1C57.9913 15.956 58.2753 15.748 58.5153 15.476L58.9953 16.028C58.7153 16.364 58.3633 16.62 57.9393 16.796C57.5233 16.972 57.0633 17.06 56.5593 17.06C55.9113 17.06 55.3353 16.924 54.8313 16.652C54.3353 16.372 53.9473 15.988 53.6673 15.5C53.3873 15.012 53.2473 14.46 53.2473 13.844C53.2473 13.228 53.3793 12.676 53.6433 12.188C53.9153 11.7 54.2833 11.32 54.7473 11.048C55.2193 10.776 55.7473 10.64 56.3313 10.64C56.9153 10.64 57.4393 10.776 57.9033 11.048C58.3673 11.32 58.7313 11.7 58.9953 12.188C59.2593 12.668 59.3913 13.22 59.3913 13.844L59.3793 14.108ZM56.3313 11.372C55.7233 11.372 55.2113 11.568 54.7953 11.96C54.3873 12.344 54.1553 12.848 54.0993 13.472H58.5753C58.5193 12.848 58.2833 12.344 57.8673 11.96C57.4593 11.568 56.9473 11.372 56.3313 11.372ZM61.1255 8.096H61.9775V17H61.1255V8.096Z"
                            fill="black"
                          />
                        </svg>
                      </a>
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
                        :to="'/' + $i18n.locale + '/account/quotas/' + item.id + '/list'"
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
                      <router-link
                        v-if="$store.getters.userPermission(['change_quota'])"
                        :to="'/' + $i18n.locale + '/account/quotas/' + item.id"
                        class="tb__table--btn tb__table--view"
                        v-tooltip.top-center="{
                          content: $t('tooltip.edit'),
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
        { text: 'Id', value: 'id', width: '50px' },
        { text: 'Наименование квоты', value: 'name', width: '20%' },
        { text: 'Лимит', value: 'limit' },
        { text: 'Регион', value: 'region' },
        { text: this.$t('headers.created_at'), value: 'created_at' },
        { text: 'Выгрузка', value: 'excel' },
        { text: this.$t('headers.status'), value: 'status' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '100px',
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
    limitFile(id, typeFile) {
      api
        .get('/quota/file', {
          responseType: 'arraybuffer',
          params: {
            item_id: id,
            type: typeFile,
          },
        })
        .then(function (response) {
          let blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'download.xlsx';
          link.click();
        })
        .catch(() => {});
    },
    apiGetQuotaList() {
      if (this.regionArray) {
        api
          .get('quota/list', {
            params: {
              regions: this.regionArray,
              status: this.$store.getters.userPermission(['list_quota']) ? null : 'active',
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
