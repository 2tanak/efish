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
        <v-form ref="form" @submit.prevent="callFunction()">
          <div class="application__modal--line">
            <div class="modal__table--title" v-if="type == 1">
              {{ $t('button.add') }}
            </div>

            <div class="modal__table--title" v-else>
              {{ $t('template_text.edit') }}
            </div>

            <p class="mb-2">{{ $t('system_message.upload_photo') }}</p>
            <div class="row">
              <div class="col-lg-8">
                <v-file-input
                  outlined
                  counter
                  show-size
                  truncate-length="15"
                  v-model="photo"
                  accept="image/*"
                  :rules="photoRules"
                >
                </v-file-input>
              </div>
            </div>

            <p class="mb-2">{{ $t('system_message.upload_video') }}</p>
            <div class="row">
              <div class="col-lg-8">
                <v-file-input
                  outlined
                  counter
                  show-size
                  truncate-length="15"
                  v-model="video"
                  :rules="videoRules"
                >
                </v-file-input>
              </div>
            </div>

            <div class="row modal__images" v-if="video_link">
              <div class="col-lg-8">
                <p>
                  {{ video_link.split('/')[video_link.split('/').length - 1] }}
                  <span
                    ><i
                      @click="removeContent(selectedItem.id, 'video')"
                      class="pointer mdi mdi-trash-can"
                    ></i
                  ></span>
                </p>
              </div>
            </div>
            <div class="row modal__images" v-if="image_link">
              <div class="col-lg-8">
                <p>
                  {{ image_link.split('/')[image_link.split('/').length - 1] }}
                  <span
                    ><i
                      @click="removeContent(selectedItem.id, 'image')"
                      class="pointer mdi mdi-trash-can"
                    ></i
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
          <v-sidebar :active="['Video']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('sidebar.video') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <div class="table__filter--search">
                        <label class="search__label"> </label>
                      </div>
                    </div>
                    <div class="table__filter--right">
                      <a @click="openModal()" class="btn--link btn--link--plus">
                        {{ $t('button.add') }} <img src="../../assets/img/icon-plus.svg" />
                      </a>
                    </div>
                  </div>

                  <v-data-table
                    :headers="headers"
                    :items="videos"
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
                        @click="removeVideo(item.id)"
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
      videoRules: [
        (v) => !!v || this.$t('system_message.required_message'),
        (value) => !value || value.size < 6000000 || this.$t('system_message.file_size-6'),
      ],
      photoRules: [
        (v) => !!v || this.$t('system_message.required_message'),
        (value) => !value || value.size < 1000000 || this.$t('system_message.file_size-1'),
      ],
      textRules: [(v) => !!v || this.$t('system_message.required_message')],
      uploading: false,
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
      headers: [
        { text: 'ID', value: 'id' },
        { text: this.$t('headers.image_link'), value: 'image_link' },
        { text: this.$t('sidebar.video'), value: 'video_link' },
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
      video_link: null,
      image_link: null,
      video: null,
      photo: null,
      videos: [],
      options: {
        itemsPerPage: 10,
        page: 1,
      },
      selectedId: null,
      action: null,
      selectedItem: null,
      type: 1,
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    callFunction() {
      this.type == 1 ? this.send() : this.update();
    },
    removeContent(id, type) {
      api
        .post('remove/video/' + id + '/' + type, {})
        .then((response) => {
          this.getData();
          this.$modal.hide('modal_addData');
        })
        .catch(() => {});
    },
    removeVideo(id) {
      api
        .post('remove/video/' + id, {
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
    openModal() {
      this.type = 1;
      this.video_link = null;
      this.image_link = null;
      this.video = null;
      this.photo = null;
      this.action = null;
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
    openData(item, action = null) {
      this.type = 2;
      this.selectedItem = item;
      this.selectedId = item.id;
      this.video_link = item.video_link;
      this.image_link = item.image_link;
      this.$modal.show('modal_addData');
    },
    update() {
      this.$refs.form.validate();
      this.uploading = true;
      let formData = new FormData();
      formData.append('video', this.video);
      formData.append('photo', this.photo);
      api
        .post('update/video/' + this.selectedId, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.uploading = false;
          this.getData();
          this.$modal.hide('modal_addData');
          this.uploadedFiles = [];
          this.files = [];
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
          }
        })
        .catch((error) => {
          this.uploading = false;
        });
    },
    send() {
      this.$refs.form.validate();
      this.uploading = true;
      const formData = new FormData();
      formData.append('video', this.video);
      formData.append('photo', this.photo);
      api
        .post('create/video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.uploading = false;
          this.getData();
          this.$modal.hide('modal_addData');
          this.uploadedFiles = [];
          this.video_link = null;
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
          }
        })
        .catch((error) => {
          this.uploading = false;
          if (error?.response?.status == 500) {
            this.errorMessage.status = 500;
            this.errorMessage.text = this.$t('system_message.500');
          }
          if (error?.response?.status == 401) {
            this.errorMessage.status = 401;
            this.errorMessage.text = error.response.data.error_message;
            this.$router.push('/' + this.$i18n.locale + '/login');
          }
        });
    },
    getData() {
      api
        .get('video', {})
        .then((response) => {
          this.videos = response.data.data;
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
        inner: '',
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

.v-messages__message {
  color: #f19797;
}
</style>
