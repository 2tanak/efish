<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['Brigade']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack :title="$t('sidebar.brigade')" />
              <div class="card__content--body">
                <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование бригады</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.t_water
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required="true"
                              :disabled="isNotEditable"
                              :value="form.title"
                              @input="form.title = $event.target.value"
                            />
                            <input type="hidden" name="t_water" :value="form.title" />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.t_water"
                          >
                            <p
                              v-for="(massage, massageInd) in errorMessage.messages.t_water"
                              :key="massageInd"
                            >
                              {{ massage }}
                            </p>
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
import { convertObjectToFormData } from '@/formData';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageErrorModal from '@/components/reporting-management/ReportManageErrorModal.vue';

export default {
  name: 'BrigadeItem',
  components: {
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
    form: {
      title: {},
    },
  },
  data() {
    return {
      title: '',
      form: {
        title: null,
      },
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
    ...mapGetters(['_getBrigades']),
    isNotEditable() {
      return this.statusPage == 'show';
    },
    getCurBrigade() {
      return this._getBrigades.find((b) => b.id == this.$route.params.id);
    },
  },
  mounted() {
    if (this.getCurBrigade) {
      this.form.title = this.getCurBrigade.title;
    }
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        document.querySelector('.preloader').classList.add('active');

        let formData = convertObjectToFormData(this.form);

        apiSecond
          .post(
            this.$route.params.id
              ? `/v2/brigade/update/${this.$route.params.id}`
              : `/v2/brigade/store`,
            formData,
          )
          .then(() => {
            this.$router.push(`/${this.$i18n.locale}/account/brigade`);
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
