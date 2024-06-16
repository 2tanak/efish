<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack :title="$t('reporting.title')" :subtitle="$t('reporting.reports.8-rh')" />
              <div class="card__content--body">
                <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          {{ $t('inputs.region') }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <region
                          :required="true"
                          :modelValue="formApp.region"
                          :confinesValue="userRegions"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="formApp.region = $event"
                        ></region>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          {{ $t('inputs.kato') }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <kato
                          :required="true"
                          :modelValue="formApp.kato"
                          :categoryValue="formApp.region"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="formApp.kato = $event"
                        ></kato>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Наименование водоема /участка и (или) рыбоводного хозяйства
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'number1'"
                          :required="true"
                          :modelValue="formApp.number1"
                          v-on:update:modelValue="formApp.number1 = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Основной и вторичный вид деятельности (указать код ОКЭД)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'number1'"
                          :required="true"
                          :modelValue="formApp.number1"
                          v-on:update:modelValue="formApp.number1 = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Выращиваемые виды</div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-12">
                            <fish
                              :required="true"
                              :multiple="true"
                              name="fish"
                              :modelValue="formApp.fish"
                              :placeholder="$t('placeholder.choose')"
                              v-on:update:modelValue="formApp.fish = $event"
                            ></fish>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-6">
                            <TextInput
                              :type="'number'"
                              :name="'number1'"
                              :title="'Рыб и других водных животных'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :type="'number'"
                              :name="'number1'"
                              :title="'Ракообразных'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Объем выращенной рыбы и других водных животных
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          class="mb-2"
                          :title="'План выращивания по видам, тонн'"
                          :name="'number1'"
                          :required="true"
                          :placeholder="$t('placeholder.quantity')"
                          :modelValue="formApp.number1"
                          v-on:update:modelValue="formApp.number1 = $event"
                        ></TextInput>

                        <fishTonTenge
                          :title="'Фактически выращено по видам тонн / тыс. тенге'"
                          :name="'number1'"
                          :modelValue="formApp.fishTonTenge"
                          v-on:update:modelValue="formApp.fishTonTenge = $event"
                        ></fishTonTenge>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Производственная мощность (тонн в год)</div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'number1'"
                          :required="true"
                          :modelValue="formApp.number1"
                          v-on:update:modelValue="formApp.number1 = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Год образования рыбоводного хозяйства (постройки производственной базы)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'number1'"
                          :required="true"
                          :modelValue="formApp.number1"
                          v-on:update:modelValue="formApp.number1 = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Источник рыбопосадочного материала</div>
                      </div>
                      <div class="col-xl-5">
                        <TextInputRepeater
                          :name="'pond'"
                          :required="true"
                          :placeholder="$t('placeholder.quantity')"
                          :modelValue="formApp.pond"
                          v-on:update:modelValue="formApp.pond = $event"
                        ></TextInputRepeater>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Источник водоснабжения</div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'number1'"
                          :required="true"
                          :modelValue="formApp.number1"
                          v-on:update:modelValue="formApp.number1 = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Параметры по типам рыбоводного хозяйства</div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'number1'"
                              :title="'ОТРХ площадь (гектар)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'number1'"
                              :title="'Площадь садков (метр куб)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                        </div>
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'number1'"
                              :title="'У З В (метр куб)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'number1'"
                              :title="'Площадь прудов (гектар)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                        </div>
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'number1'"
                              :title="'Отгороженные участки и заливы'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'number1'"
                              :title="'Бассейны (кв. метр)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                        </div>
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'number1'"
                              :title="'Другие (гектар или метр куб)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Объем выращенного рыбопосадочного материала (объем каждого по отдельности)
                          тыс. штук
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row">
                          <div class="col-lg-4">
                            <TextInput
                              type="number"
                              :title="'Личинок'"
                              :name="'number1'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              type="number"
                              :title="'Сеголеток'"
                              :name="'number1'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              type="number"
                              :title="'Годовиков'"
                              :name="'number1'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Затраты на рыбопасодочный материал (тыс. тенге)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          type="number"
                          :name="'number1'"
                          :required="true"
                          :placeholder="$t('placeholder.quantity')"
                          :modelValue="formApp.number1"
                          v-on:update:modelValue="formApp.number1 = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <!---------------
                  ////////////////<br>
                  ////////////////<br>
                  ////////////////<br>
------------------>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Месячная заработная плата работников в разрезе должностей тыс. тенге
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'В выращивании'"
                              :type="'number'"
                              :name="'number1'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'В переработке рыбы'"
                              :type="'number'"
                              :name="'number1'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.number1"
                              v-on:update:modelValue="formApp.number1 = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <employeeAdd
                          :name="'number1'"
                          :disabled="statusPage == 'show'"
                          :modelValue="formApp.employees"
                          v-on:update:modelValue="formApp.employees = $event"
                        ></employeeAdd>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <!------------------
                  ////////////////<br>
                  ////////////////<br>
                  ////////////////<br>
---------------------->

                  <hr class="reporting__hr" />

                  <div class="reporting-btn">
                    <div class="reporting-wrapper">
                      <button type="submit" class="input-btn form__line--btn">
                        {{ $t('button.save') }}
                      </button>
                    </div>
                  </div>

                  <!-------------------
                  <div class="reporting-btn">
                    <div class="reporting-wrapper">
                      <button class="input-btn form__line--btn" v-if="statusPage == 'create' || statusPage == 'edit'">
                        {{ $t('button.save') }}
                      </button>
                      <a class="input-btn form__line--btn" @click="$modal.show('modal_head')"  v-if="statusPage == 'show'">
                        {{ $t('button.ecp') }}
                      </a>
                      <a :href="'/'+ $i18n.locale +'/account/reporting/2-rh/' + $route.params.id + '/edit'" class="input-btn form__line--btn form__line--btn-black" v-if="statusPage == 'show'">
                        {{ $t('button.edit') }}
                      </a>
                    </div>
                  </div>
-------------->
                </form>

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
                          {{ $t('reporting.ecp_text') }}
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
                                {{ $t('button.ecp') }}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//:disabled="statusPage == 'show'"
import TextInput from '@/components/components/Inputs/TextInput.vue';
import Region from '@/components/components/Inputs/region';
import Pond from '@/components/components/Inputs/pond';
import Kato from '@/components/components/Inputs/kato';
import Fish from '@/components/components/Inputs/fish';
import TextInputRepeater from '@/components/components/Inputs/TextInputRepeater.vue';
import FishTonTenge from '@/components/components/Inputs/fishTonTenge';
import EmployeeAdd from '@/components/components/Inputs/employeeAdd';

import { required } from 'vuelidate/lib/validators';

import HeaderBack from '@/components/UI/HeaderBack.vue';

export default {
  name: 'edit',
  components: {
    HeaderBack,
    FishTonTenge,
    TextInputRepeater,
    Fish,
    EmployeeAdd,
    Kato,
    Pond,
    Region,
    TextInput,
  },
  props: {
    statusPage: {
      type: String,
      default: 'create',
    },
  },
  validations: {},
  data() {
    return {
      userRegions: null,

      formApp: {
        region: null,
        kato: null,
        fish: null,

        pond: [],
        fishTonTenge: [],
        employees: [],

        number1: '',
        number2: '',
        number3: '',
      },
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
        const dataEcp = JSON.parse(e.data);
        if (dataEcp.responseObject) {
          //this.onSubmit();
        }
      };
    },
    onSubmit(evt) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
      }
    },
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  mounted() {},
};
</script>

<style scoped></style>
