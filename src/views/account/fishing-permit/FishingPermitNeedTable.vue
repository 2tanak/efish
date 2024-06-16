<template lang="">
  <FishingPermitTable :back="back" :data="data" />
</template>

<script>
import { apiSecond } from '@/boot/axios';

import FishingPermitTable from '@/views/account/fishing-permit/FishingPermitTable.vue';

export default {
  components: { FishingPermitTable },
  props: {
    back: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this._fetchFishingPermits();
  },
  methods: {
    async _fetchFishingPermits() {
      apiSecond
        .get('/v2/r13-moosr3-services?filter[nullable]=false')
        .then((response) => {
          this.data = response.data.data || [];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
