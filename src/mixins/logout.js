export default {
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$cookies.set('access_token', null);
      this.$cookies.set('user_id', null);
      this.$cookies.set('user', null);
      this.$auth.setUser(null);
    },
  },
};
