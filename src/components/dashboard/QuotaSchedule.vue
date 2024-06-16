<template>
  <div class="card__content--wrap" v-if="application.length">
    <div class="card__content--body">
      <div class="chart__wrapper">
        <div class="chart__content-header">
          <div class="content__title--text">
            {{ $t('dashboard.quota_schedule.title') }}
          </div>
        </div>

        <div class="chart__content">
          <div class="chart-content__info">
            <div class="chart-info__left">
              <div class="chart-info__title">
                {{ $t('dashboard.quota_schedule.caught') }}
              </div>
              <!--
                <div class="chart-info__desc">
                  Краткое описание
                </div>
                -->
            </div>
            <div class="chart-info__right">
              <div class="row">
                <div class="col-lg-2" v-for="(serie, index) in series">
                  <div class="chart-item">
                    <div class="chart-item__number">{{ serie.summ }} т.</div>
                    <div class="chart-item__text">
                      <span v-bind:style="'background-color:' + colors[index]"></span>
                      {{ serie.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                element.name.split(' ')[0] +
                ': ' +
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
  methods: {
    dataApplication() {
      if (this.application.length) {
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
      api.get('trade/dashboard/chart').then((response) => {
        if (response.data) {
          this.application = response.data.data;
          this.dataApplication();
        }
      });
    },
  },
  beforeMount() {
    this.apiGetData();
  },
};
</script>
