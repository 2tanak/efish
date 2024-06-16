<template>
  <div class="card__content-header">
    <div class="content__title">
      <div v-if="back" class="content__page--back">
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
          {{ title }}
        </div>
        <div v-if="subtitle" class="content__title--subtext">
          {{ subtitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBack',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    back: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
