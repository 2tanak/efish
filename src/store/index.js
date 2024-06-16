import common from './modules/common.js';
import catalogs from './modules/catalogs.js';
import brigade from './modules/brigade.js';
import fishingPermit from './modules/fishing-permit.js';

export default {
  state: {
    notification: null,
    userObject: null,
    userRoles: [],
    sign: [],
  },
  getters: {
    userPermission: (state) => (roleList) => {
      if (!roleList || !roleList.length) return false;
      let roleAccesses = state.userRoles.filter((element) => {
        return roleList.find((el) => {
          if (el == element) return true;
        });
      });
      return roleAccesses.length ? true : false;
    },
    getSign: (state) => {
      return state.sign;
    },
    _getUserObject(state) {
      return state.userObject;
    },
  },
  mutations: {
    setSign(state, payload) {
      state.sign.push(payload);
    },
    getUserRoles(state, roles) {
      state.userRoles = roles;
    },
    SET_USER_OBJECT(state, user) {
      state.userObject = user;
    },
    getUserNotifications(state, notification) {
      state.notification = notification;
    },
  },
  modules: {
    common,
    catalogs,
    brigade,
    fishingPermit,
  },
};
