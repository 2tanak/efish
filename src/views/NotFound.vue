<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 offset-lg-4">
          <div class="login__lang header__lang">
            <HeaderLang></HeaderLang>
          </div>

          <div class="header__logo login__logo">
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

          <div class="not_found">
            <h1><center>404!</center></h1>
            <h5>
              <center>{{ $t('site.404') }}</center>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLang from '@/components/HeaderLang';

export default {
  components: {
    HeaderLang,
  },
  head: {
    title() {
      return {
        inner: '404!',
      };
    },
    meta: [],
  },
};
</script>

<style>
header .header__site--row {
  display: none;
}
</style>
