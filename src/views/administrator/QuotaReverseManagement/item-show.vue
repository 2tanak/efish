<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader':
        !_getPools || !_getFishes || !_getPondList || !_getRegionList || !applications,
    }"
  >
    <v-preloader
      v-if="!_getPools || !_getFishes || !_getPondList || !_getRegionList || !applications"
      :message="errorMessage"
    ></v-preloader>

    <div
      class="container"
      v-if="_getPools && _getFishes && _getPondList && _getRegionList && applications"
    >
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['QuotaReverseManagement']"></v-sidebar>
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
                    <div class="content__title--text">
                      {{ $t('sidebar.quotas_reverse') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="form__line">
                  <div class="form__line--left">
                    <div class="form__line--title">Наименование заявки</div>
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
                            class="input-linck"
                            required=""
                            name="name"
                            disabled
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
                        <div
                          class="form__line--input"
                          :class="[
                            errorMessage.messages && errorMessage.messages.pond_id
                              ? 'input--error'
                              : '',
                          ]"
                        >
                          <input
                            type="text"
                            class="input-linck"
                            required=""
                            name="name"
                            disabled
                            :value="applications.item.pond.value"
                            placeholder="Наименование водоема"
                          />
                        </div>
                        <div
                          class="input-required"
                          v-if="errorMessage.messages && errorMessage.messages.pond_id"
                        >
                          <p v-for="massage in errorMessage.messages.pond_id">{{ massage }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div>
                  <div class="form__line form__line--margin" v-for="(item, index) in fildsZeroList">
                    <div class="form__line--left">
                      <div class="form__line--title">Субъект лишаемый квоты</div>
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
                                  {{ item.company.middle_name }} ({{
                                    item.company.name_company
                                  }}
                                  БИН {{ item.company.iin_bin }})
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
                                <div class="quota-fish__wrapper">
                                  <div class="row align-items-center">
                                    <div class="col-xl-5">
                                      <div class="quota-fish__item">
                                        <div class="row align-items-center">
                                          <div class="col-xl-7">
                                            <div class="form__line--input">
                                              <input
                                                type="text"
                                                :value="fish.fish.values[0].value"
                                                disabled
                                              />
                                            </div>
                                          </div>
                                          <div class="col-xl-5">
                                            <div class="form__line--input">
                                              <input
                                                type="number"
                                                step=".01"
                                                min="0"
                                                class="input-linck"
                                                required=""
                                                disabled
                                                v-model="fish.value"
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
                              </div>
                              <!-- /.quota-fish__line -->
                            </div>
                            <!-- /.form-quota__fish -->
                          </div>
                          <!-- /.form-quota__body -->
                        </div>
                        <!-- /.form-line__quota -->
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div class="form__line form__line--margin" v-for="(item, index) in fildsList">
                    <div class="form__line--left">
                      <div class="form__line--title">Субъект для дополнительной квоты</div>
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
                                  {{ item.company.middle_name }} ({{
                                    item.company.name_company
                                  }}
                                  БИН {{ item.company.iin_bin }})
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
                                                :value="fish.fish.values[0].value"
                                                disabled
                                              />
                                            </div>
                                          </div>
                                          <div class="col-xl-5">
                                            <div class="form__line--input">
                                              <input
                                                type="number"
                                                step=".01"
                                                min="0"
                                                class="input-linck"
                                                required=""
                                                disabled
                                                v-model="fish.value"
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
                              </div>
                              <!-- /.quota-fish__line -->
                            </div>
                            <!-- /.form-quota__fish -->
                          </div>
                          <!-- /.form-quota__body -->
                        </div>
                        <!-- /.form-line__quota -->
                      </div>
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

      regionValue: null,
      poolValue: null,
      reservoirsValue: null,

      quotaFish: [],
      quotaValue: [],
      quotaSum: [],
      finalSum: 0,

      fildsZoro: '',
      fildsZeroList: [],
      fildsZeroIndex: 0,

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
    // '$store.state.userObject': {
    //   immediate: true,
    //   handler: function () {
    //     if (this.$store.state.userObject.regions) {
    //       this.$store.state.userObject.regions.find((element) => {
    //         this.regionArray.push(element.region_id);
    //       });
    //       if (this.regionArray != 'undefined' && this.regionArray) {
    //         this._fetchPondList();
    //       }
    //     }
    //   },
    // },

    quotaList: {
      handler() {
        this.sumQuota();
      },
    },
  },
  computed: {
    ...mapGetters(['_getRegionList', '_getPondList', '_getPools', '_getFishes']),
    quotaList() {
      const { quotaValue, quotaFish, fildsList } = this;
      return { quotaValue, quotaFish, fildsList };
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
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList', '_fetchPondList', '_fetchPools', '_fetchFishes']),
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
      this.fildsZeroList.find((element) => {
        if (element.iin_bin == this.fildsNew) iinTrue = false;
      });
      this.fildsList.find((element) => {
        if (element.iin_bin == this.fildsNew) iinTrue = false;
      });
      if (iinTrue && this.fildsNew) {
        let name =
          (this.fildsNew.first_name ? this.fildsNew.first_name + ' ' : '') +
          (this.fildsNew.last_name ? this.fildsNew.last_name + ' ' : '') +
          (this.fildsNew.middle_name ? this.fildsNew.middle_name + ' ' : '') +
          '(' +
          this.fildsNew.iin_bin +
          ')';

        this.fildsList.push({
          id: this.fildsNew.id,
          name: name,
          iin_bin: this.fildsNew.iin_bin,
          company: {
            id: this.fildsNew.id,
            first_name: this.fildsNew.first_name,
            last_name: this.fildsNew.last_name,
            middle_name: this.fildsNew.middle_name,
            name_company: this.fildsNew.name_company,
            iin_bin: this.fildsNew.iin_bin,
          },
          fishs: [],
          rating: '',
          coefficient: '',
          quotaSum: 0,
        });

        //this.userQuotaFildNew(this.fildsNew.id, this.fildsIndex);
        let fishs = [];
        if (this.fildsZeroList) {
          this.fildsZeroList.find((elementZero) => {
            if (elementZero.fishs) {
              elementZero.fishs.find((e) => {
                let fish = null;
                fish = e.fish;
                fish.value = '';
                fishs.push({
                  fish: fish,
                  value: fish.value,
                });
              });
            }
          });
        }
        this.fildsList[index].fishs = fishs;

        this.quotaSum.push(0);
        this.fildsIndex = this.fildsList.length;
        this.fildsNew = null;
      }
    },
    addZoroFild() {
      let iinTrue = true;
      this.fildsZeroList.find((element) => {
        if (element.iin_bin == this.fildsZoro) iinTrue = false;
      });
      if (iinTrue && this.fildsZoro) {
        let name =
          (this.fildsZoro.first_name ? this.fildsZoro.first_name + ' ' : '') +
          (this.fildsZoro.last_name ? this.fildsZoro.last_name + ' ' : '') +
          (this.fildsZoro.middle_name ? this.fildsZoro.middle_name + ' ' : '') +
          '(' +
          this.fildsZoro.iin_bin +
          ')';

        this.fildsZeroList.push({
          id: this.fildsZoro.id,
          name: name,
          iin_bin: this.fildsZoro.iin_bin,
          company: {
            id: this.fildsZoro.id,
            first_name: this.fildsZoro.first_name,
            last_name: this.fildsZoro.last_name,
            middle_name: this.fildsZoro.middle_name,
            name_company: this.fildsZoro.name_company,
            iin_bin: this.fildsZoro.iin_bin,
          },
          fishs: [],
          rating: '',
          coefficient: '',
          quotaSum: 0,
        });

        this.userQuotaFild(this.fildsZoro.id, this.fildsZeroIndex);

        this.fildsZeroIndex = this.fildsZeroList.length;
        this.fildsZoro = '';
      }
    },
    deleteFild(index) {
      this.fildsList.splice(index, 1);
      this.fildsIndex = this.fildsList.length;

      this.quotaFish[index] = null;
      this.quotaValue[index] = '';
      this.sumQuota();
    },
    userQuotaFild(userId, index) {
      api
        .get('quota/user', {
          params: {
            id: this.$route.params.id,
            pond_id: this.reservoirsValue.id,
            user_id: userId,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            let fishs = [];
            response.data.find((element) => {
              let fish = this._getFishes.find((f) => {
                if (f.id == element.fish_id) return f;
              });
              fishs.push({
                fish: fish,
                value: Number(element.value),
              });
            });

            this.fildsZeroList[index].fishs = fishs;
          }
        });
    },
    userQuotaFildNew(userId, index) {
      let resourse = null;
      api
        .get('quota/user', {
          params: {
            id: this.$route.params.id,
            pond_id: this.reservoirsValue.id,
            user_id: userId,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            resourse = response.data;
          }
        });
      let fishs = [];

      if (this.fildsZeroList) {
        this.fildsZeroList.find((elementZero) => {
          if (elementZero.fishs) {
            elementZero.fishs.find((e) => {
              let fish = null;
              if (resourse) {
                fish = resourse.find((element) => {
                  if (e.fish.id == element.fish_id) {
                    let eFish = e;
                    eFish.value = element.value;
                    return eFish;
                  }
                });
              }
              if (!fish) {
                fish = e.fish;
                fish.value = 0;
              }
              fishs.push({
                fish: fish,
                value: fish.value,
              });
            });
          }
        });
      }

      this.fildsList[index].fishs = fishs;
    },
    apiGetQuota() {
      api
        .get('quota-reverse/' + this.$route.params.id + '/item/' + this.$route.params.itemId)
        .then((response) => {
          if (response.data) {
            this.applications = response.data;

            response.data.quota.find((element) => {
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

              let name =
                (element.user.first_name ? element.user.first_name + ' ' : '') +
                (element.user.last_name ? element.user.last_name + ' ' : '') +
                (element.user.middle_name ? element.user.middle_name + ' ' : '') +
                '(' +
                element.user.iin_bin +
                ')';

              this.fildsZeroList.push({
                id: element.user_id,
                name: name,
                iin_bin: element.user.iin_bin,
                company: {
                  id: element.user.id,
                  first_name: element.user.first_name,
                  last_name: element.user.last_name,
                  middle_name: element.user.middle_name,
                  name_company: element.user.name_company,
                  iin_bin: element.user.iin_bin,
                },
                fishs: fishs,
                rating: element.rating,
                coefficient: element.coefficient,
                quotaSum: 0,
              });
            });
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
  async beforeMount() {
    this._fetchPondList();
    this._fetchPools();
    this._fetchRegionList();
    await this._fetchFishes();
    this.apiGetQuota();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
