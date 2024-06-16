<template>
  <div class="reporting-line">
    <div class="row">
      <div :class="'col-xl-' + cols[0]">
        <div class="reporting__title">
          {{ title }}
        </div>
      </div>
      <div :class="'col-xl-' + cols[1]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormGroupWrapper1',
  props: {
    title: {
      type: String,
      default: '',
    },
    cols: {
      type: Array,
      default() {
        return [4, 5];
      },
      validator(value) {
        return value.length === 2 && value.every((v) => Number.isFinite(v) && v > 0 && v < 12);
      },
    },
  },
};
</script>
