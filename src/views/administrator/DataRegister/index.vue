<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !$store.state.userObject }"
  >
    <v-preloader v-if="!$store.state.userObject" :message="errorMessage"></v-preloader>

    <modal
      class="modal__block modal__block--table"
      name="modal_addData"
      :adaptive="true"
      :width="1100"
      :min-width="1100"
      height="auto"
    >
      <div class="modal__block--wrapper modal__table modal__application">
        <div class="application__modal--line">
          <div class="modal__table--title" v-if="!selectedId">Добавление новых данных</div>
          <div class="modal__table--title" v-else-if="action == 'see'">Просмотр данных</div>
          <div class="modal__table--title" v-else>Редактирование данных</div>

          <div
            class="form__line"
            v-for="(catalog, index) in catalogs"
            :key="catalog.id"
            v-if="catalog.name != 'Рыбы'"
          >
            <div class="form__line--left">
              <div class="form__line--title">
                {{ catalog.name }}
              </div>
            </div>
            <div class="form__line--right">
              <div class="row">
                <div class="col-xl-5">
                  <div class="form__line--input">
                    <multiselect
                      v-if="catalog && catalog.columns"
                      class="select__status"
                      v-model="catalog.selected"
                      :options="catalog.columns[0].values"
                      label="value"
                      :clearOnSelect="false"
                      :clear-on-select="false"
                      :placeholder="catalog.name"
                    >
                      <template slot="singleLabel" slot-scope="{ option }">{{
                        option.value
                      }}</template>
                      <template slot="noResult">{{ $t('components.not_found') }}</template>
                    </multiselect>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form__line">
            <div class="form__line--left"></div>
            <div class="form__line--right">
              <div class="form__line--children">
                <div class="form-quota__info">
                  <div class="form-quota__body">
                    <div class="form-quota__fish">
                      <div class="row align-items-center">
                        <div class="col-xl-5">
                          <div class="quota-fish__title">
                            <div class="row align-items-center">
                              <div class="col-xl-7">
                                <div class="form__line--title">Виды рыб</div>
                              </div>
                              <div class="col-xl-5">
                                <div class="form__line--title">Количество (кг.)</div>
                              </div>
                            </div>
                          </div>
                          <!-- /.quota-fish__title -->
                        </div>
                      </div>

                      <div
                        class="quota-fish__line"
                        v-for="(f, index) in catalog_fishes"
                        :key="index"
                      >
                        <div class="quota-fish__wrapper">
                          <div class="row align-items-center">
                            <div class="col-xl-5">
                              <div class="quota-fish__item">
                                <div class="row align-items-center">
                                  <div class="col-xl-7">
                                    <div class="form__line--input">
                                      <multiselect
                                        v-if="fishes[0] && fishes[0].columns"
                                        class="select__status"
                                        v-model="catalog_fishes[index]"
                                        :options="fishes[0].columns[0].values"
                                        label="value"
                                        :clearOnSelect="false"
                                        :clear-on-select="false"
                                        placeholder="Виды рыб"
                                      >
                                        <template slot="singleLabel" slot-scope="{ option }">{{
                                          option.value
                                        }}</template>
                                        <template slot="noResult">{{
                                          $t('components.not_found')
                                        }}</template>
                                      </multiselect>
                                    </div>
                                  </div>
                                  <div class="col-xl-5">
                                    <div class="form__line--input">
                                      <input
                                        v-if="fishes && catalog_fishes[index]"
                                        class="data__register__input"
                                        v-model="catalog_fishes[index].kg"
                                        type="number"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- /.quota-fish__line -->
                            </div>
                            <div class="col-xl-2">
                              <div class="input__block--add">
                                <i
                                  class="mdi mdi-plus-circle-outline mr-2 ml-2"
                                  v-if="index + 1 == catalog_fishes.length"
                                  @click="addFish()"
                                ></i>
                                <i
                                  class="mdi mdi-minus-circle-outline mr-2 ml-2"
                                  v-else
                                  @click="subFish(index)"
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- /.quota-fish__line--wrapper -->
                      </div>
                      <!-- /.quota-fish__line -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="input__row">
          <button
            class="input-btn form__line--btn"
            @click="send()"
            v-if="action != 'see' && !selectedId"
          >
            {{ $t('button.save') }}
          </button>
          <button class="input-btn form__line--btn" @click="update()" v-else-if="action != 'see'">
            Редактировать
          </button>
          <button
            class="input-btn form__line--btn-black form__line--btn"
            @click="$modal.hide('modal_addData')"
          >
            {{ $t('button.close') }}
          </button>
        </div>
      </div>
    </modal>
    <div class="container" v-if="catalogs && $store.state.userObject">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['DataRegister']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">Реестр данных</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <div class="table__filter--search">
                        <label class="search__label">
                          <!-- <input type="text" value="" name="filter_search" v-model="filters.search" :placeholder="$t('placeholder.search')"> -->
                          <!-- <button >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M20.9999 21L16.6499 16.65" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </button> -->
                        </label>
                      </div>
                      <div class="table__filter--order">
                        <!-- <multiselect
                            class="select__status"
                            v-model="filterCategories"
                            :options="orderList"
                            label="name"
                            :clearOnSelect="false"
                            :clear-on-select="false"
                            :placeholder="$t('placeholder.choose')"
                        >
                          <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
                          <template slot="noResult">{{ $t('components.not_found') }}</template>
                        </multiselect> -->
                      </div>
                    </div>
                    <div class="table__filter--right">
                      <a
                        @click="openModal()"
                        v-if="$store.getters.userPermission(['create_register_data'])"
                        class="btn--link btn--link--plus"
                      >
                        {{ $t('button.add') }} <img src="../../../assets/img/icon-plus.svg" />
                      </a>
                    </div>
                  </div>

                  <v-data-table
                    :headers="headers"
                    :items="dataRegister"
                    :loading="false"
                    :options.sync="options"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 20, 30, 40, 50],
                    }"
                  >
                    <template v-slot:item.name="{ item, index }">
                      {{ 'Данные' }} {{ index + 1 }}
                    </template>
                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | formatDate }}
                    </template>

                    <template v-slot:item.action="{ item }">
                      <a
                        v-tooltip.top-center="{
                          content: $t('tooltip.edit'),
                          class: ['tooltip__btn'],
                        }"
                        v-if="$store.getters.userPermission(['update_register_data'])"
                        @click="openData(item)"
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
                      </a>
                      <a
                        class="tb__table--btn tb__table--view"
                        v-tooltip.top-center="{
                          content: $t('tooltip.look'),
                          class: ['tooltip__btn'],
                        }"
                        @click="openData(item, 'see')"
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

                      <a
                        class="tb__table--btn tb__table--view mr-2"
                        @click="deleteItem(item.id)"
                        v-if="$store.getters.userPermission(['delete_register_data'])"
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

                      <!-- 
                          <i class="mdi mdi-trash-can-outline"></i> -->
                    </template>
                    <!-- <template v-slot:item.status="{item}">
                      <a class="tb__table--status" :class="{'tb__status--success': item.is_deleted == 0, 'tb__status--error': item.is_deleted == 1}">
                        {{ (item.is_deleted == 0) ? $t('status.active') : $t('status.blocked') }}
                      </a>
                    </template> -->
                    <!-- <template v-slot:item.action="{item}">
                      <a :href="urlApi + item.document" class="tb__table--btn tb__table--delete" target="_blank" v-tooltip.top-center="{content:'Скачать', class: ['tooltip__btn']}">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M5.25 7.5L9 11.25L12.75 7.5" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M9 11.25V2.25" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>
                    </template> -->
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
import axios from 'axios';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
    axios,
  },
  data() {
    return {
      urlApi: urlApi,

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

      catalog_fishes: [
        {
          kg: '',
        },
      ],

      filterCategories: this.$t('orders.userList'),
      orderList: this.$t('orders.user'),

      headers: [
        { text: 'ID', value: 'id' },
        { text: this.$t('headers.name'), value: 'name' },
        { text: this.$t('headers.created_at'), value: 'created_at' },
        // { text: this.$t('headers.status'), value: 'status' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '200px',
        },
      ],
      catalogs: [],
      dataRegister: [],
      fishes: [],
      fish: {
        kg: '',
      },
      kg: '',
      selected: [
        {
          value: null,
        },
        {
          value: null,
        },
        {
          value: null,
        },
      ],
      selectedId: null,
      action: false,
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  mounted() {
    this.getCatalog();
    this.getData();
  },
  methods: {
    clearObject() {
      let catalog = [
        {
          kg: '',
        },
      ];
      this.selectedId = null;
      this.getCatalog();
      // this.action = action;
      this.catalog_fishes = catalog;
    },
    openModal() {
      this.action = null;
      this.clearObject();
      this.$modal.show('modal_addData');
    },
    deleteItem(id) {
      api
        .post('data/register/' + id, {}, {})
        .then((response) => {
          this.getData();
        })
        .catch(() => {});
    },
    subFish(i) {
      this.catalog_fishes = this.catalog_fishes.filter(function (e, index) {
        return index != i;
        // if(e.value=='Рыбы') {
        //     e.selected = this.fish;
        // }
      });
    },
    addFish() {
      let data = {
        kg: '',
      };
      this.catalog_fishes.push(data);
    },
    openData(item, action = null) {
      // this.clearObject();
      this.selectedId = item.id;
      this.catalogs = JSON.parse(item.catalogs_json);

      this.action = action;
      this.catalog_fishes = JSON.parse(item.fishes_json);
      this.$modal.show('modal_addData');
    },
    update() {
      this.catalogs = this.catalogs.filter(function (e) {
        return e.name != 'Рыбы';
        // if(e.value=='Рыбы') {
        //     e.selected = this.fish;
        // }
      });

      api
        .put(
          'data/register/' + this.selectedId,
          {
            catalogs: this.catalogs,
            fish: this.catalog_fishes,
          },
          {
            // headers: {
            //   'Content-Type': 'multipart/form-data'
            // }
          },
        )
        .then((response) => {
          this.getData();
          this.selectedId = null;
          this.$modal.hide('modal_addData');
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
            this.$router.push({
              path:
                '/' +
                this.$i18n.locale +
                '/account/limits/' +
                response.data.data.id +
                '/' +
                this.chapter,
            });
          }
        })
        .catch(() => {});
    },
    send() {
      this.catalogs = this.catalogs.filter(function (e) {
        return e.name != 'Рыбы';
        // if(e.value=='Рыбы') {
        //     e.selected = this.fish;
        // }
      });

      api
        .post(
          'data/register',
          {
            catalogs: this.catalogs,
            fish: this.catalog_fishes,
          },
          {
            // headers: {
            //   'Content-Type': 'multipart/form-data'
            // }
          },
        )
        .then((response) => {
          this.getData();

          this.$modal.hide('modal_addData');
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
            this.$router.push({
              path:
                '/' +
                this.$i18n.locale +
                '/account/limits/' +
                response.data.data.id +
                '/' +
                this.chapter,
            });
          }
        })
        .catch(() => {});
    },
    getCatalog() {
      api
        .get('guest/data/register/catalog', {
          // params:{
          //     'user_id': this.$store.state.userObject.id
          // }
        })
        .then((response) => {
          this.catalogs = response.data;
          this.fishes = response.data.filter(function (e) {
            return e.name == 'Рыбы';
          });

          // this.catalogs.forEach(element => {
          //     element.selected = null;
          // });
        })
        .catch(() => {});
    },
    getData() {
      api
        .get('data/register', {})
        .then((response) => {
          this.dataRegister = response.data;
        })
        .catch(() => {});
    },
  },
  computed: {
    filteredlist() {
      return this.applications.filter((d) => {
        if (
          (d.name ? d.name.toLowerCase().includes(this.filters.search.toLowerCase()) : true) &&
          (this.filterCategories.status == 'all' || d.is_deleted == this.filterCategories.status)
        ) {
          return true;
        }
      });
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
        inner: 'Реестр данных',
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
.mdi-plus-circle-outline {
  font-size: 20px;
  cursor: pointer;
  color: #52a5fc;
}
.mdi-minus-circle-outline {
  color: #f19797;
  font-size: 20px;
  cursor: pointer;
}
.mdi-trash-can-outline {
  color: #f19797;
  font-size: 20px;
  cursor: pointer;
}

.data__register__input {
  width: 126px;
  height: 42px;
  left: 585px;
  top: 287px;

  background: #ffffff;
  border: 1px solid #d3e7fb;
  box-sizing: border-box;
  border-radius: 5px;
  padding-left: 10px;
  outline: none;
}
</style>
