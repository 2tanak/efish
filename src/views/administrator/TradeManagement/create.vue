<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader': !$store.state.userObject,
    }"
  >
    <v-preloader v-if="!$store.state.userObject" :message="errorMessage"></v-preloader>

    <div v-if="$store.state.userObject" class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['TradeManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack
                :title="'Журнал учета лова рыбных ресурсов и других водных животных (промысловый журнал)'"
              />
              <div class="card__content--body">
                <form method="POST">
                  <div>
                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Дата улова</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.catch_at
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                v-model="catch_at"
                                type="date"
                                class="input-linck"
                                required=""
                                :min="catchFrom"
                                :max="catchTo"
                                :disabled="isNotEditable"
                                ref="catch_at"
                                name="catch_at"
                                value=""
                                placeholder="Дата улова"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.catch_at"
                            >
                              <p v-for="massage in errorMessage.messages.catch_at" :key="massage">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Вид лова</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <div
                              class="quota-fish__item"
                              :class="[
                                errorMessage.messages && errorMessage.messages.catchType
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <div class="row align-items-center">
                                <div class="col-xl-12">
                                  <CatchType
                                    :required="true"
                                    :multiple="false"
                                    name="fish"
                                    :disabled="isNotEditable"
                                    :modelValue="catchType"
                                    :placeholder="$t('placeholder.choose')"
                                    v-on:update:modelValue="catchType = $event"
                                  ></CatchType>
                                </div>
                              </div>
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.catchType"
                            >
                              <p>{{ errorMessage.messages.catchType }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Наименование региона</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-5">
                            <region
                              :required="true"
                              :modelValue="region"
                              :disabled="isNotEditable"
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
                                :disabled="isNotEditable"
                                :modelValue="pond"
                                :name="'farm_id'"
                                :placeholder="$t('placeholder.choose')"
                                v-on:update:modelValue="pond = $event"
                              ></Pond>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

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
                                errorMessage.messages && errorMessage.messages.brigade
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <Brigades
                                :required="true"
                                :multiple="false"
                                name="fish"
                                :disabled="isNotEditable"
                                :modelValue="brigade"
                                :placeholder="$t('placeholder.choose')"
                                v-on:update:modelValue="brigade = $event"
                              ></Brigades>
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.brigade"
                            >
                              <p v-for="massage in errorMessage.messages.brigade" :key="massage">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr class="form__line" />

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Количество рыбаков, осуществивших улов</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-8">
                            <div
                              class="form__line--input"
                              :class="[
                                errorMessage.messages && errorMessage.messages.fishermen
                                  ? 'input--error'
                                  : '',
                              ]"
                            >
                              <input
                                v-model="fishermen"
                                type="number"
                                step="1"
                                min="0"
                                class="input-linck"
                                required=""
                                ref="fishermen"
                                name="fishermen"
                                :disabled="isNotEditable"
                                placeholder="0"
                              />
                            </div>
                            <div
                              class="input-required"
                              v-if="errorMessage.messages && errorMessage.messages.fishermen"
                            >
                              <p v-for="massage in errorMessage.messages.fishermen" :key="massage">
                                {{ massage }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">
                          Виды и количество использованных орудий лова
                        </div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-12">
                            <div
                              class="quota-fish__line"
                              v-for="(gear, gearIndex) in gears"
                              :key="gear.id"
                            >
                              <div class="form__line--input">
                                <div class="row align-items-center">
                                  <div class="col-xl-12">
                                    <div
                                      class="quota-fish__item"
                                      :class="[
                                        errorMessage.messages && errorMessage.messages.gear
                                          ? 'input--error'
                                          : '',
                                      ]"
                                    >
                                      <div class="row align-items-center">
                                        <div class="col-xl-6">
                                          <Guns
                                            :required="true"
                                            :multiple="false"
                                            name="fish"
                                            :disabled="isNotEditable"
                                            :modelValue="gear.type"
                                            :placeholder="$t('placeholder.choose')"
                                            v-on:update:modelValue="gear.type = $event"
                                          ></Guns>
                                        </div>
                                        <div class="col-xl-4">
                                          <div class="form__line--input">
                                            <input
                                              type="number"
                                              step="1"
                                              min="1"
                                              :ref="'gear'"
                                              :disabled="isNotEditable"
                                              :name="
                                                'gear[' + gearIndex + '][' + gear.type + '][value]'
                                              "
                                              :data-id="gear.type"
                                              class="input-linck"
                                              :placeholder="gear.quantity"
                                              v-model="gear.quantity"
                                            />
                                          </div>
                                        </div>
                                        <div v-if="!isNotEditable" class="col-xl-2">
                                          <button
                                            v-if="gearIndex === gears.length - 1"
                                            class="input-btn form__line--btn-sign"
                                            @click.stop.prevent="addGears()"
                                          >
                                            <img src="../../../assets/img/icon-plus-blue.svg" />
                                          </button>
                                          <a v-else @click="removeGear(gearIndex)">
                                            <svg
                                              width="21"
                                              height="21"
                                              viewBox="0 0 21 21"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M8.02375 12.9762L12.9762 8.02375M12.9762 12.9762L8.02375 8.02375M10.5 19.25C15.3125 19.25 19.25 15.3125 19.25 10.5C19.25 5.6875 15.3125 1.75 10.5 1.75C5.6875 1.75 1.75 5.6875 1.75 10.5C1.75 15.3125 5.6875 19.25 10.5 19.25Z"
                                                stroke="#DF4242"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                            </svg>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      class="input-required"
                                      v-if="errorMessage.messages && errorMessage.messages.gear"
                                    >
                                      <p>{{ errorMessage.messages.gear[gear.id] }}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Видовой состав улова, виды рыб / тон.</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-12">
                            <div
                              class="quota-fish__line"
                              v-for="(fish, fishIndex) in fishes"
                              :key="fish.id"
                            >
                              <div class="form__line--input">
                                <div class="row align-items-center">
                                  <div class="col-xl-12">
                                    <div
                                      class="quota-fish__item"
                                      :class="[
                                        errorMessage.messages && errorMessage.messages.fish
                                          ? 'input--error'
                                          : '',
                                      ]"
                                    >
                                      <div class="row align-items-center">
                                        <div class="col-xl-6">
                                          <Fish
                                            :required="true"
                                            :multiple="false"
                                            name="fish"
                                            :modelValue="fish.type"
                                            :disabled="isNotEditable"
                                            :placeholder="$t('placeholder.choose')"
                                            v-on:update:modelValue="fish.type = $event"
                                          ></Fish>
                                        </div>
                                        <div class="col-xl-4">
                                          <div class="form__line--input">
                                            <input
                                              type="number"
                                              step=".01"
                                              min="0"
                                              :name="
                                                'fish[' + fishIndex + '][' + fish.type + '][value]'
                                              "
                                              :ref="'fish'"
                                              :data-id="fish.type"
                                              :disabled="isNotEditable"
                                              class="input-linck"
                                              v-model="fish.quantity"
                                              :placeholder="fish.quantity"
                                            />
                                          </div>
                                        </div>
                                        <div v-if="!isNotEditable" class="col-xl-2">
                                          <button
                                            v-if="fishIndex === fishes.length - 1"
                                            class="input-btn form__line--btn-sign"
                                            @click.stop.prevent="addFishes()"
                                          >
                                            <img src="../../../assets/img/icon-plus-blue.svg" />
                                          </button>
                                          <a v-else @click="removeFish(fishIndex)">
                                            <svg
                                              width="21"
                                              height="21"
                                              viewBox="0 0 21 21"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M8.02375 12.9762L12.9762 8.02375M12.9762 12.9762L8.02375 8.02375M10.5 19.25C15.3125 19.25 19.25 15.3125 19.25 10.5C19.25 5.6875 15.3125 1.75 10.5 1.75C5.6875 1.75 1.75 5.6875 1.75 10.5C1.75 15.3125 5.6875 19.25 10.5 19.25Z"
                                                stroke="#DF4242"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                            </svg>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      class="input-required"
                                      v-if="errorMessage.messages && errorMessage.messages.fish"
                                    >
                                      <p>{{ errorMessage.messages.fish[fish.id] }}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form__line">
                      <div class="form__line--left">
                        <div class="form__line--title">Объем улова, тон</div>
                      </div>
                      <div class="form__line--right">
                        <div class="row">
                          <div class="col-xl-8">
                            <div class="form__line--input">
                              <input
                                type="number"
                                step=".01"
                                min="0"
                                class="input-linck"
                                required=""
                                :value="amount"
                                disabled
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="!isNotEditable" class="form__line">
                      <div class="form__line--left"></div>
                      <div class="form__line--right">
                        <div class="input__row">
                          <!-- <p>
                            Редактирование и удаление пром. журнала возможно только в течении 1-го
                            часа после создания.
                          </p> -->
                          <a class="input-btn form__line--btn" @click="validateFirm()">
                            {{ $t('button.save') }}
                          </a>
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
import { mapGetters } from 'vuex';

import { api, apiSecond } from '@/boot/axios';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import Region from '@/components/components/Inputs/region';
import Pond from '@/components/components/Inputs/pond';
import Fish from '@/components/components/Inputs/fish';
import Guns from '@/components/components/Inputs/guns';
import CatchType from '@/components/components/Inputs/CatchType';
import Brigades from '@/components/components/Inputs/Brigades';

export default {
  components: {
    HeaderBack,
    Region,
    Pond,
    Fish,
    Guns,
    CatchType,
    Brigades,
  },
  props: {
    statusPage: {
      type: String,
      default: 'create',
    },
  },
  data() {
    return {
      application: null,
      catch_at: null,
      catchFrom: null,
      catchTo: null,
      region: null,
      pond: null,
      brigade: null,
      fishermen: '',
      gears: [
        {
          id: new Date().getTime(),
          quantity: 0,
          type: null,
        },
      ],
      fishes: [
        {
          id: new Date().getTime(),
          quantity: 0,
          type: null,
        },
      ],
      catchType: null,
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      formData: null,
    };
  },
  computed: {
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
    amount() {
      return this.fishes.reduce((acc, fish) => {
        acc += Number(fish.quantity);
        return acc;
      }, 0);
    },
  },
  methods: {
    addGears() {
      this.gears.push({
        id: new Date().getTime(),
        quantity: 0,
        type: null,
      });
    },
    removeGear(index) {
      this.gears.splice(index, 1);
    },
    addFishes() {
      this.fishes.push({
        id: new Date().getTime(),
        quantity: 0,
        type: null,
      });
    },
    removeFish(index) {
      this.fishes.splice(index, 1);
    },
    validateFirm() {
      this.errorMessage.status = null;
      this.errorMessage.messages = null;
      this.errorMessage.text = null;

      let valid = false;
      let messages = {};

      if (this.$refs.catch_at.value == '') {
        valid = true;
        messages.catch_at = [this.$t('system_message.required_message')];
      }
      if (this.$refs.fishermen.value == '') {
        valid = true;
        messages.fishermen = [this.$t('system_message.required_message')];
      }

      if (!this.catchType) {
        messages.catchType = [this.$t('system_message.required_message')];
      }

      messages.gear = [];
      this.gears.forEach((element) => {
        if (element.type == null || element.quantity == 0) {
          valid = true;
          messages.gear[element.id] = this.$t('system_message.required_message');
        }
      });

      messages.fish = [];
      this.fishes.forEach((element) => {
        if (element.type == null || element.quantity == 0) {
          valid = true;
          messages.fish[element.id] = this.$t('system_message.required_message');
        }
      });

      if (valid) {
        this.errorMessage.messages = messages;
        this.errorMessage.status = 422;
        this.errorMessage.text = this.$t('system_message.form_error');
      } else {
        this.onSubmit();
      }
    },
    onSubmit() {
      this.message.status = null;
      this.message.text = null;

      const formData = new FormData();

      if (this.$route.params.id) {
        formData.append('trade_id', this.$route.params.id);
      }
      formData.append('region_id', this.region);
      formData.append('reservoir_id', this.pond);
      formData.append('user_id', this.$store.state.userObject.id);
      formData.append('brigade_id', this.brigade);
      formData.append('catch_size', this.amount);
      formData.append('catch_at', this.catch_at);
      formData.append('fishermen', this.fishermen);
      formData.append('fishermen', this.fishermen);
      formData.append('type_catch', this.catchType);
      formData.append('data[0]', 1);
      this.gears.find((gear, ind) => {
        formData.append(`gear[${ind}][gear_id]`, gear.type);
        formData.append(`gear[${ind}][value]`, gear.quantity);

        if (gear._id) {
          formData.append(`gear[${ind}][id]`, gear._id);
        }
      });
      this.fishes.find((fish, ind) => {
        formData.append(`fish[${ind}][fish_id]`, fish.type);
        formData.append(`fish[${ind}][value]`, fish.quantity);

        if (fish._id) {
          formData.append(`fish[${ind}][id]`, fish._id);
        }
      });

      apiSecond
        .post(this.$route.params.id ? '/v2/trade/update' : '/v2/trade/store', formData)
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
            this.$router.push({
              path: '/' + this.$i18n.locale + '/account/trade',
            });
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
          this.errorMessage.messages = error.response.data.error_messages;
        });
    },
    apiGetTrade() {
      if (!this.$route.params.id) return;
      api
        .get('trade/' + this.$route.params.id)
        .then((response) => {
          if (response.data) {
            this.application = response.data;
            this.catch_at = this.application.catch_at.split(' ')[0];
            this.brigade = this.application.brigade_id;
            this.fishermen = this.application.fishermen;
            this.catchType = Number(this.application.type_catch);
            this.region = this.application.region_id;
            this.pond = this.application.reservoir_id;

            if (this.application.gears && this.application.gears.length) {
              this.gears = this.application.gears.map((e, ind) => {
                return {
                  id: new Date().getTime() + '-' + ind,
                  type: e.gear_id,
                  _id: e.id,
                  quantity: e.value,
                };
              });
            }

            if (this.application.fishs && this.application.fishs.length) {
              this.fishes = this.application.fishs.map((e, ind) => {
                return {
                  id: new Date().getTime() + '-' + ind,
                  type: e.fish_id,
                  _id: e.id,
                  quantity: e.value,
                };
              });
            }
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
          if (error?.response?.status == 403) {
            this.errorMessage.status = 403;
            this.errorMessage.text = error?.response?.data?.message;
          }
        });
    },
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  beforeMount() {
    this.apiGetTrade();
  },
};
</script>
