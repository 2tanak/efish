export default {
  methods: {
    handlerModal() {
      // document.querySelector('.overlay').setAttribute('class','overlay-property')
      const $this = this;
      this.$store.dispatch('modalForms', 'Zakaz').then((response) => {
        $('.overlay').addClass('overlay-property');
      });
    },
  },
};
