<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !applications }">
    <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>

    <div class="container" v-if="applications">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReferenceManagement']"></v-sidebar>
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
                      {{ $t('sidebar.references') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left"></div>
                    <div class="table__filter--right">
                      <router-link
                        v-if="$store.getters.userPermission(['change_catalog'])"
                        :to="
                          '/' +
                          $i18n.locale +
                          '/account/references/' +
                          this.$route.params.id +
                          '/create'
                        "
                        class="btn--link btn--link--plus"
                      >
                        {{ $t('button.add') }} <img src="../../../assets/img/icon-plus.svg" />
                      </router-link>
                    </div>
                  </div>

                  <v-data-table
                    :headers="headers"
                    :items="listBody"
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
                        v-if="$store.getters.userPermission(['change_catalog'])"
                        :to="
                          '/' +
                          $i18n.locale +
                          '/account/references/' +
                          $route.params.id +
                          '/entry/' +
                          item.id
                        "
                        class="tb__table--btn tb__table--edit"
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
                      <a
                        v-if="$store.getters.userPermission(['change_catalog'])"
                        class="tb__table--btn tb__table--delete"
                        @click="$modal.show('modal_delete'), (blockElemet = item)"
                        v-tooltip.top-center="{
                          content: $t('button.delete'),
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
                            stroke="#F19797"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.25 6.75L6.75 11.25"
                            stroke="#F19797"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.75 6.75L11.25 11.25"
                            stroke="#F19797"
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
                    class="modal__block modal__block--middle modal__block--delete"
                    name="modal_delete"
                    :width="550"
                    :min-width="550"
                    height="auto"
                  >
                    <div class="modal__block--wrapper">
                      <div class="modal__block--close" @click="$modal.hide('modal_delete')">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.5 7.5L7.5 22.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.5 7.5L22.5 22.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div class="modal__wrapper">
                        <div class="modal__header">
                          <div class="modal__title">
                            Вы уверены что хотите удалить данные<br />
                            <strong>
                              {{ blockElemet ? blockElemet.description : '' }}
                            </strong>
                          </div>
                        </div>

                        <div class="modal__content">
                          <div class="modal__form">
                            <div class="block__row">
                              <div class="block__row--left">
                                <a
                                  class="block__item"
                                  v-if="blockElemet"
                                  @click="blockElement(blockElemet.id)"
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10 18.3333C14.6024 18.3333 18.3333 14.6023 18.3333 9.99996C18.3333 5.39759 14.6024 1.66663 10 1.66663C5.39763 1.66663 1.66667 5.39759 1.66667 9.99996C1.66667 14.6023 5.39763 18.3333 10 18.3333Z"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M12.5 7.5L7.5 12.5"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M7.5 7.5L12.5 12.5"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  {{ $t('button.delete') }}
                                </a>
                              </div>
                              <div class="block__row--right">
                                <a class="block__item block__item--blue">
                                  {{ $t('button.cancel') }}
                                </a>
                              </div>
                            </div>
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
                        </div>
                      </div>
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
// import { api } from '../../boot/axios'
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

      filters: {
        search: '',
      },
      options: {
        itemsPerPage: 10,
        page: 1,
      },

      blockElemet: null,

      listHeader: [],
      listBody: [],
      headers: [
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
    blockElement(id) {
      api
        .post('catalog/' + this.$route.params.id + '/entry/' + id + '/delete', {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;

            this.blockElemet = null;
            this.$modal.hide('modal_delete');

            this.$router.go();
          }
        });
    },

    apiGetCatalogList() {
      api
        .get('catalog/' + this.$route.params.id + '/entry/list')
        .then((response) => {
          if (response.data) {
            this.applications = response.data.data;
            let applications = response.data.data;
            if (applications[0]) {
              this.listHeader.push({ text: 'Id', value: 'id' });
              applications[0].values.find((element, index) => {
                let key = 'field_' + element.column.id;
                if (index < 3) {
                  this.listHeader.push({ text: element.column.name, value: key });
                }
              });
              this.headers = this.listHeader.concat(this.headers);
              applications.find((element, index) => {
                let elementBody = new Array();
                element.values.find((item, index) => {
                  elementBody['field_' + item.column_id] = item.value;
                });
                elementBody['created_at'] = element.created_at;
                elementBody['id'] = element.id;
                this.listBody.push(Object.assign({}, elementBody));
              });
            }
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
      // return this.applications.filter((d) => {
      //   // if(d.value.toLowerCase().includes(this.filters.search.toLowerCase())){
      //     return true
      //   // }
      // });
    },
  },
  beforeMount() {
    this.apiGetCatalogList();
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
