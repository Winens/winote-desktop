import { createApp } from "vue";
import App from "./App.vue";
import "./assets/globals.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/300.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import {createStore} from "vuex";

const store = createStore({
    state(){
        return {
            skip_welcome: localStorage.getItem("skip_welcome") === "__yes__",
            note_list: [],
            show_new_note_name_field: false,
            show_conflict_new_note_name_error: false,
            new_note_name_value: "",
            selected_note_id: "",
            delete_note_id: "",
            editor_model: "",
            preview_mode: false,
            show_export_options: false
        }
    }
})

createApp(App).use(store).mount("#app")
