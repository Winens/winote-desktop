<template>
  <Codemirror placeholder="# Editor"
    :extensions="exts"
    :style="{height: '100vh'}"
  />
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore();

import "codemirror/lib/codemirror.css";
import {Codemirror} from 'vue-codemirror';
import {oneDark} from "@codemirror/theme-one-dark";
import {markdown} from "@codemirror/lang-markdown";

const exts = [markdown(), oneDark]  // Extensions

if(store.state.selected_note_id){
  console.log("editor")
}

</script>
