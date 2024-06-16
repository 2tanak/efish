<template>
  <div class="wrapper wrapper--site">
    <v-header @mobileActive="mobileActive"></v-header>
    <v-mobile-header @mobileActive="mobileActive"></v-mobile-header>

    <router-view />

    <v-footer></v-footer>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      mobileStatus: false,
    };
  },
  methods: {
    mobileActive(status) {
      this.mobileStatus = status;
    },
  },
  watch: {},
};
</script>
