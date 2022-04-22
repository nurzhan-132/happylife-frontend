export default {
  userId(state) {
    return state.id;
  },
  accessToken(state) {
    return state.accessToken;
  },
  email(state) {
    return state.email;
  },
  username(state) {
    return state.username;
  },
  roles(state) {
    return state.roles;
  },
  isAuthenticated(state) {
    return !!state.accessToken;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
