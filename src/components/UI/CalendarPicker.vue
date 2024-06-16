<template>
  <div class="calendar-picker" :id="id" ref="calendarPicker">
    <div class="input-wrapper">
      <div class="input-body">
        <input
          class="input"
          type="text"
          readonly
          :required="required"
          :value="modelValue"
          @focus="menu = true"
        />
      </div>
    </div>
    <div v-if="menu">
      <v-date-picker v-model="modelValue" @change="menu = false"></v-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarPicker',
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: null,
  },
  data() {
    return {
      menu: false,
      id: Math.random().toFixed(4) * 1000,
    };
  },
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    click(e) {
      const cp = e.target.closest('.calendar-picker');
      if (cp && +cp.id === this.id) return;
      this.menu = false;
    },
  },
  mounted() {
    document.addEventListener('click', this.click);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.click);
  },
};
</script>

<style scoped>
.calendar-picker {
  position: relative;
  display: inline-block;
}

.calendar-picker__body {
  position: absolute;
  top: 110%;
  right: 0;
  z-index: 10;
  background: #fff;
  padding: 10px;
}
</style>
