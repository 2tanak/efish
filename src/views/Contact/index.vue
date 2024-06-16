<template>
  <div class="wrap__content" v-bind:class="{ 'wrap__content--preloader': !contacts }">
    <v-preloader v-if="!contacts"></v-preloader>

    <div class="container news__container" v-if="contacts">
      <div class="news__all__list">
        <p class="news__top__link mr-4 pointer" @click="$router.push('/' + $i18n.locale)">
          {{ $t('site.home_page') }}
        </p>
        <p class="news__top__link news__link__active pointer">{{ $t('site.menu.contact') }}</p>
      </div>

      <div class="contact-page__content">
        <br />
        <div class="section__title">
          {{ $t('site.menu.contact') }}
        </div>

        <div class="contact-page__block">
          <div class="contact__block--info">
            <div class="row">
              <div class="col-lg-4 contact__col--col" v-if="contacts.address">
                <div class="contact__col">
                  <div class="contact__col--icon">
                    <svg
                      width="53"
                      height="53"
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M46.375 22.0835C46.375 37.5418 26.5 50.7918 26.5 50.7918C26.5 50.7918 6.625 37.5418 6.625 22.0835C6.625 16.8123 8.71897 11.757 12.4463 8.02975C16.1735 4.30246 21.2288 2.2085 26.5 2.2085C31.7712 2.2085 36.8265 4.30246 40.5537 8.02975C44.281 11.757 46.375 16.8123 46.375 22.0835Z"
                        stroke="#52A5FC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M26.5 28.7085C30.1589 28.7085 33.125 25.7424 33.125 22.0835C33.125 18.4246 30.1589 15.4585 26.5 15.4585C22.8411 15.4585 19.875 18.4246 19.875 22.0835C19.875 25.7424 22.8411 28.7085 26.5 28.7085Z"
                        stroke="#52A5FC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div class="contact__col--info">
                    <div class="contact__col--title">
                      {{ $t('site.page.contact.address') }}
                    </div>
                    <div class="contact__col--desc">
                      <div v-for="adress in contacts.address">
                        <span v-if="$i18n.locale == 'ru'">{{ adress.text_ru }}</span>
                        <span v-if="$i18n.locale == 'en'">{{ adress.text_en }}</span>
                        <span v-if="$i18n.locale == 'kz'">{{ adress.text_kz }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 contact__col--col" v-if="contacts.phone">
                <div class="contact__col">
                  <div class="contact__col--icon">
                    <svg
                      width="53"
                      height="53"
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M48.5837 37.3651V43.9901C48.5861 44.6051 48.4602 45.2138 48.2138 45.7774C47.9674 46.3409 47.606 46.8467 47.1528 47.2625C46.6996 47.6783 46.1646 47.9948 45.582 48.1919C44.9994 48.3889 44.382 48.4621 43.7695 48.4067C36.9741 47.6683 30.4466 45.3463 24.7116 41.6271C19.3759 38.2366 14.8521 33.7128 11.4616 28.3771C7.72944 22.616 5.40686 16.0568 4.68199 9.23088C4.6268 8.62021 4.69938 8.00473 4.89509 7.42364C5.09081 6.84255 5.40537 6.30857 5.81876 5.85571C6.23215 5.40286 6.73531 5.04103 7.29619 4.79329C7.85708 4.54554 8.46341 4.4173 9.07657 4.41672H15.7016C16.7733 4.40617 17.8123 4.78568 18.6249 5.48452C19.4375 6.18336 19.9682 7.15383 20.1182 8.21505C20.3979 10.3352 20.9164 12.4169 21.6641 14.4205C21.9612 15.2109 22.0255 16.0699 21.8494 16.8957C21.6732 17.7216 21.2641 18.4796 20.6703 19.0801L17.8657 21.8846C21.0094 27.4133 25.5871 31.9909 31.1157 35.1346L33.9203 32.3301C34.5207 31.7363 35.2788 31.3271 36.1046 31.151C36.9305 30.9749 37.7895 31.0392 38.5799 31.3363C40.5835 32.0839 42.6652 32.6025 44.7853 32.8821C45.8581 33.0335 46.8377 33.5738 47.5381 34.4004C48.2384 35.2269 48.6105 36.282 48.5837 37.3651Z"
                        stroke="#52A5FC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div class="contact__col--info">
                    <div class="contact__col--title">
                      {{ $t('site.page.contact.phone') }}
                    </div>
                    <div class="contact__col--phone">
                      <div v-for="element in contacts.phone">
                        <a v-if="$i18n.locale == 'ru'" :href="'tel:' + element.link_ru">{{
                          element.text_ru
                        }}</a>
                        <a v-if="$i18n.locale == 'kz'" :href="'tel:' + element.link_kz">{{
                          element.text_kz
                        }}</a>
                        <a v-if="$i18n.locale == 'en'" :href="'tel:' + element.link_en">{{
                          element.text_en
                        }}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 contact__col--col" v-if="contacts.mail">
                <div class="contact__col">
                  <div class="contact__col--icon">
                    <svg
                      width="53"
                      height="53"
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.4993 35.3334C31.3779 35.3334 35.3327 31.3786 35.3327 26.5001C35.3327 21.6216 31.3779 17.6667 26.4993 17.6667C21.6208 17.6667 17.666 21.6216 17.666 26.5001C17.666 31.3786 21.6208 35.3334 26.4993 35.3334Z"
                        stroke="#52A5FC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M35.3327 17.6666V28.7083C35.3327 30.4653 36.0307 32.1504 37.2731 33.3928C38.5156 34.6353 40.2006 35.3333 41.9577 35.3333C43.7148 35.3333 45.3999 34.6353 46.6423 33.3928C47.8847 32.1504 48.5827 30.4653 48.5827 28.7083V26.4999C48.5824 21.5158 46.896 16.6783 43.7978 12.7741C40.6997 8.86989 36.3718 6.12855 31.5181 4.99584C26.6644 3.86312 21.5702 4.40565 17.0639 6.5352C12.5576 8.66475 8.90425 12.2561 6.69781 16.7252C4.49138 21.1944 3.86167 26.2785 4.91107 31.1509C5.96048 36.0233 8.62728 40.3975 12.4778 43.5621C16.3284 46.7267 21.1363 48.4957 26.1197 48.5814C31.1031 48.6671 35.9689 47.0645 39.926 44.0341"
                        stroke="#52A5FC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div class="contact__col--info">
                    <div class="contact__col--title">
                      {{ $t('site.page.contact.mail') }}
                    </div>
                    <div class="contact__col--phone">
                      <div v-for="element in contacts.mail">
                        <a v-if="$i18n.locale == 'ru'" :href="'tel:' + element.link_ru">{{
                          element.text_ru
                        }}</a>
                        <a v-if="$i18n.locale == 'kz'" :href="'tel:' + element.link_kz">{{
                          element.text_kz
                        }}</a>
                        <a v-if="$i18n.locale == 'en'" :href="'tel:' + element.link_en">{{
                          element.text_en
                        }}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="contact__block--map" v-if="contacts.map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/boot/axios';

export default {
  data() {
    return {
      contacts: null,
    };
  },
  methods: {
    getContacts() {
      api
        .get('contacts', {})
        .then((response) => {
          this.contacts = response.data;
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.getContacts();
  },
};
</script>

<style scoped></style>
