<template>
  <div>
    <div class="main__sidebar" v-bind:class="{ 'main__sidebar--active': sidebarClick }">
      <div class="main__sidebar--burger">
        <a class="sidebar__burger" @click="sidebarClick = !sidebarClick">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20"
              stroke="#52A5FC"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 6H20"
              stroke="#52A5FC"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 18H20"
              stroke="#52A5FC"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>

      <nav class="main__sidebar--nav">
        <ul class="menu sidebar__nav sidebar__nav--main">
          <li class="sidebar-item" :class="{ 'menu-open': menuActive('Account') }">
            <router-link :to="'/' + $i18n.locale + '/account/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.94855 9.1199L11.5885 2.3999L20.2285 9.1199V19.6799C20.2285 20.1891 20.0263 20.6774 19.6662 21.0375C19.3062 21.3976 18.8177 21.5999 18.3085 21.5999H4.86855C4.35933 21.5999 3.87097 21.3976 3.51091 21.0375C3.15083 20.6774 2.94855 20.1891 2.94855 19.6799V9.1199Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.70856 21.6V12H14.4685V21.6"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('site.home_page') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['declarer_menu'])"
            :class="{ 'menu-open': menuActive('MyProfile') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/info'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.027 21.1608V19.1608C20.027 18.1 19.6056 17.0826 18.8554 16.3324C18.1053 15.5823 17.0879 15.1608 16.027 15.1608H8.02699C6.96613 15.1608 5.94871 15.5823 5.19857 16.3324C4.44842 17.0826 4.02699 18.1 4.02699 19.1608V21.1608"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.027 11.1608C14.2361 11.1608 16.027 9.36998 16.027 7.16084C16.027 4.9517 14.2361 3.16084 12.027 3.16084C9.81785 3.16084 8.02699 4.9517 8.02699 7.16084C8.02699 9.36998 9.81785 11.1608 12.027 11.1608Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('admin.login.my_profile') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_limit'])"
            :class="{ 'menu-open': menuActive('LimitManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/limits/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8C16.9706 8 21 6.65685 21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5C3 6.65685 7.02944 8 12 8Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 12C21 13.66 17 15 12 15C7 15 3 13.66 3 12"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 5V19C3 20.66 7 22 12 22C17 22 21 20.66 21 19V5"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.limit') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_quota'])"
            :class="{ 'menu-open': menuActive('QuotaManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/quotas/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 11L21 7L17 3"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 7H9"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 21L3 17L7 13"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 17H3"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.quotas') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_quota-reverse'])"
            :class="{ 'menu-open': menuActive('QuotaReverseManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/quotas-reverse/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 11L21 7L17 3"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 7H9"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 21L3 17L7 13"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 17H3"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.quotas_reverse') }}
            </router-link>
          </li>

          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_mastering'])"
            :class="{ 'menu-open': menuActive('MasteringManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/mastering/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 2H9C8.73478 2 8.48043 2.10536 8.29289 2.29289C8.10536 2.48043 8 2.73478 8 3V5C8 5.26522 8.10536 5.51957 8.29289 5.70711C8.48043 5.89464 8.73478 6 9 6H15C15.2652 6 15.5196 5.89464 15.7071 5.70711C15.8946 5.51957 16 5.26522 16 5V3C16 2.73478 15.8946 2.48043 15.7071 2.29289C15.5196 2.10536 15.2652 2 15 2V2Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 11H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 11H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 16H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.mastering') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_reserve_fund'])"
            :class="{ 'menu-open': menuActive('ReserveFundManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/reserve-fund/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 2H9C8.73478 2 8.48043 2.10536 8.29289 2.29289C8.10536 2.48043 8 2.73478 8 3V5C8 5.26522 8.10536 5.51957 8.29289 5.70711C8.48043 5.89464 8.73478 6 9 6H15C15.2652 6 15.5196 5.89464 15.7071 5.70711C15.8946 5.51957 16 5.26522 16 5V3C16 2.73478 15.8946 2.48043 15.7071 2.29289C15.5196 2.10536 15.2652 2 15 2V2Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 11H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 11H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 16H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.reserve_fund') }}
            </router-link>
          </li>

          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_app_quota'])"
            :class="{ 'menu-open': menuActive('ApplicationQuotasManagement') }"
          >
            <a :href="'https://elicense.kz/?lang=ru'" class="sidebar-link" target="_blank">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.elicense_quotas') }}
            </a>
          </li>
          <!-- <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_permission_catch'])"
            :class="{ 'menu-open': menuActive('ApplicationPermissionsManagement') }"
          >
            <a :href="'https://elicense.kz/?lang=ru'" class="sidebar-link" target="_blank">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.elicense_permission') }}
            </a>
          </li> -->

          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_permission_catch'])"
            :class="{ 'menu-open': menuActive('ApplicationPermissionsManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/fishing-permit/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.elicense_permission') }}
            </router-link>
          </li>

          <li
            class="sidebar-item sidebar__item--children"
            v-if="
              $store.getters.userPermission([
                'read_trade',
                'read_grown',
                'read_purchased',
                'read_implemented',
              ])
            "
            v-bind:class="{
              'menu-open': menuActive('TradeManagementMain') || logClick,
              'menu-open-arrow': logClick,
            }"
          >
            <a class="sidebar-link" @click="logClick = !logClick">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11 3V11L14 8L17 11V3"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.magazines') }}
              <span class="sidebar-arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#0A091D"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </a>
            <transition name="fade">
              <ul
                class="menu sidebar__nav sidebar__nav--treeview"
                v-if="childrenLogActive(['TradeManagementMain'])"
              >
                <li
                  class="sidebar-item"
                  v-if="$store.getters.userPermission(['read_trade'])"
                  :class="{ 'menu-open': menuActive('TradeManagement') }"
                >
                  <router-link :to="'/' + $i18n.locale + '/account/trade/'" class="sidebar-link">
                    <i class="sidebar-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11 3V11L14 8L17 11V3"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </i>
                    {{ $t('sidebar.magazines_trade') }}
                  </router-link>
                </li>
                <li
                  class="sidebar-item"
                  v-if="$store.getters.userPermission(['read_grown'])"
                  :class="{ 'menu-open': menuActive('GrownManagement') }"
                >
                  <router-link
                    :to="'/' + $i18n.locale + '/account/logs/grown/'"
                    class="sidebar-link"
                  >
                    <i class="sidebar-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11 3V11L14 8L17 11V3"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </i>
                    {{ $t('sidebar.magazines_grown') }}
                  </router-link>
                </li>
                <li
                  class="sidebar-item"
                  v-if="$store.getters.userPermission(['read_purchased'])"
                  :class="{ 'menu-open': menuActive('PurchasedManagement') }"
                >
                  <router-link
                    :to="'/' + $i18n.locale + '/account/logs/purchased/'"
                    class="sidebar-link"
                  >
                    <i class="sidebar-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11 3V11L14 8L17 11V3"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </i>
                    {{ $t('sidebar.magazines_purchased') }}
                  </router-link>
                </li>
                <li
                  class="sidebar-item"
                  v-if="$store.getters.userPermission(['read_implemented'])"
                  :class="{ 'menu-open': menuActive('ImplementedManagement') }"
                >
                  <router-link
                    :to="'/' + $i18n.locale + '/account/logs/implemented/'"
                    class="sidebar-link"
                  >
                    <i class="sidebar-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11 3V11L14 8L17 11V3"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </i>
                    {{ $t('sidebar.magazines_implemented') }}
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>

          <li
            class="sidebar-item"
            v-if="
              $store.getters.userPermission([
                'read_trade',
                'read_grown',
                'read_purchased',
                'read_implemented',
              ])
            "
            :class="{ 'menu-open': menuActive('Brigade') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/brigade/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8C16.9706 8 21 6.65685 21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5C3 6.65685 7.02944 8 12 8Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 12C21 13.66 17 15 12 15C7 15 3 13.66 3 12"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 5V19C3 20.66 7 22 12 22C17 22 21 20.66 21 19V5"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.brigade') }}
            </router-link>
          </li>

          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_trade_all'])"
            :class="{ 'menu-open': menuActive('TradeManagementSupervisor') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/trade-list/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8C16.9706 8 21 6.65685 21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5C3 6.65685 7.02944 8 12 8Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 12C21 13.66 17 15 12 15C7 15 3 13.66 3 12"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 5V19C3 20.66 7 22 12 22C17 22 21 20.66 21 19V5"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.trade_list') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_power'])"
            :class="{ 'menu-open': menuActive('PowerReservoirManagement') }"
          >
            <router-link
              :to="'/' + $i18n.locale + '/account/power-reservoir/'"
              class="sidebar-link"
            >
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_130_348" fill="white">
                    <path
                      d="M2.71996 7.64998C2.91552 7.7074 3.10351 7.78797 3.27996 7.88998C3.89978 8.25991 4.60814 8.45523 5.32996 8.45523C6.05178 8.45523 6.76015 8.25991 7.37996 7.88998C7.77042 7.66914 8.21137 7.55307 8.65996 7.55307C9.10855 7.55307 9.5495 7.66914 9.93996 7.88998C10.5673 8.24867 11.2773 8.43735 12 8.43735C12.7226 8.43735 13.4327 8.24867 14.06 7.88998C14.4504 7.66914 14.8914 7.55307 15.34 7.55307C15.7885 7.55307 16.2295 7.66914 16.62 7.88998C17.2537 8.25217 17.97 8.44503 18.7 8.44998C19.4051 8.44852 20.0966 8.25492 20.7 7.88998C20.8764 7.78797 21.0644 7.7074 21.26 7.64998C21.5146 7.57572 21.7292 7.40336 21.8568 7.17081C21.9843 6.93827 22.0142 6.66459 21.94 6.40998C21.8657 6.15537 21.6933 5.94069 21.4608 5.81317C21.2282 5.68564 20.9546 5.65572 20.7 5.72998C20.3494 5.83818 20.0135 5.98932 19.7 6.17998C19.3814 6.36627 19.019 6.46446 18.65 6.46446C18.2809 6.46446 17.9185 6.36627 17.6 6.17998C16.9066 5.79105 16.1249 5.58679 15.33 5.58679C14.535 5.58679 13.7533 5.79105 13.06 6.17998C12.738 6.36703 12.3723 6.46556 12 6.46556C11.6276 6.46556 11.2619 6.36703 10.94 6.17998C10.2466 5.79105 9.46495 5.58679 8.66996 5.58679C7.87497 5.58679 7.09332 5.79105 6.39996 6.17998C6.08139 6.36627 5.719 6.46446 5.34996 6.46446C4.98092 6.46446 4.61853 6.36627 4.29996 6.17998C3.98646 5.98932 3.65057 5.83818 3.29996 5.72998C3.04535 5.65572 2.77167 5.68564 2.53913 5.81317C2.30658 5.94069 2.13422 6.15537 2.05996 6.40998C1.9857 6.66459 2.01562 6.93827 2.14315 7.17081C2.27067 7.40336 2.48535 7.57572 2.73996 7.64998H2.71996ZM20.72 15.73C20.3694 15.8382 20.0335 15.9893 19.72 16.18C19.4014 16.3663 19.039 16.4645 18.67 16.4645C18.3009 16.4645 17.9385 16.3663 17.62 16.18C16.9266 15.7911 16.145 15.5868 15.35 15.5868C14.555 15.5868 13.7733 15.7911 13.08 16.18C12.758 16.367 12.3923 16.4656 12.02 16.4656C11.6476 16.4656 11.2819 16.367 10.96 16.18C10.2666 15.7911 9.48495 15.5868 8.68996 15.5868C7.89497 15.5868 7.11332 15.7911 6.41996 16.18C6.10139 16.3663 5.739 16.4645 5.36996 16.4645C5.00092 16.4645 4.63853 16.3663 4.31996 16.18C4.00646 15.9893 3.67057 15.8382 3.31996 15.73C3.19389 15.6932 3.06182 15.6816 2.93127 15.6959C2.80073 15.7102 2.67427 15.75 2.55913 15.8132C2.44398 15.8763 2.3424 15.9615 2.26019 16.0639C2.17797 16.1663 2.11673 16.2839 2.07996 16.41C2.04319 16.536 2.03161 16.6681 2.04589 16.7987C2.06016 16.9292 2.1 17.0557 2.16315 17.1708C2.22629 17.286 2.3115 17.3875 2.4139 17.4698C2.5163 17.552 2.63389 17.6132 2.75996 17.65C2.95552 17.7074 3.14351 17.788 3.31996 17.89C3.93978 18.2599 4.64814 18.4552 5.36996 18.4552C6.09178 18.4552 6.80015 18.2599 7.41996 17.89C7.81042 17.6691 8.25137 17.5531 8.69996 17.5531C9.14855 17.5531 9.5895 17.6691 9.97996 17.89C10.6073 18.2487 11.3173 18.4374 12.04 18.4374C12.7626 18.4374 13.4727 18.2487 14.1 17.89C14.4904 17.6691 14.9314 17.5531 15.38 17.5531C15.8285 17.5531 16.2695 17.6691 16.66 17.89C17.2937 18.2522 18.01 18.445 18.74 18.45C19.4451 18.4485 20.1366 18.2549 20.74 17.89C20.9164 17.788 21.1044 17.7074 21.3 17.65C21.5546 17.5757 21.7692 17.4034 21.8968 17.1708C22.0243 16.9383 22.0542 16.6646 21.98 16.41C21.9057 16.1554 21.7333 15.9407 21.5008 15.8132C21.2683 15.6856 20.9946 15.6557 20.74 15.73H20.72ZM20.72 10.73C20.3694 10.8382 20.0335 10.9893 19.72 11.18C19.4014 11.3663 19.039 11.4645 18.67 11.4645C18.3009 11.4645 17.9385 11.3663 17.62 11.18C16.9266 10.7911 16.145 10.5868 15.35 10.5868C14.555 10.5868 13.7733 10.7911 13.08 11.18C12.758 11.367 12.3923 11.4656 12.02 11.4656C11.6476 11.4656 11.2819 11.367 10.96 11.18C10.2666 10.7911 9.48495 10.5868 8.68996 10.5868C7.89497 10.5868 7.11332 10.7911 6.41996 11.18C6.10139 11.3663 5.739 11.4645 5.36996 11.4645C5.00092 11.4645 4.63853 11.3663 4.31996 11.18C4.00646 10.9893 3.67057 10.8382 3.31996 10.73C3.18902 10.6805 3.04917 10.6591 2.90944 10.6672C2.76971 10.6752 2.63322 10.7125 2.5088 10.7766C2.38438 10.8406 2.2748 10.9301 2.18715 11.0393C2.0995 11.1484 2.03573 11.2747 1.99996 11.41C1.96319 11.536 1.95161 11.6681 1.96589 11.7987C1.98016 11.9292 2.02 12.0557 2.08315 12.1708C2.14629 12.286 2.2315 12.3875 2.3339 12.4698C2.4363 12.552 2.55389 12.6132 2.67996 12.65C2.87552 12.7074 3.06351 12.788 3.23996 12.89C3.85978 13.2599 4.56814 13.4552 5.28996 13.4552C6.01178 13.4552 6.72015 13.2599 7.33996 12.89C7.73042 12.6691 8.17137 12.5531 8.61996 12.5531C9.06855 12.5531 9.5095 12.6691 9.89996 12.89C10.5273 13.2487 11.2373 13.4374 11.96 13.4374C12.6826 13.4374 13.3927 13.2487 14.02 12.89C14.4104 12.6691 14.8514 12.5531 15.3 12.5531C15.7485 12.5531 16.1895 12.6691 16.58 12.89C17.2137 13.2522 17.93 13.445 18.66 13.45C19.3651 13.4485 20.0566 13.2549 20.66 12.89C20.8364 12.788 21.0244 12.7074 21.22 12.65C21.4746 12.5757 21.6892 12.4034 21.8168 12.1708C21.9443 11.9383 21.9742 11.6646 21.9 11.41C21.8257 11.1554 21.6533 10.9407 21.4208 10.8132C21.1882 10.6856 20.9146 10.6557 20.66 10.73H20.72Z"
                    />
                  </mask>
                  <path
                    d="M2.71996 7.64998C2.91552 7.7074 3.10351 7.78797 3.27996 7.88998C3.89978 8.25991 4.60814 8.45523 5.32996 8.45523C6.05178 8.45523 6.76015 8.25991 7.37996 7.88998C7.77042 7.66914 8.21137 7.55307 8.65996 7.55307C9.10855 7.55307 9.5495 7.66914 9.93996 7.88998C10.5673 8.24867 11.2773 8.43735 12 8.43735C12.7226 8.43735 13.4327 8.24867 14.06 7.88998C14.4504 7.66914 14.8914 7.55307 15.34 7.55307C15.7885 7.55307 16.2295 7.66914 16.62 7.88998C17.2537 8.25217 17.97 8.44503 18.7 8.44998C19.4051 8.44852 20.0966 8.25492 20.7 7.88998C20.8764 7.78797 21.0644 7.7074 21.26 7.64998C21.5146 7.57572 21.7292 7.40336 21.8568 7.17081C21.9843 6.93827 22.0142 6.66459 21.94 6.40998C21.8657 6.15537 21.6933 5.94069 21.4608 5.81317C21.2282 5.68564 20.9546 5.65572 20.7 5.72998C20.3494 5.83818 20.0135 5.98932 19.7 6.17998C19.3814 6.36627 19.019 6.46446 18.65 6.46446C18.2809 6.46446 17.9185 6.36627 17.6 6.17998C16.9066 5.79105 16.1249 5.58679 15.33 5.58679C14.535 5.58679 13.7533 5.79105 13.06 6.17998C12.738 6.36703 12.3723 6.46556 12 6.46556C11.6276 6.46556 11.2619 6.36703 10.94 6.17998C10.2466 5.79105 9.46495 5.58679 8.66996 5.58679C7.87497 5.58679 7.09332 5.79105 6.39996 6.17998C6.08139 6.36627 5.719 6.46446 5.34996 6.46446C4.98092 6.46446 4.61853 6.36627 4.29996 6.17998C3.98646 5.98932 3.65057 5.83818 3.29996 5.72998C3.04535 5.65572 2.77167 5.68564 2.53913 5.81317C2.30658 5.94069 2.13422 6.15537 2.05996 6.40998C1.9857 6.66459 2.01562 6.93827 2.14315 7.17081C2.27067 7.40336 2.48535 7.57572 2.73996 7.64998H2.71996ZM20.72 15.73C20.3694 15.8382 20.0335 15.9893 19.72 16.18C19.4014 16.3663 19.039 16.4645 18.67 16.4645C18.3009 16.4645 17.9385 16.3663 17.62 16.18C16.9266 15.7911 16.145 15.5868 15.35 15.5868C14.555 15.5868 13.7733 15.7911 13.08 16.18C12.758 16.367 12.3923 16.4656 12.02 16.4656C11.6476 16.4656 11.2819 16.367 10.96 16.18C10.2666 15.7911 9.48495 15.5868 8.68996 15.5868C7.89497 15.5868 7.11332 15.7911 6.41996 16.18C6.10139 16.3663 5.739 16.4645 5.36996 16.4645C5.00092 16.4645 4.63853 16.3663 4.31996 16.18C4.00646 15.9893 3.67057 15.8382 3.31996 15.73C3.19389 15.6932 3.06182 15.6816 2.93127 15.6959C2.80073 15.7102 2.67427 15.75 2.55913 15.8132C2.44398 15.8763 2.3424 15.9615 2.26019 16.0639C2.17797 16.1663 2.11673 16.2839 2.07996 16.41C2.04319 16.536 2.03161 16.6681 2.04589 16.7987C2.06016 16.9292 2.1 17.0557 2.16315 17.1708C2.22629 17.286 2.3115 17.3875 2.4139 17.4698C2.5163 17.552 2.63389 17.6132 2.75996 17.65C2.95552 17.7074 3.14351 17.788 3.31996 17.89C3.93978 18.2599 4.64814 18.4552 5.36996 18.4552C6.09178 18.4552 6.80015 18.2599 7.41996 17.89C7.81042 17.6691 8.25137 17.5531 8.69996 17.5531C9.14855 17.5531 9.5895 17.6691 9.97996 17.89C10.6073 18.2487 11.3173 18.4374 12.04 18.4374C12.7626 18.4374 13.4727 18.2487 14.1 17.89C14.4904 17.6691 14.9314 17.5531 15.38 17.5531C15.8285 17.5531 16.2695 17.6691 16.66 17.89C17.2937 18.2522 18.01 18.445 18.74 18.45C19.4451 18.4485 20.1366 18.2549 20.74 17.89C20.9164 17.788 21.1044 17.7074 21.3 17.65C21.5546 17.5757 21.7692 17.4034 21.8968 17.1708C22.0243 16.9383 22.0542 16.6646 21.98 16.41C21.9057 16.1554 21.7333 15.9407 21.5008 15.8132C21.2683 15.6856 20.9946 15.6557 20.74 15.73H20.72ZM20.72 10.73C20.3694 10.8382 20.0335 10.9893 19.72 11.18C19.4014 11.3663 19.039 11.4645 18.67 11.4645C18.3009 11.4645 17.9385 11.3663 17.62 11.18C16.9266 10.7911 16.145 10.5868 15.35 10.5868C14.555 10.5868 13.7733 10.7911 13.08 11.18C12.758 11.367 12.3923 11.4656 12.02 11.4656C11.6476 11.4656 11.2819 11.367 10.96 11.18C10.2666 10.7911 9.48495 10.5868 8.68996 10.5868C7.89497 10.5868 7.11332 10.7911 6.41996 11.18C6.10139 11.3663 5.739 11.4645 5.36996 11.4645C5.00092 11.4645 4.63853 11.3663 4.31996 11.18C4.00646 10.9893 3.67057 10.8382 3.31996 10.73C3.18902 10.6805 3.04917 10.6591 2.90944 10.6672C2.76971 10.6752 2.63322 10.7125 2.5088 10.7766C2.38438 10.8406 2.2748 10.9301 2.18715 11.0393C2.0995 11.1484 2.03573 11.2747 1.99996 11.41C1.96319 11.536 1.95161 11.6681 1.96589 11.7987C1.98016 11.9292 2.02 12.0557 2.08315 12.1708C2.14629 12.286 2.2315 12.3875 2.3339 12.4698C2.4363 12.552 2.55389 12.6132 2.67996 12.65C2.87552 12.7074 3.06351 12.788 3.23996 12.89C3.85978 13.2599 4.56814 13.4552 5.28996 13.4552C6.01178 13.4552 6.72015 13.2599 7.33996 12.89C7.73042 12.6691 8.17137 12.5531 8.61996 12.5531C9.06855 12.5531 9.5095 12.6691 9.89996 12.89C10.5273 13.2487 11.2373 13.4374 11.96 13.4374C12.6826 13.4374 13.3927 13.2487 14.02 12.89C14.4104 12.6691 14.8514 12.5531 15.3 12.5531C15.7485 12.5531 16.1895 12.6691 16.58 12.89C17.2137 13.2522 17.93 13.445 18.66 13.45C19.3651 13.4485 20.0566 13.2549 20.66 12.89C20.8364 12.788 21.0244 12.7074 21.22 12.65C21.4746 12.5757 21.6892 12.4034 21.8168 12.1708C21.9443 11.9383 21.9742 11.6646 21.9 11.41C21.8257 11.1554 21.6533 10.9407 21.4208 10.8132C21.1882 10.6856 20.9146 10.6557 20.66 10.73H20.72Z"
                    stroke="#52A5FC"
                    stroke-width="3"
                    mask="url(#path-1-inside-1_130_348)"
                  />
                </svg>
              </i>
              {{ $t('sidebar.power_reservoir') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_fish_book'])"
            :class="{ 'menu-open': menuActive('FishBookManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/fish-book/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2V2Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.fish_book') }}
            </router-link>
          </li>

          <!--
          <li class="sidebar-item sidebar-item--disabled" v-if="$store.getters.userPermission(['go_menu'])">
            <router-link :to="'/'+ $i18n.locale +'/account/#/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.8599 11.7837V12.7037C22.8586 14.8601 22.1604 16.9583 20.8692 18.6855C19.578 20.4126 17.7631 21.6761 15.6952 22.2876C13.6273 22.899 11.4171 22.8256 9.39433 22.0782C7.37154 21.3309 5.64452 19.9498 4.47082 18.1407C3.29713 16.3317 2.73965 14.1917 2.88154 12.04C3.02343 9.88823 3.85707 7.83999 5.25814 6.20073C6.65922 4.56148 8.55265 3.41904 10.6561 2.94381C12.7595 2.46857 14.9601 2.686 16.9299 3.56366" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22.8599 4.70367L12.8599 14.7137L9.85986 11.7137" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </i>
              Контроль оборота рыбы и рыбной продукции
            </router-link>
          </li>
          -->

          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_subject_all'])"
            :class="{ 'menu-open': menuActive('SubjectsManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/subjects-list/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.4304 6.82348C21.8531 6.45129 22.1583 6.18247 22.8305 6.18247V5C21.7117 5 21.1226 5.51886 20.649 5.93601C20.2268 6.3082 19.9215 6.57687 19.2494 6.57687C18.5771 6.57687 18.272 6.30822 17.8493 5.93601C17.376 5.51889 16.7864 5 15.6683 5C14.5496 5 13.9608 5.51886 13.4873 5.93601C13.0646 6.3082 12.7594 6.57687 12.0879 6.57687C11.4157 6.57687 11.1109 6.30822 10.6884 5.93601C10.2155 5.51889 9.62591 5 8.5078 5C7.38969 5 6.80032 5.51907 6.32717 5.93601C5.9049 6.3082 5.60001 6.57687 4.92829 6.57687C4.25637 6.57687 3.95169 6.30822 3.52942 5.93601C3.05607 5.51909 2.4665 5 1.34839 5V6.18247C2.02011 6.18247 2.32535 6.45132 2.74762 6.82348C3.22097 7.2404 3.81013 7.75929 4.92824 7.75929C6.04635 7.75929 6.63556 7.24042 7.10887 6.82327C7.53074 6.45129 7.83603 6.18242 8.50775 6.18242C9.17967 6.18242 9.48471 6.45127 9.90698 6.82343C10.3803 7.24035 10.9699 7.75924 12.088 7.75924C13.2061 7.75924 13.7955 7.24037 14.269 6.82343C14.6913 6.45124 14.9965 6.18242 15.6687 6.18242C16.341 6.18242 16.646 6.45127 17.0683 6.82343C17.4367 7.1477 17.8761 7.53255 18.5788 7.68813V9.70526C18.3106 9.59182 18.1 9.4095 17.8497 9.18933C17.3764 8.77221 16.7868 8.25332 15.6687 8.25332C14.55 8.25332 13.9612 8.77219 13.4876 9.18933C13.065 9.56152 12.7597 9.83019 12.0882 9.83019C11.4161 9.83019 11.1112 9.56154 10.6888 9.18933C10.2158 8.77221 9.62626 8.25332 8.50815 8.25332C7.39004 8.25332 6.80068 8.77239 6.32753 9.18933C5.90526 9.56152 5.60037 9.83019 4.92865 9.83019C4.25673 9.83019 3.95204 9.56154 3.52977 9.18933C3.05643 8.77241 2.46685 8.25332 1.34874 8.25332V9.43579C2.02046 9.43579 2.32571 9.70464 2.74798 10.0768C3.22132 10.4937 3.81049 11.0126 4.9286 11.0126C6.04671 11.0126 6.63592 10.4937 7.10922 10.0766C7.53109 9.70461 7.83638 9.43574 8.5081 9.43574C9.18002 9.43574 9.48506 9.70459 9.90733 10.0767C10.3807 10.4937 10.9703 11.0126 12.0884 11.0126C13.2065 11.0126 13.7958 10.4937 14.2694 10.0767C14.6917 9.70456 14.9969 9.43574 15.669 9.43574C16.3414 9.43574 16.6464 9.70459 17.0687 10.0767C17.4371 10.401 17.8764 10.7859 18.5792 10.9415V15.4555C18.5792 16.1957 17.9768 16.7984 17.2364 16.7984C16.4962 16.7984 15.8935 16.1959 15.8935 15.4555H14.7111C14.7111 16.8479 15.8439 17.9808 17.2364 17.9808C18.6289 17.9808 19.7617 16.848 19.7617 15.4555V10.9717C20.5589 10.8428 21.0358 10.4247 21.4311 10.0767C21.8538 9.70451 22.159 9.43569 22.8312 9.43569V8.25322C21.7125 8.25322 21.1233 8.77208 20.6497 9.18923C20.3526 9.45075 20.1113 9.65901 19.7617 9.76096L19.7623 7.71829C20.5581 7.58941 21.0351 7.1715 21.4304 6.82348Z"
                    stroke="#52A5FC"
                  />
                  <path
                    d="M9.05834 12.9365C7.03589 12.9365 4.87503 14.4959 3.99862 15.2038L1.96963 13.4582L1.19812 14.3548L3.08814 15.9811L1.19812 17.607L1.96963 18.5036L3.99862 16.7579C4.87503 17.4658 7.03589 19.0256 9.05834 19.0256C11.7202 19.0256 13.7271 17.7169 13.7271 15.9813C13.7271 14.2459 11.7202 12.9365 9.05834 12.9365V12.9365ZM9.05834 17.843C7.53535 17.843 5.78333 16.6478 4.92353 15.9807C5.78196 15.3131 7.53099 14.1192 9.05834 14.1192C11.2117 14.1192 12.5444 15.0857 12.5444 15.9811C12.5446 16.8763 11.2119 17.843 9.05834 17.843V17.843Z"
                    stroke="#52A5FC"
                  />
                  <path
                    d="M9.89673 15.39H10.9808V16.5724H9.89673V15.39Z"
                    stroke="#52A5FC"
                    stroke-width="0.5"
                  />
                </svg>
              </i>
              {{ $t('sidebar.subjects_list') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_document'])"
            :class="{ 'menu-open': menuActive('DocumentManagement') }"
          >
            <!-- , 'go_menu' -->
            <router-link :to="'/' + $i18n.locale + '/account/documents/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 2H9C8.73478 2 8.48043 2.10536 8.29289 2.29289C8.10536 2.48043 8 2.73478 8 3V5C8 5.26522 8.10536 5.51957 8.29289 5.70711C8.48043 5.89464 8.73478 6 9 6H15C15.2652 6 15.5196 5.89464 15.7071 5.70711C15.8946 5.51957 16 5.26522 16 5V3C16 2.73478 15.8946 2.48043 15.7071 2.29289C15.5196 2.10536 15.2652 2 15 2V2Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 11H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 11H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 16H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.documents') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_document_all'])"
            :class="{ 'menu-open': menuActive('DocumentManagementSupervisor') }"
          >
            <!-- , 'go_menu' -->
            <router-link :to="'/' + $i18n.locale + '/account/documents-list/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 2H9C8.73478 2 8.48043 2.10536 8.29289 2.29289C8.10536 2.48043 8 2.73478 8 3V5C8 5.26522 8.10536 5.51957 8.29289 5.70711C8.48043 5.89464 8.73478 6 9 6H15C15.2652 6 15.5196 5.89464 15.7071 5.70711C15.8946 5.51957 16 5.26522 16 5V3C16 2.73478 15.8946 2.48043 15.7071 2.29289C15.5196 2.10536 15.2652 2 15 2V2Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 11H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 11H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 16H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.documents') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_reporting'])"
            :class="{ 'menu-open': menuActive('ReportingManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/reporting/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V8"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 15H12"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 18L12 15L9 12"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.reporting') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_reporting_all'])"
            :class="{ 'menu-open': menuActive('ReportingManagementSupervisor') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/reporting-list/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3C11.391 2.9992 10.7918 3.1529 10.2584 3.44671C9.72495 3.74053 9.27479 4.16486 8.95 4.68C8.6554 4.60892 8.35301 4.57532 8.05 4.58C7.13815 4.61387 6.27318 4.99274 5.63 5.64C5.20785 6.07042 4.90056 6.59997 4.73632 7.18005C4.57208 7.76013 4.55615 8.37217 4.69 8.96C4.17443 9.2827 3.74903 9.73076 3.4535 10.2624C3.15797 10.794 3.00195 11.3918 3 12C3.00026 12.6099 3.15548 13.2098 3.45109 13.7433C3.7467 14.2768 4.173 14.7264 4.69 15.05C4.55742 15.6387 4.57494 16.2512 4.74094 16.8313C4.90694 17.4115 5.2161 17.9406 5.64 18.37C6.07146 18.8005 6.60517 19.1145 7.1911 19.2824C7.77703 19.4503 8.396 19.4667 8.99 19.33C9.31234 19.8376 9.75668 20.2564 10.2825 20.5481C10.8083 20.8398 11.3987 20.9952 12 21C12.6064 21.0002 13.2029 20.8472 13.7344 20.5553C14.2658 20.2633 14.7149 19.8419 15.04 19.33C15.632 19.4626 16.2479 19.4435 16.8306 19.2744C17.4132 19.1053 17.9437 18.7917 18.3727 18.3627C18.8017 17.9337 19.1153 17.4032 19.2844 16.8206C19.4535 16.2379 19.4726 15.622 19.34 15.03C19.8486 14.7047 20.2672 14.2566 20.5572 13.7272C20.8473 13.1977 20.9996 12.6037 21 12C21.0002 11.3936 20.8472 10.7971 20.5553 10.2656C20.2633 9.73417 19.8419 9.28508 19.33 8.96C19.4626 8.36799 19.4435 7.75206 19.2744 7.16941C19.1053 6.58677 18.7917 6.05631 18.3627 5.62732C17.9337 5.19833 17.4032 4.88471 16.8206 4.71559C16.2379 4.54648 15.622 4.52736 15.03 4.66C14.7047 4.15143 14.2566 3.73285 13.7271 3.44277C13.1977 3.15269 12.6037 3.00043 12 3Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 10L11 14"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 12L11 14"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.reporting_list') }}
            </router-link>
          </li>

          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_contest'])"
            :class="{ 'menu-open': menuActive('ContestManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/contest/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V8"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 15L5 17L9 13"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.contest') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['create_permission'])"
            :class="{ 'menu-open': menuActive('PermissionCreateManagement') }"
          >
            <router-link
              :to="'/' + $i18n.locale + '/account/permission-list/'"
              class="sidebar-link"
            >
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11 3V11L14 8L17 11V3"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.elicense_permission') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_permission'])"
            :class="{ 'menu-open': menuActive('PermissionManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/permission/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11 3V11L14 8L17 11V3"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.permission') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_reference'])"
            :class="{ 'menu-open': menuActive('ReferenceLogManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/reference-log/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 2H9C8.73478 2 8.48043 2.10536 8.29289 2.29289C8.10536 2.48043 8 2.73478 8 3V5C8 5.26522 8.10536 5.51957 8.29289 5.70711C8.48043 5.89464 8.73478 6 9 6H15C15.2652 6 15.5196 5.89464 15.7071 5.70711C15.8946 5.51957 16 5.26522 16 5V3C16 2.73478 15.8946 2.48043 15.7071 2.29289C15.5196 2.10536 15.2652 2 15 2V2Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 11H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 11H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 16H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.reference_log') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_fine'])"
            :class="{ 'menu-open': menuActive('FineManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/fine/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.29 3.85996L1.82001 18C1.64537 18.3024 1.55297 18.6453 1.55199 18.9945C1.55102 19.3437 1.6415 19.6871 1.81443 19.9905C1.98737 20.2939 2.23673 20.5467 2.53771 20.7238C2.8387 20.9009 3.1808 20.9961 3.53001 21H20.47C20.8192 20.9961 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.85996C13.5317 3.56607 13.2807 3.32308 12.9812 3.15444C12.6817 2.98581 12.3437 2.89722 12 2.89722C11.6563 2.89722 11.3183 2.98581 11.0188 3.15444C10.7193 3.32308 10.4683 3.56607 10.29 3.85996V3.85996Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 9V13"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 17H12.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.fine') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_fine'])"
            :class="{ 'menu-open': menuActive('PrescriptionManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/prescription/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.29 3.85996L1.82001 18C1.64537 18.3024 1.55297 18.6453 1.55199 18.9945C1.55102 19.3437 1.6415 19.6871 1.81443 19.9905C1.98737 20.2939 2.23673 20.5467 2.53771 20.7238C2.8387 20.9009 3.1808 20.9961 3.53001 21H20.47C20.8192 20.9961 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.85996C13.5317 3.56607 13.2807 3.32308 12.9812 3.15444C12.6817 2.98581 12.3437 2.89722 12 2.89722C11.6563 2.89722 11.3183 2.98581 11.0188 3.15444C10.7193 3.32308 10.4683 3.56607 10.29 3.85996V3.85996Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 9V13"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 17H12.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.prescription') }}
            </router-link>
          </li>

          <li
            class="sidebar-item sidebar__item--children"
            v-if="$store.getters.userPermission(['read_user'])"
            v-bind:class="{
              'menu-open': menuActive('UserManagementMain') || menuClick,
              'menu-open-arrow': menuClick,
            }"
          >
            <a class="sidebar-link" @click="menuClick = !menuClick">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.users_parent') }}
              <span class="sidebar-arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#0A091D"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </a>
            <transition name="fade">
              <ul
                class="menu sidebar__nav sidebar__nav--treeview"
                v-if="childrenMenuActive(['UserManagementMain'])"
              >
                <li
                  class="sidebar-item"
                  v-if="$store.getters.userPermission(['read_user'])"
                  :class="{ 'menu-open': menuActive('UserManagement') }"
                >
                  <router-link :to="'/' + $i18n.locale + '/account/users/'" class="sidebar-link">
                    <i class="sidebar-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V8"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14 2V8H20"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2 15H12"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 18L12 15L9 12"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </i>
                    {{ $t('sidebar.users') }}
                  </router-link>
                </li>
                <li
                  class="sidebar-item"
                  v-if="$store.getters.userPermission(['change_user'])"
                  :class="{ 'menu-open': menuActive('RequestRegistration') }"
                >
                  <router-link
                    :to="'/' + $i18n.locale + '/account/request_registration/'"
                    class="sidebar-link"
                  >
                    <i class="sidebar-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V8"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14 2V8H20"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2 15H12"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 18L12 15L9 12"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </i>
                    {{ $t('sidebar.request_registration') }}
                  </router-link>
                </li>
                <li
                  class="sidebar-item"
                  v-if="$store.getters.userPermission(['change_user'])"
                  :class="{ 'menu-open': menuActive('RequestRecovery') }"
                >
                  <router-link
                    :to="'/' + $i18n.locale + '/account/request_recovery/'"
                    class="sidebar-link"
                  >
                    <i class="sidebar-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V8"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14 2V8H20"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2 15H12"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 18L12 15L9 12"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </i>
                    {{ $t('sidebar.request_recovery') }}
                  </router-link>
                </li>
                <li
                  class="sidebar-item"
                  v-if="$store.getters.userPermission(['read_actionlogs'])"
                  :class="{ 'menu-open': menuActive('UserMonitoring') }"
                >
                  <router-link
                    :to="'/' + $i18n.locale + '/account/monitoring/'"
                    class="sidebar-link"
                  >
                    <i class="sidebar-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 20V10"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 20V4"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6 20V14"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </i>
                    {{ $t('sidebar.monitoring') }}
                  </router-link>
                </li>
                <li
                  class="sidebar-item"
                  v-if="$store.getters.userPermission(['read_actionlogs'])"
                  :class="{ 'menu-open': menuActive('UserMonitoringUser') }"
                >
                  <router-link
                    :to="'/' + $i18n.locale + '/account/monitoring-user/'"
                    class="sidebar-link"
                  >
                    <i class="sidebar-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 20V10"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 20V4"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6 20V14"
                          stroke="#0A091D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </i>
                    {{ $t('sidebar.monitoring-user') }}
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_catalog'])"
            :class="{ 'menu-open': menuActive('ReferenceManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/references/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 2H9C8.73478 2 8.48043 2.10536 8.29289 2.29289C8.10536 2.48043 8 2.73478 8 3V5C8 5.26522 8.10536 5.51957 8.29289 5.70711C8.48043 5.89464 8.73478 6 9 6H15C15.2652 6 15.5196 5.89464 15.7071 5.70711C15.8946 5.51957 16 5.26522 16 5V3C16 2.73478 15.8946 2.48043 15.7071 2.29289C15.5196 2.10536 15.2652 2 15 2V2Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 11H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16H16"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 11H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 16H8.01"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.references') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['change_role'])"
            :class="{ 'menu-open': menuActive('RoleManagement') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/roles/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 22H5C3.9 22 3 21.1 3 20V6C3 4.9 3.9 4 5 4H19C20.1 4 21 4.9 21 6V20C21 21.1 20.1 22 19 22Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 2V4"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 2V4"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17 18.5C15.6 17.5 13.9 17 12 17C10.1 17 8.4 17.6 7 18.5"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.roles') }}
            </router-link>
          </li>

          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['create_news'])"
            :class="{ 'menu-open': menuActive('News') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/news/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.news') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['create_video'])"
            :class="{ 'menu-open': menuActive('Video') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/video/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.video') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['edit_contacts'])"
            :class="{ 'menu-open': menuActive('Contacts') }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/contacts/'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.contacts') }}
            </router-link>
          </li>

          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_analytic'])"
            :class="{
              'menu-open': menuActive('AnalyticManagement'),
              'sidebar-item--disabled': $store.state.userObject.role.id === 3,
            }"
          >
            <router-link :to="'/' + $i18n.locale + '/account/analytics'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0874 20.9464V10.9464"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.0874 20.9464V4.94641"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.0874 20.9464V16.9464"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.analytics') }}
            </router-link>
          </li>
          <li
            class="sidebar-item"
            v-if="$store.getters.userPermission(['read_reporting_all'])"
            :class="{ 'menu-open': menuActive('ReportingAnalyticManagement') }"
          >
            <router-link
              :to="'/' + $i18n.locale + '/account/reporting-analytics'"
              class="sidebar-link"
            >
              <i class="sidebar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 6L13.5 15.5L8.5 10.5L1 18"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17 6H23V12"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('sidebar.reporting_analytics') }}
            </router-link>
          </li>

          <li class="sidebar-item" :class="{ 'menu-open': menuActive('Notifications') }">
            <router-link :to="'/' + $i18n.locale + '/account/notifications'" class="sidebar-link">
              <i class="sidebar-icon">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0942 22.8462C17.6171 22.8462 22.0942 18.369 22.0942 12.8462C22.0942 7.32334 17.6171 2.84619 12.0942 2.84619C6.57139 2.84619 2.09424 7.32334 2.09424 12.8462C2.09424 18.369 6.57139 22.8462 12.0942 22.8462Z"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.0942 8.84619V12.8462"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.0942 16.8462H12.1042"
                    stroke="#52A5FC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              {{ $t('notification.title') }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      menuClick: null,
      logClick: null,
      sidebarClick: false,
    };
  },
  props: {
    active: {
      type: Array,
      default: [],
    },
  },
  computed: {
    childrenMenuActive: function () {
      return function (list) {
        if (this.active.length) {
          let childrenMenu = this.active.find((item) => {
            return list.find((listItem) => {
              return item == listItem ? true : false;
            });
          });
          if (childrenMenu && this.menuClick == null) {
            this.menuClick = true;
          }
        }
        return this.menuClick;
      };
    },
    childrenLogActive: function () {
      return function (list) {
        if (this.active.length) {
          let childrenMenu = this.active.find((item) => {
            return list.find((listItem) => {
              return item == listItem ? true : false;
            });
          });
          if (childrenMenu && this.logClick == null) {
            this.logClick = true;
          }
        }
        return this.logClick;
      };
    },
  },
  methods: {
    menuActive(menu) {
      if (this.active.length) {
        return this.active.find((item) => {
          return item == menu ? true : false;
        });
      }
      return false;
    },
  },
};
</script>
