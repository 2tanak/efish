export default {
  data() {
    return {
      comanda: [],
    };
  },
  methods: {
    loadPortfolio() {
      let cat_id = null;

      if (this.$route.params.id && this.$route.name === 'portfolio-id') {
        cat_id = this.$route.params.id;
      }

      if (this.$store.getters['portfolio/get_posts'].length <= 0 || cat_id != null) {
        this.gif_loader = true;
        this.$axios
          .$get('portfolio', {
            params: { page: 1, paginate: 8, cat_id: cat_id ? cat_id : null },
          })
          .then((res) => {
            if (res.length <= 0) {
              return [];
            }
            if (cat_id === null) {
              this.$store.commit('portfolio/setPosts', res.data);
            }
            this.portfolio = res.data;
            this.currentPage = res.current_page;
            this.lastPage = res.last_page;
            this.gif_loader = false;
            //this.$store.commit("setComanda",res);
          });
      } else {
        if (this.$store.getters['portfolio/get_posts'].length > 0) {
          const res = this.$store.getters['portfolio/get_posts'];
          this.portfolio = res.data;
          this.currentPage = res.current_page;
          this.lastPage = res.last_page;
        }
        return [];
      }
    },
    loadCategoryPortfolio() {
      if (this.$store.getters.get_portfolioCat === null) {
        this.$axios
          .$get('category-portfolio', {
            params: { page: 1, paginate: 8 },
          })
          .then((res) => {
            if (res.length <= 0) {
              return [];
            }

            this.currentPageTag = res.current_page;
            this.lastPageTag = res.last_page;
            this.$store.commit('setPortfolioCat', res);
            this.portfolio_category = res.data;
            //this.$store.commit("setComanda",res);
          });
      } else {
        if (this.$store.getters.get_portfolioCat) {
          const res = this.$store.getters.get_portfolioCat;
          this.portfolio_category = res.data;
          this.currentPageTag = res.current_page;
          this.lastPageTag = res.last_page;
          //return this.$store.getters.get_comanda;
        }
        return [];
      }
    },
    loadUslugi() {
      if (this.$store.getters['uslugi/get_uslugi'].length <= 0) {
        this.$axios
          .$get('uslugi', {
            //params: {page:1,paginate:12},
          })
          .then((res) => {
            if (res.length <= 0) {
              return [];
            }

            this.$store.commit('uslugi/setUslugi', res);
            this.uslugi = res;
            //this.$store.commit("setComanda",res);
          });
      } else {
        if (this.$store.getters['uslugi/get_uslugi'] > 0) {
          this.uslugi = this.$store.getters['uslugi/get_uslugi'];
          //return this.$store.getters.get_comanda;
        }
        return [];
      }
    },

    loadOtzyvy() {
      if (this.$store.getters.get_otzyv.length <= 0) {
        this.$axios
          .$get('otzyv', {
            params: {},
          })
          .then((res) => {
            if (res.length <= 0) {
              return [];
            }
            this.$store.commit('setOtzyv', res);
          });
      } else {
        if (this.$store.getters.get_otzyv.length > 0) {
          return this.$store.getters.get_otzyv;
        }
        return [];
      }
    },

    loadHeaderSlider() {
      if (this.$store.getters.get_slider.length <= 0) {
        this.$axios
          .$get('slider', {
            params: {
              //page: 1,
              //paginate: 4,
            },
          })
          .then((res) => {
            this.$store.commit('setSlider', res);
          });
      } else {
        if (this.$store.getters.get_slider.length > 0) {
          return this.$store.getters.get_slider;
        }
        return [];
      }
    },
    loadVakansii() {
      if (this.$store.getters.get_vakansiya.length <= 0) {
        this.$axios
          .$get('vakansiya', {
            params: {
              page: 1,
              paginate: 9,
            },
          })
          .then((res) => {
            this.$store.commit('setVakansiya', res.data);
          });
      } else {
        if (this.$store.getters.get_vakansiya.length > 0) {
          return this.$store.getters.get_vakansiya;
        }
        return [];
      }
    },
    loadInstructor() {
      if (this.$store.getters['instructor/get_posts'].length <= 0) {
        this.$store.commit('setLoaderIntersect', true);

        this.$store.dispatch('instructor/get_posts', 1).then((res) => {
          if (res.data.length <= 0) {
            return [];
          }
          this.$store.commit('setLoaderIntersect', false);
          this.$store.commit('instructor/setPosts', res);

          //this.$store.commit('setLoaderIntersect',false);
          this.instructor = res.data;
        });
      } else {
        if (this.$store.getters['instructor/get_posts']?.data?.length > 0) {
          this.instructor = this.$store.getters['instructor/get_posts'].data;
        }
      }
    },

    loadBlog() {
      if (this.$store.getters['blog/get_posts'].length <= 0) {
        this.$store.commit('setLoaderIntersect', true);
        this.$store.dispatch('blog/get_posts', 1).then((res) => {
          if (res.data.length <= 0) {
            return [];
          }

          this.$store.commit('setLoaderIntersect', false);
          this.blog = res.data;
          this.currentPage = res.current_page;
          this.lastPage = res.last_page;
        });
      } else {
        if (this.$store.getters['blog/get_posts']?.data?.length > 0) {
          this.blog = this.$store.getters['blog/get_posts'].data;
        }
      }
    },
  },
};
