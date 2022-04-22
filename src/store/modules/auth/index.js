import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      id: null,
      accessToken: null,
      didAutoLogout: false,
      email: null,
      username: null,
      roles: []
    };
  },
  mutations,
  actions,
  getters,
};
