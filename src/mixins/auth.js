export default {
  methods: {
    auth() {
      this.$store.dispatch('modalForms', 'Auth').then((response) => {
        $('.overlay').addClass('overlay-property');
      });
    },
  },
};
