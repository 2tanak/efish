<template>
  <div class="wrap__content">
    <!-- <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>-->

    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['FineManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">Проверка на наличие штрафов</div>
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
                              errorMessage.messages && errorMessage.messages.iin
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="iin"
                              placeholder="ИИН/БИН"
                            /><!--  value="900901350111" -->
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.iin"
                          >
                            <p v-for="massage in errorMessage.messages.iin">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Номер документа</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.docNum
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="docNum"
                              placeholder="Номер документа"
                            /><!--  value="041791118" -->
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.docNum"
                          >
                            <p v-for="massage in errorMessage.messages.docNum">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Дата выдачи</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.docIssueDate
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="date"
                              class="input-linck"
                              required=""
                              name="docIssueDate"
                              placeholder="Дата выдачи"
                            />
                            <!--  value="26.09.2016" -->
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.docIssueDate"
                          >
                            <p v-for="massage in errorMessage.messages.docIssueDate">
                              {{ massage }}
                            </p>
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
                  <div v-if="applications.response.responseInfo.status.code">
                    <center>
                      <strong>{{ applications.response.responseInfo.status.message }}</strong>
                    </center>

                    <div
                      v-if="
                        applications.response.responseData &&
                        applications.response.responseData.data
                      "
                    >
                      <div class="subject" v-if="applications.response.responseData.data.subject">
                        <p>
                          <strong>
                            {{ applications.response.responseData.data.subject.lname }}
                            {{ applications.response.responseData.data.subject.fname }}
                            {{ applications.response.responseData.data.subject.mname }}
                          </strong>
                          ({{ applications.response.responseData.data.subject.iin }})
                        </p>
                      </div>

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
                  <div v-else>
                    <center><strong>Штрафов не найдено</strong></center>
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

      errorMessage: {
        status: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      blockElemet: null,
      unlockElemet: null,

      filters: {
        search: '',
      },
      options: {
        itemsPerPage: 10,
        page: 1,
      },

      filterCategories: this.$t('orders.userList'),
      orderList: this.$t('orders.user'),

      headers: [
        { text: 'Id', value: 'id' },
        { text: this.$t('headers.fio'), value: 'name' },
        { text: this.$t('headers.status'), value: 'status' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '200px',
        },
        /*{ text: 'Ф.И.О субъекта рыбного хозяйства', value: 'name'},
        { text: 'Выданные разрешения', value: 'permissions' },
        { text: 'Дата получения разрешения', value: 'data' },
        { text: 'Результаты PDF', value: 'action', align:'center', sortable: false, width: '200px'},*/
      ],
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
      let issueDate = this.$options.filters.formatOnlyDate(fromEntries.docIssueDate);
      formData.delete('docIssueDate');
      formData.append('docIssueDate', issueDate);

      //api.get('fine',{
      api
        .post('integrations/shep/erap-request', formData)
        .then((response) => {
          //ersop-request
          if (response.status == 200) {
            this.applications = response.data.data;

            if (
              this.applications.response &&
              this.applications.response.responseData &&
              this.applications.response.responseData.data &&
              this.applications.response.responseData.data.items
            ) {
              this.items = this.applications.response.responseData.data.items.item
                .slice()
                .reverse();
            }

            this.applicationsSend = false;
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
