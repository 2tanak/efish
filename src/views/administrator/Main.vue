<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="[]"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div
              class="card__content"
              v-if="$store.state.userObject && $store.state.userObject.role.name == 'declarer'"
            >
              <div class="card__content--wrap">
                <div class="card__content-header">
                  <div class="content__title">
                    <div class="content__title--element">
                      <div class="content__title--text">
                        {{ $t('admin.hello.title') }}
                      </div>
                      <div class="content__title--subtext">
                        {{ $t('admin.hello.desc') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <FishingPermitNeedTable
                v-if="$store.state.userObject && $store.state.userObject.role.name == 'declarer'"
                :back="false"
              />
              <v-myQuota></v-myQuota>
              <v-myCatch></v-myCatch>
              <v-log></v-log>
              <v-quota-schedule></v-quota-schedule>
            </div>
            <div class="card__content" v-else>
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('admin.hello.title') }}
                    </div>
                    <div class="content__title--subtext">
                      {{ $t('admin.hello.desc') }}
                    </div>
                  </div>
                </div>
              </div>
              <v-log></v-log>
              <div
                v-if="$store.state.userObject && $store.state.userObject.role.name == 'admin'"
                class="card__content--body"
              >
                <div class="row">
                  <div class="col-lg-4">
                    <div class="dashboard__item">
                      <div class="dashboard-item__head">
                        <div class="dashboard-item__number">
                          <span>7</span>{{ $t('admin.dashboard.total') }}
                        </div>
                        <!-- /.dashboard-item__number -->
                      </div>
                      <!-- /.dashboard-item__head -->
                      <div class="dashboard-item__body">
                        <div class="dashboard-item__text">
                          {{ $t('admin.dashboard.users') }}
                        </div>
                        <!-- /.dashboard-item__text -->
                      </div>
                      <!-- /.dashboard-item__body -->
                      <div class="dashboard-item__footer">
                        <router-link
                          :to="'/' + $i18n.locale + '/account/users/'"
                          class="dashboard-item__link"
                          >{{ $t('button.more') }}</router-link
                        >
                      </div>
                      <!-- /.dashboard-item__footer -->
                    </div>
                    <!-- /.dashboard__item -->
                  </div>
                  <!-- /.col-lg-4 -->
                  <div class="col-lg-4">
                    <div class="dashboard__item">
                      <div class="dashboard-item__head">
                        <div class="dashboard-item__number">
                          <span>3</span>{{ $t('admin.dashboard.total') }}
                        </div>
                        <!-- /.dashboard-item__number -->
                      </div>
                      <!-- /.dashboard-item__head -->
                      <div class="dashboard-item__body">
                        <div class="dashboard-item__text">
                          {{ $t('admin.dashboard.quota') }}
                        </div>
                        <!-- /.dashboard-item__text -->
                      </div>
                      <!-- /.dashboard-item__body -->
                      <div class="dashboard-item__footer">
                        <router-link
                          :to="'/' + $i18n.locale + '/account/quotas/'"
                          class="dashboard-item__link"
                          >{{ $t('button.more') }}</router-link
                        >
                      </div>
                      <!-- /.dashboard-item__footer -->
                    </div>
                    <!-- /.dashboard__item -->
                  </div>
                  <!-- /.col-lg-4 -->
                  <div class="col-lg-4">
                    <div class="dashboard__item">
                      <div class="dashboard-item__head">
                        <div class="dashboard-item__number">
                          <span>3</span>{{ $t('admin.dashboard.total') }}
                        </div>
                        <!-- /.dashboard-item__number -->
                      </div>
                      <!-- /.dashboard-item__head -->
                      <div class="dashboard-item__body">
                        <div class="dashboard-item__text">
                          {{ $t('admin.dashboard.applications') }}
                        </div>
                        <!-- /.dashboard-item__text -->
                      </div>
                      <!-- /.dashboard-item__body -->
                      <div class="dashboard-item__footer">
                        <router-link
                          :to="'/' + $i18n.locale + '/account/request_registration/'"
                          class="dashboard-item__link"
                          >{{ $t('button.more') }}</router-link
                        >
                      </div>
                      <!-- /.dashboard-item__footer -->
                    </div>
                    <!-- /.dashboard__item -->
                  </div>
                  <!-- /.col-lg-4 -->
                </div>
                <!-- /.row -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {api} from "@/boot/axios";
import MyQuota from '@/components/dashboard/MyQuota';
import MyCatch from '@/components/dashboard/MyCatch';
import ActivityLog from '@/components/dashboard/ActivityLog';
import QuotaSchedule from '@/components/dashboard/QuotaSchedule';
import FishingPermitNeedTable from '@/views/account/fishing-permit/FishingPermitNeedTable.vue';

export default {
  components: {
    'v-myQuota': MyQuota,
    'v-myCatch': MyCatch,
    'v-log': ActivityLog,
    'v-quota-schedule': QuotaSchedule,
    FishingPermitNeedTable,
  },
  data() {
    return {
      applications: null,
      applicationLimit: null,

      errorMessage: {
        status: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
    };
  },
  methods: {},
  beforeMount() {},
  beforeCreate() {},
};
</script>
