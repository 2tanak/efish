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
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ title }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
                  <div class="content__list--links">
                    <ul class="content__links--ul">
                      <template v-for="link in links">
                        <li
                          v-if="$store.getters.userPermission(link.permission)"
                          :class="{ disabled: link.disabled }"
                          :key="link.id"
                        >
                          <router-link :to="getLink(link.link)">{{ link.name }}</router-link>
                        </li>
                      </template>
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
export default {
  name: 'ReportingPage',
  head: {
    title() {
      return {
        inner: this.$t('sidebar.users_parent'),
      };
    },
    meta: [],
  },
  data() {
    return {
      title: 'Предоставление административных данных (Отчетность)',
      links: [
        {
          link: '1-rh',
          name: '1-рх (Сведения об освоении квоты вылова рыбы и других водных животных пользователями)',
          permission: ['read_reporting-1rh'],
        },
        {
          link: '2-rh',
          name: '2-рх (Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков)',
          permission: ['read_reporting-2rh'],
          disabled: true,
        },
        {
          link: '3-rh',
          name: '3-рх (Сведения о выполнении запланированных на текущий год объемов финансовых средств пользователями для развития рыбного хозяйства)',
          permission: ['read_reporting-3rh'],
          disabled: true,
        },
        {
          link: '7-rh',
          name: '7-рх (Сведения о материально-техническом оснащении пользователей)',
          permission: ['read_reporting-7rh'],
          disabled: true,
        },
        {
          link: '8-rh',
          name: '8-рх (Сведения по субъектам, занятым выращиванием рыбы)',
          permission: ['read_reporting-8rh'],
          disabled: true,
        },
        {
          link: '9-rh',
          name: '9-рх (Сведения о рыбоперерабатывающих предприятиях)',
          permission: ['read_reporting-9rh'],
          disabled: true,
        },
        {
          link: '10-rh',
          name: '10-рх (Сведения о контрольно-инспекционной деятельности территориальных органов в части охраны рыбных ресурсов)',
          permission: ['read_reporting-9rh'],
          disabled: true,
        },
        {
          link: '1-tir-rh',
          name: '1-рх (Сведения об освоении квоты вылова рыбы и других водных животных пользователями)',
          permission: ['read_reporting-5rh'],
          disabled: true,
        },
        {
          link: '2-tir-rh',
          name: '2-рх (Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков)',
          permission: ['read_reporting-5rh'],
          disabled: true,
        },
        {
          link: '3-tir-rh',
          name: '3-рх (Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков)',
          permission: ['read_reporting-5rh'],
          disabled: true,
        },
        {
          link: '5-tir-rh',
          name: '5-рх (Сведения о рыбохозяйственных водоемах и (или) участках местного значения)',
          permission: ['read_reporting-5rh'],
          disabled: true,
        },
        {
          link: '6-tir-rh',
          name: '6-рх (Сведения о рыбохозяйственных водоемах и (или) участках международного и республиканского значения)',
          permission: ['read_reporting-6rh'],
          disabled: true,
        },
        {
          link: '7-tir-rh',
          name: '7-рх (Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков)',
          permission: ['read_reporting-5rh'],
          disabled: true,
        },
        {
          link: '8-tir-rh',
          name: '8-рх (Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков)',
          permission: ['read_reporting-5rh'],
          disabled: true,
        },
        {
          link: '9-tir-rh',
          name: '9-рх (Сведения о деятельности егерских служб пользователей животного мира, осуществляющих охрану рыбохозяйственных водоемов и (или) участков)',
          permission: ['read_reporting-5rh'],
          disabled: true,
        },
        {
          link: '10-tir-rh',
          name: '10-рх (Сведения о контрольно-инспекционной деятельности территориальных органов в части охраны рыбных ресурсов)',
          permission: ['read_reporting-10rh'],
          disabled: true,
        },
      ],
    };
  },
  methods: {
    getLink(link) {
      return `/${this.$i18n.locale}/account/reporting/${link}`;
    },
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
};
</script>
