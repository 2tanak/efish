<template>
  <div class="header__mobile">
    <div class="header__mobile--top">
      <div class="header__mobile--logo">
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
      <div class="header__mobile--close">
        <div class="mobile__close--click" @click="mobileActive">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="#0E1839"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#0E1839"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="header__mobile--body">
      <div class="header__search--block">
        <div class="header__search--header">
          <form class="header__search--form" @submit.prevent="searchSubmit">
            <input type="text" :placeholder="$t('site.search')" name="query" v-model="searchText" />
            <button type="submit">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.77879 15.9454C13.4607 15.9454 16.4455 12.9606 16.4455 9.27873C16.4455 5.59683 13.4607 2.61206 9.77879 2.61206C6.09689 2.61206 3.11212 5.59683 3.11212 9.27873C3.11212 12.9606 6.09689 15.9454 9.77879 15.9454Z"
                  stroke="#52A5FC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.1121 17.6121L14.4871 13.9871"
                  stroke="#52A5FC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
        <div class="header__search--body" v-if="searchApplicate">
          <div
            class="search__result"
            v-for="item in searchApplicate.data"
            v-if="searchApplicate.data"
          >
            <router-link :to="'/' + $i18n.locale + '/description/' + item.id">{{ item.title }}</router-link>
          </div>
          <div class="search__result" v-if="searchApplicate.data_error">
            <a>{{ searchApplicate.data_error }}</a>
          </div>
        </div>
      </div>

      <div class="header__mobile--menu">
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
          <li>
            <a href="/#faq" @click="headerMenuClick">{{ $t('site.menu.faq') }}</a>
          </li>
          <li>
            <a :href="'/' + $i18n.locale + '/contact'">{{ $t('site.menu.contact') }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/boot/axios';

export default {
  data: function () {
    return {
      mobileClick: true,
      activeMenu: false,

      searchClick: false,
      searchApplicate: null,
      searchText: '',
    };
  },
  methods: {
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

    headerMenuClick(e) {
      if (e.target.hash && document.querySelector(e.target.hash)) {
        e.preventDefault();
        document.querySelector(e.target.hash).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    },
    mobileActive() {
      this.mobileClick = false;
      document.body.classList.remove('mobile__active');
    },
  },
};
</script>

<style scoped></style>
