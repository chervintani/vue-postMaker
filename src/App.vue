<template>
  <div id="app">
    <nav class="navbar is-link is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <p class="title is-2 has-text-light" style="padding-top:10%;">PostMaker</p>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <CreateNoteModal @createNote="createNote"/>
          </div>
        </div>
      </div>
    </nav>
    <br>
    <br>
    <div class="container">
      <div v-if="notes">
        <!-- <CreateNoteModal @createNote="createNote"/> -->
        <br>
        <div>
          <noteItem
            v-for="(note, index) in notes"
            :note="note"
            :key="index"
            @deleteNote="deleteNote"
            @updateNote="updateNote"
          />
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>PostMaker</strong> by
          <a href="https://bulma.io">Chervin Tanilon</a>. All Rights Reserved 2019
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import NoteItem from "./components/NoteItem.vue";
import CreateNoteModal from "./components/CreateNoteModal.vue";
import { getNotes } from "./repository";

export default {
  name: "app",
  components: { NoteItem, CreateNoteModal },
  data() {
    return {
      notes: []
    };
  },
  methods: {
    deleteNote(id) {
      let notes = this.notes.filter(note => note._id != id);
      this.notes = notes;
    },
    updateNote(note) {
      this.deleteNote(note._id);
      this.createNote(note);
    },
    createNote(note) {
      this.notes = [note, ...this.notes];
    },
  },
  mounted() {
    getNotes()
      .then(data => (this.notes = data.notes))
      .catch(err => alert(err));
  }
};
</script>
