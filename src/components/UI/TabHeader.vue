<template>
  <div class="main__sidebar main__sidebar--tabs">
    <nav class="main__sidebar--nav">
      <ul class="menu sidebar__nav sidebar__nav--main">
        <li
          v-for="tab in tabs"
          :key="tab.id"
          class="sidebar-item"
          :class="{ 'menu-open': current === tab.id }"
        >
          <a class="sidebar-link" @click="$emit('change', tab.id)">
            {{ tab.name }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TabHeader',
  props: {
    tabs: {
      type: Array,
      default: [],
    },
    current: {
      type: Number,
    },
  },
  emits: ['change'],
};
</script>
