<template>
  <div class="wrapper">
    <v-header @mobileActive="mobileActive"></v-header>

    <router-view />

    <v-footer-admin></v-footer-admin>
  </div>
</template>

<script>
export default {
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
