<template>
  <div class="input-wrapper">
    <div v-if="title" class="title">
      {{ title }}
      <div v-if="subtitle">{{ subtitle }}</div>
    </div>
    <div class="input-body" :class="{ 'input-body--error': isError }">
      <slot></slot>
    </div>
    <div v-if="error" class="input-required">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputWrapper',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    isError: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 12px;
  color: #0a091d;
  margin-bottom: 8px;
  line-height: 1.2;
}

.title span {
  color: #708295;
}
</style>
