<template>
  <div class="wrapper">
    <v-header-admin @mobileActive="mobileActive"></v-header-admin>

    <router-view />

    <v-footer-admin></v-footer-admin>
  </div>
</template>

<script>
import { api } from '@/boot/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'Index',
  data() {
    return {
      mobileStatus: false,
    };
  },
  computed: {
    ...mapGetters(['_getUserObject']),
  },
  methods: {
    mobileActive(status) {
      this.mobileStatus = status;
    },
    apiGetUser() {
      api
        .get('user')
        .then((response) => {
          if (response.data) {
            if (response.data.role.accesses) {
              this.saveData(response.data);
            }
          }
        })
        .catch(() => {});
    },
    saveData(data) {
      this.$store.commit('SET_USER_OBJECT', data);
      this.$store.commit('getUserRoles', data.role.accesses);
      localStorage.setItem('USER_INFO_LOAD_TIME', new Date().getTime());
    },
  },
  beforeMount() {
    this.apiGetUser();
  },
};
</script>
