<template>
  <div class="previewer-box py-4 px-6 markdown-body flex border-l border-zinc-800">
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
    height: calc(100vh - 24px);
    font-family: Avenir, Helvetica, Arial, sans-serif;
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
  .previewer-box code {
    font-size: 0.8em;
  }
</style>