import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';

Vue.use(Vuetify);
Vue.use(VueI18n);

const messages = {
  ru: {
    $vuetify: {
      badge: 'знак',
      close: 'Закрыть',
      dataIterator: {
        noResultsText: 'Не найдено подходящих записей',
        loadingText: 'Запись загружается...',
      },
      dataTable: {
        itemsPerPageText: 'Строк на странице:',
        ariaLabel: {
          sortDescending: 'Упорядочено по убыванию.',
          sortAscending: 'Упорядочено по возрастанию.',
          sortNone: 'Не упорядочено.',
          activateNone: 'Активируйте, чтобы убрать сортировку.',
          activateDescending: 'Активируйте для упорядочивания убыванию.',
          activateAscending: 'Активируйте для упорядочивания по возрастанию.',
        },
        sortBy: 'Сортировать по',
      },
      dataFooter: {
        itemsPerPageText: 'Записей на странице:',
        itemsPerPageAll: 'Все',
        nextPage: 'Следующая страница',
        prevPage: 'Предыдущая страница',
        firstPage: 'Первая страница',
        lastPage: 'Последняя страница',
        pageText: '{0}-{1} из {2}',
      },
      datePicker: {
        itemsSelected: '{0} выбран',
        nextMonthAriaLabel: 'Следующий месяц',
        nextYearAriaLabel: 'Следующий год',
        prevMonthAriaLabel: 'Прошлый месяц',
        prevYearAriaLabel: 'Предыдущий год',
      },
      noDataText: 'Отсутствуют данные',
      carousel: {
        prev: 'Предыдущий слайд',
        next: 'Следующий слайд',
        ariaLabel: {
          delimiter: 'Слайд {0} из {1}',
        },
      },
      calendar: {
        moreEvents: 'Еще {0}',
      },
      fileInput: {
        counter: 'Файлов: {0}',
        counterSize: 'Файлов: {0} (всего {1})',
      },
      timePicker: {
        am: 'AM',
        pm: 'PM',
      },
      pagination: {
        ariaLabel: {
          wrapper: 'Навигация по страницам',
          next: 'Следующая страница',
          previous: 'Предыдущая страница',
          page: 'Перейти на страницу {0}',
          currentPage: 'Текущая страница, Страница {0}',
        },
      },
      rating: {
        ariaLabel: {
          icon: 'Rating {0} of {1}',
        },
      },
    },
  },
  en: {
    $vuetify: {
      badge: 'Badge',
      close: 'Close',
      dataIterator: {
        noResultsText: 'No matching records found',
        loadingText: 'Loading items...',
      },
      dataTable: {
        itemsPerPageText: 'Rows per page:',
        ariaLabel: {
          sortDescending: 'Sorted descending.',
          sortAscending: 'Sorted ascending.',
          sortNone: 'Not sorted.',
          activateNone: 'Activate to remove sorting.',
          activateDescending: 'Activate to sort descending.',
          activateAscending: 'Activate to sort ascending.',
        },
        sortBy: 'Sort by',
      },
      dataFooter: {
        itemsPerPageText: 'Items per page:',
        itemsPerPageAll: 'All',
        nextPage: 'Next page',
        prevPage: 'Previous page',
        firstPage: 'First page',
        lastPage: 'Last page',
        pageText: '{0}-{1} of {2}',
      },
      datePicker: {
        itemsSelected: '{0} selected',
        nextMonthAriaLabel: 'Next month',
        nextYearAriaLabel: 'Next year',
        prevMonthAriaLabel: 'Previous month',
        prevYearAriaLabel: 'Previous year',
      },
      noDataText: 'No data available',
      carousel: {
        prev: 'Previous visual',
        next: 'Next visual',
        ariaLabel: {
          delimiter: 'Carousel slide {0} of {1}',
        },
      },
      calendar: {
        moreEvents: '{0} more',
      },
      fileInput: {
        counter: '{0} files',
        counterSize: '{0} files ({1} in total)',
      },
      timePicker: {
        am: 'AM',
        pm: 'PM',
      },
      pagination: {
        ariaLabel: {
          wrapper: 'Pagination Navigation',
          next: 'Next page',
          previous: 'Previous page',
          page: 'Goto Page {0}',
          currentPage: 'Current Page, Page {0}',
        },
      },
      rating: {
        ariaLabel: {
          icon: 'Rating {0} of {1}',
        },
      },
    },
  },
};

const i18n = new VueI18n({
  locale: 'ru',
  messages,
});

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
});
