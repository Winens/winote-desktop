import { createApp } from "vue";
import App from "./App.vue";
import "./assets/globals.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/300.css";

import {createStore} from "vuex";

const store = createStore({
    state(){
        return {
            skip_welcome: localStorage.getItem("skip_welcome") === "__yes__",
            note_list: []
        }
    }
})

createApp(App).use(store).mount("#app")
