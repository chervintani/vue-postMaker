<template>
  <div id="home">
    <b-navbar class="is-link is-fixed-top">
      <template slot="brand">
        <b-navbar-item>
          <p class="title is-3 has-text-light">EventHub</p>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <CreateNoteModal @createNote="createNote"/>
            <router-link to="/login"></router-link>
            <b-navbar-dropdown>
              <b-navbar-item href="/login">
                <button class="button is-danger is-outlined is-fullwidth" @click="loggedOut">Logout</button>
              </b-navbar-item>
            </b-navbar-dropdown>
            <span id="username" v-html="user">test</span>
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
  </div>
</template>

<script>
import NoteItem from "./NoteItem.vue";
import CreateNoteModal from "./CreateNoteModal";
import { getNotes } from "../repository";

export default {
  name: "home",
  components: { NoteItem, CreateNoteModal },
  data() {
    return {
      notes: [],
      user: sessionStorage.getItem("username")
    };
  },
  methods: {
    loggedOut() {
      sessionStorage.removeItem("authenticated");
    },
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
    const loadingComponent = this.$buefy.loading.open({
      container: null
    });
    getNotes()
      .then(data => {
        loadingComponent.close();
        this.notes = data.notes;
      })
      .catch(err => alert(err));
  }
};
</script>
<style scoped>
.title {
  padding-top: 10%;
}
</style>
