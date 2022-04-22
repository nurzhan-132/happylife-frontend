import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import BaseButton from "./components/ui/BaseButton.vue";

library.add(fas);

const app = createApp(App);

app.use(router);
app.use(store);

// app.component(VueFuse);
app.component("fa-icon", FontAwesomeIcon);
app.component("base-button", BaseButton);

app.mount("#app");

export { app };
