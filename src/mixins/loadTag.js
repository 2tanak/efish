export default {
  data() {
    return {
      tag: [],
      currentPage: 0,
      lastPage: 0,
      page: 1,
    };
  },
  computed: {
    category_tag() {
      $('.more_metka').text('Загрузка...');
      this.$axios
        .$get('category-portfolio', {
          params: { page: 1, paginate: 3 },
        })
        .then((res) => {
          if (res.length <= 0) {
            return [];
          }
          $('.more_metka').text('Показать еще');
          this.tag = [...this.tag, ...this.$store.getters.get_portfolioCat];
        });
    },
  },
  methods: {
    handlersTag() {
      $('.more_metka').text('Загрузка...');

      if (this.$route.name === 'blog') {
        this.formats();
      }
      if (this.$route.name === 'portfolio' || this.$route.name === 'portfolio-id') {
        this.category_tag;
      }
    },

    formats() {
      this.$axios.$get('admin/formats', { params: { page: this.page } }).then((res) => {
        $('.more_metka').text('Показать еще');
        this.currentPage = res.current_page;
        this.lastPage = res.last_page;
        this.tag = [...this.tag, ...res.data];
      });
    },
  },
};
