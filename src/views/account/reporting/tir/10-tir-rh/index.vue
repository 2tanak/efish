<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !applications || !$store.state.userObject }"
  >
    <v-preloader
      v-if="!applications || !$store.state.userObject"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="applications && $store.state.userObject">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack :title="'ОТПРАВЛЕННЫЕ ОТЧЕТЫ 10_PX'" />
              <div class="card__content--body index-page">
                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--right">
                      <router-link
                        :to="'/' + $i18n.locale + '/account/reporting/10-tir-rh/list/2'"
                        class="btn--link btn--link--plus ml-auto mt-3"
                      >
                        <!---{{ $t('button.add') }} --->
                        Cоздание отчетов _PX
                        <img :src="require('@/assets/img/icon-plus.svg')" />
                      </router-link>
                      <router-link
                        v-if="$store.getters.userPermission(['change_reporting-3rh'])"
                        :to="'/' + $i18n.locale + '/account/reporting/' + 10 + '-rh' + '/create'"
                        class="btn--link btn--link--plus"
                      >
                        {{ $t('button.add') }} <img :src="require('@/assets/img/icon-plus.svg')" />
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
                    :server-items-length="applicationsMeta.total"
                    @update:options="pagination($event)"
                  >
                    <!---------------1-------------->
                    <template v-slot:item.name="{ item }">
                      <a class="tb__table--link" v-html="item.name"></a>
                    </template>
                    <!---------------2-------------->
                    <template v-slot:item.archived="{ item }">
                      <a class="tb__table--link">
                        {{ !item.archived ? 'Создан' : 'В архиве' }}
                      </a>
                    </template>
                    <!---------------3-------------->
                    <template v-slot:item.action="{ item }">
                      <a
                        class="table__link--exel"
                        style="filter: grayscale(1) opacity(0.3)"
                        @click.prevent="downloadFile(item.id)"
                      >
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
                    <v-alert slot="no-results" :value="true" color="error">
                      {{ $t('system_message.search') }}
                    </v-alert>
                  </v-data-table>

                  <ReportManageErrorModal :message="message" :errorMessage="errorMessage" />
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

import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageErrorModal from '@/components/reporting-management/ReportManageErrorModal.vue';

export default {
  name: 'ReportTirIndex10',
  components: {
    HeaderBack,
    ReportManageErrorModal,
  },
  head: {
    title() {
      return {
        inner: this.$t('sidebar.references'),
      };
    },
    meta: [],
  },
  data() {
    return {
      pageId: 10,
      applications: [],
      applicationsMeta: {},
      headers: [
        { text: 'Id', value: 'id', width: '50px' },
        { text: 'Наименование отчета', value: 'name', width: '10vw' },
        { text: 'Дата сдачи отчета', value: 'date_of_submission', width: '10vw' },
        { text: 'Период сдачи', value: 'surrender_date', width: '10vw' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '200px',
        },
      ],
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      test: ['jon', 'mike', 'jana', 'andre', 'vitaly'],
      urlApi: urlApi,
      v_model_name_search: '',
      v_model_region_search: '',
      v_model_pond_search: '',
      v_model_iin_search: '',
      quarter_value: '',
      inputYears: null,
      filter: [],
      options: {
        itemsPerPage: 10,
        page: 1,
      },
    };
  },
  computed: {
    filteredlist() {
      return this.applications;
    },
  },
  watch: {
    v_model_name_search() {
      this.quarter_value = null;
      this.$refs.region.value = null;
      this.v_model_region_search = '';
      this.$refs.pond.value = null;
      this.v_model_pond_search = '';
      this.$refs.quarter.value = null;
      this.v_model_iin_search = '';
      //this.v_model_name_search=''
    },
    v_model_region_search() {
      this.quarter_value = null;
      //this.$refs.region.value=null;
      //this.v_model_region_search='';
      this.$refs.pond.value = null;
      this.v_model_pond_search = '';
      this.$refs.quarter.value = null;
      this.v_model_iin_search = '';
      this.v_model_name_search = '';
    },
    v_model_pond_search() {
      this.quarter_value = null;
      this.$refs.region.value = null;
      this.v_model_region_search = '';
      //this.$refs.pond.value=null;
      //this.v_model_pond_search='';
      this.$refs.quarter.value = null;
      this.v_model_iin_search = '';
      this.v_model_name_search = '';
    },
    v_model_iin_search() {
      this.quarter_value = null;
      this.$refs.region.value = null;
      this.v_model_region_search = '';
      this.$refs.pond.value = null;
      this.v_model_pond_search = '';
      this.$refs.quarter.value = null;
      //this.v_model_iin_search='';
      this.v_model_name_search = '';
    },
    quarter_value() {
      //this.quarter_value =null;
      this.$refs.region.value = null;
      this.v_model_region_search = '';
      this.$refs.pond.value = null;
      this.v_model_pond_search = '';
      //this.$refs.quarter.value=null;
      this.v_model_iin_search = '';
      this.v_model_name_search = '';
    },
  },
  methods: {
    downloadFile(id) {
      api
        .get(`tir/archived/export/excel/${id}`)
        .then((response) => {
          let fileURL = window.URL.createObjectURL(new Blob([response.data]), {
            type: response.headers['content-type'],
          });
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          const extensions = {
            'application/excel': 'xls',
          };
          const contentType = response.headers['content-type'];
          const extension = extensions[contentType];
          const filename = 'report.' + extension;

          fileLink.setAttribute('download', filename);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((error) => {
          this.checkError(error);
        });
    },
    checkError(error) {
      if (error?.response?.status > 500) {
        this.errorMessage.status = 500;
        this.errorMessage.text = this.$t('system_message.500');
      } else if (error?.response?.status == 401) {
        this.errorMessage.status = 401;
        this.errorMessage.text = error?.response?.data?.message;
        this.$router.push('/' + this.$i18n.locale + '/login');
      } else {
        this.errorMessage.status = 422;
        this.errorMessage.text = error?.response?.data?.message;
      }
      this.$modal.show('ReportManageErrorModal');
    },
    pagination(options) {
      this.apiGetReportingList(options.page, options.itemsPerPage);
    },
    async apiGetReportingList(page, per_page) {
      try {
        const response = await api.get(`tir/archived/${this.pageId}`, { params: { page, per_page } });
        if (response.data) {
          this.applications = response.data.data;
          this.applicationsMeta = response.data.meta;
        }
      } catch (error) {
        this.checkError(error);
      }
    },
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
};
</script>

<style>
.reporting-btn .input-btn.form__line--btn {
  background: #52a5fc;
  width: 220px;
  height: 47px;
  padding: 0;
  justify-content: center;
  transition: background 1s ease;
}

.checkbox {
  display: flex;
  align-items: center;
  align-content: center;
  padding: 10px 0;
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.custom-checkbox + label {
  width: 200px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #0a091d;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.custom-checkbox + label::before {
  content: '';
  display: inline-block;
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 6px;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  border: 1.5px solid #52a5fc;
}

.table__block--filter {
  border-bottom: 1px solid #d3e7fb;
  display: block;
  padding: 30px;
}

.search-main {
  width: 100%;
}

.table__filter--search {
  width: 100%;
  margin: 0;
}

.search__label {
  display: block;
  width: 100%;
}

.table__filter--search label input {
  width: 100%;
}
</style>
