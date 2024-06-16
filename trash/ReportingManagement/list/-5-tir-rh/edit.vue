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
              <HeaderBack
                :title="'ТОО Рыбка'"
                :subtitle="'Освоение лимита вылова рыбы и других водных животных'"
              />
              <div class="card__content--body">
                <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                  <div class="vodoem_item" v-for="(item, key) in formApp.pondGrup" :key="key">
                    <div>
                      <div class="content__title--text mb-3 mt-5">
                        {{ item.value }}
                      </div>
                      <div class="reporting-line">
                        <div class="row">
                          <div class="col-xl-8">
                            <div class="row">
                              <div class="col-xl-6">
                                <div class="row">
                                  <div class="col-lg-12">
                                    <TextInput
                                      :title="'Код КАТО (классификатор административно-территориальных объектов)'"
                                      :type="'text'"
                                      :name="'code_kato'"
                                      :required="true"
                                      :placeholder="'Код'"
                                    ></TextInput>
                                  </div>
                                </div>
                              </div>
                              <div class="col-xl-6">
                                <div class="row">
                                  <div class="col-lg-12">
                                    <div class="row">
                                      <div class="title col-12">
                                        Общее количество рыбохозяйственных водоемов и (или) участков
                                        (с указанием общей площади (гектар))
                                      </div>
                                      <div class="col-lg-6">
                                        <TextInput
                                          :title="''"
                                          :type="'text'"
                                          :name="'code_kato'"
                                          :required="true"
                                          :placeholder="'Код'"
                                        ></TextInput>
                                      </div>
                                      <div class="col-lg-6">
                                        <TextInput
                                          :title="''"
                                          :type="'text'"
                                          :name="'code_kato'"
                                          :required="true"
                                          :placeholder="'Код'"
                                        ></TextInput>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-----reporting-line-1------------>
                      <div class="title3">
                        Закрепление рыбохозяйственных водоемов за рыбохозяйственными организациями
                      </div>
                      <div class="reporting-line">
                        <div class="row">
                          <div class="col-xl-8">
                            <div class="row">
                              <div class="col-lg-6">
                                <div class="row">
                                  <div class="title col-12">
                                    Количество закрепленных водоемов (с указанием общей площади
                                    (гектар))
                                  </div>
                                  <div class="col-lg-6">
                                    <TextInput
                                      :title="''"
                                      :type="'number'"
                                      :name="'zakrep_vidoem'"
                                      :required="true"
                                      :disabled="statusPage == 'show'"
                                      :placeholder="'Количество'"
                                    ></TextInput>
                                  </div>

                                  <div class="col-lg-6">
                                    <TextInput
                                      :title="''"
                                      :type="'number'"
                                      :name="'zakrep_vidoem_gektar'"
                                      :required="true"
                                      :disabled="statusPage == 'show'"
                                      :placeholder="'Гектар'"
                                    ></TextInput>
                                  </div>
                                </div>
                              </div>

                              <div class="col-lg-6">
                                <div class="row">
                                  <div class="col-lg-7">
                                    <TextInput
                                      :title="'Количество рыбохозяйственных организаций'"
                                      :type="'number'"
                                      :name="'zakrep_vidoem'"
                                      :required="true"
                                      :disabled="statusPage == 'show'"
                                      :placeholder="'Количество'"
                                    ></TextInput>
                                  </div>

                                  <div class="col-lg-5">
                                    <TextInput
                                      :title="'% закрепления<br><br>'"
                                      :type="'number'"
                                      :name="'zakrep_vidoem_gektar'"
                                      :required="true"
                                      :disabled="statusPage == 'show'"
                                      :placeholder="'Гектар'"
                                    ></TextInput>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!------row------->
                          </div>
                          <!------col------->
                        </div>
                        <!-----row------->
                      </div>
                      <!-----reporting-line------->
                      <div class="reporting-line">
                        <div class="row">
                          <div class="col-xl-8">
                            <div class="row">
                              <div class="col-lg-6">
                                <div class="row">
                                  <div class="title col-12">
                                    Количество незакрепленных рыбохозяйственных водоемов (с
                                    указанием общей площади (гектар))
                                  </div>
                                  <div class="col-lg-6">
                                    <TextInput
                                      :title="''"
                                      :type="'number'"
                                      :name="'zakrep_vidoem'"
                                      :required="true"
                                      :disabled="statusPage == 'show'"
                                      :placeholder="'Количество'"
                                    ></TextInput>
                                  </div>

                                  <div class="col-lg-6">
                                    <TextInput
                                      :title="''"
                                      :type="'number'"
                                      :name="'zakrep_vidoem_gektar'"
                                      :required="true"
                                      :disabled="statusPage == 'show'"
                                      :placeholder="'Гектар'"
                                    ></TextInput>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!------row------->
                          </div>
                          <!------col------->
                        </div>
                        <!-----row------->
                      </div>
                      <!-----reporting-line------->
                    </div>
                    <!-------vodoem_item------>
                  </div>

                  <hr class="reporting__hr" />
                  <div class="reporting-btn">
                    <div class="reporting-wrapper">
                      <button
                        type="submit"
                        class="input-btn form__line--btn"
                        v-if="statusPage == 'create' || statusPage == 'edit'"
                      >
                        {{ $t('button.save') }}
                      </button>
                      <!-- <a class="input-btn form__line--btn" @click="$modal.show('modal_head')" v-if="statusPage == 'show'">
                        {{ $t('button.ecp') }}
                      </a> -->
                      <router-link
                        :to="
                          '/' +
                          $i18n.locale +
                          '/account/reporting/2-rh/' +
                          $route.params.id +
                          '/edit'
                        "
                        class="input-btn form__line--btn form__line--btn-black"
                        v-if="statusPage == 'show'"
                      >
                        {{ $t('button.edit') }}
                      </router-link>
                    </div>
                  </div>
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

                <modal
                  class="modal__block modal__block--middle modal__block--success"
                  name="modal_save"
                  :width="550"
                  :min-width="550"
                  height="auto"
                >
                  <div class="modal__block--wrapper">
                    <div class="modal__block--close" @click="$modal.hide('modal_save')">
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
                              <a class="block__item block__item--green" @click="saveElementReport">
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
                                {{ $t('button.save') }}
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
import pondSquare from '@/components/components/Inputs/pondAssembling_v2';
import TextInput from '@/components/components/Inputs/TextInput.vue';
import Region from '@/components/components/Inputs/region';
import Pond from '@/components/components/Inputs/pond';
import District from '@/components/components/Inputs/district';
import Kato from '@/components/components/Inputs/kato';

import { required } from 'vuelidate/lib/validators';
import axios from 'axios';
import { api } from '@/boot/axios';

import HeaderBack from '@/components/UI/HeaderBack.vue';

export default {
  name: 'edit',
  components: {
    HeaderBack,
    Kato,
    District,
    Pond,
    Region,
    TextInput,
    pondSquare,
  },
  props: {
    statusPage: {
      type: String,
      default: 'create',
    },
  },
  validations: {
    formApp: {
      region_id: {
        required,
      },
      farm_id: {
        required,
      },
      district_id: {
        required,
      },
      kato_id: {
        required,
      },
      count_of_gamekeeper_start_of_year: {
        required,
      },
      count_of_gamekeeper_start_of_reporting_period: {
        required,
      },
      count_of_protocols: {
        required,
      },
      modelValue: [],
    },
  },
  data() {
    return {
      userRegions: null,
      filters: {
        date_from: null,
        date_to: null,
      },
      formApp: {
        region_id: null,
        farm_id: null,
        district_id: null,
        kato_id: null,

        pondGrup: [
          {
            pond_id: 4,
            value: 'Тестовое озеро',
            square: null,
            code_kato: null,
          },
          {
            pond_id: 4,
            value: 'Тестовое озеро-2',
            square: null,
            code_kato: null,
          },
          {
            pond_id: 4,
            value: 'Тестовое озеро-3',
            square: null,
            code_kato: null,
          },
        ],
        count_of_gamekeeper_start_of_year: '',
        count_of_gamekeeper_start_of_reporting_period: '',
        count_of_protocols: '',
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
    add_reservoir(val) {
      this.formApp.pond_square.push(val);
    },
    apiGetUserRegions() {
      if (this.$store.state.userObject && this.$store.state.userObject.regions) {
        let array = [];
        this.$store.state.userObject.regions.find((element) => {
          array.push(element.region_id);
        });
        this.userRegions = array;
      }
    },
    saveElementReport() {
      const data = {
        user_id: this.$store.state.userObject.id,
        ...this.formApp,
      };
      // Значение объекта переводим в Number
      Object.keys(data).forEach(function (el) {
        data[el] = parseInt(data[el]);
      });

      data.surrender_date_start = this.filters.from || '';
      data.surrender_date_end = this.filters.to || '';

      api
        .post('/subject/store/2', data)
        .then((res) => {
          this.$router.go(-1);
          document.querySelector('.preloader').classList.remove('active');
        })
        .catch(() => {});
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
    formatDate(date) {
      let str = '';
      const dateArr = date.split('.').reverse();
      str = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
      return str;
    },
    async showDetailManagment() {
      try {
        const { data } = await api.get(`tir/show/1?user_id=8`);

        this.formApp.region_id = data.data.region_id;
        this.formApp.farm_id = data.data.farm_id;
        this.formApp.district_id = data.data.district_id;
        this.formApp.kato_id = data.data.kato_id;
        this.formApp.count_of_gamekeeper_start_of_year =
          data.data.count_of_gamekeeper_start_of_year;
        this.formApp.count_of_gamekeeper_start_of_reporting_period =
          data.data.count_of_gamekeeper_start_of_reporting_period;
        this.formApp.count_of_protocols = data.data.count_of_protocols;

        setTimeout(() => {
          document.querySelectorAll('.date__input')[0].value = this.formatDate(
            data.data.surrender_date_start,
          );
          document.querySelectorAll('.date__input')[1].value = this.formatDate(
            data.data.surrender_date_end,
          );
        }, 100);
      } catch (error) {}
    },
    onSubmit(evt) {
      // this.$v.$touch();
      /*
	  if (!this.$v.$invalid) {
		   const data = {
           user_id: this.$store.state.userObject.id,
          ...this.formApp
        }
		document.querySelector('.preloader').classList.add('active')
 let formData = convertObjectToFormData(data);
		 formData.append("surrender_date_start", this.filters.from || "2023-01-01")
         formData.append("surrender_date_end", this.filters.to || "2023-03-20");
  api.post("/tir/store/5", formData).then(res => {
		 document.querySelector('.preloader').classList.remove('active');
		 this.$router.push('/ru/account/reporting/5-rh')
		 }).catch(()=>{});

*/
    },
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
  beforeMount() {
    this.showDetailManagment();
  },
};
</script>

<style scoped>
.reporting-line {
  margin-bottom: 10px;
}
</style>
