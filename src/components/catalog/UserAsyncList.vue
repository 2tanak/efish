<template>
  <Multiselect
    class="select__status"
    v-model="model"
    :options="users || []"
    :label="label"
    :clearOnSelect="false"
    :clear-on-select="false"
    :searchable="true"
    :track-by="trackBy"
    :placeholder="placeholder"
    :custom-label="customLabel"
    @search-change="requestUser"
  >
    <template slot="option" slot-scope="{ option }"
      >{{ option.first_name }} {{ option.last_name }} {{ option.middle_name }}({{
        option.iin_bin
      }})</template
    >
    <template slot="singleLabel" slot-scope="{ option }"
      >{{ option.first_name }} {{ option.last_name }} {{ option.middle_name }}({{
        option.iin_bin
      }})</template
    >
    <template slot="noOptions">{{ $t('components.user_not_found') }}</template>
    <template slot="noResult">{{ $t('components.not_found') }}</template>
    <template slot="afterList">
      <button v-if="next_page_url !== null" style="padding: 10px 15px" @click="requestUser">
        {{ $t('site.downloadMore') }}
      </button>
    </template>
  </Multiselect>
</template>

<script>
import { api } from '@/boot/axios';
import Multiselect from 'vue-multiselect';

export default {
  name: 'UserAsyncList',
  components: { Multiselect },
  props: {
    value: null,
    placeholder: {
      type: String,
      default: 'Субъект',
    },
    label: {
      type: String,
      default: 'name',
    },
    customLabel: null,
    trackBy: null,
  },
  data() {
    return {
      users: [],
      next_page_url: null,
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    requestUser() {
      api
        .get('role/user/3')
        .then((response) => {
          if (response.data) {
            this.users = response.data.data;
            this.next_page_url = response.data.next_page_url;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error?.response?.status == 500) {
              this.errorMessage.status = 500;
              this.errorMessage.text = this.$t('system_message.500');
            }
            if (error?.response?.status == 401) {
              this.errorMessage.status = 401;
              this.errorMessage.text = error.response.data.error_message;
              this.$router.push('/' + this.$i18n.locale + '/login');
            }
            if (error?.response?.status == 422) {
              this.errorMessage.status = 422;
              this.errorMessage.text = error.response.data.error_message;
            }
            if (error?.response?.status == 403) {
              this.errorMessage.status = 403;
              this.errorMessage.text = error?.response?.data?.message;
            }
          }
        });
    },
  },
  mounted() {
    this.requestUser();
  },
};
</script>
