<template>
  <div id="app">
    <nav class="navbar is-link is-fixed-top">
  <div class="navbar-brand" style="padding: 20px">
    <div>
    <h1 class="title is-3" style="color: white">PostMaker<br></h1>
    <h1 class="title is-5" style="color: white">Post your feelings!</h1>
    </div>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div> 
  </div>

</nav>
    <br>
    <br>
    <div class="container">
      <div v-if="notes">
        <CreateNoteModal @createNote="createNote"/>
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
    }
  },
  mounted() {
    getNotes()
      .then(data => (this.notes = data.notes))
      .catch(err => alert(err));
  }
};
</script>
