<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !_getRegionList }">
    <v-preloader v-if="!_getRegionList" :message="errorMessage"></v-preloader>

    <div class="container" v-if="_getRegionList">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">Добавление нового отчета</div>
                    <div class="content__title--subtext">
                      Сведения о рыбохозяйственных водоемах и (или) участках местного значения
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST">
                  <!--  @submit.prevent="onSubmit" -->

                  <!--
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Наименование отчета
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input" :class="[errorMessage.messages && errorMessage.messages.name ? 'input--error' : '']">
                            <input type="text" class="input-linck" required="" v-model="name" value="" placeholder="Наименование">
                          </div>
                          <div class="input-required" v-if="errorMessage.messages && errorMessage.messages.name"><p v-for="massage in errorMessage.messages.name">{{ massage }}</p></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  -->

                  <div class="form__line">
                    <div class="modal__table--table">
                      <table class="table__limit table__reporting">
                        <thead>
                          <tr>
                            <td rowspan="2"></td>
                            <td rowspan="2">№</td>
                            <td rowspan="2">Наименование областей</td>
                            <td rowspan="2">
                              Код КАТО (Классификатор административно-территориальных объектов)
                            </td>
                            <td rowspan="2">
                              Количество обследованного водоема (с указанием общей площади (гектар))
                            </td>
                            <td rowspan="2">
                              Количество водоемов, которые будут обследованы (с указанием общей
                              площади (гектар))
                            </td>
                            <td rowspan="2">
                              Количество рыбохозяйственных водоемов, включенных в Перечень (согласно
                              постановлению областного акимата) (с указанием общей площади (гектар))
                            </td>
                            <td rowspan="1" colspan="2">
                              Закреплено рыбохозяйственных водоемов (согласно постановлению
                              областного акимата)
                            </td>
                            <td rowspan="2">
                              Количество не закрепленных рыбохозяйственных водоемов (с указанием
                              общей площади (гектар))
                            </td>
                            <td rowspan="2">
                              Количество выставляемых на повторный конкурс в текущем году
                              рыбохозяйственных водоемов и (или) участков (с указанием общей площади
                              (гектар))
                            </td>
                          </tr>
                          <tr>
                            <td rowspan="1">
                              Количество закрепленных водоемов и (или) участков (с указанием общей
                              площади (гектар))
                            </td>
                            <td rowspan="1">
                              Количество рыбохозяйственных организаций за которыми закреплены
                              водоемы
                            </td>
                          </tr>
                        </thead>

                        <thead>
                          <tr class="table__limit--number">
                            <td></td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                            <td>9</td>
                            <td>10</td>
                          </tr>
                        </thead>

                        <tbody>
                          <tr v-for="(item, index) in mejList">
                            <td class="td__input--controller" style="max-width: 50px">
                              <center>
                                <a
                                  class="tb__table--btn tb__table--delete"
                                  @click="deleteMejList(index)"
                                  v-tooltip.top-center="{
                                    content: $t('button.delete'),
                                    class: ['tooltip__btn'],
                                  }"
                                >
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M11.25 6.75L6.75 11.25"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M6.75 6.75L11.25 11.25"
                                      stroke="#F19797"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </a>
                              </center>
                            </td>
                            <td>
                              <center>{{ index + 1 }}</center>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input type="text" v-model="item.t_oblast" class="input-linck" />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input type="text" v-model="item.t_kato" class="input-linck" />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input type="text" v-model="item.s_reservoir" class="input-linck" />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="item.water_bodies"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="item.f_reservoirs"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="item.fix_f_reservoir['fixed_reservoirs']"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="item.fix_f_reservoir['fishery_organizations']"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="item.nonfixed_f_reservoirs"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="item.reservoirs_sites"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr class="tr__input--add">
                            <td colspan="11" class="td__input--add">
                              <div class="table__add">
                                <div class="table__add--icon" @click="addTableMej()">
                                  <svg
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12.8212 22.541C18.344 22.541 22.8212 18.0639 22.8212 12.541C22.8212 7.01817 18.344 2.54102 12.8212 2.54102C7.29832 2.54102 2.82117 7.01817 2.82117 12.541C2.82117 18.0639 7.29832 22.541 12.8212 22.541Z"
                                      stroke="black"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M12.8212 8.54102V16.541"
                                      stroke="black"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M8.82117 12.541H16.8212"
                                      stroke="black"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </div>
                                <div class="table__add--line"></div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--right">
                      <div class="input__row">
                        <button class="input-btn form__line--btn">
                          {{ $t('button.save') }}
                        </button>
                      </div>

                      <div class="row">
                        <div class="col-xl-12">
                          <div
                            class="form__block--line form__messages"
                            v-if="message.text"
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
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { api } from '@/boot/axios';

export default {
  data() {
    return {
      applications: null,
      applicationSubmit: null,
      name: '',
      mejList: [],
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
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
    addTableMej() {
      this.mejList.push({
        t_oblast: '',
        t_kato: '',
        s_reservoir: '',
        water_bodies: '',
        f_reservoirs: '',
        fix_f_reservoir: {
          fixed_reservoirs: '',
          fishery_organizations: '',
        },
        nonfixed_f_reservoirs: '',
        reservoirs_sites: '',
      });
    },
    deleteMejList(index) {
      this.mejList.splice(index, 1);
    },
    onSubmit(evt) {
      this.errorMessage = {
        status: null,
        messages: null,
        text: null,
      };
      this.message = {
        status: null,
        text: null,
      };
      // const formData = new FormData(evt.target);
      if (!this.mejList.length) {
        this.message = {
          status: '500',
          text: 'Таблица не заполнена',
        };
        return false;
      }

      api
        .post('/report/add', {
          name: this.name,
        })
        .then((response) => {
          this.applicationSubmit = response.data;
          this.onSubmitList();
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
          this.errorMessage.messages = error.response.data.error_messages;
        });
    },
    onSubmitList() {
      this.mejList.find((element) => {
        this.onSubmitTable(element);
      });

      this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/' + 5 });
    },
    onSubmitTable(element) {
      api
        .post('/report/add/indexfive', {
          report_fish_id: this.applicationSubmit.id,
          t_oblast: element.t_oblast,
          t_kato: element.t_kato,
          s_reservoir: element.s_reservoir,
          water_bodies: element.water_bodies,
          f_reservoirs: element.f_reservoirs,
          fix_f_reservoir: {
            fixed_reservoirs: element.fix_f_reservoir.fixed_reservoirs,
            fishery_organizations: element.fix_f_reservoir.fishery_organizations,
          },
          nonfixed_f_reservoirs: element.nonfixed_f_reservoirs,
          reservoirs_sites: element.reservoirs_sites,
        })
        .then((response) => {
          return true;
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
          this.errorMessage.messages = error.response.data.error_messages;
          return false;
        });
    },
  },
  beforeMount() {
    this._fetchRegionList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
