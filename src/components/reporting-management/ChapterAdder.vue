<template>
  <ModalDefault :title="'Добавить раздел'" :name="'ChapterAdder'" @accept="accept">
    <MultiSelect
      label="value"
      :max-height="150"
      :max="3"
      :required="true"
      :options="getTypes"
      :preserve-search="true"
      track-by="id"
      class="multiselect__check mb-2"
      v-model="type"
    >
      <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}</template>
      <template slot="noResult">{{ $t('components.not_found') }}</template>
      <template slot="noOptions">{{ $t('components.not_found') }}</template>
      <template slot="placeholder">{{ $t('placeholder.choose') }}</template>
    </MultiSelect>
    <MultiSelect
      label="value"
      :max-height="150"
      :max="3"
      :required="true"
      :options="getSubTypes"
      :disabled="type === null || !getSubTypes || !getSubTypes.length"
      :preserve-search="true"
      track-by="id"
      class="multiselect__check mb-2"
      v-model="subType"
    >
      <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}</template>
      <template slot="noResult">{{ $t('components.not_found') }}</template>
      <template slot="noOptions">{{ $t('components.not_found') }}</template>
      <template slot="placeholder">{{ $t('placeholder.choose') }}</template>
    </MultiSelect>
  </ModalDefault>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import MultiSelect from 'vue-multiselect';

import ModalDefault from '@/components/UI/ModalDefault.vue';

export default {
  name: 'ChapterAdder',
  components: {
    MultiSelect,
    ModalDefault,
  },
  data() {
    return {
      type: null,
      subType: null,
    };
  },
  emits: ['add'],
  computed: {
    ...mapGetters({
      _getFishStateTypesList: '_getFishStateTypesList',
      _getFishStateSubTypesList: '_getFishStateSubTypesList',
    }),
    getTypes() {
      return this._getFishStateTypesList;
    },
    getSubTypes() {
      return this.type ? this._getFishStateSubTypesList(this.type.id) : [];
    },
  },
  watch: {
    type() {
      this.subType = null;
    },
  },
  methods: {
    ...mapActions(['_fetchFishStateTypesList']),
    accept() {
      this.$emit('add', {
        type: this.type,
        subType: this.subType,
      });
    },
  },
  mounted() {
    this._fetchFishStateTypesList();
  },
};
</script>
