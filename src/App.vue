<template>
  <Welcome v-if="!store.state.skip_welcome"/>
  <div v-else>
    <div class="w-1/4 float-left h-screen">
      <Menu/>
    </div>
    <div v-if="store.state.selected_note_id">
      <MenuBar/>
      <Editor v-if="!store.state.preview_mode"/>
      <Preview v-else/>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore();

import PouchDB from "pouchdb";


// Set note list
//PouchDB("winote").allDocs().then((r) => store.state.note_list = r.rows)
PouchDB("winote").allDocs().then((r) => {
  for(let i = 0; i <= r.total_rows - 1; i++){
    store.state.note_list.push(r.rows[i].id);
    console.log("Push Note to Store:", r.rows[i].id);
  }
})

import Welcome from "./components/Welcome.vue";
import Menu from "./components/Menu.vue";
import MenuBar from "./components/MenuBar.vue";
import Editor from "./components/Editor.vue";
import Preview from "./components/Preview.vue";


</script>