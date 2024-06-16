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
        <v-form ref="form_news" @submit.prevent="callFunction()">
          <div class="application__modal--line">
            <div class="modal__table--title" v-if="!selectedId">
              {{ $t('button.add') }}
            </div>
            <div class="modal__table--title" v-else-if="action == 'see'">
              {{ $t('template_text.view') }}
            </div>
            <div class="modal__table--title" v-else>
              {{ $t('template_text.edit') }}
            </div>

            <div class="row mb-3">
              <div class="col-lg-8">
                <v-text-field
                  outlined
                  class="mb-4"
                  style="height: 42px"
                  :placeholder="$t('placeholder.name')"
                  :rules="textRules"
                  v-model="title"
                  type="text"
                />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-lg-8">
                <vue-editor class="mb-2" id="editor" v-model="description" :rules="textRules">
                </vue-editor>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-lg-8">
                <v-text-field
                  :rules="textRules"
                  class="mb-4"
                  outlined
                  style="height: 42px"
                  :placeholder="$t('placeholder.source_link')"
                  v-model="source_link"
                  type="text"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-lg-8">
                <v-file-input
                  outlined
                  chips
                  counter
                  multiple
                  show-size
                  small-chips
                  truncate-length="15"
                  v-model="files"
                  accept="image/*"
                  :rules="textRules"
                ></v-file-input>
              </div>
            </div>

            <div class="row modal__images" v-for="(image, index) in uploadedFiles" :key="index">
              <div class="col-lg-8">
                <p>
                  {{ image.path.split('/')[image.path.split('/').length - 1] }}
                  <span
                    ><i @click="removeNewsImg(image.id)" class="pointer mdi mdi-trash-can"></i
                  ></span>
                </p>
              </div>
            </div>
          </div>
          <div class="input__row">
            <button
              class="input-btn form__line--btn intput__save__btn"
              type="submit"
              v-if="action != 'see' && !selectedId"
            >
              <v-progress-circular
                :width="2"
                :size="20"
                v-if="uploading"
                indeterminate
                color="white"
              ></v-progress-circular>
              <p class="mb-0" v-else>{{ $t('button.save') }}</p>
            </button>
            <button
              class="input-btn form__line--btn intput__save__btn"
              type="submit"
              v-else-if="action != 'see'"
            >
              <v-progress-circular
                :width="2"
                :size="20"
                v-if="uploading"
                indeterminate
                color="white"
              ></v-progress-circular>
              <p class="mb-0" v-else>{{ $t('button.save') }}</p>
            </button>
            <button
              class="input-btn form__line--btn-black form__line--btn"
              @click="$modal.hide('modal_addData')"
            >
              {{ $t('button.close') }}
            </button>
          </div>
        </v-form>
      </div>
    </modal>
    <div class="container" v-if="$store.state.userObject">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['News']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('sidebar.news') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left"></div>
                    <div class="table__filter--right">
                      <a @click="openModal()" class="btn--link btn--link--plus">
                        {{ $t('button.add') }} <img src="../../assets/img/icon-plus.svg" />
                      </a>
                    </div>
                  </div>

                  <v-data-table
                    :headers="headers"
                    :items="news"
                    :loading="false"
                    :options.sync="options"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 20, 30, 40, 50],
                    }"
                  >
                    <template v-slot:item.name="{ item }">
                      {{ item.id }}
                    </template>

                    <template v-slot:item.description="{ item }">
                      <span v-html="item.description"></span>
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
                        class="tb__table--btn tb__table--view mr-2"
                        v-tooltip.top-center="{
                          content: $t('button.delete'),
                          class: ['tooltip__btn'],
                        }"
                        @click="removeNews(item.id)"
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
      uploading: false,
      textRules: [(v) => !!v || this.$t('system_message.required_message')],
      urlApi: urlApi,
      type: 1,
      applications: null,
      errorMessage: {
        status: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
      headers: [
        { text: 'ID', value: 'id' },
        { text: this.$t('headers.name'), value: 'title' },
        { text: this.$t('headers.description'), value: 'description' },
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
      title: null,
      description: null,
      source_link: null,
      files: [],
      uploadedFiles: [],
      options: {
        itemsPerPage: 10,
        page: 1,
      },

      news: [],
      selectedId: null,
      action: null,
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
    callFunction() {
      this.type == 1 ? this.send() : this.update();
    },
    removeNews(id) {
      api
        .post('remove/news/' + id, {
          // params:{
          //     'user_id': this.$store.state.userObject.id
          // }
        })
        .then((response) => {
          this.getData();
          this.$modal.hide('modal_addData');
        })
        .catch(() => {});
    },
    removeNewsImg(id) {
      api
        .post('remove/news/image/' + id, {
          // params:{
          //     'user_id': this.$store.state.userObject.id
          // }
        })
        .then((response) => {
          this.getData();
          this.$modal.hide('modal_addData');
        })
        .catch(() => {});
    },
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
      this.type = 1;
      this.title = null;
      this.description = null;
      this.uploadedFiles = [];

      this.action = null;
      this.clearObject();
      this.$modal.show('modal_addData');
    },
    openData(item, action = null) {
      this.type = 2;
      this.selectedId = item.id;
      this.title = item.title;
      this.description = item.description;
      this.source_link = item.source_link;
      this.uploadedFiles = item.images;
      this.$modal.show('modal_addData');
    },
    update() {
      if (this.$refs.form_news.validate() == false) {
        return false;
      }

      this.uploading = true;
      let form = new FormData();
      if (this.files)
        for (var i = 0; i < this.files.length; i++) {
          form.append('files[]', this.files[i]);
        }
      form.append('title', this.title);
      form.append('description', this.description);
      form.append('source_link', this.source_link);
      api
        .post('update/news/' + this.selectedId, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.getData();
          this.uploading = false;
          this.$modal.hide('modal_addData');
          this.uploadedFiles = [];
          this.files = [];
          this.title = null;
          this.description = null;
          this.source_link = null;
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
          }
        })
        .catch(() => {});
    },
    send() {
      if (this.$refs.form_news.validate() == false) {
        return false;
      }

      this.uploading = true;
      const formData = new FormData();

      if (this.files)
        for (var i = 0; i < this.files.length; i++) {
          formData.append('files[]', this.files[i]);
        }
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('source_link', this.source_link);
      api
        .post('create/news', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.getData();
          this.$modal.hide('modal_addData');
          this.uploading = false;
          this.uploadedFiles = [];
          this.files = [];
          this.title = null;
          this.description = null;
          this.source_link = null;
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
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
        })
        .catch(() => {});
    },
    getData() {
      api
        .get('news', {})
        .then((response) => {
          this.news = response.data.data;
          this.numberOfPages = response.data.total;
          this.totalPage = response.data.total;
        })
        .catch(() => {});
    },
  },
  computed: {},

  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  head: {
    title() {
      return {
        inner: this.$t('sidebar.news'),
      };
    },
    meta: [],
  },
};
</script>
<style>
.pointer:hover {
  opacity: 0.7px;
}

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
  width: 400px;
  left: 585px;
  top: 287px;
  background: #ffffff;
  border: 1px solid #d3e7fb;
  box-sizing: border-box;
  border-radius: 5px;
  padding-left: 10px;
  outline: none;
}

.modal__images i {
  color: #f19797;
}
</style>
