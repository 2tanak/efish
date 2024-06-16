export default {
  methods: {
    lazyLoadingImg() {
      const options = {
        type: Object,
        root: document.querySelector('.card-item-wrap'),
      };

      var observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const path = entry.target.getAttribute('data-src');
            entry.target.setAttribute('src', path);
            observer.unobserve(entry.target);
          }
        });
      }, options);

      const img = $('.card-item-wrap .img');
      const ar = Object.entries(img);

      for (let i = 0; i < 10; i++) {
        observer.observe(ar[i][1]);
      }
    },
  },
};
