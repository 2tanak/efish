<template>
  <div class="form__line">
    <div class="form__line--left">
      <div class="form__line--title">{{ title }}</div>
    </div>
    <div class="form__line--right">
      <div class="row">
        <div :class="{ 'col-xl-4': fulfillmentActive, 'col-xl-5': !fulfillmentActive }">
          <div class="form__line--title">Запланировано</div>
          <div class="form__line--input" :class="{ 'input--error': plannedError }">
            <input
              type="number"
              class="input-linck"
              required=""
              placeholder="Запланировано"
              :disabled="disabled"
              :value="planned"
              @input="$emit('input'), $emit('plannedChange', $event.target.value)"
            />
          </div>
          <div class="input-required" v-if="plannedError">
            <p v-for="(massage, massageInd) in plannedError" :key="massageInd">{{ massage }}</p>
          </div>
        </div>
        <div :class="{ 'col-xl-4': fulfillmentActive, 'col-xl-5': !fulfillmentActive }">
          <div class="form__line--title">Фактически</div>
          <div class="form__line--input" :class="{ 'input--error': actuallyError }">
            <input
              type="number"
              class="input-linck"
              required=""
              :disabled="disabled"
              @input="$emit('input'), $emit('actuallyChange', $event.target.value)"
              :value="actually"
              placeholder="Фактически"
            />
          </div>
          <div class="input-required" v-if="actuallyError">
            <p v-for="(massage, massageInd) in actuallyError" :key="massageInd">{{ massage }}</p>
          </div>
        </div>
        <div v-if="fulfillmentActive" class="col-xl-4">
          <div class="form__line--title">% выполнения</div>
          <div class="form__line--input">
            <input
              type="number"
              class="input-linck"
              disabled
              :value="getPercentage"
              placeholder="% выполнения"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLine',
  props: {
    title: {
      type: String,
    },
    planned: {
      type: [String, Number],
    },
    plannedError: {},
    actually: {
      type: [String, Number],
    },
    actuallyError: {},
    fulfillmentActive: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['plannedChange', 'actuallyChange'],
  computed: {
    getPercentage() {
      return ((this.actually * 100) / this.planned).toFixed(2);
    },
  },
};
</script>
