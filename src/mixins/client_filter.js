export default {
  data() {
    return {
      pozhelaniya: [],
      //result:[],
      format: null,
      period: null,
      range: [],
      filter_flag: false,
    };
  },

  computed: {
    get_card() {
      return this.$store.getters['card/get_card'];
    },
    filter() {
      let result = null;
      const card = this.get_card;
      const filter = card.filter((item) => {
        result = null;

        if (this.period) {
          if (item[this.period] === '1' || item[this.period] === null || item[this.period] === '') {
            result = item[this.period].includes('1');
          }

          if (result) {
            return result;
          }
        }

        if (this.pozhelaniya.includes('svet')) {
          const svet = item.svet;
          if (svet) {
            result = item.svet.toLowerCase().includes('да');
          }

          if (result) {
            return result;
          }
        }

        if (this.pozhelaniya.includes('number')) {
          result = item.format.toLowerCase().includes('цифро'.toLowerCase());
          if (result) {
            return result;
          }
        }
        if (this.pozhelaniya.includes('statica')) {
          result = item.format.toLowerCase().includes('статичн'.toLowerCase());
          if (result) {
            return result;
          }
        }

        if (this.pozhelaniya.includes('storona')) {
          const a = item.storona;
          if (a === 'A' || a === 'a' || a === 'А' || a === 'а') {
            result = item.storona.includes(a);

            if (result) {
              return result;
            }
          }
        }

        if (this.format) {
          return item.format.toLowerCase().includes(this.format.toLowerCase());
        }

        if (this.range.length > 0) {
          const min = this.range[0];
          const max = this.range[1];
          if (item.arenda >= min && item.arenda <= max) {
            return true;
          }
        }
      });

      return filter;
    },
  },
};
