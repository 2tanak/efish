import { api } from '@/boot/axios';

export default {
  data() {
    return {
      applicationsUser: null,
    };
  },
  watch: {
    '$store.state.userObject': {
      immediate: true,
      handler: function () {
        this.apiGetUserRegions();
      },
    },
  },
  computed: {
    userPond() {
      if (this.applicationsUser?.pond) {
        if (this.applicationsUser.pond.length > 0) {
          return this.applicationsUser.pond;
        }
      } else {
        return [];
      }
    },
  },
  methods: {
    apiGetUserRegions() {
      if (this.$store.state.userObject && this.$store.state.userObject.regions) {
        let array = [];
        this.$store.state.userObject.regions.find((element) => {
          array.push(element.region_id);
        });
        this.userRegions = array;
      }
    },
    apiGetUser() {
      api
        .get('/user/region')
        .then((response) => {
          if (response.data) {
            this.applicationsUser = response.data;
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
          }
        });
    },
  },
  beforeMount() {
    this.apiGetUser();
  },
};
