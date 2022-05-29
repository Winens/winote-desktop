<template>
  <div class="p-4">
    <div class="flex justify-between">
      <h1 class="font-semibold py-1">WiNote</h1>
      <button class="bg-blue-700 px-2 py-1 rounded-lg"><i class="bi bi-gear"></i></button>
    </div>

    <div class="absolute h-3/5 w-1/4 left-0 px-4 mt-5">
      <div v-for="note in store.state.note_list" key="id">
        <div v-if="store.state.selected_note_id === note.id" class="transition duration-200 p-2 bg-blue-600 text-white border border-transparent rounded-lg my-2">
          <div class="flex justify-between w-full">
            <button v-on:click="selectNote(note.id)" class="text-left text-white truncate w-2/3 text-gray-600 hover:text-gray-200 transition duration-100 py-1">{{note.id}}</button>
            <div>
              <button class="inline-block text-white p-1 mx-1 hover:text-gray-400 transition duration-100"><i class="bi bi-pencil-square"></i></button>
              <button v-on:click="ask2DeleteNote(note.id)" class="inline-block text-white p-1 hover:text-red-500 transition duration-100"><i class="bi bi-trash3"></i></button>
            </div>
          </div>
          <div v-if="store.state.delete_note_id === note.id">
            <hr class="my-1 py-1 border-gray-200">
            <div class="flex justify-between w-full">
              <strong class="py-1 text-xs font-bold">Are you sure?</strong>
              <div>
                <button v-on:click="deleteNote(note.id)" class="text-blue-200 hover:text-red-200 rounded-lg hover:underline py-1 px-2 text-xs mx-1">Delete</button>
                <button v-on:click="cancelNoteDeletion" class="bg-white hover:bg-blue-200 text-blue-600 rounded-lg py-1 px-2 text-xs">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="transition duration-200 p-2 border border-gray-900 rounded-lg my-2">
          <div class="flex justify-between w-full">
            <button v-on:click="selectNote(note.id)" class="text-left truncate w-2/3 text-gray-600 hover:text-gray-200 transition duration-100 py-1">{{note.id}}</button>
            <div>
              <button class="inline-block text-gray-600 p-1 mx-1 hover:text-blue-600 transition duration-100"><i class="bi bi-pencil-square"></i></button>
              <button v-on:click="ask2DeleteNote(note.id)" class="inline-block text-gray-600 p-1 hover:text-red-600 transition duration-100"><i class="bi bi-trash3"></i></button>
            </div>
          </div>
          <div v-if="store.state.delete_note_id === note.id">
            <hr class="my-1 py-1 border-gray-600">
            <div class="flex justify-between w-full">
              <strong class="py-1 text-xs font-bold">Are you sure?</strong>
              <div>
                <button v-on:click="deleteNote(note.id)" class="text-red-600 rounded-lg hover:underline py-1 px-2 text-xs mx-1">Delete</button>
                <button v-on:click="cancelNoteDeletion" class="bg-blue-600 rounded-lg py-1 px-2 text-xs">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute w-1/4 left-0 bottom-0 mb-4 px-4">
      <div v-if="store.state.show_new_note_name_field" class="flex justify-between w-full my-3 border border-gray-900 rounded-lg">
        <input v-on:keyup.enter="createNewNote" v-model="store.state.new_note_name_value" class="w-full py-2 px-4 rounded-l-lg bg-transparent outline-none" type="text" placeholder="Name">
        <button v-on:click="cancelNewNoteField" class="bg-red-500 hover:bg-red-600 active:bg-red-700 px-2 py-1 rounded-lg"><i class="bi bi-x text-xl"></i></button>
      </div>
      <button v-on:click="showNewNoteField" class="py-2 px-4 bg-green-700 hover:bg-green-800 active:bg-green-900 w-full rounded-lg"><i class="bi bi-plus-lg mr-2"></i>New Note</button>
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
    store.state.selected_note_id = selected_id;
    console.log("Note Selected:", selected_id);
  }

  const deleteNote = (target_id) => {
    PouchDB("winote").get(target_id).then((r) => {
      PouchDB("winote").remove(r)
      store.state.note_list.pop(r)
      console.log("Document Removed:", target_id);
    })
  }

  const ask2DeleteNote = (target_id) => {
    store.state.delete_note_id = target_id;
    console.log("Delete Field has been enabled for:", target_id);
  }

  const cancelNoteDeletion = () => {
    store.state.delete_note_id = "";
    console.log("Note Deletion has been cancelled.")
  }

</script>
