export default {
  addPeriodicalId(state, payload) {
    var existingEntries = JSON.parse(localStorage.getItem("pinned"));
    if (existingEntries == null) existingEntries = [];
    // Save allEntries back to local storage
    if (!existingEntries.includes(payload)) {
      existingEntries.unshift(payload);
      localStorage.setItem("pinned", JSON.stringify(existingEntries));
    }
  },
  setPinned(state, payload) {
    state.items = payload;
  },
};
