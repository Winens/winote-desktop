<template>
  <Welcome v-if="!store.state.skip_welcome"/>
  <div v-else>
    <div class="w-1/4 float-left h-screen">
      <Menu/>
    </div>
    <div>

    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore();

import PouchDB from "pouchdb";


// Set note list
PouchDB("winote").allDocs().then((r) => store.state.note_list = r.rows)

import Welcome from "./components/Welcome.vue";
import Menu from "./components/Menu.vue";


</script>