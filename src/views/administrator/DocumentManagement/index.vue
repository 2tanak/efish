<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !applications || !$store.state.userObject }"
  >
    <v-preloader v-if="!$store.state.userObject" :message="errorMessage"></v-preloader>

    <div class="container" v-if="$store.state.userObject">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['DocumentManagement']"></v-sidebar>
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
                    <div class="table__filter--right">
                      <a
                        v-if="$store.getters.userPermission(['change_document'])"
                        @click="$modal.show('modal_addDocument')"
                        class="btn--link btn--link--plus"
                      >
                        Добавить новый договор <img src="../../../assets/img/icon-plus.svg" />
                      </a>
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
                      {{ item.name }}
                    </template>
                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | formatDate }}
                    </template>
                    <template v-slot:item.status="{ item }">
                      <a
                        class="tb__table--status"
                        :class="{
                          'tb__status--success': item.is_deleted == 0,
                          'tb__status--error': item.is_deleted == 1,
                        }"
                      >
                        {{ item.is_deleted == 0 ? $t('status.active') : $t('status.blocked') }}
                      </a>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <router-link
                        v-if="$store.getters.userPermission(['read_document'])"
                        :to="'/' + $i18n.locale + '/account/documents/' + item.id"
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
                      <a
                        :href="item.document"
                        class="tb__table--btn tb__table--delete"
                        target="_blank"
                        v-tooltip.top-center="{ content: 'Скачать', class: ['tooltip__btn'] }"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.25 7.5L9 11.25L12.75 7.5"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 11.25V2.25"
                            stroke="#52A5FC"
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

                  <modal
                    class="modal__block modal__block--table"
                    name="modal_addDocument"
                    :adaptive="true"
                    :width="1100"
                    :min-width="1100"
                    height="auto"
                  >
                    <div class="modal__block--wrapper modal__table">
                      <div class="modal__table--title">Добавление нового договора</div>

                      <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">Наименование договора</div>
                          </div>
                          <div class="form__line--right">
                            <div class="col-xl-7">
                              <div
                                class="form__line--input"
                                :class="[
                                  errorMessage.messages && errorMessage.messages.name
                                    ? 'input--error'
                                    : '',
                                ]"
                              >
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  name="name"
                                  value=""
                                  placeholder="Наименование"
                                />
                              </div>
                              <div
                                class="input-required"
                                v-if="errorMessage.messages && errorMessage.messages.name"
                              >
                                <p v-for="massage in errorMessage.messages.name">{{ massage }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">Дата добавления</div>
                          </div>
                          <div class="form__line--right">
                            <div class="col-xl-5">
                              <div
                                class="form__line--input"
                                :class="[
                                  errorMessage.messages && errorMessage.messages.document_at
                                    ? 'input--error'
                                    : '',
                                ]"
                              >
                                <input
                                  type="date"
                                  class="input-linck"
                                  required=""
                                  name="document_at"
                                  value=""
                                  placeholder="Дата добавления"
                                />
                              </div>
                              <div
                                class="input-required"
                                v-if="errorMessage.messages && errorMessage.messages.document_at"
                              >
                                <p v-for="massage in errorMessage.messages.document_at">
                                  {{ massage }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form__line">
                          <div class="form__line--left">
                            <div class="form__line--title">
                              Добавление документа<br />
                              (PDF, WORD)
                            </div>
                          </div>
                          <div class="form__line--right">
                            <div class="col-xl-7">
                              <div
                                class="form__line--input"
                                :class="[
                                  errorMessage.messages && errorMessage.messages.document
                                    ? 'input--error'
                                    : '',
                                ]"
                              >
                                <label class="form__line--file" :class="fileDocuments.fileClass">
                                  <input
                                    type="file"
                                    ref="fileDocuments"
                                    name="fileDocuments"
                                    accept=".jpeg,.png,.jpg,.pdf,.doc,.docx"
                                    v-on:change="handleFileUpload()"
                                  />
                                  <div class="form__file" v-if="fileDocuments.fileName">
                                    <div class="form__file--text">
                                      {{ fileDocuments.fileName }}
                                    </div>
                                  </div>
                                  <div class="form__file" v-else>
                                    <div class="form__file--text">Загрузить файл</div>
                                    <div class="form__file--icon">
                                      <svg
                                        width="17"
                                        height="17"
                                        viewBox="0 0 17 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M14.1667 11.475C14.7223 11.0905 15.1414 10.5393 15.3634 9.90114C15.5854 9.26293 15.5989 8.57067 15.4018 7.92432C15.2047 7.27797 14.8074 6.71097 14.2671 6.30517C13.7268 5.89937 13.0715 5.67578 12.3958 5.66667H11.1208C10.9067 4.94437 10.5308 4.28035 10.0217 3.72505C9.51255 3.16975 8.88358 2.73777 8.18253 2.46191C7.48148 2.18605 6.72679 2.07357 5.97576 2.13301C5.22474 2.19245 4.49713 2.42225 3.84821 2.80495C3.19928 3.18765 2.64609 3.71319 2.23065 4.34167C1.81521 4.97014 1.54844 5.68502 1.45061 6.43202C1.35278 7.17901 1.42646 7.93847 1.66605 8.65273C1.90563 9.36699 2.30483 10.0173 2.83332 10.5542"
                                          stroke="white"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M8.5 8.5V14.875"
                                          stroke="white"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M5.66669 12.0417L8.50002 14.875L11.3334 12.0417"
                                          stroke="white"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </label>
                              </div>
                              <div
                                class="input-required"
                                v-if="errorMessage.messages && errorMessage.messages.document"
                              >
                                <p v-for="massage in errorMessage.messages.document">
                                  {{ massage }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="form__line">
                          <div
                            class="form__block--line form__messages"
                            v-if="message.status"
                            :class="{
                              'form__messages--error': message.status != 200,
                              'form__messages--success': message.status == 200,
                            }"
                          >
                            <label class="form__block--input">
                              <span class="form__block--title">
                                {{ message.text }}
                              </span>
                            </label>
                          </div>
                        </div>

                        <div class="input__row">
                          <button class="input-btn form__line--btn">
                            {{ $t('button.save') }}
                          </button>
                          <a
                            class="input-btn form__line--btn-black form__line--btn"
                            @click="$modal.hide('modal_addDocument')"
                          >
                            {{ $t('button.cancel') }}
                          </a>
                        </div>
                      </form>
                    </div>
                  </modal>
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
        { text: 'Id', value: 'id' },
        { text: this.$t('headers.fio'), value: 'name', width: '30vw' },
        { text: this.$t('headers.register_at'), value: 'created_at' },
        { text: this.$t('headers.status'), value: 'status' },
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

    onSubmit(evt) {
      this.message.status = null;
      this.message.text = null;
      this.message.texts = null;
      this.errorMessage = {
        status: null,
        text: null,
        messages: null,
      };

      const formData = new FormData(evt.target);
      formData.append('user_id', this.$store.state.userObject.id);
      formData.append('document', this.fileDocuments.file);

      api
        .post('user/document/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.errorMessage.status = 200;
            this.errorMessage.text = response.data.message;
            //this.$router.push({path: '/'+ this.$i18n.locale +'/account/documents'});
            this.$modal.hide('modal_addDocument');
            this.apiGetUserDocumentList();
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
          }
          if (error?.response?.status == 422) {
            this.errorMessage.status = 422;
            this.errorMessage.text = error.response.data.error_message;
          }
          this.errorMessage.messages = error.response.data.error_messages;
        });
    },
    pagination(options) {
      this.apiGetUserDocumentList(options.page, options.itemsPerPage);
    },
    apiGetUserDocumentList(page = 1, per_page = 10) {
      api
        .get(
          `user/document/list?user_id=${this.$store.state.userObject.id}&page=${page}&per_page=${per_page}`,
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
