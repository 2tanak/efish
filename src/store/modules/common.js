export default {
  state: {
    baseURL: 'https://api.efish.airweb.kz/api/v1',
  },
  getters: {
    _getBaseUrl(state) {
      return state.baseURL;
    },
  },
  mutations: {},
};
