<template>
  <div class="wrap__content">
    <div class="section__banner">
      <div class="container">
        <div class="banner__container">
          <div class="banner__container--info">
            <h1 class="banner__title">
              {{ $t('site.home.banner.title') }}
            </h1>
            <div class="banner__desc" v-html="$t('site.home.banner.desc')"></div>
            <div class="banner__link">
              <router-link :to="'/' + $i18n.locale + '/login'" class="link--btn link--btn-shadow"
                >{{ $t('site.home.banner.link') }} <img src="../assets/img/icon-user-w.svg"
              /></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section__block section__block--about" id="about">
      <div class="container">
        <div class="section__title">
          {{ $t('site.home.about.title') }}
        </div>
        <div class="about__block" v-html="$t('site.home.about.desc')"></div>
        <!--
        <div class="about__link">
          <a href="/" class="link--btn">Скачать инструкции <img src="../assets/img/icon-instruction-w.svg"></a>
        </div>
        -->
      </div>
    </div>

    <div class="section__block section__block--number">
      <div class="container">
        <div class="number__row">
          <div class="number__item--row">
            <div class="number__item--col">
              <div class="number__item">
                <div class="number__item--block">
                  <div class="number__item--top">
                    <div class="number__item--number">
                      <!-- <span>937</span> -->

                      <number
                        tag="span"
                        :from="0"
                        :to="937"
                        :duration="3"
                        :delay="1"
                        easing="Power1.easeOut"
                      />
                    </div>
                    <div class="number__item--icon">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24 40V20"
                          stroke="#52A5FC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M36 40V8"
                          stroke="#52A5FC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 40V32"
                          stroke="#52A5FC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="number__item--text">
                    {{ $t('site.home.number.number1') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="number__item--col">
              <div class="number__item number__item--active">
                <div class="number__item--block">
                  <div class="number__item--top">
                    <div class="number__item--number">
                      <p style="white-space: nowrap">
                        <span>+</span>
                        <number
                          tag="span"
                          :from="0"
                          :to="47"
                          :duration="3"
                          :delay="1"
                          easing="Power1.easeOut"
                        />
                      </p>
                    </div>
                    <div class="number__item--icon">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.6 26.4C11.328 26.4 9.488 25.568 8.08 23.904C6.704 22.208 6.016 20 6.016 17.28C6.016 14.56 6.704 12.368 8.08 10.704C9.488 9.008 11.328 8.16 13.6 8.16C15.84 8.16 17.664 8.992 19.072 10.656C20.48 12.32 21.184 14.528 21.184 17.28C21.184 20.032 20.48 22.24 19.072 23.904C17.664 25.568 15.84 26.4 13.6 26.4ZM33.952 8.4H36.784L13.84 42H11.008L33.952 8.4ZM13.6 24.24C15.168 24.24 16.416 23.632 17.344 22.416C18.304 21.168 18.784 19.456 18.784 17.28C18.784 15.104 18.304 13.408 17.344 12.192C16.416 10.944 15.168 10.32 13.6 10.32C12 10.32 10.736 10.944 9.808 12.192C8.88 13.44 8.416 15.136 8.416 17.28C8.416 19.424 8.88 21.12 9.808 22.368C10.736 23.616 12 24.24 13.6 24.24ZM34.192 42.24C31.952 42.24 30.128 41.408 28.72 39.744C27.312 38.048 26.608 35.84 26.608 33.12C26.608 30.4 27.312 28.208 28.72 26.544C30.128 24.848 31.952 24 34.192 24C36.464 24 38.288 24.848 39.664 26.544C41.072 28.208 41.776 30.4 41.776 33.12C41.776 35.84 41.072 38.048 39.664 39.744C38.288 41.408 36.464 42.24 34.192 42.24ZM34.192 40.08C35.792 40.08 37.056 39.456 37.984 38.208C38.912 36.96 39.376 35.264 39.376 33.12C39.376 30.976 38.912 29.28 37.984 28.032C37.056 26.784 35.792 26.16 34.192 26.16C32.624 26.16 31.36 26.784 30.4 28.032C29.472 29.248 29.008 30.944 29.008 33.12C29.008 35.296 29.472 37.008 30.4 38.256C31.36 39.472 32.624 40.08 34.192 40.08Z"
                          fill="#52A5FC"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="number__item--text">
                    {{ $t('site.home.number.number2') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="number__item--col">
              <div class="number__item">
                <div class="number__item--block">
                  <div class="number__item--top">
                    <div class="number__item--number">
                      <!-- <span>695</span> -->
                      <number
                        tag="span"
                        :from="0"
                        :to="695"
                        :duration="3"
                        :delay="1"
                        easing="Power1.easeOut"
                      />
                    </div>
                    <div class="number__item--icon">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M42 24C41.9998 27.8012 40.7963 31.5047 38.5619 34.5799C36.3275 37.655 33.1769 39.9438 29.5618 41.1183C25.9466 42.2929 22.0524 42.2927 18.4373 41.118C14.8222 39.9433 11.6718 37.6543 9.43753 34.5791C7.2033 31.5038 5.99997 27.8002 6 23.999C6.00003 20.1978 7.20341 16.4942 9.43768 13.419C11.672 10.3438 14.8224 8.05484 18.4375 6.88018C22.0527 5.70552 25.9468 5.70547 29.562 6.88003"
                          stroke="#52A5FC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="number__item--text">
                    {{ $t('site.home.number.number3') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section__block--map" id="map">
      <div class="container">
        <!-- <div class="map__container"> -->
        <v-kazmap></v-kazmap>

        <!-- </div> -->
      </div>
    </div>

    <div class="section__block section__block--news" id="news" v-if="news.length > 0">
      <div class="container">
        <div class="section__title">
          {{ $t('site.home.news.title') }}
        </div>
        <div class="news__sliders--block">
          <div class="news__item pointer" v-for="(item, index) in news" :key="index">
            <div class="news__item--img" v-if="item.images.length > 0">
              <img :src="urlApi + item.images[0].path" />
            </div>
            <div class="news__item--info">
              <div class="news__item--date">
                {{ item.created_at | formatOnlyDate }}
              </div>
              <div class="news__item--title">
                {{ item.title }}
              </div>
              <div class="news__item--link">
                <a>
                  <img src="../assets/img/icon-arrow-right-b.svg" />
                </a>
              </div>
              <router-link :to="'/' + $i18n.locale + '/description/' + item.id" class="news__link">
                {{ $t('site.home.news.more') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="news__sliders--bottom" v-if="news">
        <!-- <div class="item__row item__ac pagination">
                <div class="pagination__first  pointer" v-bind:class="{'pagination__active':paginationIndex==0}" @click="changePagination(0)"></div>
                <div class="pagination__second pointer" v-bind:class="{'pagination__active':paginationIndex==1}"  @click="changePagination(1)"></div>
        </div> -->
        <div class="news__all" @click="$router.push('/' + $i18n.locale + '/news')">
          <a class="news__all--link">{{ $t('site.home.news.all_news') }}</a>
        </div>
      </div>
    </div>

    <div class="section__block section__block--video" id="video">
      <div class="container">
        <div class="section__block--iframe">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/CJoDm4_SVSc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>

    <div class="section__block section__block--faq" id="faq">
      <div class="container">
        <div class="section__title">
          {{ $t('site.home.faq.title') }}
        </div>

        <div class="faq__row">
          <div
            class="faq__item"
            v-for="(item, index) in $t('site.faqList')"
            :key="index"
            :class="{ 'faq__item--active': faqActive == index }"
          >
            <div class="faq__item--top" @click="faqClick(index)">
              <div class="faq__item--title">
                {{ item.title }}
              </div>
              <div class="faq__item--arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <transition name="slide">
              <div class="faq__item--body" v-if="faqActive == index">
                <hr />
                <div class="faq__item--text" v-html="item.desc"></div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api, urlApi } from '@/boot/axios';
import '../assets/css/swiper.min.css';
import { directive } from 'vue-awesome-swiper';

import { MOCK_NEWS } from '@/mockData.js';

export default {
  directives: {
    swiper: directive,
  },
  data() {
    return {
      paginationIndex: 0,
      news: [],
      urlApi: urlApi,
      faqActive: 0,
      menuClick: false,
      videoOption: {
        slidesPerView: 3,
        spaceBetween: 0,
        centeredSlides: true,
        // loop: true,
        /*autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },*/
        pagination: {
          el: '.video__sliders--pagination',
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          520: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          992: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        },
      },
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    changePagination(index) {
      this.paginationIndex = index;

      if (index == 1) {
        document.getElementsByClassName('news__sliders--block')[0].scrollLeft =
          document.getElementsByClassName('news__sliders--block')[0].scrollLeft + 800;
      } else {
        document.getElementsByClassName('news__sliders--block')[0].scrollLeft =
          document.getElementsByClassName('news__sliders--block')[0].scrollLeft - 800;
      }
    },
    changedSlide(id) {
      this.$router.push('/' + this.$i18n.locale + '/description/' + id);
    },
    getNews() {
      this.news = MOCK_NEWS;
      // api
      //   .get('guest/news', {})
      //   .then((response) => {
      //     this.news = response.data.data;
      //   })
      //   .catch((error) => {
      //   });
    },
    faqClick: function (index) {
      if (this.faqActive == index) this.faqActive = null;
      else this.faqActive = index;
    },
  },
  head: {
    title() {
      return {
        inner: this.$t('site.home.title'),
      };
    },
    meta: function () {
      return [{ name: 'description', content: this.$t('site.recovery.description') }];
    },
  },
};
</script>

<style></style>
