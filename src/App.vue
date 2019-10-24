<template>
  <div id="app">
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="#">
            <span class="title is-size-1">PostMaker</span>
          </a>
        </div>

      </div>
    </nav>
    <br><br>
    <div  class="container">
      <div v-if="notes">
        <CreateNoteModal @createNote="createNote"/>
        <br>
        <div>
          <noteItem v-for="(note, index) in notes" :note="note" :key="index" @deleteNote="deleteNote" @updateNote="updateNote"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteItem  from './components/NoteItem.vue'
import CreateNoteModal  from './components/CreateNoteModal.vue'
import { getNotes }  from './repository'

export default {
  name: 'app',
  components: { NoteItem, CreateNoteModal  },
  data(){
    return {
      notes: []
    }
  },
  methods: {
    deleteNote(id){
      let notes = this.notes.filter(note => note._id != id)
      this.notes = notes;
    },
    updateNote(note){
      this.deleteNote(note._id);
      this.createNote(note);
    },
    createNote(note){
        this.notes = [note, ...this.notes];
    },
  },
  mounted(){
    getNotes()
      .then(data => this.notes = data.notes)
      .catch((err =>alert(err)));
  }
}
</script>
