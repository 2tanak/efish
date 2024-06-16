import { required, email, helpers, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';
const number = helpers.regex('serial', /^[\d]+$/);
export default {
  data() {
    return {
      login: '',
      name: '',
      phone: '',
      email: '',
      message: '',
      confirms: '',
      whatsApp: '',
      password: '',
      confirmPassword: '',
    };
  },
  validations: {
    phone: {
      required,
      number,
      minLength: minLength(11),
      maxLength: maxLength(11),
    },
    password: {
      minLength: minLength(8),
      required,
      latinica: function (val) {
        if (val != '') {
          const req = /^[A-Za-z0-9]+$/i;
          const result = val.search(req);

          if (result >= 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
    },
    confirmPassword: {
      sameAs: sameAs('password'),
      required,
    },
    name: {
      required,
    },
    login: {
      required,
    },
    email: {
      required,
      email,
    },
    message: {
      required,
    },
    confirms: {
      check: function (val) {
        if (val === true) {
          return true;
        }
        if (val === false) {
          return false;
        }
        return false;
      },
    },
  },
  components: {},
  computed: {},
  methods: {
    sendMessage(e) {
      e.preventDefault();
      const whatsApp = this.whatsApp ? this.whatsApp : null;
      const confirms = this.confirms ? this.confirms : null;
      const name = this.name ? this.name : null;
      const phone = this.phone ? this.phone : null;
      const email = this.email ? this.email : null;
      const message = this.message ? this.message : null;
      const login = this.login ? this.login : null;

      var formData = new FormData();

      if (login) {
        formData.append('login', login);
      }

      if (confirms) {
        formData.append('confirms', confirms);
      }

      if (email) {
        formData.append('email', email);
      }

      if (message) {
        formData.append('message', message);
      }

      if (whatsApp) {
        formData.append('whatsApp', whatsApp);
      }

      if (name) {
        formData.append('name', name);
      }

      if (phone) {
        formData.append('phone', phone);
      }

      $(e.target).addClass('gif_loader');
      const $this = this;
      this.$store.dispatch('email/sendMessage', formData).then((response) => {
        $(e.target).removeClass('gif_loader');
        $this.remove();
        $this.modal({
          type: 'success',
          message:
            'Ваша заявка получена. Пожалуйста, не закрывайте сайт до окончания разговора с Вашим менеджером',
        });
      });
      return false;
    },
  },
  mounted() {},
};
