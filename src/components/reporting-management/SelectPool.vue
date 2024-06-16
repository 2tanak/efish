<template>
  <ModalDefault :title="'Добавить водоем'" :name="'SelectPool'" @accept="addField">
    <MultiSelect
      label="name"
      :max-height="150"
      :max="3"
      :options="_getPondList"
      :preserve-search="true"
      track-by="id"
      class="multiselect__check"
      v-model="pool"
    >
      <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
      <template slot="noResult">{{ $t('components.not_found') }}</template>
      <template slot="noOptions">{{ $t('components.not_found') }}</template>
      <template slot="placeholder">{{ 'Выберите водоем' }}</template>
    </MultiSelect>
  </ModalDefault>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import MultiSelect from 'vue-multiselect';

import ModalDefault from '@/components/UI/ModalDefault.vue';

export default {
  name: 'SelectPool',
  components: {
    MultiSelect,
    ModalDefault,
  },
  data() {
    return {
      pool: null,
    };
  },
  emits: ['add'],
  computed: {
    ...mapGetters({
      _getPondList: '_getPondList',
    }),
  },
  methods: {
    ...mapActions(['_fetchPondList']),
    addField() {
      this.$emit('add', this.pool);
    },
  },
  async beforeMount() {
    await this._fetchPondList();
  },
};
</script>

<style scoped>
.brand-wrapper {
  margin-bottom: 15px;
}

.brand-item {
  margin-bottom: 10px;
}

.input-btn {
  padding: 10px 20px;
}

.item-wrap {
  background: #f7fbff;
  border-radius: 5px;
  padding: 12px 18px;
}

.item-wrap__header {
  position: relative;
  margin-bottom: 5px;
}

.item-wrap__title {
  font-weight: 600;
  font-size: 16px;
  color: #475f84;
}

.item-wrap__remove {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
