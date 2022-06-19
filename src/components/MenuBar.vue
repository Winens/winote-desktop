<template>
  <div class="bar-size flex bg-zinc-900 border-b border-l border-zinc-800">
    <button v-on:click="toggleEditorPreview" class="text-sm text-left w-16 text-zinc-500 hover:text-white px-1 mx-2"><span v-if="!store.state.preview_mode">Preview</span><span v-else>Editor</span></button>
    <button v-on:click="showExportOptions" class="text-sm w-16 text-left text-zinc-500 hover:text-white px-1 mx-2">Export</button>
  </div>

  <div v-if="store.state.show_export_options" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"></div>
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Export As</h3>
                <div class="mt-2">
                  <div class="flex justify-start text-zinc-800 mt-3">
                    <button class="py-2 px-3 border border-zinc-200 rounded-lg mr-1 hover:bg-zinc-100 active:bg-zinc-200">PDF</button>
                    <button class="py-2 px-3 border border-zinc-200 rounded-lg mr-1 hover:bg-zinc-100 active:bg-zinc-200">HTML</button>
                    <button class="py-2 px-3 border border-zinc-200 rounded-lg mr-1 hover:bg-zinc-100 active:bg-zinc-200">PNG</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse text-red-600">
            <button v-on:click="hideExportOptions" type="button" class="py-2 px-3 border border-red-600 rounded-lg mr-1 hover:bg-red-500 active:bg-red-600 hover:text-white">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore();

const toggleEditorPreview = () => {
  store.state.preview_mode = !store.state.preview_mode;
}

const showExportOptions = () => { store.state.show_export_options = true; }
const hideExportOptions = () => { store.state.show_export_options = false; }

const event_listener = (e) => {
  if (e.key === "," && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    toggleEditorPreview();
    console.log("Toggle Editor - Preview");
  }
}

document.addEventListener("keydown", event_listener);
</script>

<style scoped>
.bar-size {
  height: 24px;
}
</style>