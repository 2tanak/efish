<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader': !_getFishingPermits.length || !$store.state.userObject,
    }"
  >
    <v-preloader
      v-if="!_getFishingPermits.length || !$store.state.userObject"
      :message="errorMessage"
    ></v-preloader>

    <div class="container" v-if="_getFishingPermits.length && $store.state.userObject">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ApplicationPermissionsManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <FishingPermitTable :data="_getFishingPermits" />
          </div>
        </div>
      </div>
      <ReportManageErrorModal :message="message" :errorMessage="errorMessage" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ReportManageErrorModal from '@/components/reporting-management/ReportManageErrorModal.vue';
import FishingPermitTable from '@/views/account/fishing-permit/FishingPermitTable.vue';

export default {
  components: {
    ReportManageErrorModal,
    FishingPermitTable,
  },
  data() {
    return {
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
  computed: {
    ...mapGetters(['_getFishingPermits']),
  },
  mounted() {
    this._fetchFishingPermits();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  head: {
    title() {
      return {
        inner: this.$t('sidebar.elicense_permission'),
      };
    },
    meta: [],
  },
  methods: {
    ...mapActions(['_fetchFishingPermits']),
    checkError(error) {
      if (error?.response?.status > 500) {
        this.errorMessage.status = 500;
        this.errorMessage.text = this.$t('system_message.500');
      } else if (error?.response?.status == 401) {
        this.errorMessage.status = 401;
        this.errorMessage.text = error?.response?.data?.message;
        this.$router.push('/' + this.$i18n.locale + '/login');
      } else {
        this.errorMessage.status = 422;
        this.errorMessage.text = error?.response?.data?.message;
      }
      this.$modal.show('ReportManageErrorModal');
    },
  },
};
</script>
