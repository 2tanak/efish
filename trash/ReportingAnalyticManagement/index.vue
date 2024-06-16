<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingAnalyticManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('sidebar.reporting_analytics') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="content__list--links">
                  <ul class="content__links--ul">
                    <!-- 1rh -->
                    <li>
                      <router-link :to="'/' + $i18n.locale + '/account/reporting-analytics/1/'"
                        >1-px - Сведения об освоении квоты вылова рыбы и других водных животных
                        пользователями(По регионам)</router-link
                      >
                    </li>

                    <!-- 2rh -->
                    <li>
                      <router-link :to="'/' + $i18n.locale + '/account/reporting-analytics/2'"
                        >2-px - Сведения о деятельности егерских служб пользователей животного мира,
                        осуществляющих охрану рыбохозяйственных водоемов и (или) участков(По
                        регионам)</router-link
                      >
                    </li>

                    <!-- 2rh -->
                    <li>
                      <router-link :to="'/' + $i18n.locale + '/account/reporting-analytics/3/'"
                        >3-РХ (СВЕДЕНИЯ О ВЫПОЛНЕНИИ ЗАПЛАНИРОВАННЫХ НА ТЕКУЩИЙ ГОД ОБЪЕМОВ
                        ФИНАНСОВЫХ СРЕДСТВ ПОЛЬЗОВАТЕЛЯМИ ДЛЯ РАЗВИТИЯ РЫБНОГО ХОЗЯЙСТВА)</router-link
                      >
                    </li>
                    <!-- 4rh -->

                    <!-- 5rh -->
                    <li>
                      <router-link :to="'/' + $i18n.locale + '/account/reporting-analytics/5/'"
                        >5-px - СВЕДЕНИЯ О РЫБОХОЗЯЙСТВЕННЫХ ВОДОЕМАХ И (ИЛИ) УЧАСТКАХ МЕСТНОГО
                        ЗНАЧЕНИЯ</router-link
                      >
                    </li>
                    <!-- 6rh -->
                    <li>
                      <router-link :to="'/' + $i18n.locale + '/account/reporting-analytics/6/'"
                        >6-px - СВЕДЕНИЯ О РЫБОХОЗЯЙСТВЕННЫХ ВОДОЕМАХ И (ИЛИ) УЧАСТКАХ
                        МЕЖДУНАРОДНОГО И РЕСПУБЛИКАНСКОГО ЗНАЧЕНИЯ</router-link
                      >
                    </li>
                    <!-- 7rh -->
                    <li>
                      <router-link :to="'/' + $i18n.locale + '/account/reporting-analytics/7/'"
                        >7-px - СВЕДЕНИЯ О МАТЕРИАЛЬНО-ТЕХНИЧЕСКОМ ОСНАЩЕНИИ ПОЛЬЗОВАТЕЛЕЙ
                      </router-link>
                    </li>
                    <!-- 8rh -->
                    <li>
                      <router-link :to="'/' + $i18n.locale + '/account/reporting-analytics/8/'"
                        >8-px - СВЕДЕНИЯ ПО СУБЪЕКТАМ, ЗАНЯТЫМ ВЫРАЩИВАНИЕМ РЫБЫ</router-link
                      >
                    </li>
                    <!-- 9rh -->
                    <li>
                      <router-link :to="'/' + $i18n.locale + '/account/reporting-analytics/9/'"
                        >9-px - СВЕДЕНИЯ О РЫБОПЕРЕРАБАТЫВАЮЩИХ ПРЕДПРИЯТИЯХ</router-link
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
</template>

<script>
export default {
  name: 'index',
};
</script>

<style scoped></style>
