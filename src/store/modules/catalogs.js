import { api, apiSecond } from '@/boot/axios';

export default {
  state: {
    districts: [],
    fishes: [],
    fishCategories: [],
    fishStateTypes: [],
    fishPurposes: [],
    regions: [],
    countries: [],
    ponds: [],
    waters: [],
    pools: [],
    guns: [],
  },
  getters: {
    _getDistricts(state) {
      return state.districts;
    },
    _getFishes(state) {
      return state.fishes;
    },
    _getFishCategories(state) {
      return state.fishCategories;
    },
    _getFishStateTypesList(state) {
      return state.fishStateTypes;
    },
    _getFishPurposes(state) {
      return state.fishPurposes;
    },
    _getFishStateTypeById(state) {
      return (id) => {
        return state.fishStateTypes.find((el) => el.id === id);
      };
    },
    _getFishStateSubTypesList(state, getters) {
      return (id) => {
        return getters._getFishStateTypeById(id)?.subTypes || [];
      };
    },
    _getFishStateSubTypeById(state, getters) {
      return (id, subId) => {
        return getters._getFishStateSubTypesList(id).find((el) => el.id === subId);
      };
    },
    _getRegionList(state) {
      return state.regions;
    },
    _getCountryList(state) {
      return state.countries;
    },
    _getPondList(state) {
      return state.ponds;
    },
    _getPondById(state) {
      return (id) => {
        return state.ponds.find((p) => p.id === id);
      };
    },
    _getWaterList(state) {
      return state.waters;
    },
    _getPools(state) {
      return state.pools;
    },
    _getGuns(state) {
      return state.guns;
    },
  },
  mutations: {
    SET_DISTRICTS(state, payload) {
      state.districts = payload;
    },
    SET_FISHES(state, payload) {
      state.fishes = payload;
    },
    SET_FISH_CATEGORIES(state, payload) {
      state.fishCategories = payload;
    },
    SET_FISH_STATE_TYPES_LIST(state, payload) {
      state.fishStateTypes = payload;
    },
    SET_FISH_PURPOSES(state, payload) {
      state.fishPurposes = payload;
    },
    SET_REGION_LIST(state, payload) {
      state.regions = payload;
    },
    SET_COUNTRY_LIST(state, payload) {
      state.countries = payload;
    },
    SET_POND_LIST(state, payload) {
      state.ponds = payload;
    },
    SET_WATER_LIST(state, payload) {
      state.waters = payload;
    },
    SET_POOLS(state, payload) {
      state.pools = payload;
    },
    SET_GUNS(state, payload) {
      state.guns = payload;
    },
  },
  actions: {
    async _fetchDistricts({ commit, state }) {
      if (state.districts.length > 0) return;
      try {
        const response = await apiSecond.get('/v2/handbook-country-districts');
        commit(
          'SET_DISTRICTS',
          response.data.data.map((element) => {
            element.name = element.title;
            return element;
          }),
        );
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async _fetchFishes({ commit, state }) {
      if (state.fishes.length > 0) return;
      try {
        const response = await apiSecond.get('/v2/handbook-fishes');
        commit(
          'SET_FISHES',
          response.data.data.map((element) => {
            element.name = element.title;
            return element;
          }),
        );
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async _fetchFishCategories({ commit, state }) {
      if (state.fishCategories.length > 0) return;
      try {
        const response = await apiSecond.get('/v2/handbook-fish-categories');
        commit(
          'SET_FISH_CATEGORIES',
          response.data.data.map((element) => {
            element.name = element.title;
            return element;
          }),
        );
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async _fetchFishPurposes({ commit, state }) {
      if (state.fishPurposes.length > 0) return;
      try {
        const response = await apiSecond.get('/v2/handbook-purposes');
        commit('SET_FISH_PURPOSES', response.data.data);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async _fetchFishStateTypesList({ commit, state }) {
      if (state.fishStateTypes.length > 0) return;
      try {
        const response = await api.get('/subject/list/9/types');
        commit('SET_FISH_STATE_TYPES_LIST', response.data.data);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async _fetchRegionList({ commit, state }) {
      if (state.regions.length > 0) return;
      try {
        const response = await apiSecond.get('/v2/handbook-regions');
        if (response.data && response.data.data)
          commit(
            'SET_REGION_LIST',
            response.data.data.map((element) => {
              element.name = element.title;
              return element;
            }),
          );
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async _fetchCountryList({ commit, state }) {
      if (state.countries.length > 0) return;
      try {
        const response = await api.get('catalog/14/entry/all');
        commit(
          'SET_COUNTRY_LIST',
          response.data.map((element) => {
            element.name = element.values[0].value;
            return element;
          }),
        );
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async _fetchPondList({ commit, state }) {
      if (state.ponds.length > 0) return;
      try {
        const response = await apiSecond.get('/v2/handbook-reservoirs');
        commit(
          'SET_POND_LIST',
          response.data.data.map((element) => {
            element.name = element.title;
            return element;
          }),
        );
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async _fetchWaterList({ commit, state }, id = 'all') {
      if (state.waters.length > 0) return;
      try {
        const response = await api.get(`catalog/3/entry/${id}`);
        commit(
          'SET_WATER_LIST',
          response.data.values.map((element) => {
            element.name = element.value;
            return element;
          }),
        );
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async _fetchPools({ commit, state }) {
      if (state.pools.length > 0) return;
      try {
        const response = await apiSecond.get('/v2/handbook-pools');
        commit(
          'SET_POOLS',
          response.data.data.map((element) => {
            element.name = element.title;
            return element;
          }),
        );
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async _fetchGuns({ commit, state }) {
      if (state.guns.length > 0) return;
      try {
        const response = await apiSecond.get('/v2/handbook-fishing-gears');
        if (response.data && response.data.data)
          commit(
            'SET_GUNS',
            response.data.data.map((element) => {
              element.name = element.title;
              return element;
            }),
          );
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
};
