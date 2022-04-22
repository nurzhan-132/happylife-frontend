// import { app } from "@/main";

export default {
  setPeriodicals(state, payload) {
    state.periodicals = payload;
  },
  setSubscribers(state, payload) {
    const periodical = state.periodicals.find(
      (periodical) => periodical.id === payload.periodicalId
    );
    periodical.subscribers = payload.newSubscribers;
  },
  clearPeriodicals(state) {
    state.periodicals = [];
  },
  // performSearch(state, payload) {
  //   app
  //     .$search(payload.query, state.periodicals, payload.options)
  //     .then((results) => {
  //       state.searchResults = results;
  //     });
  // },
  setSearchQuery(state, payload) {
    state.query = payload;
  },
  setSearchResults(state, payload) {
    state.searchResults = payload;
  },
};
