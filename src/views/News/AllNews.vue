<template>
  <div class="wrap__content">
    <v-preloader v-if="news.length == 0"></v-preloader>

    <div class="container news__container">
      <div class="news__all__list">
        <p class="news__top__link mr-4 pointer" @click="$router.push('/' + $i18n.locale)">
          {{ $t('site.home_page') }}
        </p>
        <p class="news__top__link news__link__active pointer">{{ $t('site.news.title') }}</p>
      </div>

      <br />
      <div class="section__title">
        {{ $t('site.news.title') }}
      </div>

      <div class="news__all__list">
        <div class="row">
          <div class="col-lg-4 news__item--col" v-for="item in news" :key="item.id">
            <div class="news__item" @click="goTo(item.id)">
              <div class="news__item--img" v-if="item.images.length > 0">
                <img :src="urlApi + item.images[0].path" />
              </div>
              <div class="news__item--info">
                <div class="news__item--date">
                  {{ item.created_at | formatOnlyDate }}
                </div>
                <div class="news__item--title pointer" @click="goTo(item.id)">
                  {{ item.title }}
                </div>
                <div class="news__item--link">
                  <a class="pointer" @click="goTo(item.id)">
                    <img src="../../assets/img/icon-arrow-right-b.svg" />
                  </a>
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
      news: [],
    };
  },
  props: {},
  watch: {},
  mounted() {
    this.getNews();
  },
  methods: {
    goTo(id) {
      this.$router.push('/' + this.$i18n.locale + '/description/' + id);
    },
    getNews() {
      api
        .get('guest/news', {})
        .then((response) => {
          this.news = response.data.data;
        })
        .catch(() => {});
    },
  },
  head: {
    title() {
      return {
        inner: this.$t('site.news.title'),
      };
    },
    meta: function () {
      return [{ name: 'description', content: this.$t('site.news.description') }];
    },
  },
};
</script>
<style></style>
