<template>
  <div class="wv-center container mx-auto text-center">
    <h1 class="font-black text-6xl">Welcome</h1>
    <p class="text-2xl text-gray-300 lg:w-1/2 mx-auto my-3">
      WiNote is a <strong>Markdown</strong> note application for developers to <strong>sync</strong> their notes with <strong>CouchDB</strong> on every device.
    </p>
    <button v-on:click="getStarted" class="text-lg py-2 px-4 my-3 bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg">Get Started</button>
  </div>
</template>

<script setup>
  import {useStore} from "vuex";
  const store = useStore();

  console.log("Welcome component rendered.")

  const getStarted = () => {
    localStorage.setItem("skip_welcome", "__yes__")
    store.state.skip_welcome = true;
    console.log("Skipping Welcome is enabled.");
  }
</script>