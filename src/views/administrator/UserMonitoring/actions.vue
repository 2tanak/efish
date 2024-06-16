<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !applications || !orderList || !applicationUsers }"
  >
    <v-preloader
      v-if="!applications || !orderList || !applicationUsers"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="applications && orderList && applicationUsers">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['UserManagementMain', 'UserMonitoring']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__page--back">
                    <a @click="$router.go(-1)">
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.125 5.25L7.875 10.5L13.125 15.75"
                          stroke="#52A5FC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('admin.monitoring.title') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="filter__width">
                      <div class="row">
                        <div class="col-lg-4">
                          <div class="analytic__filter--item">
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
                        <div class="col-lg-4">
                          <div class="analytic__filter--item">
                            <multiselect
                              class="select__status"
                              v-model="filters.action"
                              :options="orderList"
                              label="message"
                              :clearOnSelect="false"
                              :clear-on-select="false"
                              :placeholder="$t('placeholder.choose')"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.message
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="analytic__filter--item">
                            <multiselect
                              class="select__status"
                              v-model="filters.user_id"
                              :options="applicationUsers"
                              :preserve-search="true"
                              track-by="iin_bin"
                              label="iin_bin"
                              :custom-label="nameWithLang"
                              :placeholder="$t('placeholder.choose')"
                            >
                              <template slot="option" slot-scope="{ option }"
                                >{{ option.first_name }} {{ option.last_name }}
                                {{ option.middle_name }}({{ option.iin_bin }})</template
                              >
                              <template slot="singleLabel" slot-scope="{ option }"
                                >{{ option.first_name }} {{ option.last_name }}
                                {{ option.middle_name }}({{ option.iin_bin }})</template
                              >
                              <template slot="noOptions">{{
                                $t('components.user_not_found')
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="analytic__filter--item">
                            <div class="monitoring__line--date">
                              <div class="monitoring__date--item">
                                <div class="monitoring__date--text">
                                  {{ $t('filters.after') }}
                                </div>
                                <div class="monitoring__date--input">
                                  <input
                                    type="date"
                                    v-model="filters.date_from"
                                    class="date__input"
                                  />
                                </div>
                              </div>
                              <div class="monitoring__date--item">
                                <div class="monitoring__date--text">
                                  {{ $t('filters.before') }}
                                </div>
                                <div class="monitoring__date--input">
                                  <input
                                    type="date"
                                    v-model="filters.date_to"
                                    class="date__input"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <v-data-table
                    :headers="headers"
                    :items="applications.data"
                    :server-items-length="applications.length"
                    hide-default-footer
                    :footer-props="{
                      itemsPerPageOptions: [10],
                    }"
                  >
                    <template v-slot:item.action="{ item }">
                      {{ item.action }}
                    </template>
                    <template v-slot:item.message="{ item }">
                      {{ item.message }}
                    </template>
                    <template v-slot:item.user="{ item }">
                      {{ item.user.first_name }} {{ item.user.last_name }}
                      {{ item.user.middle_name }} ({{ item.user.iin_bin }})
                    </template>
                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | formatDate }}
                    </template>
                    <template v-slot:item.more="{ item }">
                      <a
                        v-if="$store.getters.userPermission(['read_actionlogs'])"
                        class="tb__table--btn tb__table--view"
                        @click="$modal.show('modal_monitor'), (monitorData = item)"
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

                  <div class="v-data-footer">
                    <div class="v-data-footer__pagination">
                      <button
                        type="button"
                        class="v-btn v-btn--icon v-btn--round v-btn--text v-size--default"
                        v-for="item in applications.links"
                        v-bind:class="{
                          'v-btn--disabled': !item.url,
                          'theme--light': item.active != true,
                          'theme--active': item.active,
                        }"
                        :disabled="!item.url"
                        @click="apiGetActionlogList(item.url)"
                      >
                        <span
                          class="v-btn__content"
                          v-if="
                            item.label != 'pagination.previous' && item.label != 'pagination.next'
                          "
                          v-html="item.label"
                        >
                        </span>
                        <span class="v-btn__content" v-else-if="item.label != 'pagination.next'">
                          <i
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-chevron-left theme--light"
                          ></i>
                        </span>
                        <span
                          class="v-btn__content"
                          v-else-if="item.label != 'pagination.previous'"
                        >
                          <i
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-chevron-right theme--light"
                          ></i>
                        </span>
                      </button>
                    </div>
                  </div>

                  <modal
                    class="modal__block modal__block--table"
                    name="modal_monitor"
                    :width="820"
                    :min-width="820"
                    height="auto"
                  >
                    <div class="modal__block--wrapper modal__table">
                      <div class="modal__block--close" @click="$modal.hide('modal_monitor')">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.5 7.5L7.5 22.5"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.5 7.5L22.5 22.5"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>

                      <div class="modal__table--title" v-if="monitorData">
                        {{ monitorData.message }}
                      </div>
                      <div class="modal__table--table" v-if="monitorData">
                        <table class="table">
                          <thead>
                            <tr v-if="!monitorData.data.after">
                              <th scope="col">{{ $t('headers.key') }}</th>
                              <th scope="col">{{ $t('headers.meaning') }}</th>
                            </tr>
                            <tr v-else>
                              <th scope="col">{{ $t('headers.key') }}</th>
                              <th scope="col">{{ $t('headers.previous_value') }}</th>
                              <th scope="col">{{ $t('headers.changed_value') }}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-if="!monitorData.data.after"
                              v-for="(item, key) in monitorData.data"
                            >
                              <td>{{ key }}</td>
                              <td>{{ item }}</td>
                            </tr>

                            <tr
                              v-if="monitorData.data.before"
                              v-for="(item, key) in monitorData.data.before"
                            >
                              <td>{{ key }}</td>
                              <td>{{ item }}</td>
                              <td>{{ monitorData.data.after[key] }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </modal>

                  <div class="monitoring__line monitoring__line--footer">
                    <div class="monitoring__line--title">
                      {{ $t('admin.monitoring.form') }}
                    </div>
                    <div class="monitoring__line--download">
                      <div class="monitoring__download--item">
                        <a class="monitoring__download--link" @click="monitoringFile('xlsx')"
                          >.xls</a
                        >
                      </div>
                      <div class="monitoring__download--item">
                        <a class="monitoring__download--link" @click="monitoringFile('pdf')"
                          >.pdf</a
                        >
                      </div>
                      <div class="monitoring__download--item">
                        <a class="monitoring__download--link" @click="monitoringFile('docx')"
                          >.docx</a
                        >
                      </div>
                    </div>
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
import { api } from '@/boot/axios';
import Multiselect from 'vue-multiselect';
import moment from 'moment';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      applications: null,
      applicationUsers: null,
      filterUser: null,

      errorMessage: {
        status: null,
        text: null,
      },

      monitorData: null,

      blockElemet: null,
      unlockElemet: null,

      menuClick: false,

      filters: {
        url: 'actionlog/list-item',
        //search: '',
        date_from: null,
        date_to: null,
        action: null,
        user_id: null,
      },
      options: {
        itemsPerPage: 10,
        per_page: 1,
      },

      Categories: 'all',
      filterCategories: null,
      orderList: [],

      headers: [
        { text: 'Id', value: 'id' },
        { text: this.$t('headers.event'), value: 'action' },
        { text: this.$t('headers.name'), value: 'message' },
        { text: this.$t('headers.user'), value: 'user' },
        { text: this.$t('headers.action_at'), value: 'created_at' },
        { text: this.$t('button.more'), value: 'more', align: 'center', sortable: false },
      ],
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  watch: {
    filters: {
      handler() {
        this.apiGetActionlogList();
      },
      deep: true,
    },
  },
  methods: {
    nameWithLang({ first_name, last_name, middle_name, iin_bin }) {
      return `${first_name} ${last_name} ${middle_name}(${iin_bin})`;
    },

    monitoringFile(typeFile) {
      let date_from = this.filters.date_from
        ? moment(this.filters.date_from).format('YYYY-MM-DD HH:mm:ss')
        : null; //Y-m-d H:i:s
      let date_to = this.filters.date_to
        ? moment(this.filters.date_to).format('YYYY-MM-DD HH:mm:ss')
        : null;
      // const FileDownload = require('js-file-download');

      let { url, ...param } = this.filters;
      if (param.user_id) {
        param.user_id = param.user_id.id;
      }
      if (param.action) {
        param.action = param.action.action;
      }
      api
        .get(this.filters.url, {
          responseType: 'arraybuffer',
          params: {
            action: param.action,
            user_id: param.user_id,
            from_date: date_from,
            to_date: date_to,
            type: typeFile,
          },
        })
        .then((response) => {
          let fileURL = window.URL.createObjectURL(new Blob([response.data]), {
            type: response.headers['content-type'],
          });
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          const extensions = {
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
            'application/fake': 'fake',
            'application/vnd.ms-excel': 'xlsx',
            'application/pdf': 'pdf',
          };
          const contentType = response.headers['content-type'];
          const extension = extensions[contentType];
          const filename = 'logs.' + extension;

          fileLink.setAttribute('download', filename);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(() => {});
    },

    apiGetActionlogList(urlItem) {
      let date_from = this.filters.date_from
        ? moment(this.filters.date_from).format('YYYY-MM-DD HH:mm:ss')
        : null; //Y-m-d H:i:s
      let date_to = this.filters.date_to
        ? moment(this.filters.date_to).format('YYYY-MM-DD HH:mm:ss')
        : null;
      let { url, ...param } = this.filters;
      if (param.user_id) {
        param.user_id = param.user_id.id;
      }
      param.date_from = date_from;
      param.date_to = date_to;
      if (param.action) {
        param.action = param.action.action;
      }
      if (urlItem) {
        url = urlItem;
      } else {
        url = this.filters.url;
      }
      api
        .get(url, {
          params: param,
        })
        .then((response) => {
          if (response.data) {
            this.applications = response.data;
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

    apiGetActionMessagelogList() {
      api
        .get('actionlog/messages')
        .then((response) => {
          if (response.data) {
            this.orderList = response.data;
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
    apiGetUserList() {
      api
        .get('user/list')
        .then((response) => {
          if (response.data) {
            this.applicationUsers = response.data.data;
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
  computed: {},
  beforeMount() {
    this.apiGetActionlogList();
    this.apiGetActionMessagelogList();
    this.apiGetUserList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  head: {
    title() {
      return {
        inner: this.$t('admin.monitoring.title'),
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
.theme--active::before {
  opacity: 0.08;
}
.v-btn:first-child,
.v-btn:last-child {
  display: none !important;
}
</style>
