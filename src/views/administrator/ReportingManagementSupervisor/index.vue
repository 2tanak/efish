<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagementSupervisor']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      Предоставление административных данных (Отчетность)
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="content__list--links">
                    <ul class="content__links--ul">
                      <li v-for="link in links">
                        <router-link
                          :to="'/' + $i18n.locale + '/account/reporting-list/' + link.link"
                          >{{ link.name }}</router-link
                        >
                      </li>
                    </ul>
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

      applications: null,
      errorMessage: {
        status: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      links: [
        {
          link: '1',
          name: '1-рх (Сведения об освоении квоты вылова рыбы и других водных животных пользователями)',
        },
        {
          link: '2',
          name: '2-рх (Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков)',
        },
        {
          link: '4',
          name: '4-рх (Сведения о планируемых объемах финансовых средств пользователей для развития рыбного хозяйства на весь период закрепления рыбохозяйственных водоемов и (или) участков)',
        },
        {
          link: '5',
          name: '5-рх (Сведения о рыбохозяйственных водоемах и (или) участках местного значения)',
        },
        /*{
          link: '6',
          name: '6-рх (Сведения о рыбохозяйственных водоемах и (или) участках международного и республиканского значения)'
        },*/ {
          link: '7',
          name: '7-рх (Сведения о материально-техническом оснащении пользователей)',
        },
        {
          link: '10',
          name: '10-рх (Сведения о материально-техническом оснащении пользователей)',
        },

        /*{
          link: '4',
          name: 'Сведения об освоении квоты вылова рыбы и других водных животныхo'
        },{
          link: '4',
          name: 'сведения о выполнении запланированных на текущий год объем финансовых средств пользователями'
        },{
          link: '4',
          name: 'сведения о планируемых объемах финансовых средств пользователей для развития рыбного хозяйства на весь период '
        },{
          link: '4',
          name: 'сведения о рыбохозяйственных водоемах и (или) участках местного значения'
        },{
          link: '4',
          name: 'сведения о рыбохозяйственных водоемах и (или) участках международного и республиканского значения'
        },{
          link: '4',
          name: 'сведения о материально-техническом оснащении пользователей'
        },{
          link: '4',
          name: 'сведения по субъектам, занятым в сфере рыбного хозяйства'
        },{
          link: '4',
          name: 'сведения об информации предприятий, занимающихся переработкой рыб'
        },{
          link: '4',
          name: 'сведения о контрольно-инспекционной деятельности территориальных органов в области охраны рыбных ресурсов'
        },{
          link: '4',
          name: 'сведения о борьбе с браконьерством'
        }*/
      ],
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  methods: {},
  computed: {},
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
