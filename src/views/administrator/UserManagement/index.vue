<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !applications }">
    <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>

    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['UserManagementMain', 'UserManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('sidebar.users_parent') }}
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
                        <div class="col-lg-4" v-if="roleList">
                          <div class="analytic__filter--item">
                            <multiselect
                              class="select__status"
                              v-model="filterRoles"
                              :options="roleList"
                              label="description"
                              :clearOnSelect="false"
                              :clear-on-select="false"
                              :placeholder="$t('placeholder.choose')"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.description
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                        </div>
                        <div class="col-lg-4" v-if="regionList">
                          <div class="analytic__filter--item">
                            <multiselect
                              class="select__status"
                              v-model="filterRegion"
                              :options="regionList"
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
                        <div class="col-lg-2">
                          <div class="analytic__filter--item">
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
                        <div class="col-lg-3">
                          <!-- ml-auto -->
                          <div class="analytic__filter--item">
                            <router-link
                              v-if="$store.getters.userPermission(['change_user'])"
                              :to="'/' + $i18n.locale + '/account/users/create'"
                              class="btn--link btn--link--plus"
                            >
                              Регистрация пользователя
                              <img src="../../../assets/img/icon-plus.svg" />
                            </router-link>
                          </div>
                        </div>
                      </div>
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
                      {{ item.first_name }} {{ item.last_name }} {{ item.middle_name }}
                    </template>
                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | formatDate }}
                    </template>
                    <template v-slot:item.role_id="{ item }">
                      {{ item.role.description }}
                    </template>

                    <template v-slot:item.regions_info="{ item }">
                      <div>
                        <span v-for="item in item.regions_info" style="font-size: 12px">
                          {{ item.value }}
                        </span>
                      </div>
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
                        v-if="$store.getters.userPermission(['read_user'])"
                        :to="'/' + $i18n.locale + '/account/users/' + item.id"
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
                        v-if="$store.getters.userPermission(['change_user'])"
                        :to="'/' + $i18n.locale + '/account/users/' + item.id + '/edit'"
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
                        class="tb__table--btn tb__table--view"
                        v-if="
                          $store.getters.userPermission(['delete_user']) && item.is_deleted != 0
                        "
                        @click="activeElement(item.id)"
                        v-tooltip.top-center="{ content: 'Активировать', class: ['tooltip__btn'] }"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 16.5C13.1422 16.5 16.5 13.1422 16.5 9C16.5 4.85775 13.1422 1.5 9 1.5C4.85775 1.5 1.5 4.85775 1.5 9C1.5 13.1422 4.85775 16.5 9 16.5Z"
                            stroke="#5ABB5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.75 9L8.25 10.5L11.25 7.5"
                            stroke="#5ABB5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </a>
                      <a
                        v-if="
                          $store.getters.userPermission(['delete_user']) && item.is_deleted === 0
                        "
                        class="tb__table--btn tb__table--delete"
                        @click="$modal.show('modal_delete'), (blockElemet = item)"
                        v-tooltip.top-center="{ content: 'Блокировать', class: ['tooltip__btn'] }"
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
                            Вы уверены что хотите заблокировать пользователя<br />
                            <strong>
                              {{ blockElemet ? blockElemet.first_name : '' }}
                              {{ blockElemet ? blockElemet.last_name : '' }}
                              {{ blockElemet ? blockElemet.middle_name : '' }}
                            </strong>
                          </div>
                        </div>

                        <form method="POST" @submit.prevent="blockElement">
                          <div class="modal__content">
                            <div class="modal__form">
                              <div class="form__line">
                                <div class="form__line--right">
                                  <div
                                    class="form__line--input"
                                    :class="[
                                      errorMessage.messages && errorMessage.messages.comment
                                        ? 'input--error'
                                        : '',
                                    ]"
                                  >
                                    <textarea
                                      class="input-linck"
                                      required=""
                                      name="comment"
                                      placeholder="Причина отклонения"
                                    ></textarea>
                                  </div>
                                  <div
                                    class="input-required"
                                    v-if="errorMessage.messages && errorMessage.messages.comment"
                                  >
                                    <p v-for="massage in errorMessage.messages.comment">
                                      {{ massage }}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div class="block__row">
                                <div class="block__row--left">
                                  <button class="block__item" v-if="blockElemet">
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
                                    Заблокировать
                                  </button>
                                </div>
                                <div class="block__row--right">
                                  <a
                                    class="block__item block__item--blue"
                                    @click="$modal.hide('modal_delete')"
                                  >
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
                        </form>
                      </div>
                    </div>
                  </modal>
                  <modal
                    class="modal__block modal__block--middle modal__block--success"
                    name="modal_success"
                    :width="550"
                    :min-width="550"
                    height="auto"
                  >
                    <div class="modal__block--wrapper">
                      <div class="modal__block--close" @click="$modal.hide('modal_success')">
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
                            Вы уверены что хотите разблокировать пользователя
                          </div>
                        </div>

                        <div class="modal__content">
                          <div class="modal__form">
                            <div class="modal__form--message message__center">
                              Вы успешно разблокировали пользователя
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
import { mapGetters, mapActions } from 'vuex';

import { api } from '@/boot/axios';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
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

      filterRoles: {
        id: 'all',
        description: 'Все',
      },
      roleList: null,

      filterRegion: {
        id: 'all',
        name: 'Все',
      },

      filterCategories: this.$t('orders.userList'),
      orderList: this.$t('orders.user'),

      headers: [
        { text: 'Id', value: 'id' },
        { text: this.$t('headers.fio'), value: 'name' },
        { text: this.$t('headers.register_at'), value: 'created_at' },
        { text: this.$t('headers.role'), value: 'role_id' },
        { text: this.$t('headers.regions'), value: 'regions_info' },
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
    ...mapActions(['_fetchRegionList']),
    activeElement(id) {
      api
        .post('user/' + id + '/activate', {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;

            this.$modal.show('modal_success');
            this.apiGetUserList();
            // this.$router.push({path: '/'+ this.$i18n.locale +'/account/users'});
          }
        });
    },
    blockElement(evt) {
      const formData = new FormData(evt.target);
      api
        .post('user/' + this.blockElemet.id + '/delete', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.blockElemet = null;
            this.$modal.hide('modal_delete');
            this.apiGetUserList();
          }
        });
    },
    pagination(options) {
      this.apiGetUserList(options.page, options.itemsPerPage);
    },
    apiGetUserList(page = 1, per_page = 10) {
      api
        .get('user/list', { params: { page, per_page } })
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
    apiGetRolesList() {
      api
        .get('user/role/list')
        .then((response) => {
          if (response.data) {
            this.roleList = response.data;
            this.roleList.unshift({
              id: 'all',
              description: 'Все',
            });
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
    ...mapGetters(['_getRegionList']),
    filteredlist() {
      return (
        this.applications?.filter((d) => {
          let region = [];
          if (d.regions_info && this.filterRegion.id != 'all') {
            region = d.regions_info.filter((e) => {
              if (this.filterRegion.id == e.id) return true;
              return false;
            });
          }
          let full_name = d.first_name + ' ' + d.last_name + ' ' + d.middle_name;
          if (
            (((d.first_name
              ? d.first_name.toLowerCase().includes(this.filters.search.toLowerCase())
              : true) &&
              (d.last_name
                ? d.last_name.toLowerCase().includes(this.filters.search.toLowerCase())
                : true) &&
              (d.middle_name
                ? d.middle_name.toLowerCase().includes(this.filters.search.toLowerCase())
                : true)) ||
              (full_name
                ? full_name.toLowerCase().includes(this.filters.search.toLowerCase())
                : true) ||
              (d.iin_bin
                ? d.iin_bin.toLowerCase().includes(this.filters.search.toLowerCase())
                : true) ||
              (d.email
                ? d.email.toLowerCase().includes(this.filters.search.toLowerCase())
                : true) ||
              (this.$options.filters.formatDate(d.created_at)
                ? this.$options.filters
                    .formatDate(d.created_at)
                    .toLowerCase()
                    .includes(this.filters.search.toLowerCase())
                : true)) &&
            (this.filterRoles.id == 'all' || d.role_id == this.filterRoles.id) &&
            (this.filterRegion.id == 'all' || region.length) &&
            (this.filterCategories.status == 'all' || d.is_deleted == this.filterCategories.status)
          ) {
            return true;
          }
        }) || []
      );
    },
    regionList() {
      return [
        {
          id: 'all',
          name: 'Все',
        },
        ...this._getRegionList,
      ];
    },
  },
  beforeMount() {
    this.apiGetRolesList();
    this._fetchRegionList();
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
