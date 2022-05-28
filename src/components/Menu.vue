<template>
  <div class="p-4">
    <div class="flex justify-between">
      <h1 class="font-semibold py-1">WiNote</h1>
      <button class="bg-blue-700 px-2 py-1 rounded-lg"><i class="bi bi-gear"></i></button>
    </div>

    <div class="absolute h-3/5 w-1/4 left-0 px-4 mt-5">
      <div class="p-2 border border-gray-900 rounded-lg" v-for="note in store.state.note_list" key="id">
        <div class="flex justify-between w-full">
          <button v-on:click="selectNote(note.id)" class="truncate w-2/3 text-gray-600 hover:text-gray-200 transition duration-100 py-1">{{note.id}}</button>
          <div>
            <button class="inline-block text-gray-600 p-1 mx-1 hover:text-blue-600 transition duration-100"><i class="bi bi-pencil-square"></i></button>
            <button class="inline-block text-gray-600 p-1 hover:text-red-600 transition duration-100"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute w-1/4 left-0 bottom-0 mb-4 px-4">
      <div v-if="store.state.show_new_note_name_field" class="flex justify-between w-full my-3 border border-gray-900 rounded-lg">
        <input v-on:keyup.enter="createNewNote" v-model="store.state.new_note_name_value" class="w-full py-2 px-4 rounded-l-lg bg-transparent outline-none" type="text" placeholder="Name">
        <button v-on:click="cancelNewNoteField" class="bg-red-500 hover:bg-red-600 active:bg-red-700 px-2 py-1 rounded-lg"><i class="bi bi-x text-xl"></i></button>
      </div>
      <button v-on:click="showNewNoteField" class="py-2 px-4 bg-green-700 hover:bg-green-800 active:bg-green-900 w-full rounded-lg"><i class="bi bi-plus-lg"></i>New Note</button>
    </div>
  </div>

</template>

<script setup>
  import PouchDB from "pouchdb";
  import {useStore} from "vuex";
  const store = useStore();

  const showNewNoteField = () => {
    store.state.show_new_note_name_field = true;
    console.log("New Note Field has been opened.");
  }

  const cancelNewNoteField = () => {
    store.state.show_new_note_name_field = false;
    store.state.new_note_name_value = "";
    console.log("New Note Field has been cancelled.");
  }

  const createNewNote = () => {
    if(store.state.new_note_name_value && store.state.new_note_name_value.length >= 1 && store.state.new_note_name_value.length <= 36){
      PouchDB("winote").put({
        _id: String(store.state.new_note_name_value),
        note: String("# " + store.state.new_note_name_value)
      }).then((r) => store.state.note_list.push(r))
      console.log("New Note Created:", store.state.new_note_name_value);
      cancelNewNoteField();
    } else {
      alert("Plz enter a valid note name!")
    }
  }

  const selectNote = (selected_id) => {
    PouchDB("winote").get(selected_id).then((r) => {
      store.state.selected_note_id = selected_id;
      console.log("Note Selected:", selected_id);
    })
  }

</script>
