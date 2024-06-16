<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !applications || !$store.state.userObject }"
  >
    <v-preloader v-if="!$store.state.userObject" :message="errorMessage"></v-preloader>

    <div class="container" v-if="$store.state.userObject">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['DataRegisterSupervisor']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('sidebar.documents') }}
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
                    <div class="table__filter--right"></div>
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
                    <template v-slot:item.first_name="{ item }">
                      {{ item.first_name }} {{ item.last_name }} {{ item.middle_name }}({{
                        item.iin_bin
                      }})
                      <span v-if="item.name_company"
                        ><br /><small>{{ item.name_company }}</small></span
                      >
                    </template>

                    <template v-slot:item.action="{ item }">
                      <router-link
                        v-if="$store.getters.userPermission(['read_document_all'])"
                        :to="'/' + $i18n.locale + '/account/register-list/' + item.id + '/list'"
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
                            d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 12L12 9L9 6"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 9H12"
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
        messages: null,
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
        { text: 'Id', value: 'id', width: '50px' },
        { text: this.$t('headers.fio'), value: 'first_name', width: '30vw' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '200px',
        },
      ],

      fileDocuments: {
        file: null,
        fileName: '',
        fileClass: '',
      },
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    handleFileUpload() {
      this.message.status = null;
      this.message.text = null;
      this.message.texts = null;
      this.errorMessage = {
        status: null,
        text: null,
        messages: null,
      };
      this.fileDocuments.file = this.$refs.fileDocuments.files[0];
      this.fileDocuments.fileName = this.$refs.fileDocuments.files[0].name;
      this.fileDocuments.fileClass = 'add_tourist--success';
    },
    pagination(options) {
      this.apiGetUserDocumentList(options.page, options.itemsPerPage);
    },
    apiGetUserDocumentList(page = 1, per_page = 10) {
      let params = [];
      this.$store.state.userObject.regions.find((element) => {
        params.push(element.region_id);
      });
      api
        .get('user/region/list', {
          params: {
            region_id: params,
            page,
            per_page,
          },
        })
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
            (this.filterCategories.status == 'all' || d.is_deleted == this.filterCategories.status)
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
        inner: this.$t('sidebar.users_parent'),
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
