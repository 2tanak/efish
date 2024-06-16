<template>
  <div class="wrap__content">
    <div class="container news__container">
      <div class="item__column">
        <div class="item__row">
          <p class="news__top__link mr-4 pointer" @click="$router.push('/' + $i18n.locale)">
            {{ $t('site.home_page') }}
          </p>
          <p
            class="news__top__link mr-4 pointer"
            @click="$router.push('/' + $i18n.locale + '/news')"
          >
            {{ $t('site.news.title') }}
          </p>
          <p class="news__top__link news__link__active pointer">{{ news.title }}</p>
        </div>
      </div>

      <div class="item__column news__description">
        <p class="news__description__title">{{ news.title }}</p>
        <p class="news__description__date">{{ news.created_at | formatOnlyDate }}</p>

        <img
          v-if="news.images && news.images.length > 0"
          class="news__description__image mb-4"
          :src="urlApi + news.images[0].path"
        />

        <p class="news__description__text" v-html="news.description"></p>

        <div class="news__description__bottom item__row item__ac mb-4">
          <div class="item__abs news__description__count mr-4">
            <i class="mdi mdi-eye mr-2"></i>
            <p class="mb-0" v-if="news.read == 0">1</p>
            <p class="mb-0" v-else>{{ news.read }}</p>
          </div>
          <div class="item__abs news__description__source" v-if="news.source_link">
            <p class="mb-0 mr-4">{{ $t('site.news.title') }}</p>
            <a @click="sourceLink(news.source_link)" class="mb-0 pointer">{{ news.source_link }}</a>
          </div>
        </div>

        <div class="section__block section__block--news" id="news" v-if="all_news.length > 0">
          <div class="container">
            <div class="section__title">
              {{ $t('site.news.source') }}
            </div>
            <div class="news__sliders--block">
              <div class="news__item pointer" v-for="(item, index) in all_news" :key="index">
                <div class="news__item--img" v-if="item.images.length > 0">
                  <img :src="urlApi + item.images[0].path" />
                </div>
                <div class="news__item--info" @click="changedSlide(item.id)">
                  <div class="news__item--date">
                    {{ item.created_at | formatOnlyDate }}
                  </div>
                  <div class="news__item--title">
                    {{ item.title }}
                  </div>
                  <div class="news__item--link">
                    <a>
                      <img src="../../assets/img/icon-arrow-right-b.svg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="news__sliders--bottom" v-if="all_news">
              <!-- <div class="news__pagination">
                <div class="news__sliders--pagination sliders__pagination"></div>
              </div>
              <div class="item__row item__ac pagination">
                      <div class="pagination__first  pointer" v-bind:class="{'pagination__active':paginationIndex==0}" @click="changePagination(0)"></div>
                      <div class="pagination__second pointer" v-bind:class="{'pagination__active':paginationIndex==1}"  @click="changePagination(1)"></div>
              </div> -->
              <div class="news__all" @click="$router.push('/' + $i18n.locale + '/news')">
                <a class="news__all--link">{{ $t('site.home.news.all_news') }}</a>
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

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import '../../assets/css/swiper.min.css';

export default {
  components: {
    Multiselect,
    axios,
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      urlApi: urlApi,
      paginationIndex: 0,
      news: [],
      all_news: [],
      newsOption: {
        slideToClickedSlide: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.news__sliders--pagination',
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          480: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          520: {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          992: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        },
      },
    };
  },
  props: {},
  watch: {},
  beforeMount() {
    this.getNews();
  },
  mounted() {
    this.getAllNews();
    this.readNews();
  },
  methods: {
    readNews() {
      api
        .post('guest/news/read/' + this.$route.params.id, {})
        .then((response) => {
          this.news.read = response.data;
        })
        .catch(() => {});
    },
    changePagination(index) {
      this.paginationIndex = index;
      if (index == 1) {
        document.getElementsByClassName('news__sliders--block')[0].scrollLeft =
          document.getElementsByClassName('news__sliders--block')[0].scrollLeft + 1000;
      } else {
        document.getElementsByClassName('news__sliders--block')[0].scrollLeft =
          document.getElementsByClassName('news__sliders--block')[0].scrollLeft - 1000;
      }
    },
    cll(id) {
      window.scrollTo(0, -40);
      this.$router.push('/' + this.$i18n.locale + '/description/' + id);
      this.getNews();
    },
    getAllNews() {
      api
        .get('guest/news', {})
        .then((response) => {
          this.all_news = response.data.data;

          // this.all_news =  this.all_news.filter((item) => {
          //     return item.id != this.$route.params.id;
          // });
        })
        .catch(() => {});
    },
    sourceLink(link) {
      window.open(link, '_blank');
    },
    changedSlide(id) {
      api
        .get('guest/news/' + id, {})
        .then((response) => {
          this.news = response.data;
        })
        .catch(() => {});

      // this.all_news =  this.all_news.filter((item) => {
      //     return item.id != id;
      // });
    },
    getNews() {
      api
        .get('guest/news/' + this.$route.params.id, {})
        .then((response) => {
          this.news = response.data;
        })
        .catch(() => {});
    },
  },
  head: {},
};
</script>

<style></style>
