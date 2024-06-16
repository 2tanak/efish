<template>
  <div class="wrap__content">
    <!-- v-bind:class="{'wrap__content--preloader': !applications}"    <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>     v-if="applications" -->

    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      Предоставление административных данных (Отчетность)
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="content__list--links">
                    <ul class="content__links--ul">
                      <li
                        v-for="link in links"
                        v-if="$store.getters.userPermission(link.permission)"
                      >
                        <router-link
                          :to="'/' + $i18n.locale + '/account/reporting/' + link.link + '-rh'"
                          >{{ link.name }}</router-link
                        >
                      </li>
                    </ul>
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
import { urlApi } from '@/boot/axios';

export default {
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
      links: [
        {
          link: '1',
          name: '1-рх (Сведения об освоении квоты вылова рыбы и других водных животных пользователями)',
          permission: ['read_reporting-1rh'],
        },
        {
          link: '1-tir',
          name: '1-рх (Сведения об освоении квоты вылова рыбы и других водных животных пользователями)',
          permission: ['read_reporting-5rh'], //'read_reporting-1rh-tir'
        },
        {
          link: '2',
          name: '2-рх (Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков)',
          permission: ['read_reporting-2rh'],
        },
        {
          link: '2-tir',
          name: '2-рх (Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков)',
          permission: ['read_reporting-5rh'],
        },

        {
          link: '3',
          name: '3-рх (Сведения о выполнении запланированных на текущий год объемов финансовых средств пользователями для развития рыбного хозяйства)',
          permission: ['read_reporting-3rh'],
        },

        {
          link: '5',
          name: '5-рх (Сведения о рыбохозяйственных водоемах и (или) участках местного значения)',
          permission: ['read_reporting-5rh'],
        },
        {
          link: '6',
          name: '6-рх (Сведения о рыбохозяйственных водоемах и (или) участках международного и республиканского значения)',
          permission: ['read_reporting-6rh'],
        },
        {
          link: '7',
          name: '7-рх (Сведения о материально-техническом оснащении пользователей)',
          permission: ['read_reporting-7rh'],
        },

        {
          link: '8',
          name: '8-рх (Сведения по субъектам, занятым выращиванием рыбы)',
          permission: ['read_reporting-8rh'],
        },
        {
          link: '9',
          name: '9-рх (Сведения о рыбоперерабатывающих предприятиях)',
          permission: ['read_reporting-9rh'],
        },
        {
          link: '10-tir',
          name: '10-рх (Сведения о контрольно-инспекционной деятельности территориальных органов в части охраны рыбных ресурсов)',
          permission: ['read_reporting-10rh'],
        },
      ],
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  methods: {},
  computed: {},
  beforeMount() {},
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
