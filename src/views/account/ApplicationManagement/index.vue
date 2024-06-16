<template>
  <div class="wrap__content" v-bind:class="{'wrap__content--preloader': !applications}">

    <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>

    <div class="container" v-if="applications">
      <div class="row">

        <div class="col-xl-2 col-lg-3">

          <v-sidebar :active="['ApplicationManagement']"></v-sidebar>

        </div>
        <div class="col-xl-10 col-lg-9">

          <div class="content-wrapper">

            <div class="card__content">
              <div class="card__content-header">

                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                      Заявки на распределение квот
                    </div>
                  </div>
                </div>

              </div>
              <div class="card__content--body">

                <div class="table__block--content">
                  <div class="table__block--filter">
                    <div class="table__filter--left">
                      <div class="table__filter--search">
                        <label class="search__label">
                          <input type="text" value="" name="filter_search" v-model="filters.search" placeholder="Поиск по таблице">
                          <button >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M20.9999 21L16.6499 16.65" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </button>
                        </label>
                      </div>
                      <div class="table__filter--order">
                        <multiselect
                            class="select__status"
                            v-model="filterCategories"
                            :options="orderList"
                            label="name"
                            placeholder="Фильтр"
                        >
                          <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
                        </multiselect>
                      </div>
                    </div>
                    <div class="table__filter--right">
                      <a @click="$modal.show('modal_add')" class="btn--link btn--link--plus">
                        Создать заявку <img src="../../../assets/img/icon-plus.svg">
                      </a>
                    </div>
                  </div>

                  <v-data-table
                      :headers="headers"
                      :items="filteredlist"
                      :loading="false"
                      :options.sync="options"
                      :footer-props="{
                      'items-per-page-options': [5, 10, 20, 30, 40, 50]
                    }"
                  >
                    <template v-slot:item.status="{item}">
                      <a class="tb__table--status" :class="{'tb__status--success': true, 'tb__status--error': false}">
                        {{ item.status }}
                      </a>
                    </template>
                    <template v-slot:item.action="{item}">
                      <a class="tb__table--btn tb__table--view" v-tooltip.top-center="{content:'Посмотреть', class: ['tooltip__btn']}">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error">
                      Ваш поиск по запросу "{{ filters.search }}" не дал результатов.
                    </v-alert>
                  </v-data-table>

                  <modal class="modal__block modal__block--table"
                         name="modal_add"
                         :adaptive="true"
                         :width="1100"
                         :min-width="1100"
                         height="auto"
                  >
                    <div class="modal__block--wrapper modal__table modal__application">



                      <div class="application__modal--line">
                        <div class="modal__table--title">
                          Создание новой Заявки на распределение квот
                        </div>
                        <div class="row">

                          <div class="col-lg-6">
                            <div class="form__line">
                              <div class="form__line--left">
                                <div class="form__line--title">
                                  Наименование водоемов
                                </div>
                              </div>
                              <div class="form__line--right">
                                <div class="form__limit--row">

                                  <div class="form__line--input">
                                      <multiselect
                                          class="select__status"
                                          v-model="reservoirsValue"
                                          :options="formList.reservoirs"
                                          label="name"
                                          :preserve-search="true"
                                          track-by="name"
                                          placeholder="Выберите водоемы"
                                      >
                                      </multiselect>
                                    </div>

                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="form__line">
                              <div class="form__line--left">
                                <div class="form__line--title">
                                  Наименование участка водоема
                                </div>
                              </div>
                              <div class="form__line--right">
                                <div class="form__limit--row">

                                  <div class="form__line--input">
                                    <multiselect
                                        class="select__status"
                                        v-model="reservoirsValue"
                                        :options="formList.reservoirs"
                                        label="name"
                                        :preserve-search="true"
                                        track-by="name"
                                        placeholder="Выберите водоемы"
                                    >
                                    </multiselect>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="form__line">
                              <div class="form__line--left">
                                <div class="form__line--title">
                                  № договора
                                </div>
                              </div>
                              <div class="form__line--right">
                                <div class="form__limit--row">

                                  <div class="form__line--input">
                                    <input type="text" value="" class="input-linck" >
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="form__line">
                              <div class="form__line--left">
                                <div class="form__line--title">
                                  Дата договора
                                </div>
                              </div>
                              <div class="form__line--right">
                                <div class="form__limit--row">

                                  <div class="form__line--input">
                                    <input type="date" class="input-linck date__input">
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="form__line">
                              <div class="form__line--left">
                                <div class="form__line--title">
                                  Объем финансовых средств, направленных в предыдущем году на воспроизводство
                                </div>
                              </div>
                              <div class="form__line--right">
                                <div class="form__limit--row">

                                  <div class="form__line--input form__input--input">
                                    <input type="number" class="input-linck"  required="" :value="0">
                                    <div class="form__input--number">
                                      <div class="form__input--arrow form__input--top" @click="numberTop(index)">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M12 10L8 6L4 10" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                      </div>
                                      <div class="form__input--arrow form__input--bottom" @click="numberBottom(index)">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M4 6L8 10L12 6" stroke="#52A5FC" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="form__line">
                              <div class="form__line--left">
                                <div class="form__line--title">
                                  Фактическое освоение выделенной квоты в предыдущем году
                                </div>
                              </div>
                              <div class="form__line--right">
                                <div class="form__limit--row">

                                  <div class="form__line--input form__input--input">
                                    <input type="number" class="input-linck"  required="" :value="0">
                                    <div class="form__input--number">
                                      <div class="form__input--arrow form__input--top" @click="numberTop(index)">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M12 10L8 6L4 10" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                      </div>
                                      <div class="form__input--arrow form__input--bottom" @click="numberBottom(index)">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M4 6L8 10L12 6" stroke="#52A5FC" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div class="application__modal--line">
                        <div class="modal__table--title">
                          Орудия лова рыбных ресурсов
                        </div>
                        <v-data-table
                            :headers="headersGuns"
                            :items="listGuns"
                            :loading="false"
                            :options.sync="options"
                            hide-default-footer
                        >
                          <template v-slot:item.status="{item}">
                            <a class="tb__table--status" :class="{'tb__status--success': true, 'tb__status--error': false}">
                              {{ item.status }}
                            </a>
                          </template>
                          <template v-slot:item.action="{item}">
                            <a class="tb__table--btn tb__table--view" v-tooltip.top-center="{content:'Посмотреть', class: ['tooltip__btn']}">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </a>
                          </template>
                          <v-alert slot="no-results" :value="true" color="error">
                            Ваш поиск по запросу "{{ filters.search }}" не дал результатов.
                          </v-alert>
                        </v-data-table>
                      </div>
                      <div class="application__modal--line">
                        <div class="modal__table--title">
                          Технологическое оборудование по переработке рыбы
                        </div>
                        <v-data-table
                            :headers="headersEquipment"
                            :items="listEquipment"
                            :loading="false"
                            :options.sync="options"
                            hide-default-footer
                        >
                          <template v-slot:item.status="{item}">
                            <a class="tb__table--status" :class="{'tb__status--success': true, 'tb__status--error': false}">
                              {{ item.status }}
                            </a>
                          </template>
                          <template v-slot:item.action="{item}">
                            <a class="tb__table--btn tb__table--view" v-tooltip.top-center="{content:'Посмотреть', class: ['tooltip__btn']}">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#5ABB5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </a>
                          </template>
                          <v-alert slot="no-results" :value="true" color="error">
                            Ваш поиск по запросу "{{ filters.search }}" не дал результатов.
                          </v-alert>
                        </v-data-table>
                      </div>

                      <div class="input__row">
                        <button class="input-btn form__line--btn">
                          Сохранить
                        </button>
                        <button class="input-btn form__line--btn-black form__line--btn" @click="$modal.hide('modal_add')">
                          Закрыть
                        </button>
                      </div>

                    </div>
                  </modal>


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
// import { api } from '../../boot/axios'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      menuClick: false,


      formList: {
        pool: [
          { name: 'Жайык-Каспийский бассейн'},
          { name: 'Озеро Балхаш и дельта реки Иле'},
          { name: 'Алакольская система озер'},
          { name: 'Водохранилище Капшагай на реке Иле'},
        ],
        reservoirs: [
          { id: 1, name: 'Река жайык'},
          { id: 2, name: 'Река Кигаш'},
          { id: 3, name: 'Каспийское море'},
        ],
        within: [
          { name: 'В пределах Атырауской области'},
          { name: 'В пределах ЗКО'},
        ],
        typefish: [
          {name: 'Осетровые'},
          {name: 'Крупный частик'},
          {name: 'Мелкий частик'},
          {name: 'Кильки'},
          {name: 'Сельди'},
        ],
        including: [
          {name: 'Белуга'},
          {name: 'Русский осетр'},
          {name: 'Севрюга'},
          {name: 'Шип'},
          {name: 'Стерлядь'},
          {name: 'Кутум'},
        ],
      },
      poolValue: [],
      reservoirsValue: [],
      withinValue: [],
      typefishValue: [],
      includingValue: [],
      reservoirsLocal: [
        { name: 'Акмолинская область' },
        { name: 'Актюбинская область' },
        { name: 'Алматинская область' },
        { name: 'Восточно-Казахстанская область' },
        { name: 'Жамбылская область' },
        { name: 'Западно-Казахстанская область' },
        { name: 'Карагандинская область' },
        { name: 'Костанайская область' },
        { name: 'Кызылординская область' },
        { name: 'Северо-Казахстанская область' },
      ],
      reservoirsLocalValue: [],


      filters: {
        search: '',
      },
      options: {
        itemsPerPage: 5,
        page: 1,
      },
      applications: [
        {
          id: 1,
          name: 'Заявка 1',
          date: '11.02.2022',
          status: 'Активный'
        },{
          id: 2,
          name: 'Заявка 2',
          date: '11.02.2022',
          status: 'Активный'
        },{
          id: 3,
          name: 'Заявка 3',
          date: '11.02.2022',
          status: 'Активный'
        },{
          id: 4,
          name: 'Заявка 4',
          date: '11.02.2022',
          status: 'Активный'
        },{
          id: 5,
          name: 'Заявка 5',
          date: '11.02.2022',
          status: 'Активный'
        },
      ],

      Categories: 'all',
      filterCategories: {
        status: 'all',
        name: 'Все'
      },
      orderList: [
        {
          status: 'all',
          name: 'Все'
        },{
          status: '2022',
          name: '2022'
        },{
          status: '2021',
          name: '2021'
        },{
          status: '2020',
          name: '2020'
        }
      ],

      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Наименование заявки', value: 'name', width: '60%' },
        { text: 'Дата создания', value: 'date' },
        { text: 'Статус', value: 'status' },
        { text: 'Действия', value: 'action', align:'center', sortable: false, width: '200px' },
      ],

      headersGuns:[
        { text: 'Id', value: 'id', sortable: false, },
        { text: 'Наименование', value: 'name', width: '60%', sortable: false, },
        { text: 'Тип орудия лова', value: 'type', sortable: false, },
        { text: 'Количество', value: 'number', sortable: false, },
      ],
      listGuns: [{
        id: 1,
        name: 'Сети',
        type: 'Сети',
        number: 1
      }],

      headersEquipment: [
        { text: 'Id', value: 'id', sortable: false, },
        { text: 'Наименование', value: 'name', width: '60%', sortable: false, },
        { text: 'Тип технологического оборудования по переработке рыбных ресурсов', width: '200px', value: 'type', sortable: false, },
        { text: 'Количество', value: 'number', sortable: false, },
      ],
      listEquipment: [{
        id: 1,
        name: 'Холодильное оборудование',
        type: 'Холодильник',
        number: 1
      }],
    }
  },
  methods: {

  },
  computed: {
    filteredlist() {
      return this.applications.filter((d) => {
        if(d.name.toLowerCase().includes(this.filters.search.toLowerCase()) &&
            (this.filterCategories.status == 'all' || d.status == this.filterCategories.status) &&
            (this.Categories == 'all' || d.category_id == this.Categories)) {
          return true
        }
      });
    },
  },
  head: {
    title () {
      return {
        inner: 'Главная'
      }
    },
    meta: [
      { name: 'description', content: 'My description' }
    ]
  }
}
</script>
