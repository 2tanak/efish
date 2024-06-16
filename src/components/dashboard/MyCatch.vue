<template>
  <div
    class="card__content--wrap"
    v-if="application && application.trade && application.catch && reporting"
  >
    <div class="card__content-header dashboard__content-header">
      <div class="content__title">
        <div class="content__title--element">
          <div class="content__title--text">
            {{ $t('dashboard.quota_catch.title') }}
          </div>
        </div>
      </div>
    </div>

    <div class="card__content--body">
      <div class="row card__content--row">
        <div class="col-lg-4" v-if="application.trade">
          <div class="dashboard__quota dashboard__quota--white">
            <div class="dashboard__number">
              <div class="dashboard__number--number">
                {{ application.trade }}
              </div>
              <div class="dashboard__number--text">
                {{ $t('dashboard.quota_catch.trade.text') }}
              </div>
              <div class="dashboard__number--link">
                <router-link
                  :to="'/' + $i18n.locale + '/account/trade/create'"
                  class="btn--link btn--link--plus"
                >
                  {{ $t('dashboard.quota_catch.trade.link_text') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4" v-if="application.catch">
          <div class="dashboard__quota dashboard__quota--white">
            <div class="dashboard__number">
              <div class="dashboard__number--number">
                {{ application.catch }}
              </div>
              <div class="dashboard__number--text">
                {{ $t('dashboard.quota_catch.catch.text') }}
              </div>
              <div class="dashboard__number--link">
                <router-link
                  :to="'/' + $i18n.locale + '/account/trade'"
                  class="btn--link btn--link--plus"
                >
                  {{ $t('dashboard.quota_catch.catch.link_text') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4" v-if="reporting">
          <div class="dashboard__quota dashboard__quota--white">
            <div class="dashboard__number">
              <div class="dashboard__number--number">
                {{ reporting }}
              </div>
              <div class="dashboard__number--text">
                {{ $t('dashboard.quota_catch.reporting.text') }}
              </div>
              <div class="dashboard__number--link">
                <router-link
                  :to="'/' + $i18n.locale + '/account/reporting'"
                  class="btn--link btn--link--plus"
                >
                  {{ $t('dashboard.quota_catch.reporting.link_text') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/boot/axios';

export default {
  data() {
    return {
      application: null,
      reporting: 1,
    };
  },
  methods: {
    apiGetData() {
      api.get('trade/dashboard').then((response) => {
        if (response.data) {
          this.application = response.data.data;
        }
      });
      api.get('reports').then((response) => {
        if (response.data) {
          this.reporting = response.data.length;
        }
      });
    },
  },
  beforeMount() {
    this.apiGetData();
  },
};
</script>
