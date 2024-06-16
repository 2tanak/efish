<template>
  <div class="page__preloader">
    <div class="form__block--preloader">
      <div class="form__preloader--circle">
        <div class="preloader__circle">
          <svg
            width="73"
            height="73"
            viewBox="0 0 73 73"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="36.5" cy="36" r="24" stroke="#FFF7E1" stroke-width="2" />
            <g>
              <path
                d="M16.1604 23C13.5332 26.8866 12 31.5673 12 36.6045C12 50.0778 22.969 61 36.5 61C50.031 61 61 50.0778 61 36.6045C61 34.8685 60.8179 33.1748 60.4716 31.5413"
                stroke="#52A5FC"
                stroke-width="4"
                stroke-linecap="round"
              />
            </g>
          </svg>
        </div>
      </div>
      <div
        class="form__preloader--text form__block--line form__messages form__messages--error"
        v-if="message && message.status"
      >
        <label class="form__block--input">
          <span class="form__block--title">
            {{ message.text }}
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped></style>
