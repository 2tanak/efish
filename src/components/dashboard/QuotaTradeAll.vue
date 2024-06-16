<template>
  <div class="card__content--wrap" v-if="applicationTrade.length">
    <div class="content__title--text">
      {{ $t('dashboard.quota_trade_all.title') }}
    </div>

    <div class="card__content--body">
      <div class="chart__wrapper">
        <div class="chart__content">
          <div class="chart-content__info">
            <div class="chart-info__right">
              <div class="row">
                <div class="col-lg-12">
                  <div class="chart-quotatrade__wrap">
                    <div class="chart-item--quota" v-for="(serie, index) in series">
                      <div class="chart-item__text">
                        <span v-bind:style="'background-color:' + colors[index]"></span>
                        {{ serie.name }}
                      </div>
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
      applicationTrade: [],
      applicationQuota: [],
      applicationPermission: [],

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
      deep: true,
      immediate: true,
      handler() {
        this.apiGetData();
      },
    },
  },
  methods: {
    dataApplication() {
      this.series = [];
      this.chartOptions.colors = this.colors;

      let categories = [];
      let list = [];
      if (this.applicationPermission.length) {
        this.applicationPermission.find((element) => {
          list.push(element.date);
        });
      }
      if (this.applicationTrade.length) {
        this.applicationTrade.find((element) => {
          list.push(element.date);
        });
      }
      if (this.applicationTrade.length && this.applicationPermission.length) {
        list.sort();
      }

      if (this.applicationPermission && this.applicationPermission.length) {
        let summ = 0;
        let item = {
          name: 'Разрешения',
          data: [],
          date_label: [],
          summ: 0,
        };
        list.find((e) => {
          let missing = true;
          this.applicationPermission.find((element) => {
            if (e == element.date) {
              item.data.push(element.summ);
              item.date_label.push(element.date);
              summ += element.summ;
              missing = false;
            }
          });
          if (missing) {
            item.data.push(0);
            item.date_label.push(e);
          }
          categories.push(' ');
        });
        item.summ = summ;
        this.series.push(item);
      }

      if (this.applicationTrade && this.applicationTrade.length) {
        let summ = 0;
        let item = {
          name: 'Вылов',
          data: [],
          date_label: [],
          summ: 0,
        };
        list.find((e) => {
          let missing = true;
          this.applicationTrade.find((element) => {
            if (e == element.date) {
              item.data.push(element.summ);
              item.date_label.push(element.date);
              summ += element.summ;
              missing = false;
            }
          });
          if (missing) {
            item.data.push(0);
            item.date_label.push(e);
          }
          categories.push(' ');
        });
        item.summ = summ;
        this.series.push(item);
      }

      categories[0] = moment(list[0]).format('DD/MM/YYYY');
      categories[categories.length - 1] = moment(list[list.length - 1]).format('DD/MM/YYYY');
      this.chartOptions.xaxis.categories = categories;
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
      //   .get('permission/dashboard/chart', {
      //     params: filterParam,
      //   })
      //   .then((response) => {
      //     if (response.data) {
      //       this.applicationPermission = response.data.data;
      //       this.dataApplication();
      //     }
      //   });
      // api
      //   .get('quota/dashboard/chart', {
      //     params: filterParam,
      //   })
      //   .then((response) => {
      //     if (response.data) {
      //       this.applicationQuota = response.data.data;
      //       this.dataApplication();
      //     }
      //   });
      // api
      //   .get('trade/dashboard/chart', {
      //     params: filterParam,
      //   })
      //   .then((response) => {
      //     if (response.data) {
      //       this.applicationTrade = response.data.data;
      //       this.dataApplication();
      //     }
      //   });
    },
  },
};
</script>
