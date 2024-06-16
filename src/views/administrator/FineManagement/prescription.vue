<template>
  <div class="wrap__content">
    <!-- <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>-->

    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['PrescriptionManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">Проверка на наличие предписания</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Введите ИИН/БИН</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.bin
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="bin"
                              placeholder="ИИН/БИН"
                            /><!--  value="900901350111" -->
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.bin"
                          >
                            <p v-for="massage in errorMessage.messages.bin">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Дата начала проверки</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.dateBegin
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="date"
                              class="input-linck"
                              required=""
                              name="dateBegin"
                              placeholder="Дата"
                            />
                            <!--  value="26.09.2016" -->
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.dateBegin"
                          >
                            <p v-for="massage in errorMessage.messages.dateBegin">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Дата окончания проверки</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.dateEnd
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="date"
                              class="input-linck"
                              required=""
                              name="dateEnd"
                              placeholder="Дата"
                            />
                            <!--  value="26.09.2016" -->
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.dateEnd"
                          >
                            <p v-for="massage in errorMessage.messages.dateEnd">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left"></div>
                    <div class="form__line--right">
                      <div class="input__row">
                        <button class="input-btn form__line--btn">Проверить</button>
                      </div>

                      <div
                        class="form__block--line form__messages"
                        v-if="message.status"
                        :class="{
                          'form__messages--error': message.status != 200,
                          'form__messages--success': message.status == 200,
                        }"
                      >
                        <label class="form__block--input">
                          <span class="form__block--title">
                            {{ message.text }}
                          </span>
                        </label>
                      </div>
                      <div
                        class="form__block--line form__messages"
                        v-if="errorMessage.text"
                        :class="{
                          'form__messages--error': errorMessage.status != 200,
                          'form__messages--success': errorMessage.status == 200,
                        }"
                      >
                        <label class="form__block--input">
                          <span class="form__block--title">
                            {{ errorMessage.text }}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>

                <div v-if="!applications && applicationsSend">
                  <v-preloader :message="errorMessage"></v-preloader>
                </div>
                <div v-else-if="!applicationsSend && applications">
                  <div v-if="applications">
                    <center>
                      <strong
                        >Заявка отправлена(№ заявки {{ applications.response.messageId }})</strong
                      >
                    </center>
                  </div>
                  <div v-else>
                    <center><strong>Штрафов не найдено</strong></center>
                  </div>
                </div>

                <div v-if="items">
                  <div v-for="item in items">
                    <hr style="border-top-width: 3px; border-color: #52a5fc" />
                    <table class="table table-striped">
                      <tr v-for="(tr, trKey) in item">
                        <td style="width: 250px">{{ trKey }}</td>
                        <td>
                          <strong>{{ tr }}</strong>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api, urlApi } from '@/boot/axios';
import axios from 'axios';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
    axios,
  },
  data() {
    return {
      urlApi: urlApi,

      items: null,
      applications: null,
      applicationsSend: false,

      applicationErsop: null,

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
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    onSubmit(evt) {
      this.applicationsSend = true;
      this.applications = null;
      this.items = null;
      this.errorMessage = {
        status: null,
        messages: null,
        text: null,
      };
      this.message = {
        status: null,
        text: null,
      };
      const formData = new FormData(evt.target);
      const fromEntries = Object.fromEntries(formData.entries());

      //api.get('fine',{
      api
        .post('integrations/shep/ersop-request', formData)
        .then((response) => {
          if (response.status == 200) {
            this.applications = response.data.data;

            this.applicationsSend = false;

            this.getErsop(fromEntries.bin);
          }
        })
        .catch((error) => {
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
          this.applicationsSend = false;
          this.errorMessage.messages = error.response.data.error_messages;
        });
    },

    getErsop(iin) {
      api
        .post('integrations/shep/ersop-get', {
          iin_bin: iin,
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.data) {
              this.applicationErsop = JSON.parse(response.data.data.data);
              if (
                JSON.parse(response.data.data.data).ResponseSubject &&
                JSON.parse(response.data.data.data).ResponseSubject.SubjectInfo.ObjectsData
              ) {
                this.items = JSON.parse(
                  response.data.data.data,
                ).ResponseSubject.SubjectInfo.ObjectsData;
              }
            }
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
            this.applicationsSend = false;
            this.errorMessage.messages = error.response.data.error_messages;
          }
        });
    },
  },
  beforeMount() {},
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  head: {
    title() {
      return {
        inner: this.$t('sidebar.users_parent'),
      };
    },
    meta: [],
  },
};
</script>
