<template lang="">
  <div class="card__content">
    <HeaderBack :back="back" :title="$t('sidebar.elicense_permission')" />
    <div class="card__content--body">
      <div class="table__block--content">
        <v-data-table
          :headers="headers"
          :items="data"
          :loading="false"
          :options.sync="options"
          :footer-props="{
            'items-per-page-options': [5, 10, 20, 30, 40, 50],
          }"
        >
          <template v-slot:item.title="{ item }">
            <a class="tb__table--link">
              <span v-html="item.title"></span>
            </a>
          </template>
          <template v-slot:item.action="{ item }">
            <router-link
              v-if="item.region && item.reservoir"
              :to="'/' + $i18n.locale + '/account/fishing-permit/' + `${item.id}`"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
                  stroke="#5ABB5E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                  stroke="#5ABB5E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </router-link>
            <router-link
              :to="'/' + $i18n.locale + '/account/fishing-permit/' + `${item.id}/edit`"
              style="margin-left: 15px"
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 48 48"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
                  fill="#52A5FC"
                  stroke="none"
                >
                  <path
                    d="M370 435 c-12 -14 -9 -21 18 -47 26 -27 33 -30 47 -18 10 8 15 25 13
                          44 -3 27 -7 31 -34 34 -19 2 -36 -3 -44 -13z"
                  />
                  <path
                    d="M44 389 c-17 -19 -19 -38 -19 -170 0 -201 -7 -194 195 -194 192 0
                          193 0 198 142 2 58 -1 104 -8 113 -19 28 -30 -11 -30 -113 0 -95 -1 -98 -26
                          -107 -33 -13 -235 -13 -269 0 l-26 10 3 152 3 153 90 2 c102 3 135 9 135 23 0
                          6 -46 10 -113 10 -103 0 -116 -2 -133 -21z"
                  />
                  <path
                    d="M258 322 c-60 -62 -92 -122 -74 -139 17 -17 86 21 146 81 l64 66 -29
                          30 c-16 16 -32 30 -35 30 -4 0 -36 -30 -72 -68z"
                  />
                </g>
              </svg>
            </router-link>
          </template>
          <v-alert slot="no-results" :value="true" color="error">
            {{ $t('system_message.search') }}
          </v-alert>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBack from '@/components/UI/HeaderBack.vue';

export default {
  props: {
    data: {
      type: Array,
    },
    back: {
      type: Boolean,
      default: true,
    },
  },
  components: { HeaderBack },
  data() {
    return {
      headers: [
        { text: 'Id', value: 'id', width: '50px' },
        { text: 'План рыболовного региона', value: 'fishingRegionPlan', width: '20vw' },
        { text: 'Название пруда', value: 'PondName', width: '15vw' },
        { text: 'Рыболовы', value: 'fishingPersons', width: '10vw' },
        { text: 'Тип рыбалки', value: 'fishingType', width: '10vw' },
        // { text: 'Дата контракта', value: 'contractDate', width: '10vw' },
        {
          text: this.$t('headers.action'),
          value: 'action',
          align: 'center',
          sortable: false,
          width: '50px',
        },
      ],
      options: {
        itemsPerPage: 5,
        page: 1,
      },
    };
  },
};
</script>

<style scoped>
.card__content {
  margin-bottom: 45px;
}
</style>
