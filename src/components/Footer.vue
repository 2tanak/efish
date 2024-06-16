<template>
  <footer class="footer__site">
    <div class="container">
      <div class="footer__row">
        <div class="footer__left">
          <div class="header__logo footer__logo">
            <div class="header__logo--left footer__logo--left">
              <a :href="'/' + $i18n.locale + '/'">
                <img src="../assets/img/logo-grey.svg" alt="" />
              </a>
            </div>
            <div class="header__logo--right footer__logo--right">
              <div class="header__logo--title footer__logo--title">
                {{ $t('site.logo.title') }}
              </div>
              <div class="header__logo--subtitle footer__logo--subtitle">
                {{ $t('site.logo.desc') }}
              </div>
            </div>
          </div>
        </div>
        <div class="footer__right">
          <div class="header__menu footer__menu">
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
            </ul>
            <ul class="menu">
              <li>
                <router-link :to="'/' + $i18n.locale + '/contact'">{{
                  $t('site.menu.contact')
                }}</router-link>
              </li>
              <li>
                <router-link :to="'/' + $i18n.locale + '/sitemap'">{{
                  $t('site.menu.sitemap')
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
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
  },
};
</script>
