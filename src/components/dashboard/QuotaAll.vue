<template>
  <div class="card__content--wrap" v-if="application.length">
    <div class="content__title--text">
      {{ $t('dashboard.quota_all.title') }}
    </div>

    <div class="card__content--body">
      <div class="chart__wrapper">
        <div class="chart__content">
          <div class="chart-content__body">
            <apexchart
              :type="chartOptions.chart.type"
              :height="chartOptions.chart.height"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/boot/axios';
import moment from 'moment';
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      application: [],

      colors: ['#52A5FC', '#5ABB5E', '#D3E7FB', '#0A091D', '#F19797'],

      series: [],

      chartOptions: {
        chart: {
          height: 400,
          type: 'area',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          categories: [],
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            let resuls = '';
            w.config.series.find((element) => {
              resuls +=
                '<div class="item__row item__ac">' +
                // element.name.split(" ")[0] + ": " +
                element.name +
                '<span class="tooltip__b">' +
                element.data[dataPointIndex] +
                '</span>' +
                '</div>';
            });
            return (
              '<div class="tooltip__box">' +
              '<div class="tooltip__box--top">' +
              '<b>' +
              moment(w.config.series[0].date_label[dataPointIndex]).format('DD.MM.YYYY HH:mm') +
              '</b>' +
              '</div>' +
              resuls +
              '</div>'
            );
          },
        },
      },
    };
  },
  props: {
    filter: {
      type: Object,
    },
  },
  watch: {
    filter: {
      immediate: true,
      deep: true,
      handler() {
        this.apiGetData();
      },
    },
  },
  methods: {
    dataApplication() {
      if (this.application.length) {
        this.series = [];
        this.chartOptions.colors = this.colors;

        let summ = 0;
        let item = {
          name: 'Освоено',
          data: [],
          date_label: [],
          summ: 0,
        };
        let categories = [];
        let dateStart = this.application[0].date;
        let dateFinish = this.application[0].date;

        this.application.find((element) => {
          if (dateStart > element.date) dateStart = element.date;
          if (dateFinish < element.date) dateFinish = element.date;
          categories.push(' ');

          item.data.push(element.summ);
          item.date_label.push(element.date);
          summ += element.summ;
        });
        item.summ = summ;
        this.series.push(item);
        categories[0] = moment(dateStart).format('MM/YYYY');
        categories[categories.length - 1] = moment(dateFinish).format('MM/YYYY');
        this.chartOptions.xaxis.categories = categories;
      }
    },

    apiGetData() {
      let filterParam = {};

      if (this.filter.range_to) {
        filterParam.range_to = this.filter.range_to;
      }
      if (this.filter.range_from) {
        filterParam.range_from = this.filter.range_from;
      }
      if (this.filter.pond) {
        filterParam.pond_id = this.filter.pond.id;
      }
      if (this.filter.region) {
        filterParam.region_id = this.filter.region.id;
      }
      if (this.filter.user) {
        filterParam.user_id = this.filter.user.id;
      }

      // api
      //   .get('trade/dashboard/chart', {
      //     params: filterParam,
      //   })
      //   .then((response) => {
      //     if (response.data) {
      //       this.application = response.data.data;
      //       this.dataApplication();
      //     }
      //   });
    },
  },
};
</script>
