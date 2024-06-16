<template>
  <header class="header__site">
    <div class="container">
      <div class="header__site--row">
        <div class="header__left">
          <div class="header__logo">
            <div class="header__logo--left">
              <a :href="'/' + $i18n.locale + '/'">
                <img src="../assets/img/logo.svg" alt="" />
              </a>
            </div>
            <div class="header__logo--right">
              <div class="header__logo--title">
                {{ $t('site.logo.title') }}
              </div>
              <div class="header__logo--subtitle">
                {{ $t('site.logo.desc') }}
              </div>
            </div>
          </div>
        </div>
        <div class="header__right">
          <div class="header__menu">
            <ul class="menu">
              <li>
                <a href="/#about" @click="headerMenuClick">{{ $t('site.menu.about') }}</a>
              </li>
              <li>
                <a href="/#map" @click="headerMenuClick">{{ $t('site.menu.map') }}</a>
              </li>
              <li>
                <a href="/#news" @click="headerMenuClick">{{ $t('site.menu.news') }}</a>
              </li>
              <li>
                <a href="/#video" @click="headerMenuClick">{{ $t('site.menu.video') }}</a>
              </li>
            </ul>
          </div>

          <div class="header__search" v-bind:class="{ 'hidden-search': !searchClick }">
            <transition name="slide-fade">
              <div class="header__search--block" v-if="searchClick">
                <div class="header__search--header">
                  <form class="header__search--form" @submit.prevent="searchSubmit">
                    <input type="text" :placeholder="$t('site.search')" name="query" v-model="searchText" />
                    <button type="submit">
                      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9.77879 15.9454C13.4607 15.9454 16.4455 12.9606 16.4455 9.27873C16.4455 5.59683 13.4607 2.61206 9.77879 2.61206C6.09689 2.61206 3.11212 5.59683 3.11212 9.27873C3.11212 12.9606 6.09689 15.9454 9.77879 15.9454Z"
                          stroke="#52A5FC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.1121 17.6121L14.4871 13.9871" stroke="#52A5FC" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>
                  </form>
                </div>
                <div class="header__search--body" v-if="searchApplicate">
                  <div class="search__result" v-for="item in searchApplicate.data" v-if="searchApplicate.data">
                    <router-link :to="'/' + $i18n.locale + '/description/' + item.id">{{
                      item.title
                    }}</router-link>
                  </div>
                  <div class="search__result" v-if="searchApplicate.data_error">
                    <a>{{ searchApplicate.data_error }}</a>
                  </div>
                </div>
              </div>
            </transition>
            <a class="search__btn header__serch--click" @click="searchClick = !searchClick">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.77879 15.9454C13.4607 15.9454 16.4455 12.9606 16.4455 9.27873C16.4455 5.59683 13.4607 2.61206 9.77879 2.61206C6.09689 2.61206 3.11212 5.59683 3.11212 9.27873C3.11212 12.9606 6.09689 15.9454 9.77879 15.9454Z"
                  stroke="#52A5FC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.1121 17.6121L14.4871 13.9871" stroke="#52A5FC" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </a>
          </div>

          <div class="header__bvi">
            <a class="bvi-class bvi-open">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.833313 9.99998C0.833313 9.99998 4.16665 3.33331 9.99998 3.33331C15.8333 3.33331 19.1666 9.99998 19.1666 9.99998C19.1666 9.99998 15.8333 16.6666 9.99998 16.6666C4.16665 16.6666 0.833313 9.99998 0.833313 9.99998Z"
                  stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                  stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>

          <div class="header__lang">
            <div class="header__lang--top">
              <div class="header__lang--text">
                {{ langOn }}
              </div>
              <div class="header__lang--arrow">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 9L12.5 15L18.5 9" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
            </div>

            <div class="header__lang--list">
              <ul>
                <li :class="{ 'header__lang--active': this.$i18n.locale == 'kz' }">
                  <a href="#" @click.prevent="setLocale('kz')">Қазақ</a>
                </li>
                <li :class="{ 'header__lang--active': this.$i18n.locale == 'ru' }">
                  <a href="#" @click.prevent="setLocale('ru')">Русский</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="header__burger">
            <div class="header__burger--click" @click="mobileActive">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 12H21" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 18H21" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import isvek from '../assets/js/bvi/dist/js/bvi';
import '../assets/js/bvi/dist/css/bvi.min.css';
import { api } from '@/boot/axios';

const USER_ACTIVITY_THROTTLER_TIME = process.env.VUE_APP_USER_ACTIVITY_THROTTLER_TIME || 30000;

export default {
  data: function () {
    return {
      searchClick: false,
      searchApplicate: null,
      searchText: '',

      mobileClick: false,
      loginClick: false,
      userActivityTimeout: null,
    };
  },
  computed: {
    langOn: function () {
      var lang = this.$i18n.locale;
      if (lang == 'ru') {
        lang = 'Рус';
      } else if (lang == 'kz') {
        lang = 'Қаз';
      } else if (lang == 'en') {
        lang = 'Eng';
      }
      return lang;
    },
  },
  methods: {
    headerMenuClick(e) {
      if (e.target.hash && document.querySelector(e.target.hash)) {
        e.preventDefault();
        document.querySelector(e.target.hash).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    },
    logout() {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('refresh_time');
        this.$router.push('/ru/login');
      }
    },
    mobileActive() {
      this.mobileClick = true;
      document.body.classList.add('mobile__active');
    },
    headerLogin: function () {
      this.loginClick = !this.loginClick;
    },
    setLocale(locale) {
      if (this.$i18n.locale != locale) {
        this.$i18n.locale = locale;
        this.$router.push({
          params: { lang: locale },
        });
      }
    },
    searchSubmit(evt) {
      this.searchApplicate = null;
      const formData = new FormData(evt.target);

      api
        .get('search', {
          params: {
            query: this.searchText,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.searchApplicate = response.data;
          }
        });
    },
    resetUserActivityTimeout() {
      if (this.userActivityTimeout) clearTimeout(this.userActivityTimeout);
      this.userActivityTimeout = setTimeout(() => {
        this.logout();
      }, USER_ACTIVITY_THROTTLER_TIME);
    },
    activateActivityTracker() {
      window.addEventListener('mousemove', this.resetUserActivityTimeout);
      window.addEventListener('scroll', this.resetUserActivityTimeout);
      window.addEventListener('keydown', this.resetUserActivityTimeout);
      window.addEventListener('resize', this.resetUserActivityTimeout);

      this.resetUserActivityTimeout();
    },
    resetActivityTracker() {
      window.removeEventListener('mousemove', this.resetUserActivityTimeout);
      window.removeEventListener('scroll', this.resetUserActivityTimeout);
      window.removeEventListener('keydown', this.resetUserActivityTimeout);
      window.removeEventListener('resize', this.resetUserActivityTimeout);

      clearTimeout(this.userActivityTimeout);
    },
  },
  beforeDestroy() {
    this.resetActivityTracker();
  },
  mounted() {
    this.activateActivityTracker();
    let langClass = 'ru-RU';
    if (this.$i18n.locale == 'ru') {
      langClass = 'ru-RU';
    } else if (this.$i18n.locale == 'kz') {
      langClass = 'kz-KZ';
    } else if (this.$i18n.locale == 'en') {
      langClass = 'en-US';
    }

    let bviClass = new isvek.Bvi({
      lang: langClass,
    });
  },
  created() {
    const onClickOutside = (e) => {
      (this.searchClick = this.$el.contains(e.target) && this.searchClick),
        (this.searchApplicate = null);
    };
    document.addEventListener('click', onClickOutside);
    this.$on('hook:beforeDestroy', () => document.removeEventListener('click', onClickOutside));
  },
};
</script>
