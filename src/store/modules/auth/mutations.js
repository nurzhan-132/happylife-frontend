export default {
  setUser(state, payload) {
    state.accessToken = payload.accessToken;
    state.id = payload.id;
    state.username = payload.username;
    state.email = payload.email;
    state.roles = payload.roles;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
