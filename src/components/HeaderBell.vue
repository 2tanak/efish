<template>
  <div class="header__notify--wrapper" v-bind:class="{ 'header__notify--active': notifyClick }">
    <div class="header__notify">
      <div class="header__notify--btn" @click="headerNotify">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
            stroke="#5ABB5E"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
            stroke="#5ABB5E"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 8C2 5.8 2.7 3.7 4 2"
            stroke="#5ABB5E"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 8C22 5.8363 21.2982 3.73096 20 2"
            stroke="#5ABB5E"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div
          class="header__notify--number"
          v-if="notificationsHeader && notificationsHeader.length"
        >
          {{ notificationsHeader.length }}
        </div>
      </div>
    </div>
    <div class="header__notify--absol" v-if="notificationsHeader && notificationsHeader.length">
      <div class="header__notify--list">
        <ul>
          <li v-for="(item, index) in notificationsHeader">
            <a
              v-if="JSON.parse(item.data).message.link"
              @click="readSet(index, JSON.parse(item.data).message.link)"
              target="_blank"
              class="pointer"
            >
              <span>
                {{
                  $t(
                    'notification.' +
                      JSON.parse(item.data).message.model +
                      '.' +
                      JSON.parse(item.data).message.status +
                      '.text',
                    { link: JSON.parse(item.data).message.link },
                  )
                }}
              </span>
            </a>
            <a
              v-else-if="
                $te(
                  'notification.' +
                    JSON.parse(item.data).message.model +
                    '.' +
                    JSON.parse(item.data).message.status +
                    '.href',
                )
              "
              class="pointer"
              @click="
                readSet(
                  index,
                  '/' +
                    $i18n.locale +
                    $t(
                      'notification.' +
                        JSON.parse(item.data).message.model +
                        '.' +
                        JSON.parse(item.data).message.status +
                        '.href',
                      { id: JSON.parse(item.data).id },
                    ),
                )
              "
            >
              {{
                $t(
                  'notification.' +
                    JSON.parse(item.data).message.model +
                    '.' +
                    JSON.parse(item.data).message.status +
                    '.text',
                )
              }}
            </a>
            <span v-else>
              {{
                $t(
                  'notification.' +
                    JSON.parse(item.data).message.model +
                    '.' +
                    JSON.parse(item.data).message.status +
                    '.text',
                )
              }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="header__notify--absol" v-else>
      <div class="header__notify--list">
        {{ $t('notification.not_new') }}
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/boot/axios';

export default {
  data() {
    return {
      notificationsHeader: [],
      notifyClick: false,
    };
  },
  methods: {
    getData() {
      this.notificationsHeader = [];
      // api
      //   .get('notifications', {})
      //   .then((response) => {
      //     this.notificationsHeader = response.data;
      //   })
      //   .catch((error) => {
      //   });
    },
    readSet(index, link) {
      api
        .post('notifications/read', {
          index: index,
        })
        .then((response) => {
          this.notifyClick = false;
          this.getData();
          // this.$router.push({ path: link });
          // window.location.href = link;
          window.open(link, '_blank');
        })
        .catch(() => {});
    },
    headerNotify() {
      this.notifyClick = !this.notifyClick;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style></style>
