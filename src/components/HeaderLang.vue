<template>
  <ul>
    <li :class="{ 'header__lang--active': $i18n.locale == 'kz' }">
      <a href="#" @click.prevent="setLocale('kz')">Kz</a>
    </li>
    <li :class="{ 'header__lang--active': $i18n.locale == 'ru' }">
      <a href="#" @click.prevent="setLocale('ru')">Ru</a>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    setLocale(locale) {
      if (this.$i18n.locale != locale) {
        this.$i18n.locale = locale;
        this.$router.push({
          params: { lang: locale },
        });
      }
    },
  },
};
</script>
