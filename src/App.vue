<template>
  <div id="app">
    <b-navbar class="is-link is-fixed-top">
      <template slot="brand">
        <b-navbar-item>
          <p class="title is-3 has-text-light">EventList</p>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <CreateNoteModal @createNote="createNote"/>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <br>
    <div class="container">
      <div v-if="notes">
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
<style scoped>
  .title {
    padding-top:10%;
  };

</style>
