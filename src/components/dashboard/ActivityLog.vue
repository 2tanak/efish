<template>
  <div class="card__content--wrap" v-if="application.length">
    <div class="card__content-header dashboard__content-header">
      <div class="content__title">
        <div class="content__title--element">
          <div class="content__title--text">
            {{ $t('dashboard.activity_log.title') }}
          </div>
        </div>
      </div>
    </div>

    <div class="card__content--body">
      <div class="activity-log__wrapper">
        <div class="row card__content--row">
          <div class="col-lg-12" v-for="(item, itemInd) in application" :key="itemInd">
            <div class="activity-log__item">
              <div class="activity-log__item--top">
                <div class="activity-log__item--time">
                  {{ item.created_at | formatTime }}
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 6.87505V8.12505H10L6.5625 11.5625L7.45 12.45L12.4 7.50005L7.45 2.55005L6.5625 3.43755L10 6.87505H2.5Z"
                      fill="#0A091D"
                    />
                  </svg>
                </div>
                <div class="activity-log__item--date">
                  {{ item.created_at | formatFullDate }}
                  <span v-if="item.ip">(IP: {{ item.ip }})</span>
                </div>
              </div>
              <div class="activity-log__item--body">
                <div class="activity-log__item--text">
                  {{ item.message }}
                </div>
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
      application: [],
    };
  },
  methods: {
    apiGetData() {
      api.get('actionlog/dashboard').then((response) => {
        if (response.data) {
          this.application = (response.data || []).slice(0, 20);
        }
      });
    },
  },
  beforeMount() {
    this.apiGetData();
  },
};
</script>
