<template>
  <Codemirror placeholder="# Editor"
    :extensions="exts"
    :style="{height: 'calc(100vh - 24px)'}"
    :autofocus=true
    v-model="store.state.editor_model"
  />
</template>

<script setup>
import "codemirror/lib/codemirror.css";
import {Codemirror} from 'vue-codemirror';
import {oneDark} from "@codemirror/theme-one-dark";
import {markdown} from "@codemirror/lang-markdown";
//import {languages} from "@codemirror/language-data";
import {useStore} from "vuex";
import PouchDB from "pouchdb";
const store = useStore();

const exts = [markdown(), oneDark]  // Extensions
const db = PouchDB("winote");

const save_current_note = () => {
  // update `selected_note_id`'s' `editor_model`
  db.get(store.state.selected_note_id).then((r) => {
    return db.put({
      _id: String(store.state.selected_note_id),
      _rev: r._rev,
      note: String(store.state.editor_model)
    })
  }).then((p) => {
    console.log(p.ok);
  })
}

const event_listener = (e) => {
  if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault(); // Block browser's save tab
    console.log("Command: Save");
    if(store.state.selected_note_id){
      save_current_note();
    } else {
      console.log("No selected note!");
    }
  }
}

document.addEventListener("keydown", event_listener);
</script>