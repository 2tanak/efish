<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ApplicationPermissionsManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack :title="$t('sidebar.elicense_permission')" />
              <div class="card__content--body">
                <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование региона</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <region
                            :required="true"
                            :disabled="isNotEditable"
                            :modelValue="region"
                            :confinesValue="getUserRegions"
                            :placeholder="$t('placeholder.choose')"
                            v-on:update:modelValue="region = $event"
                          ></region>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование водоема</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <Pond
                              :required="true"
                              :modelValue="pond"
                              :disabled="isNotEditable"
                              :name="'farm_id'"
                              :placeholder="$t('placeholder.choose')"
                              v-on:update:modelValue="pond = $event"
                            ></Pond>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="form__line" />

                  <button v-if="!isNotEditable" type="submit" class="input-btn form__line--btn">
                    {{ $t('button.save') }}
                  </button>
                </form>

                <ReportManageErrorModal :message="message" :errorMessage="errorMessage" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { apiSecond } from '@/boot/axios';

import Region from '@/components/components/Inputs/region';
import Pond from '@/components/components/Inputs/pond';
import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageErrorModal from '@/components/reporting-management/ReportManageErrorModal.vue';

export default {
  components: {
    Region,
    Pond,
    HeaderBack,
    ReportManageErrorModal,
  },
  props: {
    statusPage: {
      type: String,
      default: 'create',
    },
  },
  validations: {
    region: {},
    pond: {},
  },
  data() {
    return {
      region: null,
      pond: null,
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
    };
  },
  computed: {
    ...mapGetters(['_getRegionList']),
    isNotEditable() {
      return this.statusPage == 'show';
    },
    getUserRegions() {
      if (this.$store.state.userObject && this.$store.state.userObject.regions) {
        return this.$store.state.userObject.regions.map((element) => {
          return element.region_id;
        });
      }
      return [];
    },
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
  mounted() {
    this.getSelectedData();
  },
  methods: {
    getSelectedData() {
      apiSecond
        .get(`/v2/r13-moosr3-services/${this.$route.params.id}`)
        .then((response) => {
          this.region = response.data.data.region?.id;
          this.pond = response.data.data.reservoir?.id;
        })
        .catch((error) => {
          this.checkError(error);
        })
        .finally(() => {
          document.querySelector('.preloader').classList.remove('active');
        });
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        document.querySelector('.preloader').classList.add('active');

        const formData = new FormData();
        formData.append('region_id', this.region);
        formData.append('reservoir_id', this.pond);

        apiSecond
          .post(`/v2/r13-moosr3-services/${this.$route.params.id}`, formData)
          .then(() => {
            this.$router.push(`/${this.$i18n.locale}/account/fishing-permit`);
          })
          .catch((error) => {
            this.checkError(error);
          })
          .finally(() => {
            document.querySelector('.preloader').classList.remove('active');
          });
      }
    },
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

<style scoped></style>
