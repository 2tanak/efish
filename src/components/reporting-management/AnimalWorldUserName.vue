<template>
  <FormGroupWrapper1 v-if="$store.state.userObject" :title="$t('inputs.user')">
    <TextInput
      :type="'text'"
      :placeholder="$t('inputs.user')"
      :disabled="true"
      :name="'AnimalWorldUserName'"
      :modelValue="getName"
    >
    </TextInput>
    <input type="hidden" name="user_id" :value="$store.state.userObject.id" />
  </FormGroupWrapper1>
</template>

<script>
import { mapGetters } from 'vuex';

import FormGroupWrapper1 from '@/components/UI/FormGroupWrappers/FormGroupWrapper1.vue';
import TextInput from '@/components/components/Inputs/TextInput.vue';

export default {
  name: 'AnimalWorldUserName',
  components: { FormGroupWrapper1, TextInput },
  computed: {
    ...mapGetters(['_getUserObject']),
    getName() {
      return this._getUserObject?.name_company
        ? `${this._getUserObject?.name_company} (${this._getUserObject?.iin_bin})`
        : this._getUserObject?.iin_bin;
    },
  },
  mounted() {
    this.$emit('mounted', this.getName);
  },
};
</script>
