import { createStore } from "vuex";

import pinnedModule from "./modules/pinned";
import authModule from "./modules/auth";
import periodicalsModule from "./modules/periodicals";
import statisticsModule from "./modules/statistics";

const store = createStore({
  state() {
    return {
      search: null,
    };
  },
  modules: {
    pinned: pinnedModule,
    auth: authModule,
    periodicals: periodicalsModule,
    statistics: statisticsModule,
  },
});

export default store;
