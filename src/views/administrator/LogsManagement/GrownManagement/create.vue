<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !_getFishes }">
    <v-preloader v-if="!_getFishes" :message="errorMessage"></v-preloader>

    <div class="container" v-if="_getFishes">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['GrownManagement', 'TradeManagementMain']"></v-sidebar>
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
                    <div class="content__title--text">Журнал учета выращенной рыбы</div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Дата забоя</div>
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
                              type="date"
                              class="input-linck"
                              required=""
                              :max="new Date().toISOString().split('T')[0]"
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
                            <p v-for="massage in errorMessage.messages.catch_at">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Номер справки о происхождении</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.reference
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              name="reference"
                              ref="reference"
                              value=""
                              placeholder="Номер"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.reference"
                          >
                            <p v-for="massage in errorMessage.messages.reference">{{ massage }}</p>
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
                        <div class="col-xl-7">
                          <div class="quota-fish__line" v-for="(fish, fishIndex) in fildsList">
                            <div class="form__line--input">
                              <div class="row align-items-center">
                                <div class="col-xl-10">
                                  <div class="quota-fish__item">
                                    <div class="row align-items-center">
                                      <div class="col-xl-7">
                                        <div class="form__line--input">
                                          <input
                                            type="text"
                                            class="input-linck"
                                            :value="fish.fish.name"
                                            disabled
                                          />
                                          <input
                                            type="hidden"
                                            :name="'fish[' + fish.fish.id + '][fish_id]'"
                                            :ref="'fish'"
                                            :data-id="fish.fish.id"
                                            :value="fish.fish.id"
                                          />
                                        </div>
                                      </div>
                                      <div class="col-xl-5">
                                        <div
                                          class="form__line--input"
                                          :class="[
                                            errorMessage.messages &&
                                            errorMessage.messages.fish &&
                                            errorMessage.messages.fish[fish.fish.id]
                                              ? 'input--error'
                                              : '',
                                          ]"
                                        >
                                          <input
                                            type="number"
                                            step=".01"
                                            min="0"
                                            :name="'fish[' + fish.fish.id + '][value]'"
                                            :ref="'fish'"
                                            class="input-linck"
                                            v-model="fish.value"
                                            placeholder="0"
                                          />
                                        </div>
                                        <div
                                          class="input-required"
                                          v-if="errorMessage.messages && errorMessage.messages.fish"
                                        >
                                          <p>{{ errorMessage.messages.fish[fish.fish.id] }}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-xl-2">
                                  <div class="input__block--add">
                                    <a
                                      @click="deleteFildFish(fishIndex)"
                                      v-tooltip.right="{
                                        content: 'Удалить рыбу',
                                        class: ['tooltip__btn'],
                                      }"
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#F19797"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M15 9L9 15"
                                          stroke="#F19797"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M9 9L15 15"
                                          stroke="#F19797"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="quota-fish__line">
                            <div class="form__line--input">
                              <div class="row align-items-center">
                                <div class="col-xl-10">
                                  <div class="quota-fish__item">
                                    <div class="row align-items-center">
                                      <div class="col-xl-7">
                                        <div class="form__line--input">
                                          <multiselect
                                            required=""
                                            v-model="tradeFish"
                                            :options="formList.fish"
                                            :preserve-search="true"
                                            track-by="id"
                                            label="name"
                                            placeholder="Выберите рыбу"
                                            class="multiselect__check"
                                          >
                                            <template slot="singleLabel" slot-scope="{ option }">{{
                                              option.values[0].value
                                            }}</template>
                                            <template slot="noResult">{{
                                              $t('components.not_found')
                                            }}</template>
                                          </multiselect>
                                          <!--                                          <input v-if="tradeFish" type="hidden" :name="'fish['+tradeFish.id+'][fish_id]'" :ref="'fish'" :data-id="tradeFish.id" :value="tradeFish.id">-->
                                        </div>
                                      </div>
                                      <div class="col-xl-5">
                                        <div class="form__line--input">
                                          <input
                                            v-if="tradeFish"
                                            type="number"
                                            step=".01"
                                            min="0"
                                            class="input-linck"
                                            v-model="tradeFishValue"
                                            placeholder="0"
                                          />
                                          <input
                                            v-else
                                            type="number"
                                            step=".01"
                                            min="0"
                                            class="input-linck"
                                            v-model="tradeFishValue"
                                            placeholder="0"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-xl-2">
                                  <div class="input__block--add">
                                    <a
                                      @click="addFildFish()"
                                      v-tooltip.right="{
                                        content: 'Добавить поле',
                                        class: ['tooltip__btn'],
                                      }"
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#52A5FC"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M12 8V16"
                                          stroke="#52A5FC"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M8 12H16"
                                          stroke="#52A5FC"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </a>
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
                    <div class="form__line--left"></div>
                    <div class="form__line--right">
                      <div class="input__row">
                        <a class="input-btn form__line--btn" @click="validateFirm()"> Подписать </a>
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
                  <modal
                    class="modal__block modal__block--middle modal__block--success"
                    name="modal_head"
                    :width="550"
                    :min-width="550"
                    height="auto"
                  >
                    <div class="modal__block--wrapper">
                      <div class="modal__block--close" @click="$modal.hide('modal_head')">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.5 7.5L7.5 22.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.5 7.5L22.5 22.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div class="modal__wrapper">
                        <div class="modal__header">
                          <div class="modal__title">
                            Для сохранения журнала, необходимо подтверждение электронно цифровой
                            подписью
                          </div>
                        </div>

                        <div class="modal__content">
                          <div class="modal__form">
                            <div class="block__row">
                              <div class="block__row--left">
                                <a class="block__item block__item--green" @click="saveElement">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10 18.3333C14.6025 18.3333 18.3334 14.6025 18.3334 9.99996C18.3334 5.39746 14.6025 1.66663 10 1.66663C5.39752 1.66663 1.66669 5.39746 1.66669 9.99996C1.66669 14.6025 5.39752 18.3333 10 18.3333Z"
                                      stroke="#5ABB5E"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M7.5 10L9.16667 11.6667L12.5 8.33337"
                                      stroke="#5ABB5E"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  Подписать ЭЦП
                                </a>
                              </div>
                              <div class="block__row--right">
                                <a
                                  class="block__item block__item--blue"
                                  @click="$modal.hide('modal_head')"
                                >
                                  {{ $t('button.cancel') }}
                                </a>
                              </div>
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
                    </div>
                  </modal>
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

import Multiselect from 'vue-multiselect';
import { api } from '@/boot/axios';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      fildsList: [],
      tradeFish: null,
      tradeFishValue: null,

      data: {
        id: 0,
        name: 'Оптовая',
      },
      dataList: [
        {
          id: 0,
          name: 'Оптовая',
        },
        {
          id: 1,
          name: 'Розничная',
        },
        {
          id: 2,
          name: 'Экспорт',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['_getFishes']),
    formList() {
      let list = {
        fish: this._getFishes,
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchFishes']),
    addFildFish() {
      let fishTrue = true;
      if (!this.tradeFish || this.tradeFish == undefined) fishTrue = false;
      if (fishTrue) {
        this.fildsList.find((element) => {
          if (element.fish.id == this.tradeFish.id) fishTrue = false;
        });
      }

      if (this.tradeFishValue != 0 && this.tradeFishValue != undefined && fishTrue) {
        this.fildsList.push({
          fish: this.tradeFish,
          value: Number(this.tradeFishValue),
        });

        this.tradeFish = null;
        this.tradeFishValue = null;
      }
    },
    deleteFildFish(fishIndex) {
      this.fildsList.splice(fishIndex, 1);
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
      if (this.$refs.reference.value == '') {
        valid = true;
        messages.reference = [this.$t('system_message.required_message')];
      }

      messages.fish = [];
      this.fildsList.find((element) => {
        if (element.value == '') {
          valid = true;
          messages.fish[element.fish.id] = this.$t('system_message.required_message');
        }
      });

      if (valid) {
        this.errorMessage.messages = messages;
        this.errorMessage.status = 422;
        this.errorMessage.text = this.$t('system_message.form_error');
      } else {
        this.$modal.show('modal_head');
      }
    },

    saveElement() {
      if (this.$configFile.active) return this.onSubmit();
      this.ecp = false;
      const websocket = new WebSocket('wss://127.0.0.1:13579/');
      var ready = null;
      let ecpData = {
        path: null,
        owner: null,
        data: null,
      };
      websocket.onopen = () => {
        ready = true;
        handle();
      };
      websocket.onclose = (e) => {
        if (e.wasClean) {
        } else {
          if (this.$i18n.locale == 'kz')
            alert('NCYLayer бағдарламасы іске қосылғандығына көз жеткізіңіз');
          if (this.$i18n.locale == 'ru') alert('Убедитесь, что программа NCALayer запущена');
          if (this.$i18n.locale == 'en') alert('Make sure that the NCALayer program is running');

          //setErrormodal(true);
          setTimeout(() => {
            //setErrormodal(false);
          }, 5000);
        }
      };
      function handle() {
        if (!ready) {
          alert('Убедитесь, что программа NCALayer запущена');
        } else {
          const data = {
            module: 'kz.gov.pki.knca.commonUtils',
            method: 'signXml',
            args: [
              'PKCS12',
              'SIGNATURE',
              '<login><sessionid>caacda70-fd36-45ed-8d94-45a88890f83a</sessionid></login>',
              '',
              '',
            ],
          };
          websocket.send(JSON.stringify(data));
        }
      }
      websocket.onmessage = (e) => {
        const data1 = JSON.parse(e.data);
        ecpData.data = data1.responseObject;
        this.dataEcp = data1.responseObject;
        if (data1.responseObject) {
          this.onSubmit();
          this.$modal.hide('modal_head');
        }
      };
    },

    onSubmit() {
      //evt

      this.message.status = null;
      this.message.text = null;
      this.message.texts = null;

      const formData = new FormData(); //evt.target

      formData.append('user_id', this.$store.state.userObject.id);
      formData.append('catch_at', this.$refs.catch_at.value);
      formData.append('reference', this.$refs.reference.value);

      this.fildsList.find((element) => {
        formData.append('fish[' + element.fish.id + '][fish_id]', element.fish.id);
        formData.append('fish[' + element.fish.id + '][value]', element.value);
      });
      if (this.tradeFish && this.tradeFishValue && this.tradeFishValue != undefined) {
        formData.append('fish[' + this.tradeFish.id + '][fish_id]', this.tradeFish.id);
        formData.append('fish[' + this.tradeFish.id + '][value]', this.tradeFishValue);
      }

      formData.append('data', this.dataEcp || this.$configFile.xml);

      api
        .post('grown/create', formData)
        .then((response) => {
          if (response.status == 200) {
            this.message.status = 200;
            this.message.text = response.data.message;
            this.$router.push({
              path: '/' + this.$i18n.locale + '/account/logs/grown/' + response.data.data.id,
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
  },
  beforeMount() {
    this._fetchFishes();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>

<style scoped></style>
