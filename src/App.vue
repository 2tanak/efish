<template>
  <div id="app" v-bind:class="{ 'home-page': classPage, mobile__active: mobileStatus }">
    <!--  class="wrapper"  -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      namePagePer: false,
      mobileStatus: false,
    };
  },
  computed: {
    classPage: function () {
      return this.namePageFunc();
    },
  },
  methods: {
    namePageFunc() {
      if (this.$route.name != 'Home') {
        return (this.namePagePer = false);
      } else {
        return (this.namePagePer = true);
      }
    },
    mobileActive(status) {
      this.mobileStatus = status;
    },
  },
  watch: {},
};
</script>

<style>
@import './assets/css/vue-multiselect.min.css';
@import './assets/css/v-tooltip.css';

@import './assets/css/vuetify.css';
@import './assets/css/bootstrap.min.css';

@import './assets/css/style.css';
@import './assets/css/media.css';
</style>
