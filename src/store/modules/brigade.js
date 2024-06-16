import { apiSecond } from '@/boot/axios';

export default {
  state: {
    brigades: [],
  },
  getters: {
    _getBrigades(state) {
      return state.brigades;
    },
  },
  mutations: {
    SET_BRIGADES(state, payload) {
      state.brigades = payload;
    },
  },
  actions: {
    async _fetchBrigades({ commit }) {
      apiSecond
        .get('v2/brigade')
        .then((response) => {
          commit('SET_BRIGADES', (response.data ? response.data : []).reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
