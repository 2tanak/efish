<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !$store.state.userObject }"
  >
    <v-preloader v-if="!$store.state.userObject" :message="errorMessage"></v-preloader>

    <div class="container" v-if="$store.state.userObject">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['Notifications']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('notification.title') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <v-data-table
                    :headers="headers"
                    :items="notifications"
                    :loading="false"
                    :options.sync="options"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 20, 30, 40, 50],
                    }"
                  >
                    <template v-slot:item.id="{ item, index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | formatDate }}
                    </template>
                    <template v-slot:item.data="{ item, index }">
                      <a
                        class="pointer"
                        v-if="JSON.parse(item.data).message.link"
                        @click="readSet(index, JSON.parse(item.data).message.link)"
                        target="_blank"
                        v-else
                      >
                        <span>
                          {{
                            $t(
                              'notification.' +
                                JSON.parse(item.data).message.model +
                                '.' +
                                JSON.parse(item.data).message.status +
                                '.text',
                              { link: JSON.parse(item.data).message.link },
                            )
                          }}
                        </span>
                      </a>
                      <a
                        class="pointer"
                        @click="
                          readSet(
                            index,
                            '/' +
                              $i18n.locale +
                              $t(
                                'notification.' +
                                  JSON.parse(item.data).message.model +
                                  '.' +
                                  JSON.parse(item.data).message.status +
                                  '.href',
                                { id: JSON.parse(item.data).id },
                              ),
                          )
                        "
                        v-else-if="
                          $te(
                            'notification.' +
                              JSON.parse(item.data).message.model +
                              '.' +
                              JSON.parse(item.data).message.status +
                              '.href',
                          )
                        "
                      >
                        <span v-if="JSON.parse(item.data).message.iin_bin">
                          {{
                            $t(
                              'notification.' +
                                JSON.parse(item.data).message.model +
                                '.' +
                                JSON.parse(item.data).message.status +
                                '.text',
                              { iin_bin: JSON.parse(item.data).message.iin_bin },
                            )
                          }}
                        </span>
                        <span v-else>
                          {{
                            $t(
                              'notification.' +
                                JSON.parse(item.data).message.model +
                                '.' +
                                JSON.parse(item.data).message.status +
                                '.text',
                            )
                          }}
                        </span>
                      </a>
                      <span v-else>
                        {{
                          $t(
                            'notification.' +
                              JSON.parse(item.data).message.model +
                              '.' +
                              JSON.parse(item.data).message.status +
                              '.text',
                          )
                        }}
                      </span>
                    </template>
                    <template v-slot:item.read_at="{ item }">
                      <a class="tb__table--status" :class="{ 'tb__status--success': item.read_at }">
                        {{ item.read_at ? $t('template_text.viewed') : $t('template_text.new') }}
                      </a>
                    </template>
                    <template v-slot:item.action="{ item, index }">
                      <a
                        v-if="JSON.parse(item.data).message.link"
                        class="tb__table--btn pointer"
                        :href="JSON.parse(item.data).message.link"
                        target="_blank"
                        v-tooltip.top-center="{
                          content: $t('tooltip.go'),
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
                            d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 12.75L15.75 9L12 5.25"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.75 9H6.75"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </a>
                      <a
                        v-else
                        class="tb__table--btn pointer"
                        @click="
                          readSet(
                            index,
                            '/' +
                              $i18n.locale +
                              $t(
                                'notification.' +
                                  JSON.parse(item.data).message.model +
                                  '.' +
                                  JSON.parse(item.data).message.status +
                                  '.href',
                                { id: JSON.parse(item.data).id },
                              ),
                          )
                        "
                        v-tooltip.top-center="{
                          content: $t('tooltip.go'),
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
                            d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 12.75L15.75 9L12 5.25"
                            stroke="#52A5FC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.75 9H6.75"
                            stroke="#52A5FC"
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
      limit: 'limit',

      notifications: [],
      headers: [
        { text: '№', value: 'id' },
        { text: this.$t('headers.message'), value: 'data' },
        { text: this.$t('headers.created_at'), value: 'created_at' },
        { text: this.$t('template_text.viewed'), value: 'read_at' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '200px',
        },
      ],
      options: {
        itemsPerPage: 10,
        page: 1,
      },
      errorMessage: {
        status: null,
        text: null,
      },
    };
  },
  props: {},
  watch: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // api
      //   .get('notifications/list', {
      //     // params:{
      //     //     'user_id': this.$store.state.userObject.id
      //     // }
      //   })
      //   .then((response) => {
      //     this.notifications = response.data;
      //     this.$store.commit('getUserNotifications', response.data);
      //   })
      //   .catch((error) => {
      //   });
    },
    readSet(index, link) {
      api
        .post('notifications/read', {
          index: index,
        })
        .then((response) => {
          this.getData();
          // this.$router.push({ path: link });
          window.open(link, '_blank');
        })
        .catch(() => {});
    },
    eyeSet(index) {
      api
        .post('notifications/read', {
          index: index,
        })
        .then((response) => {
          this.getData();
        })
        .catch(() => {});
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
        inner: this.$t('notification.title'),
      };
    },
    meta: [],
  },
};
</script>
<style></style>
