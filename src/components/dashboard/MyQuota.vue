<template>
  <div class="card__content--wrap" v-if="application">
    <div class="card__content-header dashboard__content-header">
      <div class="content__title">
        <div class="content__title--element">
          <div class="content__title--text">
            {{ $t('dashboard.my_quota.title') }}
          </div>
        </div>
      </div>
    </div>
    <div class="card__content--body">
      <div class="row card__content--row">
        <div class="col-lg-8">
          <div class="dashboard__quota dashboard__quota--blue">
            <div class="row">
              <div class="col-lg-4 dashboard__col" v-if="application.total">
                <div class="dashboard__number dashboard__number--quota">
                  <div class="dashboard__number--number">
                    {{ application.total }}
                  </div>
                  <div class="dashboard__number--text">
                    {{ $t('dashboard.my_quota.application.quota.text') }}
                  </div>
                </div>
              </div>
              <!-- <div class="col-lg-3 dashboard__col">
                <div class="dashboard__number dashboard__number--quota">
                  <div class="dashboard__number--number">
                    {{ '' }}
                  </div>
                  <div class="dashboard__number--text">
                    {{ $t('dashboard.my_quota.application.permission.text') }}
                  </div>
                </div>
              </div> -->
              <div class="col-lg-4 dashboard__col" v-if="application.trade">
                <div class="dashboard__number dashboard__number--quota">
                  <div class="dashboard__number--number">
                    {{ application.trade }}
                  </div>
                  <div class="dashboard__number--text">
                    {{ $t('dashboard.my_quota.application.trade.text') }}
                  </div>
                </div>
              </div>

              <div class="col-lg-4 dashboard__col" v-if="application.remainder">
                <div class="dashboard__number dashboard__number--quota">
                  <div class="dashboard__number--number">
                    {{ application.remainder }}
                  </div>
                  <div class="dashboard__number--text">
                    {{ $t('dashboard.my_quota.application.summ.text') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="dashboard__quota dashboard__quota--blue">
            <div class="row">
              <div class="col-lg-12 dashboard__col" v-if="application.percentage">
                <div
                  class="dashboard__number dashboard__number--quota"
                  v-bind:class="{
                    'dashboard__quota--green': application.percentage > 25,
                    'dashboard__quota--error': application.percentage < 25,
                  }"
                >
                  <div class="dashboard__number--number">
                    {{ application.percentage }}
                  </div>
                  <div class="dashboard__number--text">
                    % {{ $t('dashboard.my_quota.permission') }}
                  </div>
                </div>
              </div>
              <!-- <div class="col-lg-6 dashboard__col" v-if="application.percentage">
                <div
                  class="dashboard__number dashboard__number--quota"
                  v-bind:class="{
                    'dashboard__quota--green': application.percentage > 25,
                    'dashboard__quota--error': application.percentage < 25,
                  }"
                >
                  <div class="dashboard__number--number">
                    {{ application.percentage }}
                  </div>
                  <div class="dashboard__number--text">% {{ $t('dashboard.my_quota.trade') }}</div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiSecond } from '@/boot/axios';

export default {
  data() {
    return {
      application: null,
    };
  },
  methods: {
    apiGetData() {
      apiSecond.get('/v2/estimateJournal/common').then((response) => {
        if (response.data) {
          this.application = response.data;
        }
      });
    },
  },
  beforeMount() {
    this.apiGetData();
  },
};
</script>
