<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !applications || !applicationsList }"
  >
    <v-preloader v-if="!applications || !applicationsList" :message="errorMessage"></v-preloader>

    <div class="container" v-if="applications && applicationsList">
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
                    <div class="content__title--text">Просмотр справочника</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line" v-for="(item, index) in applicationsList">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        {{ item.name }}
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              :name="'values[' + item.id + ']'"
                              v-if="item.value"
                              v-model="applicationsList[index].value.value"
                              :placeholder="item.name"
                            />
                            <input
                              type="text"
                              class="input-linck"
                              :name="'values[' + item.id + ']'"
                              v-else
                              :placeholder="item.name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line" v-if="$route.params.id == 2 || $route.params.id == 13">
                    <div class="form__line--left">
                      <div class="form__line--title">Водоемы</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__checkbox--block">
                            <label
                              class="form__checkbox--line"
                              v-if="categoryListSelect"
                              v-for="element in categoryListSelect"
                            >
                              <input
                                type="checkbox"
                                name="category_ids[]"
                                :value="element.id"
                                :checked="element.checked"
                              />
                              <div class="checkbox__item">
                                <span class="form__checkbox--text">
                                  {{ element.values[0].value }}
                                </span>
                                <span class="form__checkbox--check"></span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line" v-if="$route.params.id == 6">
                    <div class="form__line--left">
                      <div class="form__line--title">Область</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__checkbox--block">
                            <label
                              class="form__checkbox--line"
                              v-if="categoryListSelect"
                              v-for="element in categoryListSelect"
                            >
                              <input
                                type="checkbox"
                                name="category_ids[]"
                                :value="element.id"
                                :checked="element.checked"
                              />
                              <div class="checkbox__item">
                                <span class="form__checkbox--text">
                                  {{ element.values[0].value }}
                                </span>
                                <span class="form__checkbox--check"></span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="form__line"
                    v-if="$route.params.id == 4 || $route.params.id == 12 || $route.params.id == 13"
                  >
                    <div class="form__line--left">
                      <div class="form__line--title">Родитель</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <multiselect
                              required=""
                              class="select__status"
                              v-model="parentValue"
                              :options="parentListSelect"
                              placeholder="Выберите родитель"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.values[0].value
                              }}</template>
                              <template slot="option" slot-scope="{ option, search, isOpen }">
                                {{ option.values[0].value }}
                              </template>
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
                      <div
                        class="form__btn--line"
                        v-if="$store.getters.userPermission(['change_catalog'])"
                      >
                        <div class="input__row">
                          <button class="input-btn form__line--btn">
                            {{ $t('button.save') }}
                          </button>
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
                      <div
                        class="form__block--line form__messages"
                        v-if="errorMessage.text"
                        :class="{
                          'form__messages--error': errorMessage.status != 200,
                          'form__messages--success': errorMessage.status == 200,
                        }"
                      >
                        <label class="form__block--input">
                          <span class="form__block--title">
                            {{ errorMessage.text }}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
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

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      applications: null,
      applicationsList: null,
      categoryList: null,
      categoryListSelect: null,
      applicationsForms: [],
      parentListSelect: [],
      parentValue: null,
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
    };
  },
  methods: {
    blockElement(id) {
      api
        .post(
          'catalog/' + this.$route.params.id + '/entry/' + this.$route.params.entryId + '/delete',
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
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
    onSubmit(evt) {
      this.errorMessage = {
        status: null,
        messages: null,
        text: null,
      };
      this.message = {
        status: null,
        text: null,
      };
      const formData = new FormData(evt.target);
      if (this.$route.params.id == 4 && this.parentValue) {
        formData.append('parent_id', this.parentValue.id);
      }
      if ((this.$route.params.id == 12 || this.$route.params.id == 13) && this.parentValue) {
        formData.append('parent_id', this.parentValue.id);
      }
      api
        .post(
          'catalog/' + this.$route.params.id + '/entry/' + this.$route.params.entryId,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
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
          this.errorMessage.messages = error.response.data.error_messages;
        });
    },

    apiGetCatalogParent($catelod_id) {
      api.get('catalog/' + $catelod_id + '/entry/list').then((response) => {
        if (response.data) {
          this.categoryList = response.data.data;
          this.apiGetCatalogParentSubmit();
        }
      });
    },
    apiGetCatalogParentSubmit() {
      api.get('catalog/' + this.$route.params.entryId + '/link').then((response) => {
        if (response.data) {
          this.categoryListSelect = this.categoryList.filter((element) => {
            let module = element;
            let elementSelect = response.data.find((selected) => {
              return selected.item_id == element.id ? true : false;
            });
            elementSelect != undefined && element.id == elementSelect.item_id
              ? (module.checked = true)
              : (module.checked = false);
            return module;
          });
        }
      });
    },

    apiGetItemParent($category_id) {
      api
        .get('catalog/' + $category_id + '/entry/list', {
          params: {
            per_page: 1000,
          },
        })
        .then((response) => {
          if (response.data) {
            this.parentListSelect = response.data.data.filter((element) => {
              let module = element;
              this.applications.values[0].parent_id == element.id
                ? ((module.checked = true), (this.parentValue = module))
                : (module.checked = false);
              return module;
            });
          }
        });
    },
    apiGetCatalog: function () {
      api
        .get('catalog/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            let elementBody = new Array();
            response.data.columns.find((element, index) => {
              elementBody['' + element.id] = element;
            });
            this.applicationsForms = elementBody;
            this.apiGetCatalogEntry();
            if (this.$route.params.id == 2 || this.$route.params.id == 13)
              this.apiGetCatalogParent(3);
            if (this.$route.params.id == 6) this.apiGetCatalogParent(2);
            if (this.$route.params.id == 4) this.apiGetItemParent(7);
            if (this.$route.params.id == 12 || this.$route.params.id == 13)
              this.apiGetItemParent(2);
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
    apiGetCatalogEntry: function () {
      api
        .get('catalog/' + this.$route.params.id + '/entry/' + this.$route.params.entryId)
        .then((response) => {
          if (response.data) {
            this.applications = response.data;

            response.data.values.find((element, index) => {
              if (this.applicationsForms[element.column_id]) {
                this.applicationsForms[element.column_id]['value'] = element;
              }
            });
            let test = this.applicationsForms;
            this.applicationsForms = [];
            this.applicationsForms.push(Object.assign({}, test));
            this.applicationsList = this.applicationsForms[0];
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
  beforeMount() {
    this.apiGetCatalog();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
