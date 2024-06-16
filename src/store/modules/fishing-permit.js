import { apiSecond } from '@/boot/axios';

export default {
  state: {
    fishingPermits: [],
  },
  getters: {
    _getFishingPermits(state) {
      return state.fishingPermits;
    },
  },
  mutations: {
    SET_FISHING_PERMITS(state, payload) {
      state.fishingPermits = payload;
    },
  },
  actions: {
    async _fetchFishingPermits({ commit }) {
      apiSecond
        .get('/v2/r13-moosr3-services')
        .then((response) => {
          commit('SET_FISHING_PERMITS', response.data.data || []);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
