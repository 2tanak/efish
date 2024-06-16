export default {
  methods: {
    async filter(formData) {
      const $this = this;
      $('.map-card-range').addClass('loader');
      var token = this.$store.getters.get_token;

      const filter = await this.$axios({
        method: 'post',
        url: 'admin/filter',
        data: formData,
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': `${token}`,
        },
      });
      $('.map-card-range').removeClass('loader');
      return filter;
    },
  },
};
