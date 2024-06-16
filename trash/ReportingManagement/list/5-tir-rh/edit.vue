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
              <HeaderBack :title="getReportTitle" :subtitle="$t('reporting.reports.5-rh')" />
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
                          :errors="$v.form.region_id"
                          :disabled="isNotEditable"
                          :modelValue="form.region_id"
                          :confinesValue="getUserRegions"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="form.region_id = $event"
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
                          :disabled="isNotEditable"
                          :modelValue="form.kato_id"
                          :errors="$v.form.kato_id"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="form.kato_id = $event"
                        ></kato>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Количество обследованного водоема (с указанием общей площади (гектар))
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Количество водоемов'"
                              :errors="$v.form.surveyed_reservoirs_count"
                              :type="'number'"
                              :name="'number1'"
                              :required="true"
                              :disabled="isNotEditable"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.surveyed_reservoirs_count"
                              v-on:update:modelValue="form.surveyed_reservoirs_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Общая площадь (гектар)'"
                              :type="'number'"
                              :name="'number1'"
                              :errors="$v.form.surveyed_reservoirs_hectare"
                              :required="true"
                              :disabled="isNotEditable"
                              :placeholder="'Гектар'"
                              :modelValue="form.surveyed_reservoirs_hectare"
                              v-on:update:modelValue="form.surveyed_reservoirs_hectare = $event"
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
                          Количество водоемов, которые будут обследованы (с указанием общей площади
                          (гектар))
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Количество водоемов'"
                              :errors="$v.form.need_surveyed_reservoirs_count"
                              :type="'number'"
                              :name="'number1'"
                              :required="true"
                              :disabled="isNotEditable"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.need_surveyed_reservoirs_count"
                              v-on:update:modelValue="form.need_surveyed_reservoirs_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Общая площадь (гектар)'"
                              :type="'number'"
                              :errors="$v.form.need_surveyed_reservoirs_hectare"
                              :name="'number1'"
                              :required="true"
                              :disabled="isNotEditable"
                              :placeholder="'Гектар'"
                              :modelValue="form.need_surveyed_reservoirs_hectare"
                              v-on:update:modelValue="
                                form.need_surveyed_reservoirs_hectare = $event
                              "
                            ></TextInput>
                          </div>
                        </div>

                        <!-- <pondSquare
                          :title="'Водоемы'"
                          :name="'number1'"
                          :required="true"
                          :disabled="isNotEditable"
                          :categoryValue="form.region"
                          :modelValue="form.pond_square"
                          v-on:update:modelValue="form.pond_square = $event"
                        ></pondSquare> -->

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Количество рыбохозяйственных водоемов, включенных в Перечень (согласно
                          постановлению областного акимата) (с указанием общей площади (гектар))
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Количество водоемов'"
                              :type="'number'"
                              :name="'number1'"
                              :required="true"
                              :errors="$v.form.reservoirs_count"
                              :disabled="isNotEditable"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.reservoirs_count"
                              v-on:update:modelValue="form.reservoirs_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Общая площадь (гектар)'"
                              :type="'number'"
                              :name="'number1'"
                              :errors="$v.form.reservoirs_hectare"
                              :required="true"
                              :disabled="isNotEditable"
                              :placeholder="'Гектар'"
                              :modelValue="form.reservoirs_hectare"
                              v-on:update:modelValue="form.reservoirs_hectare = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <fileInput
                          :name="'file1'"
                          :disabled="isNotEditable"
                          :errors="$v.form.reservoirs_file"
                          :modelValue="form.reservoirs_file"
                          :placeholder="'Прикрепить постановление Акимата'"
                          v-on:update:modelValue="form.reservoirs_file = $event"
                        ></fileInput>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Закреплено рыбохозяйственных водоемов (согласно постановлению областного
                          акимата)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Закрепленных водоемов'"
                              :type="'number'"
                              :name="'number1'"
                              :errors="$v.form.fixed_reservoirs_count"
                              :required="true"
                              :disabled="isNotEditable"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.fixed_reservoirs_count"
                              v-on:update:modelValue="form.fixed_reservoirs_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Общая площадь (гектар)'"
                              :type="'number'"
                              :errors="$v.form.fixed_reservoirs_hectare"
                              :name="'number1'"
                              :required="true"
                              :disabled="isNotEditable"
                              :placeholder="'Гектар'"
                              :modelValue="form.fixed_reservoirs_hectare"
                              v-on:update:modelValue="form.fixed_reservoirs_hectare = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <fileInput
                          class="mb-2"
                          :name="'file1'"
                          :errors="$v.form.fixed_reservoirs_file"
                          :disabled="isNotEditable"
                          :modelValue="form.fixed_reservoirs_file"
                          :placeholder="'Прикрепить постановление Акимата'"
                          v-on:update:modelValue="form.fixed_reservoirs_file = $event"
                        ></fileInput>

                        <TextInput
                          class="mb-2"
                          :title="'Количество рыбохозяйственных организаций за которыми закреплены водоемы'"
                          :type="'number'"
                          :name="'number1'"
                          :required="true"
                          :disabled="isNotEditable"
                          :placeholder="$t('placeholder.quantity')"
                          :modelValue="form.organizations_behind_which_reservoirs_count"
                          v-on:update:modelValue="
                            form.organizations_behind_which_reservoirs_count = $event
                          "
                        ></TextInput>

                        <fileInput
                          :name="'file1'"
                          :disabled="isNotEditable"
                          :errors="$v.form.organizations_behind_which_reservoirs_file"
                          :modelValue="form.organizations_behind_which_reservoirs_file"
                          :placeholder="'Прикрепить постановление Акимата'"
                          v-on:update:modelValue="
                            form.organizations_behind_which_reservoirs_file = $event
                          "
                        ></fileInput>
                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Количество не закрепленных рыбохозяйственных водоемов (с указанием общей
                          площади (гектар))
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Количество водоемов'"
                              :type="'number'"
                              :name="'number1'"
                              :required="true"
                              :errors="$v.form.non_fixed_reservoirs_count"
                              :disabled="isNotEditable"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.non_fixed_reservoirs_count"
                              v-on:update:modelValue="form.non_fixed_reservoirs_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Общая площадь (гектар)'"
                              :type="'number'"
                              :name="'number1'"
                              :required="true"
                              :errors="$v.form.non_fixed_reservoirs_hectare"
                              :disabled="isNotEditable"
                              :placeholder="'Гектар'"
                              :modelValue="form.non_fixed_reservoirs_hectare"
                              v-on:update:modelValue="form.non_fixed_reservoirs_hectare = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Количество выставляемых на повторный конкурс в текущем году
                          рыбохозяйственных водоемов и (или) участков (с указанием общей площади
                          (гектар))
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Количество водоемов'"
                              :type="'number'"
                              :name="'number1'"
                              :required="true"
                              :disabled="isNotEditable"
                              :errors="$v.form.reservoirs_put_up_for_re_competition_count"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.reservoirs_put_up_for_re_competition_count"
                              v-on:update:modelValue="
                                form.reservoirs_put_up_for_re_competition_count = $event
                              "
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Общая площадь (гектар)'"
                              :type="'number'"
                              :name="'number1'"
                              :errors="$v.form.reservoirs_put_up_for_re_competition_hectare"
                              :required="true"
                              :disabled="isNotEditable"
                              :placeholder="'Гектар'"
                              :modelValue="form.reservoirs_put_up_for_re_competition_hectare"
                              v-on:update:modelValue="
                                form.reservoirs_put_up_for_re_competition_hectare = $event
                              "
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

                  <ReportManageFormButtons :edit="!isNotEditable" :report="'5-rh'" />
                </form>

                <ReportManageModal
                  :ecp="true"
                  :errorMessage="errorMessage"
                  :message="message"
                  @accept="saveElement"
                  @close="$modal.hide('modal_head')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

import { api } from '@/boot/axios';
import { convertObjectToFormData } from '@/formData';

import TextInput from '@/components/components/Inputs/TextInput.vue';
import Region from '@/components/components/Inputs/region';
import Kato from '@/components/components/Inputs/kato';
import FileInput from '@/components/components/Inputs/fileInput';

import HeaderBack from '@/components/UI/HeaderBack.vue';
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';

export default {
  name: 'ReportPage5',
  components: {
    TextInput,
    Region,
    Kato,
    FileInput,
    HeaderBack,
    ReportManageModal,
    ReportManageFormButtons,
  },
  props: {
    statusPage: {
      type: String,
      default: 'create',
    },
  },
  validations: {
    form: {
      region_id: {
        required,
      },
      kato_id: {
        required,
      },
      reservoirs_count: {
        required,
      },
      reservoirs_hectare: {
        required,
      },
      need_surveyed_reservoirs_count: {
        required,
      },
      need_surveyed_reservoirs_hectare: {
        required,
      },
      surveyed_reservoirs_count: {
        required,
      },
      surveyed_reservoirs_hectare: {
        required,
      },
      reservoirs_file: {
        required,
      },
      fixed_reservoirs_file: {
        required,
      },
      organizations_behind_which_reservoirs_file: {
        required,
      },
      fixed_reservoirs_count: {
        required,
      },
      fixed_reservoirs_hectare: {
        required,
      },
      non_fixed_reservoirs_count: {
        required,
      },
      non_fixed_reservoirs_hectare: {
        required,
      },
      reservoirs_put_up_for_re_competition_count: {
        required,
      },
      reservoirs_put_up_for_re_competition_hectare: {
        required,
      },
    },
  },
  data() {
    return {
      form: {
        surrender_date_start: '2023-12-05',
        surrender_date_end: '2023-12-10',

        region_id: null,
        kato_id: null,
        surveyed_reservoirs_count: null,
        surveyed_reservoirs_hectare: null,
        need_surveyed_reservoirs_count: null,
        need_surveyed_reservoirs_hectare: null,
        reservoirs_count: null,
        reservoirs_hectare: null,
        fixed_reservoirs_count: null,
        fixed_reservoirs_hectare: null,
        organizations_behind_which_reservoirs_count: null,
        non_fixed_reservoirs_count: null,
        non_fixed_reservoirs_hectare: null,
        reservoirs_put_up_for_re_competition_count: null,
        reservoirs_put_up_for_re_competition_hectare: null,
        reservoirs_file: null,
        fixed_reservoirs_file: null,
        organizations_behind_which_reservoirs_file: null,
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
      dataEcp: null,
    };
  },
  computed: {
    getReportTitle() {
      if (this.statusPage == 'show') return this.$t('reporting.title');
      else if (this.statusPage == 'edit') return 'Редактирование отчета';
      return 'Добавление нового отчета';
    },
    isNotEditable() {
      return this.statusPage == 'show';
    },
    isFullFilled() {
      return this.statusPage === 'edit' || this.statusPage === 'show';
    },
    getUserRegions() {
      if (this.$store.state.userObject && this.$store.state.userObject.regions) {
        return this.$store.state.userObject.regions.map((element) => {
          return element.region_id;
        });
      }
      return [];
    },
  },
  methods: {
    saveElement() {
      if (this.$configFile.active) return this.sendEcpKey();
      const websocket = new WebSocket('wss://127.0.0.1:13579/');
      var ready = null;
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
        this.dataEcp = data1.responseObject;
        if (data1.responseObject) {
          this.sendEcpKey();
        }
      };
    },
    sendEcpKey() {
      const formData = new FormData();
      formData.append('xml', this.dataEcp || this.$configFile.xml);
      document.querySelector('.preloader').classList.add('active');
      api
        .post(`tir/sign/5/${this.$route.params.id}`, formData)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/5-rh' });
          }
        })
        .catch((e) => {})
        .finally(() => {
          document.querySelector('.preloader').classList.remove('active');
        });
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        document.querySelector('.preloader').classList.add('active');

        let data = this.form;
        for (let key in data) {
          if (data[key] == null) delete data[key];
        }

        let formData = convertObjectToFormData(data);

        if (this.statusPage == 'edit') {
          formData.append('_method', 'PUT');
        }

        api
          .post(
            `/tir/store/5${this.statusPage === 'edit' ? `/${this.$route.params.id}` : ''}`,
            formData,
          )
          .then(() => {
            this.$router.push('/ru/account/reporting/5-rh');
          })
          .catch((err) => {})
          .finally(() => {
            document.querySelector('.preloader').classList.remove('active');
          });
      }
    },
    async showDetailManagment() {
      if (this.isFullFilled) {
        try {
          const { data } = await api.get(`tir/show/5/${this.$route.params.id}`);
          this.form = {
            ...this.form,
            ...data.data,
          };
        } catch (error) {}
      }
    },
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
  beforeMount() {
    this.showDetailManagment();
  },
};
</script>

<style scoped>
.sidebar-link {
  background: #f7fbff;
}
</style>
