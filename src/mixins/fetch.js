export default {
  async fetch() {
    const { store, error, $axios, app, route } = this.$nuxt.context;
    return false;
    this.gif_loader = false;
    //let blog = true;
    //let instrukcii = true;
    //let slider = true;
    //let otzyv = true;
    //let comanda = true;
    //let price = true;
    //let statistics = true;
    //let vakansiya = true;
    let portfolio = true;

    if (store.getters['blog/get_posts']?.data?.length > 0) {
      //blog = false;
    }
    /*
    if (store.getters["blog/get_posts"]?.data?.length > 0) {
      blog = false;
    }
	*/
    /*
    if (store.getters["instructor/get_posts"].length > 0) {
      instrukcii = false;
    }
	*/
    /*
    if (store.getters.get_slider.length > 0) {
      slider = false;
    }
    */
    if (store.getters.get_otzyv.length > 0) {
      //otzyv = false;
    }
    /*
    if (store.getters.get_comanda.length > 0) {
      comanda = false;
    }
	*/
    /*
    if (store.getters.get_pricePopular.length > 0) {
      price = false;
    }
	*/
    /*
    if (store.getters.get_statistics.length > 0) {
      statistics = false;
    }
   */
    /*
    if (store.getters.get_vakansiya?.data?.length > 0) {
      vakansiya = false;
    }
	*/
    if (store.getters['portfolio/get_posts'].length > 0) {
      portfolio = false;
    }
    if (
      //blog === false &&
      //instrukcii === false &&
      //slider === false &&
      //otzyv === false &&
      //comanda === false &&
      //price === false &&
      //statistics === false &&
      portfolio === false
      //vakansiya === false
    ) {
      return false;
    }

    let cat_id = null;
    if (route.params.id && this.$route.name === 'portfolio-id') {
      this.gif_loader = true;
      cat_id = route.params.id;
    }

    const multi = await $axios.$get('multi', {
      params: {
        //slider: slider,
        //otzyv: otzyv,
        //instrukcii: instrukcii,
        //comanda: comanda,
        //statistics: statistics,
        //vakansiya: vakansiya,
        //blog:blog,
        portfolio: portfolio,
        //price_popular: price,
        bind: {
          //vakansiya: { page: 1, paginate: 3 },
          //instrukcii: { page: 1, paginate: 3 },
          //blog: { page: 1, paginate: 9 },
          portfolio: { page: 1, paginate: 8, cat_id: cat_id ? cat_id : null },
        },
      },
    });

    if (route.params.id && this.$route.name === 'portfolio-id') {
      if (multi.portfolio?.data?.length > 0) {
        this.portfolio = multi.portfolio.data;
        this.currentPage = multi.portfolio.current_page;
        this.lastPage = multi.portfolio.last_page;
        this.gif_loader = false;
        if (this.currentPage >= this.lastPage) {
          this.show_button = false;
        }
      }
    } else {
      if (store.getters['portfolio/get_posts'].length <= 0) {
        store.commit('portfolio/setPosts', multi?.portfolio ? multi.portfolio : []);
      }
    }
    /*
	if (store.getters['blog/get_posts'].length <= 0) {
       store.commit("blog/setPosts", multi?.blog ? multi.blog : []);
	 }
	*/
    /*
    if (store.getters['instructor/get_posts'].length <= 0) {
	  store.commit("instructor/setPosts",multi?.instrukcii ? multi.instrukcii : []);
	}
	*/
    /*
    if (store.getters.get_slider.length <= 0) {
      store.commit("setSlider", multi?.slider ? multi.slider : []);
    }
   */
    /*
    if (store.getters.get_otzyv.length <= 0) {
      store.commit("setOtzyv", multi?.otzyv ? multi.otzyv : []);
    }
*/
    /*
    if (store.getters.get_comanda.length <= 0) {
      store.commit("setComanda", multi?.comanda ? multi.comanda : []);
    }
	*/
    /*
    if (store.getters.get_vakansiya <= 0) {
      store.commit(
        "setVakansiya",
        multi?.vakansiya ? multi.vakansiya.data : []
      );
    }
	*/
    /*
   if(store.getters.get_pricePopular.length <= 0){
     store.commit("setPricePopular", multi?.price ? multi.price : []);
    }
	*/
    /*
    if (store.getters.get_statistics.length <= 0) {
      store.commit(
        "setStatistics",
        multi?.statistics.sort((a, b) => a.uid - b.uid)
          ? multi?.statistics.sort((a, b) => a.uid - b.uid)
          : []
      );
    }
	*/
  },
};
