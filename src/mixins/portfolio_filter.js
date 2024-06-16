export default {
  methods: {
    filter(id) {
      if (id) {
        const cat = this.$store.getters.get_portfolioCat;
        const portfolio = cat.find((res) => {
          return res.id == id;
        });
        return portfolio.portfolio;
      } else {
        return this.$store.getters.get_portfolioCat;
      }
    },
  },
};
