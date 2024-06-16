<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader':
        !applications ||
        !application ||
        !_getPools ||
        !_getFishes ||
        !_getPondList ||
        !_getRegionList ||
        !applicationsUser,
    }"
  >
    <v-preloader
      v-if="
        !applications ||
        !application ||
        !_getPools ||
        !_getFishes ||
        !_getPondList ||
        !_getRegionList ||
        !applicationsUser
      "
      :message="errorMessage"
    ></v-preloader>

    <div
      class="container"
      v-if="
        applications &&
        application &&
        _getPools &&
        _getFishes &&
        _getPondList &&
        _getRegionList &&
        applicationsUser
      "
    >
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['QuotaManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__page--back">
                    <a @click="$router.go(-1)">
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.125 5.25L7.875 10.5L13.125 15.75"
                          stroke="#52A5FC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                  <div class="content__title--element">
                    <div class="content__title--text">Редактирование квоты</div>
                    <div class="content__title--subtext">
                      {{ applications.name }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Наименование квоты</div>
                  </div>
                  <div class="form__line--right">
                    <div class="row">
                      <div class="col-xl-5">
                        <div
                          class="form__line--input"
                          :class="[
                            errorMessage.messages && errorMessage.messages.name
                              ? 'input--error'
                              : '',
                          ]"
                        >
                          <input
                            type="text"
                            disabled
                            class="input-linck"
                            required=""
                            name="name"
                            :value="applications.name"
                            placeholder="Наименование"
                          />
                        </div>
                        <div
                          class="input-required"
                          v-if="errorMessage.messages && errorMessage.messages.name"
                        >
                          <p v-for="massage in errorMessage.messages.name">{{ massage }}</p>
                        </div>
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
                          <input
                            type="text"
                            class="input-linck"
                            required=""
                            disabled
                            :value="applications.pond.value"
                            placeholder="Наименование"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form__line form__line--margin" v-for="(item, index) in fildsList">
                  <div class="form__line--left">
                    <div class="form__line--title">Субъект рыбного хозяйства</div>
                  </div>
                  <div class="form__line--right">
                    <div class="form__line--children">
                      <div class="row align-items-center">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              min="0"
                              class="input-linck"
                              :name="'declarer[' + index + ']'"
                              disabled
                              v-model="item.name"
                              placeholder="Субъект"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="form-quota__info">
                        <div class="form-quota__head">
                          <div class="row align-items-center">
                            <div class="col-xl-5">
                              <div class="form-quota__title">
                                {{ item.company.first_name }} {{ item.company.last_name }}
                                {{ item.company.middle_name }} ({{ item.company.name_company }} БИН
                                {{ item.company.iin_bin }})
                              </div>
                            </div>
                          </div>

                          <div class="quota-fish__line">
                            <div class="row align-items-center">
                              <div class="col-xl-5">
                                <div class="form__line--title">Рейтинговый коэффициент</div>
                                <div class="form__line--input">
                                  <input
                                    type="text"
                                    class="input-linck"
                                    disabled
                                    :name="'rating[' + item.company.iin_bin + ']'"
                                    required
                                    :value="fildsList[index].rating"
                                    placeholder="Рейтинговый коэффициент"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="quota-fish__line">
                            <div class="row align-items-center">
                              <div class="col-xl-5">
                                <div class="form__line--title">Коэффициент изъятия</div>
                                <div class="form__line--input">
                                  <input
                                    type="text"
                                    class="input-linck"
                                    disabled
                                    :name="'coefficient[' + item.company.iin_bin + ']'"
                                    required
                                    :value="fildsList[index].coefficient"
                                    placeholder="Коэффициент изъятия"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="form-quota__body">
                          <div class="form-quota__fish">
                            <div class="row align-items-center">
                              <div class="col-xl-5">
                                <div class="quota-fish__title">
                                  <div class="row align-items-center">
                                    <div class="col-xl-7">
                                      <div class="form__line--title">
                                        Виды рыб по выбранному бассейну
                                      </div>
                                    </div>
                                    <div class="col-xl-5">
                                      <div class="form__line--title">Выделяемая квота (тон.)</div>
                                    </div>
                                  </div>
                                </div>
                                <!-- /.quota-fish__title -->
                              </div>
                            </div>

                            <div class="quota-fish__line" v-for="(fish, fishIndex) in item.fishs">
                              <div
                                class="quota-fish__wrapper"
                                :class="[
                                  errorMessage.messages &&
                                  errorMessage.messages[item.company.iin_bin] &&
                                  errorMessage.messages[item.company.iin_bin][fish.fish.id]
                                    ? 'input--error'
                                    : '',
                                ]"
                              >
                                <div class="row align-items-center">
                                  <div class="col-xl-5">
                                    <div class="quota-fish__item">
                                      <div class="row align-items-center">
                                        <div class="col-xl-7">
                                          <div class="form__line--input">
                                            <input
                                              type="text"
                                              disabled
                                              required=""
                                              v-model="fish.fish.name"
                                              class="input-linck"
                                            />
                                          </div>
                                        </div>
                                        <div class="col-xl-5">
                                          <div class="form__line--input">
                                            <input
                                              type="number"
                                              step=".01"
                                              min="0"
                                              disabled
                                              class="input-linck"
                                              required=""
                                              v-model="fish.value"
                                              @input="sumQuota()"
                                              placeholder="0"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <!-- /.quota-fish__line -->
                                  </div>
                                </div>
                              </div>
                              <div
                                class="input-required"
                                v-if="
                                  errorMessage.messages &&
                                  errorMessage.messages[item.company.iin_bin] &&
                                  errorMessage.messages[item.company.iin_bin][fish.fish.id]
                                "
                              >
                                <p
                                  v-for="massage in errorMessage.messages[item.company.iin_bin][
                                    fish.fish.id
                                  ]"
                                >
                                  {{ massage }}
                                </p>
                              </div>
                              <!-- /.quota-fish__line--wrapper -->
                            </div>
                            <!-- /.quota-fish__line -->

                            <div class="row align-items-center">
                              <div class="col-xl-5">
                                <div class="quota-fish__footer">
                                  Общая выделяемая квота
                                  <strong> {{ quotaSum[index] }} тон.</strong>
                                </div>
                                <!-- /.quota-fish__footer -->
                              </div>
                            </div>
                          </div>
                          <!-- /.form-quota__fish -->
                        </div>
                        <!-- /.form-quota__body -->
                      </div>
                      <!-- /.form-line__quota -->
                    </div>
                  </div>
                </div>

                <div class="form__line">
                  <div class="form__line--left"></div>
                  <div class="form__line--right">
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
      application: null,
      applicationsUser: null,

      userValue: null,
      regionValue: null,
      poolValue: null,
      reservoirsValue: null,

      quotaFish: [],
      quotaValue: [],
      quotaSum: [],
      finalSum: 0,

      fildsNew: '',
      fildsList: [],
      fildsIndex: 0,

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
  watch: {
    quotaList: {
      handler() {
        this.sumQuota();
      },
    },
    applicationsList: {
      handler() {
        this.applicationsQuota();
      },
    },
  },
  computed: {
    ...mapGetters(['_getRegionList', '_getPondList', '_getPools', '_getFishes']),
    quotaList() {
      const { quotaValue, quotaFish, fildsList } = this;
      return { quotaValue, quotaFish, fildsList };
    },

    applicationsList() {
      const { applications, _getFishes, applicationsUser } = this;
      return { applications, _getFishes, applicationsUser };
    },

    formList() {
      this.regionValue = this._getRegionList.find((element) => {
        if (this.applications.region_id == element.id) return element;
      });

      let pondList = [];
      pondList = this._getPondList.filter((element) => {
        if (this.regionValue && this.regionValue.links) {
          return this.regionValue.links.find((selected) => {
            return element.id == selected.item_id ? true : false;
          });
        }
      });

      let list = {
        /*pool: this._getPools,
        region: regionList,*/
        pond: pondList,
        fish: this._getFishes,
        user: this.applicationsUser[0].users,
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList', '_fetchPondList', '_fetchPools', '_fetchFishes']),
    applicationsQuota() {
      if (this.applications && this._getFishes && this.applicationsUser) {
        this.applications.items.find((element) => {
          let fishs = [];
          element.values.find((fishElement) => {
            let fish = this._getFishes.find((f) => {
              if (f.id == fishElement.fish_id) return f;
            });
            fishs.push({
              fish: fish,
              value: Number(fishElement.value),
            });
          });

          let userElement = null;
          if (this.applicationsUser) {
            userElement = this.applicationsUser[0].users.find((user) => {
              if (user.id == element.user_id) return user;
            });
          }

          let name =
            (userElement.first_name ? userElement.first_name + ' ' : '') +
            (userElement.last_name ? userElement.last_name + ' ' : '') +
            (userElement.middle_name ? userElement.middle_name + ' ' : '') +
            '(' +
            userElement.iin_bin +
            ')';

          this.fildsList.push({
            id: element.user_id,
            name: name,
            iin_bin: userElement.iin_bin,
            company: {
              id: element.user_id,
              first_name: userElement.first_name,
              last_name: userElement.last_name,
              middle_name: userElement.middle_name,
              name_company: userElement.name_company,
              iin_bin: userElement.iin_bin,
            },
            fishs: fishs,
            rating: element.rating,
            coefficient: element.coefficient,
            quotaSum: 0,
          });

          fishs = [];
          this.quotaSum.push(0);
        });
      }
    },
    sumQuota() {
      let finalSum = 0;
      this.fildsList.find((element, index) => {
        let sum = 0;
        element.fishs.find((fish) => {
          sum += Number(fish.value);
          finalSum += Number(fish.value);
        });
        if (this.quotaValue[index] && this.quotaFish[index] != null) {
          sum += Number(this.quotaValue[index]);
          finalSum += Number(this.quotaValue[index]);
        }

        this.finalSum = Math.round(finalSum * 1000) / 1000;
        this.quotaSum[index] = Math.round(sum * 1000) / 1000;
      });
    },
    addFild(index) {
      let iinTrue = true;
      this.fildsList.find((element) => {
        if (element.iin_bin == this.fildsNew) iinTrue = false;
      });
      if (iinTrue && this.fildsNew) {
        /////////
        if (this.fildsNew == '930614351175') {
          this.fildsList.push({
            iin_bin: '930614351175',
            company: {
              id: 1,
              first_name: 'Шынболат',
              last_name: 'Жаксыбаев',
              middle_name: '',
              name_company: 'ТОО Рыбак',
              iin_bin: '930614351175',
            },
            fishs: [],
            rating: '',
            coefficient: '',
            quotaSum: 0,
          });
        }
        if (this.fildsNew == '930614351188') {
          this.fildsList.push({
            iin_bin: '930614351188',
            company: {
              id: 1,
              first_name: 'Андрей',
              last_name: 'Букач',
              middle_name: '',
              name_company: 'ТОО Ишим',
              iin_bin: '930614351188',
            },
            fishs: [],
            rating: '',
            coefficient: '',
            quotaSum: 0,
          });
        }
        this.quotaSum.push(0);
        this.fildsIndex = this.fildsList.length;
        this.fildsNew = '';
      }
    },
    deleteFild(index) {
      this.fildsList.splice(index, 1);
      this.fildsIndex = this.fildsList.length;

      this.quotaFish[index] = null;
      this.quotaValue[index] = '';
      this.sumQuota();
    },
    addFildFish(index) {
      let fishTrue = true;
      if (!this.quotaFish[index] || this.quotaFish[index] == undefined) fishTrue = false;
      if (fishTrue) {
        this.fildsList[index].fishs.find((element) => {
          if (element.fish.id == this.quotaFish[index].id) fishTrue = false;
        });
      }

      if (this.quotaValue[index] != 0 && this.quotaValue[index] != undefined && fishTrue) {
        this.fildsList[index].fishs.push({
          fish: this.quotaFish[index],
          value: Number(this.quotaValue[index]),
        });
        this.fildsList[index].quotaSum += Number(this.quotaValue[index]);

        this.quotaFish[index] = null;
        this.quotaValue[index] = '';
      }
    },
    deleteFildFish(index, fishIndex) {
      this.fildsList[index].fishs.splice(fishIndex, 1);
      this.sumQuota();
    },
    /*_fetchPondList(){
      api.get('/catalog/region',{
        params: {
          regions: this.regionArray
        }
      }).then(response => {
        if (response.data) {
          response.data.find(element => {
            this.pondList.push(element.values)
          });
        }
      }).catch((error) => {
        if (error?.response?.status == 500) {
          this.errorMessage.status = 500;
          this.errorMessage.text = this.$t('system_message.500');
        }
        if (error?.response?.status == 401) {
          this.errorMessage.status = 401;
          this.errorMessage.text = error.response.data.error_message;
          this.$router.push('/'+this.$i18n.locale+'/login');
        }
        if (error?.response?.status == 422) {
          this.errorMessage.status = 422;
          this.errorMessage.text = error.response.data.error_message;
        }
      });
    },*/

    apiGetQuota() {
      api
        .get('quota/' + this.$route.params.id + '/item/' + this.$route.params.itemId)
        .then((response) => {
          if (response.data) {
            this.applications = response.data;
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
    apiGetQuotaParent() {
      api
        .get('quota/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.application = response.data;
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
    apiGetUsersList() {
      api
        .get('role/user/3')
        .then((response) => {
          if (response.data) {
            this.applicationsUser = response.data.data;
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
  beforeMount() {
    this._fetchPondList();
    this._fetchPools();
    this._fetchRegionList();
    this._fetchFishes();
    this.apiGetQuota();
    this.apiGetQuotaParent();
    this.apiGetUsersList();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
