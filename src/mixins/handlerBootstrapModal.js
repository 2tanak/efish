export default {
  methods: {
    modal(data) {
      if (!data.type) {
        return false;
      }
      if (!data.message) {
        return false;
      }

      this.$store.commit('changeAlert', data.type);
      this.$store.commit('statusModal', true);
      this.$store.commit('setAlertmessage', data.message);
    },
  },
};
