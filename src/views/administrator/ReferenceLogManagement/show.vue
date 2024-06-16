<template>
  <div
    class="wrap__content"
    v-bind:class="{ 'wrap__content--preloader': !permissionsIntegrateList }"
  >
    <v-preloader v-if="!permissionsIntegrateList" :message="errorMessage"></v-preloader>

    <div class="container" v-if="permissionsIntegrateList">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReferenceLogManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__page--back">
                    <a @click="$router.go(-1)">
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.125 5.25L7.875 10.5L13.125 15.75"
                          stroke="#52A5FC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                  <div class="content__title--element">
                    <div class="content__title--text">
                      {{ $t('sidebar.reference_log') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body" v-if="permissionsIntegrateList.length">
                <div class="table__block--content user-profile__block--content">
                  <div class="user-profile__tabs--children">
                    <ul>
                      <li v-bind:class="{ active: tabElementChildre2 == 'tabElement1' }">
                        <a @click="tabElementChildre2 = 'tabElement1'">О происхождении</a>
                      </li>
                      <li v-bind:class="{ active: tabElementChildre2 == 'tabElement2' }">
                        <a @click="tabElementChildre2 = 'tabElement2'">Ветеринарные</a>
                      </li>
                      <li v-bind:class="{ active: tabElementChildre2 == 'tabElement3' }">
                        <a @click="tabElementChildre2 = 'tabElement3'">Вет. сертификат</a>
                      </li>
                    </ul>
                  </div>

                  <div v-if="tabElementChildre2 == 'tabElement1'">
                    <div class="user-profile__block--update">
                      <button
                        class="user-profile--update"
                        @click="permissionsIntegration"
                        :disabled="permissionsIntegrateUpdate"
                      >
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.625 1.58334V6.33334H11.875"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.375 9.5C2.37625 8.12512 2.77527 6.77997 3.52391 5.6268C4.27255 4.47362 5.33885 3.56168 6.59419 3.00096C7.84953 2.44024 9.24029 2.2547 10.5987 2.46671C11.9572 2.67873 13.2252 3.27925 14.25 4.19583L16.625 6.33333"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.375 17.4167V12.6667H7.125"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.625 9.5C16.6237 10.8749 16.2247 12.22 15.4761 13.3732C14.7274 14.5264 13.6611 15.4383 12.4058 15.999C11.1505 16.5598 9.75971 16.7453 8.40128 16.5333C7.04285 16.3213 5.77477 15.7208 4.75 14.8042L2.375 12.6667"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        обновить
                      </button>
                    </div>

                    <v-data-table
                      :headers="[
                        { text: 'Название', value: 'ActivityType' },
                        { text: 'Номер', value: 'GlobalUniqueNumber' },
                        { text: 'Никад', value: 'Nikad' },
                        { text: this.$t('headers.status'), value: 'Status' },
                        { text: 'Дата выпуска', value: 'IssueDate', width: '100px' },
                        {
                          text: 'Результаты PDF',
                          value: 'DocumentUrl',
                          align: 'center',
                          sortable: false,
                          width: '150px',
                        },
                      ]"
                      :items="referenceOriginIntegrateList"
                      :loading="false"
                      :options.sync="options2"
                      :footer-props="{
                        'items-per-page-options': [5, 10, 20, 30, 40, 50],
                      }"
                      v-if="referenceOriginIntegrateList"
                    >
                      <template v-slot:item.ActivityType="{ item }">
                        <span v-if="$i18n.locale == 'ru'">
                          {{ item.ActivityType['NameRu'] }}
                        </span>
                        <span v-if="$i18n.locale == 'kz'">
                          {{ item.ActivityType['NameKz'] }}
                        </span>
                        <span v-if="$i18n.locale == 'en'">
                          {{ item.ActivityType['NameEn'] }}
                        </span>
                      </template>
                      <template v-slot:item.GlobalUniqueNumber="{ item }">
                        {{ item.GlobalUniqueNumber }}
                      </template>
                      <template v-slot:item.IssueDate="{ item }">
                        {{ item.IssueDate | formatDate }}
                      </template>
                      <template v-slot:item.Status="{ item }">
                        <span v-if="$i18n.locale == 'ru'">
                          {{ item.Status['NameRu'] }}
                        </span>
                        <span v-if="$i18n.locale == 'kz'">
                          {{ item.Status['NameKz'] }}
                        </span>
                        <span v-if="$i18n.locale == 'en'">
                          {{ item.Status['NameRu'] }}
                        </span>
                      </template>
                      <template v-slot:item.DocumentUrl="{ item }">
                        <a
                          :href="item.DocumentUrl"
                          class="tb__table--btn tb__table--delete"
                          target="_blank"
                          v-tooltip.top-center="{ content: 'Скачать', class: ['tooltip__btn'] }"
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.30371 7.29504V28.2422C4.30371 29.209 5.09473 30 6.06152 30H24.0456C25.0124 30 25.8034 29.209 25.8034 28.2422V1.75781C25.8034 0.791016 25.0124 0 24.0456 0H11.5988"
                              fill="#E74C3C"
                            />
                            <path
                              d="M4.30371 7.29504H9.84097C10.8078 7.29504 11.5988 6.50402 11.5988 5.53723V0"
                              fill="#C0392B"
                            />
                            <path
                              d="M2.39673 19.6533H4.30311V17.1387L2.22461 19.7278H2.22496C2.26012 19.6818 2.31962 19.6533 2.39673 19.6533Z"
                              fill="#262626"
                            />
                            <path
                              d="M27.7091 19.6533H25.8027V17.1387L27.8812 19.7278H27.8809C27.8457 19.6818 27.7862 19.6533 27.7091 19.6533Z"
                              fill="#262626"
                            />
                            <path
                              d="M25.906 25.2384C25.8494 25.3893 25.6712 25.5127 25.5101 25.5127H4.59631C4.43517 25.5127 4.25699 25.3893 4.20039 25.2384L2.20694 19.9276C2.15031 19.7767 2.23583 19.6533 2.39696 19.6533H27.7095C27.8706 19.6533 27.9561 19.7767 27.8995 19.9276L25.906 25.2384Z"
                              fill="#C0392B"
                            />
                            <path
                              d="M9.82227 23.9743C9.82227 23.8274 9.86574 23.7141 9.95275 23.6343C10.0398 23.5545 10.1662 23.5146 10.3323 23.5146C10.4904 23.5146 10.6116 23.5545 10.6963 23.6343C10.7809 23.7142 10.8232 23.8275 10.8232 23.9743C10.8232 24.118 10.7797 24.2301 10.6927 24.3107C10.6056 24.3913 10.4856 24.4316 10.3323 24.4316C10.1742 24.4316 10.0497 24.3917 9.95876 24.3119C9.86776 24.2321 9.82227 24.1196 9.82227 23.9743Z"
                              fill="white"
                            />
                            <path
                              d="M13.9527 21.9844C13.9527 22.3756 13.8373 22.6777 13.6067 22.8908C13.376 23.1039 13.0483 23.2104 12.6237 23.2104H12.3579V24.3718H11.4121V20.871H12.6237C13.0659 20.871 13.3979 20.9676 13.6198 21.1607C13.8417 21.3539 13.9527 21.6285 13.9527 21.9844ZM12.358 22.4394H12.5304C12.6725 22.4394 12.7854 22.3995 12.8692 22.3197C12.953 22.2399 12.9949 22.1297 12.9949 21.9892C12.9949 21.753 12.864 21.6348 12.6022 21.6348H12.358V22.4394Z"
                              fill="white"
                            />
                            <path
                              d="M17.4824 22.5471C17.4824 23.1314 17.3216 23.5816 16.9999 23.8977C16.6782 24.2137 16.226 24.3718 15.6434 24.3718H14.5107V20.871H15.7224C16.2843 20.871 16.7181 21.0146 17.0238 21.302C17.3295 21.5893 17.4824 22.0044 17.4824 22.5471ZM16.5006 22.5807C16.5006 22.2598 16.4372 22.022 16.3102 21.8671C16.1833 21.7123 15.9906 21.6348 15.732 21.6348H15.4566V23.596H15.6673C15.9547 23.596 16.1654 23.5126 16.2995 23.3457C16.4336 23.1789 16.5006 22.9239 16.5006 22.5807Z"
                              fill="white"
                            />
                            <path
                              d="M19.0408 24.3718H18.1094V20.871H20.1782V21.63H19.0408V22.2981H20.0897V23.0572H19.0408V24.3718Z"
                              fill="white"
                            />
                            <path
                              d="M21.3867 10.8346C21.3867 11.0763 21.123 11.274 20.8007 11.274H9.22461C8.90234 11.274 8.63867 11.0763 8.63867 10.8346C8.63867 10.5929 8.90234 10.3951 9.22461 10.3951H20.8007C21.123 10.3951 21.3867 10.5929 21.3867 10.8346Z"
                              fill="white"
                            />
                            <path
                              d="M21.3622 13.4713C21.3622 13.713 21.0986 13.9108 20.7763 13.9108H9.2002C8.87793 13.9108 8.61426 13.713 8.61426 13.4713C8.61426 13.2296 8.87793 13.0319 9.2002 13.0319H20.7763C21.0986 13.0319 21.3622 13.2296 21.3622 13.4713Z"
                              fill="white"
                            />
                            <path
                              d="M21.3867 16.1137C21.3867 16.3554 21.123 16.5532 20.8007 16.5532H9.22461C8.90234 16.5532 8.63867 16.3554 8.63867 16.1137C8.63867 15.872 8.90234 15.6743 9.22461 15.6743H20.8007C21.123 15.6743 21.3867 15.872 21.3867 16.1137Z"
                              fill="white"
                            />
                          </svg>
                        </a>
                      </template>
                      <v-alert slot="no-results" :value="true" color="error">
                        Ваш поиск по запросу не дал результатов.
                      </v-alert>
                    </v-data-table>
                  </div>
                  <div v-if="tabElementChildre2 == 'tabElement2'">
                    <div class="user-profile__block--update">
                      <button
                        class="user-profile--update"
                        @click="permissionsIntegration"
                        :disabled="permissionsIntegrateUpdate"
                      >
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.625 1.58334V6.33334H11.875"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.375 9.5C2.37625 8.12512 2.77527 6.77997 3.52391 5.6268C4.27255 4.47362 5.33885 3.56168 6.59419 3.00096C7.84953 2.44024 9.24029 2.2547 10.5987 2.46671C11.9572 2.67873 13.2252 3.27925 14.25 4.19583L16.625 6.33333"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.375 17.4167V12.6667H7.125"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.625 9.5C16.6237 10.8749 16.2247 12.22 15.4761 13.3732C14.7274 14.5264 13.6611 15.4383 12.4058 15.999C11.1505 16.5598 9.75971 16.7453 8.40128 16.5333C7.04285 16.3213 5.77477 15.7208 4.75 14.8042L2.375 12.6667"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        обновить
                      </button>
                    </div>

                    <v-data-table
                      :headers="[
                        { text: 'Название', value: 'ActivityType' },
                        { text: 'Номер', value: 'GlobalUniqueNumber' },
                        { text: 'Никад', value: 'Nikad' },
                        { text: this.$t('headers.status'), value: 'Status' },
                        { text: 'Дата выпуска', value: 'IssueDate', width: '100px' },
                        {
                          text: 'Результаты PDF',
                          value: 'DocumentUrl',
                          align: 'center',
                          sortable: false,
                          width: '150px',
                        },
                      ]"
                      :items="referenceVeterinaryIntegrateList"
                      :loading="false"
                      :options.sync="options2"
                      :footer-props="{
                        'items-per-page-options': [5, 10, 20, 30, 40, 50],
                      }"
                      v-if="referenceVeterinaryIntegrateList"
                    >
                      <template v-slot:item.ActivityType="{ item }">
                        <span v-if="$i18n.locale == 'ru'">
                          {{ item.ActivityType['NameRu'] }}
                        </span>
                        <span v-if="$i18n.locale == 'kz'">
                          {{ item.ActivityType['NameKz'] }}
                        </span>
                        <span v-if="$i18n.locale == 'en'">
                          {{ item.ActivityType['NameEn'] }}
                        </span>
                      </template>
                      <template v-slot:item.GlobalUniqueNumber="{ item }">
                        {{ item.GlobalUniqueNumber }}
                      </template>
                      <template v-slot:item.IssueDate="{ item }">
                        {{ item.IssueDate | formatDate }}
                      </template>
                      <template v-slot:item.Status="{ item }">
                        <span v-if="$i18n.locale == 'ru'">
                          {{ item.Status['NameRu'] }}
                        </span>
                        <span v-if="$i18n.locale == 'kz'">
                          {{ item.Status['NameKz'] }}
                        </span>
                        <span v-if="$i18n.locale == 'en'">
                          {{ item.Status['NameRu'] }}
                        </span>
                      </template>
                      <template v-slot:item.DocumentUrl="{ item }">
                        <a
                          :href="item.DocumentUrl"
                          class="tb__table--btn tb__table--delete"
                          target="_blank"
                          v-tooltip.top-center="{ content: 'Скачать', class: ['tooltip__btn'] }"
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.30371 7.29504V28.2422C4.30371 29.209 5.09473 30 6.06152 30H24.0456C25.0124 30 25.8034 29.209 25.8034 28.2422V1.75781C25.8034 0.791016 25.0124 0 24.0456 0H11.5988"
                              fill="#E74C3C"
                            />
                            <path
                              d="M4.30371 7.29504H9.84097C10.8078 7.29504 11.5988 6.50402 11.5988 5.53723V0"
                              fill="#C0392B"
                            />
                            <path
                              d="M2.39673 19.6533H4.30311V17.1387L2.22461 19.7278H2.22496C2.26012 19.6818 2.31962 19.6533 2.39673 19.6533Z"
                              fill="#262626"
                            />
                            <path
                              d="M27.7091 19.6533H25.8027V17.1387L27.8812 19.7278H27.8809C27.8457 19.6818 27.7862 19.6533 27.7091 19.6533Z"
                              fill="#262626"
                            />
                            <path
                              d="M25.906 25.2384C25.8494 25.3893 25.6712 25.5127 25.5101 25.5127H4.59631C4.43517 25.5127 4.25699 25.3893 4.20039 25.2384L2.20694 19.9276C2.15031 19.7767 2.23583 19.6533 2.39696 19.6533H27.7095C27.8706 19.6533 27.9561 19.7767 27.8995 19.9276L25.906 25.2384Z"
                              fill="#C0392B"
                            />
                            <path
                              d="M9.82227 23.9743C9.82227 23.8274 9.86574 23.7141 9.95275 23.6343C10.0398 23.5545 10.1662 23.5146 10.3323 23.5146C10.4904 23.5146 10.6116 23.5545 10.6963 23.6343C10.7809 23.7142 10.8232 23.8275 10.8232 23.9743C10.8232 24.118 10.7797 24.2301 10.6927 24.3107C10.6056 24.3913 10.4856 24.4316 10.3323 24.4316C10.1742 24.4316 10.0497 24.3917 9.95876 24.3119C9.86776 24.2321 9.82227 24.1196 9.82227 23.9743Z"
                              fill="white"
                            />
                            <path
                              d="M13.9527 21.9844C13.9527 22.3756 13.8373 22.6777 13.6067 22.8908C13.376 23.1039 13.0483 23.2104 12.6237 23.2104H12.3579V24.3718H11.4121V20.871H12.6237C13.0659 20.871 13.3979 20.9676 13.6198 21.1607C13.8417 21.3539 13.9527 21.6285 13.9527 21.9844ZM12.358 22.4394H12.5304C12.6725 22.4394 12.7854 22.3995 12.8692 22.3197C12.953 22.2399 12.9949 22.1297 12.9949 21.9892C12.9949 21.753 12.864 21.6348 12.6022 21.6348H12.358V22.4394Z"
                              fill="white"
                            />
                            <path
                              d="M17.4824 22.5471C17.4824 23.1314 17.3216 23.5816 16.9999 23.8977C16.6782 24.2137 16.226 24.3718 15.6434 24.3718H14.5107V20.871H15.7224C16.2843 20.871 16.7181 21.0146 17.0238 21.302C17.3295 21.5893 17.4824 22.0044 17.4824 22.5471ZM16.5006 22.5807C16.5006 22.2598 16.4372 22.022 16.3102 21.8671C16.1833 21.7123 15.9906 21.6348 15.732 21.6348H15.4566V23.596H15.6673C15.9547 23.596 16.1654 23.5126 16.2995 23.3457C16.4336 23.1789 16.5006 22.9239 16.5006 22.5807Z"
                              fill="white"
                            />
                            <path
                              d="M19.0408 24.3718H18.1094V20.871H20.1782V21.63H19.0408V22.2981H20.0897V23.0572H19.0408V24.3718Z"
                              fill="white"
                            />
                            <path
                              d="M21.3867 10.8346C21.3867 11.0763 21.123 11.274 20.8007 11.274H9.22461C8.90234 11.274 8.63867 11.0763 8.63867 10.8346C8.63867 10.5929 8.90234 10.3951 9.22461 10.3951H20.8007C21.123 10.3951 21.3867 10.5929 21.3867 10.8346Z"
                              fill="white"
                            />
                            <path
                              d="M21.3622 13.4713C21.3622 13.713 21.0986 13.9108 20.7763 13.9108H9.2002C8.87793 13.9108 8.61426 13.713 8.61426 13.4713C8.61426 13.2296 8.87793 13.0319 9.2002 13.0319H20.7763C21.0986 13.0319 21.3622 13.2296 21.3622 13.4713Z"
                              fill="white"
                            />
                            <path
                              d="M21.3867 16.1137C21.3867 16.3554 21.123 16.5532 20.8007 16.5532H9.22461C8.90234 16.5532 8.63867 16.3554 8.63867 16.1137C8.63867 15.872 8.90234 15.6743 9.22461 15.6743H20.8007C21.123 15.6743 21.3867 15.872 21.3867 16.1137Z"
                              fill="white"
                            />
                          </svg>
                        </a>
                      </template>
                      <v-alert slot="no-results" :value="true" color="error">
                        Ваш поиск по запросу не дал результатов.
                      </v-alert>
                    </v-data-table>
                  </div>
                  <div v-if="tabElementChildre2 == 'tabElement3'">
                    <div class="user-profile__block--update">
                      <button
                        class="user-profile--update"
                        @click="permissionsIntegration"
                        :disabled="permissionsIntegrateUpdate"
                      >
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.625 1.58334V6.33334H11.875"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.375 9.5C2.37625 8.12512 2.77527 6.77997 3.52391 5.6268C4.27255 4.47362 5.33885 3.56168 6.59419 3.00096C7.84953 2.44024 9.24029 2.2547 10.5987 2.46671C11.9572 2.67873 13.2252 3.27925 14.25 4.19583L16.625 6.33333"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.375 17.4167V12.6667H7.125"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.625 9.5C16.6237 10.8749 16.2247 12.22 15.4761 13.3732C14.7274 14.5264 13.6611 15.4383 12.4058 15.999C11.1505 16.5598 9.75971 16.7453 8.40128 16.5333C7.04285 16.3213 5.77477 15.7208 4.75 14.8042L2.375 12.6667"
                            stroke="#6D90B4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        обновить
                      </button>
                    </div>

                    <v-data-table
                      :headers="[
                        { text: 'Название', value: 'ActivityType' },
                        { text: 'Номер', value: 'GlobalUniqueNumber' },
                        { text: 'Никад', value: 'Nikad' },
                        { text: this.$t('headers.status'), value: 'Status' },
                        { text: 'Дата выпуска', value: 'IssueDate', width: '100px' },
                        {
                          text: 'Результаты PDF',
                          value: 'DocumentUrl',
                          align: 'center',
                          sortable: false,
                          width: '150px',
                        },
                      ]"
                      :items="certificateVeterinaryIntegrateList"
                      :loading="false"
                      :options.sync="options2"
                      :footer-props="{
                        'items-per-page-options': [5, 10, 20, 30, 40, 50],
                      }"
                      v-if="certificateVeterinaryIntegrateList"
                    >
                      <template v-slot:item.ActivityType="{ item }">
                        <span v-if="$i18n.locale == 'ru'">
                          {{ item.ActivityType['NameRu'] }}
                        </span>
                        <span v-if="$i18n.locale == 'kz'">
                          {{ item.ActivityType['NameKz'] }}
                        </span>
                        <span v-if="$i18n.locale == 'en'">
                          {{ item.ActivityType['NameEn'] }}
                        </span>
                      </template>
                      <template v-slot:item.GlobalUniqueNumber="{ item }">
                        {{ item.GlobalUniqueNumber }}
                      </template>
                      <template v-slot:item.IssueDate="{ item }">
                        {{ item.IssueDate | formatDate }}
                      </template>
                      <template v-slot:item.Status="{ item }">
                        <span v-if="$i18n.locale == 'ru'">
                          {{ item.Status['NameRu'] }}
                        </span>
                        <span v-if="$i18n.locale == 'kz'">
                          {{ item.Status['NameKz'] }}
                        </span>
                        <span v-if="$i18n.locale == 'en'">
                          {{ item.Status['NameRu'] }}
                        </span>
                      </template>
                      <template v-slot:item.DocumentUrl="{ item }">
                        <a
                          :href="item.DocumentUrl"
                          class="tb__table--btn tb__table--delete"
                          target="_blank"
                          v-tooltip.top-center="{ content: 'Скачать', class: ['tooltip__btn'] }"
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.30371 7.29504V28.2422C4.30371 29.209 5.09473 30 6.06152 30H24.0456C25.0124 30 25.8034 29.209 25.8034 28.2422V1.75781C25.8034 0.791016 25.0124 0 24.0456 0H11.5988"
                              fill="#E74C3C"
                            />
                            <path
                              d="M4.30371 7.29504H9.84097C10.8078 7.29504 11.5988 6.50402 11.5988 5.53723V0"
                              fill="#C0392B"
                            />
                            <path
                              d="M2.39673 19.6533H4.30311V17.1387L2.22461 19.7278H2.22496C2.26012 19.6818 2.31962 19.6533 2.39673 19.6533Z"
                              fill="#262626"
                            />
                            <path
                              d="M27.7091 19.6533H25.8027V17.1387L27.8812 19.7278H27.8809C27.8457 19.6818 27.7862 19.6533 27.7091 19.6533Z"
                              fill="#262626"
                            />
                            <path
                              d="M25.906 25.2384C25.8494 25.3893 25.6712 25.5127 25.5101 25.5127H4.59631C4.43517 25.5127 4.25699 25.3893 4.20039 25.2384L2.20694 19.9276C2.15031 19.7767 2.23583 19.6533 2.39696 19.6533H27.7095C27.8706 19.6533 27.9561 19.7767 27.8995 19.9276L25.906 25.2384Z"
                              fill="#C0392B"
                            />
                            <path
                              d="M9.82227 23.9743C9.82227 23.8274 9.86574 23.7141 9.95275 23.6343C10.0398 23.5545 10.1662 23.5146 10.3323 23.5146C10.4904 23.5146 10.6116 23.5545 10.6963 23.6343C10.7809 23.7142 10.8232 23.8275 10.8232 23.9743C10.8232 24.118 10.7797 24.2301 10.6927 24.3107C10.6056 24.3913 10.4856 24.4316 10.3323 24.4316C10.1742 24.4316 10.0497 24.3917 9.95876 24.3119C9.86776 24.2321 9.82227 24.1196 9.82227 23.9743Z"
                              fill="white"
                            />
                            <path
                              d="M13.9527 21.9844C13.9527 22.3756 13.8373 22.6777 13.6067 22.8908C13.376 23.1039 13.0483 23.2104 12.6237 23.2104H12.3579V24.3718H11.4121V20.871H12.6237C13.0659 20.871 13.3979 20.9676 13.6198 21.1607C13.8417 21.3539 13.9527 21.6285 13.9527 21.9844ZM12.358 22.4394H12.5304C12.6725 22.4394 12.7854 22.3995 12.8692 22.3197C12.953 22.2399 12.9949 22.1297 12.9949 21.9892C12.9949 21.753 12.864 21.6348 12.6022 21.6348H12.358V22.4394Z"
                              fill="white"
                            />
                            <path
                              d="M17.4824 22.5471C17.4824 23.1314 17.3216 23.5816 16.9999 23.8977C16.6782 24.2137 16.226 24.3718 15.6434 24.3718H14.5107V20.871H15.7224C16.2843 20.871 16.7181 21.0146 17.0238 21.302C17.3295 21.5893 17.4824 22.0044 17.4824 22.5471ZM16.5006 22.5807C16.5006 22.2598 16.4372 22.022 16.3102 21.8671C16.1833 21.7123 15.9906 21.6348 15.732 21.6348H15.4566V23.596H15.6673C15.9547 23.596 16.1654 23.5126 16.2995 23.3457C16.4336 23.1789 16.5006 22.9239 16.5006 22.5807Z"
                              fill="white"
                            />
                            <path
                              d="M19.0408 24.3718H18.1094V20.871H20.1782V21.63H19.0408V22.2981H20.0897V23.0572H19.0408V24.3718Z"
                              fill="white"
                            />
                            <path
                              d="M21.3867 10.8346C21.3867 11.0763 21.123 11.274 20.8007 11.274H9.22461C8.90234 11.274 8.63867 11.0763 8.63867 10.8346C8.63867 10.5929 8.90234 10.3951 9.22461 10.3951H20.8007C21.123 10.3951 21.3867 10.5929 21.3867 10.8346Z"
                              fill="white"
                            />
                            <path
                              d="M21.3622 13.4713C21.3622 13.713 21.0986 13.9108 20.7763 13.9108H9.2002C8.87793 13.9108 8.61426 13.713 8.61426 13.4713C8.61426 13.2296 8.87793 13.0319 9.2002 13.0319H20.7763C21.0986 13.0319 21.3622 13.2296 21.3622 13.4713Z"
                              fill="white"
                            />
                            <path
                              d="M21.3867 16.1137C21.3867 16.3554 21.123 16.5532 20.8007 16.5532H9.22461C8.90234 16.5532 8.63867 16.3554 8.63867 16.1137C8.63867 15.872 8.90234 15.6743 9.22461 15.6743H20.8007C21.123 15.6743 21.3867 15.872 21.3867 16.1137Z"
                              fill="white"
                            />
                          </svg>
                        </a>
                      </template>
                      <v-alert slot="no-results" :value="true" color="error">
                        Ваш поиск по запросу не дал результатов.
                      </v-alert>
                    </v-data-table>
                  </div>

                  <div
                    class="form__block--line form__messages"
                    :class="{
                      'form__messages--error': permissionsMessage.status != 200,
                      'form__messages--success': permissionsMessage.status == 200,
                    }"
                    v-if="permissionsMessage.status"
                  >
                    <label class="form__block--input">
                      <span class="form__block--title">
                        {{ permissionsMessage.text }}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="card__content--body" v-else>
                <div class="form__line--title">
                  <center>Нет справок</center>
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
import Multiselect from 'vue-multiselect';
import { api, urlApi } from '@/boot/axios';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      urlApi: urlApi,
      application: null,
      applications: null,

      tabElementChildre2: 'tabElement1',

      referenceOriginIntegrateList: null,
      referenceVeterinaryIntegrateList: null,
      certificateVeterinaryIntegrateList: null,

      permissionsIntegrateData: null,
      permissionsIntegrateList: null,
      permissionsIntegrateUpdate: true,
      permissionsMessage: {
        status: null,
        text: null,
      },
      options2: {
        itemsPerPage: 5,
        page: 1,
      },

      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
        texts: null,
      },
    };
  },
  methods: {
    permissionsIntegration() {
      this.permissionsIntegrateData = null;
      this.permissionsIntegrateList = null;
      this.referenceOriginIntegrateList = null;
      this.referenceVeterinaryIntegrateList = null;
      this.certificateVeterinaryIntegrateList = null;

      this.permissionsIntegrateUpdate = true;

      this.permissionsMessage = {
        status: null,
        text: null,
      };

      api
        .get('integration/user/' + this.$route.params.userId + '/permissions-doc')
        .then((response) => {
          if (response.status == 200) {
            this.permissionsIntegrateData = response.data.data;
            if (
              this.permissionsIntegrateData.response &&
              this.permissionsIntegrateData.response.responseData &&
              this.permissionsIntegrateData.response.responseData.data &&
              this.permissionsIntegrateData.response.responseData.data.Licenses
            ) {
              this.permissionsIntegrateList =
                this.permissionsIntegrateData.response.responseData.data.Licenses.UniversalLicense.slice().reverse();

              /*-----  ------*/
              this.referenceOriginIntegrateList = this.permissionsIntegrateList;
              this.referenceVeterinaryIntegrateList = this.permissionsIntegrateList;
              this.certificateVeterinaryIntegrateList = this.permissionsIntegrateList;

              /*this.referenceOriginIntegrateList = [];
                this.referenceVeterinaryIntegrateList = [];
                this.certificateVeterinaryIntegrateList = [];
                this.permissionsIntegrateList.find(element => {
                  switch (element.ActivityType.Code) {
                    case "MTK-KGA":
                      this.referenceOriginIntegrateList.push(element);
                      break;
                    case "EL4-R13_MTK15-V1":
                      this.referenceVeterinaryIntegrateList.push(element);
                      break;
                    case "D1":
                      this.certificateVeterinaryIntegrateList.push(element);
                      break;
                  }
                })*/
            }

            this.permissionsIntegrateUpdate = false;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error?.response?.status == 500) {
              this.permissionsMessage.status = 500;
              this.permissionsMessage.text = this.$t('system_message.500');
            } else if (error?.response?.status == 401) {
              this.permissionsMessage.status = 401;
              this.permissionsMessage.text = error.response.data.error_message;
              this.$router.push('/' + this.$i18n.locale + '/login');
            } else if (error?.response?.status == 404) {
              this.permissionsMessage.status = error?.response?.status;
              this.permissionsMessage.text = this.$t('system_message.500');
            } else {
              this.permissionsMessage.status = error?.response?.status;
              this.permissionsMessage.text = error.response.data.error_message;
            }
            if (error?.response?.status == 403) {
              this.errorMessage.status = 403;
              this.errorMessage.text = error?.response?.data?.message;
            }
          }
          this.permissionsIntegrateUpdate = false;
        });
    },
  },
  beforeMount() {
    this.permissionsIntegration();
  },
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
