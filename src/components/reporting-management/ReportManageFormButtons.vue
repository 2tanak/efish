<template>
  <div class="reporting-btn">
    <div class="reporting-wrapper">
      <template v-if="edit">
        <button type="submit" class="input-btn form__line--btn">
          {{ $t('button.save') }}
        </button>
      </template>
      <template v-else-if="!signStatus">
        <a class="input-btn form__line--btn" @click.prevent="$modal.show('ReportManageModal')">
          {{ signStatus ? 'Подписан' : $t('button.ecp') }}
        </a>
        <router-link
          v-if="getReportEditLink"
          :to="getReportEditLink"
          class="input-btn form__line--btn form__line--btn-black"
        >
          {{ $t('button.edit') }}
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportManageFormButtons',
  props: {
    edit: {
      type: Boolean,
      default: true,
    },
    report: {
      type: String,
      default: '',
    },
    signStatus: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getReportEditLink() {
      if (!this.report) return '';
      return `/${this.$i18n.locale}/account/reporting/${this.report}/${this.$route.params.id}/edit`;
    },
  },
};
</script>
