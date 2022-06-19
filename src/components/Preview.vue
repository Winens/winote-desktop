<template>
  <div class="previewer-box p-4 markdown-body flex border-l border-zinc-800">
    <VueMD :source="store.state.editor_model"/>
  </div>
</template>

<script setup>
  import VueMD from "vue-markdown-render";
  import {useStore} from "vuex";
  const store = useStore();
</script>

<style>
  .previewer-box {
    position: relative;
    height: 100vh;
  }
  .previewer-box h1 {
    font-size: 2.5em;
    font-weight: bold;
  }
  .previewer-box h2 {
    font-size: 2em;
    font-weight: 600;
  }
  .previewer-box h3 {
    font-size: 1.8em;
    font-weight: 600;
  }
</style>