<template>
  <header>
    <div class="container">
      <div class="header__row">
        <div class="header__left">
          <div class="header__logo">
            <div class="header__logo--left">
              <a :href="'/' + $i18n.locale + '/account/'">
                <img src="../assets/img/logo.svg" alt="" />
              </a>
            </div>
            <div class="header__logo--right">
              <div class="header__logo--title">
                {{ $t('site.logo.title') }}
              </div>
              <div class="header__logo--subtitle">
                {{ $t('site.logo.desc') }}
              </div>
            </div>
          </div>
        </div>
        <div class="header__right">
          <div class="header__lang">
            <HeaderLang></HeaderLang>
          </div>

          <HeaderBell></HeaderBell>

          <div
            class="header__login"
            v-bind:class="{ 'header__login--active': loginClick }"
            v-if="$store.state.userObject"
          >
            <div class="header__login--block">
              <div class="header__login--reletive" @click="headerLogin">
                <div class="header__login--left">
                  <div class="header__login--info">
                    <div class="header__login--name">
                      {{ $store.state.userObject.first_name }}
                      {{ $store.state.userObject.last_name }}
                    </div>
                    <div class="header__login--position">
                      {{ $store.state.userObject.role.description }}
                    </div>
                  </div>
                </div>
                <div class="header__login--right">
                  <img src="../assets/img/icon-arrowdown.svg" />
                </div>
                <div class="header__login--icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div class="login__absol">
                <div class="login__absol--list">
                  <ul class="menu">
                    <li v-if="this.$store.state.userObject.role.name == 'declarer'">
                      <router-link :to="'/' + $i18n.locale + '/account/info'">
                        <span class="login__list--left">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75"
                              stroke="#52A5FC"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
                              stroke="#52A5FC"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                        <span class="login__list--right">
                          {{ $t('admin.login.my_profile') }}
                        </span>
                      </router-link>
                    </li>
                    <li>
                      <router-link :to="'/' + $i18n.locale + '/account/settings'">
                        <span class="login__list--left">
                          <img src="../assets/img/icon-settings.svg" />
                        </span>
                        <span class="login__list--right">
                          {{ $t('admin.login.settings') }}
                        </span>
                      </router-link>
                    </li>
                    <li>
                      <a @click="logout()">
                        <span class="login__list--left">
                          <img src="../assets/img/icon-logout.svg" />
                        </span>
                        <span class="login__list--right">
                          {{ $t('admin.login.logout') }}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="header__login" v-else>
            <div class="header__login--block">
              <div class="header__login--reletive header__login--circle" @click="headerLogin">
                <div class="header__login--icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import HeaderLang from '@/components/HeaderLang';
import HeaderBell from '@/components/HeaderBell';

const USER_ACTIVITY_THROTTLER_TIME = process.env.VUE_APP_USER_ACTIVITY_THROTTLER_TIME || 600000;

export default {
  components: {
    HeaderLang,
    HeaderBell,
  },
  data: function () {
    return {
      mobileClick: false,
      loginClick: false,
      userActivityTimeout: null,
    };
  },
  computed: {},
  methods: {
    logout() {
      if (localStorage.getItem('token')) {
        this.$store.commit('getUserRoles', []);
        this.$store.commit('SET_USER_OBJECT', null);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('refresh_time');
        localStorage.removeItem('USER_INFO_LOAD_TIME');
        delete localStorage.token;
        // location.reload();
        this.$router.push({ path: '/' + this.$i18n.locale + '/login' });
      }
    },
    resetUserActivityTimeout() {
      if (this.userActivityTimeout) clearTimeout(this.userActivityTimeout);
      this.userActivityTimeout = setTimeout(() => {
        this.logout();
      }, USER_ACTIVITY_THROTTLER_TIME);
    },
    activateActivityTracker() {
      window.addEventListener('mousemove', this.resetUserActivityTimeout);
      window.addEventListener('scroll', this.resetUserActivityTimeout);
      window.addEventListener('keydown', this.resetUserActivityTimeout);
      window.addEventListener('resize', this.resetUserActivityTimeout);

      this.resetUserActivityTimeout();
    },
    resetActivityTracker() {
      window.removeEventListener('mousemove', this.resetUserActivityTimeout);
      window.removeEventListener('scroll', this.resetUserActivityTimeout);
      window.removeEventListener('keydown', this.resetUserActivityTimeout);
      window.removeEventListener('resize', this.resetUserActivityTimeout);

      clearTimeout(this.userActivityTimeout);
    },
    mobileActive() {
      this.mobileClick = true;
      document.body.classList.add('mobile__active');
    },
    headerLogin: function () {
      this.loginClick = !this.loginClick;
    },
  },
  beforeDestroy() {
    this.resetActivityTracker();
  },
  mounted() {
    this.activateActivityTracker();
  },
};
</script>
